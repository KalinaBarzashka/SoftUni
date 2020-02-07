function notify(message) {
    let notificationPane = document.getElementById('notification');
    notificationPane.textContent = message;
    notificationPane.style.display = 'block';
    setTimeout(function () {
        notificationPane.style.display = 'none';
       },2000);
}