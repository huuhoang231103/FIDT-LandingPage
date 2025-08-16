<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$jsonFile = __DIR__ . "/../datas/faqData.json";


if (!file_exists($jsonFile)) {
    echo json_encode([
        "success" => false,
        "message" => "Không tìm thấy file dữ liệu FAQ"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Đọc raw và loại BOM nếu có
$raw = file_get_contents($jsonFile);
if ($raw === false) {
    echo json_encode([
        "success" => false,
        "message" => "Không thể đọc file FAQ"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
if (substr($raw, 0, 3) === "\xEF\xBB\xBF") {
    $raw = substr($raw, 3);
}

$data = json_decode($raw, true);

// Nếu decode lỗi, báo chi tiết
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi đọc file JSON FAQ: " . json_last_error_msg()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Chuẩn hóa: chấp nhận 2 dạng file
 * A) { "faqData": [ ... ] }
 * B) [ ... ]  (mảng category thuần)
 */
$faqData = [];
if (is_array($data)) {
    if (isset($data['faqData']) && is_array($data['faqData'])) {
        $faqData = $data['faqData'];
    } elseif (array_keys($data) === range(0, count($data) - 1)) {
        // là mảng tuần tự -> coi như faqData luôn
        $faqData = $data;
    } else {
        // sai shape
        echo json_encode([
            "success" => false,
            "message" => "Cấu trúc file FAQ không hợp lệ (thiếu faqData)"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "File FAQ không đúng định dạng JSON mong đợi"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Đảm bảo từng category có questions là mảng
foreach ($faqData as $i => $cat) {
    if (!isset($cat['questions']) || !is_array($cat['questions'])) {
        $faqData[$i]['questions'] = [];
    }
}

echo json_encode([
    "success" => true,
    "data" => [
        "faqData" => $faqData
    ]
], JSON_UNESCAPED_UNICODE);
