// Configuration file for Kathaayoni Academy website
// This file contains all configurable settings

const CONFIG = {
    // School Information
    school: {
        name: 'Kathaayoni Academy',
        tagline: 'Empowering minds, shaping futures',
        email: 'paulajnr287@gmail.com',
        phone: '+254 717473314',
        address: {
            street: 'scape Fitness , Machakos-Kitui Road',
            city: 'Machakos County',
            country: 'Kenya'
        },
        website: 'https://asingo-paul.github.io/kathaayoni',
        founded: 1985
    },
    
    // EmailJS Configuration (Your actual credentials)
    emailjs: {
        publicKey: 'service_021j93m',        // Your EmailJS public key
        serviceId: 'service_021j93m',        // Your EmailJS service ID  
        templateId: 'YOUR_TEMPLATE_ID',      // Replace with your main template ID
        autoReplyTemplateId: 'YOUR_AUTO_REPLY_TEMPLATE_ID' // Replace with auto-reply template ID
    },
    
    // Form Configuration
    contact: {
        maxMessageLength: 1000,
        requiredFields: ['user_name', 'user_email', 'message'],
        inquiryTypes: [
            { value: 'admission', label: 'Admission Inquiry' },
            { value: 'fees', label: 'Fee Information' },
            { value: 'academic', label: 'Academic Programs' },
            { value: 'facilities', label: 'School Facilities' },
            { value: 'transport', label: 'Transport Services' },
            { value: 'general', label: 'General Information' },
            { value: 'other', label: 'Other' }
        ],
        responseTime: '24 hours during business days'
    },
    
    // Social Media Links
    social: {
        facebook: 'https://www.facebook.com/people/Kathaayoni-Academy-Junior-School/100088139561310/',
        twitter: 'https://twitter.com/kathaayoniacademy',
        instagram: 'https://instagram.com/kathaayoniacademy',
        linkedin: 'https://linkedin.com/company/kathaayoniacademy'
    },
    
    // Analytics Configuration
    analytics: {
        googleAnalyticsId: 'GA_MEASUREMENT_ID', // Replace with your GA4 measurement ID
        enableTracking: true,
        trackFormSubmissions: true,
        trackDownloads: true
    },
    
    // Performance Settings
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: false, // Disabled to preserve image quality
        enableCaching: true,
        maxImageSize: null, // No limit - preserve original quality
        preserveImageQuality: true // Keep original image quality
    },
    
    // Security Settings
    security: {
        enableCSP: true,
        enableRateLimiting: true,
        maxSubmissionsPerHour: 5,
        enableCaptcha: false // Set to true if you want to add CAPTCHA
    },
    
    // Feature Flags
    features: {
        enableNewsletter: true,
        enableDownloads: true,
        enableGallery: true,
        enableTestimonials: true,
        enablePartners: true,
        enableFeeStructure: true
    },
    
    // API Endpoints (if you add backend services later)
    api: {
        baseUrl: 'https://api.kathaayoniacademy.edu',
        endpoints: {
            contact: '/contact',
            newsletter: '/newsletter',
            downloads: '/downloads'
        }
    }
};

// Export configuration for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Validation function to check if required config is set
function validateConfig() {
    const errors = [];
    
    // Check EmailJS configuration
    if (CONFIG.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
        errors.push('EmailJS public key not configured');
    }
    
    if (CONFIG.emailjs.serviceId === 'YOUR_SERVICE_ID') {
        errors.push('EmailJS service ID not configured');
    }
    
    if (CONFIG.emailjs.templateId === 'YOUR_TEMPLATE_ID') {
        errors.push('EmailJS template ID not configured');
    }
    
    // Check school information
    if (!CONFIG.school.email || CONFIG.school.email.includes('example')) {
        errors.push('School email not properly configured');
    }
    
    if (errors.length > 0) {
        console.warn('Configuration warnings:', errors);
        return false;
    }
    
    return true;
}

// Initialize configuration validation
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        validateConfig();
    });
}