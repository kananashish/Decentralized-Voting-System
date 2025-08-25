/**
 * Dynamic Blockchain Network Background (v2)
 *
 * This script creates a canvas-based animation of interconnected nodes,
 * simulating a neural network or blockchain plexus. It's responsive
 * and includes performance optimizations for window resizing.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('blockchain-background');
    if (!canvas) {
        console.error('Canvas element with ID "blockchain-background" not found.');
        return;
    }
    const ctx = canvas.getContext('2d');

    let particles = [];
    
    // Debounce function to limit how often a function gets called.
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Set canvas size to fill the window
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    // Particle class to create and manage individual nodes
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Method to draw a single particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Method to update particle position and handle collisions with edges
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create and initialize the particle array
    function init() {
        particles = [];
        // Adjust particle density based on screen size for better performance
        let numberOfParticles = (canvas.height * canvas.width) / 12000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(0, 122, 255, 0.8)';
            particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Draw lines between nearby particles
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                             + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                    opacityValue = 1 - (distance / 25000);
                    ctx.strokeStyle = `rgba(191, 90, 242, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connect();
    }

    // Debounced resize handler for performance
    const handleResize = debounce(() => {
        setCanvasSize();
        init();
    }, 250);

    window.addEventListener('resize', handleResize);

    init();
    animate();
});
