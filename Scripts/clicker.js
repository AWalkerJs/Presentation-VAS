const clickerLogo = document.querySelector(".clicker__logo");
const userScore = document.querySelector(".user__score");
const bitcoinCostValue = document.querySelector(".cost__bitcoin");
const dataBitcoinValue = document.querySelector(".date__bitcoin");

clickerLogo.addEventListener("click", userClick)

function userClick () {
    userScore.innerText = +userScore.innerText + 1
}

fetch ("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then (response => response.json())
    .then (data => {
        bitcoinCostValue.innerText = `${data.bpi.USD.rate_float} USD`;
        dataBitcoinValue.innerText = data.time.updated;
    })
