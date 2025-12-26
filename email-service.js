// Email Service for Kathaayoni Academy
// This service handles email functionality using multiple methods

class EmailService {
    constructor() {
        this.config = CONFIG;
        this.isEmailJSReady = false;
        this.init();
    }
    
    // Initialize email service
    init() {
        // Check if EmailJS is available and configured
        if (typeof emailjs !== 'undefined' && this.config.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
            try {
                emailjs.init(this.config.emailjs.publicKey);
                this.isEmailJSReady = true;
                console.log('✅ EmailJS service initialized');
            } catch (error) {
                console.warn('⚠️ EmailJS initialization failed:', error);
                this.isEmailJSReady = false;
            }
        } else {
            console.log('📧 Using fallback email methods');
            this.isEmailJSReady = false;
        }
    }
    
    // Send email using EmailJS
    async sendViaEmailJS(formData) {
        if (!this.isEmailJSReady) {
            throw new Error('EmailJS not available');
        }
        
        // Generate unique submission ID
        const submissionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // Calculate years of excellence
        const currentYear = new Date().getFullYear();
        const yearsOfExcellence = currentYear - this.config.school.founded;
        
        // Determine priority level
        const priorityMap = {
            'admission': 'high',
            'fees': 'medium',
            'academic': 'medium',
            'facilities': 'low',
            'transport': 'low',
            'general': 'low',
            'other': 'medium'
        };
        
        const templateParams = {
            // Contact Information
            from_name: formData.user_name,
            user_name: formData.user_name,
            from_email: formData.user_email,
            user_email: formData.user_email,
            phone: formData.user_phone || 'Not provided',
            user_phone: formData.user_phone || 'Not provided',
            reply_to: formData.user_email,
            
            // Inquiry Details
            inquiry_type: formData.inquiry_type || 'General Inquiry',
            message: formData.message,
            newsletter: formData.newsletter ? 'Yes' : 'No',
            newsletter_subscription: formData.newsletter,
            
            // School Information
            school_name: this.config.school.name,
            school_email: this.config.school.email,
            school_phone: this.config.school.phone,
            school_website: this.config.school.website,
            school_address: `${this.config.school.address.street}, ${this.config.school.address.city}, ${this.config.school.address.country}`,
            school_founded: this.config.school.founded,
            years_of_excellence: yearsOfExcellence,
            
            // Submission Details
            timestamp: new Date().toLocaleString('en-KE', {
                timeZone: 'Africa/Nairobi',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'long'
            }),
            submission_id: submissionId,
            submission_number: Math.floor(Math.random() * 9000) + 1000, // Random 4-digit number
            response_time: this.config.contact.responseTime,
            day_of_week: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
            
            // Priority and Classification
            priority_level: priorityMap[formData.inquiry_type] || 'medium',
            is_urgent: formData.inquiry_type === 'admission' || formData.message.toLowerCase().includes('urgent'),
            
            // Social Media (from config)
            facebook_url: this.config.social.facebook,
            twitter_url: this.config.social.twitter,
            instagram_url: this.config.social.instagram,
            linkedin_url: this.config.social.linkedin,
            
            // Email routing
            to_email: this.config.school.email
        };
        
        try {
            const response = await emailjs.send(
                this.config.emailjs.serviceId,
                this.config.emailjs.templateId,
                templateParams
            );
            
            // Send auto-reply if configured
            if (this.config.emailjs.autoReplyTemplateId && this.config.emailjs.autoReplyTemplateId !== 'YOUR_AUTO_REPLY_TEMPLATE_ID') {
                await this.sendAutoReply(formData, templateParams);
            }
            
            return { success: true, method: 'emailjs', response, submissionId };
        } catch (error) {
            console.error('EmailJS send failed:', error);
            throw error;
        }
    }
    
    // Send auto-reply to user
    async sendAutoReply(formData, originalParams) {
        try {
            const autoReplyParams = {
                ...originalParams,
                to_email: formData.user_email,
                user_name: formData.user_name,
                response_time: this.config.contact.responseTime
            };
            
            await emailjs.send(
                this.config.emailjs.serviceId,
                this.config.emailjs.autoReplyTemplateId,
                autoReplyParams
            );
            
            console.log('✅ Auto-reply sent successfully');
        } catch (error) {
            console.warn('⚠️ Auto-reply failed:', error);
            // Don't throw error for auto-reply failure
        }
    }
    
