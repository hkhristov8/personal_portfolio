// Particle Animation System
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.time = 0;
        this.numParticles = 1500; // Optimized for performance
        this.colors = ['#00FFFF', '#FF00FF', '#FFFF00'];
        
        this.init();
    }

    init() {
        const container = document.getElementById('anonymous');
        container.appendChild(this.canvas);
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += 0.002;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Apply wave effect
            p.y += Math.sin(this.time + p.x / 8000) * 1.5;
            
            // Bounce off edges
            if (p.x > this.canvas.width || p.x < 0) p.speedX *= -1;
            if (p.y > this.canvas.height || p.y < 0) p.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animation System
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);
        
        this.observeElements();
    }

    observeElements() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('fade-in');
            this.observer.observe(section);
        });
    }
}

// Smooth Scrolling Navigation
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addClickEffects();
        this.addTypingEffect();
        // Removed parallax effect to fix header movement
    }

    addHoverEffects() {
        // Add hover effects to technology logos
        const logos = document.querySelectorAll('.header-logo');
        logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.3) rotate(10deg)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    addClickEffects() {
        // Add click effects to certificates
        const certificates = document.querySelectorAll('.certificate');
        certificates.forEach(cert => {
            cert.addEventListener('click', () => {
                cert.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    cert.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Add click effects to experience items
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    addTypingEffect() {
        // Add typing effect to the main title
        const title = document.querySelector('.profile-text h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.debounceResize();
        this.lazyLoadImages();
        this.optimizeAnimations();
    }

    debounceResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Handle resize events efficiently
                if (window.particleSystem) {
                    window.particleSystem.resizeCanvas();
                }
            }, 250);
        });
    }

    lazyLoadImages() {
        // Simple lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
    
    optimizeAnimations() {
        // Reduce animation complexity on mobile devices
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-optimized');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('paused');
            } else {
                document.body.classList.remove('paused');
            }
        });
    }
}

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.loadTheme();
        this.applyTheme();
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.setAttribute('title', 'Switch between light and dark themes');
        
        toggle.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(toggle);
    }

    toggleTheme() {
        // Fixed the theme toggle logic
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        this.saveTheme();
        this.updateToggleIcon();
    }

    applyTheme() {
        const root = document.documentElement;
        const body = document.body;
        
        if (this.currentTheme === 'light') {
            root.style.setProperty('--bg-primary', 'rgba(255, 255, 255, 0.95)');
            root.style.setProperty('--bg-secondary', 'rgba(240, 240, 240, 0.8)');
            root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--text-primary', '#000000');
            root.style.setProperty('--text-secondary', '#333333');
            body.setAttribute('data-theme', 'light');
        } else {
            root.style.setProperty('--bg-primary', 'rgba(0, 0, 0, 0.95)');
            root.style.setProperty('--bg-secondary', 'rgba(0, 0, 0, 0.8)');
            root.style.setProperty('--bg-card', 'rgba(27, 27, 27, 0.95)');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#cccccc');
            body.setAttribute('data-theme', 'dark');
        }
    }
    
    updateToggleIcon() {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.innerHTML = this.currentTheme === 'dark' ? '🌙' : '☀️';
        }
    }

    saveTheme() {
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
    }
}

// Loading Manager
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        this.hideLoadingOverlay();
    }

    hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading');
        if (loadingOverlay) {
            // Hide loading overlay after a short delay
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }
}

// Header Scroll Management
class HeaderScrollManager {
    constructor() {
        this.header = document.querySelector('header');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100; // Minimum scroll before hiding
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show header when at the top
        if (currentScrollTop <= this.scrollThreshold) {
            this.showHeader();
            return;
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollTop > this.lastScrollTop) {
            // Scrolling down
            this.hideHeader();
        } else {
            // Scrolling up
            this.showHeader();
        }
        
        this.lastScrollTop = currentScrollTop;
    }

    hideHeader() {
        if (this.header && !this.header.classList.contains('header-hidden')) {
            this.header.classList.add('header-hidden');
        }
    }

    showHeader() {
        if (this.header && this.header.classList.contains('header-hidden')) {
            this.header.classList.remove('header-hidden');
        }
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading manager first
    new LoadingManager();
    
    // Initialize particle system
    window.particleSystem = new ParticleSystem();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize smooth scrolling
    new SmoothScrolling();
    
    // Initialize interactive elements
    new InteractiveElements();
    
    // Initialize performance optimizer
    new PerformanceOptimizer();
    
    // Initialize theme manager
    new ThemeManager();
    
    // Initialize header scroll manager
    new HeaderScrollManager();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Add some random animations to make the site feel more alive
    startRandomAnimations();
});

// Random animations for visual appeal
function startRandomAnimations() {
    setInterval(() => {
        const randomLogo = document.querySelectorAll('.header-logo')[Math.floor(Math.random() * document.querySelectorAll('.header-logo').length)];
        if (randomLogo) {
            randomLogo.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                randomLogo.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }
    }, 3000);
    
    // Add subtle floating animation to certificates
    const certificates = document.querySelectorAll('.certificate');
    certificates.forEach((cert, index) => {
        cert.style.animationDelay = `${index * 0.2}s`;
        cert.classList.add('floating');
    });
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: floating 6s ease-in-out infinite;
    }
    
    .mobile-optimized .floating {
        animation: none;
    }
    
    .paused * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(style);

// Add some utility functions
window.portfolioUtils = {
    // Smooth scroll to element
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    // Toggle section visibility
    toggleSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show success message
            const notification = document.createElement('div');
            notification.textContent = 'Copied to clipboard!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--primary-color);
                color: var(--bg-primary);
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                animation: slideDown 0.3s ease;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    }
};

// Add slideDown animation
const slideDownStyle = document.createElement('style');
slideDownStyle.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(slideDownStyle);
