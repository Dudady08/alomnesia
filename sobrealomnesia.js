// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = menuToggle.querySelector('.icon-menu');
    const iconClose = menuToggle.querySelector('.icon-close');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'open' no menu
            mobileMenu.classList.toggle('open');
            
            // Alterna a visibilidade dos ícones
            if (mobileMenu.classList.contains('open')) {
                iconMenu.style.display = 'none';
                iconClose.style.display = 'block';
            } else {
                iconMenu.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    }

    // --- LÓGICA DA BARRA DE NAVEGAÇÃO AO ROLAR (SE EXISTIR) ---
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            // A barra de navegação já é fixa, então o efeito de scroll não é necessário
            // Se você quiser que ela mude de cor ao rolar, podemos adicionar aqui.
            // Por enquanto, ela é sempre escura.
        });
    }

});
document.addEventListener('DOMContentLoaded', function() {

    // --- Efeito de Scroll do Hero Background ---
    const heroGlow = document.getElementById('hero-glow');
    if (heroGlow) {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Ajuste os multiplicadores (0.05) para controlar a sensibilidade do movimento
            const posX = 50 + scrollY * 0.05;
            const posY = 50 - scrollY * 0.05;
            // Limita os valores para evitar que saiam muito da tela (opcional)
            const limitedPosX = Math.max(0, Math.min(100, posX));
            const limitedPosY = Math.max(0, Math.min(100, posY));

            heroGlow.style.background = `radial-gradient(circle at ${limitedPosX}% ${limitedPosY}%, rgba(255, 140, 0, 0.3), transparent 70%)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive for better performance
        handleScroll(); // Initialize on load
    }

    // --- Animações de Fade-in ao Rolar ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0; // Get delay or default to 0

                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay)); // Apply delay

                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

});