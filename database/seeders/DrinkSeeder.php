<?php

namespace Database\Seeders;

use App\Models\Drink;
use Illuminate\Database\Seeder;

class DrinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $drinks = [
            'Monster Ultra Sunrise' => ['mg' => 75, 'cup' => 2],
            'Black Coffee' => ['mg' => 95, 'cup' => 1],
            'Americano' => ['mg' => 77, 'cup' => 1],
            'Sugar free NOS' => ['mg' => 130, 'cup' => 2],
            '5 Hour Energy' => ['mg' => 200, 'cup' => 1],
        ];

        foreach ($drinks as $name => $value) {
            $drink = new Drink();
            $drink->name = $name;
            $drink->mg = $value['mg'];
            $drink->cup = $value['cup'];
            $drink->save();
        }
    }
}
