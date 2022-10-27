
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
        this.armor = (
            this.equipment.Helm.armor +
            this.equipment.Chest.armor +
            this.equipment.Boots.armor
        );
    }
}



/* 
called after an attack is made on the enemy
this function will be the enemies 'turn'
updates the players health afterwards
*/
function enemyAttack(id) {
    let enemy = combatArray.find(element => element.id === id);
    let damage = (enemy.damage - chase.armor);
    //console.log(enemy.damage, chase.armor, damage);
    if (damage > 0) chase.health -= damage;
    updateStatus();
}

/* 
initializeStatus() used to initalize the DOM with starting player stats 
TODO make two seperate functions, 1 that initializes the player DOM and another that updates it
*/
function initializeStatus() {
    clearBoard(['status']);
    createElementDiv('statusDIV', 'status', 'card-text');
    createElementText('status', 'playerHealth', 'div', 'Health: ' + chase.health, 'fs-2');
    createElementText('status', 'playerArmor', 'div', 
    'Armor: ' + (chase.equipment.Boots.armor + chase.equipment.Chest.armor + chase.equipment.Helm.armor), 
    'fs-2');
}

/* 
updateStatus() is used to update the DOM with accurate player stats 
ex. Health & Armor
*/
function updateStatus() {
    document.getElementById('playerHealth').innerHTML = 'Health: ' + chase.health;
    document.getElementById('playerArmor').innerHTML = 'Armor: ' + chase.armor;
}

/*
Updates the DOM to show accurate player inventory
*/
function updateInventory() {
    clearBoard(['inventory']);
    createElementDiv('inventoryDiv', 'inventory');
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