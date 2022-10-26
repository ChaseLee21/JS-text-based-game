

/* 
this class is called in the roomsArray[] only
name = the h1 title at the top of the screen that display the room name
text = the game text in <p> that tells the story of whats happening
enemies = an array that references the enemiesArray[] 
    ex. [[enemiesArray[1], [enemiesArray[2]] this would create two new enemies on the board 
    the new enemies are cloned into combatArray[] where we can initiate combat with them in Enemy.js
actions = an array that references the class Action()
    ex. [new Action('follow cave', () => { updateGameBoard(roomArray[1]) })]
*/

class Room {
    constructor(name, text, enemies, actions) {
        this.name = name;
        this.text = text;
        this.enemies = enemies;
        this.actions = actions;
    }
}


/* 
updateGameBoard(room) updates the DOM to the next room
this function is called in two places
    1. start()
    2. Action() class
its only parameter is an Room class object which has 4 properties tied to it
it uses these 4 properties to update the DOM
*/

function updateGameBoard(room) {
    gameBoard.innerHTML = room.text;
    combatArray = room.enemies;
    createEnemies();
    updateActions(room.actions);
    updateRoomName(room.name);
}

/* 
called only in updateGameBoard()
clears current actions and updates the DOM to show the new ones
*/
function updateActions(actions){
    clearBoard(['actions']); //clears current actions on the game board
    createElementDiv('actionsDiv', 'actions');
    for (let action of actions) { 
        createElementButton('actions', 'action' + action.text.replace(' ', ''), action.text, 'btn-primary');
        document.getElementById('action' + action.text.replace(' ', '')).addEventListener('click', action.action);
    }
}

/* 
called only in updateGameBoard()
updates the DOM to show the new room name
*/
function updateRoomName(text) {
    let roomTitle = document.getElementById('roomName');
    roomTitle.innerHTML = text;
}

/* 
requires an arry as the param
this array only contains the id's of html elements ex. clear = ['actions', 'status']
removes the elements passed in the param from the DOM
*/
function clearBoard(clear) {
    for (let key in clear) {
        document.getElementById(clear[key]).remove();
    }
}

