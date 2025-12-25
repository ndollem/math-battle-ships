/* ============================================
   AI PLAYER - Perang Kapal Angka
   Handles computer opponent behavior
   ============================================ */

const AIPlayer = {
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    currentQuestion: null,
    responseTimer: null,
    
    /**
     * Initialize AI with difficulty setting
     * @param {string} difficulty - 'easy', 'medium', or 'hard'
     */
    init: function(difficulty = 'medium') {
        this.difficulty = difficulty;
        this.clearTimer();
    },
    
    /**
     * Set current question for AI to answer
     * @param {object} question - Question object from QuestionEngine
     */
    setQuestion: function(question) {
        this.currentQuestion = question;
    },
    
    /**
     * Get AI response time based on difficulty
     * @returns {number} Response time in milliseconds
     */
    getResponseTime: function() {
        const baseTime = this.getBaseResponseTime();
        const variance = this.getTimeVariance();
        
        // Add random variance (±variance%)
        const randomFactor = 1 + (Math.random() * 2 - 1) * variance;
        const responseTime = Math.round(baseTime * randomFactor);
        
        // Ensure minimum time (to seem realistic)
        return Math.max(responseTime, 500);
    },
    
    /**
     * Get base response time for difficulty level
     * @returns {number} Base time in milliseconds
     */
    getBaseResponseTime: function() {
        const times = {
            easy: 4000,    // 4 seconds average
            medium: 2500,  // 2.5 seconds average
            hard: 1500     // 1.5 seconds average
        };
        return times[this.difficulty] || times.medium;
    },
    
    /**
     * Get time variance for difficulty (how unpredictable)
     * @returns {number} Variance as decimal (0.3 = ±30%)
     */
    getTimeVariance: function() {
        const variances = {
            easy: 0.5,    // Very unpredictable (±50%)
            medium: 0.3,  // Somewhat predictable (±30%)
            hard: 0.2     // More consistent (±20%)
        };
        return variances[this.difficulty] || variances.medium;
    },
    
    /**
     * Get AI accuracy rate (chance of answering correctly)
     * @returns {number} Accuracy as decimal (0.7 = 70% correct)
     */
    getAccuracyRate: function() {
        const accuracies = {
            easy: 0.60,    // 60% correct
            medium: 0.80,  // 80% correct
            hard: 0.95     // 95% correct
        };
        return accuracies[this.difficulty] || accuracies.medium;
    },
    
    /**
     * Determine if AI will answer correctly
     * @returns {boolean} True if AI answers correctly
     */
    willAnswerCorrectly: function() {
        return Math.random() < this.getAccuracyRate();
    },
    
    /**
     * Get AI's answer to current question
     * @returns {number} Chosen answer value
     */
    getAnswer: function() {
        if (!this.currentQuestion) {
            console.error('No question set for AI');
            return null;
        }
        
        const choices = this.currentQuestion.choices;
        
        // Determine if AI answers correctly
        if (this.willAnswerCorrectly()) {
            // Return correct answer
            const correctChoice = choices.find(c => c.isCorrect);
            return correctChoice ? correctChoice.value : null;
        } else {
            // Return wrong answer (randomly pick from wrong answers)
            const wrongChoices = choices.filter(c => !c.isCorrect);
            if (wrongChoices.length === 0) return null;
            
            const randomIndex = Math.floor(Math.random() * wrongChoices.length);
            return wrongChoices[randomIndex].value;
        }
    },
    
    /**
     * Start AI answering process (async with callback)
     * @param {function} callback - Called when AI has answer: callback(answer, isCorrect, responseTime)
     */
    startAnswering: function(callback) {
        this.clearTimer();
        
        const responseTime = this.getResponseTime();
        const willBeCorrect = this.willAnswerCorrectly();
        
        this.responseTimer = setTimeout(() => {
            const answer = this.getAnswer();
            const isCorrect = answer === this.currentQuestion.answer;
            
            if (callback) {
                callback(answer, isCorrect, responseTime);
            }
        }, responseTime);
        
        return responseTime;
    },
    
    /**
     * Cancel AI answering (if question changes or game ends)
     */
    clearTimer: function() {
        if (this.responseTimer) {
            clearTimeout(this.responseTimer);
            this.responseTimer = null;
        }
    },
    
    /**
     * Get AI's chosen choice index
     * @returns {number} Index of chosen answer (0-3)
     */
    getChoiceIndex: function() {
        if (!this.currentQuestion) return -1;
        
        const answer = this.getAnswer();
        return QuestionEngine.findChoiceIndex(this.currentQuestion.choices, answer);
    },
    
    /**
     * Simulate AI thinking animation (for UI)
     * @param {function} onTick - Called periodically during thinking
     * @param {function} onComplete - Called when thinking is done
     */
    simulateThinking: function(onTick, onComplete) {
        const responseTime = this.getResponseTime();
        const tickInterval = 200; // Update every 200ms
        const totalTicks = Math.floor(responseTime / tickInterval);
        let currentTick = 0;
        
        const thinkingTimer = setInterval(() => {
            currentTick++;
            
            if (onTick) {
                onTick(currentTick, totalTicks);
            }
            
            if (currentTick >= totalTicks) {
                clearInterval(thinkingTimer);
                
                const answer = this.getAnswer();
                const isCorrect = answer === this.currentQuestion.answer;
                
                if (onComplete) {
                    onComplete(answer, isCorrect, responseTime);
                }
            }
        }, tickInterval);
        
        return thinkingTimer;
    },
    
    /**
     * Get AI personality/difficulty description
     * @returns {string} Description
     */
    getDescription: function() {
        const descriptions = {
            easy: 'AI Pemula - Lambat dan sering salah',
            medium: 'AI Normal - Kecepatan sedang',
            hard: 'AI Ahli - Cepat dan akurat'
        };
        return descriptions[this.difficulty] || descriptions.medium;
    },
    
    /**
     * Get AI difficulty stats
     * @returns {object} Stats object
     */
    getStats: function() {
        return {
            difficulty: this.difficulty,
            avgResponseTime: this.getBaseResponseTime(),
            accuracy: this.getAccuracyRate() * 100,
            description: this.getDescription()
        };
    },
    
    /**
     * Adjust difficulty dynamically (for adaptive AI)
     * @param {number} playerAccuracy - Player's accuracy rate (0-1)
     * @param {number} playerAvgTime - Player's average response time (ms)
     */
    adjustDifficulty: function(playerAccuracy, playerAvgTime) {
        // If player is doing very well, increase difficulty
        if (playerAccuracy > 0.9 && playerAvgTime < 2000) {
            if (this.difficulty === 'easy') this.difficulty = 'medium';
            else if (this.difficulty === 'medium') this.difficulty = 'hard';
        }
        // If player is struggling, decrease difficulty
        else if (playerAccuracy < 0.5 && playerAvgTime > 4000) {
            if (this.difficulty === 'hard') this.difficulty = 'medium';
            else if (this.difficulty === 'medium') this.difficulty = 'easy';
        }
    },
    
    /**
     * Reset AI state
     */
    reset: function() {
        this.clearTimer();
        this.currentQuestion = null;
    },
    
    /**
     * Get AI mistakes pattern (makes more believable mistakes)
     * @returns {string} Type of mistake AI is likely to make
     */
    getMistakePattern: function() {
        const patterns = [
            'off_by_one',      // Choose answer that's off by one multiplication
            'addition',        // Choose addition instead of multiplication
            'close_value',     // Choose value close to correct answer
            'random'           // Completely random wrong answer
        ];
        
        // Easy AI makes more random mistakes
        if (this.difficulty === 'easy') {
            return patterns[Math.floor(Math.random() * patterns.length)];
        }
        
        // Medium/Hard AI makes more "realistic" mistakes
        const realisticPatterns = patterns.slice(0, 3);
        return realisticPatterns[Math.floor(Math.random() * realisticPatterns.length)];
    },
    
    /**
     * Get wrong answer based on mistake pattern
     * @param {string} pattern - Mistake pattern
     * @returns {number} Wrong answer value
     */
    getWrongAnswerByPattern: function(pattern) {
        if (!this.currentQuestion) return null;
        
        const choices = this.currentQuestion.choices;
        const wrongChoices = choices.filter(c => !c.isCorrect);
        const correctAnswer = this.currentQuestion.answer;
        const num1 = this.currentQuestion.num1;
        const num2 = this.currentQuestion.num2;
        
        switch(pattern) {
            case 'off_by_one':
                // Try to find answer that's off by one multiplication
                const offByOne = [
                    (num1 - 1) * num2,
                    (num1 + 1) * num2,
                    num1 * (num2 - 1),
                    num1 * (num2 + 1)
                ];
                for (let val of offByOne) {
                    const found = wrongChoices.find(c => c.value === val);
                    if (found) return found.value;
                }
                break;
                
            case 'addition':
                // Try to find addition answer
                const additionAnswer = num1 + num2;
                const found = wrongChoices.find(c => c.value === additionAnswer);
                if (found) return found.value;
                break;
                
            case 'close_value':
                // Find answer closest to correct
                wrongChoices.sort((a, b) => {
                    return Math.abs(a.value - correctAnswer) - Math.abs(b.value - correctAnswer);
                });
                return wrongChoices[0].value;
        }
        
        // Default: random wrong answer
        const randomIndex = Math.floor(Math.random() * wrongChoices.length);
        return wrongChoices[randomIndex].value;
    }
};

// Export to global scope
window.AIPlayer = AIPlayer;

// Debug logging
if (typeof console !== 'undefined') {
    console.log('AIPlayer loaded successfully');
    
    // Test function
    window.testAIPlayer = function() {
        console.log('Testing AIPlayer...');
        
        ['easy', 'medium', 'hard'].forEach(difficulty => {
            AIPlayer.init(difficulty);
            console.log(`\n${difficulty.toUpperCase()}:`);
            console.log('- Response time:', AIPlayer.getResponseTime(), 'ms');
            console.log('- Accuracy:', (AIPlayer.getAccuracyRate() * 100).toFixed(0) + '%');
            console.log('- Description:', AIPlayer.getDescription());
        });
    };
}