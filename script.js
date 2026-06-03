const projects = [
    {
        id: 1,
        title: "Remodelación Cafetería Terrible Juan",
        category: "Comercial",
        location: "Montenegro",
        description: "Remodelación completa de cafetería con diseño moderno, enfoque en materiales cálidos e iluminación natural.",
        images: [
            "images/proyecto-1-1.png",
            "images/proyecto-1-2.png",
            "images/proyecto-1-3.png",
            "images/proyecto-1-4.png",
            "images/proyecto-1-5.png",
            "images/proyecto-1-6.png",
            "images/proyecto-1-7.png",
            "images/proyecto-1-8.png",
            "images/proyecto-1-9.png",
            "images/proyecto-1-10.png"
        ]
    },
    {
        id: 2,
        title: "12 Apóstoles",
        category: "Residencial",
        location: "Cerro del Cuatro",
        description: "Integración de segundo piso para talleres, aprovechando el espacio existente con diseño funcional y materiales expuestos.",
        images: ["images/proyecto-2-1.png"]
    },
    {
        id: 3,
        title: "Casa en Cañadas",
        category: "Residencial · Interiorismo",
        location: "Cañadas",
        description: "Proyecto integral de remodelación e interiorismo para casa familiar, integrando espacios modernos con comodidad y naturaleza.",
        images: ["images/proyecto-3-1.png"]
    },
    {
        id: 4,
        title: "Café Terrible Juan — Providencia",
        category: "Comercial",
        location: "Providencia",
        description: "Primera sucursal del café Terrible Juan en Providencia. Remodelación con identidad visual cálida y materiales naturales.",
        images: ["images/proyecto-4-1.png"]
    },
    {
        id: 5,
        title: "Epona Cosméticos",
        category: "Comercial",
        location: "Guadalajara",
        description: "Remodelación para tienda de cosméticos orgánicos inspirada en la diosa celta de la naturaleza y la fertilidad.",
        images: ["images/proyecto-5-1.png"]
    },
    {
        id: 6,
        title: "Casa Particular",
        category: "Residencial",
        location: "Chapala",
        description: "Proyecto residencial que integra diseño contemporáneo con elementos naturales, generando espacios abiertos y luminosos.",
        images: ["images/proyecto-6-1.png"]
    },
    {
        id: 7,
        title: "Casa Campestre",
        category: "Residencial",
        location: "Fraccionamiento Campestre",
        description: "Proyecto de casa campestre para desarrollo inmobiliario, combinando diseño moderno con espacios amplios.",
        images: ["images/proyecto-7-1.png"]
    }
];

// ─── Navigation ───
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const heroSection = document.getElementById('hero');

function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const target = document.getElementById(id) || heroSection;
    target.classList.add('active');

    const activeNav = document.querySelector(`[data-section="${id}"]`);
    if (activeNav) activeNav.classList.add('active');
}

navItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const section = item.dataset.section;
        showSection(section);
        history.pushState(null, '', `#${section}`);
    });
});

// Logo → home
document.querySelector('.logo-link').addEventListener('click', e => {
    e.preventDefault();
    showSection('hero');
    history.pushState(null, '', '/');
});

// Handle initial hash
const hash = location.hash.replace('#', '');
if (hash) showSection(hash);
else heroSection.classList.add('active');

// ─── Projects Grid ───
const grid = document.getElementById('projectsGrid');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const img = document.createElement('img');
    img.src = project.images[0];
    img.alt = project.title;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'project-card-overlay';
    overlay.innerHTML = `
        <div class="project-card-title">${project.title}</div>
        <div class="project-card-loc">${project.location || ''}</div>
    `;

    card.appendChild(img);
    card.appendChild(overlay);
    card.addEventListener('click', () => openModal(project.id));
    grid.appendChild(card);
});

// ─── Modal ───
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
const modalLocation = document.getElementById('modalLocation');
const modalCounter = document.getElementById('modalCounter');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let activeProject = null;
let activeIndex = 0;

function openModal(id) {
    activeProject = projects.find(p => p.id === id);
    activeIndex = 0;
    renderModal();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function renderModal() {
    const p = activeProject;
    modalImg.src = p.images[activeIndex];
    modalImg.alt = p.title;
    modalTitle.textContent = p.title;
    modalCategory.textContent = p.category;
    modalDesc.textContent = p.description;
    modalLocation.textContent = p.location || '';

    const total = p.images.length;
    modalCounter.textContent = total > 1 ? `${activeIndex + 1} / ${total}` : '';
    modalPrev.style.display = total > 1 ? 'block' : 'none';
    modalNext.style.display = total > 1 ? 'block' : 'none';
}

modalPrev.addEventListener('click', () => {
    const len = activeProject.images.length;
    activeIndex = (activeIndex - 1 + len) % len;
    renderModal();
});

modalNext.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % activeProject.images.length;
    renderModal();
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
});
