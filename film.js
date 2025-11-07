// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {
        function isMobile() {
        // Uma forma simples de verificar se é um dispositivo móvel
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
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
        /* ==========================================================
   --- 🚀 INÍCIO DA CORREÇÃO (Email Mobile vs Desktop) ---
   ========================================================== */

// Esta função deteta se o utilizador está num telemóvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Esta lógica só corre se for detetado um telemóvel
if (isMobile()) {
    // 1. Encontra TODOS os links que apontam para o site do Gmail
    // (Isto inclui o card de Email e o link no rodapé)
    const gmailLinks = document.querySelectorAll('a[href*="mail.google.com/mail"]');

    // 2. Faz um loop por cada link encontrado
    gmailLinks.forEach(link => {
        // 3. Substitui o link do site (href) pelo link mailto:
        link.href = "mailto:alomnesia@gmail.com";

        // 4. Remove o target="_blank", que não é necessário no telemóvel
        link.removeAttribute('target');
    });
}

/* ==========================================================
   --- 🚀 FIM DA CORREÇÃO ---
   ========================================================== */
});
