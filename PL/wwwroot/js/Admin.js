function toggleSidebar(event) {

    const sidebar = document.getElementById("sidebarOverlay");
    sidebar.classList.toggle("show");

}

// Click outside sidebar to close
window.addEventListener("click", function (e) {

    const sidebar = document.getElementById("sidebarOverlay");
    const menuBtn = document.getElementById("menuBtn");

    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove("show");
    }

});

function confirmDelete() {
    return confirm("Are you sure you want to delete this user?");
}