//welcomeScript initialises x01DartsGame object and manipulates based on user input

//import JS game object
import { x01DartsGame } from "../assets/data/gameData.js"


//******* GAME FUNCTIONS ***********

//save x01DartsGame obect into local storage for retrieval on next page
function saveGameData() {
    sessionStorage.removeItem('x01DartsGameData');
    const gameData = JSON.stringify(x01DartsGame);
    sessionStorage.setItem('x01DartsGameData', gameData);
}

function updatePlayerNames() {

    //update Player1
    const p1FirstName = document.getElementById("p1FirstName").value;
    const p1LastName = document.getElementById("p1LastName").value;
    const p1DartsName = document.getElementById("p1DartsName").value;

    x01DartsGame._players[0].firstName = p1FirstName;
    x01DartsGame._players[0].lastName = p1LastName;
    x01DartsGame._players[0].dartsName = p1DartsName;

    if(p1DartsName){
        x01DartsGame._players[0].dartsName = `"${p1DartsName}"`;
    }

    //update Player2
    const p2FirstName = document.getElementById("p2FirstName").value;
    const p2LastName = document.getElementById("p2LastName").value;
    const p2DartsName= document.getElementById("p2DartsName").value;

    x01DartsGame._players[1].firstName = p2FirstName;
    x01DartsGame._players[1].lastName = p2LastName;

    if(p2DartsName){
        x01DartsGame._players[1].dartsName = `"${p2DartsName}"`;
    }

    if(p1FirstName && p2FirstName){
        return true
    }
};

function updateThrowFirstNames() {
    
    if(updatePlayerNames()){
    nameError.style.display = "none"
    throwFirstP1.disabled = false;
    throwFirstP2.disabled = false;
    throwFirstP1.innerText = p1FirstName.value;
    throwFirstP2.innerText = p2FirstName.value;
    updatePlayerNames()
} else {
    nameError.style.display = "contents"
    throwFirstP1.innerText = "Player 1"
    throwFirstP2.innerText = "Player 2"
    throwFirstP1.disabled = true;
    throwFirstP2.disabled = true;
    updatePlayerNames()
}
};

//select game buttons and disable game start until names added
const gameType501 = document.getElementById('501Button');
const gameType301 = document.getElementById('301Button');
const nameError = document.getElementById('nameError')

updateThrowFirstNames()

//index.HTML javascript
document.addEventListener("DOMContentLoaded", function() {

    gameType501.addEventListener("click", function() {
        gameType301.className = "btn btn-secondary"
        x01DartsGame._game[0].startingScore = 501;
        x01DartsGame._game[1].startingScore = 501;
        x01DartsGame._game[0].remainingScore = 501;
        x01DartsGame._game[1].remainingScore = 501;
        gameType501.className = "btn btn-success";
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    gameType301.addEventListener("click", function() {
        gameType501.className = "btn btn-secondary"
        x01DartsGame._game[0].startingScore = 301;
        x01DartsGame._game[1].startingScore = 301;
        x01DartsGame._game[0].remainingScore = 301;
        x01DartsGame._game[1].remainingScore = 301;
        gameType301.className = "btn btn-success"
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    //select legs then load game based on name, match & legs
    const oneLegButton = document.getElementById('1legButton');
    const threeLegButton = document.getElementById('3legButton');
    const fiveLegButton = document.getElementById('5legButton');

    oneLegButton.addEventListener("click", function() {
        oneLegButton.className = "btn btn-success";
        x01DartsGame._game[0].totalLegs = 1;
        x01DartsGame._game[1].totalLegs = 1;
        x01DartsGame._game[0].legsToWin = 1;
        x01DartsGame._game[1].legsToWin = 1;
        threeLegButton.className = "btn btn-secondary";
        fiveLegButton.className = "btn btn-secondary";
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    threeLegButton.addEventListener("click", function() {
        threeLegButton.className = "btn btn-success";
        x01DartsGame._game[0].totalLegs = 3;
        x01DartsGame._game[1].totalLegs = 3;
        x01DartsGame._game[0].legsToWin = 2;
        x01DartsGame._game[1].legsToWin = 2;
        oneLegButton.className = "btn btn-secondary";
        fiveLegButton.className = "btn btn-secondary";
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    fiveLegButton.addEventListener("click", function() {
        fiveLegButton.className = "btn btn-success";
        x01DartsGame._game[0].totalLegs = 5;
        x01DartsGame._game[1].totalLegs = 5;
        x01DartsGame._game[0].legsToWin = 3;
        x01DartsGame._game[1].legsToWin = 3;
        oneLegButton.className = "btn btn-secondary";
        threeLegButton.className = "btn btn-secondary";
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    throwFirstP1.addEventListener("click", function() {
        x01DartsGame._currentPlayer = 0;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = './views/x01game.html';
    });

    throwFirstP2.addEventListener("click", function() {
        x01DartsGame._currentPlayer = 1;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = './views/x01game.html';
    });
});
