function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let phonebookUl = document.getElementById('phonebook');

    loadBtn.addEventListener('click', function() {
        phonebookUl.innerHTML = '';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                for (const key in data) {
                    let li = document.createElement('li');
                    let btnDelete = document.createElement('button');
                    btnDelete.textContent = "Delete";
                    btnDelete.addEventListener('click', function() {
                        let delXhr = new XMLHttpRequest();
                        delXhr.onreadystatechange = function() {
                            if(delXhr.readyState == 4 && delXhr.status == 200) {
                                loadBtn.click();
                            }
                        }
                        delXhr.open("Delete", `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`);
                        delXhr.send();
                    });
                    li.innerHTML = `${data[key].person}: ${data[key].phone} `;
                    li.appendChild(btnDelete);
                    phonebookUl.appendChild(li);
                }
            }
        };
        xhr.open("GET", 'https://phonebook-nakov.firebaseio.com/phonebook.json');
        xhr.send();
    });

    createBtn.addEventListener('click', function() {
        let personData = document.getElementById('person');
        let phoneData = document.getElementById('phone');
        let objForPostRequest = {
            "person": personData.value,
            "phone": phoneData.value
        };

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

        };
        xhr.open("POST", 'https://phonebook-nakov.firebaseio.com/phonebook.json');
        xhr.send(JSON.stringify(objForPostRequest));

        personData.value = '';
        phoneData.value = '';
        loadBtn.click();
    });
}

attachEvents();