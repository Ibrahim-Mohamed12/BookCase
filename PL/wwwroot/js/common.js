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

// Toggle DropCategoriesContainer dropdown
const dropCatButton = document.getElementById("DropCatButton") // or whatever button toggles DropCategoriesContainer
const dropCatContainer = document.querySelector(".DropCategoriesContainer")

if (dropCatButton && dropCatContainer) {
    dropCatButton.addEventListener("click", (e) => {
        e.preventDefault()
        if (dropCatContainer.style.display === "flex") {
            dropCatContainer.style.display = "none"
        } else {
            dropCatContainer.style.display = "flex"
            dropCatContainer.style.justifyContent = "center"
        }
    })

    // Hide the DropCategoriesContainer if clicking outside it or the button
    document.addEventListener("click", (e) => {
        if (!dropCatButton.contains(e.target) && !dropCatContainer.contains(e.target)) {
            dropCatContainer.style.display = "none"
        }
    })
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