    // Fallback: Create mailto link
    createMailtoLink(formData) {
        const subject = `Contact Form: ${formData.inquiry_type || 'General Inquiry'} - ${formData.user_name}`;
        const body = this.formatEmailBody(formData);
        
        return `mailto:${this.config.school.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    
    // Format email body for mailto
    formatEmailBody(formData) {
        return `
Dear ${this.config.school.name} Team,

I am contacting you through your website with the following inquiry:

CONTACT INFORMATION:
Name: ${formData.user_name}
Email: ${formData.user_email}
Phone: ${formData.user_phone || 'Not provided'}
Inquiry Type: ${formData.inquiry_type || 'General Inquiry'}
Newsletter Subscription: ${formData.newsletter ? 'Yes' : 'No'}

MESSAGE:
${formData.message}

SUBMISSION DETAILS:
Submitted: ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}
Website: ${this.config.school.website}

---
This message was sent from the ${this.config.school.name} website contact form.
Please reply to: ${formData.user_email}

Best regards,
${formData.user_name}
        `.trim();
    }
    
    // Main send method - tries EmailJS first, falls back to mailto
    async send(formData) {
        // Validate form data
        const validation = this.validateFormData(formData);
        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }
        
        // Try EmailJS first
        if (this.isEmailJSReady) {
            try {
                return await this.sendViaEmailJS(formData);
            } catch (error) {
                console.warn('EmailJS failed, using fallback method:', error);
            }
        }
        
        // Fallback to mailto
        const mailtoLink = this.createMailtoLink(formData);
        return { 
            success: true, 
            method: 'mailto', 
            mailtoLink,
            message: 'Please use your email client to send the message'
        };
    }
    
    // Validate form data
    validateFormData(formData) {
        const errors = [];
        
        // Check required fields
        this.config.contact.requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`${field.replace('user_', '').replace('_', ' ')} is required`);
            }
        });
        
        // Validate email format
        if (formData.user_email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.user_email)) {
                errors.push('Invalid email format');
            }
        }
        
        // Check message length
        if (formData.message && formData.message.length > this.config.contact.maxMessageLength) {
            errors.push(`Message too long (max ${this.config.contact.maxMessageLength} characters)`);
        }
        
        // Validate phone if provided
        if (formData.user_phone && formData.user_phone.trim() !== '') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(formData.user_phone)) {
                errors.push('Invalid phone number format');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    // Rate limiting check (client-side)
    checkRateLimit() {
        if (!this.config.security.enableRateLimiting) {
            return { allowed: true };
        }
        
        const now = Date.now();
        const hour = 60 * 60 * 1000;
        const submissions = JSON.parse(localStorage.getItem('email_submissions') || '[]');
        
        // Clean old submissions
        const recentSubmissions = submissions.filter(time => now - time < hour);
        
        if (recentSubmissions.length >= this.config.security.maxSubmissionsPerHour) {
            return {
                allowed: false,
                message: `Rate limit exceeded. Maximum ${this.config.security.maxSubmissionsPerHour} submissions per hour.`,
                resetTime: new Date(recentSubmissions[0] + hour)
            };
        }
        
        // Add current submission
        recentSubmissions.push(now);
        localStorage.setItem('email_submissions', JSON.stringify(recentSubmissions));
        
        return { allowed: true };
    }
    
    // Get service status
    getStatus() {
        return {
            emailJSReady: this.isEmailJSReady,
            configValid: this.config.emailjs.publicKey !== 'YOUR_PUBLIC_KEY',
            fallbackAvailable: true,
            rateLimitEnabled: this.config.security.enableRateLimiting
        };
    }
}

// Initialize email service
const emailService = new EmailService();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.EmailService = EmailService;
    window.emailService = emailService;
}

// Log service status
console.log('📧 Email Service Status:', emailService.getStatus());