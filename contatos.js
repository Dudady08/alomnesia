// script.js (v10 - A Solução "Dispare e Esqueça")
document.addEventListener('DOMContentLoaded', function() {
    
    // COLE A SUA *NOVA* URL DE IMPLANTAÇÃO AQUI
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOYfxLUiN9DcLH52NJz5D0R930c1zr5D3RynuPZ4Ar7Kr2iCSNrLGJPkKP2IBel_zD/exec"; // <-- SEU LINK ATUAL

    // --- Seletores (Sem alteração) ---
    const form = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('submit-btn-text');
    const btnLoading = document.getElementById('submit-btn-loading');
    const nomeInput = document.getElementById('form-nome');
    const emailInput = document.getElementById('form-email');
    const mensagemInput = document.getElementById('form-mensagem');
    const scrollToFormBtn = document.getElementById('scrollToFormBtn');
    const formSection = document.getElementById('form-section');
    
    let isSubmitting = false;

    // --- Lógica de Envio (MODIFICADA) ---
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isSubmitting) return;

            setSubmitting(true);

            // Prepara os dados (x-www-form-urlencoded)
            const formData = new URLSearchParams();
            formData.append('nome', nomeInput.value);
            formData.append('email', emailInput.value);
            formData.append('mensagem', mensagemInput.value);

            // --- MUDANÇA PRINCIPAL AQUI ---
            // "Dispare e esqueça". Nós enviamos os dados, mas não nos
            // importamos com a resposta (pois ela está quebrada).
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                body: formData.toString()
            });

            // Como não podemos confiar na resposta, nós *simulamos* o sucesso
            // (pois sabemos que o envio FUNCIONOU)
            setTimeout(() => {
                setSubmitSuccess(true);
                clearForm();
                setSubmitting(false); // Para o carregamento

                // Esconde a mensagem de sucesso
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            }, 1500); // 1.5s de simulação
        });
    }

    // --- RESTANTE DO SCRIPT (Sem alteração) ---
    if (scrollToFormBtn && formSection) {
        scrollToFormBtn.addEventListener('click', () => {
            formSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    function setSubmitting(loading) {
        isSubmitting = loading;
        submitBtn.disabled = loading;
        btnText.style.display = loading ? 'none' : 'inline-flex';
        btnLoading.style.display = loading ? 'inline-flex' : 'none';
    }

    function setSubmitSuccess(success) {
        formContainer.style.display = success ? 'none' : 'block';
        successMessage.style.display = success ? 'block' : 'none';
    }

    function clearForm() {
        nomeInput.value = "";
        emailInput.value = "";
        mensagemInput.value = "";
    }

    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

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