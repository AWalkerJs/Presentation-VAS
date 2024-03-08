const POPUP_CLICKER_OPEN = "clicker__popup__open";

const clickerLogo = document.querySelector(".clicker__logo");
const userScore = document.querySelector(".user__score");
const bitcoinCostValue = document.querySelector(".cost__bitcoin");
const dataBitcoinValue = document.querySelector(".date__bitcoin");
const upgradeMenuButton = document.querySelector(".upgrade__clicker__menu");
const clickerPopUp = document.querySelector(".clicker__popup");
const clickerPopUpContent = document.querySelector(".clicker__popup__content");
const clickerPopupCloseButton = document.querySelector(".clicker__close__button");

// кнопки из поп Апа для апгрейдов
// const increaseButtonOne = document.querySelector(".increase__clicker__one");
// const increaseButtonTen = document.querySelector(".increase__clicker__ten");
// const increaseButtonSto = document.querySelector(".increase__clicker__sotna");
const allUpgradeButtons = document.querySelectorAll(".buttonUpgradeClicker");

allUpgradeButtons.forEach((val) => {
    val.addEventListener("click", function(){
        userCoefValue = +userCoefValue + +val.value;
        console.log ("works")
    })
    
})
// Коэфициент прибавки к значению
let userCoefValue = 1;

// Слушатель на клик по иконке
clickerLogo.addEventListener("click", userClick)

// Закрытие ПопАпа кликера по кнопке
clickerPopupCloseButton.addEventListener("click", toggleCLassPopUp);
// Открытие ПопАпа кликера по кнопке
upgradeMenuButton.addEventListener("click", toggleCLassPopUp);

// Закрытие ПопАпа по клику вне поля
clickerPopUp.addEventListener("click", function (eve) {
    // Проверка, где был сделал клик, внутри попАп контента или снаружи
    const isClickOutside = !eve.composedPath().includes(clickerPopUpContent);

    // Если снаружи, то тоглим класс на закрытие!
    if (isClickOutside) {
        toggleCLassPopUp();
    }
})

// Автоувеличение каждый 4 секунды
setInterval(function () {
    userScore.innerText = +userScore.innerText + userCoefValue;
},4000)

// Увеличения результата по нажатию на иконку
function userClick () {
    userScore.innerText = +userScore.innerText + userCoefValue;
}

// Тогл классов для отображения Поп Апа
// Тогл класса для убирания скрола в Боди
function toggleCLassPopUp () {
    clickerPopUp.classList.toggle(POPUP_CLICKER_OPEN);
    bodyClass.classList.toggle(BODY_FIX_SCROLL);
}


// Вывод информации о курсе биткойна
fetch ("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then (response => response.json())
    .then (data => {
        bitcoinCostValue.innerText = `${data.bpi.USD.rate_float} ${data.bpi.USD.code}`;
        dataBitcoinValue.innerText = data.time.updated;
    })
