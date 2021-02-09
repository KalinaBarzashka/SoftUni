function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   let xhr = new XMLHttpRequest();
   
   xhr.addEventListener('readystatechange', maikati);
   xhr.open("GET", url);
   xhr.send();

   function maikati() {
      if(xhr.readyState == 4 && xhr.status == 200) {
         let id = document.querySelector("#res");
         id.textContent = xhr.responseText;
      }
   }
}