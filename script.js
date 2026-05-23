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
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize smooth scrolling
    new SmoothScrolling();
    
    // Initialize interactive elements
    new InteractiveElements();
    
    // Initialize performance optimizer
    new PerformanceOptimizer();
    
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
