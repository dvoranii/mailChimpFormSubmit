const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const closeBtn = document.querySelector(".close");
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const subscribeBtn = document.querySelector(".subscribe-btn");
const myForm = document.getElementById("myForm");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
  modal.classList.add("modal-active");
});

closeBtn.addEventListener("click", () => {
  modalBg.classList.remove("bg-active");
  modal.classList.remove("modal-active");
});

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendFormData();
});

function sendFormData() {
  // const formData = new FormData(myForm);

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
    .then((res) => {
      if (res.ok) {
        // Create a new element to hold the success message
        let message = document.createElement("p");
        message.innerHTML = "Form submitted successfully";
        message.classList.add("success-message");
        // Append the message to the DOM
        document.querySelector("#myForm").appendChild(message);
      }
    })
    .catch((error) => console.log(error));
}
