<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'GET, OPTIONS', 'Content-Type, Authorization, X-Requested-With');

// Preflight handled by setup_cors

$file = __DIR__ . '/../data_consolidated/DataService.json';

if (!file_exists($file)) {
  echo json_encode(['success' => false, 'message' => 'Không tìm thấy file dữ liệu'], JSON_UNESCAPED_UNICODE);
  exit;
}

$raw = file_get_contents($file);
$data = json_decode($raw, true);

if (!is_array($data)) {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

// Return data in the structure that frontend expects
echo json_encode([
  'success' => true,
  'data' => [
    'section_titles' => $data['section_titles'] ?? [],
    'services' => $data['services'] ?? [],
    'free_services' => $data['free_services'] ?? []
  ]
], JSON_UNESCAPED_UNICODE);
?>
