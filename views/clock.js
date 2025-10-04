//gameScript loads roundTheClock object from session storage and allows players to play match

//import JS game object
import {roundTheClock} from "/assets/data/gameData.js"

//load the setup data from session storage
function loadGameData() {
    const storedGameData = sessionStorage.getItem('clockGameData');
    let parsedGameData = JSON.parse(storedGameData)

    //load game data into darts object
    roundTheClock._game[0] = parsedGameData._game[0];
    roundTheClock._game[1] = parsedGameData._game[1];

    //load player data into darts object
    roundTheClock._players[0] = parsedGameData._players[0];
    roundTheClock._players[1] = parsedGameData._players[1];

    //load current player data
    roundTheClock._currentPlayer = parsedGameData._currentPlayer;

};

loadGameData() //load darts object from session storage

//MAP JS data to front-end elements

//show player names
const playerOneName = document.getElementById("player1");
const playerTwoName = document.getElementById("player2");
playerOneName.innerText = returnFullName(0);
playerTwoName.innerText = returnFullName(1);

//map to front-end scoring buttons
const hitP1Button = document.getElementById("dartHitP1");
const missP1Button = document.getElementById("dartMissP1");
const submitP1Button = document.getElementById("submitP1");
const hitP2Button = document.getElementById("dartHitP2");
const missP2Button = document.getElementById("dartMissP2");
const submitP2Button = document.getElementById("submitP2");
const newMatch = document.getElementById("newMatch")
const undoP1 = document.getElementById("undoP1");

//map front-end darts elements
const dart1P1 = document.getElementById('dart1P1')
const dart2P1 = document.getElementById('dart2P1')
const dart3P1 = document.getElementById('dart3P1')
const dart1P2 = document.getElementById('dart1P2')
const dart2P2 = document.getElementById('dart2P2')
const dart3P2 = document.getElementById('dart3P2')

//******* GAME FUNCTIONS ***********
function returnFullName(player) {
    //returns full name of player
    return `${roundTheClock._players[player].firstName} ${roundTheClock._players[player].dartsName} ${roundTheClock._players[player].lastName}`
    };

function determineNextPlayer(player) {
        if(player === 0) {
            roundTheClock._currentPlayer = 1 //swaps to next player
            hitP1Button.disabled = true;
            missP1Button.disabled = true;
            submitP1Button.disabled = true;
            hitP2Button.disabled = false;
            missP2Button.disabled = false;
            submitP2Button.disabled = false;
            hitP2Button.focus(); //move to next input
        } else {
            roundTheClock._currentPlayer = 0
            hitP1Button.disabled = false;
            missP1Button.disabled = false;
            submitP1Button.disabled = false;
            hitP2Button.disabled = true;
            missP2Button.disabled = true;
            submitP2Button.disabled = true;
            hitP1Button.focus(); //move to next input
        }
   };

function updateScoreDisplayP1() {
    const clockNumberP1 = document.getElementById("clockNumberP1");
    const dartsThrownP1 = document.getElementById("dartsThrownP1");
    const dartsHitP1 = document.getElementById("dartsHitP1");
    const dartsHitPercentageP1 = document.getElementById("hit%P1");

    if(roundTheClock._game[0].currentScore === 21){
        clockNumberP1.innerText = "25"
        console.log(`Updated number to ${roundTheClock._game[0].currentScore}`)
    } else if(roundTheClock._game[0].currentScore === 22){
        clockNumberP1.innerText = "Bull"
        console.log(`Updated number to ${roundTheClock._game[0].currentScore}`)
    } else if (roundTheClock._game[0].currentScore > 22){
        clockNumberP1.innerText = "-"
        hasWon(0)
        newMatch.className = "btn bg-success bg-gradient";
    } else {
        clockNumberP1.innerText = roundTheClock._game[0].currentScore;
        console.log(`Updated number to ${roundTheClock._game[0].currentScore}`)
    }

    dartsThrownP1.innerText = roundTheClock._gameStats[0].dartsThrown;
    dartsHitP1.innerText = roundTheClock._gameStats[0].dartsHit;
    dartsHitPercentageP1.innerText = roundTheClock._gameStats[0].hitPercentage;   
};

function updateScoreDisplayP2() {
    const clockNumberP2 = document.getElementById("clockNumberP2");
    const dartsThrownP2 = document.getElementById("dartsThrownP2");
    const dartsHitP2 = document.getElementById("dartsHitP2");
    const dartsHitPercentageP2 = document.getElementById("hit%P2");

    if(roundTheClock._game[1].currentScore === 21){
        clockNumberP2.innerText = "25"
        console.log(`Updated number to ${roundTheClock._game[1].currentScore}`)
    } else if(roundTheClock._game[1].currentScore === 22){
        clockNumberP2.innerText = "Bull"
        console.log(`Updated number to ${roundTheClock._game[1].currentScore}`)
    } else if (roundTheClock._game[1].currentScore > 22){
        clockNumberP2.innerText = "-"
        hasWon(1)
        newMatch.className = "btn bg-success bg-gradient";
    } else {
        clockNumberP2.innerText = roundTheClock._game[1].currentScore;
        console.log(`Updated number to ${roundTheClock._game[1].currentScore}`)
    }

    dartsThrownP2.innerText = roundTheClock._gameStats[1].dartsThrown;
    dartsHitP2.innerText = roundTheClock._gameStats[1].dartsHit;
    dartsHitPercentageP2.innerText = roundTheClock._gameStats[1].hitPercentage;   
};

