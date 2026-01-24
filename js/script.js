// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Инициализация проекта
    initNebulaScent();
});

function initNebulaScent() {
    // Предзагрузка
    showPreloader();
    
    // Инициализация анимаций
    initAnimations();
    
    // Инициализация интерактивных элементов
    initInteractiveElements();
    
    // Инициализация частиц
    initParticles();
    
    // Инициализация Tilt.js
    initTiltEffect();
}

function showPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingChars = document.querySelectorAll('.loading-char');
    
    // Анимация загрузки символов
    gsap.to(loadingChars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
    });
    
    // Анимация атомов
    gsap.to('.atom', {
        scale: 1.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "power2.inOut"
    });
    
    // Анимация электронов
    gsap.to('.electron', {
        duration: 3,
        rotation: 360,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
    });
    
    // Скрытие прелоадера через 3 секунды
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                preloader.style.display = 'none';
                startMainAnimations();
            }
        });
    }, 3000);
}

function startMainAnimations() {
    // Анимация героя
    animateHeroSection();
    
    // Анимация галереи
    animateGallerySection();
    
    // Анимация параллакс секции
    animateParallaxSection();
    
    // Анимация футера
    animateFooter();
}

function animateHeroSection() {
    // Анимация заголовка
    gsap.to('.line-1', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });
    
    gsap.to('.line-2', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.4
    });
    
    gsap.to('.line-3', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.6
    });
    
    gsap.to('.title-highlight', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8
    });
    
    // Анимация машинописного текста
    const typewriterText = document.getElementById('typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    gsap.to(typewriterText, {
        text: {
            value: text,
            speed: 1
        },
        duration: text.length / 10,
        delay: 1.5,
        ease: "none"
    });
    
    // Анимация кнопок
    gsap.from('.magnetic-btn', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 2.5,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.hologram-btn', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 2.7,
        ease: "back.out(1.7)"
    });
    
    // Анимация орбит кнопки
    gsap.to('.orbit', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.3,
        ease: "power2.inOut"
    });
    
    // Анимация парящих молекул
    animateFloatingMolecules();
    
    // Анимация скролл-индикатора
    gsap.to('.scroll-line', {
        height: 100,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

function animateFloatingMolecules() {
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        gsap.to(molecule, {
            x: () => Math.random() * 200 - 100,
            y: () => Math.random() * 200 - 100,
            duration: () => Math.random() * 5 + 3,
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
            ease: "sine.inOut"
        });
        
        gsap.to(molecule, {
            scale: () => Math.random() * 0.5 + 0.8,
            duration: () => Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
            ease: "power1.inOut"
        });
    });
}

