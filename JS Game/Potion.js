/* 
This class makes the potion item that can drop from enemies
*/
class Potion {
    constructor(name, type, value, lootChance) {
        this.name = name;
        this.type = 'potion';
        this.value = value;
        this.lootChance = lootChance
        this.potionType = type;
    }
}

/* 
potion functions
*/

/* 
usePotion() determines potion type and updates player stats based off type
*/

function usePotion(potion) {
    if(potion.potionType === 'health') {
        player.health += potion.value;    
        log(player.name + ' drank ' + potion.name + ' gaining ' + potion.potionType + ' health');
    }
    removeItem(potion);
    updateStatus();
}
