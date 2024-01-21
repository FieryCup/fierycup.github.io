// Clone Header Menu Items

const headerItems = document.getElementById("header-items")
const headerMenuItems = document.getElementById("header-menu-items")

for (let headerItem of headerItems.querySelectorAll("a")) {
    headerMenuItems.appendChild(
        headerItem.cloneNode(true)
    )
}

// Menu Expand

const headerMenuExpandButton = document.getElementById("header-menu-expand-button");
const headerMenu = document.getElementById("header-menu");

headerMenuExpandButton.addEventListener("click", () => {
    headerMenu.showModal();
})

headerMenu.addEventListener('click', (event) => {
    let rect = headerMenu.getBoundingClientRect();
    let isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        headerMenu.close();
    }
});

// Resize Handler

let header = document.getElementById("header");

function updateHeader() {
    header.classList.remove("compact")
    if (header.clientHeight !== header.scrollHeight) {
        header.classList.add("compact")
    } else {
        header.classList.remove("compact")
        headerMenu.close();
    }
}

window.addEventListener("resize", updateHeader)
updateHeader();