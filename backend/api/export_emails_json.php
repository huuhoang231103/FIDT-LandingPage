<?php
// Set headers for Excel download
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="emails_' . date('Y-m-d_H-i-s') . '.xls"');
header('Cache-Control: max-age=0');

try {
    $jsonFile = __DIR__ . '/../data_consolidated/emails.json';
    
    if (!file_exists($jsonFile)) {
        echo "Chưa có email nào để xuất";
        exit;
    }
    
    $jsonData = json_decode(file_get_contents($jsonFile), true);
    $emails = $jsonData['emails'] ?? [];
    
    if (empty($emails)) {
        echo "Chưa có email nào để xuất";
        exit;
    }
    
    // Get filter parameters
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $service = isset($_GET['service']) ? trim($_GET['service']) : '';
    $dateFrom = isset($_GET['date_from']) ? $_GET['date_from'] : '';
    $dateTo = isset($_GET['date_to']) ? $_GET['date_to'] : '';
    
    // Filter emails
    $filteredEmails = array_filter($emails, function($email) use ($search, $service, $dateFrom, $dateTo) {
        // Search filter
        if (!empty($search)) {
            $searchLower = strtolower($search);
            $found = false;
            if (strpos(strtolower($email['name']), $searchLower) !== false) return true;
            if (strpos(strtolower($email['email']), $searchLower) !== false) return true;
            if (strpos(strtolower($email['phone']), $searchLower) !== false) return true;
            if (strpos(strtolower($email['message']), $searchLower) !== false) return true;
            if (!$found) return false;
        }
        
        // Service filter
        if (!empty($service) && $email['service'] !== $service) {
            return false;
        }
        
        // Date filters
        if (!empty($dateFrom)) {
            $emailDate = date('Y-m-d', strtotime($email['created_at']));
            if ($emailDate < $dateFrom) return false;
        }
        
        if (!empty($dateTo)) {
            $emailDate = date('Y-m-d', strtotime($email['created_at']));
            if ($emailDate > $dateTo) return false;
        }
        
        return true;
    });
    
    // Sort by timestamp (newest first)
    usort($filteredEmails, function($a, $b) {
        return $b['timestamp'] - $a['timestamp'];
    });
    
    // Start Excel output
    echo '<table border="1" style="border-collapse: collapse; width: 100%;">';
    
    // Header row
    echo '<tr style="background-color: #f0f0f0; font-weight: bold;">';
    echo '<th style="border: 1px solid #000; padding: 8px;">STT</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Họ và tên</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Số điện thoại</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Email</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Dịch vụ</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Nội dung</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Đăng ký</th>';
    echo '<th style="border: 1px solid #000; padding: 8px;">Thời gian</th>';
    echo '</tr>';
    
    // Data rows
    foreach ($filteredEmails as $index => $email) {
        echo '<tr>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . ($index + 1) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['name']) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['phone']) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['email']) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['service']) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['message']) . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . ($email['subscribe'] ? 'Có' : 'Không') . '</td>';
        echo '<td style="border: 1px solid #000; padding: 8px;">' . htmlspecialchars($email['created_at']) . '</td>';
        echo '</tr>';
    }
    
    echo '</table>';
    
} catch (Exception $e) {
    error_log("Error exporting emails: " . $e->getMessage());
    echo "Lỗi xuất email: " . $e->getMessage();
}
?>
