
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
    console.log(enemy.loot, enemy.loot.lootChance);
    chase.inventory.push(enemy.loot);
    updateInventory();
}