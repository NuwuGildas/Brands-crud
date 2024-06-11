<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\BrandRepositoryInterface;
use App\Repository\BrandRepository;

class ReposioryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(BrandRepositoryInterface::class, BrandRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
