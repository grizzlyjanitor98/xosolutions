// XO Solutions Live Chat Widget
// Advanced chat system with service recommendations

class XOChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.userContext = {
            hasInteracted: false,
            interestedServices: [],
            companySize: null,
            industry: null,
            currentPage: window.location.pathname
        };
        
        this.responses = {
            greeting: [
                "Hello! I'm Alex, your XO Solutions assistant. How can I help you learn about our enterprise IT services?",
                "Hi there! Welcome to XO Solutions. I'm here to help you find the perfect IT services for your business.",
                "Welcome! I'm the XO Solutions virtual assistant. What would you like to know about our services?"
            ],
            
            services: {
                general: "We offer 11 comprehensive XO services across 3 categories:\n\n🔧 **Core Services:** XO Command, XO Shield, XO Workspace, XO Voice\n🏗️ **Infrastructure:** XO Vault, XO Build, XO Connect, XO Fortress\n🎯 **Specialized:** XO Finance, XO Hospitality, XO Guest\n\nWhich category interests you most?",
                
                core: "Our Core Services are essential for every business:\n\n• **XO Command** - 24/7 IT operations management\n• **XO Shield** - Advanced cybersecurity protection\n• **XO Workspace** - Modern digital workplace solutions\n• **XO Voice** - Unified communications platform\n\nWould you like details about any specific service?",
                
                infrastructure: "Our Infrastructure Services provide the foundation for growth:\n\n• **XO Vault** - Data backup and disaster recovery\n• **XO Build** - Cloud infrastructure and migration\n• **XO Connect** - Network design and management\n• **XO Fortress** - Enterprise disaster recovery\n\nWhich infrastructure challenge can we help solve?",
                
                specialized: "Our Specialized Services are tailored for specific industries:\n\n• **XO Finance** - Financial services IT and compliance\n• **XO Hospitality** - Hotel and restaurant technology\n• **XO Guest** - Visitor management systems\n\nDoes your industry have specific IT requirements?"
            },
            
            specific: {
                'xo-command': "**XO Command** is our flagship IT operations service:\n\n 24/7 system monitoring\n Proactive maintenance\n✅ Incident response\n✅ Performance optimization\n✅ Help desk support\n\nPerfect for businesses that need reliable IT operations. Would you like to know about implementation?",
                
                'xo-shield': "**XO Shield** provides comprehensive cybersecurity:\n\n🛡️ Advanced threat detection\n🛡️ Firewall management\n🛡️ Security audits\n🛡️ Compliance support\n🛡️ Employee training\n\nEssential in today's threat landscape. What's your current security setup?",
                
                'xo-workspace': "**XO Workspace** modernizes how your team works:\n\n💼 Digital collaboration tools\n💼 Remote work enablement\n💼 User training and support\n💼 Productivity optimization\n💼 Integration management\n\nGreat for hybrid and remote teams. How many employees do you have?",
                
                'xo-voice': "**XO Voice** unifies your communications:\n\n📞 VoIP phone system\n📞 Video conferencing\n📞 Mobile integration\n📞 Call analytics\n📞 Auto-attendant\n\nPerfect for customer-facing businesses. What's your current phone setup?",
                
                'xo-vault': "**XO Vault** protects your critical data:\n\n💾 Automated daily backups\n💾 Disaster recovery planning\n💾 Compliance archiving\n💾 Quick restore capabilities\n💾 Monitoring and alerts\n\nEssential for data protection. Have you experienced data loss before?",
                
                'xo-build': "**XO Build** transforms your infrastructure:\n\n☁️ Cloud migration strategy\n☁️ Scalable architecture\n☁️ Cost optimization\n☁️ Performance monitoring\n☁️ Ongoing management\n\nIdeal for growing businesses. Are you currently using cloud services?",
                
                'xo-connect': "**XO Connect** optimizes your network:\n\n🌐 Network design and setup\n🌐 Wi-Fi optimization\n🌐 Remote access solutions\n🌐 Security implementation\n🌐 Performance monitoring\n\nGreat for multi-location businesses. How many offices do you have?",
                
                'xo-fortress': "**XO Fortress** ensures business continuity:\n\n🏰 Disaster recovery planning\n🏰 Business continuity strategies\n🏰 Risk assessment\n🏰 Recovery testing\n🏰 Documentation and training\n\nCritical for enterprise operations. What's your recovery time requirement?",
                
                'xo-finance': "**XO Finance** specializes in financial services:\n\n🏦 Regulatory compliance (SOX, PCI, etc.)\n🏦 Secure transaction processing\n🏦 Audit trail management\n🏦 Risk management systems\n🏦 Industry-specific support\n\nTailored for financial institutions. What regulations do you need to comply with?",
                
                'xo-hospitality': "**XO Hospitality** enhances guest experiences:\n\n🏨 Guest Wi-Fi management\n🏨 PMS system integration\n🏨 Digital concierge services\n🏨 Point-of-sale support\n🏨 Entertainment systems\n\nDesigned for hotels and restaurants. What's your property type?",
                
                'xo-guest': "**XO Guest** streamlines visitor management:\n\n👥 Digital check-in systems\n👥 Security badge printing\n👥 Host notifications\n👥 Contact tracing capabilities\n👥 Integration with access control\n\nPerfect for corporate offices. How many visitors do you receive daily?"
            },
            
            pricing: "Our XO services are tailored to each business's specific needs, so pricing varies based on:\n\n💰 Company size and complexity\n💰 Selected services and features\n💰 Implementation requirements\n💰 Support level needed\n\nWe provide custom quotes after understanding your requirements. Would you like to schedule a free assessment?",
            
            implementation: "Implementation timelines vary by service:\n\n⏱️ **Quick Start (1-2 weeks):** XO Command, XO Workspace, XO Guest\n⏱️ **Standard (2-4 weeks):** XO Shield, XO Voice, XO Vault, XO Connect\n⏱️ **Complex (4-8 weeks):** XO Build, XO Fortress, XO Finance, XO Hospitality\n\nWe work around your schedule to minimize disruption. What's your preferred timeline?",
            
            support: "All XO services include comprehensive support:\n\n🎧 **24/7 Monitoring** - Round-the-clock system surveillance\n🎧 **Priority Support** - Direct access to technical experts\n🎧 **99.9% Uptime SLA** - Guaranteed service availability\n🎧 **Proactive Maintenance** - Preventing issues before they occur\n🎧 **Regular Health Checks** - Ongoing optimization\n\nOur team is always here when you need us. What support level does your business require?",
            
            company: "XO Solutions is a cutting-edge IT services company focused on delivering enterprise-grade solutions:\n\n🚀 **Fresh Perspective** - New company with modern approaches\n🚀 **Enterprise Focus** - Serving businesses of all sizes\n🚀 **Comprehensive Portfolio** - 11 specialized XO services\n🚀 **Customer-Centric** - Tailored solutions, not one-size-fits-all\n\nWe're building the future of business IT. Ready to join the XO revolution?",
            
            contact: "Ready to transform your IT? Here's how to reach us:\n\n📧 **Email:** hello@xosolutions.com\n📧 **Response Time:** Within 4 hours for enterprise inquiries\n📧 **Free Consultation:** Comprehensive IT assessment\n📧 **Custom Quotes:** Tailored to your specific needs\n\nYou can also fill out our contact form below. What's the best way to reach you?",
            
            fallback: [
                "That's a great question! For detailed information about that topic, I'd recommend speaking with one of our specialists. You can reach them at hello@xosolutions.com or through our contact form.",
                "I want to make sure you get the most accurate information. Our technical team at hello@xosolutions.com can provide detailed answers to that question.",
                "Let me connect you with our experts who can give you a comprehensive answer. Please reach out to hello@xosolutions.com or use the contact form below."
            ]
        };
        
        this.keywords = {
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
            services: ['services', 'what do you do', 'offerings', 'solutions', 'products'],
            core: ['core', 'essential', 'basic', 'fundamental'],
            infrastructure: ['infrastructure', 'cloud', 'network', 'servers', 'hosting'],
            specialized: ['specialized', 'industry', 'specific', 'custom', 'tailored'],
            pricing: ['cost', 'price', 'pricing', 'how much', 'expensive', 'budget', 'quote'],
            implementation: ['timeline', 'how long', 'implementation', 'setup', 'deployment', 'install'],
            support: ['support', 'help', 'assistance', 'maintenance', 'uptime', 'sla'],
            company: ['about', 'company', 'who are you', 'background', 'experience'],
            contact: ['contact', 'reach', 'speak', 'talk', 'email', 'phone', 'call'],
            security: ['security', 'cybersecurity', 'protection', 'threats', 'shield'],
            backup: ['backup', 'recovery', 'disaster', 'data protection', 'vault'],
            cloud: ['cloud', 'migration', 'build', 'aws', 'azure'],
            monitoring: ['monitoring', 'command', 'operations', 'management'],
            workspace: ['workspace', 'collaboration', 'remote work', 'teams'],
            voice: ['voice', 'phone', 'communications', 'voip', 'calls'],
            network: ['network', 'wifi', 'connectivity', 'connect'],
            finance: ['finance', 'financial', 'banking', 'compliance'],
            hospitality: ['hotel', 'restaurant', 'hospitality', 'guest services'],
            visitor: ['visitor', 'guest management', 'check-in']
        };
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.bindEvents();
        this.startWelcomeSequence();
    }
    
    createWidget() {
        // Widget already exists in HTML, just enhance it
        this.widget = document.getElementById('chatWidget');
        this.toggle = document.getElementById('chatToggle');
        this.window = document.getElementById('chatWindow');
        this.minimize = document.getElementById('chatMinimize');
        this.messagesContainer = document.getElementById('chatMessages');
        this.input = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('chatSend');
        
        if (!this.widget) {
            console.log('Chat widget not found in DOM');
            return;
        }
        
        // Add typing indicator
        this.createTypingIndicator();
        
        // Add quick actions
        this.createQuickActions();
    }
    
    createTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p>XO Assistant is typing...</p>
        `;
        typingIndicator.style.display = 'none';
        this.messagesContainer.appendChild(typingIndicator);
        this.typingIndicator = typingIndicator;
    }
    
    createQuickActions() {
        const quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <p>Quick questions:</p>
            <button class="quick-action" data-message="What services do you offer?">Our Services</button>
            <button class="quick-action" data-message="How much does it cost?">Pricing Info</button>
            <button class="quick-action" data-message="Tell me about XO Shield">XO Shield</button>
            <button class="quick-action" data-message="I need help with cybersecurity">Security Help</button>
        `;
        
        // Insert after the initial bot message
        setTimeout(() => {
            this.messagesContainer.appendChild(quickActions);
            this.scrollToBottom();
        }, 1000);
        
        // Bind quick action events
        quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                const message = e.target.dataset.message;
                this.sendMessage(message, true);
                quickActions.remove();
            }
        });
    }
    
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (this.minimize) {
            this.minimize.addEventListener('click', () => this.closeChat());
        }
        
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.handleUserInput());
        }
        
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleUserInput();
                }
            });
            
            this.input.addEventListener('input', () => {
                this.handleTyping();
            });
        }
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && this.widget && 
                !this.widget.contains(e.target) && 
                !e.target.closest('.chat-widget')) {
                // Don't auto-close for now, let user control
            }
        });
    }
    
    startWelcomeSequence() {
        // Initial greeting after a short delay
        setTimeout(() => {
            const greeting = this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
            this.addMessage(greeting, false);
        }, 2000);
        
        // Add page-specific context
        setTimeout(() => {
            this.addContextualMessage();
        }, 4000);
    }
    
    addContextualMessage() {
        const path = window.location.pathname;
        let contextMessage = '';
        
        if (path.includes('xo-shield') || path.includes('shield')) {
            contextMessage = "I see you're looking at XO Shield! It's our comprehensive cybersecurity solution. Would you like to know about threat detection or compliance features?";
        } else if (path.includes('xo-command') || path.includes('command')) {
            contextMessage = "XO Command is perfect for businesses that need reliable IT operations. Are you interested in 24/7 monitoring or help desk support?";
        } else if (path.includes('xo-workspace') || path.includes('workspace')) {
            contextMessage = "XO Workspace is great for modern teams! Are you looking to improve remote work capabilities or team collaboration?";
        } else if (path.includes('services')) {
            contextMessage = "Exploring our service portfolio? I can help you find the right XO services for your business needs. What's your biggest IT challenge?";
        } else if (path.includes('about')) {
            contextMessage = "Learning about XO Solutions? We're excited to be your technology partner. What would you like to know about our approach?";
        } else if (path.includes('contact')) {
            contextMessage = "Ready to get started? I can help you prepare for your consultation. What services are you most interested in?";
        } else {
            contextMessage = "Since you're on our homepage, would you like me to explain our XO service categories or help you find solutions for specific needs?";
        }
        
        if (contextMessage) {
            this.addMessage(contextMessage, false);
        }
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            this.input.focus();
            this.markAsInteracted();
        }
    }
    
    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('open');
    }
    
    handleUserInput() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.sendMessage(message, true);
        this.input.value = '';
    }
    
    sendMessage(message, isUser = false) {
        this.addMessage(message, isUser);
        
        if (isUser) {
            this.markAsInteracted();
            this.analyzeUserMessage(message);
            this.showTyping();
            
            // Simulate thinking time
            setTimeout(() => {
                this.hideTyping();
                const response = this.generateResponse(message);
                this.addMessage(response, false);
                
                // Add follow-up suggestions
                setTimeout(() => {
                    this.addFollowUpSuggestions(message);
                }, 1000);
            }, 1000 + Math.random() * 1000);
        }
        
        this.scrollToBottom();
    }
    
    addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        if (isUser) {
            messageDiv.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        } else {
            messageDiv.innerHTML = `<div class="message-content">${this.formatMessage(message)}</div>`;
        }
        
        this.messagesContainer.insertBefore(messageDiv, this.typingIndicator);
        this.messages.push({ message, isUser, timestamp: Date.now() });
        this.scrollToBottom();
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
    }
    
    formatMessage(message) {
        // Convert markdown-style formatting
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bull;')
            .replace(/✅/g, '<span style="color: #22c55e;">✅</span>')
            .replace(/🛡️/g, '<span style="color: #3b82f6;">🛡️</span>')
            .replace(/💼/g, '<span style="color: #8b5cf6;">💼</span>')
            .replace(/📞/g, '<span style="color: #06b6d4;">📞</span>')
            .replace(/💾/g, '<span style="color: #10b981;">💾</span>')
            .replace(/☁️/g, '<span style="color: #0ea5e9;">☁️</span>')
            .replace(/🌐/g, '<span style="color: #84cc16;">🌐</span>')
            .replace(/🏰/g, '<span style="color: #dc2626;">🏰</span>')
            .replace(/🏦/g, '<span style="color: #059669;">🏦</span>')
            .replace(/🏨/g, '<span style="color: #d97706;">🏨</span>')
            .replace(/👥/g, '<span style="color: #7c3aed;">👥</span>');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }
    
    analyzeUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Track interested services
        Object.keys(this.responses.specific).forEach(service => {
            if (lowerMessage.includes(service) || lowerMessage.includes(service.replace('-', ' '))) {
                if (!this.userContext.interestedServices.includes(service)) {
                    this.userContext.interestedServices.push(service);
                }
            }
        });
        
        // Extract company size hints
        if (lowerMessage.match(/\b(\d+)\s+(employees?|people|staff)\b/)) {
            const match = lowerMessage.match(/\b(\d+)\s+(employees?|people|staff)\b/);
            const size = parseInt(match[1]);
            if (size <= 25) this.userContext.companySize = 'small';
            else if (size <= 100) this.userContext.companySize = 'medium';
            else this.userContext.companySize = 'large';
        }
        
        // Industry detection
        const industries = {
            'finance': ['bank', 'financial', 'finance', 'credit', 'loan', 'investment'],
            'healthcare': ['medical', 'hospital', 'doctor', 'healthcare', 'patient'],
            'hospitality': ['hotel', 'restaurant', 'hospitality', 'guest', 'tourism'],
            'technology': ['software', 'tech', 'development', 'saas', 'app'],
            'professional': ['law', 'legal', 'consulting', 'accounting', 'professional']
        };
        
        Object.entries(industries).forEach(([industry, keywords]) => {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                this.userContext.industry = industry;
            }
        });
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific service mentions
        for (const [service, response] of Object.entries(this.responses.specific)) {
            if (lowerMessage.includes(service) || lowerMessage.includes(service.replace('-', ' '))) {
                return response;
            }
        }
        
        // Check for category matches
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                switch (category) {
                    case 'greeting':
                        return this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
                    case 'services':
                        return this.responses.services.general;
                    case 'core':
                        return this.responses.services.core;
                    case 'infrastructure':
                        return this.responses.services.infrastructure;
                    case 'specialized':
                        return this.responses.services.specialized;
                    case 'pricing':
                        return this.responses.pricing;
                    case 'implementation':
                        return this.responses.implementation;
                    case 'support':
                        return this.responses.support;
                    case 'company':
                        return this.responses.company;
                    case 'contact':
                        return this.responses.contact;
                    default:
                        if (this.responses.specific[category]) {
                            return this.responses.specific[category];
                        }
                }
            }
        }
        
        // Contextual responses based on user data
        if (this.userContext.industry && lowerMessage.includes('recommend')) {
            return this.getIndustryRecommendations();
        }
        
        if (this.userContext.companySize && lowerMessage.includes('size')) {
            return this.getSizeRecommendations();
        }
        
        // Fallback response
        return this.responses.fallback[Math.floor(Math.random() * this.responses.fallback.length)];
    }
    
    getIndustryRecommendations() {
        const industry = this.userContext.industry;
        const recommendations = {
            'finance': "For financial services, I'd recommend:\n\n🏦 **XO Finance** - Regulatory compliance and secure transactions\n🛡️ **XO Shield** - Enhanced cybersecurity\n🏰 **XO Fortress** - Business continuity planning\n\nThese ensure compliance and security in the financial sector.",
            
            'healthcare': "For healthcare organizations, consider:\n\n🛡️ **XO Shield** - HIPAA compliance and data protection\n💾 **XO Vault** - Secure patient data backup\n👥 **XO Guest** - Visitor management and contact tracing\n\nThese address healthcare's unique security and compliance needs.",
            
            'hospitality': "For hospitality businesses, I'd suggest:\n\n🏨 **XO Hospitality** - Guest services and PMS integration\n🌐 **XO Connect** - Guest Wi-Fi and network management\n📞 **XO Voice** - Reservation and customer service systems\n\nThese enhance guest experiences and operational efficiency.",
            
            'technology': "For tech companies, consider:\n\n☁️ **XO Build** - Scalable cloud infrastructure\n💼 **XO Workspace** - Developer collaboration tools\n🔧 **XO Command** - DevOps and system monitoring\n\nThese support rapid scaling and development workflows.",
            
            'professional': "For professional services, I'd recommend:\n\n💼 **XO Workspace** - Client collaboration and document sharing\n🛡️ **XO Shield** - Client data protection\n👥 **XO Guest** - Client visit management\n\nThese maintain professionalism and client trust."
        };
        
        return recommendations[industry] || "Based on your industry, I can provide tailored recommendations. What specific challenges are you facing?";
    }
    
    getSizeRecommendations() {
        const size = this.userContext.companySize;
        const recommendations = {
            'small': "For small businesses, I'd recommend starting with:\n\n🔧 **XO Command** - Essential IT operations\n💾 **XO Vault** - Data protection\n💼 **XO Workspace** - Team collaboration\n\nThese provide a solid foundation that grows with you.",
            
            'medium': "For medium businesses, consider:\n\n🔧 **XO Command** - Comprehensive IT management\n🛡️ **XO Shield** - Advanced security\n☁️ **XO Build** - Scalable infrastructure\n🌐 **XO Connect** - Multi-location networking\n\nThese handle increased complexity and growth.",
            
            'large': "For large enterprises, I'd recommend:\n\n🔧 **XO Command** - Enterprise operations\n🛡️ **XO Shield** - Enterprise security\n🏰 **XO Fortress** - Business continuity\n☁️ **XO Build** - Enterprise cloud architecture\n\nThese provide enterprise-grade reliability and scale."
        };
        
        return recommendations[size] || "I can provide size-appropriate recommendations. How many employees does your company have?";
    }
    
    addFollowUpSuggestions(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let suggestions = [];
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            suggestions = [
                "Schedule free assessment",
                "Compare service tiers",
                "ROI calculation help"
            ];
        } else if (lowerMessage.includes('security') || lowerMessage.includes('shield')) {
            suggestions = [
                "Threat assessment",
                "Compliance requirements",
                "Security audit"
            ];
        } else if (lowerMessage.includes('backup') || lowerMessage.includes('vault')) {
            suggestions = [
                "Recovery time needs",
                "Data retention policies",
                "Compliance archiving"
            ];
        } else if (lowerMessage.includes('cloud') || lowerMessage.includes('build')) {
            suggestions = [
                "Migration timeline",
                "Cost optimization",
                "Architecture planning"
            ];
        } else {
            suggestions = [
                "Get custom quote",
                "Schedule consultation",
                "Compare services"
            ];
        }
        
        if (suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'follow-up-suggestions';
            suggestionsDiv.innerHTML = `
                <p>I can also help with:</p>
                <div class="suggestion-buttons">
                    ${suggestions.map(suggestion => 
                        `<button class="suggestion-btn" data-message="${suggestion}">${suggestion}</button>`
                    ).join('')}
                </div>
            `;
            
            this.messagesContainer.insertBefore(suggestionsDiv, this.typingIndicator);
            
            // Bind suggestion events
            suggestionsDiv.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-btn')) {
                    const message = e.target.dataset.message;
                    this.sendMessage(message, true);
                    suggestionsDiv.remove();
                }
            });
        }
    }
    
    handleTyping() {
        // Show "user is typing" indicator to bot (for future server integration)
        // For now, just ensure input validation
        const message = this.input.value.trim();
        this.sendBtn.disabled = !message;
    }
    
    markAsInteracted() {
        this.userContext.hasInteracted = true;
        
        // Remove pulsing animation from toggle
        if (this.toggle) {
            this.toggle.style.animation = 'none';
        }
    }
    
    scrollToBottom() {
        requestAnimationFrame(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        });
    }
    
    // Public methods for integration
    openChatWithMessage(message) {
        if (!this.isOpen) {
            this.toggleChat();
        }
        
        setTimeout(() => {
            this.sendMessage(message, true);
        }, 500);
    }
    
    addServiceInterest(serviceId) {
        if (!this.userContext.interestedServices.includes(serviceId)) {
            this.userContext.interestedServices.push(serviceId);
        }
    }
    
    setUserContext(context) {
        Object.assign(this.userContext, context);
    }
    
    getUserContext() {
        return { ...this.userContext };
    }
    
    // Analytics and tracking
    trackEvent(event, data = {}) {
        const eventData = {
            event,
            timestamp: Date.now(),
            userContext: this.userContext,
            currentPage: window.location.pathname,
            ...data
        };
        
        // Send to analytics (implement as needed)
        console.log('Chat Event:', eventData);
        
        // You can integrate with Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                custom_parameter_1: data.service || 'general',
                custom_parameter_2: data.category || 'chat_interaction'
            });
        }
    }
    
    // Export conversation for support handoff
    exportConversation() {
        return {
            messages: this.messages,
            userContext: this.userContext,
            timestamp: Date.now(),
            sessionId: this.generateSessionId()
        };
    }
    
    generateSessionId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// CSS for enhanced chat features
