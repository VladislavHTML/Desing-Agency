document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const navigation = document.querySelector(".navigation");
    const body = document.body;

    function toggleMenu() {
        const isActive = burger.classList.toggle("active");
        navigation.classList.toggle("active");
        isActive ? lockScroll() : unlockScroll();
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

    // === Мобільне підменю Services ===
    const submenuTrigger = document.querySelector('.menu__item--has-submenu');

    if (submenuTrigger && window.innerWidth < 1024) {
        const link = submenuTrigger.querySelector('.menu__link');

        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                submenuTrigger.classList.toggle('submenu--open');
            });
        }

        // Закриття підменю при кліку поза ним
        document.addEventListener('click', function (e) {
            if (
                submenuTrigger.classList.contains('submenu--open') &&
                !submenuTrigger.contains(e.target)
            ) {
                submenuTrigger.classList.remove('submenu--open');
            }
        });
    }
});

// === Слайдер ===
const sliderTrack = document.querySelector('.slider__carts');
const btnPrev = document.querySelector('.slider__btn--prev');
const btnNext = document.querySelector('.slider__btn--next');

let currentIndex = 0;

function getVisibleSlides() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 1024) return 2;
    return 3;
}

function updateSlider() {
    const slides = document.querySelectorAll('.slider__cart');
    const visibleSlides = getVisibleSlides();
    const totalSlides = slides.length;

    if (currentIndex + visibleSlides > totalSlides) {
        currentIndex = Math.max(0, totalSlides - visibleSlides);
    }

    if (slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;
        const offset = (slideWidth + gap) * currentIndex;
        sliderTrack.style.transform = `translateX(-${offset}px)`;
    }
}

if (btnNext && btnPrev) {
    btnNext.addEventListener('click', () => {
        const visibleSlides = getVisibleSlides();
        const slides = document.querySelectorAll('.slider__cart');
        const totalSlides = slides.length;

        currentIndex = Math.min(currentIndex + visibleSlides, totalSlides - visibleSlides);
        updateSlider();
    });

    btnPrev.addEventListener('click', () => {
        const visibleSlides = getVisibleSlides();
        currentIndex = Math.max(currentIndex - visibleSlides, 0);
        updateSlider();
    });
}

window.addEventListener('resize', updateSlider);

const observer = new MutationObserver(updateSlider);
if (sliderTrack) {
    observer.observe(sliderTrack, { childList: true, subtree: false });
}

updateSlider();
