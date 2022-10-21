// Initializing Global Variables
let chase = new Character(100, 0); 
let gameBoard = document.getElementById('gameBoard'); 
start();

// Character constructor
function Character(health, armor) {
    this.health = health
    this.armor = armor;
    this.inventory = ['Copper Shortsword', 'Torch'];
    this.equipment = {
        Helm: 'None',
        Chest: 'Cloth Robe',
        Boots: 'Torn Leather Boots'
    }
}

// starting the game 
function start() {
    initializeStatus();
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
        ]
    );
    updateRoom(`Welcome to Chase's Game`);
}

// updates the text of the game board
function updateGameBoard(gameBoardText, actions) {
    gameBoard.innerHTML = gameBoardText;
    new Enemy('Unknown Body', 0, 0, 0);
    actions.forEach(element => {
        createElement(element.htmlElement, element.htmlText, element.htmlId, element.classes);
    });
}

// Enemy constructor 
function Enemy(name, health, armor, damage) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.damage = damage;
    updateEnemies(name)
}

function updateEnemies(name) {
    createElement('li', name, 'enemies');
}

function updateRoom(text) {
    let roomTitle = document.getElementById('roomName');
    roomTitle.innerHTML = text;
}

function initializeStatus() {
    createElement('li', 'Health: ' + chase.health, 'status');
    createElement('li', 'Armor: ' + chase.armor, 'status');
}

function updateInventory() {
    for (let key of chase.inventory) {
        createElement('li', key, 'inventory');
    }
}

function updateEquipment() {
    for (let key in chase.equipment) {
        createElement('li', key + ': ' + chase.equipment[key], 'character');
    }
}

function createElement(htmlElement, htmlText, htmlId , classes) {
    const createElement = document.createElement(htmlElement);
    const createText = document.createTextNode(htmlText);
    createElement.appendChild(createText);
    const setId = document.getElementById(htmlId);
    setId.appendChild(createElement);
    if (classes) {
        createElement.setAttribute('class', classes);
    }
    
    console.log(createElement, createText, setId);
}

