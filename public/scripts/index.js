class BrandManager {
    constructor() {
        // DOM Elements
        this.brandTableBody = document.querySelector('table tbody');
        this.modal = document.querySelector('.modal');
        this.form = document.querySelector('#brand_form');
        this.saveBtn = document.querySelector('.save-btn');
        this.closeBtn = document.querySelector('.close-button');
        this.addBrandBtn = document.querySelector('#open_button');
        this.brandImage = document.getElementById('brand_image');
        this.brandIdInput = document.getElementById('brand_id');
        this.toasts = document.querySelector(".toasts");

        // Event Listeners
        this.brandImage.addEventListener('change', this.handleImageChange.bind(this));
        this.saveBtn.addEventListener('click', this.handleSave.bind(this));
        this.closeBtn.addEventListener('click', this.closeModal.bind(this));
        this.addBrandBtn.addEventListener('click', this.openModal.bind(this));

        // Initial Fetch
        this.fetchAllRecords();
    }

    handleImageChange() {
        const file = this.brandImage.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            document.querySelector('.img-preview').src = reader.result;
        };

        reader.readAsDataURL(file);
    }

    handleSave() {
        if (!this.verifyForm()) return;

        this.toggleLoadingState(true);

        const formData = new FormData(this.form);
        const brandId = this.brandIdInput.value;
        const url = brandId ? `/api/brands/${brandId}?_method=PUT` : '/api/brands';

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (brandId) {
                        this.updateRow(data.data);
                    } else {
                        this.addNewRow(data.data);
                    }
                    this.closeModal();
                } else {
                    if (data.data) {
                        for (const key in data.data) {
                            const elt = document.querySelector(`#${key}-err`);
                            if (elt) {
                                elt.classList.remove('none');
                                elt.innerText = data.data[key];
                            }
                        }
                    }
                }
                this.createNotification(data.message, data.success ? 'success' : 'error', 5000);
            })
            .catch(err => {
                this.createNotification(err.message, 'error', 5000);
            })
            .finally(() => {
                this.toggleLoadingState(false);
            });
    }

    verifyForm() {
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

    fetchAllRecords() {
        const url = '/api/brands';

        fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.populateTable(data.data);
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

    deleteRow(brandId) {
        const mainRow = document.querySelector(`#main-ligne-${brandId}`);
        const detailsRow = document.querySelector(`#details-ligne-${brandId}`);

        if (!mainRow || !detailsRow) return;

        const spinner = this.createSpinner();

        mainRow.appendChild(spinner);

        const url = `/api/brands/${brandId}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.createNotification(data.message, data.success ? 'success' : 'error', 5000);

                if (data.success) {
                    mainRow.remove();
                    detailsRow.remove();
                } else {
                    spinner.remove();
                }
            })
            .catch(err => {
                this.createNotification(err.message, 'error', 5000);
                spinner.remove();
            });
    }

    populateTable(brands) {
        this.brandTableBody.innerHTML = brands.map((elt, index) => this.createTableRow(elt, index)).join('');
    }

    createTableRow(elt, index) {
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
                        <button class="open-modal" onclick='brandManager.openEditModal(${JSON.stringify(elt)})'>
                            <i class="fa-solid fa-pen"></i>
                            <span class="btn-desc-lg">Edit</span>
                        </button>
                        <div class="tooltiptext">Modify</div>
                    </div>
                    <div class="tooltip">
                        <button id="del-${elt.id}" class="danger-btn" onclick="brandManager.deleteRow(${elt.id})">
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

    openEditModal(data) {
        document.querySelector('#brand_name').value = data.name;
        document.querySelector('#country_select').value = data.country_code;
        document.querySelectorAll('[name="rating"]').forEach(radio => {
            radio.checked = radio.value == data.rating;
        });
        document.querySelector('#brand_details').value = data.details;
        document.querySelector('#is_default').checked = data.default;
        document.querySelector('.img-preview').src = data.image;
        this.brandIdInput.value = data.id;

        this.openModal();
    }

    openModal() {
        this.modal.showModal();
        this.modal.classList.remove('hide');
        this.modal.classList.add('show');
    }

    closeModal() {
        this.modal.classList.remove('show');
        this.modal.classList.add('hide');
        this.modal.addEventListener('transitionend', () => {
            this.modal.close();
            this.form.reset();
            document.querySelector('.img-preview').src = '/images/default.png';
            this.brandIdInput.value = '';
            document.querySelector('#brand_image-err').classList.add('none');
        }, { once: true });
    }

    toggleLoadingState(isLoading) {
        this.saveBtn.disabled = isLoading;
        this.closeBtn.disabled = isLoading;
        this.saveBtn.querySelector('.spinner').classList.toggle('none', !isLoading);
        this.saveBtn.querySelector('.btn-content').classList.toggle('none', isLoading);
    }

    addNewRow(brand) {
        const index = this.brandTableBody.querySelectorAll('tr.main-ligne').length;
        const newRow = this.createTableRow(brand, index);
        this.brandTableBody.insertAdjacentHTML('beforeend', newRow);
    }

    updateRow(updatedBrand) {
        const row = this.brandTableBody.querySelector(`tr.main-ligne[data-id="${updatedBrand.id}"]`);
        if (row) {
            const detailsRow = this.brandTableBody.querySelector(`tr#details-ligne-${updatedBrand.id}`);
            if (detailsRow) detailsRow.remove();

            row.outerHTML = this.createTableRow(updatedBrand, Array.from(row.parentElement.children).indexOf(row) / 2);
        }
    }

    createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'spinner-parent';
        spinner.style.top = '0';
        spinner.innerHTML = `
            <div class="spinner spinner-lg">
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        `;
        return spinner;
    }

    createNotification(message, type = null, delay= null) {
        const notif = document.createElement("div");

        notif.classList.add("toast");
        if (type === "info") notif.classList.add("info");
        else if (type === "success") notif.classList.add("success");
        else if (type === "warn") notif.classList.add("warn");
        else if (type === "error") notif.classList.add("error-msg");

        notif.innerHTML = message;
        this.toasts.append(notif);

        if (delay) {
            setTimeout(() => {
                notif.remove();
            }, delay);
        }
    }
}

// Instantiate the BrandManager class
const brandManager = new BrandManager();
