// Redirect links to categories.html with query params
document.querySelectorAll(".Types a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const category = link.getAttribute("data-category")
    const type = link.getAttribute("data-type")
    window.location.href = `categories.html?name=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`
  })
})

// When the page loads, read URL parameters
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const category = params.get("name")
  const type = params.get("type")

  const titleElement = document.getElementById("category-title")
  const contentElement = document.getElementById("category-content")

  if (category && type) {
    titleElement.textContent = ` ${type} - ${category}`
    loadContent(type, category)
  } else {
    titleElement.textContent = "No category selected."
    contentElement.textContent = "Please go back and select a category."
  }
})

// Simulated data source
const categoryData = {
  Books: {
    "Science Fiction": "Explore futuristic worlds, space travel, and alien civilizations.",
    Fantasy: "Magic, dragons, and epic adventures await you in this category.",
    Horror: "Spine-chilling tales and terrifying creatures.",
    Children: "Fun, colorful stories for young readers.",
    History: "Dive into the past and explore historical events and figures.",
  },
  Researches: {
    "Artificial Intelligence": "Discover how AI is shaping our future.",
    "Quantum Physics": "Understand the mysterious laws of the quantum realm.",
    "Medical Studies": "Explore groundbreaking research in health and medicine.",
    "Environmental Science": "Learn about climate change and sustainability.",
    "Social Science": "Study human behavior, culture, and society.",
  },
  Articles: {
    Technology: "The latest in gadgets, apps, and innovations.",
    Education: "Trends, methods, and tools in modern learning.",
    "Health & Wellness": "Tips and news on physical and mental health.",
    Politics: "Current affairs and political analysis.",
    Culture: "Exploring the world of art, media, and identity.",
  },
}

// Load content dynamically
function loadContent(type, category) {
  const content = categoryData[type] && categoryData[type][category]
  document.getElementById("category-content").textContent = content || "No content available for this category."
}

document.querySelector(".scroll-down").addEventListener("click", () => {
  document.querySelector(".CategoryDetails").scrollIntoView({ behavior: "smooth" })
})
