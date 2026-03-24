document.addEventListener('DOMContentLoaded', () => {

    // ===== MOBILE MENU =====
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ===== NICHE SLIDERS (auto-sliding) =====
    function initAutoSlider(sliderId, interval) {
        const sliderEl = document.getElementById(sliderId);
        if (!sliderEl) return;
        const track = sliderEl.querySelector('.slider__track');
        const slides = track.querySelectorAll('.slider__slide');
        const total = slides.length;
        let current = 0;
        let timer = null;

        function goTo(idx) {
            current = idx;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
        }

        function next() {
            goTo((current + 1) % total);
        }

        function start() {
            timer = setInterval(next, interval);
        }

        function stop() {
            clearInterval(timer);
        }

        start();

        const card = sliderEl.closest('.stats__card--slider');
        if (card) {
            card.addEventListener('mouseenter', stop);
            card.addEventListener('mouseleave', start);
        }

        // Touch support
        let touchStartX = 0;
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo((current + 1) % total);
                else goTo((current - 1 + total) % total);
                stop();
                start();
            }
        }, { passive: true });
    }

    initAutoSlider('slider1', 3000);
    initAutoSlider('slider2', 3500);

    // ===== REVIEWS CAROUSEL (touch swipe) =====
    const carousel = document.getElementById('reviewsCarousel');
    if (carousel) {
        let touchStartX = 0;
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carousel.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                carousel.scrollBy({ left: diff > 0 ? 300 : -300, behavior: 'smooth' });
            }
        }, { passive: true });
    }

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-item__q');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(function(other) { other.classList.remove('active'); });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerH = document.querySelector('.header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ===== HEADER SHADOW ON SCROLL =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 10) {
            header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    }, { passive: true });

});
