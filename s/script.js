// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initFormHandling();
    initLoadingAnimation();
    init3DEffects();
    initCursorEffects();
    loadProjects();
    loadVacancies();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // else: allow default navigation for external/internal pages
        });
    });
}

// Scroll animations
function initScrollAnimations() {
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

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .card-3d, .service-item, .portfolio-item, .info-item');
    
    animatedElements.forEach((el, index) => {
        // Add different animation classes based on position
        if (index % 3 === 0) {
            el.classList.add('fade-in');
        } else if (index % 3 === 1) {
            el.classList.add('slide-left');
        } else {
            el.classList.add('slide-right');
        }
        
        observer.observe(el);
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    let ticking = false;

    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }

        // Floating shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = scrollTop * speed;
            const rotation = scrollTop * 0.05;
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Create mailto link for real email sending
            const subject = 'Contact Form Submission from ' + name;
            const body = 'Name: ' + name + '\\nEmail: ' + email + '\\n\\nMessage:\\n' + message;
            const mailtoLink = 'mailto:career@corelleaf.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            
            // Open email client
            window.location.href = mailtoLink;
            
            showNotification('Opening email client...', 'success');
            contactForm.reset();
            
            // Add 3D animation to submit button
            const submitBtn = contactForm.querySelector('.btn-primary');
            if (submitBtn) {
                submitBtn.style.transform = 'perspective(500px) rotateX(10deg) scale(0.95)';
                setTimeout(() => {
                    submitBtn.style.transform = 'perspective(500px) rotateX(10deg) scale(1)';
                }, 200);
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Loading animation
function initLoadingAnimation() {
    // Create loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                if (document.body.contains(loading)) {
                    document.body.removeChild(loading);
                }
            }, 500);
        }, 1000);
    });
}

// Enhanced 3D effects
function init3DEffects() {
    // Mouse tracking for 3D tilt effects
    const tiltElements = document.querySelectorAll('.card-3d, .service-item, .portfolio-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Interactive cube rotation
    const cube = document.querySelector('.cube');
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let rotationX = 0;
    let rotationY = 0;

    if (cube) {
        cube.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            cube.style.animationPlayState = 'paused';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            cube.style.animationPlayState = 'running';
        });
    }

    // Morphing button effects
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.borderRadius = '20px';
            button.style.transform = 'perspective(500px) rotateX(10deg) translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.borderRadius = '50px';
            button.style.transform = 'perspective(500px) rotateX(10deg) translateY(0) scale(1)';
        });
    });
}

// Custom cursor effects
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #ffd700, #ff6b6b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(cursorFollower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .card-3d, .service-item, .portfolio-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = '#ffd700';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
}

// Particle system for enhanced visual effects
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particle system on hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    createParticleSystem();
}

// Load projects from API
async function loadProjects() {
    try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        const portfolioGrid = document.getElementById('portfolio-grid');
        portfolioGrid.innerHTML = ''; // Clear existing content

        projects.forEach(project => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="portfolio-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                    <div class="portfolio-description">
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btn btn-primary btn-3d">View Project</a>
                    </div>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });

    } catch (error) {
        console.error('Could not load projects:', error);
        const portfolioGrid = document.getElementById('portfolio-grid');
        portfolioGrid.innerHTML = '<p class="error-message">Could not load projects. Please try again later.</p>';
    }
}

// Load vacancies from API
async function loadVacancies() {
    try {
        const response = await fetch('/vacancies.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vacancies = await response.json();
        const positionsGrid = document.getElementById('positions-grid');
        positionsGrid.innerHTML = ''; // Clear existing content

        vacancies.forEach(vacancy => {
            const positionCard = document.createElement('div');
            positionCard.className = 'position-card';
            positionCard.innerHTML = `
                <div class="position-header">
                    <h3>${vacancy.title}</h3>
                    <div class="position-meta">
                        <span class="position-type">Full-time</span>
                        <span class="position-location">${vacancy.location}</span>
                    </div>
                </div>
                <div class="position-content">
                    <p class="position-summary">${vacancy.description}</p>
                    <div class="position-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            ${vacancy.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="btn btn-primary apply-btn" data-position="${vacancy.title}">Apply Now</button>
                </div>
            `;
            positionsGrid.appendChild(positionCard);
        });

        // Re-initialize modal for new buttons
        initializeModal();

    } catch (error) {
        console.error('Could not load vacancies:', error);
        const positionsGrid = document.getElementById('positions-grid');
        positionsGrid.innerHTML = '<p class="error-message">Could not load job openings. Please try again later.</p>';
    }
}

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
    if(closeButton) {
        closeButton.addEventListener('click', function() {
            closeModal();
        });
    }

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
        if(modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            const form = document.getElementById('applicationForm');
            if(form) {
                form.reset();
            }
            
            // Remove any success/error messages
            const existingMessages = form.querySelectorAll('.success-message, .error-message');
            existingMessages.forEach(msg => msg.remove());
        }
    }
}
