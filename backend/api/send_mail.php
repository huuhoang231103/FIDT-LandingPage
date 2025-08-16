<?php

// Add CORS headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Simple rate limiting (in-memory, for production use Redis/database)
session_start();
$rateLimitKey = 'contact_form_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$currentTime = time();
$rateLimitWindow = 15 * 60; // 15 minutes
$maxRequests = 5; // Max 5 requests per IP per 15 minutes

// Check rate limit
if (isset($_SESSION[$rateLimitKey])) {
    $lastRequest = $_SESSION[$rateLimitKey];
    if ($currentTime - $lastRequest < $rateLimitWindow) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.',
            'retry_after' => $rateLimitWindow - ($currentTime - $lastRequest)
        ]);
        exit;
    }
}

// Update rate limit
$_SESSION[$rateLimitKey] = $currentTime;

require_once __DIR__ . '/../services/mail.php';

/**
 * Validate email format
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate Vietnamese phone number format
 */
function validatePhone($phone) {
    // Remove all spaces and special characters
    $cleanPhone = preg_replace('/[^0-9+]/', '', $phone);
    
    // Vietnamese phone patterns: +84, 84, 0 followed by 9-10 digits
    $patterns = [
        '/^\+84[3|5|7|8|9][0-9]{8}$/',  // +84xxxxxxxxx
        '/^84[3|5|7|8|9][0-9]{8}$/',     // 84xxxxxxxxx
        '/^0[3|5|7|8|9][0-9]{8}$/'       // 0xxxxxxxxx
    ];
    
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $cleanPhone)) {
            return true;
        }
    }
    
    return false;
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    if (is_string($data)) {
        // Remove HTML tags and encode special characters
        $data = strip_tags($data);
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        // Trim whitespace
        $data = trim($data);
    }
    return $data;
}

/**
 * Validate required fields
 */
function validateRequiredFields($data, $requiredFields) {
    $missingFields = [];
    foreach ($requiredFields as $field) {
        if (empty($data[$field]) || $data[$field] === 'Chọn dịch vụ hoặc khóa học') {
            $missingFields[] = $field;
        }
    }
    return $missingFields;
}

try {
    // Get JSON input
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    // Validate JSON input
    if (!$data || !is_array($data)) {
        throw new Exception('Dữ liệu gửi lên không hợp lệ hoặc không phải dạng JSON.');
    }

    // Sanitize all input data
    $sanitizedData = [];
    foreach ($data as $key => $value) {
        $sanitizedData[$key] = sanitizeInput($value);
    }

    // Required fields validation
    $requiredFields = ['name', 'phone', 'email', 'service', 'message'];
    $missingFields = validateRequiredFields($sanitizedData, $requiredFields);

    if (!empty($missingFields)) {
        throw new Exception('Thiếu thông tin bắt buộc: ' . implode(', ', $missingFields));
    }

    // Validate email format
    if (!validateEmail($sanitizedData['email'])) {
        throw new Exception('Email không hợp lệ.');
    }

    // Validate phone format
    if (!validatePhone($sanitizedData['phone'])) {
        throw new Exception('Số điện thoại không hợp lệ. Vui lòng sử dụng định dạng Việt Nam.');
    }

    // Validate service selection
    if ($sanitizedData['service'] === 'Chọn dịch vụ hoặc khóa học') {
        throw new Exception('Vui lòng chọn dịch vụ hoặc khóa học.');
    }

    // Validate message length
    if (strlen($sanitizedData['message']) < 10) {
        throw new Exception('Nội dung tin nhắn phải có ít nhất 10 ký tự.');
    }

    if (strlen($sanitizedData['message']) > 1000) {
        throw new Exception('Nội dung tin nhắn không được vượt quá 1000 ký tự.');
    }

    // Validate name length
    if (strlen($sanitizedData['name']) < 2) {
        throw new Exception('Họ tên phải có ít nhất 2 ký tự.');
    }

    if (strlen($sanitizedData['name']) > 100) {
        throw new Exception('Họ tên không được vượt quá 100 ký tự.');
    }

    // Log the contact attempt
    error_log("Contact form submission from: " . $sanitizedData['email'] . " - " . $sanitizedData['name']);

    // Send email
    $emailResult = sendContactMailWithPHPMail($sanitizedData);

    // Check email result
    if ($emailResult === true) {
        // Success response - using the same message style as user's code
        echo json_encode([
            'success' => true,
            'message' => 'Your message has been sent successfully! We will contact you shortly.',
            'data' => [
                'timestamp' => date('Y-m-d H:i:s'),
                'submitted_at' => time()
            ]
        ]);
    } else {
        // Email failed
        throw new Exception('Không thể gửi email: ' . $emailResult);
    }

} catch (Exception $e) {
    // Log the error
    error_log("Contact form error: " . $e->getMessage());
    
    // Return error response
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_type' => 'validation_error'
    ]);
    
} catch (Error $e) {
    // Log system errors
    error_log("System error in contact form: " . $e->getMessage());
    
    // Return generic error (don't expose internal errors)
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi server. Vui lòng thử lại sau.',
        'error_type' => 'system_error'
    ]);
}
