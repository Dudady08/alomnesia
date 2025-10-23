// contatos.js (Versão Corrigida)
document.addEventListener('DOMContentLoaded', function() {
    
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyf5hVI10ukwDI6OS34ZKC_shkkOUtWJuC1X9PH1C3xIfzXsMntUYDCxVm-z2WL3-h5/exec";

    // --- Seletores ---
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

    // --- Lógica de Envio CORRIGIDA ---
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (isSubmitting) return;

            setSubmitting(true);

            try {
                const formData = {
                    nome: nomeInput.value.trim(),
                    email: emailInput.value.trim(),
                    mensagem: mensagemInput.value.trim()
                };

                // Validação básica
                if (!formData.nome || !formData.email || !formData.mensagem) {
                    throw new Error('Por favor, preencha todos os campos.');
                }

                // Envia como JSON (mais robusto)
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log("Resposta do Apps Script:", data);
                
                if (data.result === "success") {
                    setSubmitSuccess(true);
                    clearForm();
                    
                    setTimeout(() => {
                        setSubmitSuccess(false);
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Erro ao enviar mensagem.');
                }
                
            } catch (error) {
                console.error("Erro ao enviar formulário:", error);
                alert(error.message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.');
            } finally {
                setSubmitting(false);
            }
        });
    }

    // --- Restante do código (sem alterações) ---
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

    // Animações
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