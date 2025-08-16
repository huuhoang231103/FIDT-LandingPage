<?php
/**
 * Validator Utility
 * 
 * Provides comprehensive form data validation with detailed error messages.
 * 
 * @package FIDT-LandingPage
 * @subpackage Utils
 * @version 1.0.0
 * @author Your Name
 */

namespace FIDT\Utils;

/**
 * Validator Class
 * 
 * Handles form data validation with comprehensive error checking.
 */
class Validator
{
    /** @var array Common validation patterns */
    private const PATTERNS = [
        'email' => '/^[^\s@]+@[^\s@]+\.[^\s@]+$/',
        'phone' => '/^[0-9+\-\s()]+$/',
        'vietnamese_phone' => '/^(0|\+84)[0-9\s\-\(\)]{9,15}$/',
        'name' => '/^[a-zA-ZÀ-ỹ\s]+$/',
        'vietnamese_name' => '/^[a-zA-ZÀ-ỹ\s]+$/'
    ];

    /** @var array Field-specific validation rules */
    private const FIELD_RULES = [
        'name' => [
            'required' => true,
            'min_length' => 2,
            'max_length' => 100,
            'pattern' => 'vietnamese_name'
        ],
        'phone' => [
            'required' => true,
            'pattern' => 'vietnamese_phone',
            'min_length' => 10,
            'max_length' => 15
        ],
        'email' => [
            'required' => true,
            'pattern' => 'email',
            'max_length' => 255
        ],
        'service' => [
            'required' => true,
            'min_length' => 1
        ],
        'message' => [
            'required' => true,
            'min_length' => 10,
            'max_length' => 2000
        ]
    ];

    /**
     * Validate contact form data
     * 
     * @param array $data Form data to validate
     * @param array $requiredFields Required field names
     * @return array Validation result with 'valid' boolean and 'errors' array
     */
    public static function validateContactForm(array $data, array $requiredFields): array
    {
        $errors = [];

        // Check if data is array
        if (!is_array($data)) {
            return [
                'valid' => false,
                'errors' => ['general' => 'Invalid data format']
            ];
        }

        // Validate required fields
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                $errors[$field] = self::getFieldErrorMessage($field, 'required');
            }
        }

        // Validate individual fields
        foreach ($data as $field => $value) {
            if (isset(self::FIELD_RULES[$field])) {
                $fieldErrors = self::validateField($field, $value, self::FIELD_RULES[$field]);
                if (!empty($fieldErrors)) {
                    $errors[$field] = $fieldErrors;
                }
            }
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors
        ];
    }

    /**
     * Validate individual field
     * 
     * @param string $field Field name
     * @param mixed $value Field value
     * @param array $rules Validation rules
     * @return array Field-specific errors
     */
    private static function validateField(string $field, $value, array $rules): array
    {
        $errors = [];

        // Skip validation if value is empty and not required
        if (empty(trim($value)) && !($rules['required'] ?? false)) {
            return $errors;
        }

        // Required validation
        if (($rules['required'] ?? false) && empty(trim($value))) {
            $errors[] = self::getFieldErrorMessage($field, 'required');
        }

        // Length validation
        if (!empty($value)) {
            $length = mb_strlen(trim($value));
            
            if (isset($rules['min_length']) && $length < $rules['min_length']) {
                $errors[] = self::getFieldErrorMessage($field, 'min_length', $rules['min_length']);
            }
            
            if (isset($rules['max_length']) && $length > $rules['max_length']) {
                $errors[] = self::getFieldErrorMessage($field, 'max_length', $rules['max_length']);
            }
        }

        // Pattern validation
        if (!empty($value) && isset($rules['pattern'])) {
            $pattern = self::PATTERNS[$rules['pattern']] ?? $rules['pattern'];
            if (!preg_match($pattern, trim($value))) {
                $errors[] = self::getFieldErrorMessage($field, 'pattern');
            }
        }

        return $errors;
    }

    /**
     * Get field-specific error message
     * 
     * @param string $field Field name
     * @param string $errorType Error type
     * @param mixed $param Additional parameter for error message
     * @return string Error message
     */
    private static function getFieldErrorMessage(string $field, string $errorType, $param = null): string
    {
        $fieldNames = [
            'name' => 'Họ tên',
            'phone' => 'Số điện thoại',
            'email' => 'Email',
            'service' => 'Dịch vụ',
            'message' => 'Nội dung tin nhắn'
        ];

        $fieldName = $fieldNames[$field] ?? $field;

        switch ($errorType) {
            case 'required':
                return "Vui lòng nhập {$fieldName}.";
            
            case 'min_length':
                return "{$fieldName} phải có ít nhất {$param} ký tự.";
            
            case 'max_length':
                return "{$fieldName} không được vượt quá {$param} ký tự.";
            
            case 'pattern':
                switch ($field) {
                    case 'email':
                        return "Email không hợp lệ.";
                    case 'phone':
                        return "Số điện thoại không hợp lệ.";
                    case 'name':
                        return "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
                    default:
                        return "{$fieldName} không đúng định dạng.";
                }
            
            default:
                return "{$fieldName} không hợp lệ.";
        }
    }

    /**
     * Sanitize input data
     * 
     * @param array $data Data to sanitize
     * @return array Sanitized data
     */
    public static function sanitizeData(array $data): array
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Remove whitespace
                $value = trim($value);
                
                // Remove HTML tags
                $value = strip_tags($value);
                
                // Convert special characters
                $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            }
            
            $sanitized[$key] = $value;
        }

        return $sanitized;
    }

    /**
     * Validate email format
     * 
     * @param string $email Email to validate
     * @return bool True if valid, false otherwise
     */
    public static function isValidEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validate Vietnamese phone number
     * 
     * @param string $phone Phone number to validate
     * @return bool True if valid, false otherwise
     */
    public static function isValidVietnamesePhone(string $phone): bool
    {
        return preg_match(self::PATTERNS['vietnamese_phone'], $phone);
    }

    /**
     * Validate Vietnamese name
     * 
     * @param string $name Name to validate
     * @return bool True if valid, false otherwise
     */
    public static function isValidVietnameseName(string $name): bool
    {
        return preg_match(self::PATTERNS['vietnamese_name'], $name);
    }

    /**
     * Check if string contains only allowed characters
     * 
     * @param string $value Value to check
     * @param string $pattern Regex pattern
     * @return bool True if valid, false otherwise
     */
    public static function matchesPattern(string $value, string $pattern): bool
    {
        return preg_match($pattern, $value) === 1;
    }

    /**
     * Validate string length
     * 
     * @param string $value Value to check
     * @param int $min Minimum length
     * @param int $max Maximum length
     * @return bool True if valid, false otherwise
     */
    public static function isValidLength(string $value, int $min = 0, int $max = null): bool
    {
        $length = mb_strlen($value);
        
        if ($length < $min) {
            return false;
        }
        
        if ($max !== null && $length > $max) {
            return false;
        }
        
        return true;
    }
}
