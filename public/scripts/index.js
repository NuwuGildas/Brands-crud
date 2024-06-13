const brand_table_body = document.querySelector('table tbody');
const modal = document.querySelector(".modal");
const form = document.querySelector("#brand_form");
const saveBtn = document.querySelector('.save-btn');
const closeBtn = document.querySelector('.close-button');

fetchAllRecords();

saveBtn.addEventListener('click', () => {
    if(!verifyForm())
        return

    saveBtn.disabled = true;
    closeBtn.disabled = true;
    saveBtn.querySelector('.spinner').classList.remove('none');
    saveBtn.querySelector('.btn-content').classList.add('none');

    const formdata = new FormData(form);

    const url = '/api/brands'
    fetch(url, {
        method: 'post',
        body: formdata,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                createNotification(data.message, 'success', 350000)
            }else{
                createNotification(data.message, 'error', 350000)
            }
        })
        .catch(err => {
            createNotification(err.message, 'error', 1500)
        })
        .finally(() => {
            saveBtn.disabled = false;
            closeBtn.disabled = false;
            saveBtn.querySelector('.spinner').classList.add('none');
            saveBtn.querySelector('.btn-content').classList.remove('none');
        })


});

function verifyForm(){
    const fields = ['brand_name', 'country_select'];
    let verif = true;

    fields.forEach(id => {
        const field = document.getElementById(id);
        if (field.value.trim() === '') {
            field.classList.add('error');
            verif = false;
        } else {
            field.classList.remove('error');
        }
    });

    return verif;
}

function fetchAllRecords(){

    const url = '/api/brands';
    let htmlStr = '';

    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                const brands = data.data;
                brands.forEach((elt, index) => {
                    ratingStr = '';
                    for (let i = 5; i > 0; i-- ){
                        ratingStr += `
                            <input type="radio" id="star-display-${i}-${index}" value="${i}" ${elt.rating == i ? 'checked' : ''} disabled/>
                            <label for="star-display-${i}-${index}" title="text" >
                            <svg
                                viewBox="0 0 576 512"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                class="star-solid" >
                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" ></path>
                            </svg>
                            </label>
                        `;
                    }

                    htmlStr += `
                        <tr class="main-ligne">
                            <td rowspan="2" class="num-cell">
                                <span class="verify-disp"><i class="fa-solid fa-check-circle"></i> verified</span>
                                <span class="num-disp">${index}</span>
                            </td>
                            <td class="logo-cell">
                                <div class="brand">
                                    <img src="${elt.image}" alt="default logo" onerror="this.src='/images/default.png'" style="background: lightgrey">
                                    <span class="logo-name"> ${elt.name} </span>
                                </div>
                            </td>
                            <td class="verify-cell">
                                <img src="/images/verified.png" alt="verified">
                            </td>
                            <td class="rating-cell">
                                <div class="rating">
                                    ${ratingStr}
                                </div>
                                <p class="details-ligne-sm">
                                    ${elt.details}
                                </p>
                            </td>
                            <td class="action-cell">
                                <div class="tooltip">
                                    <button class="open-modal" onclick='openEditModal(${JSON.stringify(elt)})'>
                                        <i class="fa-solid fa-pen"></i>
                                        <span class="btn-desc-lg">Edit</span>
                                    </button>
                                    <div class="tooltiptext">Modify</div>
                                </div>
                                <div class="tooltip">
                                    <button class="danger-btn">
                                        <i class="fa-solid fa-trash-can"></i>
                                        <span class="btn-desc-lg">Delete</span>
                                    </button>
                                    <div class="tooltiptext">Delete</div>
                                </div>
                            </td>
                        </tr>
                        <tr class="details-ligne" style="content-visibility: auto;">
                            <td colspan="4">${elt.details}</td>
                        </tr>
                    `;
                });

                brand_table_body.innerHTML = htmlStr;
            } else {
                console.error('Failed to fetch data');
            }
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        })
        .finally(() => {
            document.querySelector('.spinner-parent').classList.add('none');
        });
}

function openEditModal(data){
    console.log(data)
    document.querySelector('#brand_name').value = data.name;
    document.querySelector('#country_select').value = data.country_code;
    document.querySelectorAll('[name="rate"]').forEach(radio => {
        console.log(data.rating)
        if (radio.value == data.rating) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    document.querySelector('#brand_details').value = data.details;
    document.querySelector('#is_default').checked = data.default;

    openModal();
}

function openModal(){
    modal.showModal();
    modal.classList.remove('hide');
    modal.classList.add('show');
}

function closeModal(){
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.addEventListener('transitionend', () => {
        modal.close();
        form.reset();
    }, { once: true });
}
