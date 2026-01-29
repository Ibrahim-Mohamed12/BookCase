document.addEventListener("DOMContentLoaded", () => {
  const DropButton = document.getElementById("DropButton")
  const DropList = document.querySelector(".DropList")

  if (!DropButton || !DropList) return

  // Toggle dropdown
  DropButton.addEventListener("click", (e) => {
    e.preventDefault()
    DropList.classList.toggle("open")
  })

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideDropdown = DropList.contains(e.target)
    const clickedButton = DropButton.contains(e.target)

    if (!clickedInsideDropdown && !clickedButton) {
      DropList.classList.remove("open")
    }
  })
})


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    DropList.classList.remove("open")
  }
})

function showPage(pageNumber) {
  // Hide all pages
  document.querySelectorAll(".book-page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  document.getElementById(`page-${pageNumber}`).classList.add("active")

  // Update button active state
  document.querySelectorAll(".pagination button").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`.pagination button:nth-child(${pageNumber})`).classList.add("active")
}

const navLink = document.getElementById("NavLink2")
const catContainer = document.querySelector(".CategoriesContainer")

// Toggle category visibility on click
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

function showRecommendation(pageNumber) {
  document.querySelectorAll(".book-page1").forEach((page) => {
    page.classList.remove("active")
  })

  document.getElementById(`page-${pageNumber}`).classList.add("active")

  document.querySelectorAll(".pagination1 button").forEach((btn) => {
    btn.classList.remove("active")
  })

  const btn = document.querySelector(`.pagination1 button:nth-child(${pageNumber - 3})`)
  if (btn) btn.classList.add("active")
}


document.querySelectorAll(".CategoriesContainer a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()

    const category = this.dataset.category
    const type = this.dataset.type

    const url = `categories.html?type=${encodeURIComponent(type)}&name=${encodeURIComponent(category)}`
    window.location.href = url
  })
})

document.querySelector(".scroll-down").addEventListener("click", () => {
  document.querySelector(".contentContainer").scrollIntoView({ behavior: "smooth" })
})

window.addEventListener("scroll", () => {
  const container = document.querySelector(".contentContainer")
  const rect = container.getBoundingClientRect()
  const windowHeight = window.innerHeight

  if (rect.top < windowHeight - 150) {
    const paragraphs = container.querySelectorAll("p")
    paragraphs.forEach((p) => p.classList.add("animate-p"))
  }
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".book-card")
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible")
          }, index * 200) // delay each card by 200ms
        })
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

document.querySelectorAll(".book-collections").forEach((section) => {
  observer.observe(section)
})
