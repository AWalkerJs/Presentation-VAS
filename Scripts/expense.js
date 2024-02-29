const WELL_STATUS = "well__status";
const BAD_STATUS = "bad__status"

const categoryValue = document.querySelector(".category__select");
const inputValue = document.querySelector(".input__debet");
const inputButton = document.querySelector(".input__button");
const limitMoney = document.querySelector(".limit__money");
const debetList = document.querySelector(".debet__list");
const expenseScore = document.querySelector(".expense__status");
const clearExpense = document.querySelector(".clear__expense__score");
const walletStatus = document.querySelector(".wallet__status");

const expenses = [];
const expensesTitle = [];

dataLoaded();

inputButton.addEventListener("click", function () {
    if ((inputValue.value == "") || (categoryValue.value == "Категория")) {
        return;
    }
    expenses.push(+inputValue.value);
    expensesTitle.push(categoryValue.value);

    debetList.innerHTML = "";
    for (let i=0; i<expenses.length ; i++) {
        debetList.innerHTML += `<li>${expensesTitle[i]}: ${expenses[i]} руб.</li>`
    }
    
    inputValue.value = "";
    categoryValue.value = "Категория";
    
    expenseScore.innerText = expenses.reduce((a, b) => a + b);
    checkLimit();

    localStorage.debetStatus = debetList.innerHTML;
    localStorage.expenseStatus = expenseScore.innerText;
})

clearExpense.addEventListener("click", function () {
    expenses.length = 0;
    expensesTitle.length = 0;

    expenseScore.innerText = 0;
    debetList.innerHTML = "";
    walletStatus.innerText = "";
    limitMoney.innerText = 0;

    localStorage.clear();    
})

function checkLimit () {
    if (+expenseScore.innerText <= +limitMoney.innerText) {
        walletStatus.innerText = "Ты в ресурсе";
        walletStatus.classList.remove(BAD_STATUS);
        walletStatus.classList.add(WELL_STATUS);
    } else {
        walletStatus.innerText = "Все плохо";
        walletStatus.classList.remove(WELL_STATUS);
        walletStatus.classList.add(BAD_STATUS);
    }
    localStorage.dataStatus = walletStatus.innerText;
    localStorage.moneyStatus = limitMoney.innerText;
}

function dataLoaded () {

    if (!localStorage.dataStatus) {return}

    walletStatus.innerText = localStorage.dataStatus;
    limitMoney.innerText = localStorage.moneyStatus;
    debetList.innerHTML = localStorage.debetStatus;
    expenseScore.innerText = localStorage.expenseStatus;

    checkLimit();
}