function animateGallerySection() {
    // Анимация заголовка галереи
    gsap.to('.title-part', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.perfume-gallery',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Анимация карточек
    const cards = document.querySelectorAll('.perfume-card');
    
    cards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 100,
            rotationX: 20,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            ease: "back.out(1.7)"
        });
        
        // Анимация орбит карточки
        const orbits = card.querySelectorAll('.orbit');
        gsap.to(orbits, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
            transformOrigin: "center"
        });
        
        // Анимация пузырьков в жидкости
        const bubbles = card.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            gsap.to(bubble, {
                y: -30,
                opacity: 0.8,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        });
        
        // Анимация статистики
        const statBars = card.querySelectorAll('.stat-fill');
        statBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            
            ScrollTrigger.create({
                trigger: card,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(bar, {
                        width: `${value}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        delay: 0.3
                    });
                }
            });
        });
    });
    
    // Интерактивность навигационных точек
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const cardIndex = this.getAttribute('data-card');
            const targetCard = document.querySelector(`.card-${cardIndex}`);
            
            // Плавный скролл к карточке
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetCard,
                    offsetY: 100
                },
                ease: "power2.inOut"
            });
            
            // Анимация активной точки
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Эффект пульсации
            gsap.to(this, {
                scale: 1.5,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
}

function animateParallaxSection() {
    // Параллакс эффект фона
    gsap.to('.parallax-bg', {
        y: '-50%',
        ease: "none",
        scrollTrigger: {
            trigger: '.parallax-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Анимация диаграммы молекулы
    gsap.to('.electron-1', {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
    });
    
    gsap.to('.electron-2', {
        rotation: -360,
        duration: 6,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
    });
    
    gsap.to('.electron-3', {
        rotation: 360,
        duration: 5,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
    });
    
    // Анимация текста при скролле
    gsap.from('.parallax-title span', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.parallax-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        ease: "back.out(1.7)"
    });
}

function animateFooter() {
    // Анимация волны
    const wavePaths = document.querySelectorAll('.wave-path');
    
    wavePaths.forEach((path, index) => {
        gsap.to(path, {
            attr: { d: getRandomWavePath() },
            duration: 10 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    
    // Анимация логотипа
    gsap.to('.logo-electron', {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
    });
}

function initInteractiveElements() {
    // Магнитные кнопки
    initMagneticButtons();
    
    // Интерактивность карточек
    initCardInteractions();
    
    // Модальное окно
    initModal();
    
    // Кнопки навигации
    initNavigationButtons();
}

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn, .footer-btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            gsap.to(this, {
                x: deltaX * 10,
                y: deltaY * 10,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Анимация орбит
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                gsap.to(orbit, {
                    x: deltaX * 20,
                    y: deltaY * 20,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.5)"
            });
            
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                gsap.to(orbit, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
        
        // Звуковой эффект при клике
        btn.addEventListener('click', function() {
            playSound('click');
            
            // Эффект пульсации
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
}

function initCardInteractions() {
    const cards = document.querySelectorAll('.perfume-card');
    
    cards.forEach(card => {
        // Эффект наведения
        card.addEventListener('mouseenter', function() {
            playSound('hover');
            
            // Анимация частиц
            const particles = this.querySelector('.card-particles');
            createCardParticles(particles);
            
            // Анимация свечения
            gsap.to(this, {
                boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                boxShadow: 'none',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Кнопка "Исследовать" на обороте карточки
        const exploreBtn = card.querySelector('.explore-card');
        exploreBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const cardData = card.getAttribute('data-card');
            showPerfumeDetails(cardData);
        });
    });
}

function createCardParticles(container) {
    // Создаем 15 частиц
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            opacity: 0;
        `;
        
        container.appendChild(particle);
        
        // Анимация частицы
        gsap.to(particle, {
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50,
            opacity: 0.8,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(particle, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.5,
                    onComplete: () => particle.remove()
                });
            }
        });
    }
}

function initModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function showPerfumeDetails(cardId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    // Загрузка данных (заглушка)
    const perfumeData = {
        '1': {
            name: 'DIOR SAUVAGE ELIXIR',
            description: 'Эликсир версия культового аромата Dior Sauvage представляет собой более интенсивную и чувственную интерпретацию. Глубокий амброво-древесный аккорд с нотами лаванды и пачули создает магнитное присутствие.',
            notes: ['Бергамот', 'Перец', 'Лаванда', 'Пачули', 'Амбра', 'Кедр'],
            intensity: 95,
            longevity: 12,
            season: 'Осень/Зима'
        },
        '2': {
            name: 'BLEU DE CHANEL PARFUM',
            description: 'Самая интенсивная версия культового аромата Chanel. Глубокий древесно-амбровый букет с нотами цитрусов и имбиря для мужчины, который уверен в своей силе.',
            notes: ['Цитрус', 'Мята', 'Имбирь', 'Жасмин', 'Сандал', 'Лабданум'],
            intensity: 90,
            longevity: 14,
            season: 'Круглый год'
        },
        '3': {
            name: 'TOM FORD OUD WOOD',
            description: 'Роскошный аромат из коллекции Private Blend. Сочетание редкого уду, сандала и ветивера создает утонченный и загадочный образ для истинных ценителей.',
            notes: ['Кардамон', 'Роза', 'Сандал', 'Ветивер', 'Уд', 'Амбра'],
            intensity: 98,
            longevity: 16,
            season: 'Вечер/Особый случай'
        }
    };
    
    const data = perfumeData[cardId];
    
    // Генерация контента
    modalContent.innerHTML = `
        <div class="modal-perfume">
            <h4>${data.name}</h4>
            <p class="modal-desc">${data.description}</p>
            
            <div class="modal-stats">
                <div class="modal-stat">
                    <span>Интенсивность:</span>
                    <div class="modal-bar">
                        <div class="modal-fill" style="width: ${data.intensity}%"></div>
                    </div>
                    <span>${data.intensity}%</span>
                </div>
                
                <div class="modal-stat">
                    <span>Стойкость:</span>
                    <div class="modal-bar">
                        <div class="modal-fill" style="width: ${(data.longevity / 24) * 100}%"></div>
                    </div>
                    <span>${data.longevity} часов</span>
                </div>
                
                <div class="modal-stat">
                    <span>Сезон:</span>
                    <span class="season-badge">${data.season}</span>
                </div>
            </div>
            
            <div class="modal-notes">
                <h5>АРОМАТИЧЕСКИЕ НОТЫ:</h5>
                <div class="notes-grid">
                    ${data.notes.map(note => `
                        <div class="note-item">
                            <div class="note-dot"></div>
                            <span>${note}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Показ модального окна
    modalOverlay.classList.add('active');
    
    // Анимация появления
    gsap.from('.modal-perfume', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    
    gsap.to('.modal-container', {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            modalOverlay.classList.remove('active');
            gsap.set('.modal-container', { scale: 1, opacity: 1 });
        }
    });
}

