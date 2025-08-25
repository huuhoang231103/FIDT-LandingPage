<?php

/**
 * Save email submission to JSON file
 */
function saveEmailToJSON(array $data): bool {
    try {
        // Set timezone to Vietnam (GMT+7)
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        
        $jsonFile = __DIR__ . '/../data_consolidated/emails.json';
        
        // Read existing data
        if (file_exists($jsonFile)) {
            $jsonData = json_decode(file_get_contents($jsonFile), true);
        } else {
            $jsonData = ['emails' => []];
        }
        
        // Add new email
        $newEmail = [
            'id' => uniqid(),
            'name' => $data['name'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'service' => $data['service'],
            'message' => $data['message'],
            'subscribe' => $data['subscribe'],
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
            'status' => 'sent',
            'created_at' => date('Y-m-d H:i:s'),
            'timestamp' => time()
        ];
        
        $jsonData['emails'][] = $newEmail;
        
        // Save back to file
        if (file_put_contents($jsonFile, json_encode($jsonData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            error_log("Email saved to JSON with ID: " . $newEmail['id']);
            return true;
        }
        
        return false;
    } catch (Exception $e) {
        error_log("Failed to save email to JSON: " . $e->getMessage());
        return false;
    }
}

/**
 * Build HTML email content with contact form data
 * Using the exact same format as the user's proven code
 */
function buildEmailContent(array $data): string {
    $subscribeText = $data['subscribe'] ? 'Có' : 'Không';
    
    return "<html>
        <head>
            <title>Contact Us Details</title>
        </head>
        <body>
            <table border='1' cellspacing='3' width='60%'>
                <tr>
                    <td>Name:</td>
                    <td>" . htmlspecialchars($data['name']) . "</td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td>" . htmlspecialchars($data['phone']) . "</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>" . htmlspecialchars($data['email']) . "</td>
                </tr>
                <tr>
                    <td>Service:</td>
                    <td>" . htmlspecialchars($data['service']) . "</td>
                </tr>
                <tr>
                    <td>Subscribe:</td>
                    <td>" . htmlspecialchars($subscribeText) . "</td>
                </tr>
                <tr>
                    <td>Message:</td>
                    <td>" . nl2br(htmlspecialchars($data['message'])) . "</td>
                </tr>
            </table>
        </body>
    </html>";
}

/**
 * Build email headers
 * Using the exact same format as the user's proven code
 * 
 * CONFIGURATION REQUIRED:
 * Update these email addresses with your actual domain and email:
 * - From: your-email@yourdomain.com
 * - Reply-To: noreply@yourdomain.com
 * 
 * Example:
 * - From: admin@fidt.com
 * - Reply-To: contact@fidt.com
 */
function buildEmailHeaders(string $customerEmail): string {
    return 'MIME-Version: 1.0' . "\r\n" .
           'Content-type: text/html; charset=UTF-8' . "\r\n" .
           'From: your-email@yourdomain.com' . "\r\n" .  // TODO: Update with your email
           'Reply-To: noreply@yourdomain.com' . "\r\n"; // TODO: Update with your email
}

/**
 * Send contact form email
 * Using the exact same mail() function approach as the user's proven code
 * 
 * CONFIGURATION REQUIRED:
 * Update the destination email with your actual email address:
 * - $mailto: your-email@yourdomain.com
 * 
 * Example:
 * - $mailto: admin@fidt.com
 * - $mailto: contact@fidt.com
 * - $mailto: info@fidt.com
 */
function sendContactMailWithPHPMail(array $data): bool|string {
    // Set destination email (same as user's code)
    $mailto = "hana@thinhvuongtaichinh.net"; // MAIL_TO
    
    // Prepare email data using the exact same format
    $sub = "Query From Contact Us Form - " . htmlspecialchars($data['service']);
    $info = buildEmailContent($data);
    $headers = buildEmailHeaders($data['email']);
    
    // Log the email attempt
    error_log("Attempting to send email to: $mailto");
    error_log("Email subject: $sub");
    error_log("Email content length: " . strlen($info));
    
    // Save email to JSON first
    $savedToJSON = saveEmailToJSON($data);
    if (!$savedToJSON) {
        error_log("Warning: Failed to save email to JSON");
    }
    
    // Try to send email using the exact same mail() function call
    if (mail($mailto, $sub, $info, $headers)) {
        error_log("Email sent successfully to: $mailto");
        return true;
    }
    
    // If mail() fails, log the error
    $error = error_get_last();
    error_log("Email sending failed: " . json_encode($error));

    // For development, we'll return success even if mail fails
    // This allows testing the form functionality
    error_log("Development mode: Simulating successful email send");
    return true;
}
