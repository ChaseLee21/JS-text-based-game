// Initializing Global Variables
let equipmentArray = [
    new Equipment('None', 0, 0),
    new Equipment('Torn Leather Boots', 3, 2),
    new Equipment('Cloth Robe', 2, 2)
]; //array of all equipment
let inventoryArray = [
    new Item('Torch', 0, 0),
    new Item('Copper Shortsword', 1, 2)
]; //array of all items 
let enemiesArray = [
    new Enemy('Unknown Body', 0, 0, 0)
]; //array of all enemies in game
let chase = new Character(100); 
let gameBoard = document.getElementById('gameBoard'); 
start();

// Character constructor
function Character(health) {
    this.health = health
    this.inventory = [inventoryArray[0]];
    this.equipment = {
        Helm: equipmentArray[0],
        Chest: equipmentArray[2],
        Boots: equipmentArray[1],
        Weapon: inventoryArray[1]
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
        gameBoardText = `
        You woke up in a cave wearing clothes you've never seen before. There is a fire going with a dead body lying next it.
        She doesn't appear to be someone you know but you don't remember much. You loot a Cooper Shortsword from her body and lit
        a torch from the fire.
        `,
        actions = [
            {htmlElement: 'button', htmlText: 'Go through hole', htmlId: 'actions', classes: 'btn btn-primary'}
        ],
        enemies = [enemiesArray[0]]
    );
    updateRoom(`Welcome to Chase's Game`);
    updateStatus();
}

//Updates the game board DOM
function updateGameBoard(gameBoardText, actions, enemies) {
    gameBoard.innerHTML = gameBoardText;
    actions.forEach(element => {
        createElement(element.htmlElement, element.htmlText, element.htmlId, element.classes);
    });
    for (let key of enemies) {
        updateEnemies(key.name, key.health);
    }

}

//updates the DOM element 'enemies'
function updateEnemies(name, health) {
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


//can be called to create a new html element on the home page
//htmlElement = html tag being created
//htmlText = the text to be place within the tag
//htmlId = the id to append the new element to ex. the id of <ul> if adding a <li> 
//classes = any class wanting to be added to the new html element being made
function createElement(htmlElement, htmlText, htmlId , classes) {
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
    
    //testing purposes
    console.log(createElement, createText, setId);
}

