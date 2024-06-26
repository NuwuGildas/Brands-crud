<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Faker\Factory as Faker;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $brands = [
            ['brand_name' => 'Brand A', 'rating' => 5, 'country_code' => 'US'],
            ['brand_name' => 'Brand B', 'rating' => 4, 'country_code' => 'CA'],
            ['brand_name' => 'Brand C', 'rating' => 1, 'country_code' => 'DE'],
            ['brand_name' => 'Brand D', 'rating' => 5, 'country_code' => 'CN'],
            ['brand_name' => 'Brand X', 'rating' => 3, 'country_code' => 'FR'],
            ['brand_name' => 'Brand Y', 'rating' => 2, 'country_code' => 'CM'],
            ['brand_name' => 'Brand Z', 'rating' => 1, 'country_code' => 'CI'],
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'brand_name' => $brand['brand_name'],
                'brand_image' => $faker->imageUrl(640, 480, 'business', true, 'Faker'), // Example image URL
                'rating' => $brand['rating'],
                'country_code' => $brand['country_code'],
                'brand_details' => $faker->paragraph(3),
                'is_default' => $faker->boolean(75)
            ]);
        }
    }
}
