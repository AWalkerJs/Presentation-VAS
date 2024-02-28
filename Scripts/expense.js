const categoryValue = document.querySelector(".category__select");
const inputValue = document.querySelector(".input__debet");
const inputButton = document.querySelector(".input__button");
const limitMoney = document.querySelector(".limit__money");
const debetList = document.querySelector(".debet__list");
const expenseScore = document.querySelector(".expense__status");
const clearExpense = document.querySelector(".clear__expense__score");

const expenses = [];
const expensesTitle = [];

inputButton.addEventListener("click", function () {
    if ((inputValue.value == "") || (categoryValue.value == "Категория")) {
        return;
    }
    expenses.push(+inputValue.value);
    expensesTitle.push(categoryValue.value);

    debetList.innerHTML = "";
    for (let i=0; i<expenses.length ; i++) {
        debetList.innerHTML += `<li>${expensesTitle[i]}: ${expenses[i]}</li>`
    }
    
    inputValue.value = "";
    categoryValue.value = "Категория";
    
    expenseScore.innerText = expenses.reduce((a, b) => a + b);
})

clearExpense.addEventListener("click", function () {
    expenses.length = 0;
    expensesTitle.length = 0;

    expenseScore.innerText = 0;
    debetList.innerHTML = "";

})



