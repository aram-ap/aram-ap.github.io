var timer1 = null;
var el = null;
var score = 0; // number of 'hits'
var shots = 0; // total 'shots'

var time = 0;
var x = 0
var xSpeed = 10;
var direction = 1;

function moveIt() {
    // animate the image
    var maxX = window.innerWidth - el.width;
    var minX = 0;
    var yAmp = 80;
    var yOffset = el.height/2;
    var ySpeed = 4;

    if(x > maxX || x < minX) {
        direction = direction * -1;
    }

    x += xSpeed*direction;

    el.style.left = x + 'px';
    el.style.top = getY(yAmp, yOffset, ySpeed, time) + 'px';

    time++;
    timer1 = setTimeout(moveIt, 25);
}

//Function uses cosine wave for movement around screen
//Tried using this, but it goes too slow around the edges so I'm not implementing it.
function getX(min, max, speed, t) {
    var midpt = (max-min)/2;
    return midpt + midpt*Math.cos((2*Math.PI*speed*t)/midpt);
}

//Similar to the getX function, uses a sine wave to get y-axis coordinates in respect to time.
function getY(amplitude, offset, speed, t) {
    return offset + (amplitude * Math.sin((Math.PI * speed * t)/amplitude));
}

function scoreUp() {
    // increment the player's score
    score++;
}
function scoreboard() {
    // display the scorebaord
    document.getElementById("score").innerHTML = "Shots: " + shots + " Score: " + score;
}
window.onload = function() {
    el = document.getElementById("img1");
    // onClick handler calls scoreUp()
    // when the image is clicked
    el.onclick = scoreUp;
    // update total number of shots
    // for every click within play field
    document.getElementById("range").onclick = function() {
        shots++;
        // update scoreboard
        scoreboard();
    }
    // initialize game
    scoreboard();
    el.style.left = '50px';
    moveIt();
}