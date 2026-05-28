const sections = Array.from(document.querySelectorAll('section'));
let currentSection = 0;
let isAnimating = false;
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    || navigator.maxTouchPoints > 0
    || 'ontouchstart' in window;

function goToSection(index) {
    if (index < 0 || index >= sections.length || isAnimating) return;
    currentSection = index;
    isAnimating = true;
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { isAnimating = false; }, 700);
}

if (!isTouchDevice) {
    window.addEventListener('wheel', function (event) {
        const direction = Math.sign(event.deltaY || event.wheelDelta);
        if (direction === 0) return;

        event.preventDefault();
        if (direction > 0) {
            goToSection(Math.min(currentSection + 1, sections.length - 1));
        } else {
            goToSection(Math.max(currentSection - 1, 0));
        }
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
            event.preventDefault();
            goToSection(Math.min(currentSection + 1, sections.length - 1));
        }
        if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            goToSection(Math.max(currentSection - 1, 0));
        }
    });
}

// Set tanggal pernikahan di sini (Tahun, Bulan (0-11), Tanggal, Jam, Menit, Detik)
const weddingDate = new Date(2067, 6, 7, 0, 0, 0).getTime();

const fadeElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    fadeElements.forEach(element => observer.observe(element));
} else {
    fadeElements.forEach(element => element.classList.add('is-visible'));
}

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
}, 1000);
