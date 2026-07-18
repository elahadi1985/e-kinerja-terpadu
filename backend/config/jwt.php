<?php

return [
    'secret' => env('JWT_SECRET', 'your-secret-key'),
    'algorithm' => env('JWT_ALGORITHM', 'HS256'),
    'ttl' => env('JWT_TTL', 60),
    'refresh_ttl' => env('JWT_REFRESH_TTL', 20160),
    'jti' => [
        'secret' => env('JWT_JTI_SECRET'),
        'search' => true,
    ],
];
