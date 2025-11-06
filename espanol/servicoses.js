document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL MENÚ MÓVIL ---
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
    // --- FIN LÓGICA DEL MENÚ MÓVIL ---

    // --- Datos de los Servicios y Filtros (CON DESCRIPCIONES) ---
    const servicos = [ 
    { id: 1, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`, categoria: "Preproducción", slug: "pre-producao", items: [
        { nome: "Creación de Guiones Personalizados", descricao: "Creamos guiones originales y adaptados enfocados en tu mensaje y audiencia, para películas, series o videos institucionales." },
        { nome: "Desarrollo de Conceptos (Cortos, Películas y Series)", descricao: "Construimos la base narrativa de tu proyecto, creando conceptos sólidos que guiarán toda la producción audiovisual." }
    ] },
    { id: 2, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>`, categoria: "Producción y Rodaje", slug: "producao", items: [
        { nome: "Producción Ejecutiva", descricao: "Gestionamos todos los aspectos logísticos y financieros de tu producción, asegurando una ejecución eficiente del proyecto." },
        { nome: "Coproducción Cinematográfica", descricao: "Colaboramos con otras productoras para hacer posibles proyectos cinematográficos a gran escala." },
        { nome: "Captura de Imagen y Video", descricao: "Filmamos con equipos de alta calidad y un equipo técnico especializado para capturar la esencia de tu historia." },
        { nome: "Grabación de Sonido Directo", descricao: "Aseguramos una captura de audio profesional en el set para la mejor calidad de sonido en tu producción." },
        { nome: "Detrás de Cámaras (Making Of)", descricao: "Documentamos tu proceso de producción, creando valioso contenido extra para promoción y archivo." }
    ] },
    { id: 3, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>`, categoria: "Postproducción Completa", slug: "pos-producao", items: [
        { nome: "Edición y Montaje", descricao: "Estructuramos y damos ritmo a tu narrativa visual, transformando el material bruto en un producto final cohesivo y atractivo." },
        { nome: "Diseño Gráfico", descricao: "Creamos elementos visuales, intros, leyendas y motion graphics que complementan y realzan tu producción." },
        { nome: "Corrección de Color (Color Grading)", descricao: "Aplicamos corrección de color profesional para lograr la estética visual deseada y consistencia en todo el proyecto." },
        { nome: "Diseño y Mezcla de Sonido", descricao: "Creamos el paisaje sonoro de tu proyecto —efectos, diálogos y música— con mezcla profesional para cine o web." },
        { nome: "Banda Sonora Original", descricao: "Componemos música exclusiva que amplifica la emoción y la identidad de tu obra audiovisual." },
        { nome: "VFX (Efectos Visuales)", descricao: "Integramos efectos digitales para crear escenas impactantes, corregir imperfecciones o construir mundos imaginativos." },
        { nome: "Finalización y Entrega de Archivos", descricao: "Preparamos los archivos finales de tu producción en los formatos adecuados para su distribución en cine, TV o plataformas web." }
    ] },
    { id: 4, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`, categoria: "Contenido de Marca y Corporativo", slug: "corporativo", items: [
        { nome: "Producción de Videos Comerciales", descricao: "Creamos comerciales y videos promocionales creativos y efectivos para promover tu marca, producto o servicio." },
        { nome: "Producción de Contenido para Redes Sociales", descricao: "Desarrollamos videos cortos y dinámicos optimizados para el engagement en plataformas como Instagram, TikTok y YouTube." },
        { nome: "Videos de Capacitación y E-Learning", descricao: "Producimos materiales educativos en video para capacitación corporativa, cursos en línea y plataformas de educación a distancia." }
    ] },
    { id: 5, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`, categoria: "Formatos Especiales y Eventos", slug: "eventos", items: [
        { nome: "Producción de Documentales", descricao: "Contamos historias reales con profundidad y sensibilidad, desde la investigación inicial hasta la finalización de la película." },
        { nome: "Cobertura de Eventos", descricao: "Filmamos tus eventos corporativos, culturales o sociales con calidad cinematográfica, creando un video memorable." },
        { nome: "Transmisión en Vivo (Live Streaming)", descricao: "Transmitimos eventos, conferencias o espectáculos en vivo utilizando múltiples cámaras y calidad profesional." }
    ] },
    { id: 6, icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`, categoria: "Infraestructura y Soporte", slug: "infraestrutura", items: [
        { nome: "Alquiler de Equipos y Estudio", descricao: "Proporcionamos equipos de filmación profesional y facilidades de estudio en alquiler." }
    ] }
];

    
    const filtros = [
    { id: "todos", label: "Todos los Servicios", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
    { id: "pre-producao", label: "Preproducción", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>` },
    { id: "producao", label: "Producción", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 1 0 .836L16 20.818V13Z"/><rect width="14" height="18" x="2" y="3" rx="2"/></svg>` },
    { id: "pos-producao", label: "Postproducción", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8.76V19h11V8.76L12 14l-5.5-5.24Z"/><path d="M12 14v7"/><path d="M6.5 19H17.5"/></svg>` },
    { id: "corporativo", label: "Corporativo", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>` },
    { id: "eventos", label: "Eventos", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>` },
    { id: "infraestrutura", label: "Infraestructura", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>` }
];


    // --- Elementos DOM ---
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const servicesGrid = document.getElementById('services-grid');
    const filterCountElement = document.getElementById('filter-count');
    const gridWrapper = document.getElementById('services-grid-wrapper');

    let filtroAtivo = "todos"; // Estado inicial

    // --- Funciones de Renderización ---

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

    // Función para generar tarjeta de CATEGORÍA (con lista de enlaces)
    function createCategoryCardHTML(servicoData, index) {
        // Ahora acessamos item.nome e item.descricao
        const itemsHTML = servicoData.items.map((item, idx) => {
            const email = "alomnesia@gmail.com";
            // Usamos item.nome para el asunto y cuerpo
            const subject = encodeURIComponent(`Solicitud de Servicio: ${servicoData.categoria} - ${item.nome}`);
            const body = encodeURIComponent(
                `Hola Alomnésia,\n\nMe gustaría solicitar una cotización o más información sobre el servicio:\n"${item.nome}"\n\n[Por favor, añade más detalles sobre tu proyecto o pregunta aquí]\n\nGracias,\n[Tu Nombre]`
            );
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

            return `
                <li data-animate="fade-up" data-delay="${index * 100 + idx * 50}">
                    <div class="item-bullet"></div>
                    <a href="${mailtoLink}" rel="noopener" class="item-link">
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

    // Función para generar TARJETA DE ITEM CLICABLE (con descripción)
    function createClickableItemCardHTML(itemData, index) {
        const email = "alomnesia@gmail.com";
        // Usa itemData.nome (que es el nombre del servicio)
        const subject = encodeURIComponent(`Solicitud de Servicio: ${itemData.nome}`);
        const body = encodeURIComponent(
            `Hola Alomnésia,\n\nMe gustaría solicitar una cotización o más información sobre el servicio:\n"${itemData.nome}"\n\n[Por favor, añade más detalles sobre tu proyecto o pregunta aquí]\n\nGracias,\n[Tu Nombre]`
        );
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

        // La tarjeta entera está envuelta por el enlace <a>
        // La descripción (itemData.descricao) se añade al cuerpo
        return `
            <a href="${mailtoLink}" rel="noopener" class="clickable-card service-card item-card" data-animate="fade-up" data-delay="${index * 80}">
                <div class="card-colored-header">
                    <div class="card-header-content">
                        <div class="card-icon-container">${itemData.icon}</div>
                        <div class="card-header-text"><h3>${itemData.nome}</h3></div>
                    </div>
                </div>
                <div class="category-card-body">
                    <p class="clickable-item-description">${itemData.descricao}</p>
                    <p class="click-prompt">Haz clic para solicitar información.</p>
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
                countLabel = count === 1 ? 'categoría' : 'categorías';
            } else {
                const categoriaFiltrada = servicos.find(s => s.slug === filtroAtivo);
                if (categoriaFiltrada) {
                    // Mapea los ítems, ahora pasando el objeto ítem completo
                    const itemsParaCard = categoriaFiltrada.items.map((item, index) => ({
                        id: `${categoriaFiltrada.id}-${index}`,
                        icon: categoriaFiltrada.icon, // Icono de la categoría padre
                        nome: item.nome,           // Nombre del ítem se convierte en título
                        descricao: item.descricao,     // Descripción del ítem
                        slug: filtroAtivo + '-' + index
                    }));

                    // Llama a la función para tarjetas de ítem clicables
                    itemsParaCard.forEach((itemParaCard, index) => {
                            servicesGrid.innerHTML += createClickableItemCardHTML(itemParaCard, index);
                    });

                    count = itemsParaCard.length;
                    countLabel = count === 1 ? 'servicio' : 'servicios';
                } else {
                    servicesGrid.innerHTML = `<div class="empty-state">Ningún servicio encontrado.</div>`;
                    countLabel = 'servicios';
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

    // --- Lógica de Animación (Scroll) ---
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

    // --- Inicialización ---
    renderFilterButtons();
    renderServices();
    observeAnimatedElements();

});