console.log (1);

const myIp = fetch("https://api.ipify.org?format=json")
.then (response => response.json())
.then(data => data);

console.log (2);
let test;

fetch("https://api.ipify.org?format=json")
.then (response => response.json())
.then(data => test = data);

console.log (3);

console.log (myIp);

console.log (4);

setTimeout( console.log (test) ,5000)