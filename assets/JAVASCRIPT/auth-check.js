document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const registerSection = document.querySelector(".Register")
  const userProfileSection = document.querySelector(".UserProfile")
  const usernameElement = document.getElementById("username")
  const logoutBtn = document.getElementById("logoutBtn")

  const dropUserProfile = document.querySelector(".UserProfileDrop")
  const dropUsername = document.getElementById("dropUsername")
  // const dropLogoutIcon = document.getElementById("dropLogoutIcon") // no longer needed separately

  function setupLogout(element) {
    if (element) {
      element.addEventListener("click", () => {
        localStorage.removeItem("currentUser")
        window.location.reload()
      })
    }
  }

function updateUI() {
  const isMobile = window.innerWidth <= 1200

  // Select Login and Signup items in drop list by text (or better with IDs if you add them)
  const dropList = document.getElementById("List")
  const dropLogin = Array.from(dropList.children).find(
    (li) => li.textContent.trim().toLowerCase().includes("login")
  )
  const dropSignup = Array.from(dropList.children).find(
    (li) => li.textContent.trim().toLowerCase().includes("signup")
  )

  if (currentUser) {
    // User logged in

    // Hide login/signup in navbar and drop list
    if (registerSection) registerSection.style.display = "none"
    if (dropLogin) dropLogin.style.display = "none"
    if (dropSignup) dropSignup.style.display = "none"

    if (isMobile) {
      // Mobile: hide navbar profile, show drop list profile
      if (userProfileSection) userProfileSection.style.display = "none"
      if (dropUserProfile && dropUsername) {
        dropUserProfile.style.display = "flex"
        dropUsername.textContent = currentUser.name
        setupLogout(dropUserProfile)
      }
    } else {
      // Desktop: show profile in navbar, hide drop list profile
      if (userProfileSection && usernameElement) {
        userProfileSection.style.display = "flex"
        usernameElement.textContent = currentUser.name
      }
      if (dropUserProfile) dropUserProfile.style.display = "none"
      setupLogout(logoutBtn)
    }
  } else {
    // User NOT logged in

    if (isMobile) {
      // Mobile: hide login/signup buttons from navbar
      if (registerSection) registerSection.style.display = "none"
    } else {
      // Desktop: show login/signup buttons in navbar
      if (registerSection) registerSection.style.display = "flex"
    }

    // Always show login/signup in drop list when logged out
    if (dropLogin) dropLogin.style.display = "flex"
    if (dropSignup) dropSignup.style.display = "flex"

    // Hide user profile sections
    if (userProfileSection) userProfileSection.style.display = "none"
    if (dropUserProfile) dropUserProfile.style.display = "none"
  }
}

  updateUI()
  window.addEventListener("resize", updateUI)

  // Show success message if login was successful
  if (sessionStorage.getItem("loginSuccess") === "true") {
    const successMessage = document.getElementById("successMessage")
    if (successMessage) {
      successMessage.style.display = "block"
      setTimeout(() => {
        successMessage.style.display = "none"
      }, 3000)
    }
    sessionStorage.removeItem("loginSuccess")
  }
})