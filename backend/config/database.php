<?php
/**
 * Database Configuration
 * Centralized configuration for all database operations
 */

class DatabaseConfig {
    // File paths
    const DATA_FILES = [
        'services' => __DIR__ . '/../datas/DataService.json',
        'trainings' => __DIR__ . '/../datas/trainings.json',
        'faqs' => __DIR__ . '/../datas/faqData.json'
    ];

    // Default data structures
    const DEFAULT_STRUCTURES = [
        'services' => [
            'services' => [],
            'free_services' => [],
            'section_titles' => [
                'main_title' => 'Dịch vụ của chúng tôi',
                'main_subtitle' => 'Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.',
                'paid_services_title' => 'Dịch vụ Tư Vấn Chuyên Nghiệp',
                'free_services_title' => '🎁 Ưu Đãi Đặc Biệt – Gói Tư Vấn Miễn Phí',
                'free_services_subtitle' => 'Trải nghiệm ngay dịch vụ tư vấn cá nhân hóa, hoàn toàn miễn phí – giúp bạn định hướng rõ ràng và tự tin trong từng quyết định tài chính.'
            ]
        ],
        'trainings' => [
            'trainings' => [],
            'trainingTitle' => 'Khóa học tài chính',
            'trainingSubtitle' => 'Nâng cao kiến thức tài chính cá nhân'
        ],
        'faqs' => [
            'faqs' => []
        ]
    ];

    /**
     * Load data from file
     */
    public static function loadData($type) {
        if (!isset(self::DATA_FILES[$type])) {
            throw new Exception("Unknown data type: {$type}");
        }

        $filePath = self::DATA_FILES[$type];
        
        if (!file_exists($filePath)) {
            // Create file with default structure if it doesn't exist
            self::createDefaultFile($type, $filePath);
        }

        $jsonData = file_get_contents($filePath);
        $data = json_decode($jsonData, true);

        if (!is_array($data)) {
            throw new Exception("Invalid JSON data in {$type} file");
        }

        return $data;
    }

    /**
     * Save data to file
     */
    public static function saveData($type, $data) {
        if (!isset(self::DATA_FILES[$type])) {
            throw new Exception("Unknown data type: {$type}");
        }

        $filePath = self::DATA_FILES[$type];
        $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        if (file_put_contents($filePath, $jsonData) === false) {
            throw new Exception("Failed to write to {$type} file");
        }

        return true;
    }

    /**
     * Create default file with structure
     */
    private static function createDefaultFile($type, $filePath) {
        $defaultData = self::DEFAULT_STRUCTURES[$type] ?? [];
        $jsonData = json_encode($defaultData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        // Ensure directory exists
        $directory = dirname($filePath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
        
        if (file_put_contents($filePath, $jsonData) === false) {
            throw new Exception("Failed to create default {$type} file");
        }
    }

    /**
     * Validate data structure
     */
    public static function validateData($type, $data) {
        if (!is_array($data)) {
            return false;
        }

        $requiredKeys = array_keys(self::DEFAULT_STRUCTURES[$type] ?? []);
        
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $data)) {
                return false;
            }
        }

        return true;
    }
}
