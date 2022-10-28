
/* 
creates new item object called in itemArray[]
0 = misc
1 = weapon
*/


class Item {
    constructor(name, type, damage, lootChance) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.lootChance = lootChance;
    }
}

/* 
loot(enemy) exists to add an item to the players inventory if it drops
*/

function loot(enemy) {
    const result = roll(enemy.loot.lootChance); 
    //console.log(result)
    if (result) {
        player.inventory.push(enemy.loot)
        log(player.name + ' looted ' + enemy.loot.name + ' from ' + enemy.name);
    }
    
    
    
    updateInventory();
}

/* 
roll(chance) exists to determine if an item drops or if it doesnt
*/

function roll(chance) {
    const diceRoll = Math.random();
    //console.log(diceRoll, chance);
    return (diceRoll < chance) ? true : false;
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
    log(player.name + ' equipped ' + item.name + ' destroying ' + oldItem.name + ' in the process');
    updateEquipment();
    updateInventory();
    updateStatus();
}