import { createFormEntity } from './form-helpers.js'
import { fireBaseRequestFactory } from './firebase-requests.js'

async function applyCommon() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs')
  }

  this.username = sessionStorage.getItem('username');
  this.loggedIn = !!sessionStorage.getItem('token'); //from header.hbs !! - converts to bool
  this.hasNoTeam = true;
}

async function homeViewHandler() {
  await applyCommon.call(this);

  this.partial('./templates/home/home.hbs');
}

async function aboutViewHandler() {
  await applyCommon.call(this);

  this.partial('./templates/about/about.hbs');
}

async function loginViewHandler() {
  await applyCommon.call(this);
  this.partials.loginForm = await this.load('./templates/login/loginForm.hbs');
  await this.partial('./templates/login/loginPage.hbs');

  let formRef = document.querySelector('#login-form');
  formRef.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = createFormEntity(formRef, ['username', 'password']);
    let formValue = form.getValue();

    firebase.auth().signInWithEmailAndPassword(formValue.username, formValue.password)
    .then((response) => {
      firebase.auth().currentUser.getIdToken().then(token => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', response.user.email);
      })

      this.redirect('#/home');
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMsg = error.message;
    });
  });
  
}

async function registerViewHandler() {
  await applyCommon.call(this);
  this.partials.registerForm = await this.load('./templates/register/registerForm.hbs');
  await this.partial('./templates/register/registerPage.hbs');

  let formRef = document.querySelector('#register-form');

  formRef.addEventListener('submit', (e) => {
    e.preventDefault(); //we use this.post too! to prevent errors
    let form = createFormEntity(formRef, ['username', 'password', 'repeatPassword']);
    let formValue = form.getValue();
    if (formValue.password !== formValue.repeatPassword) {
      return;
    }

    //use firebase library to register user
    firebase.auth().createUserWithEmailAndPassword(formValue.username, formValue.password)
      .then(response => {
        firebase.auth().currentUser.getIdToken().then(token => {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('username', response.user.email);
        })

        this.redirect(['#/home']);
      });
  })
}

async function logoutViewHandler() {
  sessionStorage.clear();
  firebase.auth().signOut();
  this.redirect(['#/home']);
}

async function catalogViewHandler() {
  await applyCommon.call(this);
  this.partial('./templates/catalog/teamCatalog.hbs');
  //add authentication in firebase
  let token = sessionStorage.getItem('token');
  fetch('https://team-manager-40de8.firebaseio.com/.json?auth=' + token).then(x => x.json()).then(res => console.log(res));
}

async function createTeamHandler() {
  await applyCommon.call(this);
  this.partials.createForm = await this.load('./templates/create/createForm.hbs');
  await this.partial('./templates/create/createPage.hbs');

  const firebaseTeams = fireBaseRequestFactory('https://team-manager-40de8.firebaseio.com/', 'teams', sessionStorage.getItem('token'));

  let formRef = document.querySelector('#create-form');
  
  formRef.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = createFormEntity(formRef, ['name', 'comment']);
    let formValue = form.getValue();

    firebaseTeams.createEntity(formValue).then(x => {
      this.redirect('#/catalog')
    });
  });
}

// initialize the application
var app = Sammy('#main', function () {
  // include a plugin - set handlebars as template engine
  this.use('Handlebars', 'hbs');

  // define a 'route'
  this.get('#/', homeViewHandler); //when we load page #/ the following code will be executed
  this.get('#/home', homeViewHandler);
  this.get('#/about', aboutViewHandler);
  this.get('#/login', loginViewHandler);
  this.get('#/register', registerViewHandler);
  this.get('#/logout', logoutViewHandler);
  this.get('#/catalog', catalogViewHandler);
  this.get('#/create', createTeamHandler);

  this.post('#/register', () => false);
  this.post('#/login', () => false);
  this.post('#/create', () => false);
});

app.run('#/');

// $(function() { //$ - jquery версията, гарантира, че документа се е заредил
//   app.run('#/');
//   console.log('ready');
// });