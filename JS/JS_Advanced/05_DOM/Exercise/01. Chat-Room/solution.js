function solve() {
   let parentDiv = document.getElementById('chat_messages');
   let button = document.getElementById('send').addEventListener('click', (e) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'message my-message');
      let text = document.getElementById('chat_input');
      div.textContent = text.value;
      parentDiv.appendChild(div);
      text.value = "";
   });
}