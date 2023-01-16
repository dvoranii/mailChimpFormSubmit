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

function sendFormData() {
  if (!messageAppended) {
    fetch("/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName.value,
        email: email.value,
      }),
    })
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        resMsg.innerHTML = "Form submitted successfully";
        resMsg.classList.add("active");
        document.querySelector("#myForm").appendChild(resMsg);

        messageAppended = true;

        let messageTimeout = setTimeout(() => {
          resMsg.classList.remove("active");
          messageAppended = false;
          clearForm();
        }, 5000);
      })
      .catch((error) => console.log(error));
  }
}
