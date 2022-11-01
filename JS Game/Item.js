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

