// DOM Elements
const brandTableBody = document.querySelector('table tbody');
const modal = document.querySelector('.modal');
const form = document.querySelector('#brand_form');
const saveBtn = document.querySelector('.save-btn');
const closeBtn = document.querySelector('.close-button');
const brandImage = document.getElementById('brand_image');
const brandIdInput = document.getElementById('brand_id');

// Event Listeners
brandImage.addEventListener('change', handleImageChange);
saveBtn.addEventListener('click', handleSave);
closeBtn.addEventListener('click', closeModal);

// Initial Fetch
fetchAllRecords();

function handleImageChange() {
    const file = brandImage.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        document.querySelector('.img-preview').src = reader.result;
    };

    reader.readAsDataURL(file);
}

function handleSave() {
    if (!verifyForm()) return;

    toggleLoadingState(true);

    const formData = new FormData(form);
    const brandId = brandIdInput.value;
    const url = brandId ? `/api/brands/${brandId}?_method=PUT` : '/api/brands';
    // const method = brandId ? 'PUT' : 'POST';

    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        createNotification(data.message, data.success ? 'success' : 'error', 3500);
        if (data.success) {
            if (brandId) {
                updateRow(data.data);
            } else {
                addNewRow(data.data);
            }
            closeModal();
        }
    })
    .catch(err => {
        createNotification(err.message, 'error', 1500);
    })
    .finally(() => {
        toggleLoadingState(false);
    });
}

function verifyForm() {
    const fields = ['brand_name', 'country_select'];
    let isValid = true;

    fields.forEach(id => {
        const field = document.getElementById(id);
        if (field.value.trim() === '') {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

function fetchAllRecords() {
    const url = '/api/brands';

    fetch(url, {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            populateTable(data.data);
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

function populateTable(brands) {
    brandTableBody.innerHTML = brands.map((elt, index) => createTableRow(elt, index)).join('');
}

function createTableRow(elt, index) {
    const ratingStr = Array.from({ length: 5 }, (_, i) => {
        const starIndex = 5 - i;
        return `
            <input type="radio" id="star-display-${starIndex}-${index}" value="${starIndex}" ${elt.rating == starIndex ? 'checked' : ''} disabled/>
            <label for="star-display-${starIndex}-${index}" title="text">
                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="star-solid">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
            </label>
        `;
    }).join('');

    return `
        <tr id="main-ligne-${elt.id}" class="main-ligne" data-id="${elt.id}">
            <td rowspan="2" class="num-cell">
                <span class="verify-disp"><i class="fa-solid fa-check-circle"></i> verified</span>
                <span class="num-disp">${index}</span>
            </td>
            <td class="logo-cell">
                <div class="brand">
                    <img src="${elt.image}" alt="default logo" onerror="this.src='/images/default.png'" style="background: lightgrey">
                    <span class="logo-name">${elt.name}</span>
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
        <tr id="details-ligne-${elt.id}" class="details-ligne" style="content-visibility: auto;">
            <td colspan="4">${elt.details}</td>
        </tr>
    `;
}

function openEditModal(data) {
    document.querySelector('#brand_name').value = data.name;
    document.querySelector('#country_select').value = data.country_code;
    document.querySelectorAll('[name="rating"]').forEach(radio => {
        radio.checked = radio.value == data.rating;
    });
    document.querySelector('#brand_details').value = data.details;
    document.querySelector('#is_default').checked = data.default;
    document.querySelector('.img-preview').src = data.image;
    brandIdInput.value = data.id;

    openModal();
}

function openModal() {
    modal.showModal();
    modal.classList.remove('hide');
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.addEventListener('transitionend', () => {
        modal.close();
        form.reset();
        document.querySelector('.img-preview').src = '/images/default.png';
        brandIdInput.value = '';
    }, { once: true });
}

function toggleLoadingState(isLoading) {
    saveBtn.disabled = isLoading;
    closeBtn.disabled = isLoading;
    saveBtn.querySelector('.spinner').classList.toggle('none', !isLoading);
    saveBtn.querySelector('.btn-content').classList.toggle('none', isLoading);
}

function addNewRow(brand) {
    const index = brandTableBody.querySelectorAll('tr.main-ligne').length;
    const newRow = createTableRow(brand, index);
    brandTableBody.insertAdjacentHTML('beforeend', newRow);
}

function updateRow(updatedBrand) {
    const row = brandTableBody.querySelector(`tr.main-ligne[data-id="${updatedBrand.id}"]`);
    if (row) {
        const newRow = createTableRow(updatedBrand, Array.from(row.parentElement.children).indexOf(row) / 2);
        row.outerHTML = newRow;
        const detailsRow = row.nextElementSibling;
        if (detailsRow && detailsRow.classList.contains('details-ligne')) {
            detailsRow.outerHTML = createTableRow(updatedBrand, Array.from(detailsRow.parentElement.children).indexOf(detailsRow) / 2).nextElementSibling.outerHTML;
        }
    }
}
