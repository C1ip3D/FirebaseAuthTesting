import auth from './firebase.js';

let user = auth.currentUser;
let registerForm = document.getElementById('register');
let loginForm = document.getElementById('login');
let content = document.getElementsByClassName('content')[0];
let registerEmail = document.getElementById('email-input').value;
let registerPassword = document.getElementById('password-input').value;
let loginEmail = document.getElementById('login-email-input').value;
let loginPassword = document.getElementById('login-password-input').value;
let resetPasswordBTN = document.getElementById('resetPassword');
// let emailVerification = document.getElementById('emailVerification');
let logoutBTN = document.getElementById('logout');

auth.onAuthStateChanged((user) => {
  if (user) {
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
    content.style.display = 'block';
  } else {
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    content.style.display = 'none';
  }
});

registerForm.addEventListener('submit', register);
loginForm.addEventListener('submit', login);
resetPasswordBTN.addEventListener('click', resetPassword);
logoutBTN.addEventListener('click', logout);


function register(e) {
  e.preventDefault();
  auth
    .createUserWithEmailAndPassword(registerEmail, registerPassword)
    .then((cred) => {
      alert('Account created successfully');
      console.log(cred.user);
    })
    .catch((err) => {
      alert('Error creating account');
      console.log(err);
    });
}

function login(e) {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((cred) => {
      alert('Login successful');
      console.log(cred.user);
    })
    .catch((err) => {
      alert('Error logging in');
      console.log(err);
    });
}

function logout() {
  auth
    .signOut()
    .then(() => {
      alert('Logged out');
      window.location.reload();
    })
    .catch((err) => {
      alert('Error logging out');
      console.log(err);
    });
}

function resetPassword() {
  auth
    .sendPasswordResetEmail(registerEmail)
    .then(() => {
      alert('Password reset email sent');
    })
    .catch((err) => {
      alert('Error sending password reset email');
      console.log(err);
    });
}

// function emailVerification() {
//   auth
//     .currentUser.sendEmailVerification()
//     .then(() => {
//       alert('Email verification sent');
//     })
//     .catch((err) => {
//       alert('Error sending email verification');
//       console.log(err);
//     });
// }
