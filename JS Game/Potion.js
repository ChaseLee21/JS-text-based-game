/* 
This class makes the potion item that can drop from enemies
*/
class Potion {
    constructor(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

/* 
potion functions
*/

/* 
TODO create a function to be assigned to potions when they are used
should decide what type of potion it is
based on that decision it uses the potion and removes it from inventory
*/

function usePotion(potion) {
    console.log(potion);
}
