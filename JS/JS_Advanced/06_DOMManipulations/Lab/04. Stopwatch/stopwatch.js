function stopwatch() {
    let startButton = document.getElementById('startBtn');
    let stopButton = document.getElementById('stopBtn');
    let timer = document.getElementById('time');
    let seconds = 0;
    let interval = null;

    startButton.addEventListener('click', (e) => {
        startButton.disabled = true;
        stopButton.disabled = false;        
        timer.textContent = '00:00';

        let min = 0;
        
        //count timer
        interval = setInterval(function () {
            seconds++;
            if(seconds == 60) {
                seconds = 0;
                min++;
            }
            timer.textContent = `${(min < 10) ? '0' + min : min}:${(seconds < 10) ? '0' + seconds : seconds}`;
        }, 1000);
    });

    stopButton.addEventListener('click', (e) => {
        startButton.disabled = false;
        stopButton.disabled = true;

        //reset timer
        clearInterval(interval);
        seconds = 0;
    });
}