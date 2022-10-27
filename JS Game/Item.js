
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
        chase.inventory.push(enemy.loot)
        log('Chase looted ' + enemy.loot.name + ' from ' + enemy.name);
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