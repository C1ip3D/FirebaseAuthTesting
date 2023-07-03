import auth from './db.js';

let authContainer = document.getElementsByClassName('auth')[0];
let content = document.getElementsByClassName('content')[0];
let user = auth.currentUser;
let registerForm = document.getElementById('register');
let loginForm = document.getElementById('login');
let signoutBTN = document.getElementById('SignOut');

//Event Listeners
registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
signoutBTN.addEventListener('click', signOut);

//User signed in?

auth.onAuthStateChanged(function (user) {
  if (user) {
    authContainer.style.display = 'none';
    content.style.display = 'block';
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
      alert('Registered Successfully');
      console.log(user);
      registerForm.reset();
      loginForm.reset();
    })
    .catch(function (error) {
      alert('Error');
      console.log(error);
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
      alert('Logged In Successfully');
      console.log(user);
      loginForm.reset();
      registerForm.reset();
    })
    .catch(function (error) {
      alert('Error');
      console.log(error);
    });
}

function signOut() {
  auth
    .signOut()
    .then(function () {
      alert('Signed Out');
      registerForm.reset();
      loginForm.reset();
    })
    .catch(function (error) {
      alert('Error singing out');
      console.log(error);
    });
}
