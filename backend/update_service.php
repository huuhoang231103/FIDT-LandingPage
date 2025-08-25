<?php
header('Content-Type: application/json; charset=UTF-8');

// Cho phép nhiều origin
$allowed_origins = [
  "http://localhost:5173",
  "https://thinhvuongtaichinh.net"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
  http_response_code(200);
  exit();
}
