const toasts = document.querySelector(".toasts");

//createNotification(getRandomMessage(), getRandomType(), 3000)

function createNotification(message, type = null, delay = null) {
    const notif = document.createElement("div");

    notif.classList.add("toast");
    if (type === "info") notif.classList.add("info");
    else if (type === "success") notif.classList.add("success");
    else if (type === "warn") notif.classList.add("warn");
    else if (type === "error") notif.classList.add("error-msg");

    notif.innerText = message;
    toasts.append(notif);

    if (delay) {
        setTimeout(() => {
            notif.remove();
        }, delay);
    }
}
