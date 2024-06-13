<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Brands CRUD</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">

        <script src="https://kit.fontawesome.com/27062096fb.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/font-awesome.min.css">

        <link rel="stylesheet" href="{{asset('styles/index.css')}}">
        <link rel="stylesheet" href="{{asset('styles/responsive.css')}}">
        <link rel="stylesheet" href="{{asset('styles/modal.css')}}">
    </head>
    <body >
        <div class="nav-parent">
            <button onclick="openModal()">
                <i class="fa-solid fa-plus"></i> Add Brand
            </button>
        </div>
        <div class="container">
            <div class="header"> Best Brands </div>
            <div class="spinner-parent">
                <x-spinner class="{{ 'spinner-lg' }}"/>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th class="verify-cell"></th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

        <div id="toasts" class="toasts"></div>

        <dialog class="modal">
            <div class="dialog-header">
                <h3>Modal Dialog</h3>
                <button class="close-modal close-button" onclick="closeModal()">&times;</button>
            </div>
            <div class="dialog-body">
                <form id="brand_form">
                    {{csrf_field()}}
                    <div class="form-control">
                        <div class="form-col">
                            <label for="brand_name">Enter brand name
                            </label>
                            <input class="form" name="brand_name" id="brand_name" value="">
                        </div>
                        <div class="form-col">
                            <label>Choose Country</label>
                            <x-select-country class="form" id="country_select" name="country_code" :default="null"></x-select-country>
                        </div>
                        <div class="form-col">
                            <label for="brand_name">Brand rating
                            </label>
                            <x-star-rating :selected="1" />
                        </div>
                        <div class="form-col">
                            <label for="brand_details">Description</label>
                            <textarea class="form" name="brand_details" id="brand_details"> </textarea>
                        </div>

                        <div class="form-row">
                            <input type="checkbox" id="is_default" name="is_default" >
                            <label for="is_default">Default display ?</label>
                        </div>

                    </div>
                </form>
            </div>
            <div class="dialog-footer">
                <button class="save-btn">
                    <span class="btn-content"><i class="fa-solid fa-check"></i> save</span>
                    <x-spinner class="{{ 'spinner-sm light none' }}"/>
                </button>
            </div>
        </dialog>

        <script src="{{asset('scripts/toast.js')}}"></script>
        <script src="{{asset('scripts/index.js')}}"></script>
    </body>
</html>
