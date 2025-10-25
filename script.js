// FORÇA O NAVEGADOR A NÃO RESTAURAR O SCROLL AUTOMATICAMENTE NO LOAD
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {

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
    const nav = document.getElementById('main-nav');
    let isCarouselVisible = true; // Estado inicial
    function updateNavBackground() {
        if (nav) {
            if (window.scrollY > 50 || !isCarouselVisible) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }
    if (nav) { window.addEventListener('scroll', updateNavBackground); }

    // --- LÓGICA DO CARROSSEL DE VÍDEO (Adaptada para Vimeo com HASH 'h') ---
    const videoCarouselHero = document.getElementById('video-carousel-hero');
    const slidesContainer = document.getElementById('video-carousel-slides');
    const videoDotsContainer = document.getElementById('video-carousel-dots');
    const titleContainer = document.getElementById('video-carousel-title-container');
    const titleTextElement = document.getElementById('video-carousel-title-text');
    const titleElement = titleContainer ? titleContainer.querySelector('.video-carousel-title') : null;
    const progressInner = document.getElementById('video-carousel-progress-inner');
    const scrollIndicator = document.getElementById('video-carousel-scroll-indicator');
    const contentBelowHero = document.getElementById('content-below-hero');

    // IDs VIMEO ATUALIZADOS
    const movies = [
        { id: 1, title: "Traços de uma nova página", vimeoId: "1067145734", h: "23ffd82e34" },
        { id: 2, title: "Família Fergus  Juntos pelo mundo", vimeoId: "1088783508", h: "98aac31fb5" },
        { id: 3, title: "Era uma vez...", vimeoId: "1074502769", h: "4625e723ec" }
    ];

    let currentIndex = 0;
    let isScrolling = false;
    const playerInstances = [];
    const slideElements = [];

    function createCarousel() {
        if (!videoCarouselHero || !slidesContainer || !videoDotsContainer || !titleTextElement || !progressInner || !scrollIndicator || !contentBelowHero || movies.length === 0) {
             console.error("Elementos do carrossel ou conteúdo principal não encontrados, ou lista de vídeos vazia.");
             if(videoCarouselHero) videoCarouselHero.classList.add('hidden');
             if(contentBelowHero) { contentBelowHero.style.opacity = '1'; contentBelowHero.style.pointerEvents = 'auto'; }
             isCarouselVisible = false; updateNavBackground(); return;
        }

        slidesContainer.innerHTML = '';
        videoDotsContainer.innerHTML = '';

        movies.forEach((movie, index) => {
            const slide = document.createElement('div');
            slide.className = `video-carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.id = `vimeo-player-${index}`;

            // *** MUDANÇA AQUI: Adicionado dnt=1 (Do Not Track) ***
            const iframe = document.createElement('iframe');
            iframe.src = `https://player.vimeo.com/video/${movie.vimeoId}?h=${movie.h}&background=1&muted=1&autopause=0&loop=0&byline=0&title=0&quality=auto&dnt=1`; // Adicionado dnt=1
            iframe.width = "100%"; iframe.height = "100%"; iframe.frameborder = "0";
            iframe.allow = "autoplay; fullscreen; picture-in-picture";
            iframe.allowfullscreen = true;

            const overlay = document.createElement('div'); overlay.className = 'video-carousel-overlay';

            slide.appendChild(iframe); slide.appendChild(overlay); slidesContainer.appendChild(slide);
            slideElements[index] = slide;

            const player = new Vimeo.Player(iframe);
            playerInstances[index] = player;

            player.on('ended', () => handleVideoEnd(index));
            player.on('play', () => console.log(`Vimeo ${index} started playing`));
            player.on('pause', () => console.log(`Vimeo ${index} paused`));
            player.on('error', (error) => console.error(`Vimeo ${index} error:`, error));

            const dot = document.createElement('button');
            dot.className = `video-carousel-dot ${index === 0 ? 'active' : ''}`; dot.dataset.index = index;
            dot.addEventListener('click', handleDotClick); videoDotsContainer.appendChild(dot);
        });

        window.addEventListener('wheel', handleGlobalWheel, { passive: false });

        contentBelowHero.style.opacity = '0'; contentBelowHero.style.pointerEvents = 'none';
        videoCarouselHero.classList.remove('hidden'); isCarouselVisible = true;

        updateUI(0, false);

         if (playerInstances[0]) {
             playerInstances[0].ready().then(() => {
                 console.log("Player 0 ready, attempting play...");
                 playCurrentVideo();
             }).catch(error => console.error("Player 0 ready error:", error));
         } else {
            setTimeout(playCurrentVideo, 300);
         }

        updateNavBackground();
    }

    function playCurrentVideo() {
        if (!isCarouselVisible || !playerInstances[currentIndex]) return;

        // Pausa outros players
        playerInstances.forEach((player, idx) => {
            if (idx !== currentIndex) {
                player.pause().catch(e => {});
                player.setCurrentTime(0).catch(e => {});
            }
        });

        // *** MUDANÇA AQUI: Espera ready() antes de tocar ***
        playerInstances[currentIndex].ready().then(() => {
            console.log(`Player ${currentIndex} ready, playing.`);
            playerInstances[currentIndex].play().catch(error => { console.warn("Vimeo Autoplay impedido:", error); });
        }).catch(error => console.error(`Player ${currentIndex} ready error on play:`, error));
    }


    function pauseCurrentVideo() {
        if (playerInstances[currentIndex]) {
             playerInstances[currentIndex].pause().catch(e => {});
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
                 if(movies[currentIndex]) { titleTextElement.textContent = movies[currentIndex].title; titleElement.classList.add('visible'); }
             }, 50);
        } else if (titleTextElement && movies[currentIndex]) { titleTextElement.textContent = movies[currentIndex].title; }

        if (progressInner) { progressInner.style.width = `${((currentIndex + 1) / movies.length) * 100}%`; }
        if (scrollIndicator) { scrollIndicator.classList.toggle('hidden', currentIndex === movies.length - 1); }

        // Pausa o vídeo anterior
        if (playVideo && oldIndex !== newIndex && playerInstances[oldIndex]) {
            playerInstances[oldIndex].pause().catch(e => {});
            playerInstances[oldIndex].setCurrentTime(0).catch(e => {});
        }

        if (playVideo) {
            // *** MUDANÇA AQUI: Usa a função playCurrentVideo que já tem o ready() ***
            // Pequeno delay pode ser útil para a transição CSS
             setTimeout(playCurrentVideo, 150);
        }
    }

    function handleVideoEnd(endedIndex) {
        console.log(`Video ${endedIndex} ended.`);
        if (!isCarouselVisible || endedIndex !== currentIndex) return;
        if (currentIndex < movies.length - 1) { updateUI(currentIndex + 1); }
        else { transitionToMainContent(); }
    }

    function handleGlobalWheel(e) { /* ... (igual ao anterior) ... */
        if (isCarouselVisible) { handleCarouselWheel(e); }
        else { handlePageWheel(e); }
    }
    function handleCarouselWheel(e) { /* ... (igual ao anterior) ... */
        if (isScrolling) { e.preventDefault(); return };
        e.preventDefault();
        const scrollThreshold = 10;
        if (e.deltaY > scrollThreshold) {
            if (currentIndex < movies.length - 1) { setIsScrolling(true); updateUI(currentIndex + 1); setTimeout(() => setIsScrolling(false), 800); }
            else { transitionToMainContent(); }
        } else if (e.deltaY < -scrollThreshold) {
            if (currentIndex > 0) { setIsScrolling(true); updateUI(currentIndex - 1); setTimeout(() => setIsScrolling(false), 800); }
        }
    }
    function handlePageWheel(e) { /* ... (igual ao anterior) ... */
        if (isScrolling) { e.preventDefault(); return };
         const scrollThreshold = 10;
         const contentTop = contentBelowHero ? contentBelowHero.getBoundingClientRect().top : 0;
         if (e.deltaY < -scrollThreshold && contentTop >= 0 && window.scrollY < 50) { e.preventDefault(); transitionToVideoCarousel(); }
    }
    function handleDotClick(event) { /* ... (igual ao anterior) ... */
        if (isScrolling || !isCarouselVisible) return;
        const newIndex = parseInt(event.target.dataset.index);
        if (newIndex !== currentIndex) { updateUI(newIndex); }
    }
    function setIsScrolling(value) { isScrolling = value; }

    function transitionToMainContent() { /* ... (igual ao anterior) ... */
        if (!isCarouselVisible) return;
        console.log("Transicionando para conteúdo principal...");
        isCarouselVisible = false; pauseCurrentVideo();
        videoCarouselHero.classList.add('hidden');
        if(contentBelowHero) { contentBelowHero.style.opacity = '1'; contentBelowHero.style.pointerEvents = 'auto'; }
        updateNavBackground();
        setTimeout(() => { const navHeight = nav ? nav.offsetHeight : 65; const contentTop = contentBelowHero ? contentBelowHero.getBoundingClientRect().top : 0; if (contentTop > navHeight + 10) { if(contentBelowHero) contentBelowHero.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, 700);
    }
    function transitionToVideoCarousel() { /* ... (igual ao anterior) ... */
        if (isCarouselVisible || isScrolling) return;
        console.log("Transicionando de volta para o carrossel...");
        isCarouselVisible = true; setIsScrolling(true);
        if(contentBelowHero) { contentBelowHero.style.opacity = '0'; contentBelowHero.style.pointerEvents = 'none'; }
        videoCarouselHero.classList.remove('hidden');
        updateUI(currentIndex, true);
        updateNavBackground();
        setTimeout(() => setIsScrolling(false), 700);
    }

    // --- Inicialização Carrossel Vídeo ---
    createCarousel();

    // --- Lógica do Carrossel de Imagens (Preservada com IDs ajustados) ---
    const imageCarouselTrack = document.getElementById('image-carousel-track');
    const imageDotsContainer = document.getElementById('image-carousel-dots');
    const imageNextButton = document.getElementById('image-next-btn');
    const imagePrevButton = document.getElementById('image-prev-btn');

    if (imageCarouselTrack && imageDotsContainer && imageNextButton && imagePrevButton) {
        // ... (código COMPLETO do carrossel de imagens v10, sem alterações internas) ...
        const imageProductions = [ /* Seus dados de imagem aqui... */
             { id: "tracos-de-uma-nova-pagina", title: "Traços de Uma Nova Página", type: "Longa", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", url: "tracospagina.html" },
             { id: "familia-fergus", title: "Família Fergus", type: "Série", poster: "https://images.unsplash.com/photo-1574267432644-f1d8bc3bd213?w=800&q=80", url: "familia.html" },
             { id: "era-uma-vez-serie", title: "Era Uma Vez - Série", type: "Série", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", url: "eraumavez.html" },
             { id: "erva-daninha", title: "Erva Daninha", type: "Curta", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80", url: "Ervadaninha.html" },
             { id: "interludio", title: "Interlúdio", type: "Curta", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80", url: "interludio.html" },
             { id: "era-uma-vez-em-cordel", title: "Era Uma Vez em Cordel", type: "Curta", poster: "cartaz/cartaz era uma vez.jpg", url: "cordel.html" },
             { id: "cyberfunk", title: "CyberFunk", type: "Curta", poster: "cartaz/Cartaz Cyberfunk.png", url: "cyberfunk.html" },
             { id: "lembrancas-de-uma-caminhada", title: "Lembranças de Uma Caminhada", type: "Curta", poster: "cartaz/cartaz LEMBRANÇAS DE UMA CAMINHADA 2.png", url: "lembrancas.html" }
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
        renderImageSlides(); startImageAutoplay();
        window.addEventListener('resize', () => { renderImageSlides(); startImageAutoplay(); });

    } else { console.warn("Elementos do carrossel de imagens não encontrados. Ele não será inicializado."); }
    // --- FIM LÓGICA DO CARROSSEL DE IMAGENS ---

}); // Fim do DOMContentLoaded