<?php
/**
 * Google Sheets Service
 * 
 * Handles integration with Google Sheets for data storage.
 * 
 * @package FIDT-LandingPage
 * @subpackage Services\Sheets
 * @version 1.0.0
 * @author Your Name
 */

namespace FIDT\Services\Sheets;

/**
 * Google Sheets Service Class
 * 
 * Provides methods for sending data to Google Sheets via Google Apps Script.
 */
class GoogleSheetsService
{
    /** @var int Request timeout in seconds */
    private const REQUEST_TIMEOUT = 30;
    
    /** @var string User agent for requests */
    private const USER_AGENT = 'FIDT-LandingPage/1.0';

    /**
     * Send contact form data to Google Sheets
     * 
     * @param array $data Contact form data
     * @return bool|string True on success, error message on failure
     */
    public function sendDataToSheets(array $data): bool|string
    {
        // Validate Google Script URL configuration
        $scriptUrl = $_ENV['GOOGLE_SCRIPT_URL'] ?? '';
        if (empty($scriptUrl)) {
            $this->logError('Google Script URL not configured');
            return 'Google Script URL not configured';
        }

        try {
            // Prepare data for Google Sheets
            $sheetsData = $this->prepareSheetsData($data);
            
            // Send data to Google Sheets
            $response = $this->sendRequest($scriptUrl, $sheetsData);
            
            // Process response
            return $this->processResponse($response);

        } catch (Exception $e) {
            $this->logError('Google Sheets error: ' . $e->getMessage());
            return 'Google Sheets error: ' . $e->getMessage();
        }
    }

    /**
     * Prepare data for Google Sheets
     * 
     * @param array $data Contact form data
     * @return array Formatted data for Google Sheets
     */
    private function prepareSheetsData(array $data): array
    {
        return [
            'name' => $data['name'] ?? '',
            'phone' => $data['phone'] ?? '',
            'email' => $data['email'] ?? '',
            'service' => $data['service'] ?? '',
            'message' => $data['message'] ?? '',
            'subscribe' => $data['subscribe'] ?? false,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Send HTTP request to Google Apps Script
     * 
     * @param string $url Google Script URL
     * @param array $data Data to send
     * @return array Response data
     * @throws Exception On request failure
     */
    private function sendRequest(string $url, array $data): array
    {
        // Initialize cURL
        $ch = curl_init();
        
        // Set cURL options
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Content-Length: ' . strlen(json_encode($data)),
                'User-Agent: ' . self::USER_AGENT
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => self::REQUEST_TIMEOUT,
            CURLOPT_SSL_VERIFYPEER => false, // Only for development
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3
        ]);

        // Execute request
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        // Log request details
        $this->logRequest($url, $data, $httpCode, $response, $curlError);

        // Check for cURL errors
        if ($curlError) {
            throw new Exception("cURL Error: " . $curlError);
        }

        // Check HTTP status code
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }

        // Parse JSON response
        $responseData = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Invalid JSON response: " . $response);
        }

        return $responseData;
    }

    /**
     * Process Google Script response
     * 
     * @param array $response Response from Google Script
     * @return bool|string True on success, error message on failure
     */
    private function processResponse(array $response): bool|string
    {
        // Check for success response
        if (isset($response['result']) && $response['result'] === 'success') {
            $this->logSuccess($response);
            return true;
        }

        // Handle error response
        $error = $response['error'] ?? 'Unknown error';
        $this->logError('Google Script error: ' . $error);
        return 'Google Script Error: ' . $error;
    }

    /**
     * Log successful request
     * 
     * @param array $response Response data
     */
    private function logSuccess(array $response): void
    {
        error_log("Google Sheets data sent successfully: " . json_encode([
            'result' => $response['result'] ?? 'unknown',
            'message' => $response['message'] ?? 'no message',
            'timestamp' => $response['timestamp'] ?? date('Y-m-d H:i:s')
        ]));
    }

    /**
     * Log request details
     * 
     * @param string $url Request URL
     * @param array $data Request data
     * @param int $httpCode HTTP status code
     * @param string $response Response body
     * @param string $curlError cURL error (if any)
     */
    private function logRequest(string $url, array $data, int $httpCode, string $response, string $curlError): void
    {
        $logData = [
            'url' => $url,
            'data' => $data,
            'http_code' => $httpCode,
            'response' => substr($response, 0, 500), // Limit response length
            'curl_error' => $curlError ?: 'none',
            'timestamp' => date('Y-m-d H:i:s')
        ];

        error_log("Google Sheets request: " . json_encode($logData));
    }

    /**
     * Log error message
     * 
     * @param string $error Error message
     */
    private function logError(string $error): void
    {
        error_log("Google Sheets error: " . $error);
    }

    /**
     * Test Google Sheets connection
     * 
     * @return bool|string True on success, error message on failure
     */
    public function testConnection(): bool|string
    {
        $scriptUrl = $_ENV['GOOGLE_SCRIPT_URL'] ?? '';
        if (empty($scriptUrl)) {
            return 'Google Script URL not configured';
        }

        try {
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL => $scriptUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_USERAGENT => self::USER_AGENT
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);

            if ($curlError) {
                return "cURL Error: " . $curlError;
            }

            if ($httpCode !== 200) {
                return "HTTP Error: " . $httpCode;
            }

            $responseData = json_decode($response, true);
            if (isset($responseData['status']) && $responseData['status'] === 'running') {
                return true;
            }

            return "Invalid response from Google Script";

        } catch (Exception $e) {
            return "Connection test error: " . $e->getMessage();
        }
    }
}
