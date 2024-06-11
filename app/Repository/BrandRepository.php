<?php

namespace App\Repository;
use App\Models\Brand;
use App\Interfaces\BrandRepositoryInterface;

class BrandRepository implements BrandRepositoryInterface
{
    public function index($country_code)
    {
        return Brand::where('country_code', $country_code)
            ->orWhere('country_code', 'default')
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
        return Brand::whereId($id)->update($data);
    }

    public function delete($id)
    {
        Brand::destroy($id);
    }
}
