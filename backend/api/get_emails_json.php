<?php
// Add CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $jsonFile = __DIR__ . '/../data_consolidated/emails.json';
        
        if (!file_exists($jsonFile)) {
            echo json_encode([
                'success' => true,
                'data' => [
                    'emails' => [],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'total' => 0,
                        'pages' => 1
                    ],
                    'filters' => [
                        'services' => []
                    ]
                ]
            ]);
            exit;
        }
        
        $jsonData = json_decode(file_get_contents($jsonFile), true);
        $emails = $jsonData['emails'] ?? [];
        
        // Get query parameters
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
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
        
        $totalCount = count($filteredEmails);
        
        // Pagination
        $page = max(1, $page);
        $limit = max(1, min(100, $limit));
        $offset = ($page - 1) * $limit;
        $paginatedEmails = array_slice($filteredEmails, $offset, $limit);
        
        // Get unique services for filter
        $services = array_unique(array_column($emails, 'service'));
        sort($services);
        
        echo json_encode([
            'success' => true,
            'data' => [
                'emails' => $paginatedEmails,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $totalCount,
                    'pages' => ceil($totalCount / $limit)
                ],
                'filters' => [
                    'services' => $services
                ]
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Error fetching emails: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to fetch emails'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>
