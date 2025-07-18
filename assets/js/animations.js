// XO Solutions Advanced Animations
// Sophisticated animations and interactions for enhanced UX

class XOAnimations {
    constructor() {
        this.observers = [];
        this.animationQueue = [];
        this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObservers();
        this.initParallaxEffects();
        this.initHoverAnimations();
        this.initLoadingAnimations();
        this.initScrollAnimations();
        this.initTypingAnimations();
        this.setupPerformanceOptimizations();
    }
    
    setupIntersectionObservers() {
        // Enhanced scroll animations
        const scrollAnimationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.triggerScrollAnimation(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            }
        );
        
        // Counter animations
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        // Progressive image loading
        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Observe elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            scrollAnimationObserver.observe(el);
        });
        
        document.querySelectorAll('[data-counter]').forEach(el => {
            counterObserver.observe(el);
        });
        
        document.querySelectorAll('[data-src]').forEach(el => {
            imageObserver.observe(el);
        });
        
        this.observers.push(scrollAnimationObserver, counterObserver, imageObserver);
    }
    
    triggerScrollAnimation(element) {
        if (this.isReduced) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        const animationType = element.dataset.animation || 'slideUp';
        const delay = element.dataset.delay || 0;
        const duration = element.dataset.duration || 800;
        
        setTimeout(() => {
            element.classList.add('animate-in');
            
            switch (animationType) {
                case 'slideUp':
                    this.slideUpAnimation(element, duration);
                    break;
                case 'slideLeft':
                    this.slideLeftAnimation(element, duration);
                    break;
                case 'slideRight':
                    this.slideRightAnimation(element, duration);
                    break;
                case 'fadeIn':
                    this.fadeInAnimation(element, duration);
                    break;
                case 'scaleIn':
                    this.scaleInAnimation(element, duration);
                    break;
                case 'rotateIn':
                    this.rotateInAnimation(element, duration);
                    break;
                default:
                    this.slideUpAnimation(element, duration);
            }
        }, parseInt(delay));
    }
    
    slideUpAnimation(element, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
    
    slideLeftAnimation(element, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }
    
    slideRightAnimation(element, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }
    
    fadeInAnimation(element, duration) {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '1';
    }
    
    scaleInAnimation(element, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }
    
    rotateInAnimation(element, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'rotate(0deg) scale(1)';
    }
    
    animateCounter(element) {
        if (this.isReduced) {
            element.textContent = element.dataset.counter;
            return;
        }
        
        const target = parseFloat(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 2000;
        const isDecimal = element.dataset.counter.includes('.');
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        
        let current = 0;
        const startTime = Date.now();
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = target * easeOut;
            
            if (isDecimal) {
                element.textContent = prefix + current.toFixed(1) + suffix;
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    loadImage(element) {
        const src = element.dataset.src;
        if (!src) return;
        
        const img = new Image();
        img.onload = () => {
            element.src = src;
            element.classList.add('loaded');
        };
        img.src = src;
    }
    
    initParallaxEffects() {
        if (this.isReduced) return;
        
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    initHoverAnimations() {
        if (this.isReduced) return;
        
        // Enhanced card hover effects
        document.querySelectorAll('.service-item, .category-card, .tier-item').forEach(card => {
            this.addCardHoverEffect(card);
        });
        
        // Button hover effects
        document.querySelectorAll('.hero-cta, .submit-btn, .widget-btn').forEach(button => {
            this.addButtonHoverEffect(button);
        });
        
        // Link hover effects
        document.querySelectorAll('.service-link, .category-link').forEach(link => {
            this.addLinkHoverEffect(link);
        });
    }
    
    addCardHoverEffect(card) {
        let isHovering = false;
        
        card.addEventListener('mouseenter', (e) => {
            if (isHovering) return;
            isHovering = true;
            
            // Add ripple effect
            this.createRippleEffect(e, card);
            
            // Enhance existing transform
            const currentTransform = card.style.transform || '';
            if (!currentTransform.includes('scale')) {
                card.style.transform = currentTransform + ' scale(1.02)';
            }
            
            // Add glow effect
            card.style.boxShadow = '0 20px 40px rgba(255, 0, 64, 0.15)';
            
            // Animate child elements
            const title = card.querySelector('h3, .service-title, .category-card h3');
            if (title) {
                title.style.transition = 'color 0.3s ease';
                title.style.color = 'var(--accent)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            
            // Reset transforms
            card.style.transform = card.style.transform.replace(' scale(1.02)', '');
            card.style.boxShadow = '';
            
            // Reset child elements
            const title = card.querySelector('h3, .service-title, .category-card h3');
            if (title) {
                title.style.color = '';
            }
        });
    }
    
    addButtonHoverEffect(button) {
        button.addEventListener('mouseenter', () => {
            if (!button.style.transform.includes('translateY')) {
                button.style.transform = (button.style.transform || '') + ' translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = button.style.transform.replace(' translateY(-2px)', '');
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = button.style.transform.replace('translateY(-2px)', 'translateY(0px)');
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = button.style.transform.replace('translateY(0px)', 'translateY(-2px)');
        });
    }
    
    addLinkHoverEffect(link) {
        // Create underline animation
        if (!link.querySelector('.link-underline')) {
            const underline = document.createElement('span');
            underline.className = 'link-underline';
            underline.style.cssText = `
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--accent);
                transition: width 0.3s ease;
            `;
            
            link.style.position = 'relative';
            link.appendChild(underline);
        }
        
        link.addEventListener('mouseenter', () => {
            const underline = link.querySelector('.link-underline');
            if (underline) underline.style.width = '100%';
        });
        
        link.addEventListener('mouseleave', () => {
            const underline = link.querySelector('.link-underline');
            if (underline) underline.style.width = '0';
        });
    }
    
    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 0, 64, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    initLoadingAnimations() {
        // Page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            
            // Stagger animations for main sections
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('section-loaded');
                }, index * 100);
            });
        });
        
        // Navigation load animation
        const nav = document.querySelector('.nav');
        if (nav) {
            setTimeout(() => {
                nav.classList.add('nav-loaded');
            }, 200);
        }
    }
    
    initScrollAnimations() {
        // Progress bar animation
        this.updateScrollProgress();
        
        // Section reveal animations
        this.setupSectionReveals();
        
        // Navigation background transition
        this.setupNavTransition();
    }
    
    updateScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    setupSectionReveals() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                        
                        // Animate child elements with stagger
                        const children = entry.target.querySelectorAll('.animate-on-scroll');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animated');
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        this.observers.push(sectionObserver);
    }
    
    setupNavTransition() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        let lastScrollY = 0;
        let ticking = false;
        
        const updateNav = () => {
            const scrollY = window.scrollY;
            
            // Background opacity based on scroll
            if (scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.boxShadow = 'none';
            }
            
            // Hide/show nav on scroll direction
            if (Math.abs(scrollY - lastScrollY) > 5) {
                if (scrollY > lastScrollY && scrollY > 100) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
                lastScrollY = scrollY;
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        });
    }
    
    initTypingAnimations() {
        document.querySelectorAll('[data-typewriter]').forEach(element => {
            this.typewriterEffect(element);
        });
    }
    
    typewriterEffect(element) {
        const text = element.dataset.typewriter || element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        const delay = parseInt(element.dataset.delay) || 0;
        
        element.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    element.classList.add('typing-complete');
                }
            }, speed);
        }, delay);
    }
    
    // Interactive animations
    initInteractiveAnimations() {
        this.setupMagneticButtons();
        this.setupFloatingElements();
        this.setupParticleEffects();
    }
    
    setupMagneticButtons() {
        if (this.isReduced) return;
        
        document.querySelectorAll('.hero-cta, .magnetic-btn').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    setupFloatingElements() {
        if (this.isReduced) return;
        
        document.querySelectorAll('.floating-element').forEach(element => {
            const amplitude = parseFloat(element.dataset.amplitude) || 10;
            const frequency = parseFloat(element.dataset.frequency) || 0.002;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const y = Math.sin(elapsed * frequency) * amplitude;
                element.style.transform = `translateY(${y}px)`;
                requestAnimationFrame(animate);
            };
            
            animate();
        });
    }
    
    setupParticleEffects() {
        if (this.isReduced) return;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            this.createParticleSystem(hero);
        }
    }
    
    createParticleSystem(container) {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.style.position = 'relative';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        const maxParticles = 50;
        
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Create particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 0, 64, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Performance optimizations
    setupPerformanceOptimizations() {
        // Disable animations on low-end devices
        if (navigator.hardwareConcurrency < 4) {
            this.isReduced = true;
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(element => {
                if (document.hidden) {
                    element.style.animationPlayState = 'paused';
                } else {
                    element.style.animationPlayState = 'running';
                }
            });
        });
        
        // Reduce motion for battery saving
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    this.isReduced = true;
                }
            });
        }
    }
    
    // Utility methods
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Public API methods
    animateElement(element, options = {}) {
        const defaults = {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            opacity: 1
        };
        
        const config = { ...defaults, ...options };
        
        element.style.transition = `all ${config.duration}ms ${config.easing}`;
        element.style.transform = config.transform;
        element.style.opacity = config.opacity;
        
        return new Promise(resolve => {
            setTimeout(resolve, config.duration);
        });
    }
    
    pulseElement(element, options = {}) {
        const duration = options.duration || 1000;
        const scale = options.scale || 1.05;
        
        element.style.transition = `transform ${duration / 2}ms ease-in-out`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration / 2);
    }
    
    shakeElement(element, options = {}) {
        const intensity = options.intensity || 10;
        const duration = options.duration || 500;
        
        element.style.animation = `shake ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        
        // Remove event listeners
        window.removeEventListener('scroll', this.updateScrollProgress);
        window.removeEventListener('resize', this.resizeCanvas);
        
        // Clear animation queue
        this.animationQueue = [];
    }
}

// Add animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = `
/* Enhanced animations */
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 64, 0.2); }
    50% { box-shadow: 0 0 20px rgba(255, 0, 64, 0.6); }
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.page-loaded .nav {
    transform: translateY(0);
    opacity: 1;
}

