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
// Creates bootstrap card for each enemy showing name health and armor
// If enemy is dead creates bootstrap card showing name and dead
function updateEnemies(enemies) {
    clearBoard(['enemiesDIV']);
    console.log(enemies);
    for (let enemy of enemies) {
        if(enemy.health === 0) {
            createElement('div', '', 'enemiesBoard', 'd-flex justify-content-center', 'enemiesDIV');
            createElement('div', '', 'enemiesDIV', 'card text-dark d-flex justify-content-center', 'enemy' + enemy.name, 'width: 12rem');
            createElement('h2', enemy.name, 'enemy' + enemy.name, 'card-header', 'cardTitle' + enemy.name);
            createElement('div', '', 'cardTitle' + enemy.name, 'card-body', 'cardBody' + enemy.name);
            createElement('div', '', 'cardBody' + enemy.name, 'card-text', 'enemies');
            createElement('div', 'Dead', 'enemies', 'fs-4');
        } else {
            createElement('div', '', 'enemiesBoard', 'd-flex justify-content-center', 'enemiesDIV');
            createElement('div', '', 'enemiesDIV', 'card text-dark d-flex justify-content-center', 'enemy' + enemy.name, 'width: 12rem');
            createElement('h2', enemy.name, 'enemy' + enemy.name, 'card-header', 'cardTitle' + enemy.name);
            createElement('div', '', 'cardTitle' + enemy.name, 'card-body', 'cardBody' + enemy.name);
            createElement('div', '', 'cardBody' + enemy.name, 'card-text', 'enemies');
            createElement('div', 'Health: ' + enemy.health, 'enemies', 'fs-4');
            createElement('div', 'Armor: ' + enemy.armor, 'enemies', 'fs-4');
        }
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

