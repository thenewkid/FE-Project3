var xDistance = 101;
var yDistance = 83;
var height;
var width;
var score = 0;
var lives = 5;

function draw(image_file, x, y) {
    ctx.drawImage(Resources.get(image_file), x, y);
}
function getPlayerStartX() {
    var possibleXCoordsForStart = [0, 101, 202, 303, 404];
    return getRandom(possibleXCoordsForStart);
}
function getPlayerStartY() {
    var possibleYCoordsForStart = [290.5, 373.5];
    return getRandom(possibleYCoordsForStart);
}
function getEnemyStartY() {
    var possibleYCoordsForEnemy = [207.5, 124.5, 41.5];
    return getRandom(possibleYCoordsForEnemy);

}
function getRandom(args) {
    return args[Math.floor(Math.random()*args.length)];
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed;
    this.x;
    this.y;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    this.x += this.speed + (dt * 0.000000000001);

    if (this.x > width) {
        this.x = 0;
        this.y = getEnemyStartY();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log("rendering at " + this.x + "," + this.y);
    draw(this.sprite, this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//initialize player x,y coords to be random, I will use
//these functions later when I need to reset the game

var Player = function() {
    this.sprite ="images/char-boy.png";
    this.x = getPlayerStartX();
    this.y = getPlayerStartY();
}
//update method takes in the string x or y for coordType
//and adds distance to it. Sometimes distance will be negative
Player.prototype.update = function(coordType, distance) {
    this[coordType] += distance;
}

Player.prototype.handleInput = function(direction) {
    if (direction == "left" && this.x != 0) {
        this.update('x', -(xDistance));
    }
    else if (direction == "right" && this.x != 404) {
        this.update('x', xDistance);
    }
    else if (direction == "up" && this.y != 41.5) {
        this.update('y', -(yDistance));
    }
    else if (direction == "down" && this.y != 373.5) {
        this.update('y', yDistance)
    }
}

Player.prototype.render = function() {
    draw(this.sprite, this.x, this.y);
}

Player.prototype.setSprite = function(imageFile) {
    this.sprite = imageFile;
}

function getUniqueSpeed(speeds) {
    var speed = getRandom([2, 2.5, 3, 3.5, 4, 4.5, 5]);
    while (speeds.indexOf(speed) > -1)
        speed = getRandom([2, 2.5, 3, 3.5, 4, 4.5, 5]);
    return speed;
}

// creates 10 enemies and initializes their x and y coords
//each enemy will have their own different speed, being between 1 and 10
function initializeEnemies() {
    var enemies = [];
    var speedsAlready = []
    for (var i = 0; i < 9; i++) {
        var enemy = new Enemy();
        enemy.x = 0;
        enemy.y = getEnemyStartY();
        enemy.speed = getUniqueSpeed(speedsAlready);
        speedsAlready.push(enemy.speed);
        enemies.push(enemy);
    }

    return enemies;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    allowedKeys[e.keyCode] != undefined ? player.handleInput(allowedKeys[e.keyCode]) : console.log("Unkown key");
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = initializeEnemies();
player = new Player

//every 15 seconds a new set of enemies is made.
/*window.setInterval(function() {
    allEnemies = initializeEnemies();
},15000)*/