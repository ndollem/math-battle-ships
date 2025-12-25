/* ============================================
   ANIMATION MANAGER - Perang Kapal Angka
   Using individual images instead of sprite sheets
   ============================================ */

   const AnimationManager = {
    canvas: null,
    ctx: null,
    activeAnimations: [],
    imageCache: {},
    imagesLoaded: false,
    
    /**
     * Initialize animation system
     */
    init: function() {
        console.log('Initializing AnimationManager...');
        
        this.canvas = document.getElementById('attackCanvas');
        if (!this.canvas) {
            console.error('Attack canvas not found!');
            return false;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.preloadImages();
        this.startAnimationLoop();
        
        return true;
    },
    
    /**
     * Preload all images
     */
    preloadImages: function() {
        const images = {
            missile: 'images/misile.png',
            explode: 'images/explode.png'
        };
        
        let loadedCount = 0;
        const totalImages = Object.keys(images).length;
        
        Object.keys(images).forEach(key => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                console.log(`✅ ${key} loaded (${img.width}x${img.height})`);
                
                if (loadedCount === totalImages) {
                    this.imagesLoaded = true;
                    console.log('✅ All animation images loaded successfully');
                }
            };
            img.onerror = () => {
                console.error(`❌ Failed to load ${key} from ${images[key]}`);
            };
            img.src = images[key];
            this.imageCache[key] = img;
        });
    },
    
    /**
     * Animation loop
     */
    startAnimationLoop: function() {
        const animate = () => {
            this.update();
            this.render();
            requestAnimationFrame(animate);
        };
        animate();
    },
    
    /**
     * Update all active animations
     */
    update: function() {
        this.activeAnimations = this.activeAnimations.filter(anim => {
            anim.update();
            return !anim.isComplete;
        });
    },
    
    /**
     * Render all active animations
     */
    render: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.imagesLoaded) return;
        
        this.activeAnimations.forEach(anim => {
            anim.render(this.ctx, this.imageCache);
        });
    },
    
    /**
     * Animate attack from attacker to defender
     * @param {string} attacker - 'player' or 'enemy'
     * @param {string} damageType - 'critical', 'fast', 'normal'
     */
    animateAttack: function(attacker, damageType = 'normal') {
        const attackerPos = this.getShipPosition(attacker);
        const defenderPos = this.getShipPosition(attacker === 'player' ? 'enemy' : 'player');
        
        // Create projectile animation
        const projectile = new ProjectileAnimation(
            attackerPos.x, 
            attackerPos.y,
            defenderPos.x, 
            defenderPos.y,
            damageType,
            attacker
        );
        
        this.activeAnimations.push(projectile);
        
        // Trigger ship attack animation
        this.triggerShipAnimation(attacker, 'attacking');
        
        // Schedule explosion at impact
        setTimeout(() => {
            this.animateExplosion(defenderPos.x, defenderPos.y, damageType);
            this.triggerShipAnimation(attacker === 'player' ? 'enemy' : 'player', 'hit');
        }, projectile.duration);
        
        return projectile.duration;
    },
    
    /**
     * Animate explosion at position
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} damageType - Type of damage
     */
    animateExplosion: function(x, y, damageType = 'normal') {
        const explosion = new ExplosionAnimation(x, y, damageType);
        this.activeAnimations.push(explosion);
    },
    
    /**
     * Get ship center position
     * @param {string} ship - 'player' or 'enemy'
     * @returns {object} { x, y } position
     */
    getShipPosition: function(ship) {
        const shipElement = document.getElementById(ship === 'player' ? 'playerShip' : 'enemyShip');
        if (!shipElement) return { x: 0, y: 0 };
        
        const rect = shipElement.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        return {
            x: rect.left - canvasRect.left + rect.width / 2,
            y: rect.top - canvasRect.top + rect.height / 2
        };
    },
    
    /**
     * Trigger CSS animation on ship
     * @param {string} ship - 'player' or 'enemy'
     * @param {string} animationType - 'attacking' or 'hit'
     */
    triggerShipAnimation: function(ship, animationType) {
        const shipElement = document.getElementById(ship === 'player' ? 'playerShip' : 'enemyShip');
        if (!shipElement) return;
        
        shipElement.classList.add(animationType);
        setTimeout(() => {
            shipElement.classList.remove(animationType);
        }, 500);
    },
    
    /**
     * Update HP bar animation
     * @param {string} target - 'player' or 'enemy'
     * @param {number} newHP - New HP value
     * @param {number} maxHP - Maximum HP
     */
    updateHPBar: function(target, newHP, maxHP = 100) {
        const hpFill = document.getElementById(target === 'player' ? 'playerHPFill' : 'enemyHPFill');
        const hpText = document.getElementById(target === 'player' ? 'playerHPText' : 'enemyHPText');
        
        if (hpFill) {
            const percentage = (newHP / maxHP) * 100;
            hpFill.style.width = percentage + '%';
            
            // Change color based on HP
            if (percentage > 60) {
                hpFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
            } else if (percentage > 30) {
                hpFill.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
            } else {
                hpFill.style.background = 'linear-gradient(90deg, #ef4444, #b91c1c)';
            }
        }
        
        if (hpText) {
            hpText.textContent = `HP: ${Math.max(0, newHP)}/${maxHP}`;
        }
    },
    
    /**
     * Show feedback message
     * @param {string} message - Message text
     * @param {string} type - 'correct', 'wrong', or 'info'
     */
    showFeedback: function(message, type = 'info') {
        const feedbackElement = document.getElementById('feedbackMessage');
        if (!feedbackElement) return;
        
        feedbackElement.textContent = message;
        feedbackElement.className = 'feedback-message show ' + type;
        
        setTimeout(() => {
            feedbackElement.classList.remove('show');
        }, 2000);
    },
    
    /**
     * Show answer indicator (using CSS icons)
     * @param {string} target - 'player' or 'enemy'
     * @param {boolean} isCorrect - Whether answer was correct
     */
    showAnswerIndicator: function(target, isCorrect) {
        const indicator = document.getElementById(target === 'player' ? 'playerAnswerIndicator' : 'enemyAnswerIndicator');
        if (!indicator) return;
        
        // Use CSS-based icons (defined in game.css)
        indicator.className = 'answer-indicator show ' + (isCorrect ? 'correct' : 'wrong');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 1500);
    },
    
    /**
     * Shake element (for wrong answer)
     * @param {string} elementId - Element ID to shake
     */
    shakeElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        AnimationHelper.shake(element);
    },
    
    /**
     * Clear all animations
     */
    clearAnimations: function() {
        this.activeAnimations = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
};

