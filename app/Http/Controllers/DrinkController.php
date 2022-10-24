<?php

namespace App\Http\Controllers;

use App\Http\Requests\DrinkRequest;
use App\Models\Drink;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;

class DrinkController extends BaseController
{
    /**
     * Get drinks
     *
     * @return JsonResponse
     */
    public function items(): JsonResponse {
        return response()->json(Drink::query()->orderBy('id', 'asc')->get()->toArray());
    }

    /**
     * Create drink
     *
     * @param DrinkRequest $request
     * @return JsonResponse
     */
    public function create(DrinkRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $drink = new Drink();
        $drink->fill($validated);
        $drink->save();

        return response()->json($drink);
    }

    /**
     * Update drink
     *
     * @param DrinkRequest $request
     * @param int $id
     *
     * @return JsonResponse
     */
    public function update(DrinkRequest $request, int $id): JsonResponse {
        $validated = $request->validated();

        $drink = Drink::query()->findOrFail($id);
        $drink->fill($validated);
        $drink->save();

        return response()->json($drink);
    }

    /**
     * Delete drink
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse {
        $deleted = Drink::query()->where('id', $id)->delete();

        if(!$deleted) {
            return response()->json([], 404);
        }

        return response()->json([]);
    }
}
