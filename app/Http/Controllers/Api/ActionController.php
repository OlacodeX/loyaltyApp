<?php

namespace App\Http\Controllers\Api;

use App\Events\PurchaseCompleted;
use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseRequest;
use App\Models\Achievement;
use App\Models\Badge;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ActionController extends Controller
{
    public function purchase(PurchaseRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();

        $user->total_orders = $user->total_orders + 1;
        $user->total_spent = $user->total_spent + $validated['amount'];
        $user->save();

        PurchaseCompleted::dispatch($user, $validated['amount']);

        return response()->json(['ok' => true], 201);
    }

    public function achievements(User $user): JsonResponse
    {
        $user->load(['achievements.achievement', 'badges.badge']);

        $unlockedAchievementIds = $user->achievements()->pluck('achievement_id');

        $unlockedAchievement = Achievement::whereIn('id', $unlockedAchievementIds)->pluck('name')->toArray();

        $nextAvailableArr = Achievement::query()
                        ->whereNotIn('id', $unlockedAchievementIds)
                        ->pluck('name')->toArray();

        $currentBadge = (string) $user->badges->first()?->badge?->name ?? Badge::orderBy('rank')->first()?->name ?? 'none';

        $unlockedBadgeIds = $user->badges()->pluck('badge_id');
        $nextBadgeModel = Badge::query()
            ->whereNotIn('id', $unlockedBadgeIds)
            ->orderBy('rank')
            ->first();

        $nextBadge = $nextBadgeModel->name;

        $remaining = (int) $nextBadgeModel->min_total_spent - $user->total_spent;

        return response()->json([
            'unlocked_achievements' => $unlockedAchievement,
            'next_available_achievements' => $nextAvailableArr,
            'current_badge' => $currentBadge,
            'next_badge' => $nextBadge,
            'remaining_to_unlock_next_badge' => $remaining,
        ]);
    }
}
