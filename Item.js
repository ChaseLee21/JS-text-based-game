/* 
creates new item object called in itemArray[]
*/

class Item {
    constructor(name, lootChance, disabled) {
        this.name = name;
        this.lootChance = lootChance;
        if (disabled) this.disabled = true;
        else this.disabled - false;
    }
}

/* 
creates new Chest object called in enemiesArray[]
*/
class Chest {
    constructor(loot, locked) {
        this.name = 'Chest';
        this.loot = loot;
        if (locked) this.locked = true;
        else this.locked = false;
    }
}

/* 
openChest() exists to easily open chests without having to alter loot() and updateEnemies() too much
*/
function openChest (chest) {
    loot(chest);
    updateEnemies(0, chest);
}