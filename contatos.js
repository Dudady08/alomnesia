/* ======================================================
   SCRIPT.JS (v6 - A Solução "iframe Oculto")
   Isto contorna 100% o erro de CORS.
   NÃO é mais necessário o Google Apps Script (.exec).
   ====================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DADOS DO SEU GOOGLE FORM ORIGINAL ---
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSertKlaZfWLnUmqyO-vPjmu5xpeVahbhXEelY--a7HlfjxvNQ/formResponse";
    const GOOGLE_ENTRY_IDS = {
        nome: "entry.2005620554",
        email: "entry.1045781291",
        mensagem: "entry.839337160"
    };
    // --------------------------------------------------

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

    // --- NOVA Função de Envio (iframe Oculto) ---
    function submitToGoogleForms(data) {
        // Cria um nome único para o iframe
        const iframeName = "submit_iframe_" + new Date().getTime();

        // 1. Cria o <iframe> e o torna invisível
        const iframe = document.createElement("iframe");
        iframe.name = iframeName;
        iframe.id = iframeName;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // 2. Cria o <form> e o torna invisível
        const hiddenForm = document.createElement("form");
        hiddenForm.method = "POST";
        hiddenForm.action = GOOGLE_FORM_URL;
        hiddenForm.target = iframeName; // Faz o form enviar para o iframe
        hiddenForm.style.display = "none";

        // 3. Adiciona os dados como inputs ocultos
        // Função auxiliar para criar os inputs
        function createHiddenInput(name, value) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            return input;
        }

        hiddenForm.appendChild(createHiddenInput(GOOGLE_ENTRY_IDS.nome, data.nome));
        hiddenForm.appendChild(createHiddenInput(GOOGLE_ENTRY_IDS.email, data.email));
        hiddenForm.appendChild(createHiddenInput(GOOGLE_ENTRY_IDS.mensagem, data.mensagem));
        
        // 4. Adiciona o form à página e o envia
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        // 5. Limpa o form e o iframe da página após 1s
        setTimeout(() => {
            document.body.removeChild(hiddenForm);
            document.body.removeChild(iframe);
        }, 1000);
    }

    // --- Lógica de Envio (MODIFICADA) ---
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isSubmitting) return;

            setSubmitting(true);

            // Prepara os dados do formulário visível
            const formData = {
                nome: nomeInput.value,
                email: emailInput.value,
                mensagem: mensagemInput.value
            };

            // --- AÇÃO: Enviar para o Google Forms (sem fetch) ---
            submitToGoogleForms(formData);
            
            // --- SIMULAÇÃO DE UI ---
            // Como este método não nos dá uma resposta de "sucesso",
            // vamos *assumir* que funcionou e mostrar a UI de sucesso.
            setTimeout(() => {
                setSubmitSuccess(true);
                clearForm();
                setSubmitting(false); // Para o carregamento

                // Esconde a mensagem de sucesso após 5s
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