const chatCSS = `
.typing-indicator {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    opacity: 0.7;
}

.typing-dots {
    display: flex;
    gap: 0.2rem;
    margin-right: 0.5rem;
}

.typing-dots span {
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-10px);
        opacity: 1;
    }
}

.typing-indicator p {
    font-size: 0.8rem;
    color: var(--gray);
    margin: 0;
    font-style: italic;
}

.quick-actions {
    background: var(--light-gray);
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
    border-left: 3px solid var(--accent);
}

.quick-actions p {
    font-size: 0.8rem;
    color: var(--gray);
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.quick-action {
    display: inline-block;
    background: var(--secondary);
    border: 1px solid var(--accent);
    color: var(--accent);
    padding: 0.4rem 0.8rem;
    margin: 0.2rem 0.2rem 0.2rem 0;
    border-radius: 20px;
    font-size: 0.75rem;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
}

.quick-action:hover {
    background: var(--accent);
    color: var(--secondary);
    transform: translateY(-1px);
}

.follow-up-suggestions {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
}

.follow-up-suggestions p {
    font-size: 0.8rem;
    color: var(--gray);
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.suggestion-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.suggestion-btn {
    background: var(--info);
    color: var(--secondary);
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.75rem;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
}

.suggestion-btn:hover {
    background: var(--primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.message-content {
    line-height: 1.5;
}

.message-content strong {
    color: var(--primary);
    font-weight: 600;
}

.message-content em {
    color: var(--accent);
    font-style: normal;
    font-weight: 500;
}

.chat-message.bot {
    animation: slideInBot 0.3s ease;
}

.chat-message.user {
    animation: slideInUser 0.3s ease;
}

@keyframes slideInBot {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInUser {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.chat-input-container button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.chat-input-container button:not(:disabled):hover {
    background: var(--primary);
    transform: translateY(-1px);
}

/* Enhanced chat widget positioning */
.chat-widget {
    z-index: 1500;
}

.chat-toggle {
    position: relative;
    overflow: hidden;
}

.chat-toggle::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.chat-toggle:hover::before {
    left: 100%;
}

/* Responsive chat improvements */
@media (max-width: 480px) {
    .chat-window {
        width: calc(100vw - 1rem);
        height: 70vh;
        bottom: 70px;
        right: 0.5rem;
        border-radius: 8px 8px 0 0;
    }
    
    .quick-actions {
        padding: 0.8rem;
    }
    
    .quick-action {
        display: block;
        margin: 0.3rem 0;
        text-align: center;
    }
    
    .suggestion-buttons {
        flex-direction: column;
    }
    
    .suggestion-btn {
        width: 100%;
        text-align: center;
    }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
    .chat-window {
        background: #1a1a1a;
        border-color: #333;
    }
    
    .chat-header {
        background: #000;
    }
    
    .chat-message.bot {
        background: #2a2a2a;
        color: #e5e5e5;
    }
    
    .quick-actions,
    .follow-up-suggestions {
        background: #2a2a2a;
        border-color: #444;
    }
    
    .quick-action {
        background: #333;
        border-color: #666;
        color: #e5e5e5;
    }
}
`;

