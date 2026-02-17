// Dropdown menu toggle
const DropButton = document.getElementById("DropButton")
const DropList = document.getElementsByClassName("DropList")[0]

DropButton.onclick = () => {
  DropList.classList.toggle("open")
}

// Categories dropdown
const navLink = document.getElementById("NavLink2")
const catContainer = document.querySelector(".CategoriesContainer")

navLink.addEventListener("click", (e) => {
  e.preventDefault()
  if (catContainer.style.display === "flex") {
    catContainer.style.display = "none"
  } else {
    catContainer.style.display = "flex"
    catContainer.style.justifyContent = "center"
  }
})

document.addEventListener("click", (e) => {
  if (!navLink.contains(e.target) && !catContainer.contains(e.target)) {
    catContainer.style.display = "none"
  }
})

// Scroll functionality
document.querySelector(".scroll-down").addEventListener("click", () => {
  document.querySelector(".contentContainer").scrollIntoView({ behavior: "smooth" })
})

// Category links
document.querySelectorAll(".CategoriesContainer a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const category = this.dataset.category
    const type = this.dataset.type
    const url = `categories.html?type=${encodeURIComponent(type)}&name=${encodeURIComponent(category)}`
    window.location.href = url
  })
})

// Animate value cards on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".valueCard")
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 50)
          }, index * 100)
        })
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

const valueCards = document.querySelector(".valueCards")
if (valueCards) {
  observer.observe(valueCards)
}
