$(document).ready(function () {
  $("#registrator").submit(function (event) {
    event.preventDefault();
    registerForm();
  });
});

function validatePhoneInput(input) {
  const value = input.value.trim();
  const errorMsg = document.getElementById("phoneError");

  if (value === "") {
    errorMsg.textContent = `${input.name} cannot be empty`;
  } else if (value.length < 12) {
    errorMsg.textContent = `${input.name} must be at least 12 number`;
  } else {
    errorMsg.textContent = "";
  }
}

function validateNumericInput(event, input) {
  const charCode = event.which ? event.which : event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

function validateEmailInput(input) {
  const value = input.value.trim();
  const errorMsg = document.getElementById("emailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    errorMsg.textContent = "Invalid Email Format";
  } else {
    errorMsg.textContent = "";
  }
}

function validatePasswordInput(input) {
  const value = input.value.trim();
  const errorMsg = document.getElementById("passwordError");

  if (value.length < 8) {
    errorMsg.textContent = "Password must be at least 8 characters";
  } else {
    errorMsg.textContent = "";
  }
}

const registerForm = () => {
  const form = document.getElementById("registrator");
  const formData = new FormData(form);

  fetch("http://127.0.0.1:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === 201) {
        console.log("Success:", data);
        showNotificationSucess(data.message);
      } else {
        console.log("Error:", data);
        showNotificationFailed(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      console.error("Error:", error);
    });
};

const showNotificationSucess = (message) => {
  const elmMsg = document.getElementById("notification");
  elmMsg.textContent = message;
  elmMsg.style.backgroundColor = "rgb(151, 246, 137)";
  elmMsg.hidden = false;

  setTimeout(function () {
    document.getElementById("notification").hidden = true;
  }, 3000);
};

const showNotificationFailed = (message) => {
  const elmMsg = document.getElementById("notification");
  elmMsg.textContent = message;
  elmMsg.style.backgroundColor = "red";
  elmMsg.hidden = false;

  setTimeout(function () {
    document.getElementById("notification").hidden = true;
  }, 3000);
};
