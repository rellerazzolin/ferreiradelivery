document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GATILHO DO MENU E ANIMAÇÃO DO SVG MORPHING
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuToggleSvg = document.getElementById("menu-toggle-svg");
    const navHorizontalMenu = document.querySelector(".nav-horizontal-menu");
    const menuItems = document.querySelectorAll(".menu-item");

    if (menuWrapper && menuToggleSvg && navHorizontalMenu) {
        menuWrapper.addEventListener("click", () => {
            menuToggleSvg.classList.toggle("open");
            navHorizontalMenu.classList.toggle("active");
        });

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


    // 3. MOVIMENTO DO MESH GRADIENT NO SCROLL
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


    // 4. CONTROLE DE INTERAÇÃO DO VÍDEO (PLAY/PAUSE E SOM)
    const videoWrapper = document.querySelector(".hero-video-wrapper");
    const heroVideo = document.getElementById("hero-video");
    const unmuteBtn = document.getElementById("unmute-btn");

    if (videoWrapper && heroVideo) {
        
        // Clicar no wrapper do vídeo alterna perfeitamente entre Play e Pause
        videoWrapper.addEventListener("click", () => {
            if (heroVideo.paused) {
                heroVideo.play().catch(err => console.log("Erro ao reproduzir:", err));
            } else {
                heroVideo.pause();
            }
        });

        // Controle preciso do áudio (Mute / Unmute)
        if (unmuteBtn) {
            unmuteBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Evita pausar o vídeo acidentalmente ao ligar o som
                
                if (heroVideo.muted) {
                    heroVideo.muted = false;
                    unmuteBtn.classList.add("sound-on"); // Mostra o ícone de som ativo
                } else {
                    heroVideo.muted = true;
                    unmuteBtn.classList.remove("sound-on"); // Volta para o ícone mutado
                }
            });
        }
    }
});
