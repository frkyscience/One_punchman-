document.addEventListener('DOMContentLoaded', function () {
    const reportForm = document.getElementById('reportForm');
    const popupMessage = document.getElementById('popupMessage');

    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();

        popupMessage.style.display = 'block';

        setTimeout(function () {
            popupMessage.style.display = 'none';
            reportForm.reset();

            window.location.href = '/leaderboard_fan';
        }, 2000);
    });
});