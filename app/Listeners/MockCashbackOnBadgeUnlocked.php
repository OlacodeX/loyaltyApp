<?php

namespace App\Listeners;

use App\Events\BadgeUnlocked;
use Illuminate\Support\Facades\Log;

class MockCashbackOnBadgeUnlocked
{
    public function handle(BadgeUnlocked $event): void
    {
        Log::info('Mock cashback payment', [
            'user_id' => $event->user->id,
            'badge_slug' => $event->badge->slug,
            'amount' => 300,
            'reference' => 'mock-'.uniqid('', true),
        ]);
    }
}
