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

    // --- LÓGICA DA BARRA DE NAVEGAÇÃO AO ROLAR ---
    const nav = document.getElementById('main-nav');
    if (nav) {
        // Esta lógica pode ser reativada se você quiser que a navbar mude ao rolar.
    }

    // --- LÓGICA DO CARROSSEL DE PRODUÇÕES ---
    const productions = [
       
        { id: "tracos-de-uma-nova-pagina", title: "Traços de Uma Nova Página", type: "Longa", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", url: "tracospagina.html" },
        { id: "familia-fergus", title: "Família Fergus", type: "Série", poster: "https://images.unsplash.com/photo-1574267432644-f1d8bc3bd213?w=800&q=80", url: "familia.html" },
        { id: "era-uma-vez-serie", title: "Era Uma Vez - Série", type: "Série", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", url: "eraumavez.html" },
        { id: "erva-daninha", title: "Erva Daninha", type: "Curta", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80", url: "Ervadaninha.html" },
        { id: "interludio", title: "Interlúdio", type: "Curta", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80", url: "interludio.html" },
  {
    id: "era-uma-vez-em-cordel",
    title: "Era Uma Vez em Cordel",
    type: "Curta",
    poster: "cartaz-era-uma-vez-em-cordel.jpg",
    url: "cordel.html"
  },
  {
    id: "cyberfunk",
    title: "CyberFunk",
    type: "Curta",
    poster: "Cartaz-Cyberfunk.png",
    url: "cyberfunk.html"
  },
  {
    id: "lembrancas-de-uma-caminhada",
    title: "Lembranças de Uma Caminhada",
    type: "Curta",
    poster: "LEMBRANÇAS-DE-UMA-CAMINHADA-2.png",
    url: "lembrancas.html"
  }
];


    const carouselTrack = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    if (carouselTrack) {
        let currentIndex = 0;
        let autoplayInterval;
        let restartAutoplayTimer;

        function renderSlides() {
            carouselTrack.innerHTML = '';
            productions.forEach(prod => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = `<a href="${prod.url}" class="slide-content"><img src="${prod.poster}" alt="${prod.title}"><div class="slide-overlay"><div><span class="slide-type">${prod.type}</span><h3>${prod.title}</h3></div></div></a>`;
                carouselTrack.appendChild(slide);
            });
            renderDots(); // Os pontos são recriados aqui
            updateCarousel();
        }

        // --- CORREÇÃO NA CRIAÇÃO DOS PONTOS ---
        function renderDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            
            const visibleSlides = getVisibleSlidesCount();
            // Calcula o número correto de pontos necessários
            const numDots = productions.length - visibleSlides + 1;

            // Cria apenas o número correto de pontos
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                    resetAutoplay();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateCarousel() {
            const slides = carouselTrack.children;
            if (slides.length === 0) return;
            
            const slideWidth = slides[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(carouselTrack).gap);
            const offset = -currentIndex * (slideWidth + gap);
            carouselTrack.style.transform = `translateX(${offset}px)`;
            
            if (dotsContainer) {
                const dots = dotsContainer.children;
                Array.from(dots).forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }

        function getVisibleSlidesCount() {
            return window.innerWidth >= 768 ? 3 : 1;
        }

        function next() {
            const visibleSlides = getVisibleSlidesCount();
            const lastPossibleIndex = productions.length - visibleSlides;
            
            if (currentIndex >= lastPossibleIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }

        function prev() {
            const visibleSlides = getVisibleSlidesCount();
            const lastPossibleIndex = productions.length - visibleSlides;

            if (currentIndex <= 0) {
                currentIndex = lastPossibleIndex;
            } else {
                currentIndex--;
            }
            updateCarousel();
        }

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

        function startAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(next, 2000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            clearTimeout(restartAutoplayTimer);
            restartAutoplayTimer = setTimeout(startAutoplay, 4000);
        }

        // Inicialização
        renderSlides();
        startAutoplay();
        
        window.addEventListener('resize', () => {
            renderSlides();
        });
    }
});

