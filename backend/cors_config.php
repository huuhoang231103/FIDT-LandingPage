<?php
/**
 * Production CORS Configuration
 * This file should be included at the top of all API endpoints
 */

// Define allowed origins
$allowed_origins = [
    'https://thinhvuongtaichinh.net',
    'https://www.thinhvuongtaichinh.net',
    'http://localhost:5173',  // For development
    'http://localhost:3000',  // Alternative dev port
    'http://127.0.0.1:5173', // Alternative dev address
];

// Get the request origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;

// Set CORS headers
if ($origin && in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // Fallback for same-origin requests
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Add Vary header for proper caching
header('Vary: Origin');
?>
