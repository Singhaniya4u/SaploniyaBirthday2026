document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('surpriseBtn');
    const balloonContainer = document.getElementById('balloon-container');

    // Surprise Button
    btn.addEventListener('click', () => {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.7, x: 0.15 },
            colors: ['#ff477e', '#7000ff', '#ffffff', '#ffb6c1', '#ffde4d']
        });

        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.7, x: 0.85 },
            colors: ['#ff477e', '#7000ff', '#ffffff', '#ffb6c1', '#ffde4d']
        });

        btn.innerText = "Yay! Happy Birthday! 💖";
    });

    const balloonColors = [
        'rgba(255, 71, 126, 0.75)',
        'rgba(112, 0, 255, 0.7)',
        'rgba(255, 182, 193, 0.8)',
        'rgba(255, 215, 0, 0.75)',
        'rgba(74, 203, 241, 0.75)',
        'rgba(255, 107, 107, 0.8)',
        'rgba(114, 221, 171, 0.8)'
    ];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('individual-balloon');

        const width = Math.random() * 50 + 35;
        const height = width * 1.25;
        const startPositionX = Math.random() * (window.innerWidth - 80);
        const duration = Math.random() * 5 + 8;

        const randomColor =
            balloonColors[Math.floor(Math.random() * balloonColors.length)];

        balloon.style.width = `${width}px`;
        balloon.style.height = `${height}px`;
        balloon.style.left = `${startPositionX}px`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.backgroundColor = randomColor;

        function popBalloon(e) {
            e.preventDefault();
            e.stopPropagation();

            if (balloon.classList.contains('pop')) return;

            balloon.classList.add('pop');

            const rect = balloon.getBoundingClientRect();

            confetti({
                particleCount: 15,
                spread: 60,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                colors: [randomColor, '#ffffff']
            });

            setTimeout(() => {
                balloon.remove();
            }, 250);
        }

        // Works on mobile + desktop
        balloon.addEventListener('pointerdown', popBalloon);

        balloonContainer.appendChild(balloon);

        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
            }
        }, duration * 1000);
    }

    // Create some balloons immediately
    for (let i = 0; i < 15; i++) {
        setTimeout(createBalloon, i * 300);
    }

    // Keep generating balloons
    setInterval(createBalloon, 400);
});
