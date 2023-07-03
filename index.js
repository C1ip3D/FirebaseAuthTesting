import auth from './db.js';

let authContainer = document.getElementsByClassName('auth')[0];
let content = document.getElementsByClassName('content')[0];
let registerForm = document.getElementById('register');
let loginForm = document.getElementById('login');
let signoutBTN = document.getElementById('SignOut');
let verifyBTN = document.getElementById('verify');
let alertHTML = document.getElementById('alertHTML');
let alert = document.getElementsByClassName('alert')[0];
let contentAlertHTML = document.getElementById('contentAlertHTML');
alert.style.width = authContainer.style.width;

//Event Listeners
registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
signoutBTN.addEventListener('click', signOut);
verifyBTN.addEventListener('click', EmailVerifcation);

//User signed in?

auth.onAuthStateChanged(function (user) {
  if (user) {
    authContainer.style.display = 'none';
    content.style.display = 'grid';
    checkEmailVerification();
  } else {
    authContainer.style.display = 'block';
    content.style.display = 'none';
  }
});

// Register

function registerUser(e) {
  e.preventDefault();

  let registerEmail = document.getElementById('registerEmail').value;
  let registerPassword = document.getElementById('registerPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (registerPassword != confirmPassword) {
    alert('Passwords do not match');
    registerForm.reset();
    loginForm.reset();
    return;
  }
  auth
    .createUserWithEmailAndPassword(registerEmail, confirmPassword)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      if (error.code == 'auth/weak-password') {
        console.log(error);
        alertHTML.innerHTML = `<h1 id="alertHTML">Password is too weak! <br>Enter a password with at least 6 characters</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/email-already-in-use') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Email already in use!</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/invalid-email') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Invalid Email</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else {
        alertHTML.innerHTML = `<h1 id="alertHTML">An unknown error has occured</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      }
    });
}

//Login

function loginUser(e) {
  e.preventDefault();
  let loginEmail = document.getElementById('loginEmail').value;
  let loginPassword = document.getElementById('loginPassword').value;
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      if (error.code == 'auth/wrong-password') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Incorrect Password</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/user-not-found') {
        alertHTML.innerHTML = `<h1 id="alertHTML">User not found</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/invalid-email') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Invalid Email</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else {
        alertHTML.innerHTML = `<h1 id="alertHTML">An unknown error has occured</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      }
    });
}

function signOut() {
  auth
    .signOut()
    .then(function () {
      return;
    })
    .catch(function (error) {
      alertHTML.innerHTML = `<h1 id="alertHTML">Error signing out</h1>`;
      alertHTML.style.fontSize = '1rem';
      alertHTML.style.color = 'black';
      alertHTML.style.textAlign = 'center';
      alert.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        alert.classList.remove('animate');
      }, 3000);
    });
}

function EmailVerifcation() {
  let user = auth.currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      alertHTML.innerHTML = `<h1 id="alertHTML">Email verification sent</h1>`;
      alertHTML.style.fontSize = '1rem';
      alertHTML.style.color = 'black';
      alertHTML.style.textAlign = 'center';
      alert.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        alert.classList.remove('animate');
      }, 3000);
    })
    .catch(function (error) {
      alertHTML.innerHTML = `<h1 id="alertHTML">An unknown error has occured</h1>`;
      alertHTML.style.fontSize = '1rem';
      alertHTML.style.color = 'black';
      alertHTML.style.textAlign = 'center';
      alert.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        alert.classList.remove('animate');
      }, 3000);
      console.log(error);
    });
}

function checkEmailVerification() {
  let user = auth.currentUser;
  if (user && user.emailVerified) {
    console.log('User is email verified');
    verifyBTN.style.display = 'none';
  } else {
  }
}
