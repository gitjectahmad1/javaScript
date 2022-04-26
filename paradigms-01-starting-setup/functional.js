  const REQUIRED = 'REQUIRED';
  const MIN_LENGTH = 'MIN_LENGTH';

function validate(value, flag, validatorValue) {
  if(flag === REQUIRED){
    return value.trim().length > 0;
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue;
  }
}

function getUserInput(inputElementId) {

  return document.getElementById(inputElementId).value;
}

function createUser(userName, userPassword) {
  if (!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)) {
    throw new Error(
      'Invalid input - username or password wrong (password should be at least six characters)'
      );
  }
  return {
    userName: userName,
    password: userPassword
  };
}

function greetUser(user) {
  console.log('Hi, I am ' + user.userName);
}

function signUpHandler(event) {
  event.preventDefault();

  const enteredUserName = getUserInput('username');
  const enteredPassword = getUserInput('password');
try {
  const newUser = createUser(enteredUserName, enteredPassword);
  console.log(newUser);
  greetUser(newUser);

} catch (err) {
  alert(err.message);
}
  
}

function connectForm(formId, formSubmitHandler) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', formSubmitHandler);
}

connectForm('user-input', signUpHandler);