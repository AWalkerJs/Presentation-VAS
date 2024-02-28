const POPUP_ACTIVE = "expense__popup__open";
const BODY_FIX_SCROLL = "body__fixed";

const setupLimit = document.querySelector(".set__limit");
const popupWindow = document.querySelector(".expense__popup");
const closeButton = document.querySelector(".expense__close__button");

setupLimit.addEventListener("click", togglePopup);

closeButton.addEventListener("click", togglePopup);

function togglePopup () {
    popupWindow.classList.toggle(POPUP_ACTIVE);
    popupWindow.classList.toggle(BODY_FIX_SCROLL);

}