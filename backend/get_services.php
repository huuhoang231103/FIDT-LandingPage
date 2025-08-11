<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

$jsonFile = __DIR__ . "/datas/DataService.json";


if (!file_exists($jsonFile)) {
    echo json_encode([
        "success" => false,
        "message" => "Không tìm thấy file dữ liệu"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode(file_get_contents($jsonFile), true);

if ($data === null) {
    echo json_encode([
        "success" => false,
        "message" => "Lỗi đọc file JSON"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    "success" => true,
    "data" => $data
], JSON_UNESCAPED_UNICODE);
