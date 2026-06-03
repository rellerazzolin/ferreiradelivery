document.addEventListener("DOMContentLoaded", () => {
    
    // 1. REVELAÇÃO DAS SEÇÕES NO SCROLL
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const observerOptions = {
        root: null,
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 2. DINAMISMO DO MESH GRADIENT (3 PONTOS VIRAM 2)
    const blob1 = document.querySelector(".aurora-1");
    const blob2 = document.querySelector(".aurora-2");
    const blob3 = document.querySelector(".aurora-3");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const maxScroll = 700; 
        const factor = Math.min(scrollTop / maxScroll, 1); // Gera um valor suave de 0 a 1 baseado no scroll

        if (blob1 && blob2 && blob3) {
            // Ponto 1 move levemente para a direita/baixo
            blob1.style.transform = `translate(${factor * 90}px, ${factor * 60}px)`;

            // Ponto 2 se afasta diagonalmente para a esquerda/cima
            blob2.style.transform = `translate(${factor * -70}px, ${factor * -90}px)`;

            // Ponto 3 sofre FADE-OUT completo proporcional ao scroll
            const originalOpacity = 0.28;
            blob3.style.opacity = `${originalOpacity * (1 - factor)}`;
        }
    });
});
