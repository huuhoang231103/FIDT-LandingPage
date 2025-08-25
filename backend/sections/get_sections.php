<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'GET, OPTIONS', 'Content-Type, Authorization, X-Requested-With');

try {
    $file = __DIR__ . '/../data_consolidated/sections.json';
    if (!file_exists($file)) {
        echo json_encode(['success' => false, 'message' => 'sections.json not found']);
        exit;
    }
    $raw = file_get_contents($file);
    $json = json_decode($raw, true);
    if (!is_array($json) || !isset($json['sections']) || !is_array($json['sections'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid sections.json format']);
        exit;
    }
    echo json_encode(['success' => true, 'data' => $json['sections']], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
