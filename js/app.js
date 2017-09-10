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
	if (this.x < Player.x + 37 && this.x + 60 > Player.x && this.y < Player.y + 60 && this.y + 40 > Player.y) {
		lives--;
		document.getElementById('life').innerHTML = lives;
		Player.reset();
	}
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
	if (score === 10) {
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
				Player.update();
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
	Player.x = 200;
	Player.y = 400;
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

var Player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	Player.handleInput(allowedKeys[e.keyCode]);
});
