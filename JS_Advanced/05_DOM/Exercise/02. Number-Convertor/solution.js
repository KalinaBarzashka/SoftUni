function solve() {
    let menu = document.getElementById('selectMenuTo');
    //add option Binary
    let optionOne = document.createElement('option');
    optionOne.appendChild(document.createTextNode('Binary'));
    optionOne.setAttribute("value", "binary");
    menu.appendChild(optionOne);

    //add option Hexadecimal
    let optionTwo = document.createElement('option');
    optionTwo.appendChild(document.createTextNode('Hexadecimal'));
    optionTwo.setAttribute("value", "hexadecimal");
    menu.appendChild(optionTwo);

    //get button
    let button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', (e) => {
        let inputNumber = document.getElementById('input').value;
        let resultField = document.getElementById('result');
        let convertToMenu = document.getElementById('selectMenuTo');
        let selectedOption = convertToMenu.options[convertToMenu.selectedIndex].value;
        
        //convert
        if(selectedOption == 'binary') {
            var binary = parseInt(inputNumber, 10);
            let result = binary.toString(2);
            resultField.value = result;
        }
        else if(selectedOption == 'hexadecimal') {
            let hex = '';
            let reminder = 0;
            while(true) {
                let num = inputNumber;
                inputNumber = Math.floor(inputNumber / 16);
                reminder = num - (16 * inputNumber);

                if(reminder == 10) {
                    reminder = 'A';
                }
                else if(reminder == 11) {
                    reminder = 'B';
                }
                else if(reminder == 12) {
                    reminder = 'C';
                }
                else if(reminder == 13) {
                    reminder = 'D';
                }
                else if(reminder == 14) {
                    reminder = 'E';
                }
                else if(reminder == 15) {
                    reminder = 'F';
                }

                hex += reminder;

                if(inputNumber == 0) {
                    break;
                }
            }

            let result = '';
            for (let i = hex.length - 1; i >= 0; i--) {
                result += hex[i];                
            }
            resultField.value = result;
        }
    });
}