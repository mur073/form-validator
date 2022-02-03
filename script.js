const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Funcion checkField checks if an input field is empty
function checkField(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Function getFieldName uppercases the first letter  of the input field's and returns it
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters`
    );
  } else if (input.value.length > maxLength) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${maxLength} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswords(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords must be the same");
  }
}

function showError(input, message = "Something went wrong") {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const reg =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (reg.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkField([username, email, password, password2]);
  checkLength(username, 4, 20);
  checkLength(password, 8, 20);
  checkEmail(email);
  checkPasswords(password, password2);
});
