document.addEventListener('DOMContentLoaded', function() {
// ==========================================================
    // --- 🚀 INÍCIO DO NOVO CÓDIGO (DETETOR DE MOBILE) ---
    // ==========================================================
    function isMobile() {
        // Uma forma simples de verificar se é um dispositivo móvel
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    // ==========================================================
    // --- 🚀 FIM DO NOVO CÓDIGO ---
    // ==========================================================
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
    { id: 1, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`, categoria: "Pre-Production", slug: "pre-producao", items: [
        { nome: "Custom Scriptwriting", descricao: "We create original and adapted scripts focused on your message and audience, for films, series, or institutional videos." },
        { nome: "Concept Development (Shorts, Films, and Series)", descricao: "We build the narrative foundation of your project, creating strong concepts that will guide the entire audiovisual production." }
    ] },
    { id: 2, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>`, categoria: "Production and Filming", slug: "producao", items: [
        { nome: "Executive Production", descricao: "We manage all logistical and financial aspects of your production, ensuring efficient project execution." },
        { nome: "Film Co-Production", descricao: "We collaborate with other production companies to make large-scale film projects possible." },
        { nome: "Image and Video Capture", descricao: "We film with high-quality equipment and a specialized technical team to capture the essence of your story." },
        { nome: "Direct Sound Recording", descricao: "We ensure professional on-set audio capture for the best sound quality in your production." },
        { nome: "Behind the Scenes", descricao: "We document your production process, creating valuable extra content for promotion and archival." }
    ] },
    { id: 3, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>`, categoria: "Full Post-Production", slug: "pos-producao", items: [
        { nome: "Editing and Assembly", descricao: "We structure and give rhythm to your visual narrative, transforming raw material into a cohesive and engaging final product." },
        { nome: "Graphic Design", descricao: "We create visual elements, intros, captions, and motion graphics that complement and enhance your production." },
        { nome: "Color Grading", descricao: "We apply professional color correction to achieve the desired visual aesthetic and consistency throughout the project." },
        { nome: "Sound Design and Mixing", descricao: "We craft the soundscape of your project — effects, dialogue, and music — with professional mixing for cinema or web." },
        { nome: "Original Soundtrack", descricao: "We compose exclusive music that amplifies the emotion and identity of your audiovisual work." },
        { nome: "VFX (Visual Effects)", descricao: "We integrate digital effects to create impactful scenes, correct imperfections, or build imaginative worlds." },
        { nome: "Finalization and File Delivery", descricao: "We prepare the final files of your production in the proper formats for distribution across cinema, TV, or web platforms." }
    ] },
    { id: 4, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`, categoria: "Brand and Corporate Content", slug: "corporativo", items: [
        { nome: "Commercial Video Production", descricao: "We create creative and effective commercials and promotional videos to promote your brand, product, or service." },
        { nome: "Social Media Content Production", descricao: "We develop short, dynamic videos optimized for engagement on platforms like Instagram, TikTok, and YouTube." },
        { nome: "Training and E-Learning Videos", descricao: "We produce educational video materials for corporate training, online courses, and distance learning platforms." }
    ] },
    { id: 5, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`, categoria: "Special Formats and Events", slug: "eventos", items: [
        { nome: "Documentary Production", descricao: "We tell real stories with depth and sensitivity, from initial research to final film completion." },
        { nome: "Event Coverage", descricao: "We film your corporate, cultural, or social events with cinematic quality, creating a memorable video." },
        { nome: "Live Streaming", descricao: "We broadcast live events, lectures, or shows using multiple cameras and professional quality." }
    ] },
    { id: 6, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`, categoria: "Infrastructure and Support", slug: "infraestrutura", items: [
        { nome: "Equipment and Studio Rental", descricao: "We provide professional filming equipment and studio facilities for rent." }
    ] }
];

    
    const filtros = [ /* ... (no changes to filters structure) ... */
    { id: "todos", label: "All Services", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
    { id: "pre-producao", label: "Pre-Production", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>` },
    { id: "producao", label: "Production", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>` },
    { id: "pos-producao", label: "Post-Production", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>` },
    { id: "corporativo", label: "Corporate", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>` },
    { id: "eventos", label: "Events", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
    { id: "infraestrutura", label: "Infrastructure", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>` }
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
           const subject = encodeURIComponent(`Service Inquiry: ${servicoData.categoria} - ${item.nome}`);
const body = encodeURIComponent(
    `Hello Alomnésia,\n\nI would like to request a quote or more information about the service:\n"${item.nome}"\n\n[Please add more details about your project or question here]\n\nThank you,\n[Your Name]`
);
// (O seu código DEPOIS - CORRIGIDO)
let linkHref = '';
let linkTarget = 'rel="noopener"'; // 'rel="noopener"' é para todos

if (isMobile()) {
    // SOLUÇÃO PARA TELEMÓVEL (Mobile)
    linkHref = `mailto:${email}?subject=${subject}&body=${body}`;
} else {
    // SOLUÇÃO PARA COMPUTADOR (Desktop)
    linkHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    linkTarget += ' target="_blank"'; // Adiciona target="_blank" só para desktop
}

 return `
     <li data-animate="fade-up" data-delay="${index * 100 + idx * 50}">
         <div class="item-bullet"></div>
         <a href="${linkHref}" ${linkTarget} class="item-link">
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
        <div class="card-bottom-bar"></div>
    </div>
`;
}

// Function to generate CLICKABLE ITEM CARD (with description)
function createClickableItemCardHTML(itemData, index) {
    const email = "alomnesia@gmail.com";
    // Uses itemData.nome (which is the name of the service)
    const subject = encodeURIComponent(`Service Inquiry: ${itemData.nome}`);
    const body = encodeURIComponent(
        `Hello Alomnésia,\n\nI would like to request a quote or more information about the service:\n"${itemData.nome}"\n\n[Please add more details about your project or question here]\n\nThank you,\n[Your Name]`
    );
// (O seu código DEPOIS - CORRIGIDO)
let linkHref = '';
let linkTarget = 'rel="noopener"'; // 'rel="noopener"' é para todos

if (isMobile()) {
    // SOLUÇÃO PARA TELEMÓVEL (Mobile)
    linkHref = `mailto:${email}?subject=${subject}&body=${body}`;
} else {
    // SOLUÇÃO PARA COMPUTADOR (Desktop)
    linkHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    linkTarget += ' target="_blank"'; // Adiciona target="_blank" só para desktop
}

// O card inteiro é envolvido pelo link <a>
// A descrição (itemData.descricao) é adicionada ao corpo
return `
    <a href="${linkHref}" ${linkTarget} class="clickable-card service-card item-card" data-animate="fade-up" data-delay="${index * 80}">
            <div class="card-colored-header">
                <div class="card-header-content">
                    <div class="card-icon-container">${itemData.icon}</div>
                    <div class="card-header-text"><h3>${itemData.nome}</h3></div>
                </div>
            </div>
            <div class="category-card-body">
                <p class="clickable-item-description">${itemData.descricao}</p>
                <p class="click-prompt">Click to request information.</p>
            </div>
            <div class="card-bottom-bar"></div>
        </a>
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
                countLabel = count === 1 ? 'category' : 'categories';
            } else {
                const categoriaFiltrada = servicos.find(s => s.slug === filtroAtivo);
                if (categoriaFiltrada) {
                    // Mapeia os itens, agora passando o objeto item inteiro
                    const itemsParaCard = categoriaFiltrada.items.map((item, index) => ({
                        id: `${categoriaFiltrada.id}-${index}`,
                        icon: categoriaFiltrada.icon, // Ícone da categoria pai
                        nome: item.nome,              // Nome do item vira título
                        descricao: item.descricao,    // Descrição do item
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

            filterCountElement.innerHTML = `Showing <span>${count}</span> ${countLabel}`;
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