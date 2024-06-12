const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector("button.close-modal");
const modal = document.querySelector(".modal");

openModal.addEventListener("click", () => {
    modal.showModal();
    modal.classList.remove('hide');
    modal.classList.add('show');
});

closeModal.addEventListener("click", () => {
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.addEventListener('transitionend', () => {
        modal.close();
    }, { once: true });
});
