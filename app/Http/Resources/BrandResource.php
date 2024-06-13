<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'id' =>$this->id,
            'name' => $this->brand_name,
            'details' => $this->brand_details,
            'image' => $this->brand_image,
            'rating' => $this->rating,
            'country_code' => $this->country_code,
            'default' => $this->is_default
        ];
    }
}
