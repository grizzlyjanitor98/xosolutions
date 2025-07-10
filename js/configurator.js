// XO Solutions Service Configurator
// Advanced service recommendation engine

class ServiceConfigurator {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 4;
        this.selections = {
            companySize: '',
            industry: '',
            primaryNeeds: [],
            budget: '',
            timeline: '',
            currentSolutions: []
        };
        
        this.serviceDatabase = {
            'xo-command': {
                name: 'XO Command',
                category: 'Core',
                description: 'Comprehensive IT operations management and 24/7 monitoring',
                benefits: ['24/7 Monitoring', 'Incident Response', 'Performance Optimization'],
                bestFor: ['All sizes', 'Any industry'],
                pricing: 'custom',
                implementation: '1-2 weeks'
            },
            'xo-shield': {
                name: 'XO Shield',
                category: 'Core',
                description: 'Advanced cybersecurity protection and threat management',
                benefits: ['Threat Detection', 'Firewall Management', 'Security Audits'],
                bestFor: ['Medium to Large', 'Finance', 'Healthcare'],
                pricing: 'custom',
                implementation: '2-3 weeks'
            },
            'xo-workspace': {
                name: 'XO Workspace',
                category: 'Core',
                description: 'Modern digital workplace and collaboration platform',
                benefits: ['Remote Work Support', 'Collaboration Tools', 'User Training'],
                bestFor: ['All sizes', 'Distributed teams'],
                pricing: 'custom',
                implementation: '1 week'
            },
            'xo-voice': {
                name: 'XO Voice',
                category: 'Core',
                description: 'Unified communications and VoIP solutions',
                benefits: ['VoIP System', 'Video Conferencing', 'Mobile Integration'],
                bestFor: ['Medium to Large', 'Customer service heavy'],
                pricing: 'custom',
                implementation: '2 weeks'
            },
            'xo-vault': {
                name: 'XO Vault',
                category: 'Infrastructure',
                description: 'Comprehensive data backup and recovery solutions',
                benefits: ['Automated Backups', 'Disaster Recovery', 'Compliance Support'],
                bestFor: ['All sizes', 'Data-critical businesses'],
                pricing: 'custom',
                implementation: '1-2 weeks'
            },
            'xo-build': {
                name: 'XO Build',
                category: 'Infrastructure',
                description: 'Scalable cloud infrastructure and migration services',
                benefits: ['Cloud Migration', 'Auto-scaling', 'Cost Optimization'],
                bestFor: ['Growing companies', 'Digital transformation'],
                pricing: 'custom',
                implementation: '3-4 weeks'
            },
            'xo-connect': {
                name: 'XO Connect',
                category: 'Infrastructure',
                description: 'Network design, implementation, and management',
                benefits: ['Network Design', 'Wi-Fi Solutions', 'Remote Access'],
                bestFor: ['Multi-location', 'Remote teams'],
                pricing: 'custom',
                implementation: '2-3 weeks'
            },
            'xo-fortress': {
                name: 'XO Fortress',
                category: 'Infrastructure',
                description: 'Enterprise disaster recovery and business continuity',
                benefits: ['Business Continuity', 'Disaster Recovery', 'Risk Assessment'],
                bestFor: ['Large enterprises', 'Mission-critical operations'],
                pricing: 'custom',
                implementation: '4-6 weeks'
            },
            'xo-finance': {
                name: 'XO Finance',
                category: 'Specialized',
                description: 'Financial services IT and regulatory compliance',
                benefits: ['Regulatory Compliance', 'Secure Transactions', 'Audit Support'],
                bestFor: ['Financial services', 'Fintech'],
                pricing: 'custom',
                implementation: '4-8 weeks'
            },
            'xo-hospitality': {
                name: 'XO Hospitality',
                category: 'Specialized',
                description: 'Hotel and hospitality technology solutions',
                benefits: ['Guest Wi-Fi', 'PMS Integration', 'Digital Concierge'],
                bestFor: ['Hotels', 'Restaurants', 'Entertainment'],
                pricing: 'custom',
                implementation: '2-4 weeks'
            },
            'xo-guest': {
                name: 'XO Guest',
                category: 'Specialized',
                description: 'Visitor management and guest services platform',
                benefits: ['Visitor Check-in', 'Security Integration', 'Contact Tracing'],
                bestFor: ['Corporate offices', 'Healthcare', 'Education'],
                pricing: 'custom',
                implementation: '1-2 weeks'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createConfiguratorModal();
        this.bindEvents();
    }
    
    createConfiguratorModal() {
        const modal = document.createElement('div');
        modal.id = 'configuratorModal';
        modal.className = 'configurator-modal';
        modal.innerHTML = `
            <div class="configurator-overlay"></div>
            <div class="configurator-content">
                <div class="configurator-header">
                    <h2>XO Service Configurator</h2>
                    <p>Let's find the perfect XO services for your business</p>
                    <button class="configurator-close">&times;</button>
                </div>
                
                <div class="configurator-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 25%"></div>
                    </div>
                    <span class="progress-text">Step 1 of 4</span>
                </div>
                
                <div class="configurator-steps">
                    ${this.generateStepHTML()}
                </div>
                
                <div class="configurator-navigation">
                    <button class="config-btn secondary" id="configPrev" style="display: none;">Previous</button>
                    <button class="config-btn primary" id="configNext">Next</button>
                    <button class="config-btn primary" id="configFinish" style="display: none;">Get Recommendations</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    generateStepHTML() {
        return `
            <div class="config-step active" data-step="1">
                <h3>What's your company size?</h3>
                <div class="config-options">
                    <label class="config-option">
                        <input type="radio" name="companySize" value="startup">
                        <span class="option-content">
                            <strong>Startup (1-10 employees)</strong>
                            <small>Growing fast, need scalable solutions</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="companySize" value="small">
                        <span class="option-content">
                            <strong>Small Business (11-50 employees)</strong>
                            <small>Established, looking for reliability</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="companySize" value="medium">
                        <span class="option-content">
                            <strong>Medium Business (51-200 employees)</strong>
                            <small>Growing complexity, need enterprise features</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="companySize" value="large">
                        <span class="option-content">
                            <strong>Large Enterprise (200+ employees)</strong>
                            <small>Complex needs, mission-critical operations</small>
                        </span>
                    </label>
                </div>
            </div>
            
            <div class="config-step" data-step="2">
                <h3>What industry are you in?</h3>
                <div class="config-options">
                    <label class="config-option">
                        <input type="radio" name="industry" value="technology">
                        <span class="option-content">
                            <strong>Technology</strong>
                            <small>Software, SaaS, IT services</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="industry" value="finance">
                        <span class="option-content">
                            <strong>Financial Services</strong>
                            <small>Banking, insurance, fintech</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="industry" value="healthcare">
                        <span class="option-content">
                            <strong>Healthcare</strong>
                            <small>Medical, dental, pharmaceutical</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="industry" value="hospitality">
                        <span class="option-content">
                            <strong>Hospitality</strong>
                            <small>Hotels, restaurants, entertainment</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="industry" value="professional">
                        <span class="option-content">
                            <strong>Professional Services</strong>
                            <small>Legal, consulting, accounting</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="industry" value="other">
                        <span class="option-content">
                            <strong>Other</strong>
                            <small>Manufacturing, retail, education</small>
                        </span>
                    </label>
                </div>
            </div>
            
            <div class="config-step" data-step="3">
                <h3>What are your primary IT challenges?</h3>
                <p class="step-subtitle">Select all that apply</p>
                <div class="config-options checkbox-style">
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="security">
                        <span class="option-content">
                            <strong>Cybersecurity Concerns</strong>
                            <small>Protect against threats and breaches</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="backup">
                        <span class="option-content">
                            <strong>Data Protection</strong>
                            <small>Backup and disaster recovery</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="support">
                        <span class="option-content">
                            <strong>24/7 IT Support</strong>
                            <small>Round-the-clock technical assistance</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="cloud">
                        <span class="option-content">
                            <strong>Cloud Migration</strong>
                            <small>Move to scalable cloud infrastructure</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="remote">
                        <span class="option-content">
                            <strong>Remote Work</strong>
                            <small>Enable distributed team collaboration</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="compliance">
                        <span class="option-content">
                            <strong>Regulatory Compliance</strong>
                            <small>Meet industry standards and regulations</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="network">
                        <span class="option-content">
                            <strong>Network Infrastructure</strong>
                            <small>Reliable, high-performance networking</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="checkbox" name="primaryNeeds" value="communication">
                        <span class="option-content">
                            <strong>Communication Systems</strong>
                            <small>VoIP, video conferencing, collaboration</small>
                        </span>
                    </label>
                </div>
            </div>
            
            <div class="config-step" data-step="4">
                <h3>When do you need to implement these solutions?</h3>
                <div class="config-options">
                    <label class="config-option">
                        <input type="radio" name="timeline" value="immediate">
                        <span class="option-content">
                            <strong>Immediately (Within 30 days)</strong>
                            <small>Urgent business need</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="timeline" value="quarter">
                        <span class="option-content">
                            <strong>This Quarter (1-3 months)</strong>
                            <small>Planned upgrade or expansion</small>
                        </span>
                    </label>
                    <label class="config-option">
                        <input type="radio" name="timeline" value="future">
                        <span class="option-content">
                            <strong>Future Planning (3+ months)</strong>
                            <small>Strategic planning and budgeting</small>
                        </span>
                    </label>
                </div>
                
                <div class="additional-info">
                    <h4>Additional Information (Optional)</h4>
                    <div class="form-group">
                        <label>Current IT Solutions</label>
                        <div class="checkbox-grid">
                            <label><input type="checkbox" name="currentSolutions" value="microsoft365"> Microsoft 365</label>
                            <label><input type="checkbox" name="currentSolutions" value="googleworkspace"> Google Workspace</label>
                            <label><input type="checkbox" name="currentSolutions" value="aws"> AWS Cloud</label>
                            <label><input type="checkbox" name="currentSolutions" value="azure"> Azure Cloud</label>
                            <label><input type="checkbox" name="currentSolutions" value="onpremise"> On-premise servers</label>
                            <label><input type="checkbox" name="currentSolutions" value="none"> No current solutions</label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        const modal = document.getElementById('configuratorModal');
        const openBtn = document.getElementById('openConfigurator');
        const closeBtn = modal.querySelector('.configurator-close');
        const overlay = modal.querySelector('.configurator-overlay');
        const nextBtn = document.getElementById('configNext');
        const prevBtn = document.getElementById('configPrev');
        const finishBtn = document.getElementById('configFinish');
        
        // Open modal
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Close modal
        [closeBtn, overlay].forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    this.resetConfigurator();
                });
            }
        });
        
        // Navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        
        if (finishBtn) {
            finishBtn.addEventListener('click', () => this.generateRecommendations());
        }
        
        // Form validation
        modal.addEventListener('change', () => this.validateStep());
        
        // Keyboard navigation
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                this.resetConfigurator();
            }
        });
    }
    
    nextStep() {
        if (this.currentStep < this.maxSteps) {
            this.saveStepData();
            this.currentStep++;
            this.updateStep();
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    }
    
    updateStep() {
        const steps = document.querySelectorAll('.config-step');
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const nextBtn = document.getElementById('configNext');
        const prevBtn = document.getElementById('configPrev');
        const finishBtn = document.getElementById('configFinish');
        
        // Update step visibility
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });
        
        // Update progress
        const progress = (this.currentStep / this.maxSteps) * 100;
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressText) progressText.textContent = `Step ${this.currentStep} of ${this.maxSteps}`;
        
        // Update navigation buttons
        if (prevBtn) prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        
        if (this.currentStep === this.maxSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (finishBtn) finishBtn.style.display = 'block';
        } else {
            if (nextBtn) nextBtn.style.display = 'block';
            if (finishBtn) finishBtn.style.display = 'none';
        }
        
        this.validateStep();
    }
    
    saveStepData() {
        const currentStepElement = document.querySelector(`.config-step[data-step="${this.currentStep}"]`);
        
        switch (this.currentStep) {
            case 1:
                const companySize = currentStepElement.querySelector('input[name="companySize"]:checked');
                this.selections.companySize = companySize ? companySize.value : '';
                break;
                
            case 2:
                const industry = currentStepElement.querySelector('input[name="industry"]:checked');
                this.selections.industry = industry ? industry.value : '';
                break;
                
            case 3:
                const needs = currentStepElement.querySelectorAll('input[name="primaryNeeds"]:checked');
                this.selections.primaryNeeds = Array.from(needs).map(n => n.value);
                break;
                
            case 4:
                const timeline = currentStepElement.querySelector('input[name="timeline"]:checked');
                this.selections.timeline = timeline ? timeline.value : '';
                
                const currentSolutions = currentStepElement.querySelectorAll('input[name="currentSolutions"]:checked');
                this.selections.currentSolutions = Array.from(currentSolutions).map(s => s.value);
                break;
        }
    }
    
    validateStep() {
        const nextBtn = document.getElementById('configNext');
        const finishBtn = document.getElementById('configFinish');
        let isValid = false;
        
        const currentStepElement = document.querySelector(`.config-step[data-step="${this.currentStep}"]`);
        
        switch (this.currentStep) {
            case 1:
                isValid = currentStepElement.querySelector('input[name="companySize"]:checked') !== null;
                break;
            case 2:
                isValid = currentStepElement.querySelector('input[name="industry"]:checked') !== null;
                break;
            case 3:
                isValid = currentStepElement.querySelectorAll('input[name="primaryNeeds"]:checked').length > 0;
                break;
            case 4:
                isValid = currentStepElement.querySelector('input[name="timeline"]:checked') !== null;
                break;
        }
        
        if (this.currentStep === this.maxSteps) {
            if (finishBtn) finishBtn.disabled = !isValid;
        } else {
            if (nextBtn) nextBtn.disabled = !isValid;
        }
    }
    
    generateRecommendations() {
        this.saveStepData();
        
        const recommendations = this.calculateRecommendations();
        this.displayRecommendations(recommendations);
    }
    
    calculateRecommendations() {
        let recommendations = [];
        let score = {};
        
        // Initialize scores for all services
        Object.keys(this.serviceDatabase).forEach(serviceId => {
            score[serviceId] = 0;
        });
        
        // Company size scoring
        switch (this.selections.companySize) {
            case 'startup':
                score['xo-command'] += 30;
                score['xo-workspace'] += 25;
                score['xo-vault'] += 20;
                break;
            case 'small':
                score['xo-command'] += 35;
                score['xo-shield'] += 25;
                score['xo-workspace'] += 20;
                score['xo-vault'] += 25;
                break;
            case 'medium':
                score['xo-command'] += 40;
                score['xo-shield'] += 35;
                score['xo-vault'] += 30;
                score['xo-build'] += 25;
                score['xo-connect'] += 20;
                break;
            case 'large':
                score['xo-command'] += 45;
                score['xo-shield'] += 40;
                score['xo-fortress'] += 35;
                score['xo-build'] += 30;
                score['xo-connect'] += 25;
                break;
        }
        
        // Industry-specific scoring
        switch (this.selections.industry) {
            case 'finance':
                score['xo-finance'] += 50;
                score['xo-shield'] += 30;
                score['xo-fortress'] += 25;
                break;
            case 'hospitality':
                score['xo-hospitality'] += 50;
                score['xo-guest'] += 30;
                score['xo-voice'] += 20;
                break;
            case 'healthcare':
                score['xo-shield'] += 35;
                score['xo-vault'] += 30;
                score['xo-guest'] += 25;
                break;
            case 'technology':
                score['xo-build'] += 30;
                score['xo-workspace'] += 25;
                score['xo-connect'] += 20;
                break;
        }
        
        // Primary needs scoring
        this.selections.primaryNeeds.forEach(need => {
            switch (need) {
                case 'security':
                    score['xo-shield'] += 40;
                    score['xo-fortress'] += 20;
                    break;
                case 'backup':
                    score['xo-vault'] += 45;
                    score['xo-fortress'] += 25;
                    break;
                case 'support':
                    score['xo-command'] += 50;
                    break;
                case 'cloud':
                    score['xo-build'] += 45;
                    score['xo-vault'] += 20;
                    break;
                case 'remote':
                    score['xo-workspace'] += 40;
                    score['xo-voice'] += 30;
                    score['xo-connect'] += 25;
                    break;
                case 'compliance':
                    score['xo-finance'] += 35;
                    score['xo-shield'] += 30;
                    break;
                case 'network':
                    score['xo-connect'] += 45;
                    score['xo-build'] += 20;
                    break;
                case 'communication':
                    score['xo-voice'] += 45;
                    score['xo-workspace'] += 25;
                    break;
            }
        });
        
        // Timeline urgency factor
        const urgencyMultiplier = {
            'immediate': 1.2,
            'quarter': 1.0,
            'future': 0.8
        };
        
        const multiplier = urgencyMultiplier[this.selections.timeline] || 1.0;
        Object.keys(score).forEach(serviceId => {
            score[serviceId] *= multiplier;
        });
        
        // Sort services by score and return top recommendations
        const sortedServices = Object.entries(score)
            .sort(([,a], [,b]) => b - a)
            .filter(([,score]) => score > 10) // Only include services with meaningful scores
            .slice(0, 6) // Top 6 recommendations
            .map(([serviceId, score]) => ({
                ...this.serviceDatabase[serviceId],
                id: serviceId,
                score: Math.round(score),
                priority: score > 50 ? 'High' : score > 25 ? 'Medium' : 'Low'
            }));
        
        return sortedServices;
    }
    
    displayRecommendations(recommendations) {
        const modal = document.getElementById('configuratorModal');
        const content = modal.querySelector('.configurator-content');
        
        content.innerHTML = `
            <div class="configurator-header">
                <h2>Your XO Service Recommendations</h2>
                <p>Based on your selections, here are the XO services we recommend for your business</p>
                <button class="configurator-close">&times;</button>
            </div>
            
            <div class="recommendations-summary">
                <div class="summary-item">
                    <strong>Company Size:</strong> ${this.getDisplayValue('companySize')}
                </div>
                <div class="summary-item">
                    <strong>Industry:</strong> ${this.getDisplayValue('industry')}
                </div>
                <div class="summary-item">
                    <strong>Primary Needs:</strong> ${this.selections.primaryNeeds.map(n => this.getDisplayValue('primaryNeeds', n)).join(', ')}
                </div>
                <div class="summary-item">
                    <strong>Timeline:</strong> ${this.getDisplayValue('timeline')}
                </div>
            </div>
            
            <div class="recommendations-grid">
                ${recommendations.map(service => this.createServiceCard(service)).join('')}
            </div>
            
            <div class="recommendations-actions">
                <button class="config-btn secondary" id="configRestart">Start Over</button>
                <button class="config-btn primary" id="configContact">Get Custom Quote</button>
            </div>
        `;
        
        // Rebind events
        const closeBtn = content.querySelector('.configurator-close');
        const restartBtn = document.getElementById('configRestart');
        const contactBtn = document.getElementById('configContact');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.resetConfigurator();
        });
        
        restartBtn.addEventListener('click', () => {
            this.resetConfigurator();
            this.createConfiguratorModal();
            this.bindEvents();
        });
        
        contactBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.goToContact(recommendations);
        });
    }
    
    createServiceCard(service) {
        const priorityClass = service.priority.toLowerCase();
        return `
            <div class="recommendation-card ${priorityClass}-priority">
                <div class="card-header">
                    <h3>${service.name}</h3>
                    <span class="priority-badge ${priorityClass}">${service.priority} Priority</span>
                </div>
                <div class="card-content">
                    <p class="service-description">${service.description}</p>
                    <div class="service-benefits">
                        <h4>Key Benefits:</h4>
                        <ul>
                            ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="service-details">
                        <div class="detail-item">
                            <strong>Implementation:</strong> ${service.implementation}
                        </div>
                        <div class="detail-item">
                            <strong>Category:</strong> ${service.category}
                        </div>
                    </div>
                </div>
                <div class="card-actions">
                    <a href="services/${service.category.toLowerCase()}/${service.id}.html" class="service-link">Learn More</a>
                </div>
            </div>
        `;
    }
    
    getDisplayValue(field, value = null) {
        const displayMap = {
            companySize: {
                'startup': 'Startup (1-10 employees)',
                'small': 'Small Business (11-50 employees)',
                'medium': 'Medium Business (51-200 employees)',
                'large': 'Large Enterprise (200+ employees)'
            },
            industry: {
                'technology': 'Technology',
                'finance': 'Financial Services',
                'healthcare': 'Healthcare',
                'hospitality': 'Hospitality',
                'professional': 'Professional Services',
                'other': 'Other'
            },
            primaryNeeds: {
                'security': 'Cybersecurity',
                'backup': 'Data Protection',
                'support': '24/7 IT Support',
                'cloud': 'Cloud Migration',
                'remote': 'Remote Work',
                'compliance': 'Regulatory Compliance',
                'network': 'Network Infrastructure',
                'communication': 'Communication Systems'
            },
            timeline: {
                'immediate': 'Immediately (Within 30 days)',
                'quarter': 'This Quarter (1-3 months)',
                'future': 'Future Planning (3+ months)'
            }
        };
        
        if (value) {
            return displayMap[field][value] || value;
        }
        
        return displayMap[field][this.selections[field]] || this.selections[field];
    }
    
    goToContact(recommendations) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill form with recommendations
            const messageField = document.getElementById('message');
            if (messageField) {
                const serviceNames = recommendations.slice(0, 3).map(s => s.name).join(', ');
                messageField.value = `Based on the XO configurator, I'm interested in learning more about: ${serviceNames}. 

Company details:
- Size: ${this.getDisplayValue('companySize')}
- Industry: ${this.getDisplayValue('industry')}
- Timeline: ${this.getDisplayValue('timeline')}

Please provide a custom quote and implementation timeline.`;
            }
            
            // Set company size
            const sizeSelect = document.getElementById('employees');
            if (sizeSelect) {
                const sizeMap = {
                    'startup': '1-25',
                    'small': '1-25',
                    'medium': '26-100',
                    'large': '100+'
                };
                sizeSelect.value = sizeMap[this.selections.companySize];
            }
        }
    }
    
    resetConfigurator() {
        this.currentStep = 1;
        this.selections = {
            companySize: '',
            industry: '',
            primaryNeeds: [],
            budget: '',
            timeline: '',
            currentSolutions: []
        };
        
        const modal = document.getElementById('configuratorModal');
        if (modal) {
            modal.remove();
        }
        
        this.createConfiguratorModal();
    }
}

