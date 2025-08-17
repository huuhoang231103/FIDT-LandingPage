<?php
// get_sections.php
header('Content-Type: application/json; charset=UTF-8');
// CORS (chỉnh origin nếu cần)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

$baseDir = realpath(__DIR__ . '/../data_consolidated');
if (!$baseDir) {
  http_response_code(500);
  echo json_encode(['success'=>false, 'message'=>'data_consolidated folder not found']);
  exit;
}
$file = $baseDir . '/sections.json';

if (!file_exists($file)) {
  // trả mặc định nếu không có file
  echo json_encode(['success'=>true, 'data'=>[
    'services'=>[], 'free_services'=>[], 'trainings'=>[], 'sections'=>[]
  ]]);
  exit;
}

$content = file_get_contents($file);
if ($content === false) {
  http_response_code(500);
  echo json_encode(['success'=>false, 'message'=>'Failed to read sections.json']);
  exit;
}

$data = json_decode($content, true);
if ($data === null) {
  // nếu JSON hỏng, return raw string để debug
  echo json_encode(['success'=>false, 'message'=>'Invalid JSON in sections.json', 'raw'=>$content]);
  exit;
}

echo json_encode(['success'=>true, 'data'=>$data]);
exit;
