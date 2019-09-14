/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////
//

var url = new URL(window.location.href);
var level = url.searchParams.get("level");

if (level == undefined) {
  alert("No level set!");
}

var player, shipSpeed=200;
var halo;
var score = 0, scoreText;
var keyboard, left, right, up, down, space;
var fish, fishSpeed=-200, rubbish, rubbishSpeed=-200;
var bin, binSelected;
var ObsTimer = 0, ObsFreq=5000;
var TraTimer = 0, TraFreq = 5000;
var game = new Game(window.innerWidth, window.innerHeight, "Tutorial 2");
var currentI = 0;
var trash;
var binLinkFlip;
var bins;
var checkCollisions = true;
/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////
var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}

function binCollide(trash) {
  score = score + 10;
  scoreText.changeText("Score: " + score);
	trash.kill();
}

function fishCollide(fish) {
	fish.kill();
	score = score - 10;
	scoreText.changeText("Score: " + score);
}

function trashCollide(specTrash,player) {

	h = trash[currentI]
	console.log(h)
	console.log("i is"+ currentI);
	console.log(bins[currentI])
	if(bins[currentI] == binSelected) {
		scoreText.changeText("Score: " + score);
		x = specTrash.getX()
		y = specTrash.getY()
		yB = 25
		xB = 50+(currentI%4)*125
    console.log(x)
    console.log(y)
    console.log(xB)
    console.log(yB)
		specTrash.setVelocityX((xB-x)*2)
		specTrash.setVelocityY((yB-y)*2)
	}
	else{
		score = score - 10;
		scoreText.changeText("Score: " + score);
		specTrash.kill();
	}

}

function createObject(speed, obstacle) {
	obstacle.create(game.gameWidth(), Math.random()*(game.gameHeight()-250)+150, 100, 100);
	obstacle.setVelocityX(speed);
}



function preload() {

  game.loadBackgroundImage("Ocean","img/background/oceanBackground.png");
  game.setBackgroundImage("Ocean");
	player = new Sprite("img/gameImages/submarine.png");
	fish = new Sprite("img/gameImages/fish2.png");
  halo = new Sprite("img/gameImages/binHalo.png");
	bLBin = new Sprite("img/gameImages/bLBin.png");
	bRBin = new Sprite("img/gameImages/bRBin.png");
	bUBin = new Sprite("img/gameImages/bUBin.png");
	bDBin = new Sprite("img/gameImages/bDBin.png");
	rRBin = new Sprite("img/gameImages/rRBin.png");
  gUBin = new Sprite("img/gameImages/gUBin.png");
	yDBin = new Sprite("img/gameImages/yDBin.png");

	bLTrash = new Sprite("img/gameImages/bLTrash.png");
	bRTrash = new Sprite("img/gameImages/bRTrash.png");
	bUTrash = new Sprite("img/gameImages/bUTrash.png");
	bDTrash = new Sprite("img/gameImages/bDTrash.png");
	gLTrash = new Sprite("img/gameImages/gLTrash.png");
	gRTrash = new Sprite("img/gameImages/gRTrash.png");
	gUTrash = new Sprite("img/gameImages/gUTrash.png");
	gDTrash = new Sprite("img/gameImages/gDTrash.png");
	yLTrash = new Sprite("img/gameImages/yLTrash.png");
	yRTrash = new Sprite("img/gameImages/yRTrash.png");
	yUTrash = new Sprite("img/gameImages/yUTrash.png");
	yDTrash = new Sprite("img/gameImages/yDTrash.png");
	rLTrash = new Sprite("img/gameImages/rLTrash.png");
	rRTrash = new Sprite("img/gameImages/rRTrash.png");
	rUTrash = new Sprite("img/gameImages/rUTrash.png");
	rDTrash = new Sprite("img/gameImages/rDTrash.png");

	keyboard = new Keyboard();
	space = keyboard.createSpaceKey();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();

  if(level>0 && level < 6) {
      trash = [bLTrash, bRTrash, bUTrash, bDTrash];
      bins = [bLBin, bRBin, bUBin, bDBin];
      fishSpeed = -400 - level * 100
      rubbishSpeed = -200 - level * 100
      shipSpeed = 200 + level * 100
      ObsFreq = 4000 - level * 300
      TraFreq = 5000 - level * 200

  }else if(level>5 && level < 11) {
    trash = [bLTrash, rRTrash, gUTrash, yDTrash, rLTrash, gRTrash, yUTrash, bDTrash, gLTrash, yRTrash, bUTrash, rDTrash, yLTrash, bRTrash, rUTrash, gDTrash];
    bins = [bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin];
    fishSpeed = -400 - (level-5) * 100
    rubbishSpeed = -200 - (level-5) * 100
    shipSpeed = 200 + (level-5) * 100
    ObsFreq = 3000 - (level-5) * 300
    TraFreq = 4000 - (level-5) * 200

  }else if(level>10 && level < 16) {
    trash = [bLTrash, rRTrash, gUTrash, yDTrash, bRTrash, rUTrash, gDTrash, yLTrash, bUTrash, rDTrash, gLTrash, yRTrash, bDTrash, rLTrash, gRTrash, yUTrash];
    bins = [bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin, bLBin, rRBin, gUBin, yDBin];
    fishSpeed = -400 - (level-10) * 100
    rubbishSpeed = -200 - (level-10) * 100
    shipSpeed = 200 + (level-10) * 100
    ObsFreq = 2000 - (level-10) * 200
    TraFreq = 3000 - (level-10) * 200
  }
}

