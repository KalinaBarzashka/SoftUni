function create(words) {
   let content = document.getElementById('content');

   for (let i = 0; i < words.length; i++) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = words[i];
      p.style.display = 'none';
      div.appendChild(p);

      div.addEventListener('click', (e) => {
         let child = e.currentTarget.getElementsByTagName('p')[0];
         child.style.display = 'block';
      });

      content.appendChild(div);
   }


}