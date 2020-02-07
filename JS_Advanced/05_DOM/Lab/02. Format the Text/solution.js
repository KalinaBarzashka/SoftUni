function solve() {
  let startingP = document.getElementById('input').textContent + " ";
  let array = startingP.split(". ");
  var filteredArray = array.filter(function (el) {
    return el != "";
  });

  let output = document.getElementById('output');
  debugger;
  for (let i = 0; i < filteredArray.length; i+=3) {
    let p = document.createElement('p');
    let firstElement = filteredArray[i] + ". ";
    let secondElement = "";
    let thirdElement = "";

    if(i + 1 < filteredArray.length) {
      secondElement = filteredArray[i + 1] + ". ";

      if(i + 2 < filteredArray.length) {
        thirdElement = filteredArray[i + 2] + ". ";
      }
    }

    p.textContent = firstElement + secondElement + thirdElement;
    output.appendChild(p);
  }
}