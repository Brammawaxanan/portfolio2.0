<?php

declare(strict_types=1);

require_once __DIR__ . '/env.php';

use MongoDB\Client;
use MongoDB\Collection;
use MongoDB\Database;

function mongodb_client(): Client
{
    $autoloadPath = dirname(__DIR__) . '/vendor/autoload.php';

    if (!is_readable($autoloadPath)) {
        throw new RuntimeException('Composer dependencies are not installed.');
    }

    require_once $autoloadPath;

    if (!extension_loaded('mongodb')) {
        throw new RuntimeException('The mongodb PHP extension is not installed.');
    }

    if (!class_exists(Client::class)) {
        throw new RuntimeException('The MongoDB PHP library is not available.');
    }

    $uri = app_env('MONGODB_URI');

    if ($uri === null) {
        throw new RuntimeException('MONGODB_URI is not configured.');
    }

    return new Client($uri, [], [
        'typeMap' => [
            'root' => 'array',
            'document' => 'array',
            'array' => 'array',
        ],
    ]);
}

function mongodb_database(): Database
{
    $databaseName = app_env('MONGODB_DATABASE');

    if ($databaseName === null) {
        throw new RuntimeException('MONGODB_DATABASE is not configured.');
    }

    return mongodb_client()->selectDatabase($databaseName);
}

function mongodb_collection(string $collectionName): Collection
{
    return mongodb_database()->selectCollection($collectionName);
}

function mongodb_contact_collection(): Collection
{
    return mongodb_collection(app_env('MONGODB_CONTACT_COLLECTION', 'messages'));
}
