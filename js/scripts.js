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

const sliderTrack = document.querySelector('.slider__carts');
const btnPrev = document.querySelector('.slider__btn--prev');
const btnNext = document.querySelector('.slider__btn--next');

let currentIndex = 0;

// Функція визначає скільки карток видно
function getVisibleSlides() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 1024) return 2;
    return 3;
}

// Основна функція оновлення слайдера
function updateSlider() {
    const slides = document.querySelectorAll('.slider__cart');
    const visibleSlides = getVisibleSlides();
    const totalSlides = slides.length;

    // Обмеження currentIndex
    if (currentIndex + visibleSlides > totalSlides) {
        currentIndex = Math.max(0, totalSlides - visibleSlides);
    }

    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;
    const offset = (slideWidth + gap) * currentIndex;

    sliderTrack.style.transform = `translateX(-${offset}px)`;
}

// Навігація "вперед"
btnNext.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const slides = document.querySelectorAll('.slider__cart');
    const totalSlides = slides.length;

    if (currentIndex + visibleSlides < totalSlides) {
        currentIndex += visibleSlides;
        updateSlider();
    }
});

// Навігація "назад"
btnPrev.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    if (currentIndex - visibleSlides >= 0) {
        currentIndex -= visibleSlides;
        updateSlider();
    }
});

// При зміні розміру вікна — оновити слайдер
window.addEventListener('resize', updateSlider);

// При зміні DOM (наприклад, додано/видалено слайд) — оновити
const observer = new MutationObserver(updateSlider);
observer.observe(sliderTrack, { childList: true, subtree: false });

// Початковий запуск
updateSlider();
