document.addEventListener('DOMContentLoaded', function () {

    // --- TEXT SPLITTING FOR HERO ANIMATION ---
    function splitText(selector) {
        const elem = document.querySelector(selector);
        if (!elem) return;
        const text = elem.innerText;
        elem.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            if (char === ' ') {
                span.style.width = '0.5em';
            }
            elem.appendChild(span);
        });
        return elem.querySelectorAll('span');
    }

    const heroNameSpans = splitText('#hero-name');
    const heroTitleSpans = splitText('#hero-title');

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    // Hero Animation
    tl.from(heroNameSpans, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out'
    })
    .from(heroTitleSpans, {
        x: -50,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.8")
    .from('#hero-nickname', {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut'
    }, "-=0.5")
    .fromTo('#background-container', { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power2.out' }, 0)
    .fromTo('#background-overlay', { opacity: 0 }, { opacity: 0.6, duration: 1.5, ease: 'power2.out' }, 0);


    // Specific animations for section contents
    gsap.from(['#about-image', '#about-text'], {
        scrollTrigger: { trigger: '#about', start: 'top 80%' },
        duration: 1,
        opacity: 0,
        x: (i) => i === 0 ? -100 : 100,
        stagger: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.skill-card', {
        scrollTrigger: { trigger: '#skills', start: 'top 80%' },
        duration: 0.8,
        y: 50,
        stagger: 0.15,
        ease: 'power3.out'
    });


    // --- PROJECT DATA & DYNAMIC CARDS ---
    const projects = [
        {
            title: 'DADE Foundation – Volunteer Platform',
            url: 'https://volunteers.dadefoundation.com',
            description: 'A global community portal connecting volunteers to opportunities in disability inclusion, technology advocacy, and grassroots campaigns.'
        },
        {
            title: 'DADE Foundation – E‑Learning Hub',
            url: 'https://learning.dadefoundation.com',
            description: 'An online learning platform offering courses on advocacy, policy, digital skills, and inclusive education for persons with disabilities.'
        },
        {
            title: 'P3 Consulting Ltd',
            url: 'https://p3consultingltd.com',
            description: 'A Nigerian‑owned consulting firm delivering data‑driven, innovative services to strengthen institutions and agricultural value chains.'
        },
        {
            title: 'Pallium Allied Ltd',
            url: 'https://palliumallied.com',
            description: 'A real‑estate & investment company in Abuja offering land sales and property development, emphasising security, legacy, and ownership.'
        },
        {
            title: 'Nigeria Youth Mentorship & Entrepreneurship Forum',
            url: 'https://nymef.org',
            description: 'A youth‑led organisation committed to mentoring and equipping young Nigerians with skills for innovation, leadership and entrepreneurship.'
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            const projectCard = `
                <div class="project-card bg-gray-900 bg-opacity-70 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-2xl font-bold text-white font-orbitron">${project.title}</h3>
                        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-white transition-transform duration-300 hover:scale-110 text-2xl">
                            &#8599;
                        </a>
                    </div>
                    <p class="text-gray-400">${project.description}</p>
                </div>
            `;
            projectsGrid.innerHTML += projectCard;
        });

        gsap.from('.project-card', {
            scrollTrigger: { trigger: '#projects', start: 'top 80%' },
            duration: 1,
            y: 100,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector('#cursor-dot');
    const cursorOutline = document.querySelector('#cursor-outline');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        gsap.to(cursorOutline, {
            duration: 0.3,
            left: `${posX}px`,
            top: `${posY}px`,
            ease: 'power3.out'
        });
    });

    const interactiveElements = document.querySelectorAll('a, .skill-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                duration: 0.3,
                scale: 1.5,
                borderColor: '#22d3ee' // cyan-400
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                duration: 0.3,
                scale: 1,
                borderColor: '#06b6d4' // cyan-500
            });
        });
    });

    // --- 3D TILT EFFECT ---
    const tiltCards = document.querySelectorAll('.skill-card, .project-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10; // Max rotation 10 degrees

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.6s ease-in-out';
        });
    });
});
