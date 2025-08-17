<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
if (substr($rawInput, 0, 3) === "\xEF\xBB\xBF") {
    $rawInput = substr($rawInput, 3);
}
$input = json_decode($rawInput, true);

if (!$input || !isset($input['type'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit;
}

$filePath = __DIR__ . '/../data_consolidated/faqData.json';

if (!file_exists($filePath)) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy file dữ liệu FAQ']);
    exit;
}

$raw = file_get_contents($filePath);
if ($raw === false) {
    echo json_encode(['success' => false, 'message' => 'Không thể đọc file FAQ']);
    exit;
}
if (substr($raw, 0, 3) === "\xEF\xBB\xBF") {
    $raw = substr($raw, 3);
}
$data = json_decode($raw, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => 'File dữ liệu FAQ bị lỗi: ' . json_last_error_msg()]);
    exit;
}

// Chuẩn hóa vùng lưu làm việc thành mảng faqData
$store = [];
if (isset($data['faqData']) && is_array($data['faqData'])) {
    $store = $data['faqData'];
} elseif (is_array($data) && array_keys($data) === range(0, count($data) - 1)) {
    $store = $data;
} else {
    // Nếu file rỗng/sai, reset
    $store = [];
}

$type = $input['type'];

/**
 * Trường hợp 1: Update 1 category trong faqData
 * payload: { type: 'faqData', categoryIndex: number, categoryData: {...} }
 */
if ($type === 'faqData' && isset($input['categoryIndex']) && isset($input['categoryData'])) {
    $index = (int)$input['categoryIndex'];
    $categoryData = $input['categoryData'];

    if (!isset($store[$index])) {
        echo json_encode(['success' => false, 'message' => "Index {$index} không tồn tại trong faqData"]);
        exit;
    }

    // Đảm bảo questions là mảng
    if (!isset($categoryData['questions']) || !is_array($categoryData['questions'])) {
        $categoryData['questions'] = [];
    }

    $store[$index] = $categoryData;
}
/**
 * Trường hợp 2: Update toàn bộ faqData
 * payload: { type: 'faqData_all', faqData: [ ... ] }
 */
elseif ($type === 'faqData_all' && isset($input['faqData']) && is_array($input['faqData'])) {
    // Đảm bảo từng category có questions array
    $newArr = $input['faqData'];
    foreach ($newArr as $i => $cat) {
        if (!isset($cat['questions']) || !is_array($cat['questions'])) {
            $newArr[$i]['questions'] = [];
        }
    }
    $store = $newArr;
}
else {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ']);
    exit;
}

// Ghi đè lại theo đúng shape có khóa 'faqData'
$toWrite = ['faqData' => $store];

if (file_put_contents($filePath, json_encode($toWrite, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật FAQ thành công', 'newData' => $toWrite], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu file FAQ'], JSON_UNESCAPED_UNICODE);
}
