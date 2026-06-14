<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/backend/http.php';
require_once dirname(__DIR__) . '/backend/mongodb.php';

api_bootstrap();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    api_error('Method not allowed.', 405);
}

function request_payload(): array
{
    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));

    if (str_contains($contentType, 'application/json')) {
        $rawBody = file_get_contents('php://input');
        $decoded = json_decode($rawBody === false ? '' : $rawBody, true);

        if (is_array($decoded)) {
            return $decoded;
        }
    }

    return $_POST;
}

function post_string(array $payload, string $key, int $maxLength): string
{
    $value = trim((string) ($payload[$key] ?? ''));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';

    if (mb_strlen($value) > $maxLength) {
        $value = mb_substr($value, 0, $maxLength);
    }

    return $value;
}

$payload = request_payload();
$name = post_string($payload, 'name', 120);
$email = post_string($payload, 'email', 254);
$subject = post_string($payload, 'subject', 160);
$message = post_string($payload, 'message', 5000);

$validationErrors = [];

if ($name === '') {
    $validationErrors['name'] = 'Name is required.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validationErrors['email'] = 'A valid email is required.';
}

if ($subject === '') {
    $validationErrors['subject'] = 'Subject is required.';
}

if ($message === '') {
    $validationErrors['message'] = 'Message is required.';
}

if ($validationErrors !== []) {
    api_json([
        'ok' => false,
        'message' => 'Please check the form and try again.',
        'errors' => $validationErrors,
    ], 422);
}

try {
    mongodb_contact_collection()->insertOne([
        'name' => $name,
        'email' => strtolower($email),
        'subject' => $subject,
        'message' => $message,
        'source' => 'portfolio-contact-form',
        'ipHash' => hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . app_env('APP_KEY', 'portfolio')),
        'userAgent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
    ]);

    api_json([
        'ok' => true,
        'message' => 'Message received.',
    ]);
} catch (Throwable $exception) {
    error_log('Contact form MongoDB insert failed: ' . get_class($exception));
    api_error('Unable to send your message right now. Please try again later.', 503);
}
