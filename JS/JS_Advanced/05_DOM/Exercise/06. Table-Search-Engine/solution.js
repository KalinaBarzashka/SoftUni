function solve() {
   let button = document.getElementById('searchBtn');
   let inputField = document.getElementById('searchField');
   button.addEventListener('click', (e) => {
      let searchedString = inputField.value;
      let tbody = document.getElementsByTagName('tbody')[0];
      let trs = tbody.querySelectorAll('tr');

      for (let i = 0; i < trs.length; i++) {
         if(trs[i].hasAttribute('class')) {
            trs[i].removeAttribute('class');
         }
         
      }

      for (let i = 0; i < trs.length; i++) {
         let tds = trs[i].getElementsByTagName("td");
         let highLight = false;
         for (let j = 0; j < tds.length; j++) {
            const textInTd = tds[j].textContent;
            if(textInTd.includes(searchedString)) {
               highLight = true;
               break;
            }
         }

         if(highLight == true) {
            trs[i].setAttribute('class', 'select');
         }
      }

      inputField.value = "";
   });
}