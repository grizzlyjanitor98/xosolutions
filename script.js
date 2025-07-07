// Custom Cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button, .service-item');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Navigation Menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navClose = document.querySelector('.nav-close');

navToggle.addEventListener('click', () => {
    navMenu.classList.add('open');
});

navClose.addEventListener('click', () => {
    navMenu.classList.remove('open');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('open');
        }
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0040';
        } else {
            input.style.borderColor = '#000000';
        }
    });
    
    if (isValid) {
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'MESSAGE SENT';
        btn.style.background = '#22c55e';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#000000';
            this.reset();
        }, 2000);
    }
});

// Hero CTA
document.querySelector('.hero-cta').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});