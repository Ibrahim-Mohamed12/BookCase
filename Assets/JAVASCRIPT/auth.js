// Authentication functionality

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Find user
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Save current user
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: user.fullname,
            email: user.email,
          }),
        )

        // Set success flag for showing message
        sessionStorage.setItem("loginSuccess", "true")

        // Redirect to home
        window.location.href = "homePage.html"
      } else {
        alert("Invalid email or password!")
      }
    })
  }

  // Signup form submission
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullname = document.getElementById("fullname").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const terms = document.getElementById("terms").checked

      // Validation
      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      if (!terms) {
        alert("Please accept the terms and conditions!")
        return
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        alert("User with this email already exists!")
        return
      }

      // Add new user
      users.push({
        fullname,
        email,
        password,
      })

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      // Auto login
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: fullname,
          email: email,
        }),
      )

      // Set success flag
      sessionStorage.setItem("loginSuccess", "true")

      // Redirect to home
      window.location.href = "homePage.html"
    })
  }
})
