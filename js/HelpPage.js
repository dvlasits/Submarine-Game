/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////

var game;

function load() {
    game = new Game(window.innerWidth, window.innerHeight, "Levels screen");
}

/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////
function preload() {
    title = new Sprite("img/helpPage/helpPage.png", 1106, 803, "Title");
    backButton = new Button("img/Buttons/BackButton.png", 81, 50, 20, 50);
	game.setBackgroundColour("#fff");
}

function create() {
    title.create(window.innerWidth/2 - 553, 50, 1128, 804);
    backButton.createButton();
    backButton.addUpAction(function() {
        location.href = "StartScreen.html";
    }, null);
}

function clearScreen() {
    document.getElementsByTagName("canvas").remove();
}

function update() {

}

load();
