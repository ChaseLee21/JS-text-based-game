

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
    for (let action of actions) { 
        createElementButton('actions', 'action' + action.text.replace(' ', ''), action.text, 'btn-primary');
        document.getElementById('action' + action.text.replace(' ', '')).addEventListener('click', action.action);
        //document.getElementById('action' + action.text.replace(' ', '')).setAttribute('disabled', '');
    }
}

/* allows actions to be clicked once all enemies die */

function actionAllowed() {
    for (let enemy in enemiesArray) {

    }
}