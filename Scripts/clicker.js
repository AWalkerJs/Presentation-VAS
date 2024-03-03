const clickerLogo = document.querySelector(".clicker__logo");
const userScore = document.querySelector(".user__score")

clickerLogo.addEventListener("click", userClick)

function userClick () {
    userScore.innerText = +userScore.innerText + 1
}