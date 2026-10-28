<?php
/**
 * Madtronix Systems - Static Server PHP Mail Handler
 * Place this file in your public_html or root directory on any PHP-enabled server (cPanel, Apache, Nginx)
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload.']);
    exit;
}

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$mobile = trim($data['mobile'] ?? '');
$company = trim($data['companyName'] ?? 'N/A');
$website = trim($data['website'] ?? 'N/A');
$requirement = trim($data['requirement'] ?? '');
$query = trim($data['query'] ?? '');

if (empty($fullName) || empty($email) || empty($mobile) || empty($requirement) || empty($query)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All required fields must be completed.']);
    exit;
}

$to = 'contact@madtronixsystems.com';
$referenceId = 'MTX-' . substr(time(), -6);
$subject = "[New Consultation $referenceId] " . strtoupper($requirement) . " - $fullName";

$message = "MADTRONIX SYSTEMS - NEW CONSULTATION QUERY\n";
$message .= "--------------------------------------------------\n";
$message .= "Reference ID: $referenceId\n";
$message .= "Full Name: $fullName\n";
$message .= "Email: $email\n";
$message .= "Mobile: $mobile\n";
$message .= "Company: $company\n";
$message .= "Website: $website\n";
$message .= "Requirement: $requirement\n\n";
$message .= "Project Query / Scope:\n";
$message .= "$query\n";
$message .= "--------------------------------------------------\n";
$message .= "Submitted on: " . date('Y-m-d H:i:s T') . "\n";

$headers = [];
$headers[] = "From: Madtronix Systems Inquiries <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'madtronixsystems.com') . ">";
$headers[] = "Reply-To: $fullName <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $message, implode("\r\n", $headers));

// Log to a local file for safety
$logEntry = [
    'referenceId' => $referenceId,
    'fullName' => $fullName,
    'email' => $email,
    'mobile' => $mobile,
    'company' => $company,
    'website' => $website,
    'requirement' => $requirement,
    'query' => $query,
    'submittedAt' => date('c'),
    'mailSent' => $sent
];
@file_put_contents('inquiries.log', json_encode($logEntry) . "\n", FILE_APPEND);

echo json_encode([
    'success' => true,
    'referenceId' => $referenceId,
    'recipient' => $to,
    'message' => "Your query has been directly submitted to $to."
]);
