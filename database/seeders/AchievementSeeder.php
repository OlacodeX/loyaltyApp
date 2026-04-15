<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['slug' => 'first_step', 'name' => 'First step', 'min_total_orders' => 1, 'min_total_spent' => 0],
            ['slug' => 'steady_buyer', 'name' => 'Steady buyer', 'min_total_orders' => 3, 'min_total_spent' => 500],
            ['slug' => 'loyal_customer', 'name' => 'Loyal customer', 'min_total_orders' => 5, 'min_total_spent' => 2000],
        ]; 

        foreach ($rows as $row) {
            Achievement::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'min_total_orders' => $row['min_total_orders'],
                    'min_total_spent' => $row['min_total_spent'],
                ]
            );
        }
    }
}
