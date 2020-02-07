function solve() {
    let button = document.getElementsByTagName('button')[0];
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    button.addEventListener('click', (e) => {
        let name = document.getElementsByTagName('input')[0].value;
        let firstLetter = name[0];
        let index = alphabet.indexOf(firstLetter.toLocaleLowerCase()) + 1;
        let place = document.getElementsByTagName('li')[index - 1];
        
        let fixedName = '';
        fixedName += name[0].toUpperCase();
        for (let i = 1; i < name.length; i++) {
            fixedName += name[i].toLowerCase();
        }

        if(place.textContent == '') {
            place.textContent = fixedName;
        }
        else {
            place.textContent += ', ';
            place.textContent += fixedName;
        }

        document.getElementsByTagName('input')[0].value = '';
    });
}