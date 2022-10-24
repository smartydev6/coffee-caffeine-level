<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Drink model
 *
 * @property int    $id
 *
 * @property string $name
 * @property integer $mg
 * @property integer $cup
 */
class Drink extends Model
{
    protected $fillable = [
        'name',
        'mg',
        'cup'
    ];
}
