<?php

namespace App\Rules;

use App\Models\Stat;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class StatDrankMaxRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $mgCount = Stat::query()
            ->whereDate('datetime', Carbon::now()->format('Y-m-d'))
            ->sum('mg');

        return ($mgCount + $value) <= config('app.drank_max');
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'You had enough to drink today.';
    }
}
