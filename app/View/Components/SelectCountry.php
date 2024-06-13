<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use Illuminate\Support\Facades\File;

class SelectCountry extends Component
{
    public $countries;
    public $default;
    /**
     * Create a new component instance.
     */
    public function __construct($default = null)
    {
        // Read the countries from the JSON file
        $json = File::get(public_path('countries.json'));
        $this->countries = json_decode($json, true);
        $this->default = $default;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.select-country');
    }
}
