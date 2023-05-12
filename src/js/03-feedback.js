import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
let jsonFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
let formData = {};
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(saveCurrentInputToLocalStorage, 500));

fillFieldsWithSavedUserData();

function fillFieldsWithSavedUserData() {
    if (jsonFormData) {
        const parseFormData = isSavedUserData(jsonFormData);
        Object.entries(parseFormData).forEach(([key, value]) => {
          formEl.elements[key].value = value;
        });
        formData = parseFormData;
    }
}

function isSavedUserData(a) {
    if (a === null) { 
        return a = {};
    }
    try {
    return (a = a ? JSON.parse(a) : {});
    } catch (error) {
    console.log(error.name);
    console.log(error.message);
    }
}

function onFormSubmit(e) {
    const formElements = Array.from(formEl.elements);
    for (let i = 0; i < formElements.length - 1; i += 1){
      if (formElements[i].value === '') {
          return alert('Заповніть всі поля форми');
      };
    }
  
    e.preventDefault();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log(formData);
    e.currentTarget.reset();
};

function saveCurrentInputToLocalStorage(e) {
    if (e.target.value.trim() !== '') {
        formData[e.target.name] = e.target.value;
    }
    const userData = JSON.stringify(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, userData);
}