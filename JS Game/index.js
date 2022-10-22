// Initializing Global Variables
let itemsArray = [
    new Equipment('None', 0, 0),
    new Equipment('Torn Leather Boots', 3, 2),
    new Equipment('Cloth Robe', 2, 2),
    new Item('Torch', 0, 0),
    new Item('Copper Shortsword', 1, 2)
]; //array of all items
let inventoryArray = [
    itemsArray[3]
]; //array of current items in inventory
let enemiesArray = [
    new Enemy('Unknown Body', 0, 0, 0),
    new Enemy('Skeever', 8, 0, 1)
]; //array of all enemies in game
let chase = new Character(100); 
let gameBoard = document.getElementById('gameBoard'); 
start();

// Character constructor
function Character(health) {
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
function Enemy(name, health, armor, damage) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.damage = damage;
}

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

//Starts the game by updating all the DOM elements
function start() {
    updateInventory();
    updateEquipment();
    updateGameBoard(
        clear = "",
        gameBoardText = `
        You woke up in a cave wearing clothes you've never seen before. There is a fire going with a dead body lying next it.
        She doesn't appear to be someone you know but you don't remember much. You loot a Cooper Shortsword from her body and lit
        a torch from the fire.
        `,
        actions = [
            {htmlElement: 'button', htmlText: 'Follow Cave', classes: 'btn btn-primary', id: 'action1'}
        ],
        enemies = [enemiesArray[0]]
    );
    updateRoom(`Welcome to Chase's Game`);
    updateStatus();
}

//Updates the game board DOM
function updateGameBoard(clear, gameBoardText, actions, enemies) {
    if (clear) {
        clearBoard(clear);
    }
    gameBoard.innerHTML = gameBoardText;
    actions.forEach(element => {
        createElement(element.htmlElement, element.htmlText, 'actions', element.classes, element.id);
    });
    for (let key of enemies) {
        updateEnemies(key.name, key.health);
    }

}

//updates the DOM element 'enemies'
function updateEnemies(name, health) {
    clearBoard(['enemies']);
    createElement('ul', '', 'enemiesDiv', '', 'enemies');
    createElement('li', name + ': ' + health, 'enemies');
}

//updates the DOM element 'roomName'
function updateRoom(text) {
    let roomTitle = document.getElementById('roomName');
    roomTitle.innerHTML = text;
}

//updates the Dom element 'status'
function updateStatus() {
    createElement('li', 'Health: ' + chase.health, 'status');
    createElement('li', 
    'Armor: ' + (chase.equipment.Boots.armor + chase.equipment.Chest.armor + chase.equipment.Helm.armor), 
    'status');
}

//updates the DOM element 'inventory'
function updateInventory() {
    for (let key of chase.inventory) {
        createElement('li', key.name, 'inventory');
    }
}

//updates the DOM element 'character' aka gear that is equiped
function updateEquipment() {
    for (let key in chase.equipment) {
        createElement('li', key + ': ' + chase.equipment[key].name, 'character');
     } 
}

//Clears gameboard for next room
function clearBoard(clear) {
    console.log(clear);
    document.getElementById(clear[0]).remove();
}

//can be called to create a new html element on the home page
//htmlElement = html tag being created
//htmlText = the text to be place within the tag
//htmlId = the id to append the new element to ex. the id of <ul> if adding a <li> 
//classes = any class wanting to be added to the new html element being made
function createElement(htmlElement, htmlText, htmlId , classes, id) {
    //creating the html element
    const createElement = document.createElement(htmlElement);
    const createText = document.createTextNode(htmlText);
    const setId = document.getElementById(htmlId);

    //adding the element to the DOM
    createElement.appendChild(createText);
    setId.appendChild(createElement);

    //adding classes to the new element
    if (classes) {
        createElement.setAttribute('class', classes);
    }
    if (id) {
        createElement.setAttribute('id', id);
    }
    
    //testing purposes
    //console.log(createElement, createText, setId);
}

