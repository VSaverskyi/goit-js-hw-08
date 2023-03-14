import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input');
const messageText = form.querySelector('textarea');

const SAVED_KEY = 'feedback-form-state';
const formData = {};

onUpdatePage();
form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onSubmitForm);

function onUpdatePage() {
  const savedObj = localStorage.getItem(SAVED_KEY);
  if (!savedObj) {
    return;
  }

  try {
    const parsedSaveObj = JSON.parse(savedObj);
    emailInput.value = parsedSaveObj.email;
    messageText.value = parsedSaveObj.message;
    if (parsedSaveObj.email === '') {
      emailInput.value = '';
    }
    if (parsedSaveObj.message === '') {
      messageText.value = '';
    }
  } catch (error) {
    console.log(error.message);
  }
}

function onInputForm() {
  formData.email = emailInput.value;
  formData.message = messageText.value;
  localStorage.setItem(SAVED_KEY, JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  formData.email = email.value;
  formData.message = message.value;
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(SAVED_KEY);
}