function hasWon(player) {
    if(roundTheClock._game[player].currentScore === 23) {
        alert(`${returnFullName(player)} has won the match!`)
        //disable all buttons here
        const hitP1Button = document.getElementById("dartHitP1");
        const missP1Button = document.getElementById("dartMissP1");
        const submitP1Button = document.getElementById("submitP1");
        const hitP2Button = document.getElementById("dartHitP2");
        const missP2Button = document.getElementById("dartMissP2");
        const submitP2Button = document.getElementById("submitP2");

        hitP1Button.disabled = true;
        missP1Button.disabled = true;  
        submitP1Button.disabled = true; 
        hitP2Button.disabled = true;
        missP2Button.disabled = true;  
        submitP2Button.disabled = true; 
    }
}

function updateStats(player, type){
    if(type === "hit") {
        roundTheClock._game[player].currentScore++; //increment score to next number
        roundTheClock._gameStats[player].dartsHit++;      //increment darts hit stat 
        roundTheClock._hitHistory[player].lastDart = roundTheClock._game[player].currentDart; //record last dart before it increments for undo function
        console.log(`Last dart was: ${roundTheClock._hitHistory[player].lastDart}`)
        roundTheClock._game[player].currentDart++; //increment current dart
        console.log(`Next dart is: ${roundTheClock._game[player].currentDart}`)
        roundTheClock._gameStats[player].dartsThrown++; //increment darts thrown
        roundTheClock._gameStats[player].hitPercentage = ((roundTheClock._gameStats[player].dartsHit / roundTheClock._gameStats[player].dartsThrown) * 100).toFixed(2); //update hit percentage
        roundTheClock._hitHistory[player].type = "hit"; //record hit type
    } else if (type === "miss") {
        roundTheClock._hitHistory[player].lastDart = roundTheClock._game[player].currentDart; //record last dart before it increments for undo function
        roundTheClock._game[player].currentDart++; //increment current dart
        roundTheClock._gameStats[player].dartsThrown++; //increment darts thrown
        roundTheClock._gameStats[player].hitPercentage = ((roundTheClock._gameStats[player].dartsHit / roundTheClock._gameStats[player].dartsThrown) * 100).toFixed(2); //update hit percentage
        roundTheClock._hitHistory[player].type = "miss"; //record hit type
}};     

function undoThrow(player) {

    if(roundTheClock._hitHistory[player] === "hit") {
        if(roundTheClock._gameStats[player].dartsThrown === 0) {
            alert("No throws to undo")
            return
        } else {
            roundTheClock._gameStats[player].dartsThrown--; //reduce darts thrown
        };
        
        if(roundTheClock._gameStats[player].hitPercentage === 0) {
            alert("No throws to undo")
            return
        } else {
             roundTheClock._gameStats[player].hitPercentage = ((roundTheClock._gameStats[player].dartsHit / roundTheClock._gameStats[player].dartsThrown) * 100).toFixed(2); //update hit percentage
        };

        roundTheClock._game[player].currentScore--; //reduce score to next number
        roundTheClock._gameStats[player].dartsHit--;      //reduce darts hit stat 
        roundTheClock._game[player].currentDart--; //reduce current dart
    
    } else if(roundTheClock._hitHistory[player] === "miss") {
            if(roundTheClock._gameStats[player].dartsThrown === 0) {
            alert("No throws to undo")
            return
        } else {
            roundTheClock._gameStats[player].dartsThrown--; //reduce darts thrown
        };

        roundTheClock._game[player].currentDart--; //reduce current dart
        roundTheClock._gameStats[player].hitPercentage = ((roundTheClock._gameStats[player].dartsHit / roundTheClock._gameStats[player].dartsThrown) * 100).toFixed(2); //update hit percentage
}};

