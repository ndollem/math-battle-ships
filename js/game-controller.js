/* ============================================
   GAME CONTROLLER - Perang Kapal Angka
   Main game loop and state management
   ============================================ */

const GameController = {
    // Game state
    state: 'INIT', // INIT, QUESTION, WAITING_ANSWER, ATTACK, GAME_OVER
    mode: null, // 'single' or 'pvp'
    level: null,
    difficulty: null,
    
    // Current question
    currentQuestion: null,
    questionStartTime: null,
    questionTimer: null,
    questionTimeLimit: 10, // seconds
    timeRemaining: 10,
    
    // Player answers
    playerAnswer: null,
    playerAnswerTime: null,
    enemyAnswer: null,
    enemyAnswerTime: null,
    
    // PvP specific
    player1Answered: false,
    player2Answered: false,
    
    // Game stats
    questionCount: 0,
    maxQuestions: 10,
    correctAnswers: 0,
    wrongAnswers: 0,
    responseTimes: [],
    
    // Control flags
    isPaused: false,
    isProcessing: false,
    
    /**
     * Initialize game
     */
    init: function() {
        console.log('Initializing game...');
        
        // Get game settings from GameState
        this.mode = GameState.mode;
        this.level = GameState.level;
        this.difficulty = GameState.difficulty;
        
        // Initialize subsystems
        BattleLogic.init();
        AnimationManager.init();
        
        if (this.mode === 'single') {
            AIPlayer.init(this.difficulty);
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start game
        this.state = 'QUESTION';
        this.startNewQuestion();
    },
    
    /**
     * Setup event listeners for answer buttons and keyboard
     */
    setupEventListeners: function() {
        if (this.mode === 'single') {
            this.setupSinglePlayerControls();
        } else if (this.mode === 'pvp') {
            this.setupPvPControls();
        }
    },
    
    /**
     * Setup single player controls
     */
    setupSinglePlayerControls: function() {
        const buttons = document.querySelectorAll('.single-player-choices .choice-btn');
        
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.state === 'WAITING_ANSWER' && !this.isProcessing) {
                    this.handlePlayerAnswer(index);
                }
            });
        });
        
        // Keyboard controls (1-4)
        document.addEventListener('keydown', (e) => {
            if (this.state !== 'WAITING_ANSWER' || this.isProcessing) return;
            
            const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
            if (keyMap[e.key] !== undefined) {
                this.handlePlayerAnswer(keyMap[e.key]);
            }
        });
    },
    
    /**
     * Setup PvP controls
     */
    setupPvPControls: function() {
        // Player 1 buttons (Q, W, E, R)
        const p1Buttons = document.querySelectorAll('.player1-choices .choice-btn');
        p1Buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.state === 'WAITING_ANSWER' && !this.player1Answered) {
                    this.handlePlayer1Answer(index);
                }
            });
        });
        
        // Player 2 buttons (U, I, O, P)
        const p2Buttons = document.querySelectorAll('.player2-choices .choice-btn');
        p2Buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.state === 'WAITING_ANSWER' && !this.player2Answered) {
                    this.handlePlayer2Answer(index);
                }
            });
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.state !== 'WAITING_ANSWER') return;
            
            const key = e.key.toLowerCase();
            const p1Keys = { 'q': 0, 'w': 1, 'e': 2, 'r': 3 };
            const p2Keys = { 'u': 0, 'i': 1, 'o': 2, 'p': 3 };
            
            if (p1Keys[key] !== undefined && !this.player1Answered) {
                this.handlePlayer1Answer(p1Keys[key]);
            } else if (p2Keys[key] !== undefined && !this.player2Answered) {
                this.handlePlayer2Answer(p2Keys[key]);
            }
        });
    },
    
    /**
     * Start a new question
     */
    startNewQuestion: function() {
        this.questionCount++;
        this.updateQuestionCount();
        
        // Check if game should end
        if (this.questionCount > this.maxQuestions) {
            this.endGame('question_limit');
            return;
        }
        
        // Generate new question
        this.currentQuestion = QuestionEngine.generateQuestion(this.level);
        
        // Display question
        this.displayQuestion();
        
        // Reset answer state
        this.playerAnswer = null;
        this.playerAnswerTime = null;
        this.enemyAnswer = null;
        this.enemyAnswerTime = null;
        this.player1Answered = false;
        this.player2Answered = false;
        
        // Start timer
        this.startQuestionTimer();
        
        // AI starts answering in single player mode
        if (this.mode === 'single') {
            AIPlayer.setQuestion(this.currentQuestion);
            AIPlayer.startAnswering((answer, isCorrect, responseTime) => {
                this.handleAIAnswer(answer, responseTime);
            });
        }
        
        // Enable answer buttons
        this.enableAnswerButtons();
        
        this.state = 'WAITING_ANSWER';
    },
    
    /**
     * Display question on screen
     */
    displayQuestion: function() {
        const questionText = document.getElementById('questionText');
        if (questionText) {
            questionText.textContent = this.currentQuestion.text;
        }
        
        // Update choice buttons
        const choices = this.currentQuestion.choices;
        
        if (this.mode === 'single') {
            choices.forEach((choice, index) => {
                const choiceElement = document.getElementById(`choice${index}`);
                if (choiceElement) {
                    choiceElement.textContent = choice.value;
                }
            });
        } else if (this.mode === 'pvp') {
            // Update both players' choices
            choices.forEach((choice, index) => {
                const p1Choice = document.getElementById(`p1choice${index}`);
                const p2Choice = document.getElementById(`p2choice${index}`);
                if (p1Choice) p1Choice.textContent = choice.value;
                if (p2Choice) p2Choice.textContent = choice.value;
            });
        }
    },
    
    /**
     * Start question timer
     */
    startQuestionTimer: function() {
        this.questionStartTime = Date.now();
        this.timeRemaining = this.questionTimeLimit;
        this.updateTimerDisplay();
        
        this.questionTimer = TimerHelper.start('question', () => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.handleTimeout();
            }
        }, 1000);
    },
    
    /**
     * Update timer display
     */
    updateTimerDisplay: function() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = this.timeRemaining;
            
            // Change color based on time
            timerDisplay.classList.remove('warning', 'danger');
            if (this.timeRemaining <= 3) {
                timerDisplay.classList.add('danger');
            } else if (this.timeRemaining <= 5) {
                timerDisplay.classList.add('warning');
            }
        }
    },
    
    /**
     * Handle player answer (single player mode)
     */
    handlePlayerAnswer: function(choiceIndex) {
        if (this.playerAnswer !== null) return; // Already answered
        
        const responseTime = Date.now() - this.questionStartTime;
        const choice = this.currentQuestion.choices[choiceIndex];
        
        this.playerAnswer = choice.value;
        this.playerAnswerTime = responseTime;
        
        // Visual feedback
        this.highlightChoice('single', choiceIndex, choice.isCorrect);
        AnimationManager.showAnswerIndicator('player', choice.isCorrect);
        
        // Play sound
        if (choice.isCorrect) {
            SoundManager.playCorrect();
        } else {
            SoundManager.playWrong();
        }
        
        // Disable buttons
        this.disableAnswerButtons();
        
        // Wait for AI or timeout
        // Processing happens when both have answered or time runs out
    },
    
    /**
     * Handle AI answer
     */
    handleAIAnswer: function(answer, responseTime) {
        if (this.enemyAnswer !== null) return; // Already answered
        
        this.enemyAnswer = answer;
        this.enemyAnswerTime = responseTime;
        
        const isCorrect = answer === this.currentQuestion.answer;
        AnimationManager.showAnswerIndicator('enemy', isCorrect);
        
        // If player has also answered, process round
        if (this.playerAnswer !== null) {
            this.processRound();
        }
    },
    
    /**
     * Handle Player 1 answer (PvP mode)
     */
    handlePlayer1Answer: function(choiceIndex) {
        if (this.player1Answered) return;
        
        const responseTime = Date.now() - this.questionStartTime;
        const choice = this.currentQuestion.choices[choiceIndex];
        
        this.playerAnswer = choice.value;
        this.playerAnswerTime = responseTime;
        this.player1Answered = true;
        
        // Visual feedback
        this.highlightChoice('p1', choiceIndex, choice.isCorrect);
        AnimationManager.showAnswerIndicator('player', choice.isCorrect);
        
        // Check if both answered
        if (this.player2Answered) {
            this.processRound();
        }
    },
    
    /**
     * Handle Player 2 answer (PvP mode)
     */
    handlePlayer2Answer: function(choiceIndex) {
        if (this.player2Answered) return;
        
        const responseTime = Date.now() - this.questionStartTime;
        const choice = this.currentQuestion.choices[choiceIndex];
        
        this.enemyAnswer = choice.value;
        this.enemyAnswerTime = responseTime;
        this.player2Answered = true;
        
        // Visual feedback
        this.highlightChoice('p2', choiceIndex, choice.isCorrect);
        AnimationManager.showAnswerIndicator('enemy', choice.isCorrect);
        
        // Check if both answered
        if (this.player1Answered) {
            this.processRound();
        }
    },
    
    /**
     * Handle timeout (time ran out)
     */
    handleTimeout: function() {
        TimerHelper.stop('question');
        
        // Mark unanswered as wrong
        if (this.mode === 'single') {
            if (this.playerAnswer === null) {
                this.playerAnswer = -1;
                this.playerAnswerTime = this.questionTimeLimit * 1000;
            }
            if (this.enemyAnswer === null) {
                this.enemyAnswer = -1;
                this.enemyAnswerTime = this.questionTimeLimit * 1000;
            }
        } else if (this.mode === 'pvp') {
            if (!this.player1Answered) {
                this.playerAnswer = -1;
                this.playerAnswerTime = this.questionTimeLimit * 1000;
            }
            if (!this.player2Answered) {
                this.enemyAnswer = -1;
                this.enemyAnswerTime = this.questionTimeLimit * 1000;
            }
        }
        
        this.processRound();
    },
    
    /**
     * Process round results
     */
    processRound: function() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        TimerHelper.stop('question');
        this.state = 'ATTACK';
        
        // Prepare results
        const playerResult = {
            answer: this.playerAnswer,
            isCorrect: this.playerAnswer === this.currentQuestion.answer,
            responseTime: this.playerAnswerTime
        };
        
        const enemyResult = {
            answer: this.enemyAnswer,
            isCorrect: this.enemyAnswer === this.currentQuestion.answer,
            responseTime: this.enemyAnswerTime
        };
        
        // Update stats
        if (playerResult.isCorrect) {
            this.correctAnswers++;
            this.responseTimes.push(this.playerAnswerTime);
        } else {
            this.wrongAnswers++;
        }
        this.updateStatsDisplay();
        
        // Process battle
        const outcome = BattleLogic.processRound(playerResult, enemyResult);
        
        // Show feedback
        this.showRoundFeedback(outcome);
        
        // Animate attacks
        setTimeout(() => {
            this.animateRoundOutcome(outcome);
        }, 1000);
        
        // Check if game ended
        setTimeout(() => {
            const battleEnd = BattleLogic.checkBattleEnd();
            if (battleEnd.isOver) {
                this.endGame(battleEnd.winner);
            } else {
                // Next question
                this.isProcessing = false;
                this.state = 'QUESTION';
                setTimeout(() => {
                    this.startNewQuestion();
                }, 2000);
            }
        }, 3000);
    },
    
    /**
     * Show round feedback
     */
    showRoundFeedback: function(outcome) {
        let message = '';
        
        if (outcome.playerAttacks && outcome.enemyAttacks) {
            message = '⚔️ Kedua pemain menyerang!';
        } else if (outcome.playerAttacks) {
            message = outcome.playerDamage.description;
        } else if (outcome.enemyAttacks) {
            message = 'Musuh menyerang!';
        } else {
            message = '🛑 Tidak ada serangan!';
        }
        
        AnimationManager.showFeedback(message, 'info');
    },
    
    /**
     * Animate round outcome
     */
    animateRoundOutcome: function(outcome) {
        if (outcome.playerAttacks) {
            SoundManager.playAttack();
            AnimationManager.animateAttack('player', outcome.playerDamage.type);
            
            setTimeout(() => {
                if (outcome.enemyResult) {
                    AnimationManager.updateHPBar('enemy', outcome.enemyResult.newHP);
                }
            }, 500);
        }
        
        if (outcome.enemyAttacks) {
            setTimeout(() => {
                SoundManager.playAttack();
                AnimationManager.animateAttack('enemy', outcome.enemyDamage.type);
                
                setTimeout(() => {
                    if (outcome.playerResult) {
                        AnimationManager.updateHPBar('player', outcome.playerResult.newHP);
                    }
                }, 500);
            }, outcome.playerAttacks ? 800 : 0);
        }
    },
    
    /**
     * Highlight chosen answer
     */
    highlightChoice: function(playerType, index, isCorrect) {
        const selector = playerType === 'single' 
            ? '.single-player-choices .choice-btn' 
            : `.${playerType}-choices .choice-btn`;
        
        const buttons = document.querySelectorAll(selector);
        if (buttons[index]) {
            buttons[index].classList.add(isCorrect ? 'correct' : 'wrong');
        }
    },
    
    /**
     * Enable answer buttons
     */
    enableAnswerButtons: function() {
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong', 'selected');
        });
    },
    
    /**
     * Disable answer buttons
     */
    disableAnswerButtons: function() {
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => btn.disabled = true);
    },
    
    /**
     * Update question count display
     */
    updateQuestionCount: function() {
        const display = document.getElementById('questionCountDisplay');
        if (display) {
            display.textContent = `${this.questionCount}/${this.maxQuestions}`;
        }
    },
    
    /**
     * Update stats display
     */
    updateStatsDisplay: function() {
        const correctDisplay = document.getElementById('correctCountDisplay');
        const wrongDisplay = document.getElementById('wrongCountDisplay');
        
        if (correctDisplay) correctDisplay.textContent = this.correctAnswers;
        if (wrongDisplay) wrongDisplay.textContent = this.wrongAnswers;
    },
    
    /**
     * End game
     */
    endGame: function(winner) {
        this.state = 'GAME_OVER';
        TimerHelper.stopAll();
        AIPlayer.clearTimer();
        
        // Calculate stats
        const avgTime = this.responseTimes.length > 0 
            ? MathHelper.average(this.responseTimes) 
            : 0;
        const accuracy = this.questionCount > 0 
            ? MathHelper.percentage(this.correctAnswers, this.questionCount) 
            : 0;
        
        // Save stats
        const stats = {
            mode: this.mode,
            level: this.level,
            difficulty: this.difficulty,
            winner: winner,
            correctAnswers: this.correctAnswers,
            wrongAnswers: this.wrongAnswers,
            totalQuestions: this.questionCount,
            accuracy: accuracy,
            avgResponseTime: avgTime
        };
        
        StorageManager.saveStats(stats);
        SessionManager.saveGameState(stats);
        
        // Play sound
        if (winner === 'player') {
            SoundManager.playVictory();
        } else {
            SoundManager.playDefeat();
        }
        
        // Navigate to result page
        setTimeout(() => {
            const params = {
                winner: winner,
                correct: this.correctAnswers,
                wrong: this.wrongAnswers,
                total: this.questionCount,
                accuracy: accuracy,
                avgTime: Math.round(avgTime)
            };
            URLHelper.navigate('result.html', params);
        }, 2000);
    },
    
    /**
     * Pause game
     */
    pause: function() {
        this.isPaused = true;
        TimerHelper.stop('question');
        AIPlayer.clearTimer();
    },
    
    /**
     * Resume game
     */
    resume: function() {
        this.isPaused = false;
        if (this.state === 'WAITING_ANSWER') {
            this.startQuestionTimer();
        }
    }
};

// Export to global scope
window.GameController = GameController;

// Debug logging
if (typeof console !== 'undefined') {
    console.log('GameController loaded successfully');
}