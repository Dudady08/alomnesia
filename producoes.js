// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Verifica se os seletores encontraram os elementos
    if (menuToggle && mobileMenu) {
        const iconMenu = menuToggle.querySelector('.icon-menu');
        const iconClose = menuToggle.querySelector('.icon-close');

        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'open' no menu
            mobileMenu.classList.toggle('open');
            
            // Alterna a visibilidade dos ícones
            if (mobileMenu.classList.contains('open')) {
                if (iconMenu) iconMenu.style.display = 'none';
                if (iconClose) iconClose.style.display = 'block';
            } else {
                if (iconMenu) iconMenu.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }

    // --- NOVA FUNCIONALIDADE: ANIMAÇÃO DOS CARDS AO ROLAR ---
    
    // 1. Seleciona todos os cards de filme
    const filmCards = document.querySelectorAll('.film-card');

    // 2. Cria um "observador"
    // IntersectionObserver é uma API moderna que observa quando um elemento entra na tela
    const cardObserver = new IntersectionObserver((entries, observer) => {
        
        // 3. Loop por cada "entry" (card) que o observador está vendo
        entries.forEach(entry => {
            // 4. Se o card está visível na tela (isIntersecting)
            if (entry.isIntersecting) {
                // 5. Adiciona a classe '.is-visible' para disparar a animação do CSS
                entry.target.classList.add('is-visible');
                
                // 6. Para de observar este card específico (para não animar de novo)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Opções: Inicia a animação quando 10% do card estiver visível
        threshold: 0.1 
    });

    // 7. Manda o observador "observar" cada card na lista
    filmCards.forEach(card => {
        cardObserver.observe(card);
    });

});