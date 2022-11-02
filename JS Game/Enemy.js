
/* 
creates new Enemy object to be called in enemiesArray[]
do not call this class in combatArray[] because it is designed
to be cloned into the combatArray[] from the enemiesArray[]
*/
class Enemy {
    constructor(name, health, armor, damage, loot, alive) {
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.damage = damage;
        this.loot = loot;
        if (alive) {
            this.alive = alive;
        }
        else
            this.alive = true;
    }
}

/* 
attackEnemy(id) is called on click from the attack button
this function only calculates damage it does not update the DOM
after damage calculation checks to see if enemy is dead and updates enemy.alive if it is dead
*/
function attackEnemy(id) {
    let enemy = combatArray.find(element => element.id === id);
    let damage = player.equipment.Weapon.damage;
    enemy.health -= (damage - enemy.armor);
    if (enemy.health <= 0) {
        enemy.alive = false;
        log(player.name + ' killed ' + enemy.name);
        loot(enemy);
    } else {
        log(player.name + ' hit ' + enemy.name + ' for ' + (damage - enemy.armor) + ' health')
    }
    updateEnemies(id, enemy);
}

/* 
called after an attack is made on the enemy
this function will be the enemies 'turn'
updates the players health afterwards
*/
function enemyAttack(id) {
    let enemy = combatArray.find(element => element.id === id);
    let damage = (enemy.damage - player.armor);
    if (damage > 0) {
        log(enemy.name + ' hit ' + player.name + ' for ' + damage + ' health')
        player.health -= damage;
    }
    updateStatus();
}

/* 
gets called from within attackEnemy()
exists to update the DOM to show accurate health 
*/
async function updateEnemies(id, enemy) {
    const name = enemy.name.replace(' ', '') + enemy.id;
    const health = document.getElementById(name + 'Health');
    const armor = document.getElementById(name + 'Armor');
    const attackBtn = document.getElementById(name + 'Attack');
    console.log(health, armor, attackBtn, id, enemy);
    if(enemy.health <= 0) {
        health.innerHTML = 'Dead';
        armor.innerHTML = '';
        attackBtn.remove();
    } else if (enemy.name === 'Chest') {
        const chest = document.getElementById(enemy.name + 0 + 'open');
        chest.setAttribute('disabled', '');
        chest.innerHTML = 'Opened';
    } else {
        health.innerHTML = 'Health: ' + enemy.health;
        armor.innerHTML = 'Armor: ' + enemy.armor;
        enemyAttack(id);
    }
    updateActions();
}

/* 
createEnemies() is called when a new room is entered
exists to update the DOM with the new enemies
also will show chests if chests are in the new room
*/
function createEnemies() {
    clearBoard(['enemiesDIV']);
    createElementDiv('enemiesBoard', 'enemiesDIV', 'row row-cols-3 d-flex justify-content-center');
    for (let i = 0; i < combatArray.length; i++) {
        let enemy = combatArray[i];
        enemy.id = i;
        let name = enemy.name.replace(' ', '') + enemy.id;
        if (enemy.name === 'Chest') {
            const card = createEnemyCard(enemy);
            createElementButton(card, name + 'open', 'Open', 'btn-primary');
            document.getElementById(name + 'open').addEventListener('click', () => { openChest(enemy) });
        } else if (enemy.health === 0) {
            const card = createEnemyCard(enemy);
            createElementText(card, '', 'div', 'Dead', 'fs-4');
        } else {
            const card = createEnemyCard(enemy);
            createElementText(card, name + 'Health', 'div', 'Health: ' + enemy.health, 'fs-4');
            createElementText(card, name + 'Armor', 'div', 'Armor: ' + enemy.armor, 'fs-4');
            createElementButton(card, name + 'Attack', 'Attack', 'btn-primary')
            document.getElementById(name + 'Attack').addEventListener('click', () => { attackEnemy(enemy.id) });
        }
    }
}

/* 
create a function that does the following
    creates a bootstrap card
    updates the DOM to show this card
    returns the id of the body of the card
*/

function createEnemyCard(enemy) {
    let name = enemy.name.replace(' ', '') + enemy.id;
    createElementDiv('enemiesDIV', 'col' + name, 'col d-flex justify-content-center');
    createElementDiv('col' + name, 'enemy' + name, 'card m-4 text-dark d-flex justify-content-center', 'width: 18rem');
    createElementText('enemy' + name, 'cardTitle' + name, 'h1', enemy.name, 'card-header');
    createElementDiv('cardTitle' + name, 'cardBody' + name);
    createElementDiv('cardBody' + name, 'enemies' + name, 'card-body');
    return 'cardBody' + name;
}

/* 
loot(enemy) exists to add an item to the players inventory if it drops
determines if that item is already in the players inventory and if it is it adds 1 to the quantity of that item
*/

function loot(enemy) {
    let result, existingItem;
    for (let loot of enemy.loot){
        result  = roll(loot.lootChance);

        existingItem = player.inventory.find((obj) => {
            return obj.name == loot.name;
        })

        if (result && existingItem) {
            existingItem.quantity += 1
            log(player.name + ' looted ' + enemy.loot.name + ' from ' + enemy.name);
        } else if (result) {
            player.inventory.push(structuredClone(loot))
            log(player.name + ' looted ' + enemy.loot.name + ' from ' + enemy.name);
        }
    }
    updateInventory();
}