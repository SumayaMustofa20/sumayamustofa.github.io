// Portfolio JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scrolling for anchor links
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

    // Add active class to current nav item based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Loading animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Add loading class to elements and observe them
    document.querySelectorAll('.overview-card, .project-card, .publication-card, .timeline-item, .experience-card').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);

            // For actual form submission, replace the setTimeout with:
            /*
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            }).catch(error => {
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            }).finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
        });
    }

    // Profile image fallback
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5Q0ExIi8+CjxwYXRoIGQ9Ik0yNSAxMjVDMjUgMTA1IDQ1IDkwIDc1IDkwUzEyNSAxMDUgMTI1IDEyNVYxNTBIMjVWMTI1WiIgZmlsbD0iIzlCOUNBMSIvPgo8L3N2Zz4K';
        });
    }

    // Typing animation for hero text (if needed)
    const heroTitle = document.querySelector('.profile-info h1');
    if (heroTitle && heroTitle.textContent === 'Your Name') {
        // Only run if placeholder text is still there
        typeWriter(heroTitle, 'Sumaya Mustofa', 100);
    }

    // Statistics counter animation
    animateCounters();

    // Add copy to clipboard functionality for email
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(email => {
        email.addEventListener('click', function(e) {
            e.preventDefault();
            const emailAddress = this.textContent || this.innerText;
            copyToClipboard(emailAddress);
            showMessage('Email address copied to clipboard!', 'success');
        });
    });

    // Initialize tooltips for social links
    initializeTooltips();
});

// Helper Functions

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup ${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        ${type === 'success' 
            ? 'background: linear-gradient(135deg, #10b981 0%, #059669 100%);' 
            : 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);'
        }
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#message-animations')) {
        const style = document.createElement('style');
        style.id = 'message-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .message-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageEl);

    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
        const suffix = counter.textContent.replace(/[0-9.]/g, '');
        
        if (isNaN(target)) return;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(counter, 0, target, 2000, suffix);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function animateValue(element, start, end, duration, suffix) {
    const startTimestamp = performance.now();
    
    function step(currentTimestamp) {
        const elapsed = currentTimestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        // Format number
        let displayValue = current.toFixed(end % 1 === 0 ? 0 : 2);
        if (end >= 10) {
            displayValue = Math.floor(current).toString();
        }
        
        element.textContent = displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end.toString() + suffix;
        }
    }
    
    requestAnimationFrame(step);
}

function initializeTooltips() {
    const socialLinks = document.querySelectorAll('.social-links a, .social-item');
    
    socialLinks.forEach(link => {
        const title = link.getAttribute('title') || link.querySelector('span')?.textContent;
        if (!title) return;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = title;
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            opacity: 0;
            pointer-events: none;
            transform: translateX(-50%) translateY(-100%);
            transition: all 0.2s ease;
            z-index: 1000;
            white-space: nowrap;
        `;
        
        // Add arrow
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: #1e293b;
        `;
        tooltip.appendChild(arrow);
        
        link.style.position = 'relative';
        link.appendChild(tooltip);
        
        // Show/hide tooltip
        link.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(calc(-100% - 10px))';
        });
        
        link.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        });
    });
}

// Publication filter functionality (if needed for research page)
function initializePublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter publications
            publications.forEach(pub => {
                if (filter === 'all' || pub.classList.contains(filter)) {
                    pub.style.display = 'block';
                    pub.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    pub.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality for publications/projects
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    const searchableItems = document.querySelectorAll('.publication-card, .project-card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        searchableItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function highlightSearchTerm(element, term) {
    if (!term) return;
    
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark>$1</mark>');
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
}

// Dark mode toggle (optional feature)
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    darkModeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Scroll to top button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePublicationFilters();
    initializeSearch();
    initializeDarkMode();
    initializeLazyLoading();
    initializeScrollToTop();
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations or effects can go here
}, 100));

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Could implement fallback image logic here
    }
});

// Analytics event tracking (optional)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track important interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .card-link, .pub-link, .project-link')) {
        const text = e.target.textContent.trim();
        trackEvent('User Interaction', 'Button Click', text);
    }
});

// Service Worker registration (for PWA functionality if desired)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}