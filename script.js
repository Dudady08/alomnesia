// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        const iconMenu = menuToggle.querySelector('.icon-menu');
        const iconClose = menuToggle.querySelector('.icon-close');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                if (iconMenu) iconMenu.style.display = 'none';
                if (iconClose) iconClose.style.display = 'block';
            } else {
                if (iconMenu) iconMenu.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }

    // --- LÓGICA DO CARROSSEL DE PRODUÇÕES (CORRIGIDA PARA LOOP INFINITO) ---
    const productions = [
        { id: "tracos-de-uma-nova-pagina", title: "Traços de Uma Nova Página", type: "Longa", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", url: "tracospagina.html" },
        { id: "familia-fergus", title: "Família Fergus", type: "Série", poster: "https://images.unsplash.com/photo-1574267432644-f1d8bc3bd213?w=800&q=80", url: "familia.html" },
        { id: "era-uma-vez-serie", title: "Era Uma Vez - Série", type: "Série", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", url: "eraumavez.html" },
        { id: "erva-daninha", title: "Erva Daninha", type: "Curta", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80", url: "Ervadaninha.html" },
        { id: "interludio", title: "Interlúdio", type: "Curta", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80", url: "interludio.html" },
        { id: "era-uma-vez-em-cordel", title: "Era Uma Vez em Cordel", type: "Curta", poster: "cartaz/cartaz era uma vez.jpg", url: "cordel.html" },
        { id: "cyberfunk", title: "CyberFunk", type: "Curta", poster: "cartaz/Cartaz Cyberfunk.png", url: "cyberfunk.html" },
        { id: "lembrancas-de-uma-caminhada", title: "Lembranças de Uma Caminhada", type: "Curta", poster: "cartaz/cartaz LEMBRANÇAS DE UMA CAMINHADA 2.png", url: "lembrancas.html" }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    if (carouselTrack) {
        // --- REVISÃO DA LÓGICA ---
        let currentIndex = 0; // Índice do *slide* real (0 a 7)
        let trackIndex = 0; // Índice do *track* (incluindo clones)
        let visibleSlides = 0;
        let cloneCount = 0; // Quantidade de clones no início
        let isTransitioning = false; // Flag para evitar cliques duplos

        let autoplayInterval;
        let restartAutoplayTimer;

        // Função que cria o HTML do slide
        function createSlideHTML(prod) {
            return `<div class="carousel-slide"><a href="${prod.url}" class="slide-content"><img src="${prod.poster}" alt="${prod.title}"><div class="slide-overlay"><div><span class="slide-type">${prod.type}</span><h3>${prod.title}</h3></div></div></a></div>`;
        }

        // Renderiza slides com clones no início e no fim
        function renderSlides() {
            visibleSlides = getVisibleSlidesCount();
            cloneCount = visibleSlides; // O número de clones é o número de slides visíveis
            
            const clonesStart = productions.slice(-cloneCount); // Clones do final
            const clonesEnd = productions.slice(0, cloneCount); // Clones do início

            // Monta o HTML: Clones do Fim + Slides Reais + Clones do Início
            carouselTrack.innerHTML = [
                ...clonesStart.map(createSlideHTML),
                ...productions.map(createSlideHTML),
                ...clonesEnd.map(createSlideHTML)
            ].join('');
            
            // Posição inicial (sem animação)
            currentIndex = 0; // Começa no primeiro slide real (índice 0)
            trackIndex = cloneCount; // O track começa na posição *após* os clones do início
            updateCarousel(false); // false = sem animação

            renderDots(); 
        }

        // Renderiza os pontos (um para cada slide real)
        function renderDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            
            // Um ponto para cada item em 'productions'
            const numDots = productions.length;
            if (numDots <= visibleSlides) {
                dotsContainer.style.display = 'none';
                return; // Não mostra pontos se todos os slides couberem
            } 
            dotsContainer.style.display = 'flex';


            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    currentIndex = i; // Define o slide real desejado
                    trackIndex = i + cloneCount; // Calcula a posição no track
                    updateCarousel(true);
                    resetAutoplay();
                });
                dotsContainer.appendChild(dot);
            }
            updateDots(); // Ativa o primeiro ponto
        }
        
        // Função de atualização com controle de animação
        function updateCarousel(withAnimation = true) {
            if (isTransitioning && withAnimation) return;
            isTransitioning = withAnimation; 

            const slides = carouselTrack.children;
            if (slides.length === 0) return;
            
            const slideWidth = slides[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(carouselTrack).gap);
            const offset = -trackIndex * (slideWidth + gap);
            
            carouselTrack.style.transition = withAnimation ? 'transform 0.5s ease-out' : 'none';
            carouselTrack.style.transform = `translateX(${offset}px)`;
            
            updateDots();
        }

        // Atualiza qual ponto está ativo
        function updateDots() {
            if (dotsContainer) {
                const dots = dotsContainer.children;
                Array.from(dots).forEach((dot, index) => {
                    // O `currentIndex` pode ser -1 ou 8 durante a transição,
                    // então fazemos o "wrap" (ex: 8 % 8 = 0)
                    let activeIndex = (currentIndex + productions.length) % productions.length;
                    dot.classList.toggle('active', index === activeIndex);
                });
            }
        }

        function getVisibleSlidesCount() {
            return window.innerWidth >= 768 ? 3 : 1;
        }

        function next() {
            if (isTransitioning) return;
            currentIndex++;
            trackIndex++;
            updateCarousel(true);
        }

        function prev() {
            if (isTransitioning) return;
            currentIndex--;
            trackIndex--;
            updateCarousel(true);
        }

        // --- CORREÇÃO: Lógica de "salto" silencioso ---
        // Esta função é chamada *depois* que a animação termina
        function handleTransitionEnd() {
            isTransitioning = false; 

            // Caso 1: Avançou para o primeiro clone do FIM
            // (Ex: Se há 8 slides, o currentIndex agora é 8)
            if (currentIndex === productions.length) {
                currentIndex = 0; // Reseta o índice do SLIDE para o primeiro real
                trackIndex = cloneCount; // Reseta o índice do TRACK
                updateCarousel(false); // Salto silencioso e invisível
            }

            // Caso 2: Voltou para o último clone do INÍCIO
            // (Ex: O currentIndex agora é -1)
            if (currentIndex < 0) {
                currentIndex = productions.length - 1; // Define SLIDE para o último real (7)
                trackIndex = (productions.length - 1) + cloneCount; // Define TRACK (7 + 3 = 10)
                updateCarousel(false); // Salto silencioso e invisível
            }
        }

        // Event Listeners dos botões
        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                next();
                resetAutoplay();
            });
            prevButton.addEventListener('click', () => {
                prev();
                resetAutoplay();
            });
        }

        // Ouve o fim da transição CSS para fazer o salto
        carouselTrack.addEventListener('transitionend', handleTransitionEnd);

        // Funções de Autoplay
        function startAutoplay() {
            clearInterval(autoplayInterval); // Limpa qualquer um que esteja rodando
            autoplayInterval = setInterval(() => {
                next(); // Apenas chama o next
            }, 3000); // CORREÇÃO: Aumentado para 3s (era 2s)
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval); // Para o 'tick'
            clearTimeout(restartAutoplayTimer); // Para o 'timer de restart'
            restartAutoplayTimer = setTimeout(startAutoplay, 5000); // Reinicia após 5s de inatividade
        }

        // Inicialização
        renderSlides();
        startAutoplay();
        
        // Refaz o carrossel se o tamanho da janela mudar
        window.addEventListener('resize', () => {
            renderSlides();
            startAutoplay(); // Reinicia o autoplay com os novos clones/tamanhos
        });
    }
});