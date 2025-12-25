// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
if (testimonials.length > 0) {
    setInterval(nextTestimonial, 5000);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .facility-item, .leader-card, .achievement-item');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(220, 20, 60, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-red), var(--primary-blue))';
    }
});

// Counter animation for achievements
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Trigger counter animation when achievements section is visible
const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    const achievementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                achievementsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    achievementsObserver.observe(achievementsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects for cards
document.querySelectorAll('.card, .facility-item, .leader-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Fee Structure Functions
function downloadFeeStructure() {
    // Create a more detailed fee structure content for PDF
    const feeContent = `
        KATHAAYONI ACADEMY
        FEE STRUCTURE 2024/2025 ACADEMIC YEAR
        
        ========================================
        
        TUITION FEES (Per Term):
        
        Pre-Primary (PP1 & PP2)
        - Tuition Fee: KES 15,000
        - Activity Fee: KES 2,500
        - Total: KES 17,500
        
        Grade 1 - 3 (Lower Primary)
        - Tuition Fee: KES 18,000
        - Activity Fee: KES 3,000
        - Total: KES 21,000
        
        Grade 4 - 6 (Upper Primary)
        - Tuition Fee: KES 22,000
        - Activity Fee: KES 3,500
        - Total: KES 25,500
        
        Grade 7 - 9 (Junior Secondary)
        - Tuition Fee: KES 28,000
        - Activity Fee: KES 4,000
        - Total: KES 32,000
        
        Form 1 - 4 (Senior Secondary)
        - Tuition Fee: KES 35,000
        - Activity Fee: KES 5,000
        - Total: KES 40,000
        
        ========================================
        
        ADDITIONAL FEES:
        
        - Registration Fee: KES 5,000 (One-time for new students)
        - Uniform & Books: KES 8,000 - 12,000 (Varies by class)
        - Transport (Optional): KES 6,000 per term
        - Boarding (Form 1-4): KES 25,000 per term
        
        ========================================
        
        PAYMENT METHODS:
        
        1. M-PESA
           Paybill: 247247
           Account: Student ID Number
        
        2. Bank Transfer
           Bank: KCB Bank
           Account: 1234567890
           Account Name: Kathaayoni Academy
        
        3. Card Payment
           Visit school office
           Visa/Mastercard accepted
        
        ========================================
        
        PAYMENT POLICIES:
        
        - Fees are payable termly in advance
        - Installment plans available upon request
        - Merit-based scholarships available
        - 10% discount for siblings
        - Early payment discount: 5% if paid before term starts
        
        ========================================
        
        For more information, contact:
        Email: info@kathaayoniacademy.edu
        Phone: +254 123 456 789
        
        Visit us: 123 Education Street, Machakos
    `;
    
    // Create and download the file
    const blob = new Blob([feeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kathaayoni_Academy_Fee_Structure_2024-2025.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert('Fee structure downloaded successfully! Check your downloads folder.');
}

function printFeeStructure() {
    const feeTable = document.getElementById('feeTable');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kathaayoni Academy - Fee Structure 2024/2025</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #DC143C;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #0066FF;
                    margin: 0;
                }
                .header h2 {
                    color: #DC143C;
                    margin: 10px 0 0 0;
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 20px 0;
                }
                th, td { 
                    border: 1px solid #ddd; 
                    padding: 12px; 
                    text-align: left; 
                }
                th { 
                    background: linear-gradient(135deg, #DC143C, #0066FF); 
                    color: white; 
                    font-weight: bold;
                }
                tr:nth-child(even) { 
                    background: #f9f9f9; 
                }
                .notes {
                    margin-top: 30px;
                    padding: 20px;
                    background: #f8f9fa;
                    border-left: 4px solid #FFD700;
                }
                .notes h4 {
                    color: #DC143C;
                    margin-top: 0;
                }
                .notes ul {
                    margin: 10px 0;
                }
                .notes li {
                    margin: 8px 0;
                }
                .payment-methods {
                    margin-top: 20px;
                    padding: 20px;
                    background: #e8f4fd;
                    border-left: 4px solid #0066FF;
                }
                .payment-methods h4 {
                    color: #0066FF;
                    margin-top: 0;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                }
                @media print {
                    body { margin: 0; }
                    .header { page-break-after: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>KATHAAYONI ACADEMY</h1>
                <h2>Fee Structure 2024/2025 Academic Year</h2>
                <p>Empowering minds, shaping futures</p>
            </div>
            ${feeTable.outerHTML}
            <div class="footer">
                <p>For inquiries: info@kathaayoniacademy.edu | +254 123 456 789</p>
                <p>Visit us: 123 Education Street, Machakos County</p>
                <p>Printed on: ${new Date().toLocaleDateString()}</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);