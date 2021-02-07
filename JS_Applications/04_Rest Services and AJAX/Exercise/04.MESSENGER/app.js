function attachEvents() {
    let refreshBtn = document.getElementById('refresh');
    let sendBtn = document.getElementById('submit');
    let boxToDisplayMessage = document.querySelector("#messages");
    refreshBtn.addEventListener('click', getAllMessages);
    sendBtn.addEventListener('click', sendMessages);


    function getAllMessages() {
        boxToDisplayMessage.textContent = '';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                for (let key in data) {
                    boxToDisplayMessage.textContent += `${data[key].author}: ${data[key].content}\n`;
                }

                //boxToDisplayMessage.textContent.trim();
            }
        };

        xhr.open("GET", 'https://rest-messanger.firebaseio.com/messanger.json');
        xhr.send();
    }

    function sendMessages() {
        let authorName = document.getElementById('author');
        let msgText = document.getElementById('content');

        let postObj = {
            author: authorName.value,
            content: msgText.value,
        };

        authorName.value = "";
        msgText.value = "";

        let xhr = new XMLHttpRequest();
        xhr.open("POST", `https://rest-messanger.firebaseio.com/messanger.json`);
        xhr.send(JSON.stringify(postObj));

        getAllMessages();
    }
}

attachEvents();