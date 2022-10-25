//rooms.js includes all functions oriented around moving through the different rooms in the game
//the most important function here is 'updateGameBoard'  

//Updates the game board DOM by passing a room from the roomArray
function updateGameBoard(room) {
    gameBoard.innerHTML = room.text;
    updateEnemies(room.enemies)
    updateActions(room.actions);
    updateRoomName(room.name);

}

//updates the DOM element 'enemies' should only be called in the 'updateGameBoard' function
function updateEnemies(enemies) {
    clearBoard(['enemies']);
    createElement('ul', '', 'enemiesDiv', '', 'enemies');
    for (let enemy of enemies) {
        createElement('li', enemy.name + ': ' + enemy.health, 'enemies');
    }
}

//updates the DOM element 'actions' should only be called in the 'updateGameBoard' function
function updateActions(actions){
    clearBoard(['actions']); //clears current actions on the game board
    createElement('ul', '', 'actionsDiv', '', 'actions'); //creates a new Div to place the new actions inside
    for (let action of actions) { 
        //console.log(action);
        createElement('li', action.text, 'actions', 'btn btn-primary', 'action' + action.text.replace(' ', ''));
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
        //console.log(clear[key]);
        document.getElementById(clear[key]).remove();
    }
}

