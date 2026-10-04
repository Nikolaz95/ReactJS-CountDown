// Small canvas fireworks engine: rockets fly up, burst into sparks, sparks fall and fade
const COLORS = ['#ff5e7e', '#ffd166', '#8f84ff', '#5fc4a8', '#4cc9f0', '#ff9f43', '#ff7ad9'];
const GRAVITY = 0.12;
const SPARK_GRAVITY = 0.05;
const FRICTION = 0.985;

const random = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Starts the show on canvas. Returns a stop function. onDone runs when the last spark is gone
export const startFireworks = (canvas, { duration = 30000, onDone } = {}) => {
    const ctx = canvas.getContext('2d');
    const startTime = performance.now();
    let rockets = [];
    let sparks = [];
    let nextLaunch = 0;
    let frame;

    const resize = () => {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const launchRocket = () => {
        const height = window.innerHeight;
        rockets.push({
            x: window.innerWidth * random(0.15, 0.85),
            y: height,
            vx: random(-1, 1),
            // Speed that makes the rocket burst somewhere in the top half
            vy: -Math.sqrt(2 * GRAVITY * height * random(0.5, 0.85)),
            color: pick(COLORS),
        });
    };

    const explode = ({ x, y, color }) => {
        const count = Math.round(random(60, 100));
        const power = random(2.5, 5) * Math.min(1.4, window.innerWidth / 700 + 0.4);
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = power * random(0.4, 1);
            sparks.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                fade: random(0.008, 0.014),
                color: Math.random() < 0.8 ? color : pick(COLORS),
            });
        }
    };

    // Short line in the direction of travel, with a soft wider line behind it as glow
    const drawStreak = ({ x, y, vx, vy, color }, alpha, width) => {
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x - vx * 4, y - vy * 4);
        ctx.lineTo(x, y);
        ctx.globalAlpha = alpha * 0.25;
        ctx.lineWidth = width * 3;
        ctx.stroke();
        ctx.globalAlpha = alpha;
        ctx.lineWidth = width;
        ctx.stroke();
    };

    const tick = (now) => {
        const isLaunching = now - startTime < duration;

        if (isLaunching && now >= nextLaunch) {
            launchRocket();
            if (Math.random() < 0.3) launchRocket();
            nextLaunch = now + random(350, 900);
        }

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.globalCompositeOperation = 'lighter';

        rockets = rockets.filter(rocket => {
            rocket.x += rocket.vx;
            rocket.y += rocket.vy;
            rocket.vy += GRAVITY;
            drawStreak(rocket, 1, 3);
            if (rocket.vy >= -1) {
                explode(rocket);
                return false;
            }
            return true;
        });

        sparks = sparks.filter(spark => {
            spark.vx *= FRICTION;
            spark.vy = spark.vy * FRICTION + SPARK_GRAVITY;
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.life -= spark.fade;
            if (spark.life <= 0) return false;
            drawStreak(spark, spark.life, 2.5);
            return true;
        });

        if (!isLaunching && rockets.length === 0 && sparks.length === 0) {
            onDone?.();
            return;
        }
        frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
    };
};
