import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input');
const messageText = form.querySelector('textarea');

const formData = {};
autoFillInput();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function autoFillInput() {
  try {
    const savedInputValue = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (savedInputValue) {
      emailInput.value = savedInputValue.email;
      messageText.value = savedInputValue.message;
    } else {
      emailInput.value = '';
      messageText.value = '';
    }
  } catch (error) {
    console.log(error);
  }
}
function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}
