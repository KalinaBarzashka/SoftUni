let divEl = document.getElementById('card-template').innerHTML;
let template = Handlebars.compile(divEl);
let pageDivEl = document.getElementById('contacts');

for (const key in contacts) {
  pageDivEl.innerHTML += template(contacts[key]);
}

function showDetails(id) {
  //get div with the given id
  let div = document.getElementById(id);
  //toggle style display
  if(div.style.display == 'none') {
    div.style.display = 'block';
  } else {
    div.style.display = 'none'
  }
}