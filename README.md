# Gamez Lamadrid Taller - Portfolio Website

Portfolio website for Gamez Lamadrid Taller (GALATA), an architecture and design studio.

## Project Structure

```
SusanaLamadrid/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript functionality
├── images/             # Project images directory
├── README.md           # This file
└── .git/              # Git repository
```

## Setup Instructions

### 1. Add Project Images

The website includes 11 projects. Each project needs images to be displayed properly.

**Image Naming Convention:**
- `proyecto-1-1.jpg`, `proyecto-1-2.jpg`, etc. for Project 1
- `proyecto-2-1.jpg`, `proyecto-2-2.jpg`, etc. for Project 2
- Continue for all 11 projects

**Image Location:**
Place all project images in the `images/` directory.

### 2. How to Get Images from Instagram

From the Instagram profile [@gamez_lamadrid_taller](https://www.instagram.com/gamez_lamadrid_taller/):

1. Visit each Instagram post
2. Right-click on images and select "Save Image As..."
3. Save to the `images/` directory with the naming convention above

**Projects and their Instagram Posts:**
1. Remodelación Cafetería Terrible Juan en Montenegro
2. 12 Apóstoles - Integración de segundo piso para talleres
3. Remodelación e Interiorismo para casa en Cañadas
4. Café Terrible Juan - Primera sucursal en Providencia
5. Tienda de Cosméticos Orgánicos
6. Casa Particular en Chapala
7. Casa Campestre - Proyecto para venta
8. Mobiliario Diverso
9. Casa Particular en Fraccionamiento Solares
10. Planta de Envasado - Tequila San Matías
11. Remodelación de Terraza

### 3. Running the Website

#### Option 1: Local File (Simple)
Simply open `index.html` in your web browser.

#### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Features

- **Clean, Minimalist Design**: Inspired by professional architecture portfolio sites like Neri&Hu
- **Responsive Grid**: Projects display in a responsive grid that adapts to different screen sizes
- **Modal Gallery**: Click any project to view detailed information and image gallery
- **Image Navigation**: Use arrow buttons or keyboard arrows to navigate through project images
- **Smooth Interactions**: Hover effects, smooth transitions, and keyboard navigation
- **Mobile Friendly**: Fully responsive design works on mobile, tablet, and desktop
- **Sections**: 
  - Projects Gallery
  - About Studio
  - Contact Information
  - Navigation

## Customization

### Modify Project Information
Edit the `projects` array in `script.js` to update project titles, descriptions, categories, and locations.

### Change Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-bg: #ffffff;
    --secondary-bg: #f8f8f8;
    --text-dark: #1a1a1a;
    --text-light: #666666;
    --accent-color: #d4a574;
}
```

### Add New Projects
Add a new object to the `projects` array in `script.js`:
```javascript
{
    id: 12,
    title: "Project Title",
    location: "Location",
    category: "category",
    description: "Project description...",
    images: ["images/proyecto-12-1.jpg", "images/proyecto-12-2.jpg"]
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)

## Future Enhancements

- [ ] Add filtering by category
- [ ] Implement search functionality
- [ ] Add testimonials section
- [ ] Create blog section
- [ ] Add Google Analytics
- [ ] Implement newsletter signup
- [ ] Add animations library (AOS, GSAP)

## License

© 2024 Gamez Lamadrid Taller. All rights reserved.

---

**Note:** Replace placeholder images with actual project photos from Instagram for the best presentation.
