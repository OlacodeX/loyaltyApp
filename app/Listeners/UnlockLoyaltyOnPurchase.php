<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
use App\Events\PurchaseCompleted;
use App\Models\Achievement;
use App\Models\Badge;
use Illuminate\Support\Facades\Log;

class UnlockLoyaltyOnPurchase
{
    public function handle(PurchaseCompleted $event): void
    {
        Log::info('UnlockLoyaltyOnPurchase', ['user' => $event->user->id]);
        $user = $event->user->fresh();
        if (!$user) {
            return;
        }

        $attainedAchievement = Achievement::where([
            'min_total_orders' => $user->total_orders,
            'min_total_spent' => $user->total_spent,
        ])->first();
        if (!$attainedAchievement) {
            return;
        }
        $achievementUnlocked = $user->achievements()->where('achievement_id', $attainedAchievement->id)->first();

        if(!$achievementUnlocked) {
            $user->achievements()->create([
                'achievement_id' => $attainedAchievement->id,
                'unlocked_at' => now(),
            ]);
            AchievementUnlocked::dispatch($user, $attainedAchievement);
        }

        $attainedBadge = Badge::where([
            'min_total_orders' => $user->total_orders,
            'min_total_spent' => $user->total_spent,
        ])->first();

        if (!$attainedBadge) {
            return;
        }
        $badgeUnlocked = $user->badges()->where('badge_id', $attainedBadge->id)->first();
        if(!$badgeUnlocked) {

            $user->badges()->create([
                'badge_id' => $attainedBadge->id,
                'unlocked_at' => now(),
            ]);
            BadgeUnlocked::dispatch($user, $attainedBadge);
        }
    }

}
