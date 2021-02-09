function subtract() {
   let first = Number(document.getElementById('firstNumber').value);
   let second = Number(document.getElementById('secondNumber').value);
   let result = document.getElementById('result');
   result.textContent = first - second;
}