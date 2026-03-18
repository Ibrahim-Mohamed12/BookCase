document.addEventListener("DOMContentLoaded", () => {
    // ----- Dropdown Menu -----
    const DropButton = document.getElementById("DropButton")
    const DropList = document.querySelector(".DropList")

    if (DropButton && DropList) {
        DropButton.addEventListener("click", (e) => {
            e.preventDefault()
            DropList.classList.toggle("open")
        })

        document.addEventListener("click", (e) => {
            if (!DropList.contains(e.target) && !DropButton.contains(e.target)) {
                DropList.classList.remove("open")
            }
        })

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") DropList.classList.remove("open")
        })
    }

    // ----- Pagination: Recommendations -----
    function showRecommendation(pageNumber) {
        const pages = document.querySelectorAll(".book-page1")
        pages.forEach((page, index) => {
            page.classList.toggle("active", index === pageNumber - 4) // IDs start at 4
        })

        const buttons = document.querySelectorAll(".pagination1 button")
        buttons.forEach((btn, index) => {
            btn.classList.toggle("active", index === pageNumber - 4)
        })
    }

    showRecommendation(4)

    // ----- Smooth Scroll -----
    const scrollDown = document.querySelector(".scroll-down")
    if (scrollDown) {
        scrollDown.addEventListener("click", () => {
            document.querySelector(".contentContainer")?.scrollIntoView({ behavior: "smooth" })
        })
    }

    // ----- Animate content on scroll -----
    const container = document.querySelector(".contentContainer")
    if (container) {
        window.addEventListener("scroll", () => {
            const rect = container.getBoundingClientRect()
            if (rect.top < window.innerHeight - 150) {
                container.querySelectorAll("p").forEach((p) => p.classList.add("animate-p"))
            }
        })
    }

    // ----- Book cards animation using IntersectionObserver -----
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll(".book-card").forEach((card, i) => {
                        setTimeout(() => card.classList.add("visible"), i * 200)
                    })
                    obs.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.2 }
    )
    document.querySelectorAll(".book-collections").forEach((section) => observer.observe(section))

    // ----- Categories dropdown inside mobile menu -----
    const categoriesToggle = document.querySelector('#List li.options:nth-child(3)')
    const dropCategoriesContainer = document.querySelector('.DropCategoriesContainer')

    if (categoriesToggle && dropCategoriesContainer) {
        categoriesToggle.addEventListener('click', (e) => {
            e.preventDefault()
            dropCategoriesContainer.style.display =
                dropCategoriesContainer.style.display === "block" ? "none" : "block"
        })
    }
})