//******* CLOCK.HTML JS ***********
document.addEventListener("DOMContentLoaded", function() {

    //trigger first scores
    updateScoreDisplayP1()
    updateScoreDisplayP2()

    hitP1Button.addEventListener("click", function() {
        if(roundTheClock._game[0].currentDart === 1) {
            dart1P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(0,"hit") //records hit type for undo function
            updateScoreDisplayP1();
            undoP1.disabled = false; //enable undo button
         } else if (roundTheClock._game[0].currentDart === 2) {
            dart2P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(0,"hit") //records hit type for undo function
            updateScoreDisplayP1();
            undoP1.disabled = false; //enable undo button
        } else if (roundTheClock._game[0].currentDart === 3) {
            dart3P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(0,"hit") //records hit type for undo function
            roundTheClock._game[0].currentDart = 1; //may have a clash here with updateStats function
            hitP1Button.disabled = true;
            missP1Button.disabled = true;  
            submitP1Button.className = "btn bg-primary bg-gradient";
            submitP1Button.disabled = false;
            undoP1.disabled = false; //enable undo button
            updateScoreDisplayP1();
        };
    });

    hitP2Button.addEventListener("click", function() {
        if(roundTheClock._game[1].currentDart === 1) {
            dart1P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(1,"hit") //records hit type for undo function
            updateScoreDisplayP2();
            //undoP2.disabled = false; //enable undo button
         } else if (roundTheClock._game[1].currentDart === 2) {
            dart2P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(1,"hit") //records hit type for undo function
            updateScoreDisplayP2();
            //undoP2.disabled = false; //enable undo button
        } else if (roundTheClock._game[1].currentDart === 3) {
            dart3P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-success";
            updateStats(1,"hit") //records hit type for undo function
            roundTheClock._game[1].currentDart = 1; //may have a clash here with updateStats function
            hitP2Button.disabled = true;
            missP2Button.disabled = true;  
            submitP2Button.className = "btn bg-primary bg-gradient";
            submitP2Button.disabled = false;
            //undoP2.disabled = false; //enable undo button
            updateScoreDisplayP2();
        };
    });

    missP1Button.addEventListener("click", function() {
        if(roundTheClock._game[0].currentDart === 1) {
            dart1P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(0,"miss");
            updateScoreDisplayP1();
         } else if (roundTheClock._game[0].currentDart === 2) {
            dart2P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(0,"miss");
            updateScoreDisplayP1();
        } else if (roundTheClock._game[0].currentDart === 3) {
            dart3P1.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(0,"miss");
            updateScoreDisplayP1();
            roundTheClock._game[0].currentDart = 1
            hitP1Button.disabled = true;
            missP1Button.disabled = true;   
            submitP1Button.className = "btn bg-primary bg-gradient";
            submitP1Button.disabled = false;
        };
    });

    missP2Button.addEventListener("click", function() {
        if(roundTheClock._game[1].currentDart === 1) {
            dart1P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(1,"miss");
            updateScoreDisplayP2();
         } else if (roundTheClock._game[1].currentDart === 2) {
            dart2P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(1,"miss");
            updateScoreDisplayP2();
        } else if (roundTheClock._game[1].currentDart === 3) {
            dart3P2.className = "col text-center text-light pt-4 pb-4 border border-white bg-danger";
            updateStats(1,"miss");
            updateScoreDisplayP2();
            roundTheClock._game[1].currentDart = 1
            hitP2Button.disabled = true;
            missP2Button.disabled = true;   
            submitP2Button.className = "btn bg-primary bg-gradient";
            submitP2Button.disabled = false;
        };
    });

    submitP1Button.addEventListener("click", function() {
        dart1P1.className = "col text-center pt-4 pb-4 border border-white";
        dart2P1.className = "col text-center pt-4 pb-4 border border-white";
        dart3P1.className = "col text-center pt-4 pb-4 border border-white";
        hitP1Button.disabled = false;
        missP1Button.disabled = false;  
        submitP1Button.disabled = true;
        determineNextPlayer(0); //switch to next player
        console.log(`Current player is now ${roundTheClock._currentPlayer}`)    
    });

    submitP2Button.addEventListener("click", function() {
        dart1P2.className = "col text-center pt-4 pb-4 border border-white";
        dart2P2.className = "col text-center pt-4 pb-4 border border-white";
        dart3P2.className = "col text-center pt-4 pb-4 border border-white";
        hitP2Button.disabled = false;
        missP2Button.disabled = false;  
        submitP2Button.disabled = true;
        determineNextPlayer(1); //switch to next player
        console.log(`Current player is now ${roundTheClock._currentPlayer}`)
    });

    //undoP1.addEventListener("click", function() {
        //const lastDart = roundTheClock._hitHistory[0].lastDart; 

        //if(lastDart === 1) {
        //    dart1P1.className = "col text-center pt-4 pb-4 border border-white";
        //} else if (lastDart === 2) {
        //    dart2P1.className = "col text-center pt-4 pb-4 border border-white";
        //} else if (lastDart === 3) {
        //    dart3P1.className = "col text-center pt-4 pb-4 border border-white";
       // }
        //undoThrow(0)
        //updateScoreDisplayP1();
        //undoP1.disabled = true;
    //});

    newMatch.addEventListener("click", function() {
        window.location.href = '../index.html';
        newMatch.className = "btn bg-secondary bg-gradient";
    });
});
