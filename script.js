// Enhanced XO Solutions Website Script

// Custom Cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button, .service-item, .category-card, .process-item');

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
    });
});

// Enhanced Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navClose = document.querySelector('.nav-close');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }
});

// Search Functionality
const searchTrigger = document.getElementById('searchTrigger');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const searchData = [
    { title: 'XO Command - IT Operations Management', url: 'services/core/xo-command.html', category: 'Core' },
    { title: 'XO Shield - Cybersecurity Solutions', url: 'services/core/xo-shield.html', category: 'Core' },
    { title: 'XO Workspace - Digital Workplace', url: 'services/core/xo-workspace.html', category: 'Core' },
    { title: 'XO Voice - Communications Platform', url: 'services/core/xo-voice.html', category: 'Core' },
    { title: 'XO Vault - Data Backup & Recovery', url: 'services/infrastructure/xo-vault.html', category: 'Infrastructure' },
    { title: 'XO Build - Cloud Infrastructure', url: 'services/infrastructure/xo-build.html', category: 'Infrastructure' },
    { title: 'XO Connect - Network Solutions', url: 'services/infrastructure/xo-connect.html', category: 'Infrastructure' },
    { title: 'XO Fortress - Disaster Recovery', url: 'services/infrastructure/xo-fortress.html', category: 'Infrastructure' },
    { title: 'XO Finance - Financial Services IT', url: 'services/specialized/xo-finance.html', category: 'Specialized' },
    { title: 'XO Hospitality - Hotel Technology', url: 'services/specialized/xo-hospitality.html', category: 'Specialized' },
    { title: 'XO Guest - Visitor Management', url: 'services/specialized/xo-guest.html', category: 'Specialized' },
    { title: 'About XO Solutions', url: 'about.html', category: 'Company' },
    { title: 'All Services Overview', url: 'services.html', category: 'Company' },
    { title: 'Industry Sectors', url: 'sectors.html', category: 'Company' },
    { title: 'Contact Us', url: 'contact.html', category: 'Company' }
];

if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });
}

if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = 'auto';
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const filteredResults = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(filteredResults);
    });
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result">No results found</div>';
        return;
    }
    
    searchResults.innerHTML = results.map(result => 
        `<a href="${result.url}" class="search-result">
            <strong>${result.title}</strong>
            <small>${result.category}</small>
        </a>`
    ).join('');
}

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
            if (navMenu) navMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    }
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 99.9) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.dataset.target) || parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Observe stat numbers for counter animation
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    observer.observe(el);
});

// Service Configurator Widget
let currentStep = 1;
let selectedSize = '';
let selectedNeeds = [];

const configuratorSteps = document.querySelectorAll('.widget-step');
const nextStepBtn = document.getElementById('nextStep');
const prevStepBtn = document.getElementById('prevStep');
const getQuoteBtn = document.getElementById('getQuote');
const recommendations = document.getElementById('recommendations');

// Size selection
document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
        updateNextButton();
    });
});

// Needs selection
document.querySelectorAll('.need-option input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        selectedNeeds = Array.from(document.querySelectorAll('.need-option input:checked'))
            .map(cb => cb.value);
        updateNextButton();
    });
});

function updateNextButton() {
    if (nextStepBtn) {
        if (currentStep === 1 && selectedSize) {
            nextStepBtn.disabled = false;
        } else if (currentStep === 2 && selectedNeeds.length > 0) {
            nextStepBtn.disabled = false;
        } else {
            nextStepBtn.disabled = true;
        }
    }
}

if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
        if (currentStep < 3) {
            currentStep++;
            updateConfiguratorStep();
            
            if (currentStep === 3) {
                generateRecommendations();
            }
        }
    });
}

if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateConfiguratorStep();
        }
    });
}

function updateConfiguratorStep() {
    configuratorSteps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    if (prevStepBtn) {
        prevStepBtn.style.display = currentStep > 1 ? 'block' : 'none';
    }
    
    if (nextStepBtn && getQuoteBtn) {
        if (currentStep === 3) {
            nextStepBtn.style.display = 'none';
            getQuoteBtn.style.display = 'block';
        } else {
            nextStepBtn.style.display = 'block';
            getQuoteBtn.style.display = 'none';
        }
    }
    
    updateNextButton();
}

function generateRecommendations() {
    if (!recommendations) return;
    
    const serviceRecommendations = {
        security: { service: 'XO Shield', description: 'Advanced cybersecurity protection', url: 'services/core/xo-shield.html' },
        backup: { service: 'XO Vault', description: 'Comprehensive data backup and recovery', url: 'services/infrastructure/xo-vault.html' },
        support: { service: 'XO Command', description: '24/7 IT operations management', url: 'services/core/xo-command.html' },
        cloud: { service: 'XO Build', description: 'Scalable cloud infrastructure', url: 'services/infrastructure/xo-build.html' }
    };
    
    let recommendedServices = selectedNeeds.map(need => serviceRecommendations[need]);
    
    // Add base recommendations based on company size
    if (selectedSize === 'small') {
        recommendedServices.push({
            service: 'XO Workspace',
            description: 'Essential digital workplace tools',
            url: 'services/core/xo-workspace.html'
        });
    } else if (selectedSize === 'large') {
        recommendedServices.push({
            service: 'XO Fortress',
            description: 'Enterprise disaster recovery',
            url: 'services/infrastructure/xo-fortress.html'
        });
    }
    
    recommendations.innerHTML = recommendedServices.map(rec => 
        `<div class="recommendation-item">
            <h4>${rec.service}</h4>
            <p>${rec.description}</p>
            <a href="${rec.url}" style="color: var(--accent); text-decoration: none; font-weight: 600;">Learn More →</a>
        </div>`
    ).join('');
}

