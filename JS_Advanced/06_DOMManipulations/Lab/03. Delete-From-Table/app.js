function deleteByEmail() {
    let inputField = document.querySelector('input[name="email"]');
    let table = document.getElementById('customers');
    let trs = document.querySelectorAll('#customers tbody tr');
    let resultField = document.getElementById('result');
    let match = false;

    for (let i = 0; i < trs.length; i++) {
        let eachTr = trs[i];
        let tds = eachTr.getElementsByTagName('td');
        
        for (let j = 0; j < tds.length; j++) {
            if(tds[j].textContent == inputField.value) {
                match = true;
                break;
            }
        }

        if(match == true) {
            table.deleteRow(i + 1);
            resultField.textContent = 'Deleted.';
            break;
        }
    }

    if(match == false) {
        resultField.textContent = 'Not found.';
    }

    inputField.value = '';
}