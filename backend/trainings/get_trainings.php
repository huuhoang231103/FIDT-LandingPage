<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'GET, OPTIONS', 'Content-Type, Authorization, X-Requested-With');

// Preflight handled by setup_cors

$file = __DIR__ . '/../data_consolidated/trainings.json';

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

