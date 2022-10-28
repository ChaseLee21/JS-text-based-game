
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
initializeStatus() used to initalize the DOM with starting player stats 
TODO make two seperate functions, 1 that initializes the player DOM and another that updates it
*/
function initializeStatus() {
    clearBoard(['status']);
    document.getElementById('playerName').innerHTML = player.name;
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
determines the type of item in the inventory & creates buttons for each item
these buttons call functions located in the items || potions class 
*/
function updateInventory() {
    clearBoard(['inventory']);
    createElementDiv('inventoryDiv', 'inventory');
    for (let key of player.inventory) {
        if (key.disabled === true) {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).setAttribute('disabled', '');
        }
        else if(key.type !== 'nothing' && key.type !== 'potion') {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).addEventListener('click', () => {
                equip(key);
            })
        } else if (key.type === 'potion') {
            createElementButton('inventory', key.name, key.name, 'btn-secondary');
            document.getElementById(key.name).addEventListener('click', () => {
                usePotion(key);
            })
        } else {
            alert('the item in player inventory has experienced an error');
        }
    }
}

/* 
removeItem is used to find the item in the players inventory and delete it from the array
it then calls updateIventory() to update the DOM
*/

function removeItem(item) {
    const index = inventoryArray.findIndex(element => {
        return element.name === item.name
    })
    console.log(item, index);
    inventoryArray.splice(index, 1);
    updateInventory();
}