// Элемент где будет отрисовываться игра
const gameZone = document.querySelector(".roadgame");

// Элемент фазы боя
const battleZoneDocument = document.querySelector(".battle__fase");

// класс для ПОКАЗА фазы боя
const BATTLE_ZONE_OPENER = "battle__fase__open";

// класс для отображения выбранного поля для удара
const BATTLE_ZONE_CHOOSEN = "choose__fight__area";

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

// Количество здоровья игрока
let playeHpValue = 100;
// Поле отвечающее за отображение ХП
let hpBarDocument = document.querySelector(".rpg__hp__bar");
// Количество здоровья бота
let botHpValue = 100;
// Урон игрока
let playerDamageValue = 10;
// Урон бота
let botDamageValue = 5;

// Инвентарь игрока
const playerInventory = {};

// Позиция бота
let botPositionValue = ["",""];

// Статус игры
// 0 - Фаза движения
// 1 - Фаза боя
let gamePhaseValue;

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
        
        elem.classList.remove("player__zone");
        elem.remove();
        
    })
    
}

// Основное тело программы
// Слушатели на W A S D
// + проверка на края игрового поля
// Движения игрока
document.body.addEventListener("keydown", function (keySimbol) {

    
    if (keySimbol.key == "s" || keySimbol.key == "ы") {
        if (playerPositionValue[0] >= 14) return
        zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
        playerPositionValue[0] += 1;
    } else if (keySimbol.key == "w" || keySimbol.key == "ц") {
        if (playerPositionValue[0] <= 0) return
        zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
        playerPositionValue[0] -= 1;
    } else if (keySimbol.key == "d" || keySimbol.key == "в") {
        if (playerPositionValue[1] >= 14) return
        zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
        playerPositionValue[1] += 1;
    } else if (keySimbol.key == "a" || keySimbol.key == "ф") {
        if (playerPositionValue[1] <= 0) return
        zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
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

    // Если бот догнал, то фаза игры меняется на бой
    if (botPositionValue[0] == playerPositionValue[0] && 
        botPositionValue[1] == playerPositionValue[1]) {
        gamePhaseValue = 1;
        removeMap();
        toggleMoveFight();
    } else {
        removeMap();
        createMap();
    }

}

// Смена фазы с движения на бой и наоборот
function toggleMoveFight () {
    battleZoneDocument.classList.toggle(BATTLE_ZONE_OPENER);
}

// Фаза боя
function battlePhase () {
    
}

// Функция случайного значения для удара Бота
function botRandomPunch () {
    return Math.floor(Math.random() * 2);
}


// Проверка победителя 
// У кого ХП 0 тот проиграл
function checkWinnerRGP () {
    if (botHpValue == 0) {
        botPositionValue[0] = "";
        botPositionValue[1] = "";
    } else if (playeHpValue == 0) {
        removeMap();
        let loseInfo = document.createElement("div")
        loseInfo.textContent = "You Defeat";
        gameZone.appendChild(loseInfo);
    }
}

// Запуск хода бота
// Бот ходит каждую секунду
setInterval( botMoving, 1000 )