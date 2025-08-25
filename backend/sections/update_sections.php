<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'POST, OPTIONS', 'Content-Type, Authorization, X-Requested-With');

// Placeholder auth check (to implement later)
// require_once __DIR__ . '/../auth/check_login.php';
// if (!is_admin_authenticated()) { http_response_code(401); echo json_encode(['success'=>false,'message'=>'Unauthorized']); exit; }

try {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);
    if (!is_array($body) || !isset($body['sections']) || !is_array($body['sections'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid payload: sections must be an array']);
        exit;
    }

    $file = __DIR__ . '/../data_consolidated/sections.json';
    $data = [ 'sections' => array_values(array_filter($body['sections'], fn($v)=>is_string($v) && trim($v) !== '')) ];

    if (!is_dir(dirname($file))) {
        mkdir(dirname($file), 0755, true);
    }

    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(['success' => true, 'message' => 'Updated', 'data' => $data]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
