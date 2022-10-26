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
    for (let enemy of enemies) {
        let name = enemy.name.replace(' ', '');
        if(enemy.health === 0) {
            createElementDiv('enemiesBoard', 'enemiesDIV', 'd-flex justify-content-center');
            createElementDiv('enemiesDIV', 'enemy' + name, 'card text-dark d-flex justify-content-center', 'width: 12rem');
            createElementText('enemy' + name, 'cardTitle' + name, 'h1', enemy.name, 'card-header');
            createElementDiv('cardTitle' + name, 'cardBody' + name, 'card-body');
            createElementDiv('cardBody' + name, 'enemies', 'card-body');
            createElementText('enemies', '', 'div', 'Dead', 'fs-4');
        } else {
            createElementDiv('enemiesBoard', 'enemiesDIV', 'd-flex justify-content-center');
            createElementDiv('enemiesDIV', 'enemy' + name, 'card text-dark d-flex justify-content-center', 'width: 12rem');
            createElementText('enemy' + name, 'cardTitle' + name, 'h1', enemy.name, 'card-header');
            createElementDiv('cardTitle' + name, 'cardBody' + name, 'card-body');
            createElementDiv('cardBody' + name, 'enemies', 'card-body');
            createElementText('enemies', '', 'div', 'Health: ' + enemy.health, 'fs-4');
            createElementText('enemies', '', 'div', 'Armor: ' + enemy.armor, 'fs-4');
            createElementButton('enemies', 'attack' + name, 'Attack', 'btn-primary')
            document.getElementById('attack' + name).addEventListener('click', () => { attackEnemy(enemy.health, enemy.armor) });
        }
    }
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

