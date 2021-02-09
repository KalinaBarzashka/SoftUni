function addItem() {
    let inputField = document.getElementById('newItemText');
    let ul = document.getElementById('items');
    let li = document.createElement('li');
    li.textContent = inputField.value;
    ul.appendChild(li);
    inputField.value = '';
}