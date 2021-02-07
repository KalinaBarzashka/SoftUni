function attachEvents() {
    let loadBtn = document.querySelector('.load');
    let addBtn = document.querySelector('.add');
    let updateBtn = document.querySelector('.update');
    let deleteBtn = document.querySelector('.delete');

    let catchesContainer = document.querySelector('#catches');

    loadBtn.addEventListener('click', loadAllCatches);
    addBtn.addEventListener('click', addCatche);

    function loadAllCatches() {
        catchesContainer.innerHTML = '';
        url = 'https://fisher-game.firebaseio.com/catches.json';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                let data = JSON.parse(xhr.responseText);

                for (const key in data) {
                    //create main div
                    let mainDiv = document.createElement('div');
                    mainDiv.className = 'catch';
                    mainDiv.setAttribute('data-id', key);

                    let hr = document.createElement('hr');
                    //angler
                    let label1 = document.createElement('label');
                    label1.innerHTML = 'Angler';
                    let input1 = document.createElement('input');
                    input1.type = "text";
                    input1.className = "angler";
                    input1.value = `${data[key].angler}`;
                    mainDiv.appendChild(label1);
                    mainDiv.appendChild(input1);
                    mainDiv.appendChild(hr);
                    //weight
                    let label2 = document.createElement('label');
                    label2.innerHTML = 'Weight';
                    let input2 = document.createElement('input');
                    input2.type = "number";
                    input2.className = "weight";
                    input2.value = `${data[key].weight}`;
                    mainDiv.appendChild(label2);
                    mainDiv.appendChild(input2);
                    mainDiv.appendChild(hr);
                    //species
                    let label3 = document.createElement('label');
                    label3.innerHTML = 'Species';
                    let input3 = document.createElement('input');
                    input3.type = "text";
                    input3.className = "species";
                    input3.value = `${data[key].species}`;
                    mainDiv.appendChild(label3);
                    mainDiv.appendChild(input3);
                    mainDiv.appendChild(hr);
                    //location
                    let label4 = document.createElement('label');
                    label4.innerHTML = 'Location';
                    let input4 = document.createElement('input');
                    input4.type = "text";
                    input4.className = "location";
                    input4.value = `${data[key].location}`;
                    mainDiv.appendChild(label4);
                    mainDiv.appendChild(input4);
                    mainDiv.appendChild(hr);
                    //bait
                    let label5 = document.createElement('label');
                    label5.innerHTML = 'Bait';
                    let input5 = document.createElement('input');
                    input5.type = "text";
                    input5.className = "bait";
                    input5.value = `${data[key].bait}`;
                    mainDiv.appendChild(label5);
                    mainDiv.appendChild(input5);
                    mainDiv.appendChild(hr);
                    //capture time
                    let label6 = document.createElement('label');
                    label6.innerHTML = 'Capture Time';
                    let input6 = document.createElement('input');
                    input6.type = "number";
                    input6.className = "captureTime";
                    input6.value = `${data[key].captureTime}`;
                    mainDiv.appendChild(label6);
                    mainDiv.appendChild(input6);
                    mainDiv.appendChild(hr);
                    //buttons
                    let buttonUpdate = document.createElement('button');
                    buttonUpdate.className = "update";
                    buttonUpdate.innerText = "Update";
                    let buttonDelete = document.createElement('button');
                    buttonDelete.className = "delete";
                    buttonDelete.innerText = "Delete";

                    //add function to update button
                    buttonUpdate.addEventListener('click', function () {
                        let endpoint = `https://fisher-game.firebaseio.com/catches/${key}.json`;

                        let objToUpdate = JSON.stringify({
                            "angler": input1.value,
                            "weight": input2.value,
                            "species": input3.value,
                            "location": input4.value,
                            "bait": input5.value,
                            "captureTime": input6.value
                        });

                        let xhrUpdate = new XMLHttpRequest();
                        xhrUpdate.onreadystatechange = function() {
                            if (xhr.status != 200 && xhr.readyState == 4) {
                                console.log("error");
                            }
                        };

                        xhrUpdate.open("PUT", endpoint);
                        xhrUpdate.send(objToUpdate);
                    });

                    //add function to delete button
                    buttonDelete.addEventListener('click', function() {
                        let endpoint = `https://fisher-game.firebaseio.com/catches/${key}.json`;
                        let xhrDelete = new XMLHttpRequest();
                        xhrDelete.onreadystatechange = function() {
                            if(xhrDelete.status == 200 && xhrDelete.readyState == 4) {
                                catchesContainer.removeChild(mainDiv);
                            }
                        };
                        xhrDelete.open("DELETE", endpoint);
                        xhrDelete.send();
                    });

                    mainDiv.appendChild(buttonUpdate);
                    mainDiv.appendChild(buttonDelete);

                    catchesContainer.appendChild(mainDiv);
                }
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    function addCatche() {
        let angler = document.querySelector("#addForm > input.angler");
        let weight = document.querySelector("#addForm > input.weight");
        let species = document.querySelector("#addForm > input.species");
        let location = document.querySelector("#addForm > input.location");
        let bait = document.querySelector("#addForm > input.bait");
        let captureTime =document.querySelector("#addForm > input.captureTime");

        let endpoint = 'https://fisher-game.firebaseio.com/catches.json';
        let objToAdd = JSON.stringify({
            "angler": angler.value,
            "bait": bait.value,
            "captureTime": captureTime.value,
            "location": location.value,
            "species": species.value,
            "weight": weight.value
        });

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                angler.value = '';
                bait.value = '';
                captureTime.value = '';
                location.value = '';
                species.value = '';
                weight.value = '';
                loadAllCatches();
            }
        };
        xhr.open("POST", endpoint);
        xhr.send(objToAdd);
    }
}

attachEvents();