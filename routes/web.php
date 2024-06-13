<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $json = File::get(public_path('countries.json'));
    // Decode the JSON data into a PHP array
    $countries = json_decode($json, true);

    return view('welcome', ['countries' => $countries]);
});
