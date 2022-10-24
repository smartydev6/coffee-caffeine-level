<?php

namespace App\Http\Controllers;

use App\Http\Requests\DrinkRequest;
use App\Http\Requests\StatRequest;
use App\Models\Drink;
use App\Models\Stat;
use Carbon\Carbon;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StatController extends BaseController
{
    /**
     * Get drinks
     *
     * @return JsonResponse
     */
    public function items(): JsonResponse {
        $stats = DB::table('stats')
            ->whereDate('datetime', Carbon::now()->format('Y-m-d'))
            ->get()
            ->toArray();

        return response()->json([
            'stats' => $stats,
            'drank_max' => config('app.drank_max'),
            'date' => Carbon::now()->format('Y-m-d')
        ]);
    }

    /**
     * Create stat
     *
     * @param StatRequest $request
     * @return JsonResponse
     */
    public function create(StatRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $drink = new Stat();
        $drink->drink_id = $validated['drink_id'];
        $drink->mg = $validated['mg'];
        $drink->cup = $validated['cup'];
        $drink->datetime = Carbon::now()->format("c");
        $drink->save();

        return response()->json([]);
    }

    /**
     * Delete stat
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse {
        $deleted = Stat::query()->where('id', $id)->delete();

        if(!$deleted) {
            return response()->json([], 404);
        }

        return response()->json([]);
    }
}
