<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
  http_response_code(200);
  exit();
}

$file = __DIR__ . '/../datas/trainings.json';

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
 * Trường hợp 1: Update 1 item training theo index
 */
if (isset($payload['index']) && array_key_exists('training', $payload)) {
  if (!isset($data['trainings']) || !is_array($data['trainings'])) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy danh sách trainings'], JSON_UNESCAPED_UNICODE);
    exit;
  }

  $index = (int)$payload['index'];
  $isNew = isset($payload['isNew']) && $payload['isNew'] === true;
  $isDelete = isset($payload['isDelete']) && $payload['isDelete'] === true;

  // Handle training deletion
  if ($isDelete) {
    if (!isset($data['trainings'][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    // Remove the training from the array
    array_splice($data['trainings'], $index, 1);
  }
  // Handle new training creation
  else if ($isNew && $index === -1) {
    // Add new training to the end of the array
    $data['trainings'][] = $payload['training'];
  } else {
    // Update existing training
    if (!isset($data['trainings'][$index])) {
      echo json_encode(['success' => false, 'message' => 'Index không tồn tại'], JSON_UNESCAPED_UNICODE);
      exit;
    }
    $data['trainings'][$index] = $payload['training'];
  }

}
/**
 * Trường hợp 2: Update tiêu đề và subtitle
 */
elseif (isset($payload['trainingTitle']) && isset($payload['trainingSubtitle'])) {
  $data['trainingTitle'] = $payload['trainingTitle'];
  $data['trainingSubtitle'] = $payload['trainingSubtitle'];
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
