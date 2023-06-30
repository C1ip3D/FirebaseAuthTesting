import { auth } from './firebase.js';

let resetPasswordEmail = document.getElementById('resetPassword-input').value;
resetPasswordBTN.addEventListener('submit', resetPassword);
function resetPassword(e) {
  e.preventDefault();
  auth
    .sendPasswordResetEmail(resetPasswordEmail)
    .then(() => {
      alert('Password reset email sent');
    })
    .catch((err) => {
      alert('Error sending password reset email');
      console.log(err);
    });
}
