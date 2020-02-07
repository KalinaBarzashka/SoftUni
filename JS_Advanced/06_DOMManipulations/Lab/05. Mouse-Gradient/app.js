function attachGradientEvents() {
    let resultField = document.getElementById('result');
    let box = document.getElementById('gradient-box');
    box.addEventListener('mousemove', displayXY);

    function displayXY(e) {
        let x = Number(e.offsetX);
        resultField.textContent = Math.floor((x / 300) * 100) + '%';
    }
}