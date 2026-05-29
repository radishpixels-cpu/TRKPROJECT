

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

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('rsvp-form');
    const message = document.getElementById('rsvp-message');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const guests = document.getElementById('guests').value;

        if (!name) {
            message.textContent = 'Masukkan nama.';
            message.style.color = 'red';
            return;
        }

        try {

             await fetch('https://script.google.com/macros/s/AKfycbxH-hIqobXNOOnFtH70LuyG2baH3oeSMn4qikZjW8lZlFnVeWTWyLc-75_QfxgtoWXI/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
            name: name,
            guests: guests
        })
    });

    message.textContent = 'RSVP berhasil dikirim!';
    message.style.color = 'green';
    form.reset();
        } catch (error) {

            console.error(error);

            message.textContent = 'Terjadi kesalahan.';
            message.style.color = 'red';
        }
    });
});
