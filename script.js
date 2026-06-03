// Projects Data
const projects = [
    {
        id: 1,
        title: "Remodelación Cafetería Terrible Juan",
        location: "Montenegro",
        category: "comercial",
        description: "Remodelación completa de cafetería con diseño moderno, enfoque en iluminación natural y ambientación acogedora.",
        images: ["images/proyecto-1-1.jpg", "images/proyecto-1-2.jpg", "images/proyecto-1-3.jpg"]
    },
    {
        id: 2,
        title: "12 Apóstoles",
        subtitle: "Integración de segundo piso para talleres",
        location: "Cerro del Cuatro",
        category: "residencial",
        description: "Proyecto de integración de segundo piso para talleres en cerro del cuatro, aprovechando el espacio existente con diseño funcional.",
        images: ["images/proyecto-2-1.jpg", "images/proyecto-2-2.jpg"]
    },
    {
        id: 3,
        title: "Remodelación e Interiorismo",
        subtitle: "Casa en Cañadas",
        location: "Cañadas",
        category: "residencial",
        description: "Proyecto integral de remodelación e interiorismo para casa familiar, integrando espacios modernos con comodidad y funcionalidad.",
        images: ["images/proyecto-3-1.jpg", "images/proyecto-3-2.jpg", "images/proyecto-3-3.jpg"]
    },
    {
        id: 4,
        title: "Café Terrible Juan",
        subtitle: "Primera sucursal en Providencia",
        location: "Providencia",
        category: "comercial",
        description: "Remodelación para local comercial con identidad visual moderna, creando un espacio atractivo para el público.",
        images: ["images/proyecto-4-1.jpg", "images/proyecto-4-2.jpg"]
    },
    {
        id: 5,
        title: "Tienda de Cosméticos Orgánicos",
        subtitle: "Inspirado en diosa celta",
        location: "Providencia",
        category: "comercial",
        description: "Remodelación local comercial para tienda de cosméticos orgánicos, inspirados en la diosa celta de la naturaleza y fertilidad.",
        images: ["images/proyecto-5-1.jpg", "images/proyecto-5-2.jpg"]
    },
    {
        id: 6,
        title: "Casa Particular",
        location: "Chapala",
        category: "residencial",
        description: "Proyecto residencial que integra diseño contemporáneo con elementos naturales, creando un espacio habitable de excelencia.",
        images: ["images/proyecto-6-1.jpg", "images/proyecto-6-2.jpg", "images/proyecto-6-3.jpg"]
    },
    {
        id: 7,
        title: "Casa Campestre",
        subtitle: "Proyecto para venta",
        location: "Fraccionamiento Campestre",
        category: "residencial",
        description: "Proyecto de casa campestre para desarrollo inmobiliario, combinando diseño moderno con espacios abiertos.",
        images: ["images/proyecto-7-1.jpg", "images/proyecto-7-2.jpg"]
    },
    {
        id: 8,
        title: "Mobiliario Personalizado",
        subtitle: "Para espacios residenciales y comerciales",
        category: "diseño",
        description: "Desarrollo de mobiliario diverso y personalizado para proyectos residenciales y comerciales, priorizando funcionalidad y estética.",
        images: ["images/proyecto-8-1.jpg", "images/proyecto-8-2.jpg"]
    },
    {
        id: 9,
        title: "Casa Particular",
        location: "Fraccionamiento Solares",
        category: "residencial",
        description: "Proyecto residencial en fraccionamiento de lujo, diseño contemporáneo con acabados de alta calidad.",
        images: ["images/proyecto-9-1.jpg", "images/proyecto-9-2.jpg"]
    },
    {
        id: 10,
        title: "Planta de Envasado",
        subtitle: "Tequila San Matías",
        location: "San Matías",
        category: "industrial",
        description: "Planta de envasado, oficinas y bodega para Tequila San Matías. Proyecto elaborado junto con QM constructora.",
        images: ["images/proyecto-10-1.jpg", "images/proyecto-10-2.jpg"]
    },
    {
        id: 11,
        title: "Remodelación de Terraza",
        category: "residencial",
        description: "La intención fue crear un espacio que funcionara como transición abierta e iluminada de las áreas privadas a públicas. Se modificó la losa de la casa creando un gran voladizo que amplía visualmente el espacio.",
        images: ["images/proyecto-11-1.jpg", "images/proyecto-11-2.jpg"]
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const closeBtn = document.querySelector('.close');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');

let currentProject = null;
let currentImageIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupModal();
    setupNavigation();
});

// Render Projects
function renderProjects() {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}">
            <img src="${project.images[0]}" alt="${project.title}" class="project-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22350%22 height=%22350%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22350%22 height=%22350%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3E${project.title}%3C/text%3E%3C/svg%3E'">
            <div class="project-info">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                ${project.subtitle ? `<p style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">${project.subtitle}</p>` : ''}
                ${project.location ? `<p style="font-size: 0.85rem; color: #bbb; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${project.location}</p>` : ''}
                <p class="project-description">${project.description}</p>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.id);
            openProjectModal(projectId);
        });
    });
}

// Open Project Modal
function openProjectModal(projectId) {
    currentProject = projects.find(p => p.id === projectId);
    currentImageIndex = 0;

    if (currentProject) {
        updateModalContent();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Update Modal Content
function updateModalContent() {
    if (!currentProject) return;

    modalTitle.textContent = currentProject.title;
    if (currentProject.subtitle) {
        modalTitle.textContent += ` - ${currentProject.subtitle}`;
    }

    modalDescription.textContent = currentProject.description;
    modalCategory.textContent = currentProject.category;

    if (currentProject.images && currentProject.images.length > 0) {
        modalImage.src = currentProject.images[currentImageIndex];
    }

    // Show/hide navigation buttons
    prevImageBtn.style.display = currentProject.images.length > 1 ? 'block' : 'none';
    nextImageBtn.style.display = currentProject.images.length > 1 ? 'block' : 'none';
}

// Close Modal
function closeProjectModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Setup Modal Events
function setupModal() {
    closeBtn.addEventListener('click', closeProjectModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    prevImageBtn.addEventListener('click', () => {
        if (currentProject && currentProject.images.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
            updateModalContent();
        }
    });

    nextImageBtn.addEventListener('click', () => {
        if (currentProject && currentProject.images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
            updateModalContent();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape') closeProjectModal();
        if (e.key === 'ArrowLeft') prevImageBtn.click();
        if (e.key === 'ArrowRight') nextImageBtn.click();
    });
}

// Setup Navigation Links
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link based on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Placeholder image generator if images are not available
function getPlaceholderImage(width = 350, height = 350, text = '') {
    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22${width}%22 height=%22${height}%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad1%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:rgb(240,240,240);stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:rgb(200,200,200);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad1)%22 width=%22${width}%22 height=%22${height}%22/%3E%3C/svg%3E`;
}
