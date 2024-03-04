fetch("https://api.ipify.org?format=json")
    .then (response => response.json())
    .then(data => {
        return data["ip"];
    })
    .then ( localdata => {
        fetch (`https://ipinfo.io/${localdata}/geo`)
        .then (response => response.json())
        .then (ipData => {
            const dataTextExample = document.querySelector(".ip__information");
            for (let ch in ipData) {
                dataTextExample.innerHTML += `<div class ="ip__info"> ${ch} : ${ipData[ch]} </div>`
            }
        })
    })
