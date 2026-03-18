document.addEventListener("DOMContentLoaded", function () {

    const previewIcons = document.querySelectorAll(".preview-icon");
    const modal = document.getElementById("previewModal");
    const closeModal = document.querySelector(".close-modal");

    const modalImage = document.getElementById("modalBookImage");
    const modalTitle = document.getElementById("modalBookTitle");
    const modalAuthor = document.getElementById("modalBookAuthor");
    const modalTags = document.getElementById("modalBookTags");
    const modalDescription = document.getElementById("modalDescription");
    const modalFilepath = document.getElementById("modalfilepath");

    const btnDisplay = document.querySelector(".btn-display");
    const btnDownload = document.querySelector(".btn-download");

    // Open modal and populate data
    previewIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const card = this.closest(".book-card");

            modalImage.src = card.querySelector("img").src;
            modalTitle.innerText = card.querySelector(".Title").innerText;
            modalTags.innerText = card.querySelector(".tags").innerText;
            modalAuthor.innerText = card.querySelector(".author").innerText;
            modalDescription.innerText = card.querySelector(".Desc").innerText;
            modalFilepath.innerText = card.querySelector(".filepath").innerText;

            modal.style.display = "flex";
        });
    });

    // Close modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Display button: open file in new tab
    btnDisplay.addEventListener("click", function () {
        const filepath = modalFilepath.innerText;
        if (filepath) {
            window.open(filepath, "_blank");
        } else {
            alert("File not available for display.");
        }
    });

    // Download button: trigger download
    btnDownload.addEventListener("click", function () {
        const filepath = modalFilepath.innerText;
        if (filepath) {
            const link = document.createElement("a");
            link.href = filepath;
            link.download = filepath.split("/").pop(); // extract filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("File not available for download.");
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchbar');
    const searchButton = document.querySelector('.SearchContainer button'); // the search button
    const bookCards = document.querySelectorAll('.book-card');

    // Run search when button is clicked
    searchButton.addEventListener('click', () => {
        const query = searchBar.value.toLowerCase();

        bookCards.forEach(card => {
            const title = card.querySelector('.Title').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            const tags = card.querySelector('.tags').textContent.toLowerCase();

            if (title.includes(query) || author.includes(query) || tags.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchbar');
    const bookCards = document.querySelectorAll('.book-card');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();

        bookCards.forEach(card => {
            const title = card.querySelector('.Title').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            const tags = card.querySelector('.tags').textContent.toLowerCase();

            if (title.includes(query) || author.includes(query) || tags.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const modal1 = document.getElementById("previewModal1");
    const closeModal1 = document.querySelector(".close-modal1");
    const favIcon = document.querySelectorAll("#FavIcon");
    const selectedBook = document.querySelector(".selectedBookId");

    favIcon.forEach(icon => {
        icon.addEventListener("click", function () {

            const card = this.closest(".book-card");
            const bookID = card.querySelector(".BookId").innerText;

            selectedBook.value = bookID;

            modal1.style.display = "flex";
        });
    });

    closeModal1.addEventListener("click", function () {
        modal1.style.display = "none";
    });

});
