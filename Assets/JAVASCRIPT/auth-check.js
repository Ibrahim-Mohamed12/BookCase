// Check authentication status and update navbar

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const registerSection = document.querySelector(".Register")
  const userProfileSection = document.querySelector(".UserProfile")
  const usernameElement = document.getElementById("username")
  const logoutBtn = document.getElementById("logoutBtn")

  // Check if user is logged in
  if (currentUser) {
    // Hide login/signup buttons
    if (registerSection) {
      registerSection.style.display = "none"
    }

    // Show user profile
    if (userProfileSection && usernameElement) {
      userProfileSection.style.display = "flex"
      usernameElement.textContent = currentUser.name
    }

    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser")
        window.location.reload()
      })
    }
  } else {
    // Show login/signup buttons
    if (registerSection) {
      registerSection.style.display = "flex"
    }

    // Hide user profile
    if (userProfileSection) {
      userProfileSection.style.display = "none"
    }
  }

  // Show success message if login was successful
  if (sessionStorage.getItem("loginSuccess") === "true") {
    const successMessage = document.getElementById("successMessage")
    if (successMessage) {
      successMessage.style.display = "block"

      // Hide after 3 seconds
      setTimeout(() => {
        successMessage.style.display = "none"
      }, 3000)
    }

    // Clear the flag
    sessionStorage.removeItem("loginSuccess")
  }
})
