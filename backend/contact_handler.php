<?php
// backend/contact_handler.php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Vite dev server
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Xử lý preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Chỉ chấp nhận POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Kiểm tra rate limit
if (!checkRateLimit()) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please try again later.']);
    exit;
}

// Đọc dữ liệu JSON từ React
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Clean và validate dữ liệu
$name = cleanInput($input['name'] ?? '');
$email = cleanInput($input['email'] ?? '');
$message = cleanInput($input['message'] ?? '');
$subscribe = $input['subscribe'] ?? false;

// Validation
$errors = [];

if (empty($name)) {
    $errors['name'] = 'Name is required';
} elseif (strlen($name) < 2) {
    $errors['name'] = 'Name must be at least 2 characters';
}

if (empty($email)) {
    $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (empty($message)) {
    $errors['message'] = 'Message is required';
} elseif (strlen($message) < 10) {
    $errors['message'] = 'Message must be at least 10 characters';
}

// Kiểm tra spam
if (checkSpam($message)) {
    $errors['message'] = 'Message contains inappropriate content';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Cấu hình email
$to = ADMIN_EMAIL;
$subject = 'New Contact Form Submission from ' . $name;

// Tạo nội dung email HTML
$html_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #667eea; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #ddd; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; padding: 15px; background: #f0f0f0; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 New Contact Form Submission</h2>
        </div>
        
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>💬 Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>📮 Newsletter Subscription:</div>
                <div class='value'>" . ($subscribe ? '✅ Yes' : '❌ No') . "</div>
            </div>
        </div>
        
        <div class='footer'>
            <p>🌐 This email was sent from " . WEBSITE_URL . " contact form.</p>
            <p>🕐 Sent on: " . date('Y-m-d H:i:s') . "</p>
            <p>🔍 IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>
        </div>
    </div>
</body>
</html>
";

// Cấu hình headers cho email
$headers = [
    'From: ' . $name . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Return-Path: ' . FROM_EMAIL,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Gửi email
$mail_sent = mail($to, $subject, $html_message, implode("\r\n", $headers));

if ($mail_sent) {
    // Lưu contact vào file JSON
    saveContactToFile($name, $email, $message, $subscribe);
    
    // Nếu user đăng ký newsletter
    if ($subscribe) {
        saveSubscriberToFile($email, $name);
    }
    
    // Gửi email xác nhận cho user
    sendConfirmationEmail($email, $name, $message);
    
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully!'
    ]);
} else {
    logError("Failed to send email to $to from $email");
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email',
        'message' => 'Please try again later'
    ]);
}

// Hàm lưu contact vào file
function saveContactToFile($name, $email, $message, $subscribe) {
    $contacts_file = 'contacts.json';
    $contacts = [];
    
    if (file_exists($contacts_file)) {
        $contacts = json_decode(file_get_contents($contacts_file), true) ?? [];
    }
    
    $contacts[] = [
        'id' => uniqid(),
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'subscribe' => $subscribe,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    file_put_contents($contacts_file, json_encode($contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Hàm lưu subscriber
function saveSubscriberToFile($email, $name) {
    $subscribers_file = 'subscribers.json';
    $subscribers = [];
    
    if (file_exists($subscribers_file)) {
        $subscribers = json_decode(file_get_contents($subscribers_file), true) ?? [];
    }
    
    // Kiểm tra email đã tồn tại chưa
    foreach ($subscribers as $subscriber) {
        if ($subscriber['email'] === $email) {
            return; // Đã tồn tại
        }
    }
    
    $subscribers[] = [
        'email' => $email,
        'name' => $name,
        'subscribed_at' => date('Y-m-d H:i:s')
    ];
    
    file_put_contents($subscribers_file, json_encode($subscribers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Hàm gửi email xác nhận
function sendConfirmationEmail($email, $name, $message) {
    $subject = 'Thank you for contacting ' . COMPANY_NAME . '!';
    $confirmation_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .message-quote { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🙏 Thank You for Contacting Us!</h2>
            </div>
            <div class='content'>
                <p>Dear <strong>$name</strong>,</p>
                <p>Thank you for reaching out to us! We have received your message and will get back to you within 24 hours.</p>
                
                <div class='message-quote'>
                    <strong>📝 Your message:</strong><br>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
                
                <p>We appreciate your interest in our services and look forward to helping you with your project.</p>
                
                <p>Best regards,<br>
                <strong>" . COMPANY_NAME . "</strong><br>
                🌐 <a href='" . WEBSITE_URL . "' style='color: #667eea;'>" . WEBSITE_URL . "</a></p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'From: ' . COMPANY_NAME . ' <' . FROM_EMAIL . '>',
        'Reply-To: ' . ADMIN_EMAIL,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    mail($email, $subject, $confirmation_message, implode("\r\n", $headers));
}
?>