function solve() {
   let resultOnClick = document.getElementById('result');
   let firstSpan = resultOnClick.getElementsByTagName('span')[0];
   let secondSpan = resultOnClick.getElementsByTagName('span')[2];
   let resultHistory = document.getElementById('history');

   let cards = Array.from(document.querySelectorAll('img')).map((x) => {
      x.addEventListener('click', (e) => {
         e.target.src = 'images/whiteCard.jpg';

         if(e.target.parentNode.id == 'player1Div') {
            firstSpan.textContent = e.target.name;
         }
         else {
            secondSpan.textContent = e.target.name;
         }

         if(firstSpan.textContent != '' && secondSpan.textContent != '') {
            let firstCard = document.getElementById('player1Div').querySelector(`img[name='${firstSpan.textContent}']`);
            let secondCard = document.getElementById('player2Div').querySelector(`img[name='${secondSpan.textContent}']`);

            if(Number(firstCard.name) > (secondCard.name)) {
               firstCard.style.border = '2px solid green';
               secondCard.style.border = '2px solid red';
            }
            else {
               secondCard.style.border = '2px solid green';
               firstCard.style.border = '2px solid red';
            }

            resultHistory.textContent += `[${firstSpan.textContent} vs ${secondSpan.textContent}] `;

            firstSpan.textContent = '';
            secondSpan.textContent = '';
         }
      });
   });
}