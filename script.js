/**
 * SZERVER STÁTUSZ BEÁLLÍTÁSA
 * Értékek: 'ONLINE', 'DEV', 'OFFLINE'
 */
const SERVER_STATUS = 'DEV'; 
const DISCORD_LINK = 'https://discord.com/invite/Y98A4SVSP4';

document.addEventListener('DOMContentLoaded', () => {
    updateStatus(SERVER_STATUS);
    initNavbar();
    initYear();
    initFAQ();
    initCounters();
});

function handleConnect() {
    if (SERVER_STATUS === 'ONLINE') {
        const ip = "play.thegorcsok.hu";
        navigator.clipboard.writeText(ip).then(() => {
            alert("Szerver IP másolva: " + ip);
        });
    } else {
        // Ha nincs online, Discordra visz
        window.open(DISCORD_LINK, '_blank');
    }
}

function updateStatus(status) {
    const text = document.getElementById('status-text');
    const dot = document.getElementById('status-dot');
    const ping = document.getElementById('status-ping');
    const container = document.getElementById('server-status-container');

    switch(status) {
        case 'ONLINE':
            text.innerText = "Szerver Státusz: Elérhető";
            dot.className = "relative inline-flex rounded-full h-3 w-3 bg-green-500";
            ping.className = "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75";
            break;
        case 'DEV':
            text.innerText = "Szerver Státusz: Fejlesztés alatt";
            dot.className = "relative inline-flex rounded-full h-3 w-3 bg-yellow-500";
            ping.className = "animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75";
            break;
        case 'OFFLINE':
            text.innerText = "Szerver Státusz: Offline";
            dot.className = "relative inline-flex rounded-full h-3 w-3 bg-red-500";
            ping.className = "absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20";
            break;
    }
}

function initNavbar() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}

function initYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
            document.querySelectorAll('.faq-question i').forEach(i => {
                i.classList.remove('rotate-45');
            });
            
            // Open current if it was closed
            if (!isOpen) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-45');
            }
        });
    });
}

function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
}