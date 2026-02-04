const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  required: (field) => `${field} is required.`,
  minLength: (field, value) =>
    `${field} has to be atleast ${value} characters long.`,
  maxLength: (field, value) =>
    `${field} cannot be more than ${value} characters.`,
  pattern: (field) => `${field} doesnot match the pattern.`,
};

const formSchema = [
  {
    name: "username",
    type: "text",
    validations: [{ rule: "required" }, { rule: "minLength", value: 3 }],
  },
  {
    name: "email",
    type: "email",
    validations: [{ rule: "required" }, { rule: "email" }],
  },
];

const formContainer = document.querySelector(".form-container");
const form = formGenerator(formSchema);
formContainer.append(form);

// MIscellaneous functions :
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function retrieveInputValue(name) {
  return document.querySelector(`[name="${name}"]`).value;
}

// validation functions :

function validateFields(field, value) {
  const fieldSchema = formSchema.find((el) => el.name === field);

  const errors = [];

  fieldSchema.validations.forEach((val) => {
    switch (val.rule) {
      case "required":
        if (!value) errors.push(messages.required(field));
        break;
      case "minLength":
        if (value.length < val.value)
          errors.push(messages.minLength(field, val.value));
        break;
      case "maxLength":
        if (value.length > val.value)
          errors.push(messages.maxLength(field, val.value));
        break;
      case "email":
        if (!emailRegex.test(value)) errors.push(messages.pattern(field));
        break;
    }
  });

  return errors;
}

// validation handlers
function handleOnInputValidation(field, value) {
  const errors = validateFields(field, value);

  showError(form, field, errors);

  return errors;
}

function handleOnSubmitValidation() {
  const allErrors = {};
  let isValid = true;
  const errList = document.querySelector(".err-list");

  formSchema.forEach((field) => {
    const errors = handleOnInputValidation(
      field.name,
      retrieveInputValue(field.name)
    );
    allErrors[field.name] = errors;

    if (errors.length > 0) isValid = false;
  });

  return { allErrors, isValid };
}

// form generator
function formGenerator(formSchema) {
  const form = document.createElement("form");

  formSchema.forEach((el) => {
    let label = document.createElement("label");
    label.setAttribute("for", el.name);
    label.textContent = capitalizeWord(el.name) + " : ";

    let input = document.createElement("input");
    input.type = el.type;
    input.name = el.name;
    input.id = el.name;
    input.classList.add(`${el.name}-input`);

    let inputErrList = document.createElement("ul");
    inputErrList.classList.add(`${el.name}-errlist`, "errlist");

    form.append(label, input, inputErrList);
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.classList.add("submit-btn");

  form.append(submitButton);

  return form;
}

function showError(form, fieldName, errors) {
  const targetAllErrList = form.querySelectorAll(`.${fieldName}-errlist`);
  targetAllErrList.forEach((el) => (el.innerHTML = ""));

  const targetErrList = form.querySelector(`.${fieldName}-errlist`);

  errors.forEach((error) => {
    const errorItem = document.createElement("li");
    errorItem.classList.add(`${fieldName}-erritem`, "erritem");
    errorItem.textContent = error;
    targetErrList.append(errorItem);
  });
}

form.addEventListener("change", function (e) {
  handleOnInputValidation(e.target.name, e.target.value);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const { allErrors, isValid } = handleOnSubmitValidation();

  if (isValid) {
    console.log("Form is valid, submit data!");
  } else {
    for (const [key, val] of Object.entries(allErrors)) {
      showError(form, key, val);
    }
  }
});
