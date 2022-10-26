

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
