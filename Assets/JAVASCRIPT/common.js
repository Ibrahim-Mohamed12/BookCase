// Common JavaScript for all pages - handles navbar, auth state, and shared functionality

// Check if user is logged in and update navbar
function updateNavbar() {
  const currentUser = localStorage.getItem("currentUser")
  const registerSection = document.querySelector(".Register")
  let userProfileSection = document.querySelector(".UserProfile")

  if (currentUser) {
    // User is logged in - show username and logout
    if (registerSection) registerSection.style.display = "none"

    if (!userProfileSection) {
      // Create user profile section if it doesn't exist
      const userProfile = document.createElement("section")
      userProfile.className = "UserProfile"
      userProfile.style.display = "flex"
      userProfile.innerHTML = `
        <span class="material-symbols-outlined" id="userIcon">account_circle</span>
        <span id="username">${currentUser}</span>
        <button id="logoutBtn">Logout</button>
      `
      registerSection.parentNode.insertBefore(userProfile, registerSection)
      userProfileSection = userProfile

      // Add logout functionality
      document.getElementById("logoutBtn").addEventListener("click", logout)
    } else {
      userProfileSection.style.display = "flex"
      const usernameSpan = userProfileSection.querySelector("#username")
      if (usernameSpan) usernameSpan.textContent = currentUser
    }
  } else {
    // User not logged in - show login/signup
    if (registerSection) registerSection.style.display = "flex"
    if (userProfileSection) userProfileSection.style.display = "none"
  }
}

function logout() {
  localStorage.removeItem("currentUser")
  showSuccessMessage("Logged out successfully!")
  setTimeout(() => {
    window.location.reload() // Refresh to reset favorite borders
  }, 1000)
}

// Show success message
function showSuccessMessage(message) {
  // Remove existing message if any
  const existing = document.querySelector(".success-message")
  if (existing) existing.remove()

  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.textContent = message
  successDiv.style.display = "block"
  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.style.display = "none"
    successDiv.remove()
  }, 3000)
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("loginSuccess") === "true") {
    showSuccessMessage("Login successfully!")
    sessionStorage.removeItem("loginSuccess")
  }

  updateNavbar()
  setupBookActions(document.body)

  if (localStorage.getItem("currentUser")) {
    setTimeout(() => {
      FavoritesManager.restoreFavoriteStates()
    }, 100)
  }
})

// Toggle dropdown menu
const dropButton = document.getElementById("DropButton")
const dropList = document.querySelector(".DropList")

if (dropButton && dropList) {
  dropButton.onclick = () => {
    dropList.classList.toggle("open")
  }
}

// Handle categories dropdown in navbar
const navLink = document.getElementById("NavLink2")
const catContainer = document.querySelector(".CategoriesContainer")

if (navLink && catContainer) {
  navLink.addEventListener("click", (e) => {
    e.preventDefault()
    if (catContainer.style.display === "flex") {
      catContainer.style.display = "none"
    } else {
      catContainer.style.display = "flex"
      catContainer.style.justifyContent = "center"
    }
  })

  // Hide category section if clicking outside
  document.addEventListener("click", (e) => {
    if (!navLink.contains(e.target) && !catContainer.contains(e.target)) {
      catContainer.style.display = "none"
    }
  })
}

// Handle category links click
document.querySelectorAll(".CategoriesContainer a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const category = this.dataset.category
    const type = this.dataset.type
    const url = `categories.html?type=${encodeURIComponent(type)}&category=${encodeURIComponent(category)}`
    window.location.href = url
  })
})

// Favorites management
const FavoritesManager = {
  getFavorites() {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) return []

    const favorites = localStorage.getItem(`favorites_${currentUser}`)
    return favorites ? JSON.parse(favorites) : []
  },

  addFavorite(bookId) {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      alert("Please login to add favorites!")
      window.location.href = "login.html"
      return false
    }

    const favorites = this.getFavorites()
    if (!favorites.includes(bookId)) {
      favorites.push(bookId)
      localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(favorites))
      showSuccessMessage("Added to favorites!")
      return true
    }
    return false
  },

  removeFavorite(bookId) {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) return false

    let favorites = this.getFavorites()
    favorites = favorites.filter((id) => id !== bookId)
    localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(favorites))
    showSuccessMessage("Removed from favorites!")
    return true
  },

  isFavorite(bookId) {
    return this.getFavorites().includes(bookId)
  },

  restoreFavoriteStates() {
    const favorites = this.getFavorites()
    favorites.forEach((bookId) => {
      const icon = document.querySelector(`[data-book-id="${bookId}"] .favorite-icon`)
      if (icon) {
        icon.classList.add("active")
      }
    })
  },
}

