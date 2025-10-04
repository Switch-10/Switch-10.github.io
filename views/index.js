//welcomeScript initialises x01DartsGame object and manipulates based on user input

//import JS game object
import { roundTheClock, x01DartsGame } from "../assets/data/gameData.js"


//******* GAME FUNCTIONS ***********

//save x01DartsGame obect into local storage for retrieval on next page
function saveGameData() {
    sessionStorage.removeItem('x01GameData');
    sessionStorage.removeItem('clockGameData');
    const x01GameData = JSON.stringify(x01DartsGame);
    const clockGameData = JSON.stringify(roundTheClock);
    sessionStorage.setItem('x01GameData', x01GameData);
    sessionStorage.setItem('clockGameData', clockGameData);
}

function updatePlayerNames() {

    //update Player1
    const p1FirstName = document.getElementById("p1FirstName").value;
    const p1LastName = document.getElementById("p1LastName").value;
    const p1DartsName = document.getElementById("p1DartsName").value;

    x01DartsGame._players[0].firstName = p1FirstName;
    x01DartsGame._players[0].lastName = p1LastName;
    roundTheClock._players[0].firstName = p1FirstName;
    roundTheClock._players[0].lastName = p1LastName;

    //assign darts name is populated but not required (optional)
    if(p1DartsName){
        x01DartsGame._players[0].dartsName = `"${p1DartsName}"`;
    }

    if(p1DartsName){
        roundTheClock._players[0].dartsName = `"${p1DartsName}"`;
    }

    //update Player2
    const p2FirstName = document.getElementById("p2FirstName").value;
    const p2LastName = document.getElementById("p2LastName").value;
    const p2DartsName= document.getElementById("p2DartsName").value;

    x01DartsGame._players[1].firstName = p2FirstName;
    x01DartsGame._players[1].lastName = p2LastName;
    roundTheClock._players[1].firstName = p2FirstName;
    roundTheClock._players[1].lastName = p2LastName;

    //assign darts name is populated but not required (optional)
    if(p2DartsName){
        x01DartsGame._players[1].dartsName = `"${p2DartsName}"`;
    }
    if(p2DartsName){
        roundTheClock._players[1].dartsName = `"${p2DartsName}"`;
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
const x01Options = document.getElementById('x01options')
const matchOptions = document.getElementById('matchOptions')
const clockButton = document.getElementById("clockButton");

updateThrowFirstNames()

//index.HTML javascript
document.addEventListener("DOMContentLoaded", function() {

    //selectedgame updates based on game choice, allowing start button to direct to correct html file & path
    let selectedGame = 'None'

    gameType501.addEventListener("click", function() {
        gameType301.className = "btn btn-secondary"
        clockButton.className = "btn btn-secondary"
        x01DartsGame._game[0].startingScore = 501;
        x01DartsGame._game[1].startingScore = 501;
        x01DartsGame._game[0].remainingScore = 501;
        x01DartsGame._game[1].remainingScore = 501;
        x01Options.style.display = 'unset';
        gameType501.className = "btn btn-success";
        selectedGame = './views/x01game.html'
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    gameType301.addEventListener("click", function() {
        gameType501.className = "btn btn-secondary"
        clockButton.className = "btn btn-secondary"
        x01DartsGame._game[0].startingScore = 301;
        x01DartsGame._game[1].startingScore = 301;
        x01DartsGame._game[0].remainingScore = 301;
        x01DartsGame._game[1].remainingScore = 301;
        gameType301.className = "btn btn-success"
        x01Options.style.display = 'unset';
        selectedGame = './views/x01game.html'
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    clockButton.addEventListener("click", function() {
        gameType501.className = "btn btn-secondary"
        gameType301.className = "btn btn-secondary"
        x01DartsGame._game[0].startingScore = 501;
        x01DartsGame._game[1].startingScore = 501;
        x01DartsGame._game[0].remainingScore = 501;
        x01DartsGame._game[1].remainingScore = 501;
        clockButton.className = "btn btn-success"
        x01Options.style.display = 'none';
        matchOptions.style.display = 'unset';
        selectedGame = './views/clock.html'
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
        matchOptions.style.display = 'unset';
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
        matchOptions.style.display = 'unset';
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
        matchOptions.style.display = 'unset';
        //check names are added and unlock game start
        updateThrowFirstNames()
    });

    throwFirstP1.addEventListener("click", function() {
        x01DartsGame._currentPlayer = 0;
        roundTheClock._currentPlayer = 0;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = selectedGame;
    });

    throwFirstP2.addEventListener("click", function() {
        x01DartsGame._currentPlayer = 1;
        roundTheClock._currentPlayer = 1;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = selectedGame;
    });
});
