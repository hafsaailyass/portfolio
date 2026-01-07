// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen
    setTimeout(() => {
        document.querySelector('.loading')?.classList.add('hidden');
    }, 1000);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkills = () => {
        skillItems.forEach(item => {
            const skillValue = item.getAttribute('data-skill');
            const progressBar = item.querySelector('.skill-progress');
            
            if (isElementInViewport(item)) {
                progressBar.style.width = `${skillValue}%`;
            }
        });
    };

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Initial animation
    animateSkills();
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkills);

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger-color)';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Add typing animation to multiple lines
    const typingLines = [
        'Software & Mobile Developer',
        'Business Central Consultant',
        'AL & ERP Specialist',
        'Flutter & Android Developer'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    const typingElement = document.querySelector('.typewriter h2');
    
    function typeWriter() {
        if (lineIndex < typingLines.length) {
            if (charIndex < typingLines[lineIndex].length) {
                typingElement.textContent += typingLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    typingElement.textContent = '';
                    charIndex = 0;
                    lineIndex = (lineIndex + 1) % typingLines.length;
                    setTimeout(typeWriter, 500);
                }, 2000);
            }
        }
    }
    
    // Start typing animation
    if (typingElement) {
        setTimeout(typeWriter, 1000);
    }

    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add current year to footer
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});

// Add loading screen HTML to index.html
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = '<div class="loader"></div>';
document.body.prepend(loadingScreen);
