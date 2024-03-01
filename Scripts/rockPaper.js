const tikitaka = document.querySelector(".tikitaka")
let counterTikitaka = 0;
let markCounter = [];
let zeroCounter = [];
const winner = document.querySelector(".tikitaka__winner")

const sideValue = document.querySelector(".side__choose").value;
const numberValue = document.querySelector(".number__choose").value;
const dificultValue = document.querySelector(".dificult__choose").value;
const gameStartButton = document.querySelector(".start__game");

gameStartButton.addEventListener("click", function () {
    console.log (sideValue);
    console.log (numberValue);
    console.log (dificultValue);
})

const mapWinner =   [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6],];


let pole = document.querySelectorAll(".tikitaka__pole");

pole.forEach((elem, index) => {
    elem.addEventListener("click", function(){
        if (!elem.innerText ) {
            elem.innerHTML = "X";
            markCounter.push(index);
            
        } 
        checkWin();
        botRound();
        checkWin();
        
    })
})

function botRound() {
    let positionTik = getRandomPosition();
    if ((pole[positionTik].innerHTML == "X") || (pole[positionTik].innerHTML == "O")) {
        botRound();
    } else {    
        pole[positionTik].innerHTML = "O";
        zeroCounter.push(positionTik);
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
                        winner.innerHTML = "Победили КРЕСТИКИ";
                        setTimeout(clearGame,2000);
                    }
                }
                if (ch.includes(zeroCounter[i])) {
                    winnerO++;
                    if (winnerO == 3) {
                        winner.innerHTML = "Победили НОЛИКИ";
                        setTimeout(clearGame,2000);
                    }
                } 
        }
    }
}

function clearGame() {
    for (let ch of pole) {
        ch.innerText = "";
    }
    markCounter = [];
    zeroCounter = [];
    winner.innerHTML = "";
}