<?php
/**
 * Data Service
 * Centralized service for all data operations
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/ResponseHandler.php';

class DataService {
    private $dataType;
    private $data;

    public function __construct($dataType) {
        $this->dataType = $dataType;
        $this->loadData();
    }

    /**
     * Load data from file
     */
    private function loadData() {
        try {
            $this->data = DatabaseConfig::loadData($this->dataType);
        } catch (Exception $e) {
            ResponseHandler::serverError("Failed to load {$this->dataType} data: " . $e->getMessage());
        }
    }

    /**
     * Save data to file
     */
    private function saveData() {
        try {
            DatabaseConfig::saveData($this->dataType, $this->data);
            return true;
        } catch (Exception $e) {
            ResponseHandler::serverError("Failed to save {$this->dataType} data: " . $e->getMessage());
        }
    }

    /**
     * Get all data
     */
    public function getAll() {
        return $this->data;
    }

    /**
     * Get specific section
     */
    public function getSection($section) {
        if (!isset($this->data[$section])) {
            ResponseHandler::notFound("Section '{$section}' not found in {$this->dataType}");
        }
        return $this->data[$section];
    }

    /**
     * Update specific section
     */
    public function updateSection($section, $newData) {
        if (!isset($this->data[$section])) {
            ResponseHandler::notFound("Section '{$section}' not found in {$this->dataType}");
        }

        $this->data[$section] = $newData;
        $this->saveData();
        
        return $this->data;
    }

    /**
     * Update array item by index
     */
    public function updateArrayItem($section, $index, $itemData, $isNew = false, $isDelete = false) {
        if (!isset($this->data[$section]) || !is_array($this->data[$section])) {
            ResponseHandler::notFound("Section '{$section}' not found or not an array in {$this->dataType}");
        }

        if ($isDelete) {
            // Delete item
            ResponseHandler::validateArrayIndex($this->data[$section], $index, $section);
            array_splice($this->data[$section], $index, 1);
        } elseif ($isNew && $index === -1) {
            // Add new item
            $this->data[$section][] = $itemData;
        } else {
            // Update existing item
            ResponseHandler::validateArrayIndex($this->data[$section], $index, $section);
            $this->data[$section][$index] = $itemData;
        }

        $this->saveData();
        return $this->data;
    }

    /**
     * Get array item by index
     */
    public function getArrayItem($section, $index) {
        if (!isset($this->data[$section]) || !is_array($this->data[$section])) {
            ResponseHandler::notFound("Section '{$section}' not found or not an array in {$this->dataType}");
        }

        ResponseHandler::validateArrayIndex($this->data[$section], $index, $section);
        return $this->data[$section][$index];
    }

    /**
     * Validate data structure
     */
    public function validateStructure() {
        return DatabaseConfig::validateData($this->dataType, $this->data);
    }
}
