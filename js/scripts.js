document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const navigation = document.querySelector(".navigation");
    const body = document.body;

    function toggleMenu() {
        const isActive = burger.classList.toggle("active");
        navigation.classList.toggle("active");

        if (isActive) {
            lockScroll();
        } else {
            unlockScroll();
        }
    }

    function lockScroll() {
        body.classList.add("scroll-lock");
    }

    function unlockScroll() {
        body.classList.remove("scroll-lock");
    }

    if (burger) {
        burger.addEventListener("click", toggleMenu);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider__carts');
    const cards = document.querySelectorAll('.slider__cart');
    const nextBtn = document.querySelector('[data-direction="next"]');
    const prevBtn = document.querySelector('[data-direction="prev"]');

    const cardWidth = cards[0].offsetWidth + 45; // ширина + gap
    const visibleCards = 3; // скільки одночасно видно
    const totalCards = cards.length;
    const maxIndex = totalCards - visibleCards;

    let currentIndex = 0;

    function updateSlider() {
        const offset = currentIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // автогортання (опційно)
    let autoSlide = setInterval(() => {
        currentIndex = currentIndex < maxIndex ? currentIndex + 3 : 0;
        updateSlider();
    }, 5000);

    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = currentIndex < maxIndex ? currentIndex + 3 : 0;
            updateSlider();
        }, 5000);
    });

    updateSlider(); // початкове позиціонування
});
