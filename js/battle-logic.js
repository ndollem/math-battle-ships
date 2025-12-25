/* ============================================
   BATTLE LOGIC - Perang Kapal Angka
   Handles damage calculation and combat mechanics
   ============================================ */

const BattleLogic = {
    // Ship HP
    maxHP: 100,
    playerHP: 100,
    enemyHP: 100,
    
    // Damage settings
    baseDamage: 15,
    fastBonusDamage: 10,
    criticalDamage: 25,
    
    // Time thresholds (in seconds)
    fastThreshold: 3,      // Under 3 seconds = fast
    criticalThreshold: 2,  // Under 2 seconds = critical
    
    // Battle history
    battleHistory: [],
    
    /**
     * Initialize battle system
     */
    init: function() {
        this.playerHP = this.maxHP;
        this.enemyHP = this.maxHP;
        this.battleHistory = [];
    },
    
    /**
     * Calculate damage based on response time and correctness
     * @param {number} responseTime - Time taken to answer (in milliseconds)
     * @param {boolean} isCorrect - Whether answer was correct
     * @returns {object} Damage details { damage, type, description }
     */
    calculateDamage: function(responseTime, isCorrect) {
        if (!isCorrect) {
            return {
                damage: 0,
                type: 'miss',
                description: 'Jawaban Salah - Tidak Menyerang!'
            };
        }
        
        const seconds = responseTime / 1000;
        let damage = this.baseDamage;
        let type = 'normal';
        let description = 'Serangan Normal';
        
        // Critical hit (very fast)
        if (seconds < this.criticalThreshold) {
            damage = this.criticalDamage;
            type = 'critical';
            description = '🔥 SERANGAN KRITIKAL! 🔥';
        }
        // Fast hit (bonus damage)
        else if (seconds < this.fastThreshold) {
            damage = this.baseDamage + this.fastBonusDamage;
            type = 'fast';
            description = '⚡ Serangan Cepat!';
        }
        // Normal hit
        else {
            damage = this.baseDamage;
            type = 'normal';
            description = '💥 Serangan Biasa';
        }
        
        return {
            damage: damage,
            type: type,
            description: description,
            responseTime: seconds.toFixed(2)
        };
    },
    
    /**
     * Apply damage to a target
     * @param {string} target - 'player' or 'enemy'
     * @param {number} damage - Amount of damage
     * @returns {object} Result { newHP, isDead, overkill }
     */
    applyDamage: function(target, damage) {
        const isPlayer = target === 'player';
        const currentHP = isPlayer ? this.playerHP : this.enemyHP;
        
        // Calculate new HP
        let newHP = Math.max(0, currentHP - damage);
        
        // Update HP
        if (isPlayer) {
            this.playerHP = newHP;
        } else {
            this.enemyHP = newHP;
        }
        
        // Record in history
        this.battleHistory.push({
            target: target,
            damage: damage,
            hpBefore: currentHP,
            hpAfter: newHP,
            timestamp: Date.now()
        });
        
        return {
            newHP: newHP,
            hpBefore: currentHP,
            hpLost: currentHP - newHP,
            isDead: newHP <= 0,
            overkill: damage - currentHP > 0 ? damage - currentHP : 0,
            hpPercentage: (newHP / this.maxHP) * 100
        };
    },
    
    /**
     * Process a round result (both players answered)
     * @param {object} playerResult - { answer, isCorrect, responseTime }
     * @param {object} enemyResult - { answer, isCorrect, responseTime }
     * @returns {object} Round outcome
     */
    processRound: function(playerResult, enemyResult) {
        const playerDamage = this.calculateDamage(playerResult.responseTime, playerResult.isCorrect);
        const enemyDamage = this.calculateDamage(enemyResult.responseTime, enemyResult.isCorrect);
        
        let outcome = {
            playerDamage: playerDamage,
            enemyDamage: enemyDamage,
            playerAttacks: false,
            enemyAttacks: false,
            winner: null,
            playerResult: null,
            enemyResult: null
        };
        
        // Determine who attacks
        // Both correct: faster one attacks
        if (playerResult.isCorrect && enemyResult.isCorrect) {
            if (playerResult.responseTime < enemyResult.responseTime) {
                outcome.playerAttacks = true;
                outcome.enemyResult = this.applyDamage('enemy', playerDamage.damage);
            } else if (enemyResult.responseTime < playerResult.responseTime) {
                outcome.enemyAttacks = true;
                outcome.playerResult = this.applyDamage('player', enemyDamage.damage);
            } else {
                // Exact same time (very rare) - both attack
                outcome.playerAttacks = true;
                outcome.enemyAttacks = true;
                outcome.enemyResult = this.applyDamage('enemy', playerDamage.damage);
                outcome.playerResult = this.applyDamage('player', enemyDamage.damage);
            }
        }
        // Only player correct
        else if (playerResult.isCorrect) {
            outcome.playerAttacks = true;
            outcome.enemyResult = this.applyDamage('enemy', playerDamage.damage);
        }
        // Only enemy correct
        else if (enemyResult.isCorrect) {
            outcome.enemyAttacks = true;
            outcome.playerResult = this.applyDamage('player', enemyDamage.damage);
        }
        // Both wrong: no one attacks
        else {
            // No attacks
        }
        
        // Check for winner
        if (this.playerHP <= 0 && this.enemyHP <= 0) {
            outcome.winner = 'draw';
        } else if (this.enemyHP <= 0) {
            outcome.winner = 'player';
        } else if (this.playerHP <= 0) {
            outcome.winner = 'enemy';
        }
        
        return outcome;
    },
    
    /**
     * Process single player round (player vs AI)
     * @param {object} playerResult - Player's result
     * @param {object} aiResult - AI's result
     * @returns {object} Round outcome
     */
    processSinglePlayerRound: function(playerResult, aiResult) {
        return this.processRound(playerResult, aiResult);
    },
    
    /**
     * Process PvP round
     * @param {object} player1Result - Player 1's result
     * @param {object} player2Result - Player 2's result
     * @returns {object} Round outcome
     */
    processPvPRound: function(player1Result, player2Result) {
        return this.processRound(player1Result, player2Result);
    },
    
    /**
     * Check if battle is over
     * @returns {object} { isOver, winner, reason }
     */
    checkBattleEnd: function() {
        if (this.playerHP <= 0 && this.enemyHP <= 0) {
            return {
                isOver: true,
                winner: 'draw',
                reason: 'Kedua kapal tenggelam bersamaan!'
            };
        } else if (this.enemyHP <= 0) {
            return {
                isOver: true,
                winner: 'player',
                reason: 'Kapal musuh tenggelam!'
            };
        } else if (this.playerHP <= 0) {
            return {
                isOver: true,
                winner: 'enemy',
                reason: 'Kapal kamu tenggelam!'
            };
        }
        
        return {
            isOver: false,
            winner: null,
            reason: null
        };
    },
    
    /**
     * Get current HP status
     * @returns {object} HP information
     */
    getHPStatus: function() {
        return {
            playerHP: this.playerHP,
            enemyHP: this.enemyHP,
            playerHPPercent: (this.playerHP / this.maxHP) * 100,
            enemyHPPercent: (this.enemyHP / this.maxHP) * 100,
            playerHPBar: `${this.playerHP}/${this.maxHP}`,
            enemyHPBar: `${this.enemyHP}/${this.maxHP}`
        };
    },
    
    /**
     * Get battle statistics
     * @returns {object} Battle stats
     */
    getBattleStats: function() {
        const playerDamageTaken = this.maxHP - this.playerHP;
        const enemyDamageTaken = this.maxHP - this.enemyHP;
        
        return {
            roundsPlayed: this.battleHistory.length,
            playerDamageTaken: playerDamageTaken,
            enemyDamageTaken: enemyDamageTaken,
            totalDamage: playerDamageTaken + enemyDamageTaken,
            history: this.battleHistory
        };
    },
    
    /**
     * Get damage type description
     * @param {string} type - Damage type
     * @returns {string} Description
     */
    getDamageDescription: function(type) {
        const descriptions = {
            critical: 'Serangan Kritikal! Damage Maksimal!',
            fast: 'Serangan Cepat! Bonus Damage!',
            normal: 'Serangan Normal',
            miss: 'Tidak Menyerang (Jawaban Salah)'
        };
        return descriptions[type] || descriptions.normal;
    },
    
    /**
     * Get damage color for UI
     * @param {string} type - Damage type
     * @returns {string} CSS color
     */
    getDamageColor: function(type) {
        const colors = {
            critical: '#ff0000',  // Red
            fast: '#ffa500',      // Orange
            normal: '#ffff00',    // Yellow
            miss: '#808080'       // Gray
        };
        return colors[type] || colors.normal;
    },
    
    /**
     * Reset battle state
     */
    reset: function() {
        this.init();
    },
    
    /**
     * Heal a target (for power-ups or special abilities - future feature)
     * @param {string} target - 'player' or 'enemy'
     * @param {number} amount - Heal amount
     * @returns {object} Result
     */
    heal: function(target, amount) {
        const isPlayer = target === 'player';
        const currentHP = isPlayer ? this.playerHP : this.enemyHP;
        const newHP = Math.min(this.maxHP, currentHP + amount);
        
        if (isPlayer) {
            this.playerHP = newHP;
        } else {
            this.enemyHP = newHP;
        }
        
        return {
            healAmount: newHP - currentHP,
            newHP: newHP,
            hpPercentage: (newHP / this.maxHP) * 100
        };
    },
    
    /**
     * Get time-based damage modifier description
     * @param {number} seconds - Response time in seconds
     * @returns {string} Description
     */
    getTimeDescription: function(seconds) {
        if (seconds < this.criticalThreshold) {
            return `Sangat Cepat! (${seconds.toFixed(2)}s)`;
        } else if (seconds < this.fastThreshold) {
            return `Cepat! (${seconds.toFixed(2)}s)`;
        } else if (seconds < 5) {
            return `Normal (${seconds.toFixed(2)}s)`;
        } else {
            return `Lambat (${seconds.toFixed(2)}s)`;
        }
    },
    
    /**
     * Calculate performance rating for a round
     * @param {number} responseTime - Time in milliseconds
     * @param {boolean} isCorrect - Answer correctness
     * @returns {object} Rating { stars, grade, message }
     */
    getRoundRating: function(responseTime, isCorrect) {
        if (!isCorrect) {
            return {
                stars: 0,
                grade: 'F',
                message: 'Coba lagi!'
            };
        }
        
        const seconds = responseTime / 1000;
        
        if (seconds < this.criticalThreshold) {
            return {
                stars: 5,
                grade: 'S',
                message: 'Sempurna! Luar Biasa!'
            };
        } else if (seconds < this.fastThreshold) {
            return {
                stars: 4,
                grade: 'A',
                message: 'Bagus Sekali!'
            };
        } else if (seconds < 5) {
            return {
                stars: 3,
                grade: 'B',
                message: 'Bagus!'
            };
        } else if (seconds < 7) {
            return {
                stars: 2,
                grade: 'C',
                message: 'Cukup Baik'
            };
        } else {
            return {
                stars: 1,
                grade: 'D',
                message: 'Bisa Lebih Cepat!'
            };
        }
    }
};

// Export to global scope
window.BattleLogic = BattleLogic;

// Debug logging
if (typeof console !== 'undefined') {
    console.log('BattleLogic loaded successfully');
    
    // Test function
    window.testBattleLogic = function() {
        console.log('Testing BattleLogic...');
        
        BattleLogic.init();
        
        // Test damage calculation
        console.log('\nDamage Tests:');
        console.log('Critical (1.5s):', BattleLogic.calculateDamage(1500, true));
        console.log('Fast (2.5s):', BattleLogic.calculateDamage(2500, true));
        console.log('Normal (4s):', BattleLogic.calculateDamage(4000, true));
        console.log('Wrong:', BattleLogic.calculateDamage(2000, false));
        
        // Test battle round
        console.log('\nRound Test:');
        const result = BattleLogic.processRound(
            { answer: 56, isCorrect: true, responseTime: 2000 },
            { answer: 42, isCorrect: false, responseTime: 3000 }
        );
        console.log('Player attacks, Enemy HP:', result.enemyResult.newHP);
    };
}