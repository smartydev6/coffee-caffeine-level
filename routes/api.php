<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\StatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/drinks", [DrinkController::class, 'items']);
Route::post("/drinks", [DrinkController::class, 'create']);
Route::put("/drinks/{id}", [DrinkController::class, 'update']);
Route::delete("/drinks/{id}", [DrinkController::class, 'delete']);

Route::get("/stats", [StatController::class, 'items']);
Route::post("/stats", [StatController::class, 'create']);
Route::delete("/stats/{id}", [StatController::class, 'delete']);

