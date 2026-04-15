<?php

namespace App\Providers;

use App\Events\BadgeUnlocked;
use App\Events\PurchaseCompleted;
use App\Listeners\MockCashbackOnBadgeUnlocked;
use App\Listeners\UnlockLoyaltyOnPurchase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(PurchaseCompleted::class, UnlockLoyaltyOnPurchase::class);
        Event::listen(BadgeUnlocked::class, MockCashbackOnBadgeUnlocked::class);
    }
}
