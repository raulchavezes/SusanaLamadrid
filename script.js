// ─── Datos de proyectos ───
const projects = [
    {
        id: 1,
        title: "Cafetería Terrible Juan",
        category: "Comercial · Remodelación",
        location: "Montenegro",
        description: "Remodelación integral de la cafetería Terrible Juan en Montenegro. El proyecto recupera la calidez del local con materiales nobles —ladrillo expuesto, madera y vegetación— priorizando la luz natural y una atmósfera acogedora para la experiencia del comensal.",
        cover: "images/proyecto-1-1.png",
        slides: [
            { type: "pair",   images: ["images/proyecto-1-1.png", "images/proyecto-1-2.png"] },
            { type: "single", images: ["images/proyecto-1-3.png"] },
            { type: "pair",   images: ["images/proyecto-1-4.png", "images/proyecto-1-5.png"] },
            { type: "single", images: ["images/proyecto-1-6.png"] },
            { type: "pair",   images: ["images/proyecto-1-7.png", "images/proyecto-1-8.png"] },
            { type: "pair",   images: ["images/proyecto-1-9.png", "images/proyecto-1-10.png"] }
        ]
    },
    {
        id: 2,
        title: "12 Apóstoles",
        category: "Residencial",
        location: "Cerro del Cuatro",
        description: "Integración de un segundo piso para talleres, aprovechando la estructura existente con un lenguaje de materiales expuestos y un diseño funcional que dialoga con el contexto del cerro.",
        cover: "images/proyecto-2-1.png",
        slides: [ { type: "single", images: ["images/proyecto-2-1.png"] } ]
    },
    {
        id: 3,
        title: "Casa en Cañadas",
        category: "Residencial · Interiorismo",
        location: "Cañadas",
        description: "Proyecto integral de remodelación e interiorismo para una casa familiar, integrando espacios contemporáneos con comodidad y naturaleza.",
        cover: "images/proyecto-3-1.png",
        slides: [ { type: "single", images: ["images/proyecto-3-1.png"] } ]
    },
    {
        id: 4,
        title: "Café Terrible Juan — Providencia",
        category: "Comercial",
        location: "Providencia",
        description: "Primera sucursal del café Terrible Juan en Providencia. Remodelación con una identidad visual cálida y materiales naturales.",
        cover: "images/proyecto-4-1.png",
        slides: [ { type: "single", images: ["images/proyecto-4-1.png"] } ]
    },
    {
        id: 5,
        title: "Épona Cosméticos",
        category: "Comercial",
        location: "Guadalajara",
        description: "Remodelación de local comercial para una tienda de cosméticos orgánicos, inspirada en la diosa celta de la naturaleza y la fertilidad.",
        cover: "images/proyecto-5-1.png",
        slides: [ { type: "single", images: ["images/proyecto-5-1.png"] } ]
    },
    {
        id: 6,
        title: "Casa Particular",
        category: "Residencial",
        location: "Chapala",
        description: "Proyecto residencial que integra diseño contemporáneo con elementos naturales, generando espacios abiertos y luminosos.",
        cover: "images/proyecto-6-1.png",
        slides: [ { type: "single", images: ["images/proyecto-6-1.png"] } ]
    },
    {
        id: 7,
        title: "Casa Campestre",
        category: "Residencial",
        location: "Fraccionamiento Campestre",
        description: "Proyecto de casa campestre para desarrollo inmobiliario, combinando diseño moderno con espacios amplios.",
        cover: "images/proyecto-7-1.png",
        slides: [ { type: "single", images: ["images/proyecto-7-1.png"] } ]
    }
];

// ─── Navegación principal ───
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
const sections = document.querySelectorAll('.main .section');
const heroSection = document.getElementById('hero');

function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));
    const target = document.getElementById(id) || heroSection;
    target.classList.add('active');
    const activeNav = document.querySelector(`.sidebar-nav [data-section="${id}"]`);
    if (activeNav) activeNav.classList.add('active');
}

navItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        showSection(item.dataset.section);
        history.replaceState(null, '', `#${item.dataset.section}`);
    });
});

document.querySelector('.logo-link').addEventListener('click', e => {
    e.preventDefault();
    showSection('hero');
    history.replaceState(null, '', '#hero');
});

