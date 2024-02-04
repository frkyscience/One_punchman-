function search() {
    var text = document.getElementById('search_hero').value.toLowerCase();
    const tr = document.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        const heroName = tr[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        if (heroName.includes(text)) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

document.getElementById('search_hero').addEventListener('input', search);


// elo system
document.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');
    const eloFilter = document.getElementById('eloFilter');

    eloFilter.addEventListener('input', function () {
        const minElo = parseInt(eloFilter.value);

        rows.forEach(row => {
            const elo = parseInt(row.children[2].textContent);
            if (elo >= minElo || !minElo) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('table');
    let rows = table.querySelectorAll('tbody tr');
    const eloFilter = document.getElementById('eloFilter');
    const heroes = [];

    function initializeHeroes() {
        rows.forEach(row => {
            const hero = {
                element: row,
                elo: parseInt(row.querySelector('.elo').textContent)
            };
            heroes.push(hero);
        });
    }

    function updateLeaderboard() {
        heroes.sort((a, b) => b.elo - a.elo);
        heroes.forEach((hero, index) => {
            hero.element.querySelector('.rank').textContent = index + 1;
            table.querySelector('tbody').appendChild(hero.element);
        });
    }

    initializeHeroes();

    eloFilter.addEventListener('input', function () {
        const minElo = parseInt(eloFilter.value);

        rows.forEach(row => {
            const elo = parseInt(row.querySelector('.elo').textContent);
            if (elo >= minElo || !minElo) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    eloFilter.addEventListener('change', updateLeaderboard);
});

// voting system
        function vote(row) {

            var currentCount = parseInt(document.getElementById('voteCount_' + row).innerText);
            document.getElementById('voteCount_' + row).innerText = currentCount + 1;
            
            document.getElementById('voteButton_' + row).disabled = true;
        }