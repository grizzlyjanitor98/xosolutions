/* XO Solutions - Ultra Modern Interactive Effects */
/* Super Saiyan 5000 JavaScript Enhancement */

class XOEffects {
    constructor() {
        this.particles = [];
        this.cursorTrails = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.createParticleSystem();
        this.initCursorEffects();
        this.initMagneticElements();
        this.initTextRevealAnimations();
        this.initTypewriterEffect();
        this.initIntersectionObserver();
        this.initParallaxEffect();
        this.initGlitchEffect();
        this.init3DCardEffects();
    }

    // Particle System
    createParticleSystem() {
        if (window.innerWidth <= 768) return; // Skip on mobile for performance

        const container = document.createElement('div');
        container.className = 'particle-container';
        document.body.appendChild(container);

        for (let i = 0; i < 50; i++) {
            this.createParticle(container);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        container.appendChild(particle);
        
        // Remove and recreate after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.createParticle(container);
            }
        }, (parseFloat(particle.style.animationDuration) + parseFloat(particle.style.animationDelay)) * 1000);
    }

    // Advanced Cursor Effects
    initCursorEffects() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        // Create cursor trails
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            this.cursorTrails.push(trail);
        }

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCursorTrails();
        });

        // Custom cursor for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .magnetic, .card-3d');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'none';
                this.cursorTrails.forEach(trail => {
                    trail.style.background = 'var(--accent)';
                    trail.style.transform = 'scale(2)';
                });
            });

            el.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
                this.cursorTrails.forEach(trail => {
                    trail.style.background = 'var(--primary)';
                    trail.style.transform = 'scale(1)';
                });
            });
        });
    }

    updateCursorTrails() {
        this.cursorTrails.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = this.mouseX + 'px';
                trail.style.top = this.mouseY + 'px';
            }, index * 50);
        });
    }

    // Magnetic Elements
    initMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.3;
                const moveY = y * 0.3;
                
                el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // Text Reveal Animations
    initTextRevealAnimations() {
        const revealElements = document.querySelectorAll('.text-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, Math.random() * 500);
                }
            });
        });
        
        revealElements.forEach(el => observer.observe(el));
    }

    // Typewriter Effect
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            el.style.display = 'inline-block';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typewriter when element is visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.disconnect();
                }
            });
            
            observer.observe(el);
        });
    }

    // Enhanced Intersection Observer
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Add staggered animation delays
                    const delay = Math.random() * 500;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll, .float-element, .card-3d').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // Parallax Effect
    initParallaxEffect() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // Glitch Effect
    initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(el => {
            el.dataset.text = el.textContent;
            
            setInterval(() => {
                if (Math.random() > 0.95) {
                    el.style.animation = 'none';
                    setTimeout(() => {
                        el.style.animation = 'glitchEffect 0.3s ease-in-out infinite';
                    }, 50);
                }
            }, 2000);
        });
    }

    // 3D Card Effects
    init3DCardEffects() {
        const cards = document.querySelectorAll('.card-3d');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Ripple Effect
    createRipple(e, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - element.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - element.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = element.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
    }

    // Morphing Background Blobs
    createMorphingBlobs() {
        const blobContainer = document.createElement('div');
        blobContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.className = `morph-blob blob-${i + 1}`;
            blobContainer.appendChild(blob);
        }
        
        document.body.appendChild(blobContainer);
    }

    // Quantum Loading Effect
    createQuantumLoader(targetElement) {
        const loader = document.createElement('div');
        loader.className = 'quantum-loader';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        `;
        
        targetElement.appendChild(loader);
        return loader;
    }

    // Holographic Text Effect
    applyHolographicEffect(textElement) {
        textElement.classList.add('holographic');
        
        setInterval(() => {
            const hue = Math.random() * 360;
            textElement.style.filter = `hue-rotate(${hue}deg)`;
        }, 2000);
    }

    // Performance Monitor
    initPerformanceMonitor() {
        let fps = 0;
        let lastTime = performance.now();
        
        const monitor = () => {
            const currentTime = performance.now();
            fps = 1000 / (currentTime - lastTime);
            lastTime = currentTime;
            
            // Reduce effects if FPS drops below 30
            if (fps < 30) {
                document.body.classList.add('reduced-effects');
            } else {
                document.body.classList.remove('reduced-effects');
            }
            
            requestAnimationFrame(monitor);
        };
        
        requestAnimationFrame(monitor);
    }
}

// Smart Scroll Effects
class SmartScrollEffects {
    constructor() {
        this.lastScrollTop = 0;
        this.ticking = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateScrollEffects());
            this.ticking = true;
        }
    }
    
    updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
        
        // Update scroll-based animations
        document.documentElement.style.setProperty('--scroll-y', scrollTop + 'px');
        document.documentElement.style.setProperty('--scroll-direction', scrollDirection);
        
        // Parallax elements
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = scrollTop * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        this.lastScrollTop = scrollTop;
        this.ticking = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const xoEffects = new XOEffects();
        const scrollEffects = new SmartScrollEffects();
        
        // Add morphing blobs to background
        xoEffects.createMorphingBlobs();
        
        // Initialize performance monitoring
        xoEffects.initPerformanceMonitor();
        
        // Add ripple effect to buttons
        document.querySelectorAll('.ripple-effect').forEach(button => {
            button.addEventListener('click', (e) => {
                xoEffects.createRipple(e, button);
            });
        });
    }
});

// Export for use in other modules
window.XOEffects = XOEffects;