document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('[data-back]');
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = './';
            }
        });
    }

    // Generate additional twinkling stars for ambience
    const scene = document.querySelector('.scene');
    if (scene) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 24; i++) {
            const star = document.createElement('span');
            star.className = 'twinkle';
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 1 + Math.random() * 2;
            const delay = Math.random() * 3;
            star.style.left = x + '%';
            star.style.top = y + '%';
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = delay + 's';
            fragment.appendChild(star);
        }
        scene.appendChild(fragment);
    }
});

