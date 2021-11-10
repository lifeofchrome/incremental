btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");
incrAmtButton = document.getElementById("incramt");
fractionText = document.getElementById("frac");
amountText = document.getElementById("amt");
cooldownText = document.getElementById("cooldown");
info = document.getElementById("text");
shop = document.getElementById("shop");

let amt = 0;
let num2s = 0;
let num1s = 5;
let numEdits = 0;
let incr2sCost = 0;
let decr1sCost = 0;
let cooldown = 0;
let upgrades = JSON.parse('{}');

function incr2() {
    if (num2s <= 3 && amt >= incr2sCost) {
        num2s++;
        numEdits++;
        amt -= incr2sCost;
    }
}

function decr1() {
    if (num1s >= 1 && num2s >= 1 && amt >= decr1sCost) {
        num1s--;
        numEdits++;
        amt -= decr1sCost;
    }
}

function increment() {
    if (cooldown === 0) {
        if (num2s / (num1s + num2s) > Math.random()) {
            amt += 2;
        } else {
            amt++;
        }
        cooldown = 25;
    }
}

function addUpgrade(id, text, func) {
    el = document.createElement("button");
    el.id = id;
    el.setAttribute("onclick", func);
    el.className = "shopUpgrade";
    el.innerHTML = text;
    shop.appendChild(el);
    upgrades[id] = el;
}

function removeUpgrade(id) {
    shop.removeChild(document.getElementById(id));
    delete upgrades[id];
}

setInterval(function () {
    if(num2s > 0) {
        info.innerHTML = Number(num2s / (num2s + num1s) * 100).toFixed(1) + "% chance to get +2";
    }
    
    if(cooldown > 0) {
        cooldown--;
        cooldownText.innerHTML = "(" + Number(cooldown * 0.025).toFixed(1) + "s cooldown)";
    } else {
        cooldownText.innerHTML = "<br>";
    }
    
    if (numEdits > 0) {
        incr2sCost = Math.ceil(((10 * ((num2s + 1) / (num1s + num2s + 1))) / (num2s / (num1s + num2s))) * Math.pow(1.15, numEdits));
        decr1sCost = Math.ceil(((10 * (num2s / (num1s - 1 + num2s))) / (num2s / (num1s + num2s))) * Math.pow(1.15, numEdits));
    } else {
        incr2sCost = 8;
        decr1sCost = 6;
    }

    amountText.innerHTML = "$" + amt;

    if(amt >= 8 && !upgrades["incr2-1"]) {
        addUpgrade("incr2-1", "incr num 2s (+" + parseInt((((num2s + 1) / (num1s + num2s + 1)) - (num2s / (num1s + num2s))) * 100) + "%)<br>cost: " + incr2sCost, "incr2()");
    }
    if(num2s === 1 && upgrades["incr2-1"]) {
        removeUpgrade("incr2-1");
    }
    if(num2s === 1 && amt >= incr2sCost - 5 && !upgrades["incr2-2"]) {
        addUpgrade("incr2-2", "incr num 2s (+" + parseInt((((num2s + 1) / (num1s + num2s + 1)) - (num2s / (num1s + num2s))) * 100) + "%)<br>cost: " + incr2sCost, "incr2()");
    }
    if(num2s === 2 && upgrades["incr2-2"]) {
        removeUpgrade("incr2-2");
    }
   
}, 25);
