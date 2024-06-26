<?php

namespace App\Repository;
use App\Models\Brand;
use App\Interfaces\BrandRepositoryInterface;

class BrandRepository implements BrandRepositoryInterface
{
    public function index($country_code)
    {
        return Brand::where('country_code', $country_code)
            ->orWhere('is_default', 1)
            ->orderBy('rating', 'DESC')
            ->get();
    }

    public function getById($id)
    {
        return Brand::findOrFail($id);
    }

    public function store(array $data)
    {
        return Brand::create($data);
    }

    public function update(array $data, $id)
    {
        Brand::whereId($id)->update($data);

        return Brand::find($id);

    }

    public function delete($id)
    {
        $brand = Brand::find($id);
        $brand_name = $brand->brand_name;

        $brand->delete();

        return $brand_name;
    }
}
