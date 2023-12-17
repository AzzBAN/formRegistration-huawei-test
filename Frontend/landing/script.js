document.addEventListener("DOMContentLoaded", () => {
  // Function to get user data from storage
  function getUserData() {
    const userData = sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  // Function to display user data on the landing page
  function displayUserData() {
    const userData = getUserData();
    if (userData) {
      const userNameElement = document.getElementById("name");
      userNameElement.textContent = `Logged As: ${userData.name}`;

      const userIdElement = document.getElementById("userId");
      userIdElement.textContent = `UserId: ${userData.id}`;

      const userEmailElement = document.getElementById("email");
      userEmailElement.textContent = `Email: ${userData.email}`;

      const userPhoneNumberElement = document.getElementById("phone_number");
      userPhoneNumberElement.textContent = `Phone Number: ${userData.phone_number}`;
    }
  }

  // Call the function to display user data when the landing page loads
  displayUserData();
});
