function addItem() {
    let inputField = document.getElementById('newText');
    let ul = document.getElementById('items');
    let li = document.createElement('li');
    let href = document.createElement('a');
    href.textContent = '[Delete]';
    href.href = '#';
    href.addEventListener('click', (e) => {
        let ulEvent = e.target.parentNode.parentNode;
        let li1 = e.target.parentNode;
        ulEvent.removeChild(li1);
    });
    li.textContent = inputField.value + " ";
    li.appendChild(href);
    ul.appendChild(li);

    inputField.value = '';
}