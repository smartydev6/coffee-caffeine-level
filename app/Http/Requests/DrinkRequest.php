<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DrinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|max:100|min:2',
            'mg' => 'required|integer|max:1000|min:1',
            'cup' => 'required|integer|max:100|min:1'
        ];
    }
}
