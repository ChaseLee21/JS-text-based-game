

//TODO
//add a combat system that rewards loot
//utilize the combatArray to store current enemies on the battlefield
//

let itemsArray = [
    new Equipment('None', 0, 0),
    new Equipment('Torn Leather Boots', 3, 2),
    new Equipment('Cloth Robe', 2, 2),
    new Item('Torch', 0, 0),
    new Item('Copper Shortsword', 1, 2)
]; //this array stores all items that can be placed in inventoryArray[] later in the game

let inventoryArray = [
    itemsArray[3]
]; //this array stores items in the players in current inventory

let combatArray = [

]; //this array stores the current enemys from enemiesArray[] on the battlefield both dead and alive

let enemiesArray = [
    new Enemy('Unknown Body', 0, 0, 0, false),
    new Enemy('Skeever', 8, 0, 1)
]; //this array stores enemys to be called in the updateGameBoard()

let roomArray = [
    new Room(`Welcome to Chase's Game`,
        `You woke up in a cave wearing clothes you've never seen before. There is a fire going with a dead body lying next it.
        She doesn't appear to be someone you know but you don't remember much. You loot a Cooper Shortsword from her body and lit
        a torch from the fire. In this room there is a narrow passage with no light coming from it.`,
        [enemiesArray[0]],
        [new Action('Follow Passage', () => { updateGameBoard(roomArray[1]) } )]
    ),
    new Room(`Skeever attack`, 
        `You follow the passage lit by the torch you crafted. A horid stench becomes more profound as you continue down the path.
        As the passage opens up into a wider room you see skeevers scatter as the light from your torch hits their body's. 
        A dead body reveals itself and one brave soldier from the pack stays behind looking for a fight.`,
        [enemiesArray[1]],
        []
    )
]; //this array stores the different room encounters and is called from the action buttons

let chase = new Character(100); //TODO, let the player name their own character
let gameBoard = document.getElementById('gameBoard'); 
start();

// Character constructor
function Character(health) {
    this.name = 'chase';
    this.health = health
    this.inventory = inventoryArray;
    this.equipment = {
        Helm: itemsArray[0],
        Chest: itemsArray[2],
        Boots: itemsArray[1],
        Weapon: itemsArray[4]
    }
    this.armor = 0;
}

// Enemy constructor 
function Enemy(name, health, armor, damage, alive) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.damage = damage;
    if (alive) { 
        this.alive = alive;
    } else this.alive = true;
}

//Item constructor
function Item(name, type, damage) {
    this.name = name;
    this.type = type;
    this.damage = damage;
}

//Equipment constructor
function Equipment(name, type, armor){
    this.name = name;
    this.type = type;
    this.armor = armor;
}

//Room constructor
function Room(name, text, enemies, actions) {
    this.name = name;
    this.text = text;
    this.enemies = enemies;
    this.actions = actions;
}

//Action constructor first param = btn text, second param = anonymous function
function Action(text, action) {
    this.text = text;
    this.action = action;
}

//Starts the game by updating all the DOM elements
function start() {
    updateInventory();
    updateEquipment();
    updateGameBoard(roomArray[0]);
    updateStatus();
}

//These three functions are used to create new elements on the DOM
//they are seperated from each other for easier use
//the only mandatory param is appendingElement 
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