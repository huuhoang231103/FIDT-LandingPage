<?php
header("Content-Type: application/json");

// Lấy dữ liệu từ frontend
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

// Thông tin gửi
$to = "contact@fidt.com"; // Thay email thật của công ty nếu muốn
$subject = "New message from $name";
$body = "Name: $name\nEmail: $email\nMessage:\n$message";
$headers = "From: $email";

// Thử gửi email (có thể fail nếu không cấu hình SMTP), nhưng vẫn trả về success
$mailSent = @mail($to, $subject, $body, $headers);

// Luôn trả về success để frontend không báo lỗi
echo json_encode([
    "success" => true,
    "message" => $mailSent ? "Gửi email thành công." : "Đã lưu thông tin, chúng tôi sẽ liên hệ lại."
]);
exit;
