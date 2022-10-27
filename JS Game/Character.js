
/* 
class used to create the player character
should only be used once when initializing the game
*/

class Character {
    constructor(health) {
        this.name = 'placeholder';
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
    let damage = (enemy.damage - player.armor);
    //console.log(enemy.damage, player.armor, damage);
    if (damage > 0) player.health -= damage;
    updateStatus();
}

/* 
initializeStatus() used to initalize the DOM with starting player stats 
TODO make two seperate functions, 1 that initializes the player DOM and another that updates it
*/
function initializeStatus() {
    clearBoard(['status']);
    createElementDiv('statusDIV', 'status', 'card-text');
    createElementText('status', 'playerHealth', 'div', 'Health: ' + player.health, 'fs-2');
    createElementText('status', 'playerArmor', 'div', 
    'Armor: ' + (player.equipment.Boots.armor + player.equipment.Chest.armor + player.equipment.Helm.armor), 
    'fs-2');
    createElementText('status', 'playerDamage', 'div', 'Damage: ' + player.equipment.Weapon.damage, 'fs-2');
}

/* 
updateStatus() is used to update the DOM with accurate player stats 
ex. Health & Armor
*/
function updateStatus() {
    player.armor = (
        player.equipment.Helm.armor +
        player.equipment.Chest.armor +
        player.equipment.Boots.armor
    );
    document.getElementById('playerHealth').innerHTML = 'Health: ' + player.health;
    document.getElementById('playerArmor').innerHTML = 'Armor: ' + player.armor;
    document.getElementById('playerDamage').innerHTML = 'Damage: ' + player.equipment.Weapon.damage;

}

/*
updateInventory() exists to update the DOM to show accurate player inventory
creates buttons for each item in the inventory to be able to equip items
*/
function updateInventory() {
    clearBoard(['inventory']);
    createElementDiv('inventoryDiv', 'inventory');
    for (let key of player.inventory) {
        if(key.type !== 0) {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).addEventListener('click', () => {
                equip(key);
            })
        } else {
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
    let oldItem;
    if(item.type === 1) {
        oldItem = player.equipment.Weapon;
        player.equipment.Weapon = item;
    }
    if(item.type === 2) {
        oldItem = player.equipment.Helm;
        player.equipment.Helm = item;
    }
    if(item.type === 3) {
        oldItem = player.equipment.Chest;
        player.equipment.Chest = item;
    }
    if(item.type === 4) {
        oldItem = player.equipment.Boots;
        player.equipment.Boots = item;
    }
    const index = inventoryArray.findIndex(element => {
        return element.name === item.name
    })
    inventoryArray.splice(index, 1);
    log('player equipped ' + item.name + ' destroying ' + oldItem.name + ' in the process');
    updateEquipment();
    updateInventory();
    updateStatus();
}


/*
Updates the DOM to show accurate player equipment
*/
function updateEquipment() {
    clearBoard(['character']);
    createElementDiv('characterDiv', 'character');
    for (let key in player.equipment) {
        createElementText('character', '', 'div', key + ': ' + player.equipment[key].name);
     } 
}