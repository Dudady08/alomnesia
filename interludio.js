// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================================
    // --- 🚀 INÍCIO DO CÓDIGO DO CARROSSEL POR SCROLL ---
    // ==========================================================

    // 1. Definição dos dados das imagens
    const images = [
        { title: "Still do Filme 1" },
        { title: "Still do Filme 2" },
        { title: "Still do Filme 3" },
/*         { title: "Still do Filme 4" },
        { title: "Still do Filme 5" },
 */    ];

    // 2. Variável para guardar o progresso da rolagem
    let scrollProgress = 0;

    // 3. Seletores de Elementos do DOM
    let carouselSectionEl,
        carouselImageItems,
        carouselOverlayEl,
        carouselTitleEl,
        carouselCounterEl,
        paginationDots,
        scrollPromptArrowEl,
        nav; // Adicionámos o 'nav' aqui

    /**
     * 4. Função Principal de Manipulação da Rolagem
     */
    function handleCarouselScroll() {
        if (!carouselSectionEl) return; 

        const sectionTop = carouselSectionEl.offsetTop;
        const sectionHeight = carouselSectionEl.offsetHeight;
        const scrollableDistance = sectionHeight - window.innerHeight;
        const scrollY = window.scrollY;

        // Calcula o progresso (0 a 1)
        if (scrollY >= sectionTop) {
            const relativeScroll = scrollY - sectionTop;
            if (scrollableDistance > 0) { 
                const progress = Math.min(relativeScroll / scrollableDistance, 1);
                scrollProgress = progress;
            } else {
                scrollProgress = 0; 
            }
        } else {
            scrollProgress = 0; 
        }

        updateCarouselVisuals(); // Chama a atualização visual
    }
    
    /**
     * 5. Função de Atualização Visual do Carrossel
     */
    function updateCarouselVisuals() {
        if (!carouselImageItems) return; 

        const carouselProgress = scrollProgress;
        
        const currentImageIndex = Math.min(
            Math.floor(carouselProgress * images.length),
            images.length - 1
        );

        // 1. Atualiza a opacidade do overlay
        if (carouselOverlayEl) {
             carouselOverlayEl.style.opacity = "1";
        }

        // 2. Atualiza as imagens (opacidade e z-index)
        carouselImageItems.forEach((item, index) => {
            if (index === currentImageIndex) {
                item.style.opacity = "1";
                item.style.zIndex = "10"; 
            } else {
                item.style.opacity = "0";
                item.style.zIndex = "0"; 
            }
        });

        // 3. Atualiza o texto do overlay (COM VERIFICAÇÃO)
        if (carouselTitleEl) { 
            if (images[currentImageIndex] && images[currentImageIndex].title) {
                carouselTitleEl.textContent = images[currentImageIndex].title;
            }
        }
        
        if (carouselCounterEl) {
             carouselCounterEl.textContent = `Imagem ${currentImageIndex + 1} de ${images.length}`;
        }

        // 4. Atualiza os pontos de paginação
        if (paginationDots) {
            paginationDots.forEach((dot, index) => {
                if (index === currentImageIndex) {
                    dot.classList.add("active-dot");
                } else {
                    dot.classList.remove("active-dot");
                }
            });
        }

        // 5. Atualiza a visibilidade da setinha de scroll
        if (scrollPromptArrowEl) {
            if (currentImageIndex === images.length - 1) {
                scrollPromptArrowEl.classList.add("hidden"); 
            } else {
                scrollPromptArrowEl.classList.remove("hidden"); 
            }
        }
        
        // =====================================================================
        // --- 🚀 CÓDIGO MOVIDO PARA AQUI (DENTRO DA FUNÇÃO) 🚀 ---
        // =====================================================================
        // 6. Atualiza a transparência da navbar
        if (nav) {
            const isCarouselActive = (carouselProgress > 0.001 && carouselProgress < 0.99);
            
            if (isCarouselActive) {
                nav.classList.add('nav-transparent-override');
            } else {
                nav.classList.remove('nav-transparent-override');
            }
        }
    } // --- FIM DA FUNÇÃO updateCarouselVisuals ---


    /**
     * 6. Função de Inicialização do Carrossel
     */
    function initCarousel() {
        // 1. Seleciona todos os elementos necessários
        nav = document.getElementById('main-nav'); // <-- Seleciona o Nav
        carouselSectionEl = document.getElementById("scroll-carousel-section");
        
        if (!carouselSectionEl) {
            console.log("Carrossel por scroll não encontrado nesta página.");
            return;
        }
        
        carouselImageItems = document.querySelectorAll("#image-carousel-container .carousel-image-item");
        carouselOverlayEl = document.getElementById("carousel-overlay");
        carouselTitleEl = document.getElementById("carousel-title");
        carouselCounterEl = document.getElementById("carousel-counter");
        paginationDots = document.querySelectorAll("#pagination-dots .pagination-dot");
        scrollPromptArrowEl = document.getElementById("scroll-prompt-arrow");

        // Configura os cliques das bolinhas
        if (paginationDots) {
            paginationDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const sectionTop = carouselSectionEl.offsetTop;
                    const sectionHeight = carouselSectionEl.offsetHeight;
                    const scrollableDistance = sectionHeight - window.innerHeight;

                    let targetProgress = (index / images.length) + 0.01;
                    if (index === 0) {
                        targetProgress = 0.001; 
                    }

                    const targetScrollY = (targetProgress * scrollableDistance) + sectionTop;

                    window.scrollTo({
                        top: targetScrollY,
                        behavior: 'smooth'
                    });
                });
            });
        }

        // Define a altura da "pista"
        carouselSectionEl.style.height = `${images.length * 50}vh`;

        // Adiciona o "ouvinte" de scroll SÓ PARA O CARROSSEL
        window.addEventListener("scroll", handleCarouselScroll);

        // Executa uma vez no início para definir o estado
        handleCarouselScroll();
    } // Fim de initCarousel

    
    // --- INICIALIZAÇÃO DO CARROSSEL ---
    initCarousel();

    // ==========================================================
    // --- 🚀 FIM DO CÓDIGO DO CARROSSEL ---
    // ==========================================================

}); // Fim do 'DOMContentLoaded'