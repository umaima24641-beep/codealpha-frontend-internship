document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    let visibleItems = [...galleryItems];

    // 1. Image Filtering Functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Active class switch
            document.querySelector(".btn.active").classList.remove("active");
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            // Update visible items list for lightbox navigation
            visibleItems = [...galleryItems].filter(item => item.style.display !== "none");
        });
    });

    // 2. Lightbox Open Functionality
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            currentIndex = visibleItems.indexOf(item);
            showImage(currentIndex);
        });
    });

    function showImage(index) {
        if (index >= 0 && index < visibleItems.length) {
            const imgSrc = visibleItems[index].querySelector("img").src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = "flex";
            currentIndex = index;
        }
    }

    // 3. Navigation Controls
    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    nextBtn.addEventListener("click", () => showImage((currentIndex + 1) % visibleItems.length));
    prevBtn.addEventListener("click", () => showImage((currentIndex - 1 + visibleItems.length) % visibleItems.length));

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });
});