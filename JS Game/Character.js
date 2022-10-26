
/* 
class used to create the player character
should only be used once when initializing the game
*/

class Character {
    constructor(health) {
        this.name = 'chase';
        this.health = health;
        this.inventory = inventoryArray;
        this.equipment = {
            Helm: itemsArray[0],
            Chest: itemsArray[2],
            Boots: itemsArray[1],
            Weapon: itemsArray[4]
        };
        this.armor = 0;
    }
}

/* 
updateStatus() is used to update the DOM with accurate player stats 
ex. Health & Armor
TODO make two seperate functions, 1 that initializes the player DOM and another that updates it
*/
function updateStatus() {
    clearBoard(['status']);
    createElementDiv('statusDIV', 'status', 'card-text');
    createElementText('status', '', 'div', 'Health: ' + chase.health, 'fs-2');
    createElementText('status', '', 'div', 
    'Armor: ' + (chase.equipment.Boots.armor + chase.equipment.Chest.armor + chase.equipment.Helm.armor), 
    'fs-2');
}

/*
Updates the DOM to show accurate player inventory
*/
function updateInventory() {
    for (let key of chase.inventory) {
        createElementText('inventory', '', 'div', key.name);
    }
}

/*
Updates the DOM to show accurate player equipment
*/
function updateEquipment() {
    for (let key in chase.equipment) {
        createElementText('character', '', 'div', key + ': ' + chase.equipment[key].name);
     } 
}