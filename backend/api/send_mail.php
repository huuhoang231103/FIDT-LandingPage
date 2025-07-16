<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$name = trim($data["name"] ?? '');
$email = trim($data["email"] ?? '');
$message = trim($data["message"] ?? '');
$subscribe = !empty($data["subscribe"]) ? "Yes" : "No";

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$to = "your-email@example.com";
$subject = "New Contact Form Submission from $name";

$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Message:\n$message\n\n";
$body .= "Subscribe to newsletter: $subscribe\n";

$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$mailResult = mail($to, $subject, $body, $headers);

if ($mailResult) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    echo json_encode(["success" => true, "message" => "Message received. Email not sent (local environment)."]);
}
?>
