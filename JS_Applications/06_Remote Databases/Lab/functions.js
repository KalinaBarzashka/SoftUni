function solve() {
  let registerBtn = document.getElementById('register');
  let logInBtn = document.getElementById('login');
  let getData = document.getElementById('getdata');
  let logOut = document.getElementById('logout');

  let divResult = document.getElementById('result');

  registerBtn.addEventListener('click', function register() {
    divResult.innerText = "";
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!(email && password)) {
      divResult.innerText = "Please fill input boxes - Email and Password";
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      divResult.innerText = `Error Code: ${errorCode}, Error Message: ${errorMessage}`;
    });
  });

  logInBtn.addEventListener('click', function logIn() {
    divResult.innerText = "";
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!(email && password)) {
      divResult.innerText = "Please fill input boxes - Email and Password";
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        divResult.innerText = `Error Code: ${errorCode}, Error Message: ${errorMessage}`;
      });
  });

  getData.addEventListener('click', function getData() {
    divResult.innerText = "";
    let user = document.getElementById('email').value;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        divResult.innerText = `Name: ${displayName}, Email: ${email}, VerifiedEmail: ${emailVerified}, Is Anonymous: ${isAnonymous}, Uid: ${uid}`;
      } else {
        divResult.innerText = "Not logged in.";
      }
    });

  });

  logOut.addEventListener('click', function logOut() {
    divResult.innerText = "";

    firebase.auth().signOut()
      .then(() => {
        divResult.innerText = "Sign-out successful.";
      })
      .catch((error) => {
        divResult.innerText = "An error happened.";
      });


  });
}

solve();