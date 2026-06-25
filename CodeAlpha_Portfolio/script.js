document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC COLORFUL TYPING EFFECT
    const textElement = document.querySelector(".dynamic-text");
    const words = ["Frontend Developer", "UI/UX Designer", "CodeAlpha Intern"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; 
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; 
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; 
            typingSpeed = 300; 
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (textElement) typeEffect();


    // 2. FEATURED PROJECTS SLIDER LOGIC
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
    let currentSlide = 0;

    function changeSlide(index) {
        // Purani active slide aur dot ko remove karna
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        // Nayi slide index set karna
        currentSlide = (index + slides.length) % slides.length;

        // Nayi slide aur dot active karna
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // Button clicks
    nextBtn.addEventListener("click", () => changeSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => changeSlide(currentSlide - 1));

    // Dot navigation click support
    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => changeSlide(idx));
    });

    // Auto-play slider every 5 seconds
    setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 5000);
});