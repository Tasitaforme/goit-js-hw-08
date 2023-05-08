import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(saveCurrentInputToLocalStorage, 500)
);

fillFieldsWithSavedUserData();

function onFormSubmit(e) {
    e.preventDefault();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    console.log(formData)
    e.currentTarget.reset();
};

function saveCurrentInputToLocalStorage(e) {
    formData[e.target.name] = e.target.value;
    const userData = JSON.stringify(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, userData);
}

function fillFieldsWithSavedUserData() {
    const isSavedUserData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedFormData = JSON.parse(isSavedUserData);
    
    if (isSavedUserData) {
        Object.entries(savedFormData).forEach(([key, value]) => {
            formEl.elements[key].value = value;
        });
    }  
}