// ===================================
// جيل كود - JavaScript الرئيسي
// أداء عالي وموقع عربي
// ===================================

(function() {
    'use strict';

    // ===================================
    // عناصر DOM
    // ===================================
    const html = document.documentElement;
    const body = document.body;
    const header = document.getElementById('header');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTopBtn = document.getElementById('scrollTop');
    const contactForm = document.getElementById('contactForm');

    // ===================================
    // قائمة التنقل (الجوال)
    // ===================================
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
    // معالجة نموذج الاتصال
    // ===================================
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // الحصول على زر الإرسال
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // إظهار حالة التحميل
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'جاري الإرسال...';
            
            try {
                // محاكاة إرسال النموذج (استبدل بمكالمة API الفعلية)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // رسالة النجاح
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
            } catch (error) {
                // رسالة الخطأ
                showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
            } finally {
                // إعادة تعيين الزر
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // ===================================
    // نظام الإشعارات
    // ===================================
    function showNotification(message, type = 'info') {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // إضافة الأنماط
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            left: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            backgroundColor: type === 'success' ? '#00d4ff' : '#ff1654',
            color: '#1a1f4d',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
            animation: 'slideInRTL 0.3s ease',
            maxWidth: '400px'
        });
        
        // إضافة إلى الصفحة
        body.appendChild(notification);
        
        // الإزالة بعد 5 ثوانٍ
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

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
        // تسجيل مقاييس الأداء
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`وقت تحميل الصفحة: ${loadTime}ms`);
        }
        
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
        
        console.log('تم تحميل موقع جيل كود بنجاح! 🚀');
    });

    // ===================================
    // إضافة حركات الإشعارات إلى CSS
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRTL {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        
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

    // ===================================
    // تحميل الموارد الحرجة مسبقاً
    // ===================================
    function preloadResources() {
        // تحميل الخطوط مسبقاً
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap',
            'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap'
        ];
        
        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            document.head.appendChild(link);
        });
    }
    
    preloadResources();

})();
