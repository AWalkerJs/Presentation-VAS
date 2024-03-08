const gameZone = document.querySelector(".roadgame");


                const zoneArr = [
                    ["","","","",""],
                    ["","","","",""],
                    ["","","X","",""],
                    ["","","","",""],
                    ["","","","",""]
                    ];

                
let playerPositionValue = [2,2];

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

    

    
    zoneCube.forEach((elem) => {
        if (elem.textContent == "X") {
            elem.classList.add("player__zone");
        } else {
            elem.classList.remove("player__zone");
        }
    })
}


function removeMap () {
    const zoneCube = document.querySelectorAll(".test__divchik");
    zoneCube.forEach(elem => {
        elem.remove();
        elem.classList.remove("player__zone");
    })
    
}


document.body.addEventListener("keydown", function (keySimbol) {

    zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "";
    if (keySimbol.key == "s") {
        playerPositionValue[0] += 1;
    } else if (keySimbol.key == "w") {
        playerPositionValue[0] -= 1;
    } else if (keySimbol.key == "d") {
        playerPositionValue[1] += 1;
    } else if (keySimbol.key == "a") {
        playerPositionValue[1] -= 1;
    }

    clearZoneFields();
    zoneArr[playerPositionValue[0]][playerPositionValue[1]] = "X";
    
    
    removeMap();
    createMap();
})

function clearZoneFields () {
    for (let char of zoneArr) {
        
        for (let charOfChar of char) {
            charOfChar = "";
        }
    }
    console.log (zoneArr);


}

