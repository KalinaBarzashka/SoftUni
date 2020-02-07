function solve() {
  let input = document.getElementsByTagName('textarea')[0];
  let tbody = document.getElementsByTagName('tbody')[0];
  let boughtFurnitureNames = [];
  let totalPrice = 0;
  let decorationFactor = 0;

  let generateButton = document.getElementsByTagName('button')[0].addEventListener('click', (e) => {
    let array = JSON.parse(input.value);
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];

      //tr
      let tr = document.createElement('tr');
      //image
      let imgTd = document.createElement('td');
      let img = document.createElement('img');
      img.setAttribute('src', array[i]['img']);
      imgTd.appendChild(img);
      //name
      let nameTd = document.createElement('td');
      let nameP = document.createElement('p');
      nameP.innerHTML = array[i]['name'];
      nameTd.appendChild(nameP);
      //price
      let priceTd = document.createElement('td');
      let priceP = document.createElement('p');
      priceP.innerHTML = array[i]['price'];
      priceTd.appendChild(priceP);
      //decFactor
      let decFactorTd = document.createElement('td');
      let decFactorP = document.createElement('p');
      decFactorP.innerHTML = array[i]['decFactor'];
      decFactorTd.appendChild(decFactorP);
      //checkButton
      let buttonTd = document.createElement('td');
      let inputField = document.createElement('input');
      inputField.setAttribute('type', 'checkbox');
      buttonTd.appendChild(inputField);

      tr.appendChild(imgTd);
      tr.appendChild(nameTd);
      tr.appendChild(priceTd);
      tr.appendChild(decFactorTd);
      tr.appendChild(buttonTd);
      tbody.appendChild(tr);
    }

    let disButtons = Array.from(document.querySelectorAll('input[type=checkbox]')).map((x) => x.disabled = false);
  });

  let buyButton = document.getElementsByTagName('button')[1].addEventListener('click', (e) => {
    let resultField = document.querySelector("#exercise > textarea:nth-child(5)");
    resultField.disabled = false;

    let checkedButtons = Array.from(document.querySelectorAll('input[type=checkbox]')).map((x) => {
      if(x.checked == true) {
        boughtFurnitureNames.push(x.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        //add price
        totalPrice += Number(x.parentNode.previousElementSibling.previousElementSibling.textContent);
        //add adf
        decorationFactor += Number(x.parentNode.previousElementSibling.textContent);
      }
    });

    //display result
    resultField.value = `Bought furniture: ${boughtFurnitureNames.join(', ')}\n`;
    resultField.value += `Total price: ${totalPrice.toFixed(2)}\n`;
    resultField.value += `Average decoration factor: ${decorationFactor / boughtFurnitureNames.length}`;
  });
}