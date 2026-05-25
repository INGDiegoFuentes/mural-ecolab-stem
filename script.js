document.addEventListener('DOMContentLoaded', () => {

    /* ======================================================
       1. NAVEGACIÓN FLOTANTE (DOCK) - SCROLLSPY & AUTO-HIDE
       ====================================================== */
    const sections = document.querySelectorAll('.mural-piece');
    const dockLinks = document.querySelectorAll('.dock-item');
    const dockNav = document.getElementById('dock-nav');

    // Auto-Hide Logic
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Ocultar si bajamos rápido y estamos lejos del inicio, mostrar si subimos
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            dockNav.classList.add('dock-hidden');
        } else {
            dockNav.classList.remove('dock-hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // Navegación Suave
    dockLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Hacemos visible el menú inmediatamente al hacer clic por si estaba oculto
                dockNav.classList.remove('dock-hidden');
                
                window.scrollTo({
                    top: targetSection.offsetTop - 30, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Actualizar estado activo en scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset + (window.innerHeight / 3); 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        dockLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ======================================================
       2. FLIP CARDS (Objetivos - Soporte Móvil)
       ====================================================== */
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    /* ======================================================
       3. RED STEM INTERACTIVA (Nodos)
       ====================================================== */
    const nodeBtns = document.querySelectorAll('.node-btn');
    const displayPanel = document.getElementById('node-info-display');

    nodeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            nodeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const infoText = this.getAttribute('data-info');
            displayPanel.innerHTML = `<p><strong>${this.innerText.split(' ')[1]}:</strong> ${infoText.split(':')[1] || infoText}</p>`;
            
            displayPanel.animate([
                { opacity: 0, transform: 'scale(0.98)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: 300, fill: 'forwards' });
        });
    });

    /* ======================================================
       4. ESTRATEGIAS (Tarjetas Acordeón Expandibles)
       ====================================================== */
    const strategyHeaders = document.querySelectorAll('.strategy-header');

    strategyHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});