if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', () => {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill form with selections
            const sizeSelect = document.getElementById('employees');
            if (sizeSelect && selectedSize) {
                const sizeMap = {
                    'small': '1-25',
                    'medium': '26-100',
                    'large': '100+'
                };
                sizeSelect.value = sizeMap[selectedSize];
            }
            
            // Check relevant service checkboxes
            selectedNeeds.forEach(need => {
                const serviceMap = {
                    'security': 'xo-shield',
                    'backup': 'xo-vault',
                    'support': 'xo-command',
                    'cloud': 'xo-build'
                };
                const checkbox = document.querySelector(`input[value="${serviceMap[need]}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    });
}

// Hero CTA interaction
const heroCTA = document.querySelector('.hero-cta');
if (heroCTA) {
    heroCTA.addEventListener('click', () => {
        const configuratorSection = document.querySelector('.configurator-preview');
        if (configuratorSection) {
            configuratorSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Enhanced Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff0040';
                input.style.boxShadow = '0 0 0 3px rgba(255, 0, 64, 0.1)';
            } else {
                input.style.borderColor = '#22c55e';
                input.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
            }
        });
        
        if (isValid) {
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            // Show loading state
            btn.textContent = 'SENDING REQUEST...';
            btn.style.background = '#f59e0b';
            btn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                btn.textContent = 'REQUEST SENT ✓';
                btn.style.background = '#22c55e';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background: #22c55e; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center; font-family: 'Space Mono', monospace;">
                        <strong>Thank you!</strong> We'll contact you within 4 hours to discuss your XO assessment.
                    </div>
                `;
                this.appendChild(successMessage);
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#000000';
                    btn.disabled = false;
                    successMessage.remove();
                    this.reset();
                    
                    // Reset input styles
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    });
                }, 3000);
            }, 1500);
        } else {
            // Show error message
            const errorElements = this.querySelectorAll('.error-message');
            errorElements.forEach(el => el.remove());
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <div style="background: #ff0040; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center; font-family: 'Space Mono', monospace;">
                    Please fill in all required fields to continue.
                </div>
            `;
            this.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    });
}

// Live Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatMinimize = document.getElementById('chatMinimize');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const chatResponses = {
    'hello': 'Hello! Welcome to XO Solutions. How can I help you learn about our enterprise IT services?',
    'services': 'We offer 11 XO services across 3 categories: Core (Command, Shield, Workspace, Voice), Infrastructure (Vault, Build, Connect, Fortress), and Specialized (Finance, Hospitality, Guest). Which category interests you most?',
    'pricing': 'Our XO services are tailored to each business\'s needs. We provide custom quotes after understanding your requirements. Would you like to schedule a free assessment?',
    'support': 'All XO services include 24/7 monitoring and support with a 99.9% uptime SLA. Our technical team is available around the clock to assist you.',
    'security': 'XO Shield provides comprehensive cybersecurity including threat detection, firewall management, and security monitoring. It\'s one of our most popular core services.',
    'backup': 'XO Vault offers automated data backup, disaster recovery, and business continuity planning. We ensure your data is always protected and recoverable.',
    'cloud': 'XO Build provides scalable cloud infrastructure solutions including migration, optimization, and ongoing management. Perfect for growing businesses.',
    'contact': 'You can reach us at hello@xosolutions.com or use the contact form below. We typically respond to enterprise inquiries within 4 hours.'
};

function findBestResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    for (const [keyword, response] of Object.entries(chatResponses)) {
        if (lowercaseMessage.includes(keyword)) {
            return response;
        }
    }
    
    return 'Thank you for your question! For detailed information about our XO services, I recommend checking our services page or contacting our team directly at hello@xosolutions.com.';
}

if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });
}

if (chatMinimize && chatWindow) {
    chatMinimize.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });
}

function addChatMessage(message, isUser = false) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    if (!chatInput || !chatInput.value.trim()) return;
    
    const message = chatInput.value.trim();
    addChatMessage(message, true);
    
    // Show typing indicator
    setTimeout(() => {
        const response = findBestResponse(message);
        addChatMessage(response, false);
    }, 1000);
    
    chatInput.value = '';
}

if (chatSend) {
    chatSend.addEventListener('click', sendChatMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Category Card Hover Effects
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline Item Animations
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Service Card Click Tracking
document.querySelectorAll('.service-item, .category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Add click effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 0, 64, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - card.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - card.offsetTop) + 'px';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes overlays
    if (e.key === 'Escape') {
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
        
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
        
        if (chatWindow && chatWindow.classList.contains('open')) {
            chatWindow.classList.remove('open');
        }
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchTrigger) searchTrigger.click();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation delay to prevent flash
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize configurator if present
    if (configuratorSteps.length > 0) {
        updateConfiguratorStep();
    }
    
    // Add loading animation to buttons
    document.querySelectorAll('button, .hero-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 300);
            }
        });
    });
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Update navigation background based on scroll
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
    }, 10);
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
    console.log('Non-critical error caught:', e.message);
});

// Service worker registration for offline capability (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}