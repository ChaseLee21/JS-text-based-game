//TODO 
//seperate the equipment class to call specific types of equipment
//items class should only be called for special items
//potions should call the potions class 
//potions have a bug where only the first one on the list can be used
//actions only appear after all enemies in the room are dead

/* 
Start of array declarations
These arrays store objects to be referenced to during the game
Any item, room, or enemy is created in these arrays
*/

/* 
this array stores all items that can be placed in inventoryArray[] later in the game
equipment = (name, type, armor, lootChance)
item = (name, type, damage, lootChance)
potion = (name, type, value, lootChance)
weapon = 1
helm = 2
chest = 3
boots = 4
*/
let itemsArray = [
    new Equipment('nothing', 0), //0
    new Equipment('Torn Leather Boots', 'boots', 2), //1
    new Equipment('Cloth Robe', 'chest', 2), //2
    new Item('Torch', 0, true), //3
    new Equipment('Copper Shortsword', 'weapon', 2), //4
    new Equipment('Skeevers Tooth', 'weapon', 4, .5), //5
    new Equipment('Cracked Mining Helmet', 'helm', 2, .9), //6
    new Equipment('Bat Blood', 'potion', 5, .5) //7
]; 

let inventoryArray = [
    itemsArray[3],
    itemsArray[7]
]; //this array stores items in the players in current inventory

let combatArray = [
    
]; //this array stores the current enemys from enemiesArray[] on the battlefield both dead and alive

let enemiesArray = [
    new Enemy('None', 0, 0, 0, itemsArray[0], false), //0
    new Enemy('Unknown Body', 0, 0, 0, itemsArray[0], false), //1
    new Enemy('Skeever', 8, 0, 6, itemsArray[5]), //2
    new Enemy('Skeleton', 16, 0, 10, itemsArray[6]), //3
    new Enemy('Bat', 6, 0, 3, itemsArray[7]) //4
]; //this array stores enemys to be called in the updateGameBoard()

let roomArray = [
    new Room(`Welcome to Chase's Game`,
    `You woke up in a cave wearing clothes you've never seen before. There is a fire going with a dead body lying next it.
    She doesn't appear to be someone you know but you don't remember much. You loot a Cooper Shortsword from her body and lit
    a torch from the fire. In this room there is a narrow passage with no light coming from it.`,
    [enemiesArray[1]],
    [new Action('Follow Passage', () => { updateGameBoard(roomArray[1]) } )]
    ),
    new Room(`Skeever Den`, 
    `You follow the passage lit by the torch you crafted. A horid stench becomes more profound as you continue down the path.
    As the passage opens up into a wider room you see skeevers scatter as the light from your torch hits their body's. 
    A dead body reveals itself and two brave skeevers from the pack stays behind looking for a fight.`,
    [enemiesArray[2], enemiesArray[2]],
    [new Action('Continue Path', () => { updateGameBoard(roomArray[2]) })]
    ),
    new Room(`Miner's Grave`,
    `Whats left of corpse starts to move as you get closer. The walls start to shake and wispering voices pass by you as the
    skeleton takes it shape. Evil is here. It faces you.`,
    [enemiesArray[3]],
    [new Action('Continue Path', () => { updateGameBoard(roomArray[3]) })]
    ),
    new Room(`The Evil Presence`,
    `The skeleton's bones crumbled before your very eyes. The wispers die off. The cave wall crumbled from the death 
    of the skeleton exposing a ladder leading down. You feel an evil presence is here. Something is not right. Proceed with caution.
    `,
    [],
    [new Action('Continue Path', () => { updateGameBoard(roomArray[4]) })]
    ),
    new Room(``,
    `The room is cold. You can see your breath and the movements of your body echo. You kick a pebble which
    you find is a mistake very quickly as the sound of bat wings echo in seemingly empty cave. Your torch emits just enought light
    to see them fly around one by one. You draw your weapon and ready yourself as they swarm.`,
    [enemiesArray[4], enemiesArray[4], enemiesArray[4], enemiesArray[4], enemiesArray[4], enemiesArray[4], enemiesArray[4], enemiesArray[4]],
    []
    )
]; //this array stores the different room encounters and is called from the action buttons


/* 
Initialize variables
*/


let gameBoard = document.getElementById('gameBoard'); 
let player = new Character(100); 

/* 
Global function declarations
*/

//start() initializes the game by updating the DOM with the starting elements
function start() {
    player.name = document.getElementById('nameInput').value;
    clearBoard(['startButton']);
    updateInventory();
    updateEquipment();
    updateGameBoard(roomArray[0]);
    initializeStatus();
}

/* 
createElement() functions are used to more easily create new elements on the DOM
they are seperated from each other for easier understanding
the only mandatory param is appendingElement as the new element has to append to an existing one 
*/
function createElementDiv(appendingElement, id, classes, style) {
    const createElement = document.createElement('div');
    const appendElement = document.getElementById(appendingElement);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', classes);
    if (style) createElement.setAttribute('style', style);
    
}

function createElementButton(appendingElement, id, text, classes) {
    const createElement = document.createElement('button');
    const createText = document.createTextNode(text);
    const appendElement = document.getElementById(appendingElement);
    createElement.appendChild(createText);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', 'btn ' + classes);
}

function createElementText(appendingElement, id, type, text, classes) {
    const createElement = document.createElement(type);
    const createText = document.createTextNode(text);
    const appendElement = document.getElementById(appendingElement);
    createElement.appendChild(createText);
    appendElement.appendChild(createElement);
    if (id) createElement.setAttribute('id', id);
    if (classes) createElement.setAttribute('class', classes);
}

/* 
log is used to add text below the game board that logs the actions going on in the game
*/

function log(text) {
    const createElement = document.createElement('p');
    const createText = document.createTextNode(text);
    const appendElement = document.getElementById('log');
    createElement.appendChild(createText);
    appendElement.prepend(createElement);
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

/* 
roll(chance) exists to determine if an item drops or if it doesnt
*/

function roll(chance) {
    const diceRoll = Math.random();
    //console.log(diceRoll, chance);
    return (diceRoll < chance) ? true : false;
}

