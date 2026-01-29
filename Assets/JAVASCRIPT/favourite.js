document.addEventListener("DOMContentLoaded", () => {
  loadFavouriteBooks()
})

/* =========================
   Favorites Manager (PER USER)
========================= */
const FavoritesManager = {
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"))
  },

  getAllFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || {}
  },

  getUserFavorites() {
    const user = this.getCurrentUser()
    if (!user) return []

    const userId = user.id || user.email || user.name
    const allFavorites = this.getAllFavorites()

    return allFavorites[userId] || []
  },

  removeFavorite(bookId) {
    const user = this.getCurrentUser()
    if (!user) return

    const userId = user.id || user.email || user.name
    const allFavorites = this.getAllFavorites()

    let userFavorites = allFavorites[userId] || []
    userFavorites = userFavorites.filter((book) => book.id !== bookId)

    allFavorites[userId] = userFavorites
    localStorage.setItem("favorites", JSON.stringify(allFavorites))
  }
}

/* =========================
   Book Card Renderer
========================= */
function createBookCard(book) {
  return `
    <div class="book-card">
      <div class="book-actions">
        <span class="material-symbols-outlined preview-icon" data-book-id="${book.id}">
          visibility
        </span>
        <span class="material-symbols-outlined favorite-icon active" data-book-id="${book.id}">
          favorite
        </span>
      </div>

      <img src="${book.image}" alt="${book.title}">
      <p>${book.title}</p>
      <p class="tags" id="Tags">${book.tags}</p>
      <p class="author">${book.author}</p>
    </div>
  `
}

/* =========================
   Events
========================= */
function setupFavouriteActions(container) {
  container.addEventListener("click", (event) => {
    const target = event.target

    // Remove from favorites
    if (target.classList.contains("favorite-icon")) {
      const bookId = target.dataset.bookId
      FavoritesManager.removeFavorite(bookId)
      loadFavouriteBooks()
      return
    }

    // Preview
    if (target.classList.contains("preview-icon")) {
      const card = target.closest(".book-card")
      const title = card.querySelector("p").textContent
      alert(`Previewing: ${title}`)
    }
  })
}

/* =========================
   Loader
========================= */
function loadFavouriteBooks() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  const notLoggedIn = document.getElementById("notLoggedIn")
  const emptyFavourites = document.getElementById("emptyFavourites")
  const favouriteBooks = document.getElementById("favouriteBooks")
  const favouriteList = document.getElementById("favouriteList")

  if (!user) {
    notLoggedIn.style.display = "flex"
    favouriteBooks.style.display = "none"
    emptyFavourites.style.display = "none"
    return
  }

  notLoggedIn.style.display = "none"

  const favorites = FavoritesManager.getUserFavorites()

  if (favorites.length === 0) {
    emptyFavourites.style.display = "flex"
    favouriteBooks.style.display = "none"
    return
  }

  emptyFavourites.style.display = "none"
  favouriteBooks.style.display = "block"
  favouriteList.innerHTML = ""

  favorites.forEach((book) => {
    favouriteList.insertAdjacentHTML("beforeend", createBookCard(book))
  })

  setupFavouriteActions(favouriteList)
}
