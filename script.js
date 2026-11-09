const texts = [
    "Web Developer",
    "Programmer",
    "Tech Enthusiast",
    "Creative Thinker"
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== EFEK MENGETIK ===== */
const typing = document.getElementById("typing");
let index = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentText = texts[index];

    charIndex += deleting ? -1 : 1;
    typing.textContent = currentText.substring(0, charIndex);

    let speed = deleting ? 45 : 95;

    if (!deleting && charIndex === currentText.length) {
        deleting = true;
        speed = 1600;           // jeda setelah selesai mengetik
    } else if (deleting && charIndex === 0) {
        deleting = false;
        index = (index + 1) % texts.length;
        speed = 450;            // jeda sebelum kata berikutnya
    }

    setTimeout(typeEffect, speed);
}

if (reduceMotion) {
    typing.textContent = texts[0];
} else {
    typeEffect();
}

/* ===== ANIMASI MUNCUL SAAT SCROLL ===== */
// Anak dari .stagger muncul bergantian
document.querySelectorAll(".stagger").forEach(group => {
    [...group.children].forEach((child, i) => {
        child.classList.add("reveal");
        child.style.setProperty("--d", i * 80 + "ms");
    });
});

const items = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("show"));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    items.forEach(el => revealObserver.observe(el));
}

/* ===== MENU AKTIF SESUAI POSISI SCROLL ===== */
const navLinks = [...document.querySelectorAll(".nav ul a")];

if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.hash === "#" + entry.target.id);
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    navLinks.forEach(link => {
        const target = document.querySelector(link.hash);
        if (target) spy.observe(target);
    });
}

