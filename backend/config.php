<?php
// backend/config.php

// Cấu hình email
define('ADMIN_EMAIL', 'admin@fidt.com'); // Email nhận liên hệ
define('FROM_EMAIL', 'noreply@fidt.com'); // Email gửi đi
define('COMPANY_NAME', 'FIDT Team');
define('WEBSITE_URL', 'https://fidt.com');

// Cấu hình bảo mật
define('MAX_EMAILS_PER_HOUR', 5); // Giới hạn 5 email/giờ từ 1 IP
define('SPAM_KEYWORDS', ['spam', 'bitcoin', 'casino', 'lottery', 'winner', 'viagra', 'pills']);

// Hàm kiểm tra rate limit
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_file = "rate_limit_" . md5($ip) . ".json";
    
    if (file_exists($rate_file)) {
        $data = json_decode(file_get_contents($rate_file), true) ?? [];
        
        // Xóa entries cũ hơn 1 giờ
        $current_time = time();
        $data = array_filter($data, function($timestamp) use ($current_time) {
            return $timestamp > ($current_time - 3600);
        });
        
        if (count($data) >= MAX_EMAILS_PER_HOUR) {
            return false;
        }
    } else {
        $data = [];
    }
    
    // Thêm timestamp hiện tại
    $data[] = time();
    file_put_contents($rate_file, json_encode($data));
    
    return true;
}

// Hàm kiểm tra spam
function checkSpam($message) {
    $message = strtolower($message);
    
    foreach (SPAM_KEYWORDS as $keyword) {
        if (strpos($message, $keyword) !== false) {
            return true;
        }
    }
    
    // Kiểm tra quá nhiều link
    if (substr_count($message, 'http') > 2) {
        return true;
    }
    
    return false;
}

// Hàm clean input
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Hàm log lỗi
function logError($message) {
    $log_file = 'error.log';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $log_entry = "[$timestamp] [$ip] $message\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}
?>