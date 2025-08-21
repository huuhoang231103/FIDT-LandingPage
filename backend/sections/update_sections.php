<?php
// update_sections.php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'POST, OPTIONS', 'Content-Type, Authorization, X-Requested-With, X-Admin-Token');

// Preflight handled by setup_cors

// === (Tùy) AUTH - uncomment / sửa theo hệ thống của bạn ===
// function isAdmin() {
//   if (!empty($_COOKIE['is_admin']) && $_COOKIE['is_admin'] === '1') return true;
//   $h = function_exists('getallheaders') ? getallheaders() : [];
//   if (!empty($h['X-Admin-Token']) && $h['X-Admin-Token'] === 'my-secret') return true;
//   return false;
// }
// if (!isAdmin()) { http_response_code(403); echo json_encode(['success'=>false,'message'=>'Unauthorized']); exit; }

$base = __DIR__ . '/../data_consolidated';
$fileA = $base . '/sections.json';
$fileB = $base . '/DataService.json';
$file = file_exists($fileA) ? $fileA : $fileB;

// ensure file exists
if (!$file) {
  if (!is_dir($base)) mkdir($base, 0755, true);
  $file = $fileA;
  $init = [
    'section_titles' => [],
    'services' => [],
    'free_services' => [],
    'trainings' => []
  ];
  file_put_contents($file, json_encode($init, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// read input
$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

// read current
$jsonRaw = file_get_contents($file);
$data = json_decode($jsonRaw, true);
if (!is_array($data)) $data = ['section_titles'=>[], 'services'=>[], 'free_services'=>[], 'trainings'=>[]];

/**
 * Case A: update by index for service-like arrays
 * payload: { index: int, service: {...}, type: 'services'|'free_services'|'trainings', isNew: bool, isDelete: bool }
 */
if (isset($payload['index']) && array_key_exists('service', $payload)) {
  $type = $payload['type'] ?? 'services';
  // normalize accepted keys
  if ($type !== 'free_services' && $type !== 'trainings') $type = 'services';
  if (!isset($data[$type]) || !is_array($data[$type])) $data[$type] = [];

  $index = (int)$payload['index'];
  $isNew = isset($payload['isNew']) && $payload['isNew'] === true;
  $isDelete = isset($payload['isDelete']) && $payload['isDelete'] === true;

  if ($isDelete) {
    if (!isset($data[$type][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    array_splice($data[$type], $index, 1);
  } else if ($isNew && $index === -1) {
    // append new item
    $data[$type][] = $payload['service'];
  } else {
    if (!isset($data[$type][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    $data[$type][$index] = $payload['service'];
  }
}
/**
 * Case B: merge section_titles
 * payload: { type: 'section_titles', section_titles: [...] }
 */
elseif (isset($payload['type']) && $payload['type'] === 'section_titles' && isset($payload['section_titles']) && is_array($payload['section_titles'])) {
  $data['section_titles'] = array_merge($data['section_titles'] ?? [], $payload['section_titles']);
}
else {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

// write with lock
$fp = fopen($file, 'c+');
if ($fp === false) {
  echo json_encode(['success' => false, 'message' => 'Không thể mở file để ghi'], JSON_UNESCAPED_UNICODE);
  exit;
}
if (flock($fp, LOCK_EX)) {
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  fflush($fp);
  flock($fp, LOCK_UN);
}
fclose($fp);

echo json_encode(['success' => true, 'message' => 'Cập nhật thành công'], JSON_UNESCAPED_UNICODE);
exit;
