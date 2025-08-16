<?php
/**
 * Response Handler Utility
 * 
 * Provides consistent API response formatting and error handling.
 * 
 * @package FIDT-LandingPage
 * @subpackage Utils
 * @version 1.0.0
 * @author Your Name
 */

namespace FIDT\Utils;

/**
 * Response Handler Class
 * 
 * Handles API response formatting and error handling.
 */
class ResponseHandler
{
    /** @var array Default success response structure */
    private const SUCCESS_STRUCTURE = [
        'success' => true,
        'message' => '',
        'data' => null,
        'timestamp' => ''
    ];

    /** @var array Default error response structure */
    private const ERROR_STRUCTURE = [
        'success' => false,
        'message' => '',
        'error' => null,
        'timestamp' => ''
    ];

    /**
     * Send success response
     * 
     * @param string $message Success message
     * @param mixed $data Response data
     * @param int $statusCode HTTP status code
     */
    public static function success(string $message = '', $data = null, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        
        $response = self::SUCCESS_STRUCTURE;
        $response['message'] = $message;
        $response['data'] = $data;
        $response['timestamp'] = date('Y-m-d H:i:s');
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Send error response
     * 
     * @param string $message Error message
     * @param mixed $error Error details
     * @param int $statusCode HTTP status code
     */
    public static function error(string $message = '', $error = null, int $statusCode = 500): void
    {
        http_response_code($statusCode);
        
        $response = self::ERROR_STRUCTURE;
        $response['message'] = $message;
        $response['error'] = $error;
        $response['timestamp'] = date('Y-m-d H:i:s');
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Send validation error response
     * 
     * @param array $errors Validation errors
     * @param string $message Error message
     */
    public static function validationError(array $errors, string $message = 'Validation failed'): void
    {
        http_response_code(422);
        
        $response = self::ERROR_STRUCTURE;
        $response['message'] = $message;
        $response['error'] = [
            'type' => 'validation',
            'details' => $errors
        ];
        $response['timestamp'] = date('Y-m-d H:i:s');
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Send not found response
     * 
     * @param string $message Not found message
     */
    public static function notFound(string $message = 'Resource not found'): void
    {
        self::error($message, null, 404);
    }

    /**
     * Send unauthorized response
     * 
     * @param string $message Unauthorized message
     */
    public static function unauthorized(string $message = 'Unauthorized'): void
    {
        self::error($message, null, 401);
    }

    /**
     * Send forbidden response
     * 
     * @param string $message Forbidden message
     */
    public static function forbidden(string $message = 'Forbidden'): void
    {
        self::error($message, null, 403);
    }

    /**
     * Send method not allowed response
     * 
     * @param string $message Method not allowed message
     */
    public static function methodNotAllowed(string $message = 'Method not allowed'): void
    {
        self::error($message, null, 405);
    }

    /**
     * Send rate limit exceeded response
     * 
     * @param string $message Rate limit message
     */
    public static function rateLimitExceeded(string $message = 'Rate limit exceeded'): void
    {
        http_response_code(429);
        
        $response = self::ERROR_STRUCTURE;
        $response['message'] = $message;
        $response['error'] = [
            'type' => 'rate_limit',
            'retry_after' => 60 // seconds
        ];
        $response['timestamp'] = date('Y-m-d H:i:s');
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Send health check response
     * 
     * @param array $data Health check data
     */
    public static function healthCheck(array $data = []): void
    {
        $response = [
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0.0',
            'services' => $data
        ];
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Log API request
     * 
     * @param string $method HTTP method
     * @param string $endpoint API endpoint
     * @param int $statusCode HTTP status code
     * @param float $responseTime Response time in seconds
     */
    public static function logRequest(string $method, string $endpoint, int $statusCode, float $responseTime): void
    {
        $logData = [
            'method' => $method,
            'endpoint' => $endpoint,
            'status_code' => $statusCode,
            'response_time' => round($responseTime, 3),
            'timestamp' => date('Y-m-d H:i:s'),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ];

        error_log("API Request: " . json_encode($logData));
    }
}
