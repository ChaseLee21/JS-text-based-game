
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

function loot(enemy) {
    const result = roll(enemy.loot.lootChance); 
    if (result) chase.inventory.push(enemy.loot)
    updateInventory();
}

function roll(chance) {
    const diceRoll = Math.random();
    return (diceRoll < chance) ? true : false;
}