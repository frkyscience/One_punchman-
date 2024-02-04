function updateElo(playerRating, eloChange) {
    return playerRating + eloChange;
}

function calculateEloChange(playerARating, playerBRating, result, k = 32) {
    const expectedScoreA = 1 / (1 + Math.pow(10, (playerBRating - playerARating) / 400));
    const expectedScoreB = 1 - expectedScoreA;

    let score;
    if (result === "win") {
        score = 1.0;
    } else if (result === "draw") {
        score = 0.5;
    } else if (result === "loss") {
        score = 0.0;
    } else {
        throw new Error("Invalid game result.");
    }

    const eloChangeA = Math.round(k * (score - expectedScoreA));
    const eloChangeB = Math.round(k * ((1 - score) - expectedScoreB));

    return [eloChangeA, eloChangeB];
}

function battle(attackerName, defenderName, elo_a, elo_b) {
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

        // Log HP before printing the next attack
        console.log(`${HPA} Life of ${attackerName}`);

        let damageToAttacker = Math.max(0, defenderAttack - attackerDefense);
        HPA -= damageToAttacker;
        console.log(`${attackerName} lost ${damageToAttacker} HP`);

        if (HPA <= 0) {
            console.log(`${attackerName} has been defeated!`);
            break;
        }

        // Log HP before printing the next attack
        console.log(`${HPB} Life of ${defenderName}`);
    }

    let winner;
    let eloWin;
    if (HPA > HPB) {
        winner = attackerName;
        eloWin = "win";
    } else if (HPB > HPA) {
        winner = defenderName;
        eloWin = "loss";
    } else {
        winner = "Draw";
        eloWin = "draw";
    }

    console.log(`The battle ended. Winner: ${winner}`);

    // Calculate Elo changes
    const [eloChangeA, eloChangeB] = calculateEloChange(elo_a, elo_b, eloWin);

    // Update Elo ratings
    const newRatingA = updateElo(elo_a, eloChangeA);
    const newRatingB = updateElo(elo_b, eloChangeB);

    console.log(`\nNew Elo for ${attackerName}: ${newRatingA}`);
    console.log(`\nNew Elo for ${defenderName}: ${newRatingB}`);
    document.querySelector(".elo-1").value = newRatingA;
    document.querySelector(".elo-2").value = newRatingB;
    document.querySelector(".name-1").value = attackerName;
    document.querySelector(".name-2").value = defenderName;
    document.querySelector(".winnerbattle").value = winner;
}


const elo_a = document.getElementById('elo_1').textContent;
const elo_b = document.getElementById('elo_2').textContent;
const player_a = document.getElementById('hero1').textContent;
const player_b = document.getElementById('hero2').textContent;

battle(player_a, player_b, parseInt(elo_a), parseInt(elo_b));