function solve() {
    let expressionOutput = document.getElementById('expressionOutput');
    let resultOutput = document.getElementById('resultOutput');

    let keys = Array.from(document.querySelectorAll('button')).map((x) => x.addEventListener('click', (e) => {
        if(e.target.innerHTML == 'C') {
            expressionOutput.innerHTML = '';
            resultOutput.innerHTML = '';
        }
        else if(e.target.innerHTML == '=') {
            let expression = expressionOutput.innerHTML.split(' ');
            let leftOperand = Number(expression[0]);
            let sign = expression[1];
            let rightOperand = Number(expression[2]);
            let result = 0;

            if(rightOperand == "") {
                result = NaN;
            }
            else {
                if(sign == '/') {
                    result = leftOperand / rightOperand;
                }
                else if(sign == 'x') {
                    result = leftOperand * rightOperand;
                    
                }
                else if(sign == '-') {
                    result = leftOperand - rightOperand;
                }
                else if(sign == '+') {
                    result = leftOperand + rightOperand;
                }
            }

            resultOutput.innerHTML = result;
        }
        else {
            if(e.target.innerHTML == '/' || e.target.innerHTML == 'x' || e.target.innerHTML == '-' || e.target.innerHTML == '+') {
                expressionOutput.innerHTML += ' ';
                expressionOutput.innerHTML += e.target.innerHTML;
                expressionOutput.innerHTML += ' ';
            }
            else {
                expressionOutput.innerHTML += e.target.innerHTML;
            }
            
        }
    }));
}