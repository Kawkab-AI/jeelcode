// ===================================
// JeelCode - Main JavaScript
// 
// Main JavaScript file for the website
// Contains all interactions and animations
// Optimized for high performance
// ===================================

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // 
    // Cache all DOM elements used in the site
    // for better performance instead of repeated queries
    // ===================================
    const html = document.documentElement;
    const body = document.body;
    const header = document.getElementById('header');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTopBtn = document.getElementById('scrollTop');

    // ===================================
    // Mobile Navigation Menu
    // 
    // Control opening and closing of menu on small screens
    // Prevents scrolling when menu is open
    // ===================================
    
    // Open menu
    function showMenu() {
        if (navMenu) {
            navMenu.classList.add('show');
            body.style.overflow = 'hidden';
        }
    }
    
    function hideMenu() {
        if (navMenu) {
            navMenu.classList.remove('show');
            body.style.overflow = '';
        }
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', showMenu);
    }
    
    if (navClose) {
        navClose.addEventListener('click', hideMenu);
    }
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hideMenu();
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('show')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                hideMenu();
            }
        }
    });

    // ===================================
    // التمرير السلس
    // ===================================
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // إضافة التمرير السلس لجميع روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // ===================================
    // تأثير التمرير على الترويسة
    // ===================================
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (!header) return;
        
        // إضافة ظل عند التمرير
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        // إخفاء/إظهار الترويسة عند التمرير (اختياري)
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
    
    // تقييد حدث التمرير للأداء
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });

    // ===================================
    // زر العودة للأعلى
    // ===================================
    function toggleScrollTopBtn() {
        if (!scrollTopBtn) return;
        
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            const start = window.pageYOffset;
            const duration = 1500; // 1.5 seconds
            let startTime = null;
            
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }
            
            function animateScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easing = easeInOutCubic(progress);
                
                window.scrollTo(0, start * (1 - easing));
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }
            
            requestAnimationFrame(animateScroll);
        });
    }

    // ===================================
    // رابط التنقل النشط
    // ===================================
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section[id]');
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 80;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);

    // ===================================
    // الحركة عند التمرير (AOS)
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة جميع العناصر مع سمة data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // تحميل الصور الكسول
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // مراقبة الأداء
    // ===================================
    window.addEventListener('load', () => {
        // إضافة فئة loaded إلى الصفحة
        body.classList.add('loaded');
    });

    // ===================================
    // التنقل بلوحة المفاتيح
    // ===================================
    document.addEventListener('keydown', (e) => {
        // مفتاح Escape يغلق قائمة الجوال
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            hideMenu();
        }
    });

    // ===================================
    // التهيئة عند التحميل
    // ===================================
    document.addEventListener('DOMContentLoaded', () => {
        // تهيئة الرابط النشط
        updateActiveLink();
        
        // تهيئة زر العودة للأعلى
        toggleScrollTopBtn();
        
        // إضافة حركة دخول للبطل
        const hero = document.querySelector('.hero');
        if (hero) {
            setTimeout(() => {
                hero.style.opacity = '1';
            }, 100);
        }
    });

    // ===================================
    // إضافة أنماط إضافية إلى CSS
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        .nav__link.active::after {
            width: 100%;
        }
        
        .hero {
            opacity: 0;
            transition: opacity 0.6s ease;
        }
        
        body.loaded .hero {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // تأثيرات التحويم على بطاقات المسارات
    // ===================================
    const trackCards = document.querySelectorAll('.track__card');
    trackCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===================================
    // حركة العداد للإحصائيات
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // تنسيق الأرقام بالفواصل
            const formatted = Math.floor(current).toLocaleString('ar-EG');
            element.textContent = formatted.includes('+') ? formatted : `+${formatted}`;
        }, 16);
    }
    
    // مراقبة قسم الإحصائيات
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat__number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent.replace(/[+,]/g, ''));
                        animateCounter(stat, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }

    // ===================================
    // إضافة تأثير Parallax للخلفية البطل
    // ===================================
    const heroCircles = document.querySelectorAll('.hero__bg .circle');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroCircles.forEach((circle, index) => {
            const speed = 0.1 + (index * 0.05);
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

})();