function initNavigationButtons() {
    // Кнопка "Исследовать коллекцию"
    document.getElementById('explore-btn').addEventListener('click', function() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: '#gallery',
                offsetY: 100
            },
            ease: "power2.inOut"
        });
    });
    
    // Кнопка "Открыть новое"
    document.getElementById('discover-btn').addEventListener('click', function() {
        // Случайная карточка
        const randomCard = Math.floor(Math.random() * 3) + 1;
        const targetCard = document.querySelector(`.card-${randomCard}`);
        
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: targetCard,
                offsetY: 100
            },
            ease: "power2.inOut"
        });
        
        // Эффект подсветки
        gsap.to(targetCard, {
            boxShadow: '0 0 80px rgba(236, 72, 153, 0.7)',
            duration: 1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut"
        });
    });
    
    // Кнопка "Связаться с нами"
    document.getElementById('contact-btn').addEventListener('click', function() {
        alert('Контакты:\n\nEmail: contact@nebulascent.com\nТелефон: +7 (XXX) XXX-XX-XX\n\nЭто демо-проект для демонстрации анимаций.');
    });
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }
    }
    
    // Создание частиц
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Анимация частиц
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Соединение близких частиц
        connectParticles();
        
        requestAnimationFrame(animateParticles);
    }
    
    function connectParticles() {
        const maxDistance = 100;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Запуск анимации
    animateParticles();
    
    // Ресайз канваса
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initTiltEffect() {
    // Инициализация Tilt.js для карточек
    $('.perfume-card').tilt({
        maxTilt: 15,
        perspective: 1500,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1.05,
        speed: 500,
        transition: true,
        glare: true,
        maxGlare: 0.2,
        reset: true
    });
}

function playSound(type) {
    const sound = document.getElementById(`${type}-sound`);
    
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }
}

function getRandomWavePath() {
    // Генерация случайного пути волны
    const amplitude = Math.random() * 20 + 10;
    const frequency = Math.random() * 0.02 + 0.01;
    
    let path = `M0,0`;
    
    for (let i = 0; i <= 1200; i += 50) {
        const y = 50 + Math.sin(i * frequency) * amplitude;
        path += ` L${i},${y}`;
    }
    
    path += ` L1200,0 Z`;
    return path;
}

// Добавляем CSS для модального окна
document.head.insertAdjacentHTML('beforeend', `
<style>
    .modal-perfume {
        color: white;
    }
    
    .modal-perfume h4 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: var(--neon-blue);
    }
    
    .modal-desc {
        line-height: 1.6;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .modal-stats {
        background: rgba(0, 0, 0, 0.2);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    
    .modal-stat {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1rem;
    }
    
    .modal-stat:last-child {
        margin-bottom: 0;
    }
    
    .modal-bar {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .modal-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
        border-radius: 4px;
    }
    
    .season-badge {
        background: var(--neon-purple);
        padding: 0.3rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .modal-notes h5 {
        color: var(--neon-blue);
        margin-bottom: 1rem;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 1px;
    }
    
    .notes-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .notes-grid {
            grid-template-columns: 1fr;
        }
    }
    
    .note-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .note-dot {
        width: 10px;
        height: 10px;
        background: var(--neon-blue);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--neon-blue);
    }
</style>
`);