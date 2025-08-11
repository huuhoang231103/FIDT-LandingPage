<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['index']) || !isset($input['type']) || !isset($input['service'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit;
}

// Đường dẫn file gốc
$filePath = __DIR__ . '/datas/DataService.json';

// Kiểm tra file tồn tại
if (!file_exists($filePath)) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy file dữ liệu']);
    exit;
}

// Đọc dữ liệu
$data = json_decode(file_get_contents($filePath), true);
if (!is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'File dữ liệu bị lỗi']);
    exit;
}

$type = $input['type']; // "services" hoặc "free_services"
$index = $input['index'];
$service = $input['service'];

// Đảm bảo mảng tồn tại
if (!isset($data[$type]) || !is_array($data[$type])) {
    echo json_encode(['success' => false, 'message' => "Không tìm thấy mảng {$type}"]);
    exit;
}

// Cập nhật dữ liệu
$data[$type][$index] = $service;

// Lưu lại file gốc
if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công', 'newData' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu file']);
}
