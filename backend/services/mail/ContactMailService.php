<?php
/**
 * Contact Mail Service
 * 
 * Handles email sending for contact form submissions with HTML formatting.
 * 
 * @package FIDT-LandingPage
 * @subpackage Services\Mail
 * @version 1.0.0
 * @author Your Name
 */

namespace FIDT\Services\Mail;

/**
 * Contact Mail Service Class
 * 
 * Provides methods for sending contact form emails with professional HTML formatting.
 */
class ContactMailService
{
    /** @var string Default email subject */
    private const DEFAULT_SUBJECT = 'Tin nhắn liên hệ từ website';
    
    /** @var string From email address */
    private const FROM_EMAIL = 'no-reply@surishops.com';
    
    /** @var string From name */
    private const FROM_NAME = 'Website Contact';

    /**
     * Send contact form email
     * 
     * @param array $data Contact form data
     * @return bool|string True on success, error message on failure
     */
    public function sendContactEmail(array $data): bool|string
    {
        // Validate email configuration
        if (empty($_ENV['MAIL_TO'])) {
            return 'Email destination not configured';
        }

        try {
            // Prepare email data
            $to = $_ENV['MAIL_TO'];
            $subject = $data['subject'] ?? self::DEFAULT_SUBJECT;
            $message = $this->buildEmailContent($data);
            $headers = $this->buildEmailHeaders($data['email']);

            // Send email
            if (mail($to, $subject, $message, $headers)) {
                $this->logEmailSuccess($data);
                return true;
            }

            $this->logEmailError('Mail function failed');
            return 'Failed to send email. Please check server configuration.';

        } catch (Exception $e) {
            $this->logEmailError($e->getMessage());
            return 'Email sending error: ' . $e->getMessage();
        }
    }

    /**
     * Build HTML email content
     * 
     * @param array $data Contact form data
     * @return string HTML email content
     */
    private function buildEmailContent(array $data): string
    {
        $subscribeText = $data['subscribe'] ? 'Có' : 'Không';
        $timestamp = $data['timestamp'] ?? date('Y-m-d H:i:s');
        
        // Define contact data structure
        $contactData = [
            'Họ tên' => $data['name'],
            'Số điện thoại' => $data['phone'],
            'Email' => $data['email'],
            'Dịch vụ/Khóa học' => $data['service'],
            'Đăng ký nhận thông báo' => $subscribeText,
            'Nội dung tin nhắn' => nl2br(htmlspecialchars($data['message']))
        ];
        
        // Generate table rows
        $tableRows = $this->generateTableRows($contactData);
        
        return $this->getEmailTemplate($tableRows, $timestamp);
    }

    /**
     * Generate HTML table rows from contact data
     * 
     * @param array $contactData Contact data array
     * @return string HTML table rows
     */
    private function generateTableRows(array $contactData): string
    {
        $rows = '';
        foreach ($contactData as $label => $value) {
            $rows .= "
                <tr>
                    <th style='width: 30%;'>$label:</th>
                    <td>" . htmlspecialchars($value) . "</td>
                </tr>";
        }
        return $rows;
    }

    /**
     * Get email HTML template
     * 
     * @param string $tableRows Generated table rows
     * @param string $timestamp Email timestamp
     * @return string Complete HTML email
     */
    private function getEmailTemplate(string $tableRows, string $timestamp): string
    {
        return "
            <html>
                <head>
                    <title>Thông tin liên hệ mới</title>
                    <style>
                        body { font-family: Arial, sans-serif; font-size: 14px; }
                        table { border-collapse: collapse; width: 100%; max-width: 600px; margin: 20px auto; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #f2f2f2; font-weight: bold; }
                        .header { background-color: #4CAF50; color: white; text-align: center; font-size: 18px; }
                        .footer { background-color: #f9f9f9; text-align: center; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <table>
                        <tr class='header'>
                            <th colspan='2'>📧 THÔNG TIN LIÊN HỆ MỚI</th>
                        </tr>
                        $tableRows
                        <tr class='footer'>
                            <td colspan='2'>
                                <strong>Thời gian gửi:</strong> " . htmlspecialchars($timestamp) . "<br>
                                <em>Email này được gửi tự động từ website</em>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>";
    }

    /**
     * Build email headers
     * 
     * @param string $customerEmail Customer's email address
     * @return string Email headers
     */
    private function buildEmailHeaders(string $customerEmail): string
    {
        return implode("\r\n", [
            "MIME-Version: 1.0",
            "Content-type: text/html; charset=UTF-8",
            "From: " . self::FROM_NAME . " <" . self::FROM_EMAIL . ">",
            "Reply-To: " . htmlspecialchars($customerEmail),
            "X-Mailer: PHP/" . phpversion()
        ]);
    }

    /**
     * Log successful email sending
     * 
     * @param array $data Contact form data
     */
    private function logEmailSuccess(array $data): void
    {
        error_log("Email sent successfully: " . json_encode([
            'to' => $_ENV['MAIL_TO'],
            'from' => $data['email'],
            'service' => $data['service'],
            'timestamp' => date('Y-m-d H:i:s')
        ]));
    }

    /**
     * Log email sending error
     * 
     * @param string $error Error message
     */
    private function logEmailError(string $error): void
    {
        error_log("Email sending error: " . $error);
    }
}
