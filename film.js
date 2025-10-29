// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DA BARRA DE NAVEGAÇÃO AO ROLAR ---
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = menuToggle.querySelector('.icon-menu');
    const iconClose = menuToggle.querySelector('.icon-close');

    if (menuToggle && mobileMenu) {
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
});
// ============ CARROSSEL COM EFEITO CORTINA ============
document.addEventListener("DOMContentLoaded", function() {
  // --- Definição de Estado e Dados ---
  const images = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      title: "Montanhas Majestosas",
    },
    {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
      title: "Oceano Infinito",
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
      title: "Céu Estrelado",
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
      title: "Floresta Encantada",
    },
    {
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80",
      title: "Deserto Dourado",
    },
  ];

  let scrollProgress = 0;
  let carouselSectionEl, curtainEl, carouselImageItems, carouselOverlayEl;
  let carouselTitleEl, carouselCounterEl, paginationDots, scrollPromptEl;

  /**
   * Pré-carrega todas as imagens do carrossel
   */
  function preloadImages() {
    console.log("🖼️ Pré-carregando imagens do carrossel...");
    images.forEach((imageData, index) => {
      const img = new Image();
      img.src = imageData.url;
      img.onload = () => {
        console.log(`✅ Imagem ${index + 1} carregada: ${imageData.title}`);
      };
    });
  }

  /**
   * Manipulação principal da rolagem
   */
  function handleScroll() {
    if (!carouselSectionEl) return;

    const sectionTop = carouselSectionEl.offsetTop;
    const sectionHeight = carouselSectionEl.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Ponto onde a ficha técnica está totalmente visível
    const fichaTecnica = document.querySelector('.tech-grid');
    const fichaTecnicaHeight = fichaTecnica ? fichaTecnica.offsetHeight : 0;
    const techSpecsVisiblePoint = sectionTop - windowHeight + fichaTecnicaHeight;

    if (scrollY >= techSpecsVisiblePoint) {
      const relativeScroll = scrollY - techSpecsVisiblePoint;
      const availableScroll = sectionHeight - windowHeight;
      const progress = Math.min(relativeScroll / availableScroll, 1);
      scrollProgress = progress;
    } else {
      scrollProgress = 0;
    }

    updateVisuals();
  }

  /**
   * Atualização visual baseada no scroll
   */
  function updateVisuals() {
    // Fase 1: Cortina sobe (0 a 0.2 do progresso total)
    const curtainProgress = Math.min(scrollProgress / 0.2, 1);
    const curtainTranslate = 100 - curtainProgress * 100;

    // Fase 2: Carrossel de imagens (0.2 a 1.0 do progresso)
    const carouselProgress = Math.max((scrollProgress - 0.2) / 0.4, 0);
    const currentImageIndex = Math.min(
      Math.floor(carouselProgress * images.length),
      images.length - 1
    );

    // 1. Atualiza a posição da cortina
    if (curtainEl) {
      curtainEl.style.transform = `translateY(${curtainTranslate}%)`;
    }

    // 2. Overlay só aparece quando a cortina está totalmente levantada
    if (carouselOverlayEl) {
      carouselOverlayEl.style.opacity = curtainProgress >= 1 ? "1" : "0";
    }

    // 3. Atualiza as imagens
    if (carouselImageItems) {
      carouselImageItems.forEach((item, index) => {
        if (index === currentImageIndex) {
          item.style.opacity = "1";
          item.style.zIndex = "10";
        } else {
          item.style.opacity = "0";
          item.style.zIndex = "0";
        }
      });
    }

    // 4. Atualiza textos
    if (carouselTitleEl && carouselCounterEl) {
      carouselTitleEl.textContent = images[currentImageIndex].title;
      carouselCounterEl.textContent = `Imagem ${currentImageIndex + 1} de ${images.length}`;
    }

    // 5. Atualiza paginação
    if (paginationDots) {
      paginationDots.forEach((dot, index) => {
        if (index === currentImageIndex) {
          dot.classList.add("active-dot");
        } else {
          dot.classList.remove("active-dot");
        }
      });
    }

    // 6. Atualiza prompt de rolagem
    if (scrollPromptEl) {
      if (scrollProgress < 0.95) {
        scrollPromptEl.style.display = "block";
        scrollPromptEl.textContent = curtainProgress < 1 
          ? "Role para revelar o carrossel ↓" 
          : "Continue rolando para ver as imagens ↓";
      } else {
        scrollPromptEl.style.display = "none";
      }
    }
  }

  /**
   * Inicialização do carrossel
   */
  function initCarousel() {
    // 1. Pré-carrega as imagens
    preloadImages();

    // 2. Seleciona elementos
    carouselSectionEl = document.getElementById("carousel-section");
    curtainEl = document.getElementById("curtain");
    carouselImageItems = document.querySelectorAll(".carousel-image-item");
    carouselOverlayEl = document.getElementById("carousel-overlay");
    carouselTitleEl = document.getElementById("carousel-title");
    carouselCounterEl = document.getElementById("carousel-counter");
    paginationDots = document.querySelectorAll("#pagination-dots .pagination-dot");
    scrollPromptEl = document.getElementById("scroll-prompt");

    // 3. Define altura dinâmica para a seção
    if (carouselSectionEl) {
      const fichaTecnica = document.querySelector('.tech-grid');
      const fichaTecnicaHeight = fichaTecnica ? fichaTecnica.offsetHeight : 0;
      carouselSectionEl.style.height = `${fichaTecnicaHeight + (images.length + 1) * 100}vh`;
    }

    // 4. Event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // 5. Estado inicial
    handleScroll();

    console.log("🎬 Carrossel inicializado com sucesso!");
  }

  // Inicializa quando a página carrega
  initCarousel();
}); 