/* ============================================
   PROJECTILE ANIMATION (Using Missile Image)
   ============================================ */
class ProjectileAnimation {
    constructor(startX, startY, endX, endY, damageType, attacker) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.x = startX;
        this.y = startY;
        this.damageType = damageType;
        this.attacker = attacker;
        this.progress = 0;
        this.duration = 500; // milliseconds
        this.speed = 1 / this.duration;
        this.isComplete = false;
        
        // Calculate trajectory
        this.dx = endX - startX;
        this.dy = endY - startY;
        this.angle = Math.atan2(this.dy, this.dx);
        
        // Size based on damage type
        this.width = damageType === 'critical' ? 80 : 60;
        this.height = damageType === 'critical' ? 40 : 30;
    }
    
    update() {
        this.progress += this.speed * 16; // ~60fps (16ms per frame)
        
        if (this.progress >= 1) {
            this.progress = 1;
            this.isComplete = true;
        }
        
        // Parabolic arc for realistic trajectory
        const linearProgress = this.progress;
        const parabola = -4 * Math.pow(linearProgress - 0.5, 2) + 1;
        
        this.x = this.startX + this.dx * linearProgress;
        this.y = this.startY + this.dy * linearProgress - parabola * 40; // Arc height
    }
    
    render(ctx, imageCache) {
        const img = imageCache.missile;
        if (!img || !img.complete) return;
        
        ctx.save();
        
        // Translate to projectile position
        ctx.translate(this.x, this.y);
        
        // Rotate based on trajectory
        ctx.rotate(this.angle);
        
        // Add glow effect for critical hits
        if (this.damageType === 'critical') {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ff0000';
        } else if (this.damageType === 'fast') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffa500';
        }
        
        // Draw missile image
        ctx.drawImage(
            img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        
        ctx.restore();
    }
}

/* ============================================
   EXPLOSION ANIMATION (Using Explode Image)
   ============================================ */
class ExplosionAnimation {
    constructor(x, y, damageType) {
        this.x = x;
        this.y = y;
        this.damageType = damageType;
        this.frame = 0;
        this.maxFrames = 15;
        this.frameDelay = 2;
        this.frameCounter = 0;
        this.isComplete = false;
        this.scale = 0;
        this.maxScale = damageType === 'critical' ? 1.5 : 1.0;
        this.alpha = 1;
        this.rotation = 0;
    }
    
    update() {
        this.frameCounter++;
        
        if (this.frameCounter >= this.frameDelay) {
            this.frameCounter = 0;
            this.frame++;
            
            // Scale up then down for explosion effect
            const progress = this.frame / this.maxFrames;
            if (progress < 0.3) {
                // Rapid expansion
                this.scale = (progress / 0.3) * this.maxScale;
            } else {
                // Slow fade
                this.scale = this.maxScale * (1 - (progress - 0.3) / 0.7);
            }
            
            // Fade out
            this.alpha = 1 - progress;
            
            // Slight rotation for dynamic effect
            this.rotation += 0.1;
            
            if (this.frame >= this.maxFrames) {
                this.isComplete = true;
            }
        }
    }
    
    render(ctx, imageCache) {
        const img = imageCache.explode;
        if (!img || !img.complete) return;
        
        ctx.save();
        
        // Set transparency
        ctx.globalAlpha = this.alpha;
        
        // Translate to explosion center
        ctx.translate(this.x, this.y);
        
        // Rotate for dynamic effect
        ctx.rotate(this.rotation);
        
        const size = 120 * this.scale;
        
        // Add flash effect for critical hits
        if (this.damageType === 'critical' && this.frame < 5) {
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#ffff00';
        } else if (this.damageType === 'fast' && this.frame < 4) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ffa500';
        }
        
        // Draw explosion image
        ctx.drawImage(
            img,
            -size / 2,
            -size / 2,
            size,
            size
        );
        
        ctx.restore();
    }
}

// Export to global scope
window.AnimationManager = AnimationManager;

console.log('✅ AnimationManager with individual images loaded successfully');