
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
updateInventory() exists to update the DOM to show accurate player inventory
creates buttons for each item in the inventory to be able to equip items
*/
function updateInventory() {
    clearBoard(['inventory']);
    createElementDiv('inventoryDiv', 'inventory');
    for (let key of chase.inventory) {
        if(key.type === 1) {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).addEventListener('click', () => {
                equip(key);
            })
        } else if (key.type === 0) {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).setAttribute('disabled', '');
        }
    }
}


/* 
equip() exists to edit the players current equipment and current inventory
calls updateEquipment() and updateInventory() to update the DOM
*/

function equip(item) {
    if(item.type === 1) {
        chase.equipment.Weapon = item;
    }
    const index = inventoryArray.findIndex(element => {
        return element.name === item.name
    })
    inventoryArray.splice(index, 1);
    updateEquipment();
    updateInventory();
}


/*
Updates the DOM to show accurate player equipment
*/
function updateEquipment() {
    clearBoard(['character']);
    createElementDiv('characterDiv', 'character');
    for (let key in chase.equipment) {
        createElementText('character', '', 'div', key + ': ' + chase.equipment[key].name);
     } 
}