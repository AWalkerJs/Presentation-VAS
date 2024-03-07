const gameZone = document.querySelector(".roadgame");

// const zoneArr = [
//                 [[1],[2],[3],[4],[5]],
//                 [[6],[7],[8],[9],[0]],
//                 [[1],[2],[3],[4],[5]],
//                 [[6],[7],[8],[9],[0]],
//                 [[1],[2],[3],[4],[5]]];

const zoneArr = [
                [[],[],[],[],[]],
                [[],[],[],[],[]],
                [[],[],["X"],[],[]],
                [[],[],[],[],[]],
                [[],[],[],[],[]]];
                
let playerPositionValue = [2,2];
console.log (playerPositionValue[0])
console.log (playerPositionValue[1]);

console.log (zoneArr[playerPositionValue[0]][playerPositionValue[1]]);

createMap()

function createMap () {

    for (let ch of zoneArr) {
        
        for (let c of ch) {
            let newDivchik = document.createElement("div")
            newDivchik.textContent = c;
            newDivchik.classList.add("test__divchik");
            gameZone.appendChild(newDivchik);
        }

    }

    playerPosition();
}

function playerPosition () {

    

    const zoneCube = document.querySelectorAll(".test__divchik");
    zoneCube.forEach((elem) => {
        if (elem.textContent == "X") {
            elem.classList.add("player__zone");
        }
    })

    movePlayer();
}

function movePlayer () {

    const zoneCube = document.querySelectorAll(".test__divchik");

    zoneArr[2][2] = "";
    playerPositionValue[0] += 1;

    console.log (zoneArr[2][2]);
    console.log (zoneArr[playerPositionValue[0]][playerPositionValue[1]]);
    console.log (playerPositionValue);

    zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "X";
    console.log ( zoneArr[playerPositionValue[0]][playerPositionValue[1]] );


    
    zoneCube.forEach((elem) => {
        if (elem.textContent == "X") {
            elem.classList.add("player__zone");
        }
    })
}


function removeMap () {
    const zoneCube = document.querySelectorAll(".test__divchik");
    zoneCube.forEach(elem => {
        elem.remove();
    })
    
}



