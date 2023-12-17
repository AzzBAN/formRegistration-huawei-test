$(document).ready(function () {
  $("#login").submit(function (event) {
    event.preventDefault();
    loginForm();
  });
});

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

const loginForm = () => {
  const form = document.getElementById("login");
  const formData = new FormData(form);

  fetch("http://127.0.0.1:3000/user/auth", {
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
      if (data.status === 200) {
        console.log("Success:", data);
        showNotificationSucess(data.message);
        handleLoginSuccess(data);
        window.location.href = "/Frontend/landing/index.html";
        // hideLoginForm();
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

const hideLoginForm = () => {
  const elmForm = document.getElementById("form-container");
  elmForm.hidden = true;
};

const handleLoginSuccess = (data) => {
  console.log(data.data.user);
  localStorage.setItem("accessToken", data.data.token);
  sessionStorage.setItem("user", JSON.stringify(data.data.user));
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
