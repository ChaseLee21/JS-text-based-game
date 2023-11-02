

/* 
called in the roomsArray[] to create a new action
these actions will only show once all enemies are dead
first param = btn text
second param = anonymous function
the anonymouse function should GENERALLY be used to go to the next room.
ex. new Action('follow cave', () => { updateGameBoard(roomArray[1]) })
if another action is desired there should really be a new class created to do so.
 */

class Action {
    constructor(text, action) {
        this.text = text;
        this.action = action;
    }
}

/* 
called only in updateGameBoard()
clears current actions and updates the DOM to show the new ones
*/
function updateActions(actions){
    clearBoard(['actions']); //clears current actions on the game board
    createElementDiv('actionsDiv', 'actions');
    const allowed = actionAllowed();
    for (let action of actionsArray) { 
        createElementButton('actions', 'action' + action.text.replace(' ', ''), action.text, 'btn-primary');
        document.getElementById('action' + action.text.replace(' ', '')).addEventListener('click', action.action);
        if (!allowed) document.getElementById('action' + action.text.replace(' ', '')).setAttribute('disabled', '');
    }
}

/* checks if all enemies are dead and returns true once they are */

function actionAllowed() {
    for (let enemy of combatArray) {
        if (enemy.health > 0) return false;
    }
    return true;
}