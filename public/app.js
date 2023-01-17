const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const closeBtn = document.querySelector(".close");
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const subscribeBtn = document.querySelector(".subscribe-btn");
const myForm = document.getElementById("myForm");

let resMsg = document.querySelector(".response-message");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
  modal.classList.add("modal-active");
});

closeBtn.addEventListener("click", () => {
  modalBg.classList.remove("bg-active");
  modal.classList.remove("modal-active");
  clearForm();
});

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendFormData();
});

// need to do some form validation before letting the
// sendFormData function get called
function clearForm() {
  fullName.value = "";
  email.value = "";
}

let messageAppended = false;

async function sendFormData() {
  if (!messageAppended) {
    let emailRegEx = /^[^@]+@[^\.]+(\.[^\.]+)+$/;
    if (!emailRegEx.test(email.value)) {
      appendResMsgToForm(resMsg, "Please enter a valid email address", "red");
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
      displayResponseMessage(res);
    } catch (error) {
      console.log(error);
    }
  }
}

function displayResponseMessage(res) {
  if (res.status === 200) {
    console.log(res);
    appendResMsgToForm(resMsg, "Form submitted successfully", "green");
    messageAppended = true;
    let messageTimeout = setTimeout(() => {
      resMsg.classList.remove("active");
      messageAppended = false;
      // clearForm();
    }, 5000);
  } else if (res.status === 500) {
    console.log(res);
    appendResMsgToForm(
      resMsg,
      "User already exists. Please try another email address.",
      "red"
    );
  }
}

function appendResMsgToForm(resMsg, message, color) {
  resMsg.innerHTML = message;
  resMsg.style.color = color;
  resMsg.classList.add("active");
  document.querySelector("#myForm").appendChild(resMsg);
}
