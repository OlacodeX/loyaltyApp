<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Badge extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'rank',
        'min_total_spent',
        'min_total_orders',
    ];

    public function userBadges(): HasMany
    {
        return $this->hasMany(UserBadge::class);
    }
}
