function getInfo() {
    //clear data
    let buses = document.getElementById('buses');
    let stopName = document.getElementById('stopName');
    buses.textContent = '';
    stopName.textContent = '';

    let stopId = document.getElementById('stopId').value;
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            //display data
            let data = JSON.parse(xhr.responseText);
            stopName.textContent = data.name;

            
            for (const key in data.buses) {
                let li = document.createElement('li');
                li.textContent = `Bus ${key} arrives in ${data.buses[key]}`;
                buses.appendChild(li);
            }
        }
        else if(xhr.readyState == 4 && xhr.status != 200) {
            stopName.textContent = 'Error';
        }
    };
    xhr.open("GET", `https://judgetests.firebaseio.com/businfo/${stopId}.json`);
    xhr.send();
}