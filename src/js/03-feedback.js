const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
  button: document.querySelector('.feedback-form button'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputMessage, 500));
refs.form.addEventListener('submit', onSubmit);

updateOutput();

function onInputMessage(event) {
  const feedbackUser = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackUser));
}

function updateOutput() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (savedMessage) {
    refs.input.value = savedMessage.email;
    refs.textarea.value = savedMessage.message;
  }
}

function onSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  refs.form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
