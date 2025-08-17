<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Đọc file sections.json để lấy trạng thái visibility
    $sectionsFile = __DIR__ . "/../data_consolidated/sections.json";
    
    if (!file_exists($sectionsFile)) {
        // Tạo file mặc định nếu chưa có
        $defaultSections = [
            [
                "id" => "hero",
                "name" => "Hero Section",
                "visible" => true
            ],
            [
                "id" => "about",
                "name" => "Giới thiệu",
                "visible" => true
            ],
            [
                "id" => "services",
                "name" => "Dịch vụ",
                "visible" => true
            ],
            [
                "id" => "courses",
                "name" => "Khóa học",
                "visible" => true
            ],
            [
                "id" => "projects",
                "name" => "Dự án",
                "visible" => true
            ],
            [
                "id" => "faq",
                "name" => "FAQ",
                "visible" => true
            ],
            [
                "id" => "contact",
                "name" => "Liên hệ",
                "visible" => true
            ]
        ];
        
        file_put_contents($sectionsFile, json_encode($defaultSections, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    
    $sectionsData = json_decode(file_get_contents($sectionsFile), true);
    
    if ($sectionsData === null) {
        throw new Exception("Không thể đọc dữ liệu sections");
    }
    
    echo json_encode([
        'success' => true,
        'data' => $sectionsData,
        'message' => 'Lấy danh sách sections thành công'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi: ' . $e->getMessage()
    ]);
}
?>
