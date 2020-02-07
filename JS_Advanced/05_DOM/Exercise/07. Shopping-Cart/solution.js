function solve() {
   let cart = new Set();
   let amount = 0;
   let textArea = document.getElementsByTagName('textarea')[0];
   textArea.value = '';
   textArea.disabled = false;
   
   let buttonsAdd = Array.from(document.getElementsByClassName('add-product')).map((x) => {
      x.addEventListener('click', (e) => {
         let currentSection= e.target.parentNode.parentNode;
         let title = currentSection.getElementsByClassName('product-title')[0];
         let price = currentSection.getElementsByClassName('product-line-price')[0];
         
         cart.add(title.textContent);
         amount += Number(price.textContent);
         textArea.value += `Added ${title.textContent} for ${price.textContent} to the cart.\n`;
      });
   });

   let checkoutButton = document.getElementsByClassName('checkout')[0].addEventListener('click', (e) => {
      textArea.disabled = true;
      textArea.value += `You bought ${Array.from(cart).join(', ')} for ${amount.toFixed(2)}.`;
      e.target.disabled = true;
      let buttonsToDisable = Array.from(document.getElementsByClassName('add-product')).map((x) => {
         x.disabled = true;
      });
   });
}