function create() {

  game.setBackgroundImage("Ocean");
  scoreText = new Text("Score: 0", game.gameWidth() - 200, 10, "34px", "Arial", "#FFF");
	player.create(50, game.gameHeight()*0.4, 111, 58);
	player.collideWorldBounds(true);
  halo.create(50, 25, 100, 50);
	for(var i = 0; i < 4; i++) {
    if (bins[i] == gUBin){
      bins[i].create(50+i*125, 60, 100, 70);
    }
    else{
      	bins[i].create(50+i*125, 25, 100, 100);
    }

    bins[i].setImmovable(true);
	}
	binSelected = bins[0];
}


function update() {

  game.scrollBackgroundX(-1);
	if(space.isDown()) {
		player.setVelocityY(-1*shipSpeed);
	} else {
			player.setVelocityY(shipSpeed);
	}

	if(left.justPressed()) {
		binSelected = bins[0];
    halo.setX(bins[0].children[0].getX());
	}else if (right.justPressed()) {
		binSelected = bins[1];
    halo.setX(bins[1].children[0].getX());
	}else if (up.justPressed()) {
		binSelected = bins[2];
    halo.setX(bins[2].children[0].getX());
	}else if (down.justPressed()) {
		binSelected = bins[3];
    halo.setX(bins[3].children[0].getX());
	}

game.checkCollision(bins[0], player);
  if (checkCollisions){
    checkCollisions = false;
    for(var i = 0; i < trash.length; i++) {
  		currentI = i;
  		game.checkOverlap(trash[i], player, trashCollide);
  	}
    for(var i = 0; i < bins.length; i++) {
  			game.checkOverlap(trash[i],bins[i], binCollide);
  	}
    game.checkOverlap(fish, player, fishCollide);


  }
  else{
    checkCollisions = true;
  }




	if(ObsTimer < game.getGameTime()) {
		createObject(fishSpeed, fish);
		ObsTimer = game.getGameTime() + Math.random()*ObsFreq;
	}

	if(TraTimer < game.getGameTime()) {
		createObject(rubbishSpeed, trash[Math.floor(Math.random()*trash.length)]);
		TraTimer = game.getGameTime() + Math.random()*TraFreq;
	}

	if (score >= 100){
		location.href = "CompleteLevel.html?level=" + level;

		localStorage.setItem("level" + level + "Complete", 1);

	}else if(score <=-100) {
        location.href = "Death.html?level=" + level;
  }
}
