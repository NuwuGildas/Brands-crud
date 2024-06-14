<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Interfaces\BrandRepositoryInterface;
use App\Classes\ApiResponseClass;
use App\Http\Resources\BrandResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    protected  $brandRepositoryInterface;

    public function __construct(BrandRepositoryInterface $brandRepositoryInterface)
    {
        $this->brandRepositoryInterface = $brandRepositoryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $country_code = $request->get('country_code', 'default');
        $data = $this->brandRepositoryInterface->index($country_code);

        return ApiResponseClass::sendResponse(BrandResource::collection($data), '', 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $image_url = '/images/default.png';
        if($request->hasFile('brand_image')){
            $file = $request->file('brand_image');

            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $filename, 'public');
            $image_url = Storage::url($filePath);
        }

        $details = [
            'brand_name' => $request->brand_name,
            'brand_details' => $request->brand_details,
            'rating' => $request->rating,
            'brand_image' => $image_url,
            'country_code' => $request->country_code,
            'is_default' => isset($request->is_default) ? 1 : 0
        ];

        DB::beginTransaction();
        try {
            $brand = $this->brandRepositoryInterface->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new BrandResource($brand),'Brand Create Successful',201);

        }catch (\Exception $e){
            return ApiResponseClass::rollback($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $brand = $this->brandRepositoryInterface->getById($id);
        return ApiResponseClass::sendResponse(new BrandResource($brand), '', 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, $id)
    { 
        $image_url = '/images/default.png';
        if($request->hasFile('brand_image')){
            $file = $request->file('brand_image');

            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $filename, 'public');
            $image_url = Storage::url($filePath);
        }

        $details = [
            'brand_name' => $request->brand_name,
            'brand_details' => $request->brand_details,
            'rating' => $request->rating,
            'brand_image' => $image_url,
            'country_code' => $request->country_code,
            'is_default' => isset($request->is_default) ? 1 : 0
        ];

        DB::beginTransaction();
        try {
            $brand = $this->brandRepositoryInterface->update($details, $id);
            DB::commit();
            return ApiResponseClass::sendResponse(new BrandResource($brand),'Brand Update Successful',201);

        }catch (\Exception $e){
            return ApiResponseClass::rollback($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->brandRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Successful Delete', '', 204);
    }
}