// Preview modal functionality
function createPreviewModal(book) {
  // Remove existing modal if any
  const existingModal = document.getElementById("bookModal")
  if (existingModal) existingModal.remove()

  const modal = document.createElement("div")
  modal.id = "bookModal"
  modal.className = "modal"
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img src="${book.image}" alt="${book.title}">
                <div class="modal-details">
                    <h2>${book.title}</h2>
                    <p class="modal-author">by ${book.author}</p>
                    <p class="modal-tags">${book.tags}</p>
                    <p class="modal-price">${book.price}</p>
                    <p class="modal-description">${book.description}</p>
                    <div class="modal-buttons">
                        <button class="btn-display" onclick="displayBook(${book.id})">Display</button>
                        <button class="btn-download" onclick="downloadBook(${book.id})">Download</button>
                    </div>
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)
  modal.style.display = "block"

  // Close modal functionality
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.onclick = () => {
    modal.style.display = "none"
    modal.remove()
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none"
      modal.remove()
    }
  }
}

// Display book (placeholder - can be enhanced)
function displayBook(bookId) {
  const book = window.BooksDatabase.getBookById(bookId)
  if (book) {
    alert(`Opening ${book.title} for reading...`)
    // In a real app, this would open a reader view
  }
}

// Download book (placeholder - can be enhanced)
function downloadBook(bookId) {
  const book = window.BooksDatabase.getBookById(bookId)
  if (book) {
    showSuccessMessage(`Downloading ${book.title}...`)
    // In a real app, this would trigger actual download
  }
}

// Create book card HTML
function createBookCard(book) {
  const isFavorite = FavoritesManager.isFavorite(book.id)

  return `
    <div class="book-card" data-book-id="${book.id}">
      <div class="book-actions">
        <span class="material-symbols-outlined preview-icon">visibility</span>
        <span class="material-symbols-outlined favorite-icon ${isFavorite ? "active" : ""}">favorite</span>
      </div>
      <img src="${book.image}" alt="${book.title}">
      <p class="book-title">${book.title}</p>
      <p class="tags">${book.tags}</p>
      <p class="author">${book.author}</p>
      <p class="price">${book.price}</p>
    </div>
  `
}

// Open preview modal
function openPreview(bookId) {
  const book = window.BooksDatabase.getBookById(bookId)
  if (book) {
    createPreviewModal(book)
  }
}

function setupBookActions(container) {
  // Remove existing listener if any
  container.removeEventListener("click", handleBookAction)
  container.addEventListener("click", handleBookAction)
}

function handleBookAction(e) {
  const target = e.target

  // Handle preview icon click
  if (target.classList.contains("preview-icon")) {
    const bookId = Number.parseInt(target.closest(".book-card").dataset.bookId)
    openPreview(bookId)
    return
  }

  // Handle favorite icon click
  if (target.classList.contains("favorite-icon")) {
    const bookId = Number.parseInt(target.closest(".book-card").dataset.bookId)
    toggleFavorite(bookId)
    return
  }

  // Handle image click for preview
  if (target.tagName === "IMG" && target.closest(".book-card")) {
    const bookId = Number.parseInt(target.closest(".book-card").dataset.bookId)
    openPreview(bookId)
    return
  }
}

// Toggle favorite
function toggleFavorite(bookId) {
  const currentUser = localStorage.getItem("currentUser")
  if (!currentUser) {
    alert("Please login to add favorites!")
    window.location.href = "login.html"
    return
  }

  const isFavorite = FavoritesManager.isFavorite(bookId)
  const card = document.querySelector(`[data-book-id="${bookId}"]`)
  const icon = card ? card.querySelector(".favorite-icon") : null

  if (isFavorite) {
    FavoritesManager.removeFavorite(bookId)
    if (icon) {
      icon.classList.remove("active")
    }
    if (window.location.pathname.includes("favourite.html")) {
      if (card) card.remove()
      // Check if no favorites left
      const remainingCards = document.querySelectorAll(".book-card")
      if (remainingCards.length === 0) {
        document.getElementById("favouriteBooks").style.display = "none"
        document.getElementById("emptyFavourites").style.display = "flex"
      }
    }
  } else {
    FavoritesManager.addFavorite(bookId)
    if (icon) {
      icon.classList.add("active")
    }
  }
}

// Expose functions to window for global access
window.BooksDatabase = window.BooksDatabase || {}
window.FavoritesManager = FavoritesManager
window.createBookCard = createBookCard
window.setupBookActions = setupBookActions
window.openPreview = openPreview
window.toggleFavorite = toggleFavorite
window.displayBook = displayBook
window.downloadBook = downloadBook