const initial = location.hash.replace('#', '');
showSection(initial && document.getElementById(initial) ? initial : 'hero');

// ─── Listado de proyectos (escalonado) ───
const flow = document.getElementById('projectsFlow');
const layout = [
    { pos: 'pos-right',  w: '52%' },
    { pos: 'pos-left',   w: '40%' },
    { pos: 'pos-right',  w: '46%' },
    { pos: 'pos-left',   w: '50%' },
    { pos: 'pos-right',  w: '42%' },
    { pos: 'pos-left',   w: '47%' },
    { pos: 'pos-right',  w: '52%' }
];

projects.forEach((project, i) => {
    const l = layout[i % layout.length];
    const card = document.createElement('a');
    card.className = `project ${l.pos}`;
    card.style.width = l.w;
    card.href = `#proyecto-${project.id}`;
    card.innerHTML = `
        <div class="project-img-wrap">
            <img src="${project.cover}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-caption">
            ${project.title}
            <span class="loc">${project.location || ''}</span>
        </div>
    `;
    card.addEventListener('click', e => {
        e.preventDefault();
        openDetail(project.id);
    });
    flow.appendChild(card);
});

// ─── Detalle de proyecto ───
const detail = document.getElementById('detail');
const detailTitle = document.getElementById('detailTitle');
const detailGallery = document.getElementById('detailGallery');
const detailCounter = document.getElementById('detailCounter');
const detailTextTitle = document.getElementById('detailTextTitle');
const detailDesc = document.getElementById('detailDesc');
const detailInfoList = document.getElementById('detailInfoList');
const detailScroll = document.getElementById('detailScroll');
const detailBack = document.getElementById('detailBack');
const detailNavItems = document.querySelectorAll('.detail-nav-item');

function openDetail(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;

    detailTitle.textContent = p.title;
    detailTextTitle.textContent = p.title;
    detailDesc.textContent = p.description;

    detailInfoList.innerHTML = `
        <dt>Categoría</dt><dd>${p.category}</dd>
        <dt>Ubicación</dt><dd>${p.location || '—'}</dd>
        <dt>Estudio</dt><dd>Gamez Lamadrid Taller</dd>
    `;

    detailGallery.innerHTML = p.slides.map(slide => {
        const imgs = slide.images.map(src => `<img src="${src}" alt="${p.title}">`).join('');
        return `<div class="slide ${slide.type}">${imgs}</div>`;
    }).join('');

    detailScroll.scrollTop = 0;
    detailGallery.scrollLeft = 0;
    setActiveDetailNav('imagenes');
    updateCounter();

    detail.classList.add('open');
    detail.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    detail.classList.remove('open');
    detail.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    showSection('proyectos');
}

detailBack.addEventListener('click', closeDetail);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && detail.classList.contains('open')) closeDetail();
});

// contador de imágenes
function updateCounter() {
    const slides = [...detailGallery.children];
    if (!slides.length) { detailCounter.textContent = ''; return; }
    const center = detailGallery.scrollLeft + detailGallery.clientWidth / 2;
    let idx = 0, min = Infinity;
    slides.forEach((s, i) => {
        const c = s.offsetLeft + s.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < min) { min = d; idx = i; }
    });
    const pad = n => String(n).padStart(2, '0');
    detailCounter.textContent = `${pad(idx + 1)} / ${pad(slides.length)}`;
}
detailGallery.addEventListener('scroll', updateCounter);

// sub-navegación del detalle
function setActiveDetailNav(target) {
    detailNavItems.forEach(a => a.classList.toggle('active', a.dataset.target === target));
}

detailNavItems.forEach(a => {
    a.addEventListener('click', () => {
        const map = { imagenes: 'sec-imagenes', texto: 'sec-texto', informacion: 'sec-informacion' };
        const el = document.getElementById(map[a.dataset.target]);
        if (a.dataset.target === 'imagenes') {
            detailScroll.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveDetailNav(a.dataset.target);
    });
});

// sincroniza sub-nav al hacer scroll
const detailSections = document.querySelectorAll('.detail-section');
const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            const t = en.target.id.replace('sec-', '');
            setActiveDetailNav(t);
        }
    });
}, { root: detailScroll, threshold: 0.55 });
detailSections.forEach(s => io.observe(s));
