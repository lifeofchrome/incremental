btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");
incrAmtButton = document.getElementById("incramt");
fractionText = document.getElementById("frac");
amountText = document.getElementById("amt");
cooldownText = document.getElementById("cooldown");
info = document.getElementById("text");

let amt = 0;
let num2s = 0;
let num1s = 5;
let numEdits = 0;
let incr2sCost = 0;
let decr1sCost = 0;
let cooldown = 0;

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

incrAmtButton.addEventListener("click", function () {
    if (cooldown === 0) {
        if (num2s / (num1s + num2s) > Math.random()) {
            amt += 2;
        } else {
            amt++;
        }
        cooldown = 25;
    }
});

btn1.addEventListener("click", function () {
    incr2();
});

btn2.addEventListener("click", function () {
    decr1();
});

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

    if (num2s < 4) {
        btn1.innerHTML = "Add 1 roll to getting +2 (+" + parseInt((((num2s + 1) / (num1s + num2s + 1)) - (num2s / (num1s + num2s))) * 100) + "%)<br>Cost: " + incr2sCost;
    } else {
        btn1.innerHTML = "Add 1 roll to getting +2<br>Maxed";
    }
    if (amt < incr2sCost || num2s >= 4) {
        btn1.setAttribute("disabled", "true");
    } else {
        btn1.removeAttribute("disabled");
    }

    btn2.removeAttribute("hidden");
    if (num1s >= 1 && num2s >= 1) {
        btn2.innerHTML = "Remove 1 roll from getting +1 (+" + parseInt(((num2s / (num1s - 1 + num2s)) - (num2s / (num1s + num2s))) * 100) + "%)<br>Cost: " + decr1sCost;
    } else if (num1s < 1) {
        btn2.innerHTML = "Decrement num 1s<br>Maxed";
    } else if (num2s < 1) {
        btn2.setAttribute("hidden", "true");
    }
    if (amt < decr1sCost || num1s === 0) {
        btn2.setAttribute("disabled", "true");
    } else {
        btn2.removeAttribute("disabled");
    }
}, 25);
