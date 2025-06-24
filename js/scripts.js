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

        // 👇 Закриття підменю при кліку поза ним
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
