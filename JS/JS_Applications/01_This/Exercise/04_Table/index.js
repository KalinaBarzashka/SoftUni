function solve(){
   let tableBody = document.querySelector('tbody');
   let tableRows = document.querySelectorAll('tbody tr');

   tableBody.addEventListener('click', function(e) {
      //let tr = e.target.closest('tr');
      let tr = e.target.parentNode;
      Array.from(tableRows).forEach(x => {
         if(x !== tr) {
            x.style.backgroundColor = "";
         }
         
      });
      
      tr.style.backgroundColor = tr.style.backgroundColor ? "" : "rgb(65, 63, 94)";
   });
}