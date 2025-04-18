// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Handle splash screen
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hide splash screen after content is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Enable scrolling on body after splash screen is hidden
            document.body.style.overflow = 'auto';
        }, 2000); // Hide after 2 seconds
    });
    
    // Disable scrolling on body while splash screen is visible
    document.body.style.overflow = 'hidden';
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });
    
    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Social Links Button functionality
    const socialLinksButton = document.querySelector('.social-links-button');
    const socialLinksModal = document.querySelector('.social-links-modal');
    const socialModalClose = document.querySelector('.social-modal-close');
    
    if (socialLinksButton) {
        // Add staggered animation CSS if it doesn't exist
        if (!document.querySelector('#social-animation-style')) {
            const style = document.createElement('style');
            style.id = 'social-animation-style';
            style.textContent = `
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .social-links-modal .social-modal-header,
                .social-links-modal .social-modal-body a,
                .social-links-modal .social-modal-close {
                    opacity: 0;
                }
                
                .social-links-modal.active .social-modal-header,
                .social-links-modal.active .social-modal-body a,
                .social-links-modal.active .social-modal-close {
                    animation: fadeSlideIn 0.4s forwards;
                }
            `;
            document.head.appendChild(style);
        }
        
        socialLinksButton.addEventListener('click', function() {
            socialLinksModal.classList.toggle('active');
            
            // Add button active state
            this.classList.toggle('active');
            
            // Apply staggered animation delays if modal is active
            if (socialLinksModal.classList.contains('active')) {
                const header = socialLinksModal.querySelector('.social-modal-header');
                const links = socialLinksModal.querySelectorAll('.social-modal-body a');
                const closeBtn = socialLinksModal.querySelector('.social-modal-close');
                
                // Set delay for header animation
                if (header) header.style.animationDelay = '0.1s';
                
                // Set staggered delays for each link
                links.forEach((link, index) => {
                    link.style.animationDelay = `${0.2 + (index * 0.05)}s`;
                });
                
                // Set delay for close button
                if (closeBtn) closeBtn.style.animationDelay = `${0.2 + (links.length * 0.05)}s`;
            }
            
            // Create a ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Get position for ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            // Set position and animation for ripple
            ripple.style.width = ripple.style.height = `${size * 2}px`;
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Close modal when clicking the close button
        if (socialModalClose) {
            socialModalClose.addEventListener('click', function(e) {
                e.stopPropagation();
                socialLinksModal.classList.remove('active');
                socialLinksButton.classList.remove('active');
            });
        }
        
        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialLinksButton.contains(e.target) && !socialLinksModal.contains(e.target)) {
                socialLinksModal.classList.remove('active');
                socialLinksButton.classList.remove('active');
            }
        });
        
        // Close modal when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialLinksModal.classList.contains('active')) {
                socialLinksModal.classList.remove('active');
                socialLinksButton.classList.remove('active');
            }
        });
        
        // Enhance modal styling with JavaScript
        if (socialLinksModal) {
            // Update modal styling for better positioning and appearance
            socialLinksModal.style.background = 'rgba(20, 20, 25, 0.95)';
            socialLinksModal.style.backdropFilter = 'blur(10px)';
            socialLinksModal.style.webkitBackdropFilter = 'blur(10px)';
            socialLinksModal.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
            socialLinksModal.style.border = '1px solid rgba(174, 70, 255, 0.3)';
            socialLinksModal.style.bottom = '95px';
            
            // Create indicator arrow 
            const arrow = document.createElement('div');
            arrow.style.position = 'absolute';
            arrow.style.bottom = '-10px';
            arrow.style.right = '20px';
            arrow.style.width = '20px';
            arrow.style.height = '20px';
            arrow.style.background = 'rgba(20, 20, 25, 0.95)';
            arrow.style.transform = 'rotate(45deg)';
            arrow.style.borderRight = '1px solid rgba(174, 70, 255, 0.3)';
            arrow.style.borderBottom = '1px solid rgba(174, 70, 255, 0.3)';
            arrow.style.zIndex = '-1';
            
            // Add arrow to modal
            socialLinksModal.appendChild(arrow);
            
            // Update responsive positioning
            const updateModalPosition = () => {
                if (window.innerWidth <= 768) {
                    socialLinksModal.style.width = '85%';
                    socialLinksModal.style.maxWidth = '280px';
                    socialLinksModal.style.bottom = '80px';
                    arrow.style.right = '25px';
                } else {
                    socialLinksModal.style.width = '300px';
                    socialLinksModal.style.bottom = '95px';
                    arrow.style.right = '20px';
                }
            };
            
            // Initial call and add resize listener
            updateModalPosition();
            window.addEventListener('resize', updateModalPosition);
            
            // Enhance social links in the modal
            const socialLinks = socialLinksModal.querySelectorAll('.social-modal-body a');
            socialLinks.forEach((link, index) => {
                // Add a slight delay to each link for a staggered animation effect
                link.style.transitionDelay = `${index * 0.05}s`;
                
                // Add hover and active state enhancements
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.backgroundColor = 'rgba(174, 70, 255, 0.1)';
                    this.style.borderLeft = '3px solid var(--neon-purple)';
                    
                    // Make icon more prominent
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.color = 'var(--neon-blue)';
                    }
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    this.style.borderLeft = '';
                    
                    // Reset icon
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transform = '';
                        icon.style.color = 'var(--neon-purple)';
                    }
                });
                
                // Add press effect
                link.addEventListener('mousedown', function() {
                    this.style.transform = 'translateX(3px) scale(0.98)';
                });
                
                link.addEventListener('mouseup', function() {
                    this.style.transform = 'translateX(5px) scale(1)';
                });
            });
        }
    }
    
    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        'Tech Enthusiast ',
        'Software Alchemist',
        'AI & Web Developer',
        'Future Forward Developer',
        'Digital Pioneer',
        'Innovator'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter effect
    typeWriter();
    
    // Create matrix rain effect in the background
    const canvas = document.createElement('canvas');
    const backgroundAnimation = document.querySelector('.background-animation');
    backgroundAnimation.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters for the matrix rain
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = characters.split('');
    
    // Number of columns depends on the canvas width
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the Y position of each raindrop
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Drawing the matrix rain
    function drawMatrixRain() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Green text
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;
        
        // Loop over each drop
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Calculate x position
            const x = i * fontSize;
            
            // Calculate y position
            const y = drops[i] * fontSize;
            
            // Draw the character
            ctx.fillText(text, x, y);
            
            // Reset drop position if it's reached the bottom or randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Start the animation
    const matrixRainInterval = setInterval(drawMatrixRain, 50);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns and drops
        const newColumns = Math.floor(canvas.width / fontSize);
        
        // Adjust drops array
        if (newColumns > drops.length) {
            // Add more drops
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * canvas.height);
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize EmailJS
    (function() {
        // Initialize EmailJS with the user ID from config
        emailjs.init(window.appConfig?.emailjs?.PUBLIC_KEY);
    })();
    
    // Handle the contact form submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state on the button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get values from the form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email,
                message: message
            };
            
            // Get EmailJS service and template IDs from config
            const serviceId = window.appConfig?.emailjs?.SERVICE_ID ;
            const templateId = window.appConfig?.emailjs?.TEMPLATE_ID ;
            
            // Send the form using EmailJS
            emailjs.send(serviceId, templateId, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    
                    // Reset form and show success message
                    contactForm.reset();
                    formSuccess.classList.add('show');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove('show');
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    
                    // Show error message
                    formError.classList.add('show');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        formError.classList.remove('show');
                    }, 5000);
                });
        });
    }
    
    // Create custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor effects on clickable elements
    const clickableElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-active');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-active');
        });
    });
    
    // Add CSS for the custom cursor to the DOM
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--neon-purple);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            z-index: 9999;
        }
        
        .cursor-active {
            width: 40px;
            height: 40px;
            border-color: var(--neon-blue);
            backdrop-filter: invert(100%);
            mix-blend-mode: difference;
        }
        
        body {
            cursor: none;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
            
            body {
                cursor: auto;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add animated particles in the background
    createParticles();
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        backgroundAnimation.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random color
            const colors = ['var(--neon-purple)', 'var(--neon-blue)', 'var(--neon-green)'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for particles
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                animation: float 20s linear infinite;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-100px) translateX(50px);
                }
                50% {
                    transform: translateY(-50px) translateX(100px);
                }
                75% {
                    transform: translateY(50px) translateX(50px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        
        document.head.appendChild(particleStyle);
    }
    
    // Create hero particles
    createHeroParticles();
    
    function createHeroParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        
        // Create particles
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            // Random color
            const colors = ['var(--neon-purple)', 'var(--neon-blue)', 'var(--neon-green)'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            heroParticles.appendChild(particle);
        }
        
        // Add CSS for hero particles
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .hero-particle {
                position: absolute;
                border-radius: 50%;
                animation: floatHero 15s ease-in-out infinite;
                box-shadow: 0 0 10px 2px currentColor;
            }
            
            @keyframes floatHero {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(50px, 25px);
                }
                50% {
                    transform: translate(0, 50px);
                }
                75% {
                    transform: translate(-50px, 25px);
                }
            }
        `;
        
        document.head.appendChild(particleStyle);
    }
    
    // Initialize the circular progress indicators
    initCircularProgress();
    
    function initCircularProgress() {
        const progressElements = document.querySelectorAll('.circular-progress-circle');
        
        progressElements.forEach(element => {
            const percentage = element.getAttribute('data-percentage');
            const percentageText = element.querySelector('.circular-progress-text');
            
            // Start the counter animation
            let counter = 0;
            const interval = setInterval(() => {
                if (counter >= percentage) {
                    clearInterval(interval);
                } else {
                    counter++;
                    percentageText.textContent = counter + '%';
                }
            }, 15);
        });
    }
    
    // Project overlay click
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectOverlay = card.querySelector('.project-overlay');
        if (projectOverlay) {
            projectOverlay.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default behavior
                
                const projectTitle = card.querySelector('h3').textContent;
                const projectInfo = card.querySelector('.project-info');
                const liveLink = projectInfo.querySelector('.project-links a:first-child');
                
                // Instead of opening link, show modal with project details
                createProjectModal(card);
            });
        }
    });
    
    // Project links (GitHub, Live Demo) click prevention - stop them from opening in new page
    projectCards.forEach(card => {
        const projectLinks = card.querySelectorAll('.project-links a');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only prevent default and show modal if it's not disabled
                if (!link.classList.contains('disabled')) {
                    e.preventDefault();
                    // Get info from parent card
                    createProjectModal(card, link.href, link.textContent);
                }
            });
        });
    });
    
    // Create project modal
    function createProjectModal(projectCard, linkUrl, linkType) {
        // Extract project info
        const projectTitle = projectCard.querySelector('h3').textContent;
        const projectDesc = projectCard.querySelector('p').textContent;
        const projectImage = projectCard.querySelector('img').src;
        const projectTech = [];
        projectCard.querySelectorAll('.project-tech span').forEach(tech => {
            projectTech.push(tech.textContent);
        });
        
        // Get project links
        const liveLink = projectCard.querySelector('.project-links a:first-child').href;
        const gitHubLink = projectCard.querySelector('.project-links a:last-child').href;
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('project-modal');
        
        modal.innerHTML = `
            <div class="project-modal-content">
                <span class="project-modal-close">&times;</span>
                <div class="project-modal-header">
                    <h2>${projectTitle}</h2>
                </div>
                <div class="project-modal-body">
                    <div class="project-modal-image">
                        <img src="${projectImage}" alt="${projectTitle}">
                    </div>
                    <div class="project-modal-info">
                        <h3>Description</h3>
                        <p>${projectDesc}</p>
                        <h3>Technologies Used</h3>
                        <div class="project-modal-tech">
                            ${projectTech.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="project-modal-footer">
                    <a href="${liveLink}" target="_blank" class="btn btn-primary ${liveLink.includes('disabled') ? 'disabled' : ''}">Live Demo</a>
                    <a href="${gitHubLink}" target="_blank" class="btn btn-secondary ${gitHubLink.includes('disabled') ? 'disabled' : ''}">GitHub</a>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                overflow-y: auto;
                padding: 2rem;
            }
            
            .project-modal-content {
                background-color: rgba(15, 15, 15, 0.95);
                border-radius: 10px;
                max-width: 800px;
                width: 100%;
                position: relative;
                box-shadow: var(--shadow-neon);
                border: 1px solid rgba(174, 70, 255, 0.2);
                animation: modalEnter 0.5s ease forwards;
                overflow: hidden;
            }
            
            @keyframes modalEnter {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .project-modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 30px;
                color: var(--text-primary);
                cursor: pointer;
                transition: color 0.3s ease;
                z-index: 10;
            }
            
            .project-modal-close:hover {
                color: var(--neon-purple);
            }
            
            .project-modal-header {
                padding: 2rem;
                border-bottom: 1px solid rgba(174, 70, 255, 0.2);
            }
            
            .project-modal-header h2 {
                margin: 0;
                color: var(--neon-purple);
                font-size: 2.4rem;
            }
            
            .project-modal-body {
                padding: 2rem;
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
            }
            
            .project-modal-image {
                flex: 1;
                min-width: 300px;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .project-modal-image img {
                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 8px;
            }
            
            .project-modal-info {
                flex: 1;
                min-width: 300px;
            }
            
            .project-modal-info h3 {
                margin-top: 0;
                margin-bottom: 1rem;
                color: var(--text-primary);
                font-size: 1.8rem;
            }
            
            .project-modal-info p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .project-modal-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .project-modal-tech span {
                background-color: rgba(174, 70, 255, 0.1);
                color: var(--neon-purple);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 1.3rem;
                font-weight: 500;
            }
            
            .project-modal-footer {
                padding: 2rem;
                border-top: 1px solid rgba(174, 70, 255, 0.2);
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
            }
            
            @media (max-width: 768px) {
                .project-modal-body {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);
        
        // Add close event to the X button
        const closeBtn = modal.querySelector('.project-modal-close');
        closeBtn.addEventListener('click', function() {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Show modal with transition
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Close when pressing ESC key
        document.addEventListener('keydown', function escapeListener(e) {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    // Remove event listener after modal is closed
                    document.removeEventListener('keydown', escapeListener);
                }, 300);
            }
        });
        
        // If a specific link was clicked, highlight its information
        if (linkUrl && linkType) {
            // Could enhance the modal to highlight the relevant section
            const footer = modal.querySelector('.project-modal-footer');
            const links = footer.querySelectorAll('a');
            
            links.forEach(link => {
                if (link.textContent.trim() === linkType.trim()) {
                    link.classList.add('highlight');
                }
            });
        }
    }
    
    // Project category switching
    const projectCategoryBtns = document.querySelectorAll('.project-category-btn');
    const projectContainers = document.querySelectorAll('.project-category-container');
    
    projectCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            projectCategoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all project containers
            projectContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // Show the selected container
            const category = this.getAttribute('data-category');
            document.getElementById(`${category}-projects`).classList.add('active');
            
            // Reset view more button when switching categories
            if (viewMoreBtn) {
                viewMoreBtn.classList.remove('active');
                viewMoreBtn.querySelector('span').textContent = 'View More Projects';
                
                // Hide additional projects if they're visible
                const hiddenProjects = document.querySelector('.hidden-projects');
                if (hiddenProjects) {
                    hiddenProjects.classList.remove('show');
                }
            }
        });
    });
    
    // View More Projects functionality
    const viewMoreBtn = document.getElementById('view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const hiddenProjects = document.querySelector('.hidden-projects');
            
            if (hiddenProjects) {
                hiddenProjects.classList.toggle('show');
                
                if (hiddenProjects.classList.contains('show')) {
                    // Update button text and icon
                    this.classList.add('active');
                    this.querySelector('span').textContent = 'Hide';
                    
                    // Smooth scroll to the hidden projects section
                    hiddenProjects.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                } else {
                    // Reset button text and icon
                    this.classList.remove('active');
                    this.querySelector('span').textContent = 'Explore More';
                }
            }
        });
    }
    
    // Create and add the social links button
    const createSocialLinksButton = () => {
        // Create the button
        const socialButton = document.createElement('button');
        socialButton.classList.add('social-links-button');
        socialButton.setAttribute('aria-label', 'Open Social Links');
        socialButton.innerHTML = '<i class="fas fa-share-alt"></i>';
        
        // Create the modal
        const socialModal = document.createElement('div');
        socialModal.classList.add('social-links-modal');
        
        // Add modal content
        socialModal.innerHTML = `
            <div class="social-modal-header">
                <h3>Link Up</h3>
            </div>
            <div class="social-modal-body">
                <a href="https://linkedin.com/in/binayakbartaula" target="_blank" rel="noopener" aria-label="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="https://github.com/binayakbartaula11" target="_blank" rel="noopener" aria-label="GitHub">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="https://twitter.com/bartaulabinayak" target="_blank" rel="noopener" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                    <span>Twitter</span>
                </a>
            </div>
            <button class="social-modal-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add button and modal to the body
        document.body.appendChild(socialButton);
        document.body.appendChild(socialModal);
        
        // Add button click functionality
        socialButton.addEventListener('click', function(e) {
            e.stopPropagation();
            socialModal.classList.toggle('active');
            this.classList.toggle('active');
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position and size the ripple
            const size = Math.max(this.offsetWidth, this.offsetHeight);
            ripple.style.width = ripple.style.height = `${size * 2}px`;
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add close button functionality
        const closeButton = socialModal.querySelector('.social-modal-close');
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            socialModal.classList.remove('active');
            socialButton.classList.remove('active');
        });
        
        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialButton.contains(e.target) && !socialModal.contains(e.target)) {
                socialModal.classList.remove('active');
                socialButton.classList.remove('active');
            }
        });
        
        // Add CSS for the social button and modal
        const style = document.createElement('style');
        style.textContent = `
            .social-links-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--neon-purple);
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 99;
                box-shadow: 0 4px 15px rgba(174, 70, 255, 0.3);
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .social-links-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(174, 70, 255, 0.4);
            }
            
            .social-links-button:active {
                transform: translateY(0);
                box-shadow: 0 3px 10px rgba(174, 70, 255, 0.3);
            }
            
            .social-links-button.active {
                background: var(--neon-blue);
            }
            
            .social-links-button i {
                font-size: 20px;
            }
            
            .social-links-modal {
                position: fixed;
                bottom: 85px;
                right: 20px;
                width: 250px;
                background: rgba(20, 20, 25, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(174, 70, 255, 0.3);
                overflow: hidden;
                z-index: 100;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }
            
            .social-links-modal.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .social-modal-header {
                padding: 15px;
                border-bottom: 1px solid rgba(174, 70, 255, 0.2);
                text-align: center;
            }
            
            .social-modal-header h3 {
                margin: 0;
                color: var(--neon-purple);
                font-size: 1.6rem;
            }
            
            .social-modal-body {
                padding: 15px;
            }
            
            .social-modal-body a {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                color: var(--text-primary);
                text-decoration: none;
                margin-bottom: 5px;
                border-radius: 5px;
                transition: all 0.2s ease;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .social-modal-body a i {
                margin-right: 15px;
                font-size: 18px;
                width: 20px;
                text-align: center;
                color: var(--neon-purple);
                transition: all 0.2s ease;
            }
            
            .social-modal-body a:hover {
                background: rgba(174, 70, 255, 0.1);
                transform: translateX(5px);
            }
            
            .social-modal-body a:hover i {
                color: var(--neon-blue);
                transform: scale(1.2);
            }
            
            .social-modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 16px;
                cursor: pointer;
                transition: color 0.2s ease;
                padding: 5px;
            }
            
            .social-modal-close:hover {
                color: var(--neon-purple);
            }
            
            .ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                transform: translate(-50%, -50%) scale(0);
                border-radius: 50%;
                animation: ripple 0.6s linear forwards;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .social-links-button {
                    width: 45px;
                    height: 45px;
                    bottom: 15px;
                    right: 15px;
                }
                
                .social-links-modal {
                    width: 85%;
                    max-width: 280px;
                    bottom: 75px;
                    right: 15px;
                }
            }
        `;
        
        document.head.appendChild(style);
    };
    
    // Initialize social links button
    createSocialLinksButton();
    
    // Social menu toggle
    const socialHamburger = document.querySelector('.social-hamburger');
    const socialMenu = document.querySelector('.social-menu');
    
    if (socialHamburger) {
        // Create backdrop for social menu
        const backdrop = document.createElement('div');
        backdrop.classList.add('social-menu-backdrop');
        document.body.appendChild(backdrop);
        
        // Add ripple effect function with improved animation
        function createRipple(event) {
            const button = event.currentTarget;
            
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                if (circle) {
                    circle.remove();
                }
            }, 600);
        }
        
        socialHamburger.addEventListener('click', function(e) {
            // Create ripple effect
            createRipple(e);
            
            // Toggle active class
            this.classList.toggle('active');
            socialMenu.classList.toggle('active');
            backdrop.classList.toggle('active');
            
            // Toggle body scroll
            document.body.classList.toggle('social-menu-open');
            
            // Toggle body scroll
            document.body.classList.toggle('social-menu-open');
            
            // Add staggered animation to menu links
            if (socialMenu.classList.contains('active')) {
                const links = socialMenu.querySelectorAll('.social-menu-links a');
                links.forEach((link, index) => {
                    link.style.animationDelay = `${0.1 + (index * 0.05)}s`;
                    link.style.animation = 'slideInRight 0.4s forwards';
                });
                
                // Add animation styles if they don't exist
                if (!document.querySelector('#social-menu-animations')) {
                    const style = document.createElement('style');
                    style.id = 'social-menu-animations';
                    style.textContent = `
                        @keyframes slideInRight {
                            from {
                                opacity: 0;
                                transform: translateX(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        
                        .social-menu-links a {
                            opacity: 0;
                        }
                        
                        .social-menu-header h3 {
                            animation: fadeIn 0.5s 0.2s forwards;
                            opacity: 0;
                        }
                        
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            } else {
                // Reset animations when closing
                const links = socialMenu.querySelectorAll('.social-menu-links a');
                links.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            // Add ripple CSS if it doesn't exist
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    .ripple {
                        position: absolute;
                        background: rgba(255, 255, 255, 0.7);
                        transform: scale(0);
                        border-radius: 50%;
                        pointer-events: none;
                        animation: ripple-animation 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                        z-index: 10;
                    }
                    
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        });
        
        // Close menu when clicking the backdrop
        backdrop.addEventListener('click', function() {
            socialMenu.classList.remove('active');
            socialHamburger.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('social-menu-open');
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialMenu.classList.contains('active')) {
                socialMenu.classList.remove('active');
                socialHamburger.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.classList.remove('social-menu-open');
            }
        });
        
        // Add effect to close button
        const closeBtn = socialMenu.querySelector('.social-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                socialMenu.classList.remove('active');
                socialHamburger.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.classList.remove('social-menu-open');
            });
        }
        
        // Add hovering effects to social links
        const socialLinks = socialMenu.querySelectorAll('.social-menu-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = 'var(--neon-blue)';
            });
            
            link.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                icon.style.transform = '';
                icon.style.color = 'var(--neon-purple)';
            });
        });
    }
      
    // SEO Performance Optimizations
    // Defer non-critical operations
    setTimeout(() => {
        // Add meta description based on visible content
        const updateMetaDescription = () => {
            const visibleSection = document.querySelector('.section:target') || document.querySelector('#home');
            const sectionTitle = visibleSection.querySelector('.section-title')?.textContent || '';
            const sectionContent = visibleSection.textContent.trim().substring(0, 150);
            
            // Update meta description dynamically based on visible content
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', `${sectionTitle} - ${sectionContent}...`);
            }
        };

        // Lazy load images that are off-screen
        const lazyLoadImages = () => {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        };

        // Apply canonical URL updates based on active section
        const updateCanonicalURL = () => {
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical && window.location.hash) {
                canonical.href = canonical.href.split('#')[0] + window.location.hash;
            }
        };

        // Add structured breadcrumbs for SEO
        const addStructuredBreadcrumbs = () => {
            // Get current section
            const currentSection = window.location.hash.substring(1) || 'home';
            const sectionTitle = document.querySelector(`#${currentSection} .section-title`)?.textContent || 
                                 document.title.split('|')[0].trim();
            
            // Create breadcrumb structured data
            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": window.location.origin
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": sectionTitle,
                        "item": window.location.href
                    }
                ]
            };
            
            // Add or update the structured data script
            let breadcrumbScript = document.querySelector('#breadcrumb-schema');
            if (!breadcrumbScript) {
                breadcrumbScript = document.createElement('script');
                breadcrumbScript.id = 'breadcrumb-schema';
                breadcrumbScript.type = 'application/ld+json';
                document.head.appendChild(breadcrumbScript);
            }
            breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
        };
        
        // Add event listeners for section changes
        window.addEventListener('hashchange', () => {
            updateMetaDescription();
            updateCanonicalURL();
            addStructuredBreadcrumbs();
        });
        
        // Initialize optimizations
        lazyLoadImages();
        updateMetaDescription();
        updateCanonicalURL();
        addStructuredBreadcrumbs();
        
        // Add SEO-friendly alt text to any images missing them
        document.querySelectorAll('img:not([alt])').forEach(img => {
            const parent = img.closest('div');
            const heading = parent?.querySelector('h2, h3, h4')?.textContent;
            if (heading) {
                img.alt = heading;
            } else {
                img.alt = "Portfolio visual element";
            }
        });
    }, 1000); // Defer by 1 second after page load
    
    // Focus on making interactive elements more accessible
    const makeAccessible = () => {
        // Add keyboard navigation for interactive elements
        document.querySelectorAll('.project-card, .social-links-button, .btn, .hamburger').forEach(element => {
            if (!element.getAttribute('tabindex') && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
                element.setAttribute('tabindex', '0');
                element.setAttribute('role', 'button');
                
                // Add keyboard interaction
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            }
        });
    };
    
    makeAccessible();
}); 