// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, загружены ли необходимые библиотеки
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не загружен, загружаем...');
        loadGSAP();
    } else {
        initNebulaScent();
    }
});

function loadGSAP() {
    // Динамическая загрузка GSAP
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = function() {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        script2.onload = initNebulaScent;
        document.head.appendChild(script2);
    };
    document.head.appendChild(script);
}

// Добавьте эту функцию для анимации заглавного текста
function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    const titleLines = document.querySelectorAll('.title-line');
    const titleHighlight = document.querySelector('.title-highlight');
    const typewriterText = document.getElementById('typewriter');
    
    if (!heroTitle) return;
    
    // Сначала показываем заголовок
    gsap.to(heroTitle, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5
    });
    
    // Анимация строк по очереди
    titleLines.forEach((line, index) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.8 + (index * 0.3),
            ease: "power4.out"
        });
    });
    
    // Анимация выделенного текста NEBULA
    if (titleHighlight) {
        gsap.to(titleHighlight, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            delay: 1.7,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
                // Анимация подчеркивания
                gsap.to(titleHighlight.querySelector('::after'), {
                    opacity: 0.7,
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    }
    
    // Анимация машинописного текста
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        
        gsap.to(typewriterText, {
            opacity: 1,
            duration: 0.5,
            delay: 2.2
        });
        
        // Эффект печатания
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
                
                // Добавляем мигающий курсор
                if (i === text.length) {
                    typewriterText.style.borderRight = '3px solid var(--neon-blue)';
                    gsap.to(typewriterText, {
                        borderRightColor: 'transparent',
                        repeat: -1,
                        duration: 0.8,
                        yoyo: true,
                        ease: "none"
                    });
                }
            }
        }
        
        setTimeout(typeWriter, 2300);
    }
}

// Обновите функцию initNebulaScent
function initNebulaScent() {
    // Инициализация GSAP
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Быстрая инициализация
    initFastLoad();
    
    // Инициализация адаптивных функций
    initResponsiveFeatures();
    
    // Отложенная инициализация тяжелых компонентов
    setTimeout(() => {
        initInteractiveElements();
        initParticles();
        initAromaSelector();
        
        // Запуск анимации после загрузки
        setTimeout(startMainAnimations, 500);
    }, 300);
}

// Обновите функцию initFastLoad для лучшей производительности
function initFastLoad() {
    // Быстрая анимация для элементов, которые уже на странице
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        gsap.set(heroTitle, { opacity: 0, y: 20 });
    }
    
    // Скрытие прелоадера с улучшенной анимацией
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Анимация завершения прелоадера
        const loadingChars = document.querySelectorAll('.loading-char');
        gsap.to(loadingChars, {
            opacity: 0,
            y: -20,
            scale: 1.5,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
            delay: 1.5
        });
        
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    
                    // Запуск анимации основного контента
                    gsap.to(heroTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                }
            });
        }, 2000);
    }
    
    // Инициализация простых hover-эффектов
    initBasicHoverEffects();
}



// Добавьте анимацию для кнопок CTA
function animateCTAButtons() {
    const magneticBtn = document.querySelector('.magnetic-btn');
    const hologramBtn = document.querySelector('.hologram-btn');
    
    // Пульсация кнопок
    if (magneticBtn) {
        gsap.to(magneticBtn, {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 5
        });
    }
    
    if (hologramBtn) {
        gsap.to(hologramBtn, {
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 5.2
        });
    }
}

// Вызовите анимацию кнопок в startMainAnimations
// Добавьте в конец функции startMainAnimations:
animateCTAButtons();

function initBasicHoverEffects() {
    // Базовые hover эффекты для карточек
    const cards = document.querySelectorAll('.perfume-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Обновите функцию initFastAnimations
function initFastAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
    }
    
    // Предварительная загрузка важных изображений
    const perfumeImages = [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2940',
        'https://images.unsplash.com/photo-1590736969958-8a3d4f16ca4f?q=80&w=2940',
        'https://images.unsplash.com/photo-1543858741-6c6c0b27efd3?q=80&w=2940',
        'https://images.unsplash.com/photo-1596040033221-a2f28d0e05d5?q=80&w=2940',
        'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=100'
    ];
    
    // Фоновая загрузка изображений
    perfumeImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Добавьте функцию для анимации парящих молекул
function animateFloatingMolecules() {
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        gsap.to(molecule, {
            opacity: 0.3,
            duration: 1,
            delay: 4.0 + (index * 0.2),
            ease: "power2.out"
        });
        
        gsap.to(molecule, {
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50,
            duration: () => Math.random() * 8 + 6,
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
            ease: "sine.inOut"
        });
        
        gsap.to(molecule, {
            scale: () => Math.random() * 0.5 + 0.8,
            duration: () => Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
            ease: "power1.inOut"
        });
    });
}

