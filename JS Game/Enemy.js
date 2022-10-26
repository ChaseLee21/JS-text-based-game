// Enemy constructor 
class Enemy {
    constructor(name, health, armor, damage, alive) {
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.damage = damage;
        if (alive) {
            this.alive = alive;
        }
        else
            this.alive = true;
    }
}

function attackEnemy(id) {
    let enemy = combatArray.find(element => element.id === id);
    let damage = chase.equipment.Weapon.damage;
    enemy.health -= (damage - enemy.armor);
    console.log(enemy, enemy.health);
    updateEnemies(id, enemy);
}

// gets called from within attackEnemy()
// updates the DOM to show accurate health
function updateEnemies(id, enemy) {
    const health = document.getElementById(id + 'Health');
    const armor = document.getElementById(id + 'Armor');
    const attackBtn = document.getElementById(id + 'Attack');
    if(enemy.health <= 0) {
        health.innerHTML = 'Dead';
        armor.innerHTML = '';
        attackBtn.remove();
        enemy.alive = false;
    } else {
        health.innerHTML = 'Health: ' + enemy.health;
        armor.innerHTML = 'Armor: ' + enemy.armor;
    }
}

// Creates bootstrap card on the DOM for each enemy
// If enemy is dead shows name and 'dead'
// If enemy is alive shows name health armor and an attack button
// this function is only called in updateGameBoard()
// to update enemy health after card is created use updateEnemies() instead
function createEnemies() {
    clearBoard(['enemiesDIV']);
    for (let enemy of combatArray) {
        let i = 1;
        enemy.id = i;
        i++
        let name = enemy.name.replace(' ', '');
        console.log(enemy);
        if(enemy.health === 0) {
            createElementDiv('enemiesBoard', 'enemiesDIV', 'd-flex justify-content-center');
            createElementDiv('enemiesDIV', 'enemy' + name, 'card text-dark d-flex justify-content-center', 'width: 12rem');
            createElementText('enemy' + name, 'cardTitle' + name, 'h1', enemy.name, 'card-header');
            createElementDiv('cardTitle' + name, 'cardBody' + name, 'card-body');
            createElementDiv('cardBody' + name, 'enemies', 'card-body');
            createElementText('enemies', '', 'div', 'Dead', 'fs-4');
        } else {
            createElementDiv('enemiesBoard', 'enemiesDIV', 'd-flex justify-content-center');
            createElementDiv('enemiesDIV', 'enemy' + name, 'card text-dark d-flex justify-content-center', 'width: 12rem');
            createElementText('enemy' + name, 'cardTitle' + name, 'h1', enemy.name, 'card-header');
            createElementDiv('cardTitle' + name, 'cardBody' + name, 'card-body');
            createElementDiv('cardBody' + name, 'enemies', 'card-body');
            createElementText('enemies', enemy.id + 'Health', 'div', 'Health: ' + enemy.health, 'fs-4');
            createElementText('enemies', enemy.id + 'Armor', 'div', 'Armor: ' + enemy.armor, 'fs-4');
            createElementButton('enemies', enemy.id + 'Attack', 'Attack', 'btn-primary')
            document.getElementById(enemy.id + 'Attack').addEventListener('click', () => { attackEnemy(enemy.id) });
        }
    }
}