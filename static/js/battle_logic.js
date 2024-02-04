function battle(attackerName, defenderName) {
    let HPA = 500;
    let HPB = 500;

    while (HPA > 0 && HPB > 0) {
        let attackerAttack = Math.floor((Math.random() * 100) + 1);
        let attackerDefense = Math.floor((Math.random() * 20) + 1);
        let defenderAttack = Math.floor((Math.random() * 100) + 1);
        let defenderDefense = Math.floor((Math.random() * 20) + 1);

        console.log(`${attackerName} attacks with ${attackerAttack} and defends with ${attackerDefense}`);
        console.log(`${defenderName} attacks with ${defenderAttack} and defends with ${defenderDefense}`);
        console.log(`${HPA} Life of ${attackerName}`);
        console.log(`${HPB} Life of ${defenderName}`);

        let damageToDefender = Math.max(0, attackerAttack - defenderDefense);
        HPB -= damageToDefender;
        console.log(`${defenderName} lost ${damageToDefender} HP`);

        if (HPB <= 0) {
            console.log(`${defenderName} has been defeated!`);
            break;
        }

        let damageToAttacker = Math.max(0, defenderAttack - attackerDefense);
        HPA -= damageToAttacker;
        console.log(`${attackerName} lost ${damageToAttacker} HP`);

        if (HPA <= 0) {
            console.log(`${attackerName} has been defeated!`);
            break;
        }
    }
    let ELOwin = 0;
    let winner;
    if (HPA > HPB) {
        winner = attackerName;
        ELOwin = + 1;
    } else if (HPB > HPA) {
        winner = defenderName;
        ELOwin = 0;
    } else {
        winner = "Draw";
        ELOwin = 0.5;
    }

    if (winner === attackerName) {
        console.log(`${attackerName} wins with a value of ` + ELOwin);
    } else if (winner === defenderName) {
        console.log(`${defenderName} wins with a value of ` + ELOwin);
    } else {
        console.log("The battle ended in a draw with a value of " + ELOwin);
    }


}

battle('Playera', 'Playerb');
