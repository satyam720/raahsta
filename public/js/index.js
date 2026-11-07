import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { login, logout } from './login.js';
import { initMap } from './mapbox.js';
import { updateSettings } from './updateSetting.js';
import { initClientRzrPay, requestOrder } from './razorPay.js';
import { signup } from './signup.js';
import { initInterface } from './interface.js';

initInterface();

//DOM elems
const mapContainer = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookTourBtn = document.getElementById('book-tour');
const signupForm = document.getElementById('userSignUp');

if (mapContainer) {
  try {
    initMap(mapContainer);
  } catch (error) {
    console.error(error);
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    const photo = document.getElementById('photo').files[0];
    if (photo) form.append('photo', photo);
    await updateSettings(form, 'data');
    location.reload(true);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
  });
}

if (bookTourBtn) {
  bookTourBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    bookTourBtn.disabled = true;
    await requestOrder(bookTourBtn);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = signupForm.querySelector('button[type="submit"]');
    if (button.disabled) return;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmpassword').value;
    if (password !== passwordConfirm) {
      document.getElementById('confirmpassword').setCustomValidity('Passwords do not match');
      document.getElementById('confirmpassword').reportValidity();
      return;
    }
    button.disabled = true;
    button.textContent = 'Creating account...';
    let succeeded = false;
    try {
      succeeded = await signup({ email, name, password, passwordConfirm });
    } finally {
      if (!succeeded) {
        button.disabled = false;
        button.textContent = 'Sign up';
      }
    }
  });
  for (const input of signupForm.querySelectorAll('input[type="password"]')) {
    input.addEventListener('input', () => document.getElementById('confirmpassword').setCustomValidity(''));
  }
}
