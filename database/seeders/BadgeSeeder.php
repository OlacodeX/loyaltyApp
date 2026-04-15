<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['slug' => 'odogwu', 'name' => 'Odogwu', 'rank' => 1, 'min_total_orders' => 1, 'min_total_spent' => 0],
            ['slug' => 'spender', 'name' => 'Spender', 'rank' => 2, 'min_total_orders' => 3, 'min_total_spent' => 1000],
            ['slug' => 'champion', 'name' => 'Champion', 'rank' => 3, 'min_total_orders' => 5, 'min_total_spent' => 5000],
        ];

        foreach ($rows as $row) {
            Badge::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'rank' => $row['rank'],
                    'min_total_orders' => $row['min_total_orders'],
                    'min_total_spent' => $row['min_total_spent'],
                ]
            );
        }
    }
}
