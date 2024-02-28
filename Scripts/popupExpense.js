const POPUP_ACTIVE = "expense__popup__open";
const BODY_FIX_SCROLL = "body__fixed";

const setupLimit = document.querySelector(".set__limit");
const popupWindow = document.querySelector(".expense__popup");
const closeButton = document.querySelector(".expense__close__button");
const limitPopupInput = document.querySelector(".limit__popup__input");
const setNewLimit = document.querySelector(".limit__button");


const incrButton = document.querySelectorAll(".incr__button");

setupLimit.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

function togglePopup () {


    popupWindow.classList.toggle(POPUP_ACTIVE);
    popupWindow.classList.toggle(BODY_FIX_SCROLL);

}

limitPopupInput.value = limitMoney.innerText;

incrButton.forEach(function (elem) {
    elem.addEventListener("click", function(){
        if (limitPopupInput.value == "") {
            limitPopupInput.value = elem.innerText;
            return
        }
        limitPopupInput.value = +limitPopupInput.value + +elem.innerText;
    })
})

setNewLimit.addEventListener("click", function () {
    limitMoney.innerText = limitPopupInput.value;
    togglePopup();
})



