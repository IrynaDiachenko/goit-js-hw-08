import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('feedback-form textarea'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  console.log(
    'feedback-form-state',
    JSON.parse(localStorage.getItem(STORAGE_KEY)),
  );
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedMessege = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessege && savedMessege.message) {
    refs.textarea.value = savedMessege.message;
  }

  if (savedMessege && savedMessege.email) {
    refs.mail.value = savedMessege.email;
  }
}
