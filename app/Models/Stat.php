<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * Drink model
 *
 * @property int     $id
 * @property string  $drink_id
 * @property int     $mg
 * @property int     $cup
 * @property Carbon  $datetime
 */
class Stat extends Model
{
    protected $fillable = [
        'drink_id',
        'mg',
        'cup',
        'datetime'
    ];
}
