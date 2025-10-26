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
                iconMenu.style.display = 'none';
                iconClose.style.display = 'block';
            } else {
                iconMenu.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    }

    // --- LÓGICA DA BARRA DE NAVEGAÇÃO AO ROLAR (SE EXISTIR) ---
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            // A barra de navegação já é fixa, então o efeito de scroll não é necessário
            // Se você quiser que ela mude de cor ao rolar, podemos adicionar aqui.
            // Por enquanto, ela é sempre escura.
        });
    }
document.addEventListener('DOMContentLoaded', function() {
    // ... (seu código existente do menu, formulário, etc.) ...

    // --- LÓGICA PARA LINK DO WHATSAPP ---
    const whatsappLink = document.getElementById('whatsapp-link');

    if (whatsappLink) {
        // Função simples para detetar mobile (baseado no User Agent ou touch events)
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        }

        if (isMobileDevice()) {
            // Se for mobile, muda o href para o esquema whatsapp://
            // Remove o código do país se já estiver no formato internacional correto para whatsapp://
            const phoneNumber = "5521988871005"; // Garanta que está SÓ NÚMEROS
            whatsappLink.href = `whatsapp://send?phone=${phoneNumber}`;
            whatsappLink.removeAttribute('target'); // target="_blank" não é necessário para app nativo
            console.log("Link do WhatsApp ajustado para mobile:", whatsappLink.href); 
        } else {
            // Mantém o link wa.me para desktop
            console.log("Link do WhatsApp mantido para desktop:", whatsappLink.href);
        }
    }
    // --- FIM LÓGICA WHATSAPP ---

}); // Fim do DOMContentLoaded
});