// Garante que todo o código só será executado após o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {

    // 1. INICIALIZAÇÃO DO PARTICLES.JS (FUNDO INTERATIVO)
    function initParticles() {
        // Verifica se o elemento #particles-js existe na página atual
        if (document.getElementById('particles-js')) {
            if (typeof particlesJS === 'undefined') {
                console.error('Particles.js não foi carregado. Verifique o link do script no HTML.');
                return;
            }
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffffff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.4, "random": true },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#3399FF", "opacity": 0.2, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                    "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } }
                },
                "retina_detect": true
            });
        }
    }

    // 2. EFEITO DE "MÁQUINA DE ESCREVER"
    function setupTypingEffect() {
        const typingElement = document.querySelector('.typing-effect');
        // Só executa se o elemento existir na página
        if (!typingElement) return; 
        
        const words = ["resultado.", "valor para o negócio.", "decisões estratégicas.", "I.A."];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingElement.textContent = currentChar;
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) { wordIndex = (wordIndex + 1) % words.length; }
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // 3. CABEÇALHO DINÂMICO
    function setupScrollHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 4. ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA
    function setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(element => observer.observe(element));
    }

    // --- EXECUÇÃO DAS FUNÇÕES ---
    initParticles();
    setupTypingEffect();
    setupScrollHeader();
    setupScrollReveal();
});
