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
                if (iconMenu) iconMenu.style.display = 'none';
                if (iconClose) iconClose.style.display = 'block';
            } else {
                if (iconMenu) iconMenu.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }
});
