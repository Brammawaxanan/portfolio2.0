<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/backend/http.php';
require_once dirname(__DIR__) . '/backend/mongodb.php';

api_bootstrap();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_error('Method not allowed.', 405);
}

try {
    mongodb_database()->command(['ping' => 1])->toArray();

    api_json([
        'ok' => true,
        'message' => 'MongoDB connection is healthy.',
    ]);
} catch (Throwable $exception) {
    error_log('MongoDB health check failed: ' . get_class($exception));
    api_error('MongoDB connection is not available.', 503);
}