function startMainAnimations() {
    // Уникальная анимация заглавного текста с волной
    animateHeroTitleWithWave();
    
    // Последовательная анимация кнопок с задержкой
    gsap.to('.magnetic-btn', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 2.5,
        ease: "back.out(1.7)",
        stagger: 0.2
    });
    
    gsap.to('.hologram-btn', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 2.8,
        ease: "back.out(1.7)",
        stagger: 0.2
    });
    
    // Анимация орбит кнопки с вращением
    gsap.to('.orbit', {
        scale: 1.2,
        opacity: 0,
        rotation: 360,
        duration: 2,
        repeat: -1,
        stagger: 0.3,
        ease: "power2.inOut",
        delay: 3.0
    });
    
    // Анимация парящих молекул с улучшениями
    animateFloatingMoleculesEnhanced();
    
    // Анимация галереи с последовательным появлением
    animateGalleryWithStagger();
    
    // Анимация параллакс секции
    animateParallaxSectionEnhanced();
    
    // Анимация фоновых туманностей
    animateNebulaBackground();
    
    // Анимация интерактивного селектора
    animateAromaSelector();
}

// Улучшенная анимация параллакс секции
function animateParallaxSectionEnhanced() {
    // Параллакс эффект с плавностью
    gsap.to('.parallax-bg', {
        y: '-30%',
        ease: "none",
        scrollTrigger: {
            trigger: '.parallax-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Анимация диаграммы молекулы с улучшениями
    const electrons = document.querySelectorAll('.electron');
    electrons.forEach((electron, index) => {
        gsap.to(electron, {
            rotation: 360,
            duration: 4 + index,
            repeat: -1,
            ease: "none",
            transformOrigin: "center"
        });
    });
    
    // Анимация плавающих формул
    const formulas = document.querySelectorAll('.formula');
    formulas.forEach((formula, index) => {
        gsap.to(formula, {
            y: -1000,
            rotation: 360,
            duration: 20 + index * 2,
            repeat: -1,
            ease: "none",
            delay: index * 2
        });
    });
    
    // Анимация текста при скролле
    gsap.fromTo('.parallax-title span',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.parallax-content',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Новая функция для анимации фоновых туманностей
function animateNebulaBackground() {
    const nebulaLayers = document.querySelectorAll('.nebula-layer');
    
    nebulaLayers.forEach((layer, index) => {
        // Анимация движения туманностей
        gsap.to(layer, {
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50,
            duration: 30 + index * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Анимация изменения размера
        gsap.to(layer, {
            scale: () => Math.random() * 0.2 + 0.9,
            duration: 20 + index * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Анимация изменения прозрачности
        gsap.to(layer, {
            opacity: () => Math.random() * 0.2 + 0.2,
            duration: 15 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Новая функция для анимации селектора ароматов
function animateAromaSelector() {
    const options = document.querySelectorAll('.option');
    const progressFill = document.querySelector('.progress-fill');
    
    options.forEach(option => {
        // Анимация при наведении
        option.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icon = this.querySelector('i');
            gsap.to(icon, {
                rotation: 360,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
        
        option.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Анимация при клике
        option.addEventListener('click', function() {
            // Эффект пульсации
            gsap.to(this, {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
            
            // Эффект свечения
            gsap.to(this, {
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
            
            // Анимация прогресс-бара
            if (progressFill) {
                gsap.to(progressFill, {
                    width: '66%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Добавьте эту функцию для инициализации адаптивных функций
function initResponsiveFeatures() {
    // Адаптация анимаций для мобильных устройств
    if ('ontouchstart' in window) {
        // Уменьшаем количество частиц
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            canvas.style.opacity = '0.3';
        }
        
        // Упрощаем сложные анимации
        gsap.globalTimeline.timeScale(1.5);
        
        // Отключаем параллакс на мобильных
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && trigger.vars.scrub) {
                trigger.kill();
            }
        });
    }
    
    // Оптимизация для разных размеров экрана
    function updateAnimations() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Упрощенные анимации для мобильных
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateAnimations);
    updateAnimations();
}

// Улучшенная анимация парящих молекул
function animateFloatingMoleculesEnhanced() {
    const molecules = document.querySelectorAll('.molecule');
    
    molecules.forEach((molecule, index) => {
        // Начальное состояние
        gsap.set(molecule, {
            opacity: 0,
            scale: 0
        });
        
        // Анимация появления с задержкой
        gsap.to(molecule, {
            opacity: 0.3,
            scale: 1,
            duration: 1.5,
            delay: 3.5 + (index * 0.3),
            ease: "elastic.out(1, 0.5)"
        });
        
        // Сложная траектория движения
        const timeline = gsap.timeline({
            repeat: -1,
            yoyo: true,
            delay: index * 0.5
        });
        
        timeline
            .to(molecule, {
                x: () => Math.random() * 80 - 40,
                y: () => Math.random() * 60 - 30,
                duration: () => Math.random() * 6 + 4,
                ease: "sine.inOut"
            })
            .to(molecule, {
                x: () => Math.random() * 60 - 30,
                y: () => Math.random() * 40 - 20,
                duration: () => Math.random() * 5 + 3,
                ease: "sine.inOut"
            }, "-=2")
            .to(molecule, {
                x: () => Math.random() * 40 - 20,
                y: () => Math.random() * 50 - 25,
                duration: () => Math.random() * 4 + 2,
                ease: "sine.inOut"
            }, "-=1");
        
        // Анимация пульсации
        gsap.to(molecule, {
            scale: () => Math.random() * 0.3 + 0.9,
            duration: () => Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
            ease: "sine.inOut"
        });
        
        // Анимация цвета
        gsap.to(molecule, {
            filter: 'hue-rotate(360deg)',
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    });
}

// Новая функция для анимации галереи с последовательным появлением
function animateGalleryWithStagger() {
    const cards = document.querySelectorAll('.perfume-card');
    
    // Устанавливаем индекс для каждой карточки
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        
        // Анимация появления карточек при скролле
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                rotationX: 20
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                delay: index * 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Улучшенная анимация при наведении
        card.addEventListener('mouseenter', function() {
            // Анимация подъема
            gsap.to(this, {
                y: -20,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Анимация свечения
            gsap.to(this, {
                boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)',
                duration: 0.3
            });
            
            // Анимация жидкости в бутылке
            const liquid = this.querySelector('.bottle-liquid');
            if (liquid) {
                gsap.to(liquid, {
                    height: '75%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            
            // Анимация пузырьков
            const bubbles = this.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                gsap.to(bubble, {
                    y: -40,
                    opacity: 0.8,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 1
                });
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Возврат анимации
            gsap.to(this, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(this, {
                boxShadow: 'none',
                duration: 0.3
            });
            
            const liquid = this.querySelector('.bottle-liquid');
            if (liquid) {
                gsap.to(liquid, {
                    height: '70%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Анимация заголовка галереи
    const titleParts = document.querySelectorAll('.title-part');
    titleParts.forEach((part, index) => {
        gsap.fromTo(part,
            {
                opacity: 0,
                y: 50,
                rotation: 5
            },
            {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 1,
                delay: index * 0.3,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.perfume-gallery',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}



// Новая функция для анимации заглавного текста с волной
function animateHeroTitleWithWave() {
    const titleLines = document.querySelectorAll('.title-line');
    const titleHighlight = document.querySelector('.title-highlight');
    
    // Анимация строк с волновым эффектом
    titleLines.forEach((line, index) => {
        const chars = line.textContent.split('');
        line.textContent = '';
        
        chars.forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%) rotate(10deg)';
            line.appendChild(span);
            
            // Анимация каждого символа с задержкой
            gsap.to(span, {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 0.6,
                delay: 0.8 + (index * 0.3) + (charIndex * 0.05),
                ease: "back.out(1.7)"
            });
        });
    });
    
    // Анимация выделенного текста NEBULA с эффектом свечения
    if (titleHighlight) {
        gsap.to(titleHighlight, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            delay: 2.0,
            ease: "elastic.out(1, 0.5)",
            onStart: () => {
                titleHighlight.classList.add('gradient-text');
            }
        });
        
        // Анимация подчеркивания
        const underline = document.createElement('div');
        underline.className = 'title-underline';
        titleHighlight.appendChild(underline);
        
        gsap.fromTo(underline,
            { scaleX: 0, opacity: 0 },
            { 
                scaleX: 1, 
                opacity: 0.7, 
                duration: 0.8, 
                delay: 2.5,
                ease: "power2.out" 
            }
        );
    }
    
    // Анимация машинописного текста
    const typewriterText = document.getElementById('typewriter');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        
        gsap.to(typewriterText, {
            opacity: 1,
            duration: 0.5,
            delay: 2.2
        });
        
        // Эффект печатания с курсором
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                
                // Случайная задержка для более естественного эффекта
                const delay = Math.random() * 30 + 40;
                setTimeout(typeWriter, delay);
            } else {
                // Анимация мигающего курсора
                typewriterText.style.borderRight = '2px solid var(--neon-blue)';
                gsap.to(typewriterText, {
                    borderRightColor: 'transparent',
                    repeat: -1,
                    duration: 0.8,
                    yoyo: true,
                    ease: "none"
                });
            }
        }
        
        setTimeout(typeWriter, 2300);
    }
}


function animateGallerySection() {
    // Анимация заголовка галереи
    const titleParts = document.querySelectorAll('.title-part');
    titleParts.forEach((part, index) => {
        gsap.to(part, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.3,
            scrollTrigger: {
                trigger: '.perfume-gallery',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            ease: "back.out(1.7)"
        });
    });
    
    // Анимация карточек
    const cards = document.querySelectorAll('.perfume-card');
    
    cards.forEach((card, index) => {
        // Анимация появления
        gsap.from(card, {
            opacity: 0,
            y: 100,
            rotationX: 20,
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
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
        
        // Анимация статистики при наведении
        card.addEventListener('mouseenter', function() {
            const statBars = this.querySelectorAll('.stat-fill');
            statBars.forEach(bar => {
                const value = bar.getAttribute('data-value');
                gsap.to(bar, {
                    width: `${value}%`,
                    duration: 1,
                    ease: "power3.out"
                });
            });
        });
    });
    
    // Интерактивность навигационных точек
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const cardIndex = this.getAttribute('data-card');
            const targetCard = document.querySelector(`.card-${cardIndex}`);
            
            if (targetCard) {
                // Плавный скролл к карточке
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
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
            }
        });
    });
    
    // Навигационные кнопки галереи
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    
    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', () => scrollGallery('prev'));
        galleryNext.addEventListener('click', () => scrollGallery('next'));
    }
}

function scrollGallery(direction) {
    const galleryContainer = document.querySelector('.gallery-container');
    const scrollAmount = 350; // Ширина карточки + gap
    
    if (galleryContainer) {
        const currentScroll = galleryContainer.scrollLeft || 0;
        const newScroll = direction === 'next' 
            ? currentScroll + scrollAmount 
            : currentScroll - scrollAmount;
        
        gsap.to(galleryContainer, {
            scrollLeft: newScroll,
            duration: 0.5,
            ease: "power2.inOut"
        });
    }
}

function animateParallaxSection() {
    // Параллакс эффект фона
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        gsap.to(parallaxBg, {
            y: '-50%',
            ease: "none",
            scrollTrigger: {
                trigger: '.parallax-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
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
    
    // Анимация плавающих формул
    const formulas = document.querySelectorAll('.formula');
    formulas.forEach(formula => {
        gsap.to(formula, {
            y: -1000,
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
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
    
    // Hover эффекты для всех интерактивных элементов
    initHoverEffects();

    initResponsiveFeatures();
}

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn, .footer-btn, .parallax-btn');
    
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
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Анимация орбит
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                gsap.to(orbit, {
                    x: deltaX * 20,
                    y: deltaY * 20,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Анимация пульса
            const pulse = this.querySelector('.btn-pulse');
            if (pulse) {
                gsap.to(pulse, {
                    width: 100,
                    height: 100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
            
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                gsap.to(orbit, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            });
            
            // Сброс пульса
            const pulse = this.querySelector('.btn-pulse');
            if (pulse) {
                gsap.to(pulse, {
                    width: 0,
                    height: 0,
                    duration: 0.3
                });
            }
        });
        
        // Эффект при клике
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
            
            // Создание волнового эффекта
            createRippleEffect(this, e);
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${x - size/2}px;
        top: ${y - size/2}px;
        pointer-events: none;
        transform: scale(0);
        z-index: 1;
    `;
    
    element.appendChild(ripple);
    
    gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

function initCardInteractions() {
    const cards = document.querySelectorAll('.perfume-card');
    
    cards.forEach(card => {
        // Эффект наведения с улучшениями
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
            
            // Анимация жидкости в бутылке
            const liquid = this.querySelector('.bottle-liquid');
            if (liquid) {
                gsap.to(liquid, {
                    height: '75%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            
            // Анимация свечения бутылки
            const glow = this.querySelector('.bottle-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                boxShadow: 'none',
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Возврат анимации жидкости
            const liquid = this.querySelector('.bottle-liquid');
            if (liquid) {
                gsap.to(liquid, {
                    height: '70%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            
            // Возврат свечения бутылки
            const glow = this.querySelector('.bottle-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        // Кнопка "Исследовать" на обороте карточки
        const exploreBtn = card.querySelector('.explore-card');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const cardData = card.getAttribute('data-card');
                showPerfumeDetails(cardData);
            });
        }
        
        // Клик по карточке для переворота
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.explore-card')) {
                this.querySelector('.card-inner').classList.toggle('flipped');
            }
        });
    });
}

function createCardParticles(container) {
    if (!container) return;
    
    // Создаем частицы
    for (let i = 0; i < 10; i++) {
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
            z-index: 2;
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
    
    if (!modalOverlay || !modalClose) return;
    
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
    
    if (!modalOverlay || !modalContent) return;
    
    try {
        const perfumeData = JSON.parse(document.getElementById('perfume-data').textContent);
        const perfume = perfumeData.perfumes.find(p => p.id == cardId);
        
        if (!perfume) return;
        
        // Генерация контента с улучшениями
        modalContent.innerHTML = `
            <div class="modal-perfume">
                <h4>${perfume.name}</h4>
                <p class="modal-desc">${perfume.description}</p>
                
                <div class="price-tag">${perfume.price}</div>
                
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span>Интенсивность:</span>
                        <div class="modal-bar">
                            <div class="modal-fill" style="width: ${perfume.intensity}%"></div>
                        </div>
                        <span>${perfume.intensity}%</span>
                    </div>
                    
                    <div class="modal-stat">
                        <span>Стойкость:</span>
                        <div class="modal-bar">
                            <div class="modal-fill" style="width: ${(perfume.longevity / 24) * 100}%"></div>
                        </div>
                        <span>${perfume.longevity} часов</span>
                    </div>
                    
                    <div class="modal-stat">
                        <span>Сезон:</span>
                        <span class="season-badge">${perfume.season}</span>
                    </div>
                    
                    <div class="modal-stat">
                        <span>Повод:</span>
                        <span>${perfume.occasion}</span>
                    </div>
                </div>
                
                <div class="modal-notes">
                    <h5>АРОМАТИЧЕСКИЕ НОТЫ:</h5>
                    <div class="notes-grid">
                        ${perfume.notes.map(note => `
                            <div class="note-item">
                                <div class="note-dot"></div>
                                <span>${note}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="magnetic-btn" style="margin-top: 2rem; width: 100%;">
                    <span>ДОБАВИТЬ В КОРЗИНУ</span>
                </button>
            </div>
        `;
        
        // Показ модального окна
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Анимация появления
        gsap.from('.modal-perfume', {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        // Анимация заполнения статистики
        gsap.to('.modal-fill', {
            width: '100%',
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            stagger: 0.1
        });
        
    } catch (error) {
        console.error('Ошибка загрузки данных парфюма:', error);
        modalContent.innerHTML = '<p style="text-align: center; color: white;">Ошибка загрузки данных</p>';
        modalOverlay.classList.add('active');
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (!modalOverlay) return;
    
    document.body.style.overflow = '';
    
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
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const gallery = document.getElementById('gallery');
            if (gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Кнопка "Открыть новое"
    const discoverBtn = document.getElementById('discover-btn');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            // Случайная карточка
            const cards = document.querySelectorAll('.perfume-card');
            if (cards.length > 0) {
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                
                randomCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Эффект подсветки
                gsap.to(randomCard, {
                    boxShadow: '0 0 80px rgba(236, 72, 153, 0.7)',
                    duration: 1,
                    yoyo: true,
                    repeat: 3,
                    ease: "power2.inOut"
                });
                
                // Встряска карточки
                gsap.to(randomCard, {
                    x: 10,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 5,
                    ease: "power1.inOut"
                });
            }
        });
    }
    
    // Кнопка "Связаться с нами"
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Создание контактной формы в модальном окне
            const modalContent = document.getElementById('modal-content');
            if (modalContent) {
                modalContent.innerHTML = `
                    <div class="modal-perfume">
                        <h4>СВЯЗАТЬСЯ С НАМИ</h4>
                        <form id="contact-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
                            <div style="position: relative;">
                                <input type="text" placeholder="Ваше имя" required 
                                       style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.1); 
                                              border: 1px solid var(--neon-blue); border-radius: 10px; 
                                              color: white; font-size: 1rem;">
                            </div>
                            <div style="position: relative;">
                                <input type="email" placeholder="Ваш email" required 
                                       style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.1); 
                                              border: 1px solid var(--neon-blue); border-radius: 10px; 
                                              color: white; font-size: 1rem;">
                            </div>
                            <div style="position: relative;">
                                <textarea placeholder="Ваше сообщение" rows="4" required
                                          style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.1); 
                                                 border: 1px solid var(--neon-blue); border-radius: 10px; 
                                                 color: white; font-size: 1rem; resize: vertical;"></textarea>
                            </div>
                            <button type="submit" class="magnetic-btn" style="margin-top: 1rem;">
                                <span>ОТПРАВИТЬ</span>
                            </button>
                        </form>
                        <div style="margin-top: 2rem; text-align: center;">
                            <p>Или свяжитесь с нами напрямую:</p>
                            <p style="margin-top: 0.5rem;">
                                <i class="fas fa-envelope" style="color: var(--neon-blue); margin-right: 0.5rem;"></i>
                                contact@nebulascent.com
                            </p>
                            <p>
                                <i class="fas fa-phone" style="color: var(--neon-blue); margin-right: 0.5rem;"></i>
                                +7 (XXX) XXX-XX-XX
                            </p>
                        </div>
                    </div>
                `;
                
                // Показ модального окна
                const modalOverlay = document.getElementById('modal-overlay');
                if (modalOverlay) {
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Анимация появления
                    gsap.from('.modal-perfume', {
                        opacity: 0,
                        y: 30,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    });
                }
                
                // Обработка формы
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                    contactForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        alert('Спасибо! Ваше сообщение отправлено. Это демо-версия формы.');
                        closeModal();
                    });
                }
            }
        });
    }
    
    // Кнопка "Узнать больше" в параллакс секции
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            showScienceInfo();
        });
    }
}

function showScienceInfo() {
    const modalContent = document.getElementById('modal-content');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <div class="modal-perfume">
            <h4>НАУКА ПАРФЮМЕРИИ</h4>
            
            <div style="display: flex; flex-wrap: wrap; gap: 2rem; margin: 2rem 0;">
                <div style="flex: 1; min-width: 250px;">
                    <h5 style="color: var(--neon-blue); margin-bottom: 1rem;">ХИМИЯ АРОМАТОВ</h5>
                    <p>Каждый парфюм — это сложная смесь химических соединений:</p>
                    <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                        <li>Терпены — отвечают за свежие и цитрусовые ноты</li>
                        <li>Альдегиды — создают эффект "шипучки"</li>
                        <li>Кетоны — отвечают за цветочные аккорды</li>
                        <li>Сложные эфиры — создают фруктовые ноты</li>
                    </ul>
                </div>
                
                <div style="flex: 1; min-width: 250px;">
                    <h5 style="color: var(--neon-purple); margin-bottom: 1rem;">ФИЗИКА РАСПРОСТРАНЕНИЯ</h5>
                    <p>Распространение аромата зависит от:</p>
                    <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                        <li>Температуры тела</li>
                        <li>Влажности воздуха</li>
                        <li>Молекулярной массы ароматических веществ</li>
                        <li>Концентрации парфюмерной композиции</li>
                    </ul>
                </div>
            </div>
            
            <div style="background: rgba(6, 182, 212, 0.1); padding: 1.5rem; border-radius: 10px; margin: 2rem 0;">
                <h5 style="color: var(--neon-green); margin-bottom: 1rem;">ИНТЕРАКТИВНЫЙ ЭКСПЕРИМЕНТ</h5>
                <p>Попробуйте смешать ароматические ноты:</p>
                
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    <button class="note-btn" data-note="citrus">Цитрус</button>
                    <button class="note-btn" data-note="wood">Древесина</button>
                    <button class="note-btn" data-note="spice">Пряности</button>
                    <button class="note-btn" data-note="flower">Цветы</button>
                </div>
                
                <div id="perfume-result" style="margin-top: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 5px; min-height: 50px;"></div>
            </div>
            
            <p style="text-align: center; font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); margin-top: 2rem;">
                Это демонстрация интерактивного контента. В реальном проекте здесь может быть больше научной информации.
            </p>
        </div>
    `;
    
    // Показ модального окна
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Анимация появления
        gsap.from('.modal-perfume', {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }
    
    // Интерактивные кнопки для эксперимента
    const noteButtons = document.querySelectorAll('.note-btn');
    const resultDiv = document.getElementById('perfume-result');
    
    if (noteButtons && resultDiv) {
        const selectedNotes = [];
        
        noteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const note = this.getAttribute('data-note');
                const noteNames = {
                    citrus: 'Цитрусовая свежесть',
                    wood: 'Древесная глубина',
                    spice: 'Пряная теплота',
                    flower: 'Цветочная нежность'
                };
                
                if (!selectedNotes.includes(note)) {
                    selectedNotes.push(note);
                    
                    // Анимация кнопки
                    gsap.to(this, {
                        scale: 1.2,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut"
                    });
                    
                    // Обновление результата
                    updatePerfumeResult(selectedNotes, resultDiv);
                }
            });
        });
    }
}

function updatePerfumeResult(notes, resultDiv) {
    const combinations = {
        'citrus,wood': 'Свежий и уверенный аромат для офиса',
        'citrus,flower': 'Легкий весенний парфюм',
        'wood,spice': 'Теплый и загадочный вечерний аромат',
        'citrus,wood,spice': 'Сложный и притягательный унисекс парфюм',
        'citrus,wood,spice,flower': 'Уникальный и многогранный шедевр'
    };
    
    const noteNames = {
        citrus: 'Цитрус',
        wood: 'Древесина',
        spice: 'Пряности',
        flower: 'Цветы'
    };
    
    const notesKey = notes.sort().join(',');
    let result = `<strong>Вы выбрали:</strong> ${notes.map(n => noteNames[n]).join(' + ')}<br><br>`;
    
    if (combinations[notesKey]) {
        result += `<strong>Результат:</strong> ${combinations[notesKey]}`;
    } else if (notes.length > 0) {
        result += `<strong>Результат:</strong> Интересная комбинация! Продолжайте экспериментировать.`;
    } else {
        result = 'Выберите ноты для создания своего аромата';
    }
    
    resultDiv.innerHTML = result;
    
    // Анимация появления результата
    gsap.fromTo(resultDiv, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
}

function initHoverEffects() {
    // Добавляем hover эффекты для всех интерактивных элементов
    const interactiveElements = document.querySelectorAll('button, .perfume-card, .option, .social-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    
    class Particle {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.reset();
            if (this.x < 0) this.reset();
            if (this.y > canvas.height) this.reset();
            if (this.y < 0) this.reset();
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
        connectParticles(particles);
        
        requestAnimationFrame(animateParticles);
    }
    
    function connectParticles(particlesArray) {
        const maxDistance = 100;
        
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Запуск анимации
    animateParticles();
}

function initAromaSelector() {
    const options = document.querySelectorAll('.option');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const selectorResult = document.getElementById('selector-result');
    
    if (!options.length || !progressFill || !progressText || !selectorResult) return;
    
    let currentStep = 1;
    const totalSteps = 3;
    const userChoices = {};
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Анимация выбора
            gsap.to(this, {
                scale: 1.1,
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                borderColor: 'var(--neon-blue)',
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Сброс других вариантов
            options.forEach(opt => {
                if (opt !== this) {
                    gsap.to(opt, {
                        scale: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        duration: 0.3
                    });
                }
            });
            
            // Сохранение выбора
            userChoices[`step${currentStep}`] = value;
            
            // Переход к следующему шагу
            setTimeout(() => {
                currentStep++;
                
                if (currentStep <= totalSteps) {
                    updateProgress(currentStep);
                    updateQuestion(currentStep);
                } else {
                    showResult(userChoices);
                }
            }, 500);
        });
    });
    
    function updateProgress(step) {
        const percentage = (step / totalSteps) * 100;
        gsap.to(progressFill, {
            width: `${percentage}%`,
            duration: 0.5,
            ease: "power2.out"
        });
        
        progressText.textContent = `Шаг ${step} из ${totalSteps}`;
    }
    
    function updateQuestion(step) {
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        const currentStepElement = document.querySelector(`[data-step="${step-1}"]`);
        
        if (currentStepElement && stepElement) {
            gsap.to(currentStepElement, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    currentStepElement.classList.remove('active');
                    stepElement.classList.add('active');
                    
                    gsap.fromTo(stepElement,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.3 }
                    );
                }
            });
        }
    }
    
    function showResult(choices) {
        // Простая логика подбора аромата
        let recommendedPerfume = null;
        
        if (choices.step1 === 'winter') {
            recommendedPerfume = 'Tom Ford Oud Wood';
        } else if (choices.step1 === 'summer') {
            recommendedPerfume = 'Creed Aventus';
        } else if (choices.step1 === 'spring') {
            recommendedPerfume = 'Bleu de Chanel';
        } else {
            recommendedPerfume = 'Dior Sauvage Elixir';
        }
        
        const resultCard = document.getElementById('result-card');
        if (resultCard) {
            resultCard.innerHTML = `
                <h4 style="color: var(--neon-blue); margin-bottom: 1rem;">${recommendedPerfume}</h4>
                <p>На основе ваших предпочтений мы рекомендуем этот аромат.</p>
                <button class="magnetic-btn" style="margin-top: 1.5rem;">
                    <span>УЗНАТЬ ПОДРОБНЕЕ</span>
                </button>
            `;
            
            gsap.fromTo(selectorResult,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }
    
    // Инициализация прогресса
    updateProgress(currentStep);
}

function playSound(type) {
    // Создаем звуковые эффекты динамически
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'click') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
        
        if (type === 'hover') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        console.log('Аудио контекст не поддерживается');
    }
}

// Оптимизация для мобильных устройств
function optimizeForMobile() {
    if ('ontouchstart' in window) {
        // Уменьшаем количество частиц на мобильных
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            canvas.style.display = 'none'; // Скрываем на мобильных для производительности
        }
        
        // Уменьшаем сложность анимаций
        gsap.globalTimeline.timeScale(1.2);
    }
}

// Запускаем оптимизацию после загрузки
setTimeout(optimizeForMobile, 1000);

// Ленивая загрузка изображений
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.card-bg');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
                if (src && src[1]) {
                    // Изображение уже загружено через CSS
                    observer.unobserve(img);
                }
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Добавляем стили для ripple эффекта
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card-inner.flipped {
        transform: rotateY(180deg);
    }
    
    .note-btn {
        padding: 0.5rem 1rem;
        background: rgba(6, 182, 212, 0.2);
        border: 1px solid var(--neon-blue);
        border-radius: 20px;
        color: var(--neon-blue);
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Exo 2', sans-serif;
    }
    
    .note-btn:hover {
        background: rgba(6, 182, 212, 0.4);
    }
`;
document.head.appendChild(style);

// Инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    // Помечаем, что страница полностью загружена
    document.body.classList.add('fully-loaded');
    
    // Запускаем финальные анимации
    gsap.to('.floating-molecules .molecule', {
        opacity: 0.3,
        duration: 2,
        stagger: 0.1,
        ease: "power2.out"
    });

       // Запускаем финальные оптимизации
       setTimeout(() => {
        // Ленивая загрузка оставшихся изображений
        loadLazyImages();
        
        // Оптимизация анимаций
        optimizeAnimations();
    }, 1000);
});

// Функция для ленивой загрузки изображений
function loadLazyImages() {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.onload = () => {
            img.classList.add('loaded');
            gsap.fromTo(img,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
        };
    });
}

// Функция для оптимизации анимаций после загрузки
function optimizeAnimations() {
    // Пауза невидимых анимаций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Приостановка анимаций вне видимости
                const animations = entry.target.getAnimations();
                animations.forEach(animation => {
                    animation.pause();
                });
            } else {
                // Возобновление анимаций при появлении
                const animations = entry.target.getAnimations();
                animations.forEach(animation => {
                    animation.play();
                });
            }
        });
    });
}

    // Наблюдаем за анимированными элементами
    document.querySelectorAll('.perfume-card, .molecule, .formula').forEach(el => {
        observer.observe(el);
    });