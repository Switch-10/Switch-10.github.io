//Javascript game object used for different dart games
export let x01DartsGame = {
    _players:[
        {firstName:"", lastName:"", dartsName:""},
        {firstName:"", lastName:"", dartsName:""}
    ],
    _currentPlayer: 0,
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
    ]
};

export let roundTheClock = {
    _players:[
        {firstName:"", lastName:"", dartsName:""},
        {firstName:"", lastName:"", dartsName:""}
    ],
    _currentPlayer: 0,
    _game:[
        {currentScore: 1, maxScore: 22, currentDart: 1},
        {currentScore: 1, maxScore: 22, currentDart: 1}
    ],
    _gameStats:[
        {dartsThrown: 0, dartsHit: 0, hitPercentage: 0},
        {dartsThrown: 0, dartsHit: 0, hitPercentage: 0}
    ],
    _hitHistory:[
        {type: "", lastDart: 0},
        {type: "", lastDart: 0}
    ]
};


