// FORÇA O NAVEGADOR A NÃO RESTAURAR O SCROLL AUTOMATICAMENTE NO LOAD
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// --- VARIÁVEIS GLOBAIS PARA CONTROLE DE API ---
let ytApiReady = false;
let domReady = false;
let playerInstances = [];
const slideElements = [];

// =================================================================
// === DADOS DOS VÍDEOS ATUALIZADOS PARA YOUTUBE ===
// =================================================================
const movies = [
    // Adicionando a propriedade 'url' a cada objeto
    { id: 1, title: "Traços de uma nova página", youtubeId: "c33Ivt9gLPM", url: "tracospagina.html" },
    { id: 2, title: "Família Fergus  Juntos pelo mundo", youtubeId: "Oq0vVGJ2dJ0", url: "familia.html" },
    { id: 3, title: "Era uma vez... em cordel", youtubeId: "mV_rM-o0Tzc", url: "eraumavez.html" } // Assumindo que este linka para a página da série/longa
];
// =================================================================

// --- ELEMENTOS DO CARROSSEL DE VÍDEO (definidos no escopo global do script) ---
let videoCarouselHero, slidesContainer, videoDotsContainer, titleContainer, titleTextElement, titleElement, progressInner, scrollIndicator, contentBelowHero;
let titleLinkElement; // <--- ADICIONE ESTA LINHA
let currentIndex = 0;
let isScrolling = false;
let isCarouselVisible = true;
let nav;

// --- FUNÇÃO CHAMADA PELA API DO YOUTUBE QUANDO PRONTA ---
function onYouTubeIframeAPIReady() {
    console.log("YouTube API Pronta.");
    ytApiReady = true;
    startCarouselIfReady();
}

// --- FUNÇÃO CHAMADA QUANDO O DOM ESTÁ PRONTO ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Pronto.");
    domReady = true;

    // --- FORÇA SCROLL PARA O TOPO (DENTRO DO DOMCONTENTLOADED) ---
    setTimeout(() => window.scrollTo(0, 0), 0);

    // --- LÓGICA DO MENU MOBILE (Preservada) ---
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
    // --- FIM LÓGICA DO MENU MOBILE ---

    // --- LÓGICA NAVBAR SCROLLED ---
    nav = document.getElementById('main-nav');
    if (nav) { window.addEventListener('scroll', updateNavBackground); }
    
    // --- Lógica de Scroll/Swipe (Adicionada aqui para ter acesso às funções) ---
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    // --- LÓGICA DO CARROSSEL DE IMAGENS (Preservada) ---
    initializeImageCarousel();

    // --- TENTA INICIAR O CARROSSEL DE VÍDEO ---
    startCarouselIfReady();
}); // Fim do DOMContentLoaded


// --- INICIALIZAÇÃO DO CARROSSEL DE VÍDEO (controlado por flags) ---
function startCarouselIfReady() {
    // Só executa se AMBOS o DOM e a API do YT estiverem prontos
    if (ytApiReady && domReady) {
        console.log("DOM e API prontos. Criando carrossel de vídeo...");
        createCarousel();
    }
}

