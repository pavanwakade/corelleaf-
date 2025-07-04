// Careers Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize careers page functionality
    // The loadVacancies function is now called from script.js
    initializeApplicationForm();
    initializeScrollAnimations();
    initializeStatsCounter();
});

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('applicationModal');
    const applyButtons = document.querySelectorAll('.apply-btn');
    const closeButton = document.querySelector('.close');
    const positionTitle = document.getElementById('positionTitle');

    // Open modal when apply button is clicked
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const position = this.getAttribute('data-position');
            positionTitle.textContent = position;
            
            // Set the position in the form
            const form = document.getElementById('applicationForm');
            let positionInput = form.querySelector('input[name="position"]');
            if (!positionInput) {
                positionInput = document.createElement('input');
                positionInput.type = 'hidden';
                positionInput.name = 'position';
                form.appendChild(positionInput);
            }
            positionInput.value = position;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when X is clicked
    closeButton.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('applicationForm');
        form.reset();
        
        // Remove any success/error messages
        const existingMessages = form.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
    }
}

// Application form handling
function initializeApplicationForm() {
    const form = document.getElementById('applicationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Remove any existing messages
            const existingMessages = form.querySelectorAll('.success-message, .error-message');
            existingMessages.forEach(msg => msg.remove());
            
            // Validate form
            if (validateForm(form)) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Application submitted successfully! We\'ll get back to you soon.';
                form.insertBefore(successMessage, form.firstChild);
                
                // Reset form after short delay
                setTimeout(() => {
                    form.reset();
                    document.getElementById('applicationModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 2000);
                
                // Send to email (you can integrate with your backend here)
                console.log('Application submitted:', new FormData(form));
                
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please fill in all required fields correctly.';
                form.insertBefore(errorMessage, form.firstChild);
            }
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
    
    // File upload validation
    const resumeInput = document.getElementById('resume');
    resumeInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                this.value = '';
                return;
            }
            
            // Check file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a PDF, DOC, or DOCX file');
                this.value = '';
                return;
            }
        }
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#f44336';
        } else {
            field.style.borderColor = '#e1e1e1';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#f44336';
        }
    }
    
    // Phone validation
    const phoneField = form.querySelector('[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            isValid = false;
            phoneField.style.borderColor = '#f44336';
        }
    }
    
    return isValid;
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in-up class to elements that should animate
    const animateElements = document.querySelectorAll('.benefit-card, .position-card, .culture-item');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Stats counter animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateCounter(target, finalNumber);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to page
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});

// Parallax effect for floating shapes
function initializeParallax() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed * 0.1}deg)`;
        });
    });
}

// Initialize parallax effect
initializeParallax();

// Add hover effects to cards
document.querySelectorAll('.benefit-card, .position-card, .culture-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(500px) rotateX(10deg) translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(500px) rotateX(10deg)';
    });
});

// Mobile menu functionality (if needed)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
