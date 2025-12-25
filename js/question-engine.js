/* ============================================
   QUESTION ENGINE - Perang Kapal Angka
   Handles math question generation and validation
   ============================================ */

const QuestionEngine = {
    // Store recent questions to avoid repetition
    recentQuestions: [],
    maxRecentQuestions: 10,
    
    /**
     * Generate a multiplication question based on level
     * @param {number} level - SD level (1-6)
     * @returns {object} Question object with num1, num2, answer, choices, text
     */
    generateQuestion: function(level) {
        const range = MathHelper.getMultiplicationRange(level);
        let num1, num2, questionKey;
        
        // Generate unique question (not in recent)
        let attempts = 0;
        do {
            num1 = MathHelper.randomInt(range.min, range.max);
            num2 = MathHelper.randomInt(range.min, range.max);
            questionKey = `${num1}x${num2}`;
            attempts++;
            
            // After 20 attempts, clear recent questions to avoid infinite loop
            if (attempts > 20) {
                this.recentQuestions = [];
                break;
            }
        } while (this.recentQuestions.includes(questionKey));
        
        // Add to recent questions
        this.recentQuestions.push(questionKey);
        if (this.recentQuestions.length > this.maxRecentQuestions) {
            this.recentQuestions.shift();
        }
        
        // Calculate correct answer
        const correctAnswer = num1 * num2;
        
        // Generate choices
        const choices = this.generateChoices(correctAnswer, num1, num2, range);
        
        // Create question object
        return {
            num1: num1,
            num2: num2,
            answer: correctAnswer,
            choices: choices,
            text: `${num1} × ${num2} = ?`,
            key: questionKey
        };
    },
    
    /**
     * Generate 4 answer choices (1 correct + 3 wrong)
     * @param {number} correctAnswer - The correct answer
     * @param {number} num1 - First number in multiplication
     * @param {number} num2 - Second number in multiplication
     * @param {object} range - Min/max range for the level
     * @returns {array} Array of 4 choices with value and isCorrect
     */
    generateChoices: function(correctAnswer, num1, num2, range) {
        const choices = [{
            value: correctAnswer,
            isCorrect: true
        }];
        
        const wrongAnswers = new Set();
        
        // Strategy 1: Off by one multiplication (±1 to one of the numbers)
        if (num1 > range.min) {
            wrongAnswers.add((num1 - 1) * num2);
        }
        if (num1 < range.max) {
            wrongAnswers.add((num1 + 1) * num2);
        }
        if (num2 > range.min) {
            wrongAnswers.add(num1 * (num2 - 1));
        }
        if (num2 < range.max) {
            wrongAnswers.add(num1 * (num2 + 1));
        }
        
        // Strategy 2: Addition instead of multiplication (common mistake)
        wrongAnswers.add(num1 + num2);
        
        // Strategy 3: Off by small amount
        wrongAnswers.add(correctAnswer + MathHelper.randomInt(1, 5));
        wrongAnswers.add(correctAnswer - MathHelper.randomInt(1, 5));
        
        // Strategy 4: Nearby multiplication results
        wrongAnswers.add(correctAnswer + MathHelper.randomInt(5, 15));
        wrongAnswers.add(correctAnswer - MathHelper.randomInt(5, 15));
        
        // Strategy 5: Double or half
        wrongAnswers.add(correctAnswer * 2);
        wrongAnswers.add(Math.floor(correctAnswer / 2));
        
        // Convert Set to Array and filter invalid answers
        const validWrongAnswers = Array.from(wrongAnswers).filter(answer => {
            return answer > 0 && 
                   answer !== correctAnswer && 
                   answer < 200; // Keep answers reasonable
        });
        
        // Shuffle and pick 3 wrong answers
        const shuffled = MathHelper.shuffleArray(validWrongAnswers);
        const selectedWrong = shuffled.slice(0, 3);
        
        // If we don't have enough wrong answers, generate random ones
        while (selectedWrong.length < 3) {
            const randomWrong = correctAnswer + MathHelper.randomInt(-20, 20);
            if (randomWrong > 0 && 
                randomWrong !== correctAnswer && 
                !selectedWrong.includes(randomWrong)) {
                selectedWrong.push(randomWrong);
            }
        }
        
        // Add wrong answers to choices
        selectedWrong.forEach(answer => {
            choices.push({
                value: answer,
                isCorrect: false
            });
        });
        
        // Shuffle all choices
        return MathHelper.shuffleArray(choices);
    },
    
    /**
     * Check if an answer is correct
     * @param {object} question - Question object
     * @param {number} userAnswer - User's answer
     * @returns {boolean} True if correct
     */
    checkAnswer: function(question, userAnswer) {
        return parseInt(userAnswer) === question.answer;
    },
    
    /**
     * Get the correct answer from choices array
     * @param {array} choices - Array of choice objects
     * @returns {number} Correct answer value
     */
    getCorrectAnswer: function(choices) {
        const correctChoice = choices.find(choice => choice.isCorrect);
        return correctChoice ? correctChoice.value : null;
    },
    
    /**
     * Find choice index by value
     * @param {array} choices - Array of choice objects
     * @param {number} value - Value to find
     * @returns {number} Index of choice, or -1 if not found
     */
    findChoiceIndex: function(choices, value) {
        return choices.findIndex(choice => choice.value === parseInt(value));
    },
    
    /**
     * Clear recent questions history
     */
    clearHistory: function() {
        this.recentQuestions = [];
    },
    
    /**
     * Get question difficulty description
     * @param {number} level - SD level (1-6)
     * @returns {string} Description of difficulty
     */
    getDifficultyDescription: function(level) {
        const descriptions = {
            1: 'Sangat Mudah (1-5)',
            2: 'Mudah (1-5)',
            3: 'Sedang (1-10)',
            4: 'Sedang (1-10)',
            5: 'Sulit (1-12)',
            6: 'Sangat Sulit (1-12)'
        };
        return descriptions[level] || 'Sedang';
    },
    
    /**
     * Generate a batch of questions for testing
     * @param {number} level - SD level
     * @param {number} count - Number of questions to generate
     * @returns {array} Array of question objects
     */
    generateBatch: function(level, count = 10) {
        this.clearHistory();
        const questions = [];
        
        for (let i = 0; i < count; i++) {
            questions.push(this.generateQuestion(level));
        }
        
        return questions;
    },
    
    /**
     * Validate question object
     * @param {object} question - Question to validate
     * @returns {boolean} True if valid
     */
    isValidQuestion: function(question) {
        return question &&
               typeof question.num1 === 'number' &&
               typeof question.num2 === 'number' &&
               typeof question.answer === 'number' &&
               Array.isArray(question.choices) &&
               question.choices.length === 4 &&
               typeof question.text === 'string';
    },
    
    /**
     * Get statistics about a question
     * @param {object} question - Question object
     * @returns {object} Statistics
     */
    getQuestionStats: function(question) {
        return {
            difficulty: this.calculateDifficulty(question.num1, question.num2),
            correctAnswer: question.answer,
            wrongAnswers: question.choices
                .filter(c => !c.isCorrect)
                .map(c => c.value),
            numbers: [question.num1, question.num2]
        };
    },
    
    /**
     * Calculate difficulty of a multiplication
     * @param {number} num1 - First number
     * @param {number} num2 - Second number
     * @returns {string} Difficulty level
     */
    calculateDifficulty: function(num1, num2) {
        const product = num1 * num2;
        
        // Easy: both numbers <= 5
        if (num1 <= 5 && num2 <= 5) return 'easy';
        
        // Medium: numbers up to 10
        if (num1 <= 10 && num2 <= 10) return 'medium';
        
        // Hard: numbers > 10
        return 'hard';
    },
    
    /**
     * Format question for display
     * @param {object} question - Question object
     * @returns {string} Formatted question text
     */
    formatQuestion: function(question) {
        return question.text;
    },
    
    /**
     * Get hint for a question (for future use)
     * @param {object} question - Question object
     * @returns {string} Hint text
     */
    getHint: function(question) {
        const num1 = question.num1;
        const num2 = question.num2;
        
        // Simple hint: break down multiplication
        if (num2 <= 10) {
            return `Petunjuk: ${num1} × ${num2} = ${num1} ditambah ${num2 - 1} kali`;
        }
        
        return `Petunjuk: Coba hitung ${num1} × ${num2}`;
    }
};

// Export to global scope
window.QuestionEngine = QuestionEngine;

// Debug function (remove in production)
if (typeof console !== 'undefined') {
    console.log('QuestionEngine loaded successfully');
    
    // Test function
    window.testQuestionEngine = function() {
        console.log('Testing QuestionEngine...');
        
        for (let level = 1; level <= 6; level++) {
            const question = QuestionEngine.generateQuestion(level);
            console.log(`Level ${level}:`, question.text, '=', question.answer);
            console.log('Choices:', question.choices.map(c => c.value));
        }
    };
}