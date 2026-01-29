// ===============================
// Book preview and favorite logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("previewModal")
  const closeModal = document.querySelector(".close-modal")

  /* ===============================
     PREVIEW & FAVORITES (DELEGATION)
  =============================== */
  document.addEventListener("click", (e) => {
    const target = e.target

    /* ---------- PREVIEW ---------- */
    if (target.classList.contains("preview-icon")) {
      e.stopPropagation()

      const bookCard = target.closest(".book-card")
      if (!bookCard) return

      document.getElementById("modalBookImage").src =
        bookCard.querySelector("img")?.src || ""

      document.getElementById("modalBookTitle").textContent =
        bookCard.querySelector("p")?.textContent || ""

      document.getElementById("modalBookTags").textContent =
        bookCard.querySelector(".tags")?.textContent || ""

      document.getElementById("modalBookAuthor").textContent =
        bookCard.querySelector(".author")?.textContent || ""

      modal.style.display = "flex"
      modal.style.alignItems = "center"
      modal.style.justifyContent = "center"
      return
    }

    /* ---------- FAVORITE ---------- */
    if (target.classList.contains("favorite-icon")) {
      e.stopPropagation()

      const bookId = target.dataset.bookId
      const user = JSON.parse(localStorage.getItem("currentUser"))

      if (!user) {
        alert("Please login to add books to favorites!")
        window.location.href = "login.html"
        return
      }

      const userId = user.id || user.email || user.name
      const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {}
      let userFavorites = allFavorites[userId] || []

      target.classList.toggle("active")

      if (target.classList.contains("active")) {
        const bookCard = target.closest(".book-card")
        if (!bookCard) return

        const bookData = {
          id: bookId,
          image: bookCard.querySelector("img")?.src || "",
          title: bookCard.querySelector("p")?.textContent || "",
          tags: bookCard.querySelector(".tags")?.textContent || "",
          author: bookCard.querySelector(".author")?.textContent || ""
        }

        if (!userFavorites.some((b) => b.id === bookId)) {
          userFavorites.push(bookData)
        }
      } else {
        userFavorites = userFavorites.filter((b) => b.id !== bookId)
      }

      allFavorites[userId] = userFavorites
      localStorage.setItem("favorites", JSON.stringify(allFavorites))

      if (window.location.pathname.endsWith("favourite.html")) {
        location.reload()
      }
    }
  })

  /* ===============================
     MODAL CLOSE
  =============================== */
  closeModal?.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none"
  })

  document.querySelector(".btn-display")?.addEventListener("click", () => {
    alert(`Displaying: ${document.getElementById("modalBookTitle").textContent}`)
  })

  document.querySelector(".btn-download")?.addEventListener("click", () => {
    alert(`Downloading: ${document.getElementById("modalBookTitle").textContent}`)
  })

  /* ===============================
     LOAD FAVORITE STATE (PER USER)
  =============================== */
  const user = JSON.parse(localStorage.getItem("currentUser"))
  if (!user) return

  const userId = user.id || user.email || user.name
  const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {}
  const userFavorites = allFavorites[userId] || []

  userFavorites.forEach((fav) => {
    const icon = document.querySelector(
      `.favorite-icon[data-book-id="${fav.id}"]`
    )
    if (icon) icon.classList.add("active")
  })
})
x