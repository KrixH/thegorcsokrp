// script.js

// Szerver IP másolása funkció
function copyIP() {
    const serverIP = "play.thegorcsok.hu"; // Cseréld ki a valós IP-re
    navigator.clipboard.writeText(serverIP).then(() => {
        alert("Szerver IP másolva: " + serverIP);
    }).catch(err => {
        console.error('Hiba a másoláskor: ', err);
    });
}

// Navigáció effekt görgetéskor
window.onscroll = function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('py-2');
        nav.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
    } else {
        nav.classList.remove('py-2');
        nav.style.backgroundColor = "rgba(15, 23, 42, 0.9)";
    }
};

// Automatikus évszám lekérő
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

// Üdvözlő üzenet a konzolban
console.log("TheGörcsök Website betöltve!");