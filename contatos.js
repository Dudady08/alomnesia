// script.js (Versão v5 - Bypass CORS Preflight)
document.addEventListener('DOMContentLoaded', function() {
    
    // O seu link de implantação (não precisa mudar)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyf5hVI10ukwDI6OS34ZKC_shkkOUtWJuC1X9PH1C3xIfzXsMntUYDCxVm-z2WL3-h5/exec";

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

            // *** MUDANÇA IMPORTANTE AQUI ***
            // Em vez de JSON, criamos 'URLSearchParams' (dados de formulário)
            // Os nomes (ex: 'nome') devem bater com o 'e.parameter' no Apps Script
            const formData = new URLSearchParams();
            formData.append('nome', nomeInput.value);
            formData.append('email', emailInput.value);
            formData.append('mensagem', mensagemInput.value);

            // Envia os dados para o seu Google Apps Script
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    // *** MUDANÇA IMPORTANTE AQUI ***
                    // Este Content-Type é "simples" e NÃO dispara o erro de CORS
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                body: formData.toString() // Transforma em "nome=...&email=...&mensagem=..."
            })
            .then(res => res.json()) // A *resposta* do Google ainda é JSON
            .then(data => {
                console.log("Resposta do Apps Script:", data);
                if (data.result === "success") {
                    setSubmitSuccess(true);
                    clearForm();
                    
                    setTimeout(() => {
                        setSubmitSuccess(false);
                    }, 5000);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error("Erro ao enviar para o Google Script:", error);
                alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
            })
            .finally(() => {
                setSubmitting(false); // Para o carregamento
            });
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
            if (entry.isInteracting) {
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