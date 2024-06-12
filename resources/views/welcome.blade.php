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
        <div class="container">
            <div class="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th></th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="main-ligne">
                            <td rowspan="2" class="num-cell">
                                <span>1</span>
                            </td>
                            <td class="logo-cell">
                                <div class="brand">
                                    <img src="{{asset('images/default.png')}}" alt="default logo">
                                    <span class="logo-name"> Default Logo</span>
                                </div>
                            </td>
                            <td class="verify-cell">
                                <img src="{{asset('images/verified.png')}}" alt="verified">
                            </td>
                            <td class="rating-cell">
                                <div class="rating">
                                    <input type="radio" id="star5" name="rate" value="5" disabled/>
                                    <label for="star5" title="text"
                                    ><svg
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="star-solid"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                            ></path></svg
                                        ></label>
                                    <input type="radio" id="star4" name="rate" value="4" disabled/>
                                    <label for="star4" title="text"
                                    ><svg
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="star-solid"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                            ></path></svg
                                        ></label>
                                    <input checked="" type="radio" id="star3" name="rate" value="3" disabled/>
                                    <label for="star3" title="text"
                                    ><svg
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="star-solid"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                            ></path></svg
                                        ></label>
                                    <input type="radio" id="star2" name="rate" value="2" disabled/>
                                    <label for="star2" title="text"
                                    ><svg
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="star-solid"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                            ></path></svg
                                        ></label>
                                    <input type="radio" id="star1" name="rate" value="1" disabled/>
                                    <label for="star1" title="text"
                                    ><svg
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="star-solid"
                                        >
                                            <path
                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                            ></path></svg
                                        ></label>
                                </div>
                            </td>
                            <td class="action-cell">
                                <div class="action-btn">
                                    <div class="tooltip">
                                        <button class="open-modal">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                        <div class="tooltiptext">Modify</div>
                                    </div>
                                    <div class="tooltip">
                                        <button >
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <div class="tooltiptext">Delete</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="details-ligne" style="content-visibility: auto;">
                            <td colspan="3">Voluptatem sunt quis nam omnis reprehenderit laborum iure. Et voluptatum facilis quasi et. Veniam harum nesciunt ipsum enim porro.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <dialog class="modal">
            <div class="dialog-header">
                <h3>Modal Dialog</h3>
                <button class="close-modal close-button">&times;</button>
            </div>
            <div class="dialog-body">
                Empower Digital Natives thru Education and Technology
            </div>
        </dialog>
        <script src="{{asset('scripts/index.js')}}"></script>
    </body>
</html>
