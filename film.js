// Aguarda o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Carregado. Iniciando script film.js...");

    // --- ELEMENTOS GLOBAIS ---
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- ELEMENTOS DO CARROSSEL ---
    const carouselSectionEl = document.getElementById("carousel-section");
    const curtainEl = document.getElementById("curtain");
    const carouselImageItems = document.querySelectorAll(".carousel-image-item"); // Pegar os itens existentes no HTML
    const carouselOverlayEl = document.getElementById("carousel-overlay");
    const carouselTitleEl = document.getElementById("carousel-title");
    const carouselCounterEl = document.getElementById("carousel-counter");
    const paginationDotsContainer = document.getElementById("pagination-dots"); // Container dos pontos
    const scrollPromptEl = document.getElementById("scroll-prompt");

    // --- DADOS DAS IMAGENS (Do HTML ou defina aqui se preferir) ---
    // Se as imagens já estão no HTML, podemos pegar os títulos dos 'alt'
    const imagesData = Array.from(carouselImageItems).map((item, index) => {
        const img = item.querySelector('img');
        return {
            // Se precisar da URL para algo, pode pegar aqui: img.src
            title: img ? img.alt : `Imagem ${index + 1}` // Usa o 'alt' como título
        };
    });
    const imagesCount = imagesData.length;

    // --- ESTADO (Variáveis Globais) ---
    let scrollProgress = 0; // Progresso dentro da seção do carrossel
    let paginationDots = []; // Array para guardar os elementos dos pontos

    // --- LÓGICA DA NAVBAR ---
    function updateNavbarAppearance() {
        if (!nav) return;
        const scrollY = window.scrollY;
        if (scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // --- LÓGICA DO MENU MOBILE ---
    function setupMobileMenu() {
        if (menuToggle && mobileMenu) {
            const iconMenu = menuToggle.querySelector('.icon-menu');
            const iconClose = menuToggle.querySelector('.icon-close');
            const isInitiallyOpen = mobileMenu.classList.contains('open');
            if(iconMenu) iconMenu.style.display = isInitiallyOpen ? 'none' : 'block';
            if(iconClose) iconClose.style.display = isInitiallyOpen ? 'block' : 'none';

            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                const isOpen = mobileMenu.classList.contains('open');
                if(iconMenu) iconMenu.style.display = isOpen ? 'none' : 'block';
                if(iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
            });
        } else {
            console.warn("Aviso: Elementos do menu mobile não encontrados.");
        }
    }

    // --- LÓGICA DO CARROSSEL INTERATIVO ---
    function initCarousel() {
        if (!carouselSectionEl || !curtainEl || carouselImageItems.length === 0 || !paginationDotsContainer) {
            console.error("Erro: Elementos essenciais do carrossel não encontrados.");
            return;
        }

        // 1. Define Altura da Seção Gatilho
        const extraScreensForScroll = 2; // Ajuste conforme necessário
        const totalScrollHeightFactor = imagesCount + extraScreensForScroll;
        carouselSectionEl.style.height = `${totalScrollHeightFactor * 100}vh`;

        // 2. Cria os Pontos de Paginação Dinamicamente
        paginationDotsContainer.innerHTML = ''; // Limpa pontos existentes
        paginationDots = []; // Limpa array
        for (let i = 0; i < imagesCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            paginationDotsContainer.appendChild(dot);
            paginationDots.push(dot); // Guarda referência
        }

        console.log("Carrossel inicializado. Altura da seção:", carouselSectionEl.style.height);

        // 3. Adiciona Listener de Scroll Principal e Chama Inicialização
        window.addEventListener("scroll", handleMasterScroll, { passive: true });
        handleMasterScroll(); // Define estado inicial
    }

    /**
     * Função Principal de Scroll - Chama outras funções de atualização
     */
    function handleMasterScroll() {
         updateNavbarAppearance(); // Atualiza a navbar
         updateCarouselVisuals(); // Atualiza o carrossel
    }

    /**
     * Atualiza os visuais do carrossel com base no scroll
     */
    function updateCarouselVisuals() {
        if (!carouselSectionEl || !curtainEl || imagesCount === 0) return; // Segurança

        const sectionTop = carouselSectionEl.offsetTop;
        const sectionHeight = carouselSectionEl.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calcula o progresso GERAL dentro da seção (0 a 1)
        const effectiveScrollHeight = sectionHeight - windowHeight;
        let currentScrollProgress = 0; // Renomeado para evitar conflito de escopo

        if (scrollY >= sectionTop && scrollY <= sectionTop + effectiveScrollHeight) {
            const relativeScroll = scrollY - sectionTop;
            if (effectiveScrollHeight > 0) {
                currentScrollProgress = Math.min(relativeScroll / effectiveScrollHeight, 1);
            }
        } else if (scrollY > sectionTop + effectiveScrollHeight) {
            currentScrollProgress = 1;
        }
        // else currentScrollProgress remains 0

        // --- Fase 1: Cortina subindo (0 a 0.3 do progresso total) ---
        const curtainThreshold = 0.3;
        const curtainProgress = Math.min(currentScrollProgress / curtainThreshold, 1);
        const curtainTranslate = 100 - (curtainProgress * 100);
        curtainEl.style.transform = `translateY(${curtainTranslate.toFixed(2)}%)`;

        // --- Fase 2: Carrossel de imagens (0.3 a 1.0 do progresso) ---
        const carouselStartThreshold = curtainThreshold;
        const carouselDuration = 1.0 - carouselStartThreshold;
        const carouselProgress = Math.max(0, Math.min((currentScrollProgress - carouselStartThreshold) / carouselDuration, 1));
        const currentImageIndex = Math.min(
            Math.floor(carouselProgress * imagesCount),
            imagesCount - 1
        );

        // Atualiza opacidade das imagens e z-index
        carouselImageItems.forEach((item, index) => {
            const isActive = index === currentImageIndex;
            item.style.opacity = isActive ? "1" : "0";
            item.style.zIndex = isActive ? "10" : "0";
        });

        // Atualiza informações no overlay
        if (carouselTitleEl && carouselCounterEl && paginationDots.length > 0) {
            carouselTitleEl.textContent = imagesData[currentImageIndex]?.title || '';
            carouselCounterEl.textContent = `Imagem ${currentImageIndex + 1} de ${imagesCount}`;
            paginationDots.forEach((dot, index) => {
                dot.classList.toggle("active-dot", index === currentImageIndex);
            });
        }

        // Mostra/Esconde o overlay de informações
        if (carouselOverlayEl) {
            const infoFadeStartProgress = 0.25; // Começa a aparecer aos 25%
            const infoOpacity = Math.max(0, Math.min((currentScrollProgress - infoFadeStartProgress) / (1 - infoFadeStartProgress), 1));
            carouselOverlayEl.style.opacity = infoOpacity;
            carouselOverlayEl.classList.toggle('visible', infoOpacity > 0.1);
        }

        // Atualiza o texto e visibilidade do prompt de scroll
        if (scrollPromptEl) {
             if (currentScrollProgress >= 0.98) {
                 scrollPromptEl.style.opacity = '0';
             } else {
                 scrollPromptEl.style.opacity = '1';
                 scrollPromptEl.textContent = curtainProgress < 1 ? 'Role para revelar o carrossel ↓' : 'Continue rolando ↓';
             }
        }

         // Debug: console.log(`Prog: ${currentScrollProgress.toFixed(2)}, CurtainT: ${curtainTranslate.toFixed(1)}%, CarouselP: ${carouselProgress.toFixed(2)}, ImgIdx: ${currentImageIndex}`);
    }


    // --- INICIALIZAÇÃO GERAL ---
    setupMobileMenu(); // Configura o menu mobile
    initCarousel();    // Configura e inicia o carrossel interativo

}); // Fim do DOMContentLoaded