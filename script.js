document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GATILHO DO MENU E ANIMAÇÃO DO SVG MORPHING
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuToggleSvg = document.getElementById("menu-toggle-svg");
    const navHorizontalMenu = document.querySelector(".nav-horizontal-menu");
    const menuItems = document.querySelectorAll(".menu-item");

    if (menuWrapper && menuToggleSvg && navHorizontalMenu) {
        menuWrapper.addEventListener("click", () => {
            // Liga/Desliga a animação complexa do SVG
            menuToggleSvg.classList.toggle("open");
            // Liga/Desliga a expansão do menu horizontal
            navHorizontalMenu.classList.toggle("active");
        });

        // Fecha o menu automaticamente quando clica em uma opção do menu
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                menuToggleSvg.classList.remove("open");
                navHorizontalMenu.classList.remove("active");
            });
        });
    }


    // 2. REVELAÇÃO DAS SEÇÕES NO SCROLL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.02 });

    revealElements.forEach(element => revealObserver.observe(element));


    // 3. LOGICA INTENSIVA DO MESH GRADIENT (3 PONTOS SE TORNAM 2 + MOVE)
    const blob1 = document.querySelector(".aurora-1");
    const blob2 = document.querySelector(".aurora-2");
    const blob3 = document.querySelector(".aurora-3");

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = window.innerHeight; 
        const factor = Math.min(scrollTop / maxScroll, 1); 

        if (blob1 && blob2 && blob3) {
            const b1X = factor * 160;
            const b1Y = factor * 100;
            blob1.style.transform = `translate(${b1X}px, ${b1Y}px)`;

            const b2X = factor * -140;
            const b2Y = factor * -120;
            blob2.style.transform = `translate(${b2X}px, ${b2Y}px)`;

            const initialOpacity = 0.35;
            const currentOpacity = initialOpacity * (1 - factor);
            blob3.style.opacity = currentOpacity;
        }
    });
});
