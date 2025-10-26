document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MENU MOBILE ---
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

    // --- Dados dos Serviços e Filtros (COM DESCRIÇÕES) ---
    const servicos = [
        { id: 1, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`, categoria: "Pré-Produção", slug: "pre-producao", items: [{ nome: "Roteiro Personalizado", descricao: "Desenvolvemos roteiros originais e adaptados, focados na sua mensagem e público, para filmes, séries ou vídeos institucionais." },{ nome: "Argumento (Curtas, Filmes e Séries)", descricao: "Estruturamos a base narrativa do seu projeto, criando argumentos sólidos que guiarão toda a produção audiovisual." }] },
        { id: 2, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>`, categoria: "Produção e Captação", slug: "producao", items: [{ nome: "Produção Executiva", descricao: "Gerenciamos todos os aspectos logísticos e financeiros da sua produção, garantindo a execução eficiente do projeto." },{ nome: "Co-produção Cinematográfica", descricao: "Colaboramos em parceria com outras produtoras para viabilizar projetos cinematográficos de maior escala." },{ nome: "Captação de Imagem e Vídeo", descricao: "Realizamos filmagens com equipamentos de alta qualidade e equipe técnica especializada para capturar a essência da sua história." },{ nome: "Captação de Som Direto", descricao: "Garantimos a qualidade sonora da sua produção com captação profissional de áudio durante as filmagens." },{ nome: "Making Of", descricao: "Registramos os bastidores da sua produção, criando conteúdo extra valioso para divulgação e documentação." }] },
        { id: 3, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>`, categoria: "Pós-Produção Completa", slug: "pos-producao", items: [{ nome: "Edição e Montagem", descricao: "Estruturamos e damos ritmo à sua narrativa visual, transformando o material bruto em um produto final coeso e impactante." },{ nome: "Design Gráfico", descricao: "Criamos elementos visuais, vinhetas, legendas e motion graphics que complementam e enriquecem sua produção." },{ nome: "Color Grading", descricao: "Realizamos o tratamento de cor profissional para garantir a estética visual desejada e a consistência em todo o projeto." },{ nome: "Design de Som e Mixagem", descricao: "Criamos a paisagem sonora do seu projeto, incluindo efeitos, diálogos e música, com mixagem profissional para cinema ou web." },{ nome: "Trilha Sonora Original", descricao: "Composição de músicas exclusivas que potencializam a emoção e a identidade da sua obra audiovisual." },{ nome: "VFX (Efeitos Visuais)", descricao: "Integramos efeitos visuais digitais para criar cenas impactantes, corrigir imperfeições ou construir mundos fantásticos." },{ nome: "Finalização e Fechamento de Arquivos", descricao: "Preparamos os arquivos finais da sua produção nos formatos adequados para distribuição em diversas plataformas (cinema, TV, web)." }] },
        { id: 4, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`, categoria: "Conteúdo de Marca e Corporativo", slug: "corporativo", items: [{ nome: "Produção de Vídeos Publicitários", descricao: "Criamos comerciais e vídeos promocionais criativos e eficazes para divulgar sua marca, produto ou serviço." },{ nome: "Produção de Conteúdo para Redes Sociais", descricao: "Desenvolvemos vídeos curtos e dinâmicos, otimizados para engajamento em plataformas como Instagram, TikTok e YouTube." },{ nome: "Vídeos de Treinamento e EAD", descricao: "Produzimos materiais didáticos em vídeo para treinamentos corporativos, cursos online e plataformas de ensino a distância." }] },
        { id: 5, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`, categoria: "Formatos Especiais e Eventos", slug: "eventos", items: [{ nome: "Produção de Documentários", descricao: "Contamos histórias reais com profundidade e sensibilidade, desde a pesquisa inicial até a finalização do filme." },{ nome: "Cobertura de Eventos", descricao: "Registramos seus eventos corporativos, culturais ou sociais com qualidade cinematográfica, criando um vídeo memorável." },{ nome: "Transmissão Ao Vivo (Live Streaming)", descricao: "Realizamos a transmissão ao vivo de eventos, palestras ou shows com múltiplas câmeras e qualidade profissional." }] },
        { id: 6, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`, categoria: "Infraestrutura e Suporte", slug: "infraestrutura", items: [{ nome: "Aluguel de Equipamentos e Estúdio", descricao: "Disponibilizamos equipamentos de filmagem profissionais e estrutura de estúdio para locação." }] }
    ];
    const filtros = [ /* ... (sem alterações nos filtros) ... */
        { id: "todos", label: "Todos os Serviços", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
        { id: "pre-producao", label: "Pré-Produção", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>` },
        { id: "producao", label: "Produção", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>` },
        { id: "pos-producao", label: "Pós-Produção", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>` },
        { id: "corporativo", label: "Corporativo", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>` },
        { id: "eventos", label: "Eventos", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
        { id: "infraestrutura", label: "Infraestrutura", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l-.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>` }
    ];

    // --- DOM Elements ---
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const servicesGrid = document.getElementById('services-grid');
    const filterCountElement = document.getElementById('filter-count');
    const gridWrapper = document.getElementById('services-grid-wrapper');

    let filtroAtivo = "todos"; // Estado inicial

    // --- Funções de Renderização ---

    function createFilterButtonHTML(filtro, isAtivo) {
        return `
            <button
                class="filter-button ${isAtivo ? 'active' : ''}"
                data-filter="${filtro.id}"
            >
                ${filtro.icon}
                <span>${filtro.label}</span>
            </button>
        `;
    }

    // Função para gerar card de CATEGORIA (com lista de links)
    function createCategoryCardHTML(servicoData, index) {
        // Agora acessamos item.nome e item.descricao
        const itemsHTML = servicoData.items.map((item, idx) => {
            const email = "alomnesia@gmail.com";
            // Usamos item.nome para o assunto e corpo
            const subject = encodeURIComponent(`Interesse no Serviço: ${servicoData.categoria} - ${item.nome}`);
            const body = encodeURIComponent(
                `Olá Alomnésia,\n\nGostaria de solicitar um orçamento ou mais informações sobre o serviço:\n"${item.nome}"\n\n[Por favor, adicione aqui mais detalhes sobre seu projeto ou dúvida]\n\nObrigado,\n[Seu Nome]`
            );
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

             return `
                <li data-animate="fade-up" data-delay="${index * 100 + idx * 50}">
                    <div class="item-bullet"></div>
                    <a href="${gmailLink}" target="_blank" rel="noopener noreferrer" class="item-link">
                        <span>${item.nome}</span>
                    </a>
                </li>
            `;
        }).join('');

        return `
            <div class="service-card category-card" data-animate="fade-up" data-delay="${index * 100}">
                <div class="card-colored-header">
                    <div class="card-header-content">
                        <div class="card-icon-container">${servicoData.icon}</div>
                        <div class="card-header-text"><h3>${servicoData.categoria}</h3></div>
                    </div>
                </div>
                <div class="category-card-body">
                    <ul class="category-items-list">${itemsHTML}</ul>
                </div>
                <div class="card-bottom-bar" style="background-color: var(--orange);"></div> </div>
        `;
    }

    // Função para gerar card de ITEM CLICÁVEL (com descrição)
    function createClickableItemCardHTML(itemData, index) {
        const email = "alomnesia@gmail.com";
        // Usa itemData.nome (que é o nome do serviço)
        const subject = encodeURIComponent(`Interesse no Serviço: ${itemData.nome}`);
        const body = encodeURIComponent(
            `Olá Alomnésia,\n\nGostaria de solicitar um orçamento ou mais informações sobre o serviço:\n"${itemData.nome}"\n\n[Por favor, adicione aqui mais detalhes sobre seu projeto ou dúvida]\n\nObrigado,\n[Seu Nome]`
        );
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

        // O card inteiro é envolvido pelo link <a>
        // A descrição (itemData.descricao) é adicionada ao corpo
        return `
            <a href="${gmailLink}" target="_blank" rel="noopener noreferrer" class="clickable-card service-card item-card" data-animate="fade-up" data-delay="${index * 80}">
                <div class="card-colored-header">
                    <div class="card-header-content">
                        <div class="card-icon-container">${itemData.icon}</div>
                        <div class="card-header-text"><h3>${itemData.nome}</h3></div>
                    </div>
                </div>
                <div class="category-card-body">
                    <p class="clickable-item-description">${itemData.descricao}</p>
                    <p class="click-prompt">Clique para solicitar informações.</p> </div>
                <div class="card-bottom-bar" style="background-color: var(--orange);"></div> </a>
        `;
    }


    function renderServices() {
        gridWrapper.classList.add('fade-out');

        setTimeout(() => {
            servicesGrid.innerHTML = '';
            let count = 0;
            let countLabel = '';
            servicesGrid.className = 'services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8';

            if (filtroAtivo === "todos") {
                servicos.forEach((servico, index) => {
                    servicesGrid.innerHTML += createCategoryCardHTML(servico, index);
                });
                count = servicos.length;
                countLabel = count === 1 ? 'categoria' : 'categorias';
            } else {
                const categoriaFiltrada = servicos.find(s => s.slug === filtroAtivo);
                if (categoriaFiltrada) {
                    // Mapeia os itens, agora passando o objeto item inteiro
                    const itemsParaCard = categoriaFiltrada.items.map((item, index) => ({
                        id: `${categoriaFiltrada.id}-${index}`,
                        icon: categoriaFiltrada.icon, // Ícone da categoria pai
                        nome: item.nome,            // Nome do item vira título
                        descricao: item.descricao,  // Descrição do item
                        slug: filtroAtivo + '-' + index
                    }));

                    // Chama a função para cards de item clicáveis
                    itemsParaCard.forEach((itemParaCard, index) => {
                        servicesGrid.innerHTML += createClickableItemCardHTML(itemParaCard, index);
                    });

                    count = itemsParaCard.length;
                    countLabel = count === 1 ? 'serviço' : 'serviços';
                } else {
                    servicesGrid.innerHTML = `<div class="empty-state">Nenhum serviço encontrado.</div>`;
                    countLabel = 'serviços';
                }
            }

            filterCountElement.innerHTML = `Mostrando <span>${count}</span> ${countLabel}`;
            void gridWrapper.offsetWidth;
            gridWrapper.classList.remove('fade-out');
            observeAnimatedElements();

        }, 400);
    }

    function renderFilterButtons() {
        filterButtonsContainer.innerHTML = filtros.map(filtro =>
            createFilterButtonHTML(filtro, filtro.id === filtroAtivo)
        ).join('');

        const buttons = filterButtonsContainer.querySelectorAll('.filter-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                filtroAtivo = button.dataset.filter;
                renderFilterButtons();
                renderServices();
            });
        });
    }

    // --- Lógica de Animação (Scroll) ---
    let observer;

    function observeAnimatedElements() {
        if (observer) { observer.disconnect(); }
        const animatedElements = document.querySelectorAll('[data-animate]');
        if (animatedElements.length === 0) return;

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.classList.remove('is-visible');
            void el.offsetWidth;
            observer.observe(el);
        });
    }

    // --- Inicialização ---
    renderFilterButtons();
    renderServices();
    observeAnimatedElements();

});