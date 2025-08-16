<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
  http_response_code(200);
  exit();
}

$file = __DIR__ . '/../datas/trainings.json';

if (!file_exists($file)) {
  echo json_encode(['success' => false, 'message' => 'Không tìm thấy file dữ liệu'], JSON_UNESCAPED_UNICODE);
  exit;
}

$raw = file_get_contents($file);
$data = json_decode($raw, true);

if (!is_array($data) || !isset($data['trainings']) || !is_array($data['trainings'])) {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}
echo json_encode([
  'success' => true,
  'trainingTitle' => $data['trainingTitle'] ?? '',
  'trainingSubtitle' => $data['trainingSubtitle'] ?? '',
  'data' => $data['trainings']
], JSON_UNESCAPED_UNICODE);

