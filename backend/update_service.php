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

if (!$input || !isset($input['type'])) {
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

$type = $input['type'];

/**
 * Trường hợp 1: Update 1 service hoặc free_service
 */
if (isset($input['index']) && array_key_exists('service', $input) && ($type === 'services' || $type === 'free_services')) {

    $index = $input['index'];
    $service = $input['service'];
    $isNew = isset($input['isNew']) && $input['isNew'] === true;
    $isDelete = isset($input['isDelete']) && $input['isDelete'] === true;

    if (!isset($data[$type]) || !is_array($data[$type])) {
        echo json_encode(['success' => false, 'message' => "Không tìm thấy mảng {$type}"]);
        exit;
    }

    // Handle service deletion
    if ($isDelete) {
        if (!isset($data[$type][$index])) {
            echo json_encode(['success' => false, 'message' => "Index {$index} không tồn tại trong {$type}"]);
            exit;
        }
        // Remove the service from the array
        array_splice($data[$type], $index, 1);
    }
    // Handle new service creation
    else if ($isNew && $index === -1) {
        // Add new service to the end of the array
        $data[$type][] = $service;
    } else {
        // Update existing service
        if (!isset($data[$type][$index])) {
            echo json_encode(['success' => false, 'message' => "Index {$index} không tồn tại trong {$type}"]);
            exit;
        }
        $data[$type][$index] = $service;
    }
}
/**
 * Trường hợp 2: Update section_titles
 */
elseif ($type === 'section_titles' && isset($input['section_titles']) && is_array($input['section_titles'])) {
    $data['section_titles'] = $input['section_titles'];
}
/**
 * Không khớp yêu cầu nào
 */
else {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ']);
    exit;
}

// Lưu lại file gốc
if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công', 'newData' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu file']);
}
