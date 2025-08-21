<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../cors.php';
setup_cors(null, 'POST, OPTIONS', 'Content-Type, Authorization, X-Requested-With');

// Preflight handled by setup_cors

$file = __DIR__ . '/../data_consolidated/DataService.json';

if (!file_exists($file)) {
  echo json_encode(['success' => false, 'message' => 'Không tìm thấy file dữ liệu'], JSON_UNESCAPED_UNICODE);
  exit;
}

// Đọc payload
$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload)) {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

// Đọc file JSON hiện tại
$jsonRaw = file_get_contents($file);
$data = json_decode($jsonRaw, true);

if (!is_array($data)) {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

/**
 * Trường hợp 1: Update 1 item service theo index
 */
if (isset($payload['index']) && array_key_exists('service', $payload)) {
  $type = $payload['type'] ?? 'services';
  $targetArray = $type === 'free_services' ? 'free_services' : 'services';
  
  if (!isset($data[$targetArray]) || !is_array($data[$targetArray])) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy danh sách ' . $targetArray], JSON_UNESCAPED_UNICODE);
    exit;
  }

  $index = (int)$payload['index'];
  $isNew = isset($payload['isNew']) && $payload['isNew'] === true;
  $isDelete = isset($payload['isDelete']) && $payload['isDelete'] === true;

  // Handle service deletion
  if ($isDelete) {
    if (!isset($data[$targetArray][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    // Remove the service from the array
    array_splice($data[$targetArray], $index, 1);
  }
  // Handle new service creation
  else if ($isNew && $index === -1) {
    // Add new service to the end of the array
    $data[$targetArray][] = $payload['service'];
  } else {
    // Update existing service
    if (!isset($data[$targetArray][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    $data[$targetArray][$index] = $payload['service'];
  }
}
/**
 * Trường hợp 2: Update section_titles
 */
elseif (isset($payload['type']) && $payload['type'] === 'section_titles' && isset($payload['section_titles'])) {
  $data['section_titles'] = array_merge(
    $data['section_titles'] ?? [],
    $payload['section_titles']
  );
}
/**
 * Không khớp yêu cầu nào
 */
else {
  echo json_encode(['success' => false, 'message' => 'Dữ liệu gửi lên không hợp lệ'], JSON_UNESCAPED_UNICODE);
  exit;
}

// Lưu file
if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
  echo json_encode(['success' => true, 'message' => 'Cập nhật thành công'], JSON_UNESCAPED_UNICODE);
} else {
  echo json_encode(['success' => false, 'message' => 'Lỗi khi ghi file'], JSON_UNESCAPED_UNICODE);
}
?>