.nav {
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav.nav-loaded {
    transform: translateY(0);
    opacity: 1;
}

section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-loaded {
    opacity: 1;
    transform: translateY(0);
}

.section-visible {
    opacity: 1;
    transform: translateY(0);
}

.hero-cta {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.hero-cta:hover::before {
    left: 100%;
}

.magnetic-btn {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-element {
    animation: float 6s ease-in-out infinite;
}

.category-card,
.service-item,
.tier-item {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.category-card:hover,
.service-item:hover,
.tier-item:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.typewriter {
    overflow: hidden;
    border-right: 2px solid var(--accent);
    white-space: nowrap;
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

.typing-complete {
    border-right: none;
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: var(--accent); }
}

.progress-bar {
    position: relative;
    overflow: hidden;
}

.progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: progress-shine 2s infinite;
}

@keyframes progress-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.timeline-item {
    opacity: 0;
    transform: translateX(-50px);
    animation: slideInTimeline 0.6s ease-out forwards;
}

.timeline-item:nth-child(even) {
    transform: translateX(50px);
}

@keyframes slideInTimeline {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
}

.animate-on-scroll[data-animation="slideLeft"] {
    transform: translateX(-50px);
}

.animate-on-scroll[data-animation="slideRight"] {
    transform: translateX(50px);
}

.animate-on-scroll[data-animation="scaleIn"] {
    transform: scale(0.8);
}

.animate-on-scroll[data-animation="rotateIn"] {
    transform: rotate(-10deg) scale(0.8);
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .animate-on-scroll {
        opacity: 1;
        transform: none;
    }
}

@media (prefers-contrast: high) {
    .hero-cta::before,
    .ripple {
        display: none;
    }
}

@media (prefers-color-scheme: dark) {
    .hero-cta::before {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    }
    
    .glow {
        box-shadow: 0 0 20px rgba(255, 0, 64, 0.3);
    }
}
`;
document.head.appendChild(animationStyleSheet);

// Initialize animations when DOM is ready
let xoAnimations;

document.addEventListener('DOMContentLoaded', () => {
    xoAnimations = new XOAnimations();
    
    // Make animations available globally
    window.XOAnimations = xoAnimations;
    
    // Add interactive animations after page load
    window.addEventListener('load', () => {
        xoAnimations.initInteractiveAnimations();
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XOAnimations;
}