<?php
/**
 * Contact Form API Endpoint
 * 
 * Handles contact form submissions with email sending and Google Sheets integration.
 * 
 * @package FIDT-LandingPage
 * @version 1.0.0
 * @author Your Name
 */

// Enable error reporting for development
if ($_ENV['APP_DEBUG'] ?? false) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

// Load required files
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../services/mail/ContactMailService.php';
require_once __DIR__ . '/../../services/sheets/GoogleSheetsService.php';
require_once __DIR__ . '/../../utils/ResponseHandler.php';
require_once __DIR__ . '/../../utils/Validator.php';

use Dotenv\Dotenv;
use FIDT\Services\Mail\ContactMailService;
use FIDT\Services\Sheets\GoogleSheetsService;
use FIDT\Utils\ResponseHandler;
use FIDT\Utils\Validator;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHandler::error('Method not allowed', 405);
    exit();
}

try {
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    // Validate JSON input
    if (json_last_error() !== JSON_ERROR_NONE) {
        ResponseHandler::error('Invalid JSON format', 400);
        exit();
    }

    // Validate required fields
    $requiredFields = ['name', 'phone', 'email', 'service', 'message'];
    $validationResult = Validator::validateContactForm($data, $requiredFields);
    
    if (!$validationResult['valid']) {
        ResponseHandler::validationError($validationResult['errors']);
        exit();
    }

    // Validate service selection
    if ($data['service'] === 'Chọn dịch vụ hoặc khóa học') {
        ResponseHandler::validationError(['service' => 'Vui lòng chọn dịch vụ hoặc khóa học.']);
        exit();
    }

    // Initialize services
    $mailService = new ContactMailService();
    $sheetsService = new GoogleSheetsService();

    // Send email
    $emailResult = $mailService->sendContactEmail($data);

    // Send data to Google Sheets
    $sheetsResult = $sheetsService->sendDataToSheets($data);

    // Prepare response
    $response = [
        'success' => true,
        'message' => 'Gửi email và lưu dữ liệu thành công.',
        'email_sent' => $emailResult === true,
        'sheets_updated' => $sheetsResult === true,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Handle partial success
    if ($emailResult === true && $sheetsResult !== true) {
        $response['message'] = 'Gửi email thành công nhưng có lỗi khi lưu dữ liệu.';
        $response['sheets_error'] = $sheetsResult;
    } elseif ($emailResult !== true && $sheetsResult === true) {
        $response['message'] = 'Lưu dữ liệu thành công nhưng gửi email thất bại.';
        $response['email_error'] = $emailResult;
        http_response_code(500);
    } elseif ($emailResult !== true && $sheetsResult !== true) {
        $response['success'] = false;
        $response['message'] = 'Gửi email và lưu dữ liệu đều thất bại.';
        $response['email_error'] = $emailResult;
        $response['sheets_error'] = $sheetsResult;
        http_response_code(500);
    }

    // Log successful submission
    error_log("Contact form submitted successfully: " . json_encode([
        'name' => $data['name'],
        'email' => $data['email'],
        'service' => $data['service'],
        'timestamp' => date('Y-m-d H:i:s')
    ]));

    // Send response
    echo json_encode($response);

} catch (Exception $e) {
    // Log error
    error_log("Contact form error: " . $e->getMessage());
    
    // Send error response
    ResponseHandler::error('Internal server error', 500);
}
