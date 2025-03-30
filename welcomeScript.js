//welcomeScript initialises dartsGame object and manipulates based on user input

const dartsGame = {
    _players:[
        {firstName:"", lastName:"", dartsName:""},
        {firstName:"", lastName:"", dartsName:""}
    ],
    _playerGo: 0,
    _game:[
        {matchesWon: 0, canFinish: false, startingScore: 0, remainingScore: 0,  legsWon: 0, totalLegs: 0, legsToWin: 0},
        {matchesWon: 0, canFinish: false, startingScore: 0, remainingScore: 0, legsWon: 0, totalLegs: 0, legsToWin: 0}
    ],
    _gameStats:[
        {cumScore: 0, scoreAvg: 0, dartsThrown: 0, visits: 0},
        {cumScore: 0, scoreAvg: 0, dartsThrown: 0, visits: 0}
    ],
    _scoreHistory:[
        {scores:[]},
        {scores:[]}
    ],
    returnFullName(player) {
        //returns full name of player
        return `${this._players[player].firstName} "${this._players[player].dartsName}" ${this._players[player].lastName}`
    },
};

//******* GAME FUNCTIONS ***********

//save dartsGame obect into local storage for retrieval on next page
function saveGameData() {
    sessionStorage.removeItem('dartsGameData');
    const gameData = JSON.stringify(dartsGame);
    sessionStorage.setItem('dartsGameData', gameData);
}

function updatePlayerNames() {

    //update Player1
    const p1FirstName = document.getElementById("p1FirstName");
    const p1LastName = document.getElementById("p1LastName");
    const p1DartsName= document.getElementById("p1DartsName");

    dartsGame._players[0].firstName = p1FirstName.value;
    dartsGame._players[0].lastName = p1LastName.value;
    dartsGame._players[0].dartsName = p1DartsName.value;

    //update Player2
    const p2FirstName = document.getElementById("p2FirstName");
    const p2LastName = document.getElementById("p2LastName");
    const p2DartsName= document.getElementById("p2DartsName");

    dartsGame._players[1].firstName = p2FirstName.value;
    dartsGame._players[1].lastName = p2LastName.value;
    dartsGame._players[1].dartsName = p2DartsName.value;
}

//welcome.HTML javascript
document.addEventListener("DOMContentLoaded", function() {

    //select game buttons
    const gameType501 = document.getElementById('501Button');
    const gameType301 = document.getElementById('301Button');
    const throwFirstP1 = document.getElementById('throwFirstP1');
    const throwFirstP2 = document.getElementById('throwFirstP2');

    gameType501.addEventListener("click", function() {
        gameType301.className = "btn btn-secondary"
        dartsGame._game[0].startingScore = 501;
        dartsGame._game[1].startingScore = 501;
        dartsGame._game[0].remainingScore = 501;
        dartsGame._game[1].remainingScore = 501;
        gameType501.className = "btn btn-success";
        //set names
        updatePlayerNames()
        throwFirstP1.innerText = p1FirstName.value;
        throwFirstP2.innerText = p2FirstName.value;
    });

    gameType301.addEventListener("click", function() {
        gameType501.className = "btn btn-secondary"
        dartsGame._game[0].startingScore = 301;
        dartsGame._game[1].startingScore = 301;
        dartsGame._game[0].remainingScore = 301;
        dartsGame._game[1].remainingScore = 301;
        gameType301.className = "btn btn-success"
        //set names
        updatePlayerNames()
        throwFirstP1.innerText = p1FirstName.value;
        throwFirstP2.innerText = p2FirstName.value;
    });

    //select legs then load game based on name, match & legs
    const oneLegButton = document.getElementById('1legButton');
    const threeLegButton = document.getElementById('3legButton');
    const fiveLegButton = document.getElementById('5legButton');

    oneLegButton.addEventListener("click", function() {
        oneLegButton.className = "btn btn-success";
        dartsGame._game[0].totalLegs = 1;
        dartsGame._game[1].totalLegs = 1;
        dartsGame._game[0].legsToWin = 1;
        dartsGame._game[1].legsToWin = 1;
        threeLegButton.className = "btn btn-secondary";
        fiveLegButton.className = "btn btn-secondary";
    });

    threeLegButton.addEventListener("click", function() {
        threeLegButton.className = "btn btn-success";
        dartsGame._game[0].totalLegs = 3;
        dartsGame._game[1].totalLegs = 3;
        dartsGame._game[0].legsToWin = 2;
        dartsGame._game[1].legsToWin = 2;
        oneLegButton.className = "btn btn-secondary";
        fiveLegButton.className = "btn btn-secondary";
    });

    fiveLegButton.addEventListener("click", function() {
        fiveLegButton.className = "btn btn-success";
        dartsGame._game[0].totalLegs = 5;
        dartsGame._game[1].totalLegs = 5;
        dartsGame._game[0].legsToWin = 3;
        dartsGame._game[1].legsToWin = 3;
        oneLegButton.className = "btn btn-secondary";
        threeLegButton.className = "btn btn-secondary";
    });

    throwFirstP1.addEventListener("click", function() {
        dartsGame._playerGo = 0;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = '501game.html';
    });

    throwFirstP2.addEventListener("click", function() {
        dartsGame._playerGo = 1;
        //save darts object
        saveGameData()    
        //start game
        window.location.href = '501game.html';
    });
});
