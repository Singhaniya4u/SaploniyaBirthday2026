document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('surpriseBtn');
    const balloonContainer = document.getElementById('balloon-container');

    // 1. Big Surprise Button Logic
    btn.addEventListener('click', () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7, x: 0.15 },
            colors: ['#ff477e', '#7000ff', '#ffffff', '#ffb6c1', '#ffde4d']
        });

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7, x: 0.85 },
            colors: ['#ff477e', '#7000ff', '#ffffff', '#ffb6c1', '#ffde4d']
        });
        
        btn.innerText = "Yay! Happy Birthday! 💖";
    });

    // Festive Color Palette
    const balloonColors = [
        'rgba(255, 71, 126, 0.75)',  /* Vibrant Pink */
        'rgba(112, 0, 255, 0.7)',    /* Electric Purple */
        'rgba(255, 182, 193, 0.8)',  /* Pastel Rose */
        'rgba(255, 215, 0, 0.75)',   /* Festive Gold */
        'rgba(74, 203, 241, 0.75)',  /* Sky Blue */
        'rgba(255, 107, 107, 0.8)',  /* Coral Red */
        'rgba(114, 221, 171, 0.8)'   /* Soft Mint Green */
    ];

    // 2. Dynamic Balloon Generator
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('individual-balloon');

        // Randomize dimensions & placement
        const width = Math.random() * 50 + 35; // 35px to 85px wide
        const height = width * 1.25;           // Balanced oval ratio
        const startPositionX = Math.random() * (window.innerWidth - 80);
        const duration = Math.random() * 5 + 8; // Speed spectrum (8s to 13s)
        const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];

        balloon.style.width = `${width}px`;
        balloon.style.height = `${height}px`;
        balloon.style.left = `${startPositionX}px`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.backgroundColor = randomColor;

        // "Tickle & Pop" Action handler
        const handlePop = () => {
            if (!balloon.classList.contains('pop')) {
                balloon.classList.add('pop');
                
                // Micro-confetti pop flash using the balloon's specific color theme
                const rect = balloon.getBoundingClientRect();
                confetti({
                    particleCount: 12,
                    spread: 50,
                    origin: { 
                        x: (rect.left + rect.width / 2) / window.innerWidth, 
                        y: (rect.top + rect.height / 2) / window.innerHeight 
                    },
                    colors: [randomColor, '#ffffff']
                });

                // Clear element after popping animation completes
                setTimeout(() => {
                    balloon.remove();
                }, 250);
            }
        };

        balloon.addEventListener('click', handlePop);
        balloon.addEventListener('touchstart', handlePop); // Smooth execution for mobile screen interactions

        balloonContainer.appendChild(balloon);

        // Delete hidden off-screen balloons automatically
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
            }
        }, duration * 1000);
    }

    // Interval loop for spawning balloons continuously
    setInterval(createBalloon, 600);
});