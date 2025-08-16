<?php

echo "=== Contact Form Integration Debug ===\n\n";

// Check if .env file exists
$envFile = __DIR__ . '/backend/.env';
if (file_exists($envFile)) {
    echo "✅ .env file exists\n";
    
    // Load environment variables
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
    
    echo "MAIL_TO: " . ($_ENV['MAIL_TO'] ?? 'NOT SET') . "\n";
    echo "GOOGLE_SCRIPT_URL: " . ($_ENV['GOOGLE_SCRIPT_URL'] ?? 'NOT SET') . "\n\n";
    
} else {
    echo "❌ .env file not found in backend directory\n";
    echo "Please create backend/.env file with:\n";
    echo "MAIL_TO=your-email@example.com\n";
    echo "GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec\n\n";
}

// Test the current URL
$currentUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiAGnBwTw90JDRlRQQareeOb_xibhDhdB_gX4QZ_mfR3n2daZzSE8YdWBQr1GDtsduAuOAF4F-WZ9egse8HkR5wltVnuZtXmxf8mph5r1ykOdObHHO9SXkFvWwQ8L-kUVh6MYsea0Fl7W3VjePbPe8C-8bEfEbycUsnlJbjm51xSiug6BHUturepwAEtU-uox74RxoblrdghQUjmomOtjSrv0YgOKvMwJxglngPVywQJFzuvC44RGEtNOYEIw0rExY2_iCRCwAaXONrWJjWKod41nddEQ&lib=MZLRrcFYPE6clKlIeKkHQJ86idZU4jP8o';

echo "Testing current URL: " . $currentUrl . "\n\n";

// Test GET request
echo "1. Testing GET request...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $currentUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "cURL Error: " . ($curlError ?: 'None') . "\n";
echo "Response: " . substr($response, 0, 200) . "...\n\n";

// Test POST request
echo "2. Testing POST request...\n";
$testData = [
    'name' => 'Test User',
    'phone' => '0123456789',
    'email' => 'test@example.com',
    'service' => 'MUA BĐS ĐẦU TIÊN',
    'message' => 'This is a test message',
    'subscribe' => true
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $currentUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($testData))
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "cURL Error: " . ($curlError ?: 'None') . "\n";
echo "Response: " . $response . "\n\n";

if ($httpCode === 200) {
    $responseData = json_decode($response, true);
    if (isset($responseData['result']) && $responseData['result'] === 'success') {
        echo "✅ SUCCESS: Data sent to Google Sheets successfully!\n";
        echo "Check your Google Sheet for the new row.\n";
    } else {
        echo "❌ ERROR: Google Script returned error\n";
        echo "Error: " . ($responseData['error'] ?? 'Unknown error') . "\n";
    }
} else {
    echo "❌ ERROR: HTTP request failed with code " . $httpCode . "\n";
    echo "This confirms the URL is not a valid web app deployment URL.\n";
}

echo "\n=== Debug Complete ===\n";
echo "\nNEXT STEPS:\n";
echo "1. Go to Google Apps Script and deploy as web app\n";
echo "2. Copy the deployment URL (should look like: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)\n";
echo "3. Update your .env file with the correct URL\n";
echo "4. Run this test again\n";
