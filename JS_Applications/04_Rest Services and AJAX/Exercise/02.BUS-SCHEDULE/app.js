function solve() {
    let idForGetRequest = 'depot';
    let infoBox = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let currentStop = '';

    function depart() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                let nameOfBusStop = `Next stop ${data.name}`;
                currentStop = data.name;
                infoBox.textContent = nameOfBusStop;
                idForGetRequest = data.next;

                //disable depart button
                departBtn.disabled = true;
                //enble arrive button
                arriveBtn.disabled = false;

            } else if(xhr.readyState == 4 && xhr.status != 200) {
                infoBox.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true; 
            }
        };
        xhr.open("GET", `https://judgetests.firebaseio.com/schedule/${idForGetRequest}.json`);
        xhr.send();
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${currentStop}`;
        //disable arrive button
        arriveBtn.disabled = true;
        //enable depart button
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();