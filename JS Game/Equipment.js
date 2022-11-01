
/* 
creates new equipment object called in itemArray[]
type
helm
chest
boots
weapon
potion
*/

class Equipment {
    constructor(name, type, value, lootChance) {
        this.name = name;
        this.type = type;
        this.lootChance = lootChance;
        if (this.type === 'helm' || this.type === 'chest' || this.type === 'boots') {
            this.armor = value;
        } else if (this.type === 'weapon') {
            this.damage = value;
        } else if (this.type === 'potion') {
            this.value = value;
        } else {
            this.armor = 0
            this.damage = 0
            this.value = 0
        }
    }
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


/* 
usePotion() determines potion type and updates player stats based off type
*/

function usePotion(potion) {
    player.health += potion.value;    
    log(player.name + ' drank ' + potion.name + ' gaining ' + potion.value + ' health');
    removeItem(potion);
    updateStatus();
}

/* 
equip() exists to edit the players current equipment and current inventory
calls updateEquipment() and updateInventory() to update the DOM
*/

function equip(item) {
    let oldItem;
    if(item.type === 'weapon') {
        oldItem = player.equipment.Weapon;
        player.equipment.Weapon = item;
    }
    if(item.type === 'helm') {
        oldItem = player.equipment.Helm;
        player.equipment.Helm = item;
    }
    if(item.type === 'chest') {
        oldItem = player.equipment.Chest;
        player.equipment.Chest = item;
    }
    if(item.type === 'boots') {
        oldItem = player.equipment.Boots;
        player.equipment.Boots = item;
    } else {
        oldItem = item;
    }
    removeItem(item);
    log(player.name + ' equipped ' + item.name + ' destroying ' + oldItem.name + ' in the process');
    updateEquipment();
    updateStatus();
}