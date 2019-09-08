var btn_start = document.getElementById("start");
var time = document.getElementById("time");
var sec = 15;
var t;
var ecran = document.getElementById("ecran");
var catchMe = document.getElementById("catchMe");
var pnl = document.getElementById("pnl");
var goal = 10;
var sc = document.getElementById("sc");
var upscore = 0;
var mc = document.getElementById("mc");
var missClick = 0;
var lvl = document.getElementById("lvl");
var pointLvl = 1;
var hs = document.getElementById("hs");
var highScore = 0;
var a = 300;
var spinTime = 2;
var users = [];
var a,b;


var users = [
    {name: "Meir", score: 250, date: "07/02/2019"},
    {name: "bob", score: 200, date: "07/02/2019"},
    {name: "david", score: 150, date: "07/02/2019"},
    {name: "kevin", score: 100, date: "07/02/2019"},
    {name: "ben", score: 50, date: "07/02/2019"}
];

var usersJSON = localStorage.getItem("theUsers");
localStorage.setItem("theUsers", JSON.stringify(users));
if (usersJSON != null) {
    users = JSON.parse(usersJSON);
    createHTML();

};

function createHTML() {
    var toAppend = "";
    users.forEach(function(name) {
        toAppend += `<div class="p" id="hs">${name.name} / ${name.score} / ${name.date}</div>`
    })
    hs.innerHTML = toAppend;
}

function start() {
    alert("le jeu commence !!");
    btn_start.disabled = true;
    t = setInterval(startChrono, 1000);
    catchMe.addEventListener("mouseover", mooveDiv);
    ecran.addEventListener("click", penalite);
    catchMe.addEventListener("click", score);
    document.getElementById("catchMe").className = "rotating";
    catchMe.style.animationDuration = spinTime;
    createHTML();
};


function startChrono() {
    sec--;
    time.innerHTML = sec + " s";
    if (sec == 0) {
        sec = 0;
        clearInterval(t);
        if (upscore > users[4].score) {
            addUser();
            reset();
        } else (
            reset()
        )
    };
};

function mooveDiv() {
    setTimeout(moove, a);
};

function score(e) {
    e.stopPropagation();
    upscore += 10 * pointLvl;
    sc.innerHTML = upscore - missClick;
    if (upscore) {
        goal--;
        pnl.innerHTML = goal;
    };
    if (goal == 0) {
        goal = 10;
        a -= 50;
        pointLvl += 1;
        lvl.innerHTML = pointLvl;
        sec += 10;
        time.innerHTML = sec + " s";
        spinTime -= 0.25 + "s";
    };
    if (pointLvl == 6) {
        clearInterval(t);
        if (upscore > users[4].score) {
            CustomElementRegistry("felicitation, vous entrez dans le top 5.");
            addUser();
            reset();
        }

    }
};

function moove() {
    catchMe.style.top = Math.floor(Math.random() * 550) + "px";
    catchMe.style.left = Math.floor(Math.random() * 1050) + "px";
};

function penalite() {
    missClick += 1 * pointLvl;
    mc.innerHTML = missClick;
    sc.innerHTML = upscore - missClick;
};


function newDate() {
    var myDate = new Date;
    var today = myDate.toLocaleDateString();
    return today;
}


function addUser() {
    var name = prompt("entrer votre nom: ");
    var date = newDate();
    users.pop();
    users.push({
        name: name,
        score: upscore,
        date: date
    });
    users.sort(function(a,b){return b.score-a.score;});
    localStorage.setItem("theUsers", JSON.stringify(users));
    createHTML();
}

function reset(){
    alert("le jeu est remis a zero");
    sec = 60;
    time.innerHTML = sec + " s";
    pointLvl = 1;
    lvl.innerHTML = pointLvl;
    a = 300;
    spinTime = 2;
    missClick = 0;
    mc.innerHTML = missClick;
    upscore = 0;
    sc.innerHTML = upscore;
    goal = 10;
    pnl.innerHTML = goal;
    btn_start.disabled = false;
}