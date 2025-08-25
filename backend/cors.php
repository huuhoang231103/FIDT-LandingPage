<?php
/**
 * Simple CORS utility. Reflects the request Origin when available, supports credentials.
 * Optionally restricts to an allowlist of origins.
 */
function setup_cors(array $allowed_origins = null, string $allowed_methods = 'GET, POST, OPTIONS', string $allowed_headers = 'Content-Type, Authorization, X-Requested-With', bool $allow_credentials = true): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;

    // Define production domains
    $production_domains = [
        'https://thinhvuongtaichinh.net',
        'https://www.thinhvuongtaichinh.net'
    ];

    if ($allowed_origins !== null) {
        if ($origin !== null && (in_array('*', $allowed_origins, true) || in_array($origin, $allowed_origins, true))) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }
    } else {
        if ($origin !== null) {
            // Check if origin is from production domain
            $is_production = false;
            foreach ($production_domains as $domain) {
                if (strpos($origin, $domain) === 0) {
                    $is_production = true;
                    break;
                }
            }
            
            if ($is_production) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Vary: Origin');
            } else {
                // For development, allow localhost origins
                if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
                    header('Access-Control-Allow-Origin: ' . $origin);
                    header('Vary: Origin');
                } else {
                    // Default fallback
                    header('Access-Control-Allow-Origin: ' . $origin);
                    header('Vary: Origin');
                }
            }
        } else {
            // Fallback when no Origin header is sent (e.g., same-origin or curl)
            header('Access-Control-Allow-Origin: *');
        }
    }

    if ($allow_credentials) {
        header('Access-Control-Allow-Credentials: true');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Methods: ' . $allowed_methods);
        header('Access-Control-Allow-Headers: ' . $allowed_headers);
        http_response_code(200);
        exit();
    }
}
?>


