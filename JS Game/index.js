

//TODO
//add a combat system that rewards loot


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
]; //array of all rooms 

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
function Enemy(name, health, armor, damage) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.damage = damage;
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

//updates the Dom element 'status'
function updateStatus() {
    clearBoard(['status']);
    createElement('div', '', 'statusDIV', 'card-text', 'status');
    createElement('div', 'Health: ' + chase.health, 'status', 'fs-2');
    createElement('div', 
    'Armor: ' + (chase.equipment.Boots.armor + chase.equipment.Chest.armor + chase.equipment.Helm.armor), 
    'status', 'fs-2');
}

//updates the DOM element 'inventory'
//TODO add a remove method 
function updateInventory() {
    for (let key of chase.inventory) {
        createElement('li', key.name, 'inventory');
    }
}

//updates the DOM element 'character' aka gear that is equiped
//TODO add a remove method
function updateEquipment() {
    for (let key in chase.equipment) {
        createElement('li', key + ': ' + chase.equipment[key].name, 'character');
     } 
}


//can be called to create a new html element on the home page
//htmlElement = html tag being created
//htmlText = the text to be place within the tag
//htmlId = the id to append the new element to ex. the id of <ul> if adding a <li> 
//classes = any class wanting to be added to the new html element being made
function createElement(htmlElement, htmlText, htmlId , classes, id, style) {
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
    if (style) {
        createElement.setAttribute('style', style);
    }
    
    //testing purposes
    //console.log(createElement, createText, setId);
}
