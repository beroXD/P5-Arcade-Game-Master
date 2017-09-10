// This is a frogger clone game,
// part of udacity front-end nanodegree projects.
// Abeer AlAbdulaali
// 10.09.2017

// Background Music
var audio = new Audio('music/game.wav');
audio.volume = 0.1;
audio.loop = true;
audio.play();

//inital player life and score
var score = 0;
var lives = 3;

//***********ENEMY CLASS*****************
// using pesudoclasses
// Enemies our player must avoid
var Enemy = function (x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

	//x and y initial enemy position
	this.x = x;
	this.y = y;

	//speed of enemy
	//using Math.random function to generate a random number
	//the speed of the enemy will change
	this.speed = Math.floor(Math.random() * 90 + 250);
};

// Update the enemy position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x <= 505) {
		this.x += this.speed * dt;
	} else {
		this.x = -10;
	}

	//check collision between player and enemy, if true game resets
	if (this.x < player.x + 37 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
		this.checkCollision();
	}
};

Enemy.prototype.checkCollision = function () {
	lives--;
	document.getElementById('life').innerHTML = lives;
	player.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//***********PLAYER CLASS*****************
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/char-princess-girl.png';

	//x and y initial player position
	this.x = 200;
	this.y = 400;
};

//when players reache the water score will be incremented
//and when the players score 10 they win and the game is reloaded
Player.prototype.update = function () {
	if (this.y < 10) {
		score++;
		document.getElementById('score').innerHTML = score;
		this.reset();
	}
	if (score >= 100) {
		alert("YOU WIN!!!");
		location.reload();
	}
	if (lives === 0) {
		alert("GAME OVER :(");
		location.reload();
	}
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player moves according to key presses
Player.prototype.handleInput = function (arrow) {
	switch (arrow) {
		case 'left':
			if (this.x > 0) {
				this.x -= 105;
			}
			break;
		case 'right':
			if (this.x < 400) {
				this.x += 105;
			}
			break;
		case 'up': //if player reaches the water then call update function
			if (this.y < 0) {
				this.update();
			} else {
				this.y -= 90;
			}
			break;
		case 'down':
			if (this.y < 400) {
				this.y += 90;
			}
			break;
	}
};

//reset player to initial x and y position
Player.prototype.reset = function () {
	this.x = 200;
	this.y = 400;
};

//***********HEART CLASS*****************
var Heart = function (x, y) {
	this.sprite = 'images/Heart.png';
	this.x = x;
	this.y = y;
};

//check if player picked up heart or not
Heart.prototype.update = function () {
	if (this.x < player.x + 37 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
		this.picked();
	}
};

//picking up hearts will add extra lives to the player life
Heart.prototype.picked = function () {
	lives++;
	document.getElementById('life').innerHTML = lives;
	this.reset();
};

//resetting the heart in a different place on the canvas
Heart.prototype.reset = function () {
	this.x = (102 * Math.floor(Math.random() * 4) + 0);
	this.y = (50 + (85 * Math.floor(Math.random() * 3)));
};

Heart.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//***********STAR CLASS*****************
var Star = function (x, y) {
	this.sprite = 'images/Star.png';
	this.x = x;
	this.y = y;
	this.delay = undefined;
};

//check if player picked up star
Star.prototype.update = function () {
	if (this.x < player.x + 37 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
		this.picked();
	}
};

//adding 5 points to score
Star.prototype.picked = function () {
	score += 5;
	document.getElementById('score').innerHTML = score;
	this.reset();
};

Star.prototype.reset = function () {
	this.x = (102 * Math.floor(Math.random() * 4) + 0);
	this.y = (50 + (85 * Math.floor(Math.random() * 3)));
};

Star.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//new enemie and push it to the array 
var allEnemies = [];

//pushing enemy into the array (start position, position, speed)
allEnemies.push(new Enemy(0, 220));
allEnemies.push(new Enemy(0, 140));
allEnemies.push(new Enemy(0, 60));
allEnemies.push(new Enemy(0, 60, 250));

var player = new Player();
var heart = new Heart(200, 160);
var star = new Star(403, 155);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
