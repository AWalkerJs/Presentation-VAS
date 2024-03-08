// Элемент где будет отрисовываться игра
const gameZone = document.querySelector(".roadgame");

// Игровое поле в виде 2мерного массива. Игрок это Х в центре
const zoneArr = [
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","X","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ["","","","","","","","","","","","","","",""],
                ];


// Позиция игрока
let playerPositionValue = [7,7];

createMap()

// Отрисовка карты на странице по вводному массиву
function createMap () {

    for (let ch of zoneArr) {
        
        for (let c of ch) {
            let newDivchik = document.createElement("div")
            newDivchik.textContent = c;
            newDivchik.classList.add("test__divchik");
            gameZone.appendChild(newDivchik);
        }

    }

    movePlayer();
}

// Определение позиции игрока + покраска в красный цвет
// + убираем покраску если игрок сдвинулся
function movePlayer () {

    const zoneCube = document.querySelectorAll(".test__divchik");

    zoneCube.forEach((elem) => {
        if (elem.textContent == "X") {
            elem.classList.add("player__zone");
        } else if (elem.textContent == "O") {
            elem.classList.add("bot__zone");
        } else {
            elem.classList.remove("player__zone");
        }
    })
}

// Полное удаление карты для новой отрисовки
function removeMap () {
    const zoneCube = document.querySelectorAll(".test__divchik");
    zoneCube.forEach(elem => {
        elem.remove();
        elem.classList.remove("player__zone");
    })
    
}

// Основное тело программы
// Слушатели на W A S D
// + проверка на края игрового поля
// Движения игрока
document.body.addEventListener("keydown", function (keySimbol) {

    zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
    if (keySimbol.key == "s") {
        if (playerPositionValue[0] == 14) return
        playerPositionValue[0] += 1;
    } else if (keySimbol.key == "w") {
        if (playerPositionValue[0] == 0) return
        playerPositionValue[0] -= 1;
    } else if (keySimbol.key == "d") {
        if (playerPositionValue[1] == 14) return
        playerPositionValue[1] += 1;
    } else if (keySimbol.key == "a") {
        if (playerPositionValue[1] == 0) return
        playerPositionValue[1] -= 1;
    }

    zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "X";
    
    botSpawn();
    removeMap();
    createMap();
})

// Спавн Бота
function botSpawn () {
    zoneArr[getPositionBotRPG()][getPositionBotRPG()] = "O"

}

function getPositionBotRPG() {
    return Math.floor(Math.random() * 14);
}