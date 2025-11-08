document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.getElementById('navigation-menu');
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const copyButtons = document.querySelectorAll('.copy-button');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    // 1. Theme Toggle Functionality
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // 2. Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('open');
            }
        });
    });

    // 3. Form Submission and Modal
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission success
            console.log('Form Submitted');
            contactForm.reset();
            
            // Show modal
            successModal.removeAttribute('hidden');
            successModal.focus(); // Focus for accessibility
            body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            successModal.setAttribute('hidden', true);
            body.style.overflow = '';
        });
    }

    // 4. Copy Link Functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-copy-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput) {
                targetInput.select();
                targetInput.setSelectionRange(0, 99999); // For mobile devices
                document.execCommand('copy');
                
                // Provide feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }
        });
    });

    // 5. Cookie Consent
    const cookieAccepted = localStorage.getItem('cookieConsent');
    if (!cookieAccepted) {
        cookieBanner.style.display = 'flex';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.style.display = 'none';
    });
});