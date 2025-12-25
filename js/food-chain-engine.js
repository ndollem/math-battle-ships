/* ============================================
   FOOD CHAIN QUESTION ENGINE - Perang Kapal Angka
   Handles IPAS (Rantai Makanan) questions
   ============================================ */

   const FoodChainEngine = {
    questions: null,
    usedQuestions: [],
    
    /**
     * Load questions from data module
     */
    loadQuestions() {
        try {
            // Get data from global scope (loaded from food-chain-data.js)
            if (typeof FOOD_CHAIN_DATA === 'undefined') {
                throw new Error('FOOD_CHAIN_DATA not found! Make sure food-chain-data.js is loaded first.');
            }
            
            this.questions = FOOD_CHAIN_DATA;
            console.log('✅ Food chain questions loaded:', this.questions.metadata);
            return true;
        } catch (error) {
            console.error('❌ Failed to load food chain questions:', error);
            return false;
        }
    },
    
    /**
     * Generate a question based on level
     * @param {number} level - SD level (1-6)
     * @returns {object} Question object
     */
    generateQuestion(level) {
        if (!this.questions) {
            console.error('Questions not loaded!');
            return null;
        }
        
        // Map level to question set
        let questionSet;
        if (level <= 2) {
            questionSet = this.questions.questions.level_1_2;
        } else if (level <= 4) {
            questionSet = [...this.questions.questions.level_1_2, 
                          ...this.questions.questions.level_3_4];
        } else {
            questionSet = [...this.questions.questions.level_1_2, 
                          ...this.questions.questions.level_3_4,
                          ...this.questions.questions.level_5_6];
        }
        
        // Filter out used questions
        const availableQuestions = questionSet.filter(q => 
            !this.usedQuestions.includes(q.id)
        );
        
        // Reset if all used
        if (availableQuestions.length === 0) {
            this.usedQuestions = [];
            return this.generateQuestion(level);
        }
        
        // Pick random question
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];
        
        // Mark as used
        this.usedQuestions.push(selectedQuestion.id);
        
        // Format for game
        return this.formatQuestion(selectedQuestion);
    },
    
    /**
     * Format question for game use
     */
    formatQuestion(question) {
        // Create choices array
        const choices = [
            {
                value: question.correct_answer,
                isCorrect: true
            },
            ...question.wrong_answers.map(answer => ({
                value: answer,
                isCorrect: false
            }))
        ];
        
        // Shuffle choices
        const shuffled = this.shuffleArray(choices);
        
        return {
            id: question.id,
            text: question.question,
            answer: question.correct_answer,
            choices: shuffled,
            explanation: question.explanation,
            category: question.category
        };
    },
    
    /**
     * Shuffle array
     */
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    /**
     * Check if answer is correct
     */
    checkAnswer(question, userAnswer) {
        return userAnswer === question.answer;
    },
    
    /**
     * Clear history
     */
    clearHistory() {
        this.usedQuestions = [];
    }
};

// Export to global scope
window.FoodChainEngine = FoodChainEngine;

console.log('✅ FoodChainEngine loaded successfully');