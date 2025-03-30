//gameScript loads dartsGame object from session storage and allows players to play match

/* 
TO DO IDEAS:
- add in undo score functions
- update legs to 'BEST OF' rather than as a set limit
- create localStorage dartsGame object output on game win for tracking matches

BUGS
- undoing first score results in avg showing as NaN. 
*/


//target undo buttons at start as used in dartsGame object
const deleteButtonP1 = document.getElementById("deleteScoreP1Button");
const deleteButtonP2 = document.getElementById("deleteScoreP2Button");

let dartsGame = {
    _players:[
        {firstName:"", lastName:"", dartsName:""},
        {firstName:"", lastName:"", dartsName:""}
    ],
    _playerGo: 0,
    _game:[
        {matchesWon: 0, canFinish: false, startingScore: 0, remainingScore: 0, legsWon: 0, totalLegs: 0, legsToWin: 0},
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
    determineNextPlayer(player) {
        if(player === 0) {
            this._playerGo = 1 //swaps to net player
            submitButtonP1.className = "btn bg-secondary bg-gradient" //changes class
            submitButtonP2.className = "btn bg-success bg-gradient" //changes class
            submitButtonP1.disabled = true; //disables last player submit button
            submitButtonP2.disabled = false; //enables next player submit button
            deleteButtonP1.disabled = false; //enables last player undo button
            deleteButtonP2.disabled = true; //disables next player undo button
        } else {
            this._playerGo = 0
            submitButtonP2.className = "btn bg-secondary bg-gradient" //changes class
            submitButtonP1.className = "btn bg-success bg-gradient" //changes class
            submitButtonP1.disabled = false;
            submitButtonP2.disabled = true;
            deleteButtonP2.disabled = false;
            deleteButtonP1.disabled = true;
        }
    },
    setScore(score, player) {
        //capture score and update remaining score for player. Capture score in score history
        
        //if statement checks if leg or match is won and if not updates stats. This is to prevent last throw of leg/match not updating stats. 
        if((this._game[player].remainingScore = this._game[player].remainingScore - score) === 0) {
            this._scoreHistory[player].scores.push(score) //update score history array
            this._gameStats[player].cumScore = score += this._gameStats[player].cumScore //update cumulative score
            this._gameStats[player].visits += 1 //increments visits
            this._gameStats[player].dartsThrown = this._gameStats[player].dartsThrown +=3 //calculates darts thrown. assumes to be 3 every throw.
            this._gameStats[player].scoreAvg = Math.round(this._gameStats[player].cumScore / this._gameStats[player].visits) //calculates average score
            this.hasWonLeg(player);
            this.hasWonGame(player);
        } else {
            this._scoreHistory[player].scores.push(score) //update score history array
            this._gameStats[player].cumScore = score += this._gameStats[player].cumScore //update cumulative score
            this._gameStats[player].visits += 1 //increments visits
            this._gameStats[player].dartsThrown = this._gameStats[player].dartsThrown +=3 //calculates darts thrown. assumes to be 3 every throw.
            this._gameStats[player].scoreAvg = Math.round(this._gameStats[player].cumScore / this._gameStats[player].visits) //calculates average score
            this.determineNextPlayer(player) //set next player
            console.log(`Player ${this._playerGo + 1} is up next.`)
        }    
    },
    deleteScore(player) {
        //delete last score from score history
        this._game[player].remainingScore = this._game[player].remainingScore + this._scoreHistory[player].scores[this._scoreHistory[0].scores.length - 1] //add last score back on
        this._gameStats[player].cumScore = this._gameStats[player].cumScore - this._scoreHistory[player].scores[this._scoreHistory[0].scores.length - 1] //remove last score from cum score for avg recalculation
        this._scoreHistory[player].scores.pop() //remove last score from history

        if(this._gameStats[player].dartsThrown !== 0) {
            this._gameStats[player].dartsThrown = this._gameStats[player].dartsThrown - 3 //remove darts thrown and avoid negative numbers
        } 

        //BUG delete score creates cumScore just for P2 
        if(this._gameStats[player].visits > 1) {
            this._gameStats[player].visits = this._gameStats[player].visits - 1 //remove last visit
        } else {
            dartsGame._gameStats[player].scoreAvg = 0 //recalculates average score
            this._gameStats[player].visits = this._gameStats[player].visits - 1 //remove last visit
        }
    },
    isOnAFinish(player){
        //checks if player is on a finish
        const dartsFinishes = {
            170: "T20 T20 Bull",
            167: "T20 T19 Bull",
            164: "T20 T20 T18",
            161: "T20 T17 Bull",
            160: "T20 T20 D20",
            158: "T20 T20 D19",
            157: "T20 T19 D20",
            156: "T20 T20 D18",
            155: "T20 T19 D19",
            154: "T20 T18 D20",
            153: "T20 T19 D18",
            152: "T20 T20 D16",
            151: "T20 T17 D20",
            150: "T20 T18 D18",
            149: "T20 T19 D16",
            147: "T20 T17 D18",
            146: "T20 T18 D16",
            145: "T20 T15 D20",
            144: "T20 T20 D12",
            143: "T20 T17 D16",
            142: "T20 T14 D20",
            141: "T20 T19 D12",
            140: "T20 T20 D10",
            139: "T19 T14 D20",
            138: "T20 T18 D12",
            137: "T20 T19 D10",
            136: "T20 T20 D8",
            135: "Bull T15 D20",
            134: "T20 T14 D16",
            133: "T20 T19 D8",
            132: "Bull Bull D16",
            131: "T20 T13 D16",
            130: "T20 T20 Bull",
            129: "T19 T16 D12",
            128: "T18 T14 D16",
            127: "T20 T17 D8",
            126: "T19 T19 D6",
            125: "Bull T17 D12",
            124: "T20 S14 Bull",
            123: "T19 S16 Bull",
            122: "T18 T18 D7",
            121: "T20 S11 Bull",
            120: "T20 S20 D20",
            119: "T20 S19 D20",
            118: "T20 S18 D20",
            117: "T20 S17 D20",
            116: "T19 S19 D20",
            115: "T19 S18 D20",
            114: "T20 S14 D20",
            113: "T19 S16 D20",
            112: "T20 S12 D20",
            111: "T20 S11 D20",
            110: "T20 S10 D20",
            109: "T19 S12 D20",
            108: "T19 S19 D16",
            107: "T20 S15 D16",
            106: "T20 S6 D20",
            105: "T20 S5 D20",
            104: "T18 S10 D20",
            103: "T20 S11 D16",
            102: "T20 S10 D16",
            101: "T20 S9 D16",
            100: "T20 D20",
            98: "T20 D19",
            97: "T19 D20",
            96: "T20 D18",
            95: "T19 D19",
            94: "T18 D20",
            93: "T19 D18",
            92: "T20 D16",
            91: "T17 D20",
            90: "T20 D15",
            89: "T19 D16",
            88: "T20 D14",
            87: "T17 D18",
            86: "T18 D16",
            85: "T15 D20",
            84: "T20 D12",
            83: "T17 D16",
            82: "Bull D16",
            81: "T19 D12",
            80: "T20 D10",
            79: "T19 D11",
            78: "T18 D12",
            77: "T19 D10",
            76: "T20 D8",
            75: "T17 D12",
            74: "T14 D16",
            73: "T19 D8",
            72: "T16 D12",
            71: "T13 D16",
            70: "T10 D20",
            69: "T19 D6",
            68: "T20 D6",
            67: "T17 D8",
            66: "T10 D18",
            65: "Outer Bull D20",
            64: "T16 D8",
            63: "T9 D18",
            62: "T10 D16",
            61: "Outer Bull D18",
            60: "S20 D20",
            59: "S19 D20",
            58: "S18 D20",
            57: "S17 D20",
            56: "S16 D20",
            55: "S15 D20",
            54: "S14 D20",
            53: "S13 D20",
            52: "S12 D20",
            51: "S11 D20",
            50: "S10 D20",
            49: "S9 D20",
            48: "S8 D20",
            47: "S7 D20",
            46: "S6 D20",
            45: "S5 D20",
            44: "S4 D20",
            43: "S3 D20",
            42: "S9 D16",
            41: "S1 D20",
            40: "D20",
            39: "S7 D16",
            38: "D19",
            37: "S5 D16",
            36: "D18",
            35: "S3 D16",
            34: "D17",
            33: "D1 D16",
            32: "D16",
            31: "S15 D8",
            30: "D15",
            29: "S13 D8",
            28: "D14",
            27: "S11 D8",
            26: "D13",
            25: "S9 D8",
            24: "D12",
            23: "11 D6",
            22: "D11",
            21: "S5 D8",
            20: "D10",
            19: "S3 D8",
            18: "D9",
            17: "S1 D8",
            16: "D8",
            15: "7 D4",
            14: "D7",
            13: "S5 D4",
            12: "D6",
            11: "S3 D4",
            10: "D5",
            9: "S1 D4",
            8: "D4",
            7: "S3 D2",
            6: "D3",
            5: "S1 D2",
            4: "D2",
            3: "S1 D1",
            2: "D1",
            1: 'Bust'
            };

        if(this._game[player].remainingScore === 0) {
            return "Well done!"
        }

        if(this._game[player].remainingScore <= 170) {
            this._game[player].canFinish = true;
            return dartsFinishes[this._game[player].remainingScore];

        } else {
            this._game[player].canFinish = false
        }
    },
    hasWonLeg(player){
        //checks if player has won
        if(this._game[player].remainingScore === 0) {
           
            //disable input buttons and highlight next leg button
            submitButtonP1.className = "btn bg-secondary bg-gradient" 
            submitButtonP2.className = "btn bg-secondary bg-gradient"
            nextLegButton.disabled = false;
            nextLegButton.className = "btn bg-success bg-gradient";
            
            //update Stats and move to next player
            this._game[player].legsWon += 1;
            this.determineNextPlayer(player) //BUG this overrrides 

            alert(`Well done! ${this.returnFullName(player)} wins this leg!!`);
        }
    },
    hasWonGame(player){
        //checks if player has won game
        let matchesWon = document.getElementById("matchesWonP1")
        const newMatch = document.getElementById("newMatch")

        if(this._game[player].legsWon === this._game[player].legsToWin) {
            submitButtonP1.className = "btn bg-secondary bg-gradient" 
            submitButtonP2.className = "btn bg-secondary bg-gradient"
            submitButtonP1.disabled = true;
            deleteButtonP1.disabeld = true;
            deleteButtonP2.disabled = true;
            submitButtonP2.disabeld = true;
            nextLegButton.className = "btn bg-secondary bg-gradient";
            nextLegButton.disabled = true; //keep button disabled as no more legs
            nextLegButton.innerText = "No more legs"
            dartsGame._game[player].matchesWon += 1
            matchesWon.innerText = dartsGame._game[player].matchesWon
            newMatch.className = "btn bg-success bg-gradient";
            console.log(`${this.returnFullName(player)} has won ${this._game[player].legsWon} of ${this._game[player].totalLegs}`);
            alert(`Well done! ${this.returnFullName(player)} wins the game!!`);
        }
    },
};

//load the welcome page data from session storage
function loadGameData() {
    const storedGameData = sessionStorage.getItem('dartsGameData');
    parsedGameData = JSON.parse(storedGameData)

    //load game data into darts object
    dartsGame._game[0] = parsedGameData._game[0];
    dartsGame._game[1] = parsedGameData._game[1];

    //load player data into darts object
    dartsGame._players[0] = parsedGameData._players[0];
    dartsGame._players[1] = parsedGameData._players[1];

    //load player go data
    dartsGame._playerGo = parsedGameData._playerGo;

    //refresh score display
    updateScoreDisplayP1()
    updateScoreDisplayP2()

    //sets player. Welcome page sets player one way around to trigger change. If P1 first, then send P2. If P2 first, send P1.
    if(dartsGame._playerGo === 1) {
        submitButtonP1.className = "btn bg-secondary bg-gradient" //changes class
        submitButtonP2.className = "btn bg-success bg-gradient" //changes class
        submitButtonP1.disabled = true;
        submitButtonP2.disabled = false;
        deleteButtonP1.disabled = true;
    } else {
        submitButtonP1.className = "btn bg-success bg-gradient" //changes class
        submitButtonP2.className = "btn bg-secondary bg-gradient" //changes class
        submitButtonP1.disabled = false;
        submitButtonP2.disabled = true;
        deleteButtonP2.disabled = true;
    }
};

loadGameData() //load darts object from session storage

//******* GAME FUNCTIONS ***********
//update match overview in subtitle
const matchOverview = document.getElementById("matchOverview");
matchOverview.innerText = `Game on: ${dartsGame._game[0].startingScore} - best of ${dartsGame._game[0].totalLegs} legs!`

function updateScoreDisplayP1(enteredScoreP1) {
    const gameScoreP1 = document.getElementById("gameScoreP1");
    gameScoreP1.innerText = dartsGame._game[0].remainingScore;
    console.log(`Updated score to ${dartsGame._game[0].remainingScore}`)
}

function updateScoreDisplayP2(enteredScoreP2) {
    const gameScoreP2 = document.getElementById("gameScoreP2");
    gameScoreP2.innerText = dartsGame._game[1].remainingScore;
    console.log(`Updated score to ${dartsGame._game[1].remainingScore}`)
}

function showHistoryP1() {
    if(dartsGame._scoreHistory[0].scores.length !== 0) {
    const historyP1 = document.getElementById("scoreHistoryP1");
    historyP1.innerText = dartsGame._scoreHistory[0].scores[dartsGame._scoreHistory[0].scores.length - 1];
    } else {
    const historyP1 = document.getElementById("scoreHistoryP1");
    historyP1.innerText = 0;
    }
}

function showHistoryP2() {
    if(dartsGame._scoreHistory[1].scores.length !== 0) {
        const historyP2 = document.getElementById("scoreHistoryP2");
        historyP2.innerText = dartsGame._scoreHistory[1].scores[dartsGame._scoreHistory[1].scores.length - 1];
        } else {
        const historyP2 = document.getElementById("scoreHistoryP2");
        historyP2.innerText = 0;
        }
    }

function updateStatsP1() {
    const dartsThrown = document.getElementById("dartsThrownP1");
    const dartsAvg = document.getElementById("AvgNumP1");

    dartsThrown.innerText = dartsGame._gameStats[0].dartsThrown; //show darts thrown
    dartsAvg.innerText = dartsGame._gameStats[0].scoreAvg; //show average score
    console.log(`Updated darts thrown to ${dartsGame._gameStats[0].dartsThrown}`);
    console.log(`Updated average score to ${dartsGame._gameStats[0].scoreAvg}`);
}

function updateStatsP2() {
    const dartsThrown = document.getElementById("dartsThrownP2");
    const dartsAvg = document.getElementById("AvgNumP2");
    dartsThrown.innerText = dartsGame._gameStats[1].dartsThrown; //show darts thrown
    dartsAvg.innerText = dartsGame._gameStats[1].scoreAvg; //show average score
    console.log(`Updated darts thrown to ${dartsGame._gameStats[1].dartsThrown}`);
    console.log(`Updated average score to ${dartsGame._gameStats[1].scoreAvg}`);
}

function showFinishP1() {
    const finishDisplayP1 = document.getElementById("finishDisplayP1");
    const currentFinishP1 = dartsGame.isOnAFinish(0);

    if (dartsGame._game[0].remainingScore <= 170) {
        finishDisplayP1.className = "bg-success bg-gradient text-white";
        finishDisplayP1.innerText = currentFinishP1; //show finish
        console.log(`Finish displayed ${currentFinishP1}`); //show finish
    } else {
        finishDisplayP1.className = "";
        finishDisplayP1.innerText = ""; // Clear the finish display
        console.log("No finish available");
    }
};

function showFinishP2() {
    const finishDisplayP2 = document.getElementById("finishDisplayP2");
    const currentFinishP2 = dartsGame.isOnAFinish(1);

    if (dartsGame._game[1].remainingScore <= 170) {
        finishDisplayP2.className = "bg-success bg-gradient text-white";
        finishDisplayP2.innerText = currentFinishP2; //show finish
        console.log(`Finish displayed ${currentFinishP2}`); //show finish
    } else {
        finishDisplayP2.className = "";
        finishDisplayP2.innerText = ""; // Clear the finish display
        console.log("No finish available");
    }
};

function nextLeg() {
    //check if any remaining legs to win by either player, if so unlock next leg functionality, if not disable it
    if(dartsGame._game[0].legsToWin !== 0 || dartsGame._game[1].legsToWin !== 0) {
        let legsWonP1 = document.getElementById("legsWonP1");
        let legsWonP2 = document.getElementById("legsWonP2");
        legsWonP1.innerText = dartsGame._game[0].legsWon;
        legsWonP2.innerText = dartsGame._game[1].legsWon;
    }
};

//index.HTML javascript
document.addEventListener("DOMContentLoaded", function() {

    const nextLegButton = document.getElementById("nextLegButton");
    nextLegButton.disabled = true;

    //show player names
    const playerOneName = document.getElementById("player1");
    const playerTwoName = document.getElementById("player2");
    playerOneName.innerText = dartsGame.returnFullName(0);
    playerTwoName.innerText = dartsGame.returnFullName(1);

    //map to front-end scoring button
    const submitButtonP1 = document.getElementById("submitButtonP1");
    const scoreInputP1 = document.getElementById("scoreInputP1");
    const submitButtonP2 = document.getElementById("submitButtonP2");
    const scoreInputP2 = document.getElementById("scoreInputP2");

    nextLegButton.addEventListener("click", function() {
        dartsGame._scoreHistory = [{scores: []}, {scores: []}] //reset score history
        dartsGame._game[0].remainingScore = 501; //reset score
        dartsGame._game[1].remainingScore = 501; //reset score
        dartsGame._game[0].canFinish = false; //reset finish
        dartsGame._game[1].canFinish = false; //reset finish
        dartsGame._gameStats[0].dartsThrown = 0; //reset darts thrown (but keep average & total score)
        dartsGame._gameStats[1].dartsThrown = 0;//reset darts thrown (but keep average & total score)
        dartsGame._playerGo === 0; //reset player
        nextLegButton.disabled = true; // disable the button again after clicking
        nextLegButton.className = "btn bg-secondary bg-gradient"

        //Update HTML elements to reflect game reset
        updateStatsP1();
        updateStatsP2();
        updateScoreDisplayP1();
        updateScoreDisplayP2();
        showFinishP1();
        showFinishP2();
        showHistoryP1();
        showHistoryP2();
    });

    submitButtonP1.addEventListener("click", function() {
        const enteredScoreP1 = parseInt(scoreInputP1.value);
        if (enteredScoreP1 > 180) {
            alert("Score higher than maximum allowed.")
        } else if (enteredScoreP1 > dartsGame._game[0].remainingScore || dartsGame._game[0].remainingScore - enteredScoreP1 === 1) {
            alert("Invalid score.")
        } else if (!isNaN(enteredScoreP1)) {
            dartsGame.setScore(enteredScoreP1, 0); //trigger the scoring function
            updateScoreDisplayP1(enteredScoreP1); //update the score display
            updateStatsP1(); //update the stats
            showHistoryP1(); //update the score history
            showFinishP1(); //update the finish display
            scoreInputP1.value = ''; // Clear the input field
            nextLeg(); //call function to unlock next leg button and update legs won
        } else {
            alert("Please enter a valid number.")
        }
    });

    submitButtonP2.addEventListener("click", function() {
        const enteredScoreP2 = parseInt(scoreInputP2.value);
        if (enteredScoreP2 > 180) {
            alert("Score higher than maximum allowed.")
        } else if (enteredScoreP2 > dartsGame._game[1].remainingScore || dartsGame._game[1].remainingScore - enteredScoreP2 === 1) {
            alert("Invalid score.")
        } else if (!isNaN(enteredScoreP2)) {
            dartsGame.setScore(enteredScoreP2, 1); //trigger the scoring function
            updateStatsP2(); //update the stats
            updateScoreDisplayP2(enteredScoreP2); //update the score display
            showHistoryP2(); //update the score history
            showFinishP2(); //update the finish display
            scoreInputP2.value = ''; // Clear the input field
            nextLeg(); //call function to unlock next leg button and update legs won
        } else {
            alert("Please enter a valid number.")
        }
    });

    //delete score buttons update dartsGame object, bring the go back to the player and refresh HTML elements to show removed score
    deleteButtonP1.addEventListener("click", function() {
        if(dartsGame._game[0].startingScore !== dartsGame._game[0].remainingScore){
        dartsGame.deleteScore(0)
        dartsGame.determineNextPlayer(dartsGame._playerGo)
        updateStatsP1()
        updateScoreDisplayP1()
        showFinishP1()
        showHistoryP1()
        } else {
            window.alert("No darts thrown, nothing to undo.")
        }
    });

    deleteButtonP2.addEventListener("click", function() {
        if(dartsGame._game[1].startingScore !== dartsGame._game[1].remainingScore){
        dartsGame.deleteScore(1)
        dartsGame.determineNextPlayer(dartsGame._playerGo)
        updateStatsP2()
        updateScoreDisplayP2()
        showFinishP2()
        showHistoryP2()
        } else {
            window.alert("No darts thrown, nothing to undo.")
        }
    });

    newMatch.addEventListener("click", function() {
        window.location.href = 'index.html'
        newMatch.className = "btn bg-secondary bg-gradient";
    });
});
