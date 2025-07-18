// XO Solutions - Main JavaScript
// Core functionality for scroll snapping, navigation, and animations

// Section navigation and scroll snapping
const sections = document.querySelectorAll('.section');
const scrollDots = document.querySelectorAll('.scroll-dot');
let currentSection = 0;

// Scroll to specific section
function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        updateScrollIndicator(index);
    }
}

// Update scroll indicator
function updateScrollIndicator(activeIndex) {
    scrollDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
    currentSection = activeIndex;
}

// Handle scroll indicator clicks
scrollDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        scrollToSection(index);
    });
});

// Track current section on scroll with improved detection
function trackScrollPosition() {
    const scrollPosition = window.scrollY + (window.innerHeight * 0.3); // Trigger earlier
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (currentSection !== index) {
                updateScrollIndicator(index);
            }
        }
    });
}

// Improved throttled scroll listener
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            trackScrollPosition();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Enhanced scroll snapping for better UX (desktop only)
if (window.innerWidth > 768) {
    window.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > 50) { // Only for significant scroll gestures
            e.preventDefault();
            
            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                // Scroll down
                scrollToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                // Scroll up
                scrollToSection(currentSection - 1);
            }
        }
    }, { passive: false });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    }
});

// Hide scroll indicator on mobile and update on resize
function checkMobile() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const isMobile = window.innerWidth <= 768;
    
    if (scrollIndicator) {
        if (isMobile) {
            scrollIndicator.style.display = 'none';
            // Also disable scroll snapping on mobile
            document.body.style.scrollSnapType = 'none';
            // Allow natural scrolling on mobile
            sections.forEach(section => {
                section.style.height = 'auto';
                section.style.minHeight = 'auto';
            });
        } else {
            scrollIndicator.style.display = 'flex';
            document.body.style.scrollSnapType = 'y mandatory';
            // Set fixed heights on desktop
            sections.forEach(section => {
                section.style.height = '100vh';
                section.style.minHeight = '100vh';
            });
        }
    }
}

window.addEventListener('resize', checkMobile);
checkMobile();

// Menu functionality
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sidebarMenu = document.getElementById('sidebarMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
    sidebarMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuFunc() {
    sidebarMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (closeMenu) closeMenu.addEventListener('click', closeMenuFunc);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenuFunc);

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMenuFunc();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetIndex = Array.from(sections).indexOf(target);
            if (targetIndex !== -1) {
                scrollToSection(targetIndex);
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll indicator
    updateScrollIndicator(0);
    
    // Initialize mobile detection and proper sizing
    checkMobile();
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && this.tagName === 'BUTTON') {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });
});

// Also run initialization on window load for safety
window.addEventListener('load', function() {
    // Ensure we start at the top
    if (window.scrollY === 0) {
        updateScrollIndicator(0);
    } else {
        trackScrollPosition();
    }
});