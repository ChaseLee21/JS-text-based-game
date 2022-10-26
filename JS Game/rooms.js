//rooms.js includes all functions oriented around moving through the different rooms in the game
//the most important function here is 'updateGameBoard'  

//Updates the game board DOM by passing a room from the roomArray
function updateGameBoard(room) {
    gameBoard.innerHTML = room.text;
    combatArray = room.enemies;
    createEnemies();
    updateActions(room.actions);
    updateRoomName(room.name);
}

//updates the DOM element 'actions' should only be called in the 'updateGameBoard' function
function updateActions(actions){
    clearBoard(['actions']); //clears current actions on the game board
    createElementDiv('actionsDiv', 'actions');
    for (let action of actions) { 
        createElementButton('actions', 'action' + action.text.replace(' ', ''), action.text, 'btn-primary');
        document.getElementById('action' + action.text.replace(' ', '')).addEventListener('click', action.action);
    }
}

//updates the DOM element 'roomName' should only be called in the 'updateGameBoard' function
function updateRoomName(text) {
    let roomTitle = document.getElementById('roomName');
    roomTitle.innerHTML = text;
}

//Clears gameboard for next room 
function clearBoard(clear) {
    for (let key in clear) {
        document.getElementById(clear[key]).remove();
    }
}

