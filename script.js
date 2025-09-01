class CountdownTimer {
    constructor() {
        this.targetDate = this.calculateTargetDate();
        this.elements = this.initializeElements();
        this.startCountdown();
        this.updateTargetDateDisplay();
    }

    calculateTargetDate() {
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setMonth(now.getMonth() + 6);
        return targetDate;
    }

    initializeElements() {
        return {
            months: document.getElementById('months'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            targetDateDisplay: document.getElementById('target-date-display'),
            progressFill: document.getElementById('progress-fill'),
            progressPercentage: document.getElementById('progress-percentage')
        };
    }

    updateTargetDateDisplay() {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        this.elements.targetDateDisplay.textContent = this.targetDate.toLocaleDateString('en-US', options);
    }

    calculateTimeRemaining() {
        const now = new Date();
        const difference = this.targetDate - now;

        if (difference <= 0) {
            return {
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        // Calculate months (approximate)
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const remainingAfterMonths = difference % (1000 * 60 * 60 * 24 * 30.44);
        
        // Calculate days
        const days = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24));
        const remainingAfterDays = remainingAfterMonths % (1000 * 60 * 60 * 24);
        
        // Calculate hours
        const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
        const remainingAfterHours = remainingAfterDays % (1000 * 60 * 60);
        
        // Calculate minutes
        const minutes = Math.floor(remainingAfterHours / (1000 * 60));
        const remainingAfterMinutes = remainingAfterHours % (1000 * 60);
        
        // Calculate seconds
        const seconds = Math.floor(remainingAfterMinutes / 1000);

        return { months, days, hours, minutes, seconds };
    }

    updateProgress() {
        const now = new Date();
        const totalDuration = this.targetDate - new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const elapsed = totalDuration - (this.targetDate - now);
        const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
        
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.progressPercentage.textContent = `${Math.round(progress)}%`;
    }

    updateDisplay(timeRemaining) {
        const previousValues = {
            months: this.elements.months.textContent,
            days: this.elements.days.textContent,
            hours: this.elements.hours.textContent,
            minutes: this.elements.minutes.textContent,
            seconds: this.elements.seconds.textContent
        };

        // Update display with leading zeros
        this.elements.months.textContent = String(timeRemaining.months).padStart(2, '0');
        this.elements.days.textContent = String(timeRemaining.days).padStart(2, '0');
        this.elements.hours.textContent = String(timeRemaining.hours).padStart(2, '0');
        this.elements.minutes.textContent = String(timeRemaining.minutes).padStart(2, '0');
        this.elements.seconds.textContent = String(timeRemaining.seconds).padStart(2, '0');

        // Add animation class if values changed
        Object.keys(timeRemaining).forEach(unit => {
            if (previousValues[unit] !== this.elements[unit].textContent) {
                this.elements[unit].classList.add('animate');
                setTimeout(() => {
                    this.elements[unit].classList.remove('animate');
                }, 600);
            }
        });
    }

    startCountdown() {
        const updateTimer = () => {
            const timeRemaining = this.calculateTimeRemaining();
            this.updateDisplay(timeRemaining);
            this.updateProgress();

            // Check if countdown is complete
            if (timeRemaining.months === 0 && 
                timeRemaining.days === 0 && 
                timeRemaining.hours === 0 && 
                timeRemaining.minutes === 0 && 
                timeRemaining.seconds === 0) {
                this.handleCountdownComplete();
                return;
            }
        };

        // Update immediately
        updateTimer();
        
        // Update every second
        setInterval(updateTimer, 1000);
    }

    handleCountdownComplete() {
        // Add celebration effect
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)';
        
        // Update title
        const title = document.querySelector('.title');
        title.textContent = '🎉 Time is Up! 🎉';
        title.style.animation = 'pulse 1s infinite';
        
        // Update subtitle
        const subtitle = document.querySelector('.subtitle');
        subtitle.textContent = 'The countdown has reached zero!';
        
        // Add confetti effect (simple version)
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }
}

// Add confetti fall animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize the countdown when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            // Spacebar refreshes the page
            window.location.reload();
        }
    });

    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        countdownItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                item.style.transform = 'scale(0.95)';
            });
            
            item.addEventListener('touchend', () => {
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            });
        });
    }
});
