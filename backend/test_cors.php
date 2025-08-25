<?php
/**
 * Test CORS Configuration
 * This script helps verify that CORS headers are being set correctly
 */

require_once __DIR__ . '/cors_config.php';

// Set response content type
header('Content-Type: application/json; charset=UTF-8');

// Get request information
$request_info = [
    'method' => $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN',
    'origin' => $_SERVER['HTTP_ORIGIN'] ?? 'NO_ORIGIN',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'NO_USER_AGENT',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_time' => date('Y-m-d H:i:s T'),
    'cors_headers_set' => [
        'Access-Control-Allow-Origin' => headers_list()['Access-Control-Allow-Origin'] ?? 'NOT_SET',
        'Access-Control-Allow-Credentials' => headers_list()['Access-Control-Allow-Credentials'] ?? 'NOT_SET',
        'Access-Control-Allow-Methods' => headers_list()['Access-Control-Allow-Methods'] ?? 'NOT_SET'
    ]
];

// Return the information
echo json_encode($request_info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
