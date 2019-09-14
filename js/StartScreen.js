/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////

var game;

function loadTitleScreen() {
    game = new Game(window.innerWidth, window.innerHeight, "Start screen");
}

/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////
function preload() {
    title = new Button("img/titleScreen/RubbishGameTitleText.png", 429, 170, (window.innerWidth/2) - 214, 150);
	startButton = new Button("img/buttons/StartButton.png", 429, 76, (window.innerWidth/2) - 214, 400);
	helpButton = new Button("img/buttons/HelpButton.png", 429, 76, (window.innerWidth/2) - 214, 500);

	game.setBackgroundColour("#ecf0f1");
}

function create() {
    startButton.createButton();
    startButton.addOverAction(null, [1]);
    startButton.addOutAction(null, [0]);
    startButton.addUpAction(function() {
        location.href = "Levels.html";
    }, null);

    helpButton.createButton();
    helpButton.addOverAction(null, [1]);
    helpButton.addOutAction(null, [0]);
    helpButton.addUpAction(function() {
        location.href = "HelpPage.html"
    }, null);

    title.createButton();
    title.addOverAction(null, [1]);
    title.addOutAction(null, [0]);

}

function clearScreen() {
    document.getElementsByTagName("canvas").remove();
}

function update() {

}

loadTitleScreen();
