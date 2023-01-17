const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const closeBtn = document.querySelector(".close");
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const subscribeBtn = document.querySelector(".subscribe-btn");
const myForm = document.getElementById("myForm");

const validFormMessage = "Form submitted successfully";
const invalidFormMessage = "Please enter a name and/or valid email address";
const invalidEmailMessage =
  "User already exists. Please try another email address.";

let responseMessage = document.querySelector(".response-message");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
  modal.classList.add("modal-active");
});

closeBtn.addEventListener("click", () => {
  modalBg.classList.remove("bg-active");
  modal.classList.remove("modal-active");
  clearForm();
});

function clearForm() {
  fullName.value = "";
  email.value = "";
  responseMessage.innerHTML = "";
  subscribeBtn.removeAttribute("disabled");
}

let messageAppended = false;

let isFormSubmitting = false;

function checkFormValidity() {
  if (isFormSubmitting) {
    if (!fullName.value && !email.value) {
      appendResponseMessage(
        responseMessage,
        "Please enter a name and email",
        "red"
      );
      subscribeBtn.setAttribute("disabled", true);
    } else if (!fullName.value) {
      appendResponseMessage(responseMessage, "Please enter a name", "red");
      subscribeBtn.setAttribute("disabled", true);
    } else if (!email.value) {
      appendResponseMessage(responseMessage, "Please enter an email", "red");
      subscribeBtn.setAttribute("disabled", true);
    } else {
      responseMessage.innerHTML = "";
      subscribeBtn.removeAttribute("disabled");
    }
  }
}

fullName.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);

subscribeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  isFormSubmitting = true;
  checkFormValidity();
  let emailRegEx = /^[^@]+@[^\.]+(\.[^\.]+)+$/;
  if (subscribeBtn.hasAttribute("disabled")) {
    return;
  }
  if (!emailRegEx.test(email.value)) {
    appendResponseMessage(responseMessage, invalidFormMessage, "red");
  } else {
    sendFormData();
  }
});

async function sendFormData() {
  if (!messageAppended) {
    checkFormValidity();
    if (subscribeBtn.hasAttribute("disabled")) {
      return;
    }
    try {
      let res = await fetch("/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName.value,
          email: email.value,
        }),
      });
      handleResponse(res);
    } catch (error) {
      console.log(error);
    }
  }
}

// function that handles the response from the server
function handleResponse(res) {
  if (res.status === 200) {
    console.log(res);
    appendResponseMessage(responseMessage, validFormMessage, "green");
    messageAppended = true;
    let messageTimeout = setTimeout(() => {
      responseMessage.classList.remove("active");
      messageAppended = false;
      // clearForm();
    }, 5000);
  } else if (res.status === 500) {
    console.log(res);
    appendResponseMessage(responseMessage, invalidEmailMessage, "red");
  }
}

function appendResponseMessage(element, message, color) {
  element.innerHTML = message;
  element.style.color = color;
  element.classList.add("active");
  myForm.appendChild(element);
}
