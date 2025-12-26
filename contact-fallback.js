// Fallback Contact Form Solution (Works immediately without EmailJS setup)
// This creates a mailto link with pre-filled information as a backup

// Alternative contact form handler that works without EmailJS
function handleContactFormFallback() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('user_name').value.trim(),
            email: document.getElementById('user_email').value.trim(),
            phone: document.getElementById('user_phone').value.trim(),
            inquiryType: document.getElementById('inquiry_type').value,
            message: document.getElementById('message').value.trim(),
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create email content
        const subject = `Contact Form: ${formData.inquiryType || 'General Inquiry'} - ${formData.name}`;
        const body = `
Dear Kathaayoni Academy Team,

I am contacting you through your website with the following inquiry:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.inquiryType || 'General Inquiry'}
Newsletter Subscription: ${formData.newsletter ? 'Yes' : 'No'}

Message:
${formData.message}

---
This message was sent from the Kathaayoni Academy website contact form.
Please reply to: ${formData.email}

Best regards,
${formData.name}
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:info@kathaayoniacademy.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Show options to user
        showContactOptions(mailtoLink, formData);
    });
}

// Show contact options modal
function showContactOptions(mailtoLink, formData) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-modal-header">
                <h3>📧 Send Your Message</h3>
                <button class="contact-modal-close">&times;</button>
            </div>
            <div class="contact-modal-body">
                <p>Choose how you'd like to send your message:</p>
                
                <div class="contact-options">
                    <button class="contact-option-btn primary" onclick="window.open('${mailtoLink}')">
                        <i class="fas fa-envelope"></i>
                        Open Email Client
                        <small>Opens your default email app</small>
                    </button>
                    
                    <button class="contact-option-btn secondary" onclick="copyToClipboard('${formData.email}', '${formData.name}', '${formData.message}')">
                        <i class="fas fa-copy"></i>
                        Copy Details
                        <small>Copy info to send manually</small>
                    </button>
                    
                    <button class="contact-option-btn tertiary" onclick="showDirectContact()">
                        <i class="fas fa-phone"></i>
                        Call Directly
                        <small>+254 123 456 789</small>
                    </button>
                </div>
                
                <div class="contact-info-box">
                    <h4>📋 Your Message Summary:</h4>
                    <div class="message-summary">
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                        <p><strong>Inquiry:</strong> ${formData.inquiryType || 'General'}</p>
                        <p><strong>Message:</strong> ${formData.message}</p>
                    </div>
                </div>
            </div>
            <div class="contact-modal-footer">
                <p><small>We'll respond within 24 hours during business days</small></p>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.contact-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Copy contact details to clipboard
function copyToClipboard(email, name, message) {
    const textToCopy = `
To: info@kathaayoniacademy.edu
From: ${name} <${email}>

${message}

---
Please reply to: ${email}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('Contact details copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Contact details copied to clipboard!', 'success');
    });
}

// Show direct contact information
function showDirectContact() {
    showNotification(`
        📞 Call us: +254 123 456 789<br>
        📧 Email: info@kathaayoniacademy.edu<br>
        📍 Visit: 123 Education Street, Machakos
    `, 'info');
}

// Initialize fallback if EmailJS is not available
document.addEventListener('DOMContentLoaded', function() {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.log('EmailJS not loaded, using fallback contact method');
        handleContactFormFallback();
    }
});

// CSS for contact modal (add to styles.css or inject)
const modalStyles = `
.contact-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.contact-modal-content {
    background: white;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.contact-modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-modal-header h3 {
    margin: 0;
    color: var(--primary-blue);
}

.contact-modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-modal-close:hover {
    color: var(--primary-red);
}

.contact-modal-body {
    padding: 20px;
}

.contact-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
}

.contact-option-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.contact-option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.contact-option-btn.primary {
    border-color: var(--primary-blue);
    color: var(--primary-blue);
}

.contact-option-btn.primary:hover {
    background: var(--primary-blue);
    color: white;
}

.contact-option-btn.secondary {
    border-color: var(--primary-yellow);
    color: #B8860B;
}

.contact-option-btn.secondary:hover {
    background: var(--primary-yellow);
    color: white;
}

.contact-option-btn.tertiary {
    border-color: var(--primary-red);
    color: var(--primary-red);
}

.contact-option-btn.tertiary:hover {
    background: var(--primary-red);
    color: white;
}

.contact-option-btn i {
    font-size: 24px;
    margin-bottom: 8px;
}

.contact-option-btn small {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
}

.contact-info-box {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    border-left: 4px solid var(--primary-blue);
}

.contact-info-box h4 {
    margin: 0 0 10px 0;
    color: var(--primary-blue);
}

.message-summary p {
    margin: 5px 0;
    font-size: 14px;
}

.contact-modal-footer {
    padding: 15px 20px;
    background: #f8f9fa;
    border-top: 1px solid #eee;
    text-align: center;
    border-radius: 0 0 15px 15px;
}

@media (max-width: 480px) {
    .contact-modal-content {
        width: 95%;
        margin: 10px;
    }
    
    .contact-options {
        gap: 8px;
    }
    
    .contact-option-btn {
        padding: 12px;
    }
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);