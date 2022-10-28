
/* 
creates new equipment object called in itemArray[]
type
0 = none
1 = helm
2 = chest
3 = boots
*/

class Equipment {
    constructor(name, type, armor, lootChance) {
        this.name = name;
        this.type = type;
        this.armor = armor;
        this.lootChance = lootChance;
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