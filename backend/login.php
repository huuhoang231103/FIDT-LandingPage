<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173"); // FE URL
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Xử lý preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Đảm bảo cookie session cross-site được gửi
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', 'false'); // Để test HTTP local, production cần true
session_start();

// Giả sử user/pass mặc định
$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if ($username === 'admin' && $password === '123') {
    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $username;
    echo json_encode(['success' => true, 'message' => 'Đăng nhập thành công']);
} else {
    echo json_encode(['success' => false, 'message' => 'Sai tài khoản hoặc mật khẩu']);
}
