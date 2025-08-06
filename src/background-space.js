
    (() => {
        // --- CONFIGURATION ---
        const NUM_STARS = 450;
        const NUM_PLANETS = 7;
        const NUM_SATELLITES = 8;
        const NUM_UFOS = 7;
        const NUM_SHOOTING_STARS = 1; // Reduced number
        const SCROLL_MULTIPLIER = 1.5;
        const SHOOTING_STAR_COOLDOWN = 500; // 500ms between scroll-triggered stars

        // --- SETUP ---
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const setupEnvironment = () => {
            document.body.prepend(canvas);
            canvas.id = 'space-background';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '-1';
            canvas.style.pointerEvents = 'none';
        };

        let width, height;
        let stars = [], planets = [], satellites = [], ufos = [], shootingStars = [];
        let scrollY = window.scrollY;
        let lastShootingStarTime = 0;

        const random = (min, max) => Math.random() * (max - min) + min;

        // --- OBJECT CREATION & RESETTING ---
        const createUniverse = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const contentHeight = document.body.scrollHeight;

            stars = [], planets = [], satellites = [], ufos = [], shootingStars = [];

            for (let i = 0; i < NUM_STARS; i++) {
                const x = random(0, width);
                const y = random(0, height);
                const z = random(1, 5);
                stars.push({ x, y, z, targetX: x, targetY: y, targetZ: z, baseRadius: random(0.5, 1.5), parallaxFactor: random(0.8, 3), easing: random(0.0001, 0.0005) });
            }

            for (let i = 0; i < NUM_PLANETS; i++) {
                const x = random(0, width);
                const y = random(height * 0.2, height);
                const z = random(5, 15); // Closer z-range for larger planets
                planets.push({ x, y, z, targetX: x, targetY: y, targetZ: z, baseRadius: random(150, 500), parallaxFactor: random(5, 15), color: `hsl(${random(10, 360)}, 70%, 60%)`, easing: random(0.00005, 0.0002) });
            }
            
            for (let i = 0; i < NUM_SATELLITES; i++) {
                const x = random(0, width);
                const y = random(0, height);
                const z = random(2, 7); // Closer z-range
                satellites.push({ x, y, z, targetX: x, targetY: y, targetZ: z, baseSize: random(50, 100), parallaxFactor: random(2, 5), easing: random(0.0005, 0.001) });
            }

            for (let i = 0; i < NUM_UFOS; i++) {
                const x = random(0, width);
                const y = random(0, height);
                const z = random(3, 8); // Closer z-range
                ufos.push({ x, y, z, targetX: x, targetY: y, targetZ: z, baseSize: random(80, 150), parallaxFactor: random(3, 7), easing: random(0.0008, 0.002) });
            }

            for (let i = 0; i < NUM_SHOOTING_STARS; i++) {
                shootingStars.push({ isActive: false });
            }
        };

        const triggerShootingStar = (star) => {
            star.isActive = true;
            star.z = random(0.5, 2);
            const fromLeft = Math.random() < 0.5;
            
            star.x = fromLeft ? -50 : width + 50; // Start off-screen
            star.y = scrollY + random(0, height); // Start somewhere in the current view's y-range
            
            star.vx = random(5, 10) * (fromLeft ? 1 : -1);
            star.vy = random(-1, 1); // Slight vertical drift
            
            star.len = random(150, 250) / star.z;
            return star;
        };

        // --- UPDATE & DRAW ---
        const updatePositions = () => {
            const updateEntity = (entity) => {
                entity.x += (entity.targetX - entity.x) * entity.easing;
                entity.y += (entity.targetY - entity.y) * entity.easing;
                entity.z += (entity.targetZ - entity.z) * entity.easing;

                const distToTarget = Math.hypot(entity.targetX - entity.x, entity.targetY - entity.y, entity.targetZ - entity.z);
                if (distToTarget < 50) {
                    const range = 200;
                    entity.targetX = entity.x + random(-range, range);
                    entity.targetY = entity.y + random(-range, range);
                    entity.targetZ = Math.max(0.5, entity.z + random(-2, 2));
                }
            };

            const wrapEntity = (entity) => {
                // Wrap around the viewport height
                if (entity.y < -entity.baseRadius * 2) {
                    entity.y += height + entity.baseRadius * 4; // Add extra to ensure it appears fully
                } else if (entity.y > height + entity.baseRadius * 2) {
                    entity.y -= height + entity.baseRadius * 4; // Subtract extra to ensure it appears fully
                }
            };

            [stars, planets, satellites, ufos].forEach(arr => arr.forEach(entity => {
                updateEntity(entity);
                wrapEntity(entity);
            }));

            shootingStars.forEach(s => {
                if (s.isActive) {
                    s.x += s.vx;
                    s.y += s.vy;
                    const displayY = s.y - scrollY;
                    if (displayY < -s.len || displayY > height + s.len || s.x < -s.len || s.x > width + s.len) {
                        s.isActive = false;
                    }
                }
            });
        };
        
        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            planets.forEach(p => {
                const displayY = p.y;
                const displayRadius = p.baseRadius / p.z;
                if (displayRadius < 1) return;
                ctx.save();
                ctx.shadowColor = p.color;
                ctx.shadowBlur = displayRadius * 0.7;
                ctx.beginPath();
                ctx.arc(p.x, displayY, displayRadius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                const shadowGradient = ctx.createRadialGradient(p.x + displayRadius * 0.3, displayY - displayRadius * 0.3, displayRadius * 0.5, p.x, displayY, displayRadius * 1.5);
                shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
                shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = shadowGradient;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(p.x - displayRadius * 0.4, displayY - displayRadius * 0.4, displayRadius * 0.15, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.fill();
                ctx.restore();
            });

            stars.forEach(s => {
                if (Math.random() > 0.997) s.alpha = random(0.5, 1);
                const displayY = s.y;
                const displayRadius = s.baseRadius / s.z;
                if (displayRadius < 0.1) return;
                ctx.beginPath();
                ctx.arc(s.x, displayY, displayRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha || 1})`;
                ctx.fill();
            });

            const midLayerObjects = [...satellites, ...ufos];
            midLayerObjects.forEach(obj => {
                const displayY = obj.y;
                const displaySize = obj.baseSize / obj.z;
                if (displaySize < 1) return;
                ctx.save();
                ctx.translate(obj.x, displayY);
                const angle = Math.atan2(obj.targetY - obj.y, obj.targetX - obj.x);
                ctx.rotate(angle);
                if (obj.baseSize && !obj.color) { // UFO
                    ctx.fillStyle = '#9E9E9E';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, displaySize / 2, displaySize / 4, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
                    ctx.beginPath();
                    ctx.arc(0, -displaySize * 0.1, displaySize / 4, Math.PI, 0);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(0, 0, displaySize / 3, displaySize / 6, 0, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
                    ctx.shadowColor = 'cyan';
                    ctx.shadowBlur = 10;
                    ctx.fill();
                } else { // Satellite
                    ctx.fillStyle = '#c0c0c0';
                    ctx.fillRect(-displaySize / 4, -displaySize / 2, displaySize / 2, displaySize);
                    ctx.fillStyle = '#1e90ff';
                    ctx.fillRect(-displaySize / 2, -displaySize / 8, displaySize, displaySize / 4);
                }
                ctx.restore();
            });

            shootingStars.forEach(s => {
                if (s.isActive) {
                    ctx.save();
                    const displayY = s.y;
                    const gradient = ctx.createLinearGradient(s.x, displayY, s.x - s.vx * s.len / 10, displayY - s.vy * s.len / 10);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${1 / s.z})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2 / s.z;
                    ctx.beginPath();
                    ctx.moveTo(s.x, displayY);
                    ctx.lineTo(s.x - s.vx * s.len / 10, displayY - s.vy * s.len / 10);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        };
        
        const animate = () => {
            updatePositions();
            draw();
            requestAnimationFrame(animate);
        };

        // --- EVENT LISTENERS ---
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
            const now = Date.now();
            if (now - lastShootingStarTime > SHOOTING_STAR_COOLDOWN) {
                const inactiveStar = shootingStars.find(s => !s.isActive);
                if (inactiveStar) {
                    triggerShootingStar(inactiveStar);
                    lastShootingStarTime = now;
                }
            }
        }, { passive: true });

        let resizeTimeout;
        window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(createUniverse, 200); });

        // --- INITIALIZATION ---
        setupEnvironment();
        createUniverse();
        animate();

    })();