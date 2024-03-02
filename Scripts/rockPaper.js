const POP_UP_OPEN_TIKITAKA = "tikitaka__popup__open";
const BODY_FIX_TIKITAKA = "body__fixed";

const bodyClass = document.querySelector(".body");
const tikitaka = document.querySelector(".tikitaka");
let counterTikitaka = 0;
let markCounter = [];
let zeroCounter = [];
const winner = document.querySelector(".tikitaka__winner")


const sideValue = document.querySelector(".side__choose");
const numberValue = document.querySelector(".number__choose");
const dificultValue = document.querySelector(".dificult__choose");
const gameStartButton = document.querySelector(".start__game");

const tikitakaPopUp = document.querySelector(".tikitaka__popup");
const tikitakaContent = document.querySelector(".tikitaka__popup__content");


gameStartButton.addEventListener("click", function () {
    console.log (sideValue.value);
    console.log (numberValue.value);
    console.log (dificultValue.value);
})

const mapWinner =   [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];


let pole = document.querySelectorAll(".tikitaka__pole");

pole.forEach((elem, index) => {
    elem.addEventListener("click", function(){
        
        if ((elem.innerText !== "X") && (elem.innerText !== "O")) {
            elem.innerText = "X";
            markCounter.push(index);
            counterTikitaka++;
            checkWin();
            botRound();
            checkWin();
            
        } 
        
        
        
    })
})

function botRound() {
    let positionTik = getRandomPosition();
    if ((pole[positionTik].innerText == "X") || (pole[positionTik].innerText == "O")) {
        botRound();
    } else {    
        pole[positionTik].innerText = "O";
        zeroCounter.push(positionTik);
        counterTikitaka++
    }
    
    
}

function getRandomPosition() {
    return Math.floor(Math.random() * 9);
}

function checkWin() {

    for(let ch of mapWinner) {
        let winnerX = 0;
        let winnerO = 0;
            for (let i=0; i<zeroCounter.length; i++){
                if (ch.includes(markCounter[i])) {
                    winnerX++;
                    if (winnerX == 3) {
                        popUptoggle();
                        winner.innerHTML = "Победили КРЕСТИКИ";

                        setTimeout(clearGame,2000);
                    }
                }
                if (ch.includes(zeroCounter[i])) {
                    winnerO++;
                    if (winnerO == 3) {
                        popUptoggle();
                        winner.innerHTML = "Победили НОЛИКИ";
                        
                        setTimeout(clearGame,2000);
                    }
                } 
        }
    }

    if (counterTikitaka === 9) {
        popUptoggle();
        winner.innerHTML = "Ничья";
                        
        setTimeout(clearGame,2000);
    }
}

function popUptoggle () {
    tikitakaPopUp.classList.toggle(POP_UP_OPEN_TIKITAKA);
    bodyClass.classList.toggle(BODY_FIX_TIKITAKA);
}

function clearGame() {
    for (let ch of pole) {
        ch.innerText = "";
    }
    markCounter = [];
    zeroCounter = [];
    counterTikitaka = 0;
    
}

tikitakaPopUp.addEventListener("click", function (click) {
    const clickOuside = !click.composedPath().includes(tikitakaContent);

    if (clickOuside) {
        popUptoggle();
    }
})