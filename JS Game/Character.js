// Character constructor
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

//updates the Dom element 'status'
function updateStatus() {
    clearBoard(['status']);

    createElementDiv('statusDIV', 'status', 'card-text');
    createElementText('status', '', 'div', 'Health: ' + chase.health, 'fs-2');
    createElementText('status', '', 'div', 
    'Armor: ' + (chase.equipment.Boots.armor + chase.equipment.Chest.armor + chase.equipment.Helm.armor), 
    'fs-2');
}

//updates the DOM element 'inventory'
//TODO add a remove method 
function updateInventory() {
    for (let key of chase.inventory) {
        createElementText('inventory', '', 'div', key.name);
    }
}

//updates the DOM element 'character' aka gear that is equiped
//TODO add a remove method
function updateEquipment() {
    for (let key in chase.equipment) {
        createElementText('character', '', 'div', key + ': ' + chase.equipment[key].name);
     } 
}