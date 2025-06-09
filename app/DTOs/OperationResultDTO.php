<?php

namespace App\DTOs;

use Spatie\LaravelData\Data;

class OperationResultDTO extends Data
{
    public function __construct(
        // Indicates success or failure
        public bool $success,
        // Generic message (success or error)
        public ?string $message = null,
        // Optional error code
        public ?string $errorCode = null,
        // Accepts any type (string, array, object)
        public mixed $info = null
    ) {}
}
