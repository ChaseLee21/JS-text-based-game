
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
    if (result) chase.inventory.push(enemy.loot)
    updateInventory();
}

/* 
roll(chance) exists to determine if an item drops or if it doesnt
*/

function roll(chance) {
    const diceRoll = Math.random();
    return (diceRoll < chance) ? true : false;
}