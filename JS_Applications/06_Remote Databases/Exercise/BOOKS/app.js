function solve() {
  let tableBody = document.querySelector("body > table > tbody");
  let body = document.getElementsByTagName("body")[0];
  let loadBtn = document.getElementById('loadBooks');
  let createBtn = document.querySelector("body > form > button");
  let formEl = document.getElementsByTagName('form')[0];

  loadBtn.addEventListener('click', loadBooks);

  function loadBooks() {
    fetch('https://testapp-a2707.firebaseio.com/Books.json')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(response.status);
        }

        return response.json();
      }).then((data) => {
        tableBody.innerHTML = '';

        for (const key in data) {
          let author = data[key].author;
          let isbn = data[key].isbn;
          let title = data[key].title;

          let tr = document.createElement('tr'); //main element

          let tdAuthor = document.createElement('td');
          tdAuthor.textContent = author;

          let tdIsbn = document.createElement('td');
          tdIsbn.textContent = isbn;

          let tdTitle = document.createElement('td');
          tdTitle.textContent = title;

          let tdButtons = document.createElement('td');
          let buttonEdit = document.createElement('button');
          buttonEdit.innerText = 'Edit';
          buttonEdit.addEventListener('click', function () {
            formEl.style.display = 'none';
            let form = document.createElement('form');
            form.id = 'updateForm';
            let h3 = document.createElement('h3');
            h3.textContent = 'FORM';
            form.appendChild(h3);
            let labelTitle = document.createElement('label');
            labelTitle.textContent = 'TITLE';
            form.appendChild(labelTitle);
            let inputTitle = document.createElement('input');
            inputTitle.type = 'title';
            inputTitle.id = 'updateTitle';
            inputTitle.value = title;
            form.appendChild(inputTitle);
            let labelAuthor = document.createElement('label');
            labelAuthor.textContent = 'AUTHOR';
            form.appendChild(labelAuthor);
            let inputAuthor = document.createElement('input');
            inputAuthor.type = 'author';
            inputAuthor.id = 'updateAuthor';
            inputAuthor.value = author;
            form.appendChild(inputAuthor);
            let labelIsbn = document.createElement('label');
            labelIsbn.textContent = 'ISBN';
            form.appendChild(labelIsbn);
            let inputIsbn = document.createElement('input');
            inputIsbn.type = 'isbn';
            inputIsbn.id = 'updateIsbn';
            inputIsbn.value = isbn;
            form.appendChild(inputIsbn);
            let updateBtnForm = document.createElement('button');
            updateBtnForm.innerText = 'Update';
            updateBtnForm.addEventListener('click', function() {
              event.preventDefault();
              let updateTitle = document.getElementById('updateTitle');
              let updateAuthor = document.getElementById('updateAuthor');
              let updateIsbn = document.getElementById('updateIsbn');

              let endpoint = `https://testapp-a2707.firebaseio.com/Books/${key}.json`;
              let updatedData = {
                'title': updateTitle.value,
                'author': updateAuthor.value,
                'isbn': updateIsbn.value
              };
              fetch(endpoint, {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedData)
              }).then(() => {
                formEl.style.display = 'block';
                body.removeChild(document.getElementById('updateForm'));
                loadBooks();
              }).catch();
              
            });
            form.appendChild(updateBtnForm);
            body.appendChild(form);
          });
          let buttonDelete = document.createElement('button');
          buttonDelete.innerText = 'Delete';
          buttonDelete.addEventListener('click', function () {
            let url = `https://testapp-a2707.firebaseio.com/Books/${key}.json`;
            fetch(url, {
              method: 'delete',
              headers: { "Content-type":"application/json" }
            })
            .then(response => {
              if (response.status >= 400) {
                throw new Error(response.status);
              }
              return response.json();
            })
            .then(() => loadBooks());
          });

          //append to main elements
          tdButtons.appendChild(buttonEdit);
          tdButtons.appendChild(buttonDelete);
          tr.appendChild(tdTitle);
          tr.appendChild(tdAuthor);
          tr.appendChild(tdIsbn);
          tr.appendChild(tdButtons);
          tableBody.appendChild(tr);
        }
      }).catch(err => console.log(err));
  }

  createBtn.addEventListener('click', function () {
    event.preventDefault();
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let isbn = document.getElementById('isbn');

    let data = undefined;
    if(title.value != '' && author.value != '' && isbn.value != '') {
      data = {
        'title': title.value,
        'author': author.value,
        'isbn': isbn.value
      };

      title.value = '';
      author.value = '';
      isbn.value = '';
    } else {
      alert("Invalid data");
      return 0;
    }
    

    fetch('https://testapp-a2707.firebaseio.com/Books.json', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      if(response.status >= 400) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(() => {
      loadBooks();
    }).catch(err => console.log(err));;
  });
}

solve();