// CSS for configurator modal
const configuratorCSS = `
.configurator-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    display: none;
    align-items: center;
    justify-content: center;
}

.configurator-modal.active {
    display: flex;
}

.configurator-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
}

.configurator-content {
    position: relative;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    background: var(--secondary);
    border-radius: 12px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
}

.configurator-header {
    padding: 2rem;
    border-bottom: 2px solid var(--light-gray);
    position: relative;
}

.configurator-header h2 {
    font-family: 'Space Mono', monospace;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--primary);
}

.configurator-header p {
    color: var(--gray);
    font-size: 1rem;
}

.configurator-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--gray);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.configurator-close:hover {
    background: var(--light-gray);
    color: var(--primary);
}

.configurator-progress {
    padding: 1rem 2rem;
    background: var(--light-gray);
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 3px;
    transition: width 0.4s ease;
}

.progress-text {
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.configurator-steps {
    padding: 2rem;
    min-height: 400px;
}

.config-step {
    display: none;
}

.config-step.active {
    display: block;
    animation: fadeInUp 0.4s ease;
}

.config-step h3 {
    font-family: 'Space Mono', monospace;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--primary);
}

.step-subtitle {
    color: var(--gray);
    margin-bottom: 2rem;
    font-style: italic;
}

.config-options {
    display: grid;
    gap: 1rem;
}

.config-option {
    display: flex;
    align-items: flex-start;
    padding: 1.5rem;
    border: 2px solid var(--light-gray);
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
}

.config-option:hover {
    border-color: var(--accent);
    background: rgba(255, 0, 64, 0.02);
}

.config-option input {
    margin-right: 1rem;
    margin-top: 0.2rem;
    width: 20px;
    height: 20px;
    accent-color: var(--accent);
}

.checkbox-style .config-option input {
    margin-top: 0.5rem;
}

.option-content strong {
    display: block;
    margin-bottom: 0.3rem;
    color: var(--primary);
    font-size: 1rem;
}

.option-content small {
    color: var(--gray);
    font-size: 0.9rem;
    line-height: 1.4;
}

.additional-info {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--light-gray);
}

.additional-info h4 {
    font-family: 'Space Mono', monospace;
    margin-bottom: 1rem;
    color: var(--primary);
}

.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.8rem;
}

.checkbox-grid label {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.9rem;
}

.checkbox-grid input {
    margin-right: 0.5rem;
    accent-color: var(--accent);
}

.configurator-navigation {
    padding: 2rem;
    border-top: 2px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.config-btn {
    padding: 1rem 2rem;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    min-width: 120px;
}

.config-btn.primary {
    background: var(--accent);
    color: var(--secondary);
    border: none;
}

.config-btn.primary:hover:not(:disabled) {
    background: var(--primary);
}

.config-btn.secondary {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
}

.config-btn.secondary:hover {
    background: var(--primary);
    color: var(--secondary);
}

.config-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.recommendations-summary {
    padding: 1.5rem 2rem;
    background: var(--light-gray);
    margin: 0 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.summary-item {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
}

.summary-item strong {
    color: var(--primary);
}

.recommendations-grid {
    display: grid;
    gap: 1.5rem;
    padding: 0 2rem;
    margin-bottom: 2rem;
}

.recommendation-card {
    border: 2px solid var(--light-gray);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.recommendation-card:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.high-priority {
    border-left: 6px solid var(--accent);
}

.medium-priority {
    border-left: 6px solid var(--warning);
}

.low-priority {
    border-left: 6px solid var(--info);
}

.card-header {
    padding: 1.5rem;
    background: var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    color: var(--primary);
    margin: 0;
}

.priority-badge {
    font-size: 0.7rem;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
}

.priority-badge.high {
    background: var(--accent);
    color: var(--secondary);
}

.priority-badge.medium {
    background: var(--warning);
    color: var(--secondary);
}

.priority-badge.low {
    background: var(--info);
    color: var(--secondary);
}

.card-content {
    padding: 1.5rem;
}

.service-description {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: var(--gray);
}

.service-benefits h4 {
    font-family: 'Space Mono', monospace;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.service-benefits ul {
    list-style: none;
    margin-bottom: 1.5rem;
}

.service-benefits li {
    padding: 0.3rem 0;
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9rem;
    color: var(--gray);
}

.service-benefits li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--success);
    font-weight: bold;
}

.service-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.detail-item {
    font-size: 0.9rem;
}

.detail-item strong {
    color: var(--primary);
}

.card-actions {
    padding: 0 1.5rem 1.5rem;
}

.service-link {
    color: var(--accent);
    text-decoration: none;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    transition: all 0.3s ease;
}

.service-link:hover {
    color: var(--primary);
}

.recommendations-actions {
    padding: 2rem;
    border-top: 2px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .configurator-content {
        width: 95%;
        max-height: 95vh;
    }
    
    .configurator-header {
        padding: 1.5rem;
    }
    
    .configurator-steps {
        padding: 1.5rem;
    }
    
    .config-option {
        padding: 1rem;
    }
    
    .checkbox-grid {
        grid-template-columns: 1fr;
    }
    
    .configurator-navigation {
        flex-direction: column;
    }
    
    .config-btn {
        min-width: auto;
    }
    
    .recommendations-grid {
        padding: 0 1rem;
    }
    
    .service-details {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
    
    .recommendations-actions {
        flex-direction: column;
    }
}
`;

// Add CSS to page
const styleSheet = document.createElement('style');
styleSheet.textContent = configuratorCSS;
document.head.appendChild(styleSheet);

// Initialize configurator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServiceConfigurator();
});