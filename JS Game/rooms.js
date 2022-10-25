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
    clearBoard(['enemiesDIV']);
    for (let enemy of enemies) {
        createElement('div', '', 'enemiesBoard', '', 'enemiesDIV');
        createElement('div', '', 'enemiesDIV', 'card bg-dark', 'enemy' + enemy);
        createElement('div', '', 'enemy' + enemy, 'card-body', 'cardBody' + enemy);
        createElement('h1', enemy.name, 'enemy' + enemy, 'pb-2', 'cardTitle' + enemy);
        createElement('ul', '', 'cardTitle' + enemy, 'card-text', 'enemies');
        createElement('li', 'Health: ' + enemy.health, 'enemies', 'list-group-item list-group-item-dark');
        createElement('li', 'Armor: ' + enemy.armor, 'enemies', 'list-group-item list-group-item-dark');
        
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
        console.log(clear[key]);
        document.getElementById(clear[key]).remove();
    }
}

