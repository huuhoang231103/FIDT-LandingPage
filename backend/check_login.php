<?php
// Add CORS headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start session
session_start();

// Check if user is logged in
$isLoggedIn = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;

// Return login status
echo json_encode([
    'success' => true,
    'isLoggedIn' => $isLoggedIn,
    'user' => $isLoggedIn ? [
        'username' => $_SESSION['username'] ?? 'Unknown',
        'login_time' => $_SESSION['login_time'] ?? null
    ] : null
]);
?>
