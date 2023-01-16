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
});

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendFormData();
});

let messageAppended = false;

function sendFormData() {
  // const formData = new FormData(myForm);

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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resMsg.innerHTML = `${data.name}`;
        resMsg.classList.add("active");
        document.querySelector("#myForm").appendChild(resMsg);

        messageAppended = true;

        let messageTimeout = setTimeout(() => {
          resMsg.classList.remove("active");
          messageAppended = false;
          fullName.value = "";
          email.value = "";
        }, 5000);
      })
      // .then((res) => {
      //   if (res.ok) {
      // resMsg.innerHTML = "Form submitted successfully";
      // resMsg.classList.add("active");
      // document.querySelector("#myForm").appendChild(resMsg);
      //     messageAppended = true;

      //     let messageTimeout = setTimeout(() => {
      //       resMsg.classList.remove("active");
      //       messageAppended = false;
      //       fullName.value = "";
      //       email.value = "";
      //     }, 5000);
      //   }
      // })
      .catch((error) => console.log(error));
  }
}
