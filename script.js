document.addEventListener("DOMContentLoaded", () => {
    
    // 1. REVELAÇÃO DAS SEÇÕES NO SCROLL (INTERSECTION OBSERVER)
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


    // 2. LOGICA INTENSIVA DO MESH GRADIENT (3 PONTOS SE TORNAM 2 + MOVE)
    const blob1 = document.querySelector(".aurora-1");
    const blob2 = document.querySelector(".aurora-2");
    const blob3 = document.querySelector(".aurora-3");

    // Vinculação direta para resposta instantânea ao scroll
    window.addEventListener("scroll", () => {
        // Captura o scroll independente do navegador
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = window.innerHeight; // Usa a altura inteira da tela como base
        const factor = Math.min(scrollTop / maxScroll, 1); // Fator vai de 0 a 1 de forma linear

        if (blob1 && blob2 && blob3) {
            // Blob 1 se move na diagonal para a direita e para baixo
            const b1X = factor * 160;
            const b1Y = factor * 100;
            blob1.style.transform = `translate(${b1X}px, ${b1Y}px)`;

            // Blob 2 se afasta bastante para a esquerda e para cima
            const b2X = factor * -140;
            const b2Y = factor * -120;
            blob2.style.transform = `translate(${b2X}px, ${b2Y}px)`;

            // Blob 3 faz o FADE OUT gradativo até sumir completamente (3 viram 2)
            const initialOpacity = 0.35;
            const currentOpacity = initialOpacity * (1 - factor);
            blob3.style.opacity = currentOpacity;
        }
    });
});
