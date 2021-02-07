function solve() {
  let body = document.getElementsByTagName('body')[0];
  let table = document.getElementById('results');
  let tbody = table.tBodies[0];
  onLoad();
  addForm();

  //functions
  function onLoad() {
    tbody.innerText = '';
    //fetch results from DB
    let endpoint = 'https://testapp-a2707.firebaseio.com/students.json';
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        let data = JSON.parse(xhr.responseText);
        //data.sort((a,b) => a.id-b.id);
        for (const key in data) {
          if (data[key] == null) {
            continue;
          }
          let tr = document.createElement('tr'); //main element
          //get data
          let id = data[key]["ID"];
          let firstName = data[key]["First Name"];
          let lastName = data[key]["Last Name"];
          let fn = data[key]["Faculty Number"];
          let grade = data[key]["Grade"];

          //create elements and append to main parent element
          let tdID = document.createElement('td');
          tdID.textContent = id;
          tr.appendChild(tdID);

          let tdFirstName = document.createElement('td');
          tdFirstName.textContent = firstName;
          tr.appendChild(tdFirstName);

          let tdLastName = document.createElement('td');
          tdLastName.textContent = lastName;
          tr.appendChild(tdLastName);

          let tdFn = document.createElement('td');
          tdFn.textContent = fn;
          tr.appendChild(tdFn);

          let tdGrade = document.createElement('td');
          tdGrade.textContent = grade;
          tr.appendChild(tdGrade);

          tbody.appendChild(tr);
        }

      }
    };
    xhr.open("GET", endpoint);
    xhr.send();
  };

  function addForm() {
    //create form for adding students
    let form = document.createElement('form');
    form.id = 'form';
    let h3 = document.createElement('h3');
    h3.textContent = 'FORM';
    form.appendChild(h3);

    //first name
    let labelFirstName = document.createElement('label');
    labelFirstName.textContent = 'First Name';
    form.appendChild(labelFirstName);

    let inputFirstName = document.createElement('input');
    inputFirstName.type = 'text';
    inputFirstName.id = 'firstName';
    inputFirstName.placeholder = 'First name...';
    form.appendChild(inputFirstName);

    //last name
    let labelLastName = document.createElement('label');
    labelLastName.textContent = 'Last Name';
    form.appendChild(labelLastName);

    let inputLastName = document.createElement('input');
    inputLastName.type = 'text';
    inputLastName.id = 'lastName';
    inputLastName.placeholder = 'Last name...';
    form.appendChild(inputLastName);

    //faculty number
    let labelFacultyNumber = document.createElement('label');
    labelFacultyNumber.textContent = 'Faculty Number';
    form.appendChild(labelFacultyNumber);

    let inputFacultyNumber = document.createElement('input');
    inputFacultyNumber.type = 'text';
    inputFacultyNumber.id = 'fn';
    inputFacultyNumber.placeholder = 'Faculty number...';
    form.appendChild(inputFacultyNumber);

    //grade
    let labelGrade = document.createElement('label');
    labelGrade.textContent = 'Grade';
    form.appendChild(labelGrade);

    let inputGrade = document.createElement('input');
    inputGrade.type = 'text';
    inputGrade.id = 'grade';
    inputGrade.placeholder = 'Grade...';
    form.appendChild(inputGrade);

    //button add
    let addBtn = document.createElement('button');
    addBtn.innerText = 'Add Student';
    addBtn.addEventListener('click', function () {
      event.preventDefault();
      let studentId = 0;
      let url = 'https://testapp-a2707.firebaseio.com/students.json';
      fetch(url).then(response => response.json()).then(students => {
        studentId = !students ? 1 : Object.keys(students).length + 1;
      }).then(() => {
        let data = JSON.stringify({
          "Faculty Number": inputFacultyNumber.value,
          "First Name": inputFirstName.value,
          "Grade": inputGrade.value,
          "ID": studentId,
          "Last Name": inputLastName.value
        });

        fetch(url, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: data
        })
          .then(x => x.json).then(() => onLoad());
          // .then(() => fetch(url)
          //   .then(students => {
          //     Object.entries(students).sort(a,b => a.id-b.id).map(([id, studentData]) => {
          //       console.log(`${id}, ${studentData}`);
          //       addTableRow(tbody, studentData, id)
          //     });
          //   })
          // );
      });

    });
    form.appendChild(addBtn);
    //add form to html page
    body.appendChild(form);
  }

  function addTableRow(tbody, studentValue, id) {
    let tempRow = document.createElement('tr');
    tempRow.innerHTML = `
      <td>${studentValue.id}</td>
      <td>${studentValue.firstName}</td>
      <td>${studentValue.lastName}</td>
      <td>${studentValue.facultyNumber}</td>
      <td>${studentValue.grade}</td>
    `;

    tbody.appendChild(tempRow);
  }
}

solve();