// Add CSS to page
const chatStyleSheet = document.createElement('style');
chatStyleSheet.textContent = chatCSS;
document.head.appendChild(chatStyleSheet);

// Initialize chat widget and make it globally available
let xoChat;

document.addEventListener('DOMContentLoaded', () => {
    xoChat = new XOChatWidget();
    
    // Make chat available globally for other scripts
    window.XOChat = xoChat;
    
    // Integration with other page elements
    document.querySelectorAll('[data-open-chat]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const message = element.dataset.chatMessage || element.dataset.openChat;
            xoChat.openChatWithMessage(message);
        });
    });
    
    // Track service page visits
    const servicePage = document.body.dataset.service;
    if (servicePage) {
        xoChat.addServiceInterest(servicePage);
    }
    
    // Auto-open chat based on user behavior (optional)
    let scrollTimeout;
    let hasScrolledToServices = false;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const servicesSection = document.getElementById('services');
            if (servicesSection && !hasScrolledToServices) {
                const rect = servicesSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    hasScrolledToServices = true;
                    
                    // Open chat with contextual message after user shows interest
                    setTimeout(() => {
                        if (!xoChat.userContext.hasInteracted && !xoChat.isOpen) {
                            xoChat.addMessage("I see you're exploring our services! I'm here if you have any questions about XO Solutions. 😊", false);
                            
                            // Add gentle pulse to chat toggle
                            if (xoChat.toggle) {
                                xoChat.toggle.style.animation = 'pulse-chat 2s infinite';
                            }
                        }
                    }, 3000);
                }
            }
        }, 100);
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XOChatWidget;
}