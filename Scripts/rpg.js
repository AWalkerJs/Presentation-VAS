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

// Позиция бота
let botPositionValue = ["",""];

// Количество врагов
let oponentsValue = 1;

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
    // Следим чтобы врагов было не больше 1 шт.
    if (oponentsValue > 1) {return}
    let aPosition = getPositionBotRPG();
    let bPosition = getPositionBotRPG();
    zoneArr[aPosition][bPosition] = "O";

    botPositionValue[0] = aPosition;
    botPositionValue[1] = bPosition;

    oponentsValue++;

}

// Получение случайных сначений для спавна бота от 0 до 14
function getPositionBotRPG() {
    return Math.floor(Math.random() * 14);
}

// Движения бота по полю. Бот всегда стремится к полю игрока
// Делает это равномерно, двигаясь по обоим осям.
function botMoving () {
    let verticalMoves;
    let horizontalMoves;
    let differenceValue;

    verticalMoves = botPositionValue[0] - playerPositionValue[0];
    horizontalMoves = botPositionValue[1] - playerPositionValue[1];
    differenceValue = Math.abs(verticalMoves) - Math.abs(horizontalMoves);
    
    zoneArr[botPositionValue[0]][botPositionValue[1]] = "";
    
    if (Math.abs(verticalMoves) > Math.abs(horizontalMoves)) {
        if(verticalMoves < 0) {
            botPositionValue[0] = botPositionValue[0]+1
        } else {
            botPositionValue[0] = botPositionValue[0]-1
        }
    } else {
        if(horizontalMoves < 0) {
            botPositionValue[1] = botPositionValue[1]+1
        } else {
            botPositionValue[1] = botPositionValue[1]-1
        }
    }
    zoneArr[botPositionValue[0]][botPositionValue[1]] = "O";

    removeMap();
    createMap();
    
}

// Запуск хода бота
// Бот ходит каждую секунду
setInterval( botMoving, 1000 )