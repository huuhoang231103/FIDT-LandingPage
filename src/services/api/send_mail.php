<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Lấy dữ liệu JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$name = trim($data["name"] ?? '');
$email = trim($data["email"] ?? '');
$message = trim($data["message"] ?? '');
$subscribe = !empty($data["subscribe"]) ? "Yes" : "No";

// Validate
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// Thông tin email nhận
$to = "your-email@example.com"; // 🔥 Sửa thành email nhận thật của bạn
$subject = "New Contact Form Submission from $name";

$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Message:\n$message\n\n";
$body .= "Subscribe to newsletter: $subscribe\n";

$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Gửi email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send email"]);
}
?>
