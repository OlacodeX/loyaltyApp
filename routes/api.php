<?php

use App\Http\Controllers\Api\ActionController;
use Illuminate\Support\Facades\Route;

Route::prefix('users/{user}')
        ->name('users.')
        ->controller(ActionController::class)
        ->group(function () {
            Route::post('/purchase', 'purchase')->name('purchase');
            Route::get('/achievements', 'achievements')->name('achievements');
        })->whereNumber(['user']);
