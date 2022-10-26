function attackEnemy(enemyHealth, enemyArmor) {
    let damage = chase.equipment.Weapon.damage;
    enemyHealth -= (damage - enemyArmor);
}

//TODO function that updates the DOM 
//should update enemy health after an attack
//will be called in attackEnemy() 
function updateEnemyHealth() {

}