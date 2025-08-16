<?php
/**
 * Response Handler
 * Centralized response handling for all API endpoints
 */

class ResponseHandler {
    /**
     * Send success response
     */
    public static function success($data = null, $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send error response
     */
    public static function error($message = 'Error', $statusCode = 400, $data = null) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send validation error response
     */
    public static function validationError($errors, $message = 'Validation failed') {
        self::error($message, 422, ['errors' => $errors]);
    }

    /**
     * Send not found response
     */
    public static function notFound($message = 'Resource not found') {
        self::error($message, 404);
    }

    /**
     * Send unauthorized response
     */
    public static function unauthorized($message = 'Unauthorized') {
        self::error($message, 401);
    }

    /**
     * Send forbidden response
     */
    public static function forbidden($message = 'Forbidden') {
        self::error($message, 403);
    }

    /**
     * Send server error response
     */
    public static function serverError($message = 'Internal server error') {
        self::error($message, 500);
    }

    /**
     * Handle CORS headers
     */
    public static function setCorsHeaders() {
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    /**
     * Validate required fields
     */
    public static function validateRequired($data, $requiredFields) {
        $errors = [];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $errors[] = "Field '{$field}' is required";
            }
        }

        if (!empty($errors)) {
            self::validationError($errors);
        }

        return true;
    }

    /**
     * Validate array index exists
     */
    public static function validateArrayIndex($array, $index, $arrayName = 'array') {
        if (!isset($array[$index])) {
            self::error("Index {$index} không tồn tại trong {$arrayName}", 400);
        }
        return true;
    }
}
