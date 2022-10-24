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
    for (let action of actions) {
        console.log(action);
        createElement('li', action.text, 'actions', 'btn btn-primary', 'action' + action.text.replace(' ', ''));
    }
}

//updates the DOM element 'roomName' should only be called in the 'updateGameBoard' function
function updateRoomName(text) {
    let roomTitle = document.getElementById('roomName');
    roomTitle.innerHTML = text;
}