function createCarousel() {
    // Seleciona os elementos do carrossel de vídeo
    videoCarouselHero = document.getElementById('video-carousel-hero');
    slidesContainer = document.getElementById('video-carousel-slides');
    videoDotsContainer = document.getElementById('video-carousel-dots');
    titleContainer = document.getElementById('video-carousel-title-container');
    titleLinkElement = document.getElementById('video-carousel-title-link'); // <--- ADICIONE ESTA LINHA
    titleTextElement = document.getElementById('video-carousel-title-text');
    titleElement = titleContainer ? titleContainer.querySelector('.video-carousel-title') : null;
    progressInner = document.getElementById('video-carousel-progress-inner');
    scrollIndicator = document.getElementById('video-carousel-scroll-indicator');
    contentBelowHero = document.getElementById('content-below-hero');

    if (!videoCarouselHero || !slidesContainer || !videoDotsContainer || !titleTextElement || !progressInner || !scrollIndicator || !contentBelowHero || movies.length === 0) {
        console.error("Elementos do carrossel ou conteúdo principal não encontrados, ou lista de vídeos vazia.");
        if(videoCarouselHero) videoCarouselHero.classList.add('hidden');
        if(contentBelowHero) { contentBelowHero.style.opacity = '1'; contentBelowHero.style.pointerEvents = 'auto'; }
        isCarouselVisible = false; updateNavBackground(); return;
    }

    slidesContainer.innerHTML = '';
    videoDotsContainer.innerHTML = '';
    let playersReadyCount = 0;

    movies.forEach((movie, index) => {
        // Cria a estrutura do slide
        const slide = document.createElement('div');
        slide.className = `video-carousel-slide ${index === 0 ? 'active' : ''}`;
        
        // Cria o placeholder para o player do YouTube
        const playerDiv = document.createElement('div');
        playerDiv.id = `yt-player-${index}`;
        slide.appendChild(playerDiv);

        const overlay = document.createElement('div'); 
        overlay.className = 'video-carousel-overlay';
        slide.appendChild(overlay); 
        
        slidesContainer.appendChild(slide);
        slideElements[index] = slide;

        // Cria o player do YouTube
        playerInstances[index] = new YT.Player(playerDiv.id, {
            height: '100%',
            width: '100%',
            videoId: movie.youtubeId,
            playerVars: {
                'autoplay': 0, // Controlado manualmente
                'controls': 0,
                'mute': 1, // Começa mutado para autoplay funcionar
                'playsinline': 1,
                'loop': 0, // Controlamos o 'ended' manualmente
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'iv_load_policy': 3, // Sem anotações
                'disablekb': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': (event) => onPlayerReady(event, index),
                'onStateChange': (event) => onPlayerStateChange(event, index),
                'onError': (event) => console.error(`Erro no Player ${index}:`, event.data)
            }
        });

        // Cria o dot de navegação
        const dot = document.createElement('button');
        dot.className = `video-carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', handleDotClick);
        videoDotsContainer.appendChild(dot);
    });

    function onPlayerReady(event, index) {
        playersReadyCount++;
        console.log(`Player ${index} está pronto.`);
        event.target.mute(); // Garante que está mutado

        // Se o PRIMEIRO player está pronto, iniciamos a UI
        if (index === 0) {
            contentBelowHero.style.opacity = '0'; 
            contentBelowHero.style.pointerEvents = 'none';
            videoCarouselHero.classList.remove('hidden'); 
            isCarouselVisible = true;
            updateUI(0, false);
            playCurrentVideo();
            updateNavBackground();
        }
    }

    function onPlayerStateChange(event, index) {
        // Se o vídeo terminou E é o vídeo atual
        if (event.data === YT.PlayerState.ENDED && index === currentIndex) {
            console.log(`Player ${index} terminou.`);
            handleVideoEnd(index);
        }
    }
}

function playCurrentVideo() {
    if (!isCarouselVisible || !playerInstances[currentIndex]) return;

    // Pausa todos os outros players
    playerInstances.forEach((player, idx) => {
        if (idx !== currentIndex && player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
            player.seekTo(0);
        }
    });

    // Toca o player atual
    if (playerInstances[currentIndex] && typeof playerInstances[currentIndex].playVideo === 'function') {
        console.log(`Tocando vídeo ${currentIndex}`);
        playerInstances[currentIndex].playVideo();
    }
}

function pauseCurrentVideo() {
    if (playerInstances[currentIndex] && typeof playerInstances[currentIndex].pauseVideo === 'function') {
        console.log(`Pausando vídeo ${currentIndex}`);
        playerInstances[currentIndex].pauseVideo();
    }
}

function updateUI(newIndex, playVideo = true) {
    if (!isCarouselVisible && playVideo && newIndex !== currentIndex) return;
    const oldIndex = currentIndex;
    currentIndex = newIndex;

    slideElements.forEach((slide, index) => { slide.classList.toggle('active', index === currentIndex); });

    const dots = videoDotsContainer.querySelectorAll('.video-carousel-dot');
    dots.forEach((dot, index) => { dot.classList.toggle('active', index === currentIndex); });

    if (titleElement) {
        titleElement.classList.remove('visible');
        setTimeout(() => {
            const currentMovie = movies[currentIndex]; // Pega o filme atual
            if(currentMovie) {
                // Atualiza o texto do H1
                titleTextElement.textContent = currentMovie.title;

                // ATUALIZA O LINK (href) da tag <a>
                if (titleLinkElement && currentMovie.url) {
                    titleLinkElement.href = currentMovie.url;
                } else if (titleLinkElement) {
                    // Se não houver URL definida para este filme, remove o link (ou aponta para #)
                    titleLinkElement.href = '#'; // Ou titleLinkElement.removeAttribute('href');
                }

                titleElement.classList.add('visible');
            }
        }, 50);
    } else if (titleTextElement && movies[currentIndex]) { // Fallback caso titleElement não exista
        titleTextElement.textContent = movies[currentIndex].title;
         // ATUALIZA O LINK (href) também no fallback
         const currentMovie = movies[currentIndex];
         if (titleLinkElement && currentMovie.url) {
             titleLinkElement.href = currentMovie.url;
         } else if (titleLinkElement) {
             titleLinkElement.href = '#';
         }
    }

    // ... resto da função updateUI (progressInner, scrollIndicator, pause/play video) ...
    if (progressInner) { progressInner.style.width = `${((currentIndex + 1) / movies.length) * 100}%`; }
    if (scrollIndicator) { scrollIndicator.classList.toggle('hidden', currentIndex === movies.length - 1); }

    if (playVideo && oldIndex !== newIndex && playerInstances[oldIndex] && typeof playerInstances[oldIndex].pauseVideo === 'function') {
        playerInstances[oldIndex].pauseVideo();
        playerInstances[oldIndex].seekTo(0);
    }

    if (playVideo) {
        setTimeout(playCurrentVideo, 150);
    }
}

function handleVideoEnd(endedIndex) {
    if (!isCarouselVisible || endedIndex !== currentIndex) return;
    if (currentIndex < movies.length - 1) { 
        updateUI(currentIndex + 1); 
    } else { 
        transitionToMainContent(); 
    }
}

// --- Funções de Navegação (Scroll/Swipe) ---

function handleGlobalWheel(e) {
    if (isCarouselVisible) { handleCarouselWheel(e); }
    else { handlePageWheel(e); }
}

function handleCarouselWheel(e) {
    if (isScrolling) { e.preventDefault(); return };
    e.preventDefault();
    const scrollThreshold = 10;
    if (e.deltaY > scrollThreshold) {
        if (currentIndex < movies.length - 1) { 
            setIsScrolling(true); updateUI(currentIndex + 1); setTimeout(() => setIsScrolling(false), 800); 
        } else { 
            transitionToMainContent(); 
        }
    } else if (e.deltaY < -scrollThreshold) {
        if (currentIndex > 0) { 
            setIsScrolling(true); updateUI(currentIndex - 1); setTimeout(() => setIsScrolling(false), 800); 
        }
    }
}

function handlePageWheel(e) {
    if (isScrolling) { e.preventDefault(); return };
    const scrollThreshold = 10;
    const contentTop = contentBelowHero ? contentBelowHero.getBoundingClientRect().top : 0;
    if (e.deltaY < -scrollThreshold && contentTop >= 0 && window.scrollY < 50) { 
        e.preventDefault(); 
        transitionToVideoCarousel(); 
    }
}

let touchStartY = 0;
let touchEndY = 0;
const swipeThreshold = 50;

function handleTouchStart(e) {
    if (e.touches.length > 1) return;
    touchStartY = e.touches[0].clientY;
    touchEndY = touchStartY;
}

function handleTouchMove(e) {
    if (e.touches.length > 1) return;
    touchEndY = e.touches[0].clientY;
    if (isCarouselVisible) {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    if (e.changedTouches.length > 1) return;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > swipeThreshold) {
        if (isCarouselVisible) {
            if (isScrolling) return;
            if (deltaY > 0) { // Swipe Cima
                if (currentIndex < movies.length - 1) {
                    setIsScrolling(true); updateUI(currentIndex + 1); setTimeout(() => setIsScrolling(false), 800);
                } else {
                    transitionToMainContent();
                }
            } else { // Swipe Baixo
                if (currentIndex > 0) {
                    setIsScrolling(true); updateUI(currentIndex - 1); setTimeout(() => setIsScrolling(false), 800);
                }
            }
        } else { // Fora do carrossel
            const contentTop = contentBelowHero ? contentBelowHero.getBoundingClientRect().top : 0;
            if (deltaY < 0 && contentTop >= 0 && window.scrollY < 50) {
                transitionToVideoCarousel();
            }
        }
    }
    touchStartY = 0;
    touchEndY = 0;
}

function handleDotClick(event) {
    if (isScrolling || !isCarouselVisible) return;
    const newIndex = parseInt(event.target.dataset.index);
    if (newIndex !== currentIndex) { updateUI(newIndex); }
}

function setIsScrolling(value) { isScrolling = value; }

function transitionToMainContent() {
    if (!isCarouselVisible) return;
    console.log("Transicionando para conteúdo principal...");
    isCarouselVisible = false; 
    pauseCurrentVideo();
    videoCarouselHero.classList.add('hidden');
    if(contentBelowHero) { contentBelowHero.style.opacity = '1'; contentBelowHero.style.pointerEvents = 'auto'; }
    updateNavBackground();
    setTimeout(() => { 
        const navHeight = nav ? nav.offsetHeight : 65; 
        const contentTop = contentBelowHero ? contentBelowHero.getBoundingClientRect().top : 0; 
        if (contentTop > navHeight + 10) { 
            if(contentBelowHero) contentBelowHero.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        } 
    }, 700);
}

function transitionToVideoCarousel() {
    if (isCarouselVisible || isScrolling) return;
    console.log("Transicionando de volta para o carrossel...");
    isCarouselVisible = true; setIsScrolling(true);
    if(contentBelowHero) { contentBelowHero.style.opacity = '0'; contentBelowHero.style.pointerEvents = 'none'; }
    videoCarouselHero.classList.remove('hidden');
    updateUI(currentIndex, true);
    updateNavBackground();
    setTimeout(() => setIsScrolling(false), 700);
}

// VERSÃO CORRIGIDA
function updateNavBackground() {

    // --- NOVA LÓGICA DE DETECÇÃO DE SCROLLBAR ---
    // Se o carousel ESTIVER visível (isCarouselVisible === true)
    // E o usuário scrolou para baixo (usamos 10px como um pequeno "limite")
    // Isso significa que ele usou a barra de scroll, "pulando" a lógica do wheel.
    // Devemos forçar a transição para o conteúdo principal.
    if (isCarouselVisible && window.scrollY > 10) {
        console.log("Scrollbar detectado, forçando transição para conteúdo.");
        // Chama a mesma função que o evento 'wheel' chamaria
        transitionToMainContent(); 
    }
    // --- FIM DA NOVA LÓGICA ---

    // Lógica original da navbar (continua funcionando)
    if (nav) {
        // A condição "|| !isCarouselVisible" garante que o nav fique 'scrolled'
        // assim que a transição acima for chamada.
        if (window.scrollY > 50 || !isCarouselVisible) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}

// --- LÓGICA DO CARROSSEL DE IMAGENS (Função de inicialização) ---
function initializeImageCarousel() {
    const imageCarouselTrack = document.getElementById('image-carousel-track');
    const imageDotsContainer = document.getElementById('image-carousel-dots');
    const imageNextButton = document.getElementById('image-next-btn');
    const imagePrevButton = document.getElementById('image-prev-btn');

// [ SUBSTITUA PELO BLOCO ABAIXO ]
    if (imageCarouselTrack && imageDotsContainer && imageNextButton && imagePrevButton) {
        // --- ORDEM DOS POSTERS ATUALIZADA (Conforme sua última solicitação) ---
        const imageProductions = [
            { id: "era-uma-vez-em-cordel", title: "Era Uma Vez...em Cordel", type: "Curta", poster: "cartaz/cartaz era uma vez.jpg", url: "cordel.html" },
            { id: "tracos-de-uma-nova-pagina", title: "Traços de Uma Nova Página", type: "Longa", poster: "cartaz/cartaz traco.png", url: "tracospagina.html" },
            { id: "familia-fergus", title: "Família Fergus", type: "Série", poster: "cartaz/cartaz familia.jpg", url: "familia.html" },
            { id: "cyberfunk", title: "CyberFunk", type: "Curta", poster: "cartaz/Cartaz Cyberfunk.png", url: "cyberfunk.html" },
            { id: "era-uma-vez-serie", title: "Era Uma Vez...", type: "Série", poster: "cartaz/cartaz1.jpg", url: "eraumavez.html" },
            { id: "erva-daninha", title: "Erva Daninha", type: "Curta", poster: "cartaz/cartaz2.jpg" },
            { id: "lembrancas-de-uma-caminhada", title: "Lembranças de Uma Caminhada", type: "Curta", poster: "cartaz/cartaz caminhada.jpg", url: "lembrancas.html" },
            { id: "interludio", title: "Interlúdio", type: "Curta", poster: "cartaz/cartaz1.jpg", url: "interludio.html" },
            { id: "A melodia do Comércio Popular", title: "A melodia do Comércio Popular", type: "Curta", poster: "cartaz/cartaz2.jpg", url: "comercio.html" },
            { id: "Alomnésia", title: "Alomnésia", type: "Curta", poster: "cartaz/cartaz1.jpg", url: "alomnesia.html" }
        ];

        let imageCurrentIndex = 0; let imageTrackIndex = 0; let imageVisibleSlides = 0; let imageCloneCount = 0;
        let imageIsTransitioning = false; let imageAutoplayInterval; let imageRestartAutoplayTimer;

        function createImageSlideHTML(prod) { return `<div class="carousel-slide"><a href="${prod.url}" class="slide-content"><img src="${prod.poster}" alt="${prod.title}"><div class="slide-overlay"><div><span class="slide-type">${prod.type}</span><h3>${prod.title}</h3></div></div></a></div>`; }
        function renderImageSlides() { imageVisibleSlides = getImageVisibleSlidesCount(); imageCloneCount = imageVisibleSlides > 0 ? imageVisibleSlides : 1; const clonesStart = imageProductions.slice(-imageCloneCount); const clonesEnd = imageProductions.slice(0, imageCloneCount); imageCarouselTrack.innerHTML = [ ...(clonesStart.length > 0 ? clonesStart.map(createImageSlideHTML) : []), ...imageProductions.map(createImageSlideHTML), ...(clonesEnd.length > 0 ? clonesEnd.map(createImageSlideHTML) : []) ].join(''); imageCurrentIndex = 0; imageTrackIndex = imageCloneCount; updateImageCarousel(false); renderImageDots(); }
        function renderImageDots() { imageDotsContainer.innerHTML = ''; const numDots = imageProductions.length; if (numDots <= imageVisibleSlides || numDots === 0) { imageDotsContainer.style.display = 'none'; return; } imageDotsContainer.style.display = 'flex'; for (let i = 0; i < numDots; i++) { const dot = document.createElement('button'); dot.className = 'dot'; dot.addEventListener('click', () => { if (imageIsTransitioning) return; imageCurrentIndex = i; imageTrackIndex = i + imageCloneCount; updateImageCarousel(true); resetImageAutoplay(); }); imageDotsContainer.appendChild(dot); } updateImageDots(); }
        function updateImageCarousel(withAnimation = true) { if (imageIsTransitioning && withAnimation) return; imageIsTransitioning = withAnimation; const slides = imageCarouselTrack.children; if (slides.length === 0) return; const slideWidth = slides.length > imageCloneCount * 2 ? slides[imageCloneCount].offsetWidth : 0; const gap = parseInt(window.getComputedStyle(imageCarouselTrack).gap || '0px'); const offset = -imageTrackIndex * (slideWidth + gap); imageCarouselTrack.style.transition = withAnimation ? 'transform 0.5s ease-out' : 'none'; imageCarouselTrack.style.transform = `translateX(${offset}px)`; updateImageDots(); }
        function updateImageDots() { const dots = imageDotsContainer.children; if (imageProductions.length === 0) return; Array.from(dots).forEach((dot, index) => { let activeIndex = (imageCurrentIndex + imageProductions.length) % imageProductions.length; dot.classList.toggle('active', index === activeIndex); }); }
        function getImageVisibleSlidesCount() { if (window.innerWidth >= 768) return 3; if (window.innerWidth > 0) return 1; return 0; }
        function nextImage() { if (imageIsTransitioning || imageProductions.length === 0) return; imageCurrentIndex++; imageTrackIndex++; updateImageCarousel(true); }
        function prevImage() { if (imageIsTransitioning || imageProductions.length === 0) return; imageCurrentIndex--; imageTrackIndex--; updateImageCarousel(true); }
        function handleImageTransitionEnd() { imageIsTransitioning = false; if (imageProductions.length === 0) return; if (imageCurrentIndex >= imageProductions.length) { imageCurrentIndex = 0; imageTrackIndex = imageCloneCount; updateImageCarousel(false); } if (imageCurrentIndex < 0) { imageCurrentIndex = imageProductions.length - 1; imageTrackIndex = (imageProductions.length - 1) + imageCloneCount; updateImageCarousel(false); } }
        imageNextButton.addEventListener('click', () => { nextImage(); resetImageAutoplay(); }); imagePrevButton.addEventListener('click', () => { prevImage(); resetImageAutoplay(); }); imageCarouselTrack.addEventListener('transitionend', handleImageTransitionEnd);
        function startImageAutoplay() { clearInterval(imageAutoplayInterval); if (imageProductions.length > imageVisibleSlides) { imageAutoplayInterval = setInterval(nextImage, 3000); } }
        function resetImageAutoplay() { clearInterval(imageAutoplayInterval); clearTimeout(imageRestartAutoplayTimer); if (imageProductions.length > imageVisibleSlides) { imageRestartAutoplayTimer = setTimeout(startImageAutoplay, 5000); } }
        
        renderImageSlides(); 
        startImageAutoplay();
        window.addEventListener('resize', () => { renderImageSlides(); startImageAutoplay(); });

    } else { console.warn("Elementos do carrossel de imagens não encontrados. Ele não será inicializado."); }
}
// --- FIM LÓGICA DO CARROSSEL DE IMAGENS ---