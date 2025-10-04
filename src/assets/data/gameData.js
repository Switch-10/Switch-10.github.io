//Javascript game object 
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
