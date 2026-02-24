/* =========================================
   GLOBAL SETTINGS
========================================= */

// Always start at top on refresh
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// Initialize Lucide icons
if (window.lucide) {
    lucide.createIcons();
}


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    pageFadeIn();
    navbarSwitch();
    mobileMenu();
    modalControl();
    typingEffect();
    projectSlider();
    scrollParallax();
    infiniteMarquee();
    setupForms();

});


/* =========================================
   UI EFFECTS
========================================= */

function pageFadeIn() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease-in";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
}

function navbarSwitch() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

function mobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const overlay = document.getElementById("mobile-overlay");

    if (!hamburger || !navLinks || !overlay) return;

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
}

function modalControl() {
    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");

    if (!modal || !openBtn || !closeBtn) return;

    const closeModal = () => modal.classList.remove("active");

    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

/* =========================================
   FORMS (Reusable)
========================================= */

function setupForms() {
    handleForm(
        "contactFormMain",
        "formStatus",
        "https://formspree.io/f/xjgejvbk"
    );

    handleForm(
        "internshipForm",
        "modalStatus",
        "https://formspree.io/f/mvzbdozl"
    );
}

function handleForm(formId, statusId, endpoint) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);

    if (!form || !status) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = new FormData(form);
        status.style.color = "white";
        status.textContent = "Sending...";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                status.style.color = "limegreen";
                status.textContent = "✅ Message sent successfully!";
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            status.style.color = "red";
            status.textContent = "❌ Something went wrong. Please try again.";
        }
    });
}

/* =========================================
   COPY EMAIL
========================================= */

function copyEmail() {
    const email = "m4canlas@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy email.");
    });
}


/* =========================================
   HERO EFFECTS
========================================= */

function scrollParallax() {
    const hero = document.querySelector("#home");
    if (!hero) return;

    window.addEventListener("scroll", () => {
        const progress = Math.min(1, window.scrollY / hero.offsetHeight);

        document.documentElement.style.setProperty(
            "--orange-strong",
            0.40 * (1 - progress)
        );

        document.documentElement.style.setProperty(
            "--orange-soft",
            0.30 * (1 - progress)
        );
    });
}

function typingEffect() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const words = [
        "Junior Frontend Developer",
        "UI/UX Designer",
        "Creative Web Designer",
        "Interface Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingElement.textContent = currentWord.slice(0, ++charIndex);
            if (charIndex === currentWord.length) {
                setTimeout(() => (isDeleting = true), 1500);
            }
        } else {
            typingElement.textContent = currentWord.slice(0, --charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(type, isDeleting ? 50 : 80);
    }

    type();
}


/* =========================================
   PROJECT SLIDER
========================================= */

function projectSlider() {
    const imageElement = document.getElementById("project-preview");
    const titleElement = document.getElementById("project-title");
    const linkElement = document.getElementById("project-link");

    if (!imageElement || !titleElement || !linkElement) return;

    const projects = [
        {
            image: "img/aurumelle_pastries.png",
            title: "Aurumelle Pastries",
            link: "https://aurumelle-pastries.wuaze.com/login.php"
        },
        {
            image: "img/singku_inspired_website.png",
            title: "Singku Inspired Website",
            link: "https://marc-wd.github.io/MidtermProj_Major-Pages/#home"
        },
        {
            image: "img/panlasa_trip_header.png",
            title: "Panlasa Trip",
            link: "https://panlasatrip.wordpress.com/"
        }
    ];

    let currentIndex = 0;

    function switchProject() {
        imageElement.style.opacity = "0";
        imageElement.style.transform = "scale(0.97)";

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % projects.length;
            const project = projects[currentIndex];

            imageElement.src = project.image;
            titleElement.textContent = project.title;
            linkElement.href = project.link;

            imageElement.style.opacity = "1";
            imageElement.style.transform = "scale(1)";
        }, 400);
    }

    imageElement.src = projects[0].image;
    titleElement.textContent = projects[0].title;
    linkElement.href = projects[0].link;

    setInterval(switchProject, 5000);
}


/* =========================================
   MARQUEE
========================================= */

function infiniteMarquee() {
    const tracks = document.querySelectorAll(".marquee-track");

    tracks.forEach(track => {
        if (!track.classList.contains("cloned")) {
            track.insertAdjacentHTML("beforeend", track.innerHTML);
            track.classList.add("cloned");
        }
    });
}


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

function toggleBento(element) {
    element.classList.toggle("active");
}