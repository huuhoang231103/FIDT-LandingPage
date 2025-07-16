<?php
// Bật hiển thị lỗi để debug
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS cho React (localhost:5173)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Xử lý preflight request từ trình duyệt
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Import PHPMailer
require '../PHPMailer-6.10.0/src/PHPMailer.php';
require '../PHPMailer-6.10.0/src/SMTP.php';
require '../PHPMailer-6.10.0/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Lấy dữ liệu JSON từ request
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Kiểm tra đầu vào
if (!$data || !isset($data["name"], $data["email"], $data["message"])) {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
    exit;
}

// Lấy dữ liệu người dùng nhập
$name = htmlspecialchars($data["name"]);
$email = htmlspecialchars($data["email"]);
$message = htmlspecialchars($data["message"]);
$subscribe = isset($data["subscribe"]) && $data["subscribe"] ? "Yes" : "No";

// Tạo đối tượng PHPMailer
$mail = new PHPMailer(true);

try {
    // Cấu hình SMTP Gmail
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'nguyenhuuhoangdl2003@gmail.com';         // ✅ Gmail của bạn
    $mail->Password = 'iqsl qybo jbps hvnn';                    // ✅ App password Gmail (16 ký tự)
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Gửi và nhận
    $mail->setFrom('nguyenhuuhoangdl2003@gmail.com', 'FIDT Website');
    $mail->addAddress('nguyenhuuhoangdl2003@gmail.com'); // Gửi cho chính bạn

    // Nội dung email
    $mail->isHTML(false);
    $mail->Subject = "New Contact Message from $name";
    $mail->Body =
        "You received a new message from the contact form:\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Message:\n$message\n\n" .
        "Subscribed to newsletter: $subscribe\n";

    // Gửi email
    $mail->send();

    // Trả về thành công
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);

} catch (Exception $e) {
    // Gửi thất bại
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $mail->ErrorInfo
    ]);
}
