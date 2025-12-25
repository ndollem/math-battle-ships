/* ============================================
   GLOBAL UTILITIES - Perang Kapal Angka
   Shared JavaScript functions and state management
   ============================================ */

// === GLOBAL GAME STATE ===
const GameState = {
    mode: null,           // 'single' or 'pvp'
    level: null,          // 1-6 (SD class)
    difficulty: null,     // 'easy', 'medium', 'hard' (for AI)
    currentQuestion: null,
    playerHP: 100,
    enemyHP: 100,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalTime: 0,
    questionCount: 0
};

// === LOCAL STORAGE MANAGER ===
const StorageManager = {
    // Save game settings
    saveSettings: function(settings) {
        try {
            localStorage.setItem('perang-kapal-settings', JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('Failed to save settings:', e);
            return false;
        }
    },
    
    // Load game settings
    loadSettings: function() {
        try {
            const settings = localStorage.getItem('perang-kapal-settings');
            return settings ? JSON.parse(settings) : null;
        } catch (e) {
            console.error('Failed to load settings:', e);
            return null;
        }
    },
    
    // Save game statistics
    saveStats: function(stats) {
        try {
            const allStats = this.loadStats() || [];
            allStats.push({
                ...stats,
                timestamp: new Date().toISOString()
            });
            // Keep only last 50 games
            if (allStats.length > 50) {
                allStats.shift();
            }
            localStorage.setItem('perang-kapal-stats', JSON.stringify(allStats));
            return true;
        } catch (e) {
            console.error('Failed to save stats:', e);
            return false;
        }
    },
    
    // Load game statistics
    loadStats: function() {
        try {
            const stats = localStorage.getItem('perang-kapal-stats');
            return stats ? JSON.parse(stats) : [];
        } catch (e) {
            console.error('Failed to load stats:', e);
            return [];
        }
    },
    
    // Clear all data
    clearAll: function() {
        try {
            localStorage.removeItem('perang-kapal-settings');
            localStorage.removeItem('perang-kapal-stats');
            return true;
        } catch (e) {
            console.error('Failed to clear storage:', e);
            return false;
        }
    }
};

// === URL PARAMETER UTILITIES ===
const URLHelper = {
    // Get URL parameter value
    getParam: function(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    },
    
    // Get all URL parameters as object
    getAllParams: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    },
    
    // Navigate with parameters
    navigate: function(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        window.location.href = fullUrl;
    },
    
    // Update current URL parameters without reload
    updateParams: function(params) {
        const currentParams = this.getAllParams();
        const newParams = { ...currentParams, ...params };
        const queryString = new URLSearchParams(newParams).toString();
        const newUrl = `${window.location.pathname}?${queryString}`;
        window.history.pushState({}, '', newUrl);
    }
};

// === SESSION STORAGE FOR CURRENT GAME ===
const SessionManager = {
    // Save current game state
    saveGameState: function(state) {
        try {
            sessionStorage.setItem('perang-kapal-game', JSON.stringify(state));
            return true;
        } catch (e) {
            console.error('Failed to save game state:', e);
            return false;
        }
    },
    
    // Load current game state
    loadGameState: function() {
        try {
            const state = sessionStorage.getItem('perang-kapal-game');
            return state ? JSON.parse(state) : null;
        } catch (e) {
            console.error('Failed to load game state:', e);
            return null;
        }
    },
    
    // Clear game state
    clearGameState: function() {
        try {
            sessionStorage.removeItem('perang-kapal-game');
            return true;
        } catch (e) {
            console.error('Failed to clear game state:', e);
            return false;
        }
    }
};

// === MATH UTILITIES ===
const MathHelper = {
    // Get multiplication range based on SD level
    getMultiplicationRange: function(level) {
        const ranges = {
            1: { min: 1, max: 5 },
            2: { min: 1, max: 5 },
            3: { min: 1, max: 10 },
            4: { min: 1, max: 10 },
            5: { min: 1, max: 12 },
            6: { min: 1, max: 12 }
        };
        return ranges[level] || { min: 1, max: 10 };
    },
    
    // Get random integer between min and max (inclusive)
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Shuffle array
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    // Calculate percentage
    percentage: function(part, total) {
        if (total === 0) return 0;
        return Math.round((part / total) * 100);
    },
    
    // Calculate average
    average: function(numbers) {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, val) => acc + val, 0);
        return Math.round(sum / numbers.length);
    }
};

// === ANIMATION UTILITIES ===
const AnimationHelper = {
    // Add shake animation to element
    shake: function(element) {
        element.classList.add('animate-shake');
        setTimeout(() => {
            element.classList.remove('animate-shake');
        }, 500);
    },
    
    // Add pulse animation to element
    pulse: function(element, duration = 1000) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, duration);
    },
    
    // Fade in element
    fadeIn: function(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let opacity = 0;
        const timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, duration / 10);
    },
    
    // Fade out element
    fadeOut: function(element, duration = 500, callback = null) {
        let opacity = 1;
        const timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(timer);
                element.style.display = 'none';
                if (callback) callback();
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, duration / 10);
    }
};

// === SOUND MANAGER (Basic) ===
const SoundManager = {
    enabled: true,
    
    // Toggle sound on/off
    toggle: function() {
        this.enabled = !this.enabled;
        StorageManager.saveSettings({ soundEnabled: this.enabled });
        return this.enabled;
    },
    
    // Play sound effect (placeholder - can be enhanced later)
    playSFX: function(soundName) {
        if (!this.enabled) return;
        
        // Placeholder for future sound implementation
        console.log(`Playing sound: ${soundName}`);
        
        // Future: Use Web Audio API or HTML5 Audio
        // const audio = new Audio(`assets/sounds/sfx/${soundName}.mp3`);
        // audio.play();
    },
    
    // Play correct answer sound
    playCorrect: function() {
        this.playSFX('correct');
    },
    
    // Play wrong answer sound
    playWrong: function() {
        this.playSFX('wrong');
    },
    
    // Play attack sound
    playAttack: function() {
        this.playSFX('attack');
    },
    
    // Play victory sound
    playVictory: function() {
        this.playSFX('victory');
    },
    
    // Play defeat sound
    playDefeat: function() {
        this.playSFX('defeat');
    }
};

// === TIMER UTILITIES ===
const TimerHelper = {
    timers: {},
    
    // Start a timer
    start: function(name, callback, interval = 1000) {
        this.stop(name); // Clear existing timer
        this.timers[name] = setInterval(callback, interval);
        return this.timers[name];
    },
    
    // Stop a timer
    stop: function(name) {
        if (this.timers[name]) {
            clearInterval(this.timers[name]);
            delete this.timers[name];
        }
    },
    
    // Stop all timers
    stopAll: function() {
        for (const name in this.timers) {
            this.stop(name);
        }
    },
    
    // Countdown timer
    countdown: function(seconds, onTick, onComplete) {
        let remaining = seconds;
        
        const timer = this.start('countdown', () => {
            if (remaining <= 0) {
                this.stop('countdown');
                if (onComplete) onComplete();
            } else {
                if (onTick) onTick(remaining);
                remaining--;
            }
        }, 1000);
        
        // Initial tick
        if (onTick) onTick(remaining);
        
        return timer;
    }
};

// === VALIDATION UTILITIES ===
const Validator = {
    // Validate SD level (1-6)
    isValidLevel: function(level) {
        const num = parseInt(level);
        return !isNaN(num) && num >= 1 && num <= 6;
    },
    
    // Validate game mode
    isValidMode: function(mode) {
        return mode === 'single' || mode === 'pvp';
    },
    
    // Validate difficulty
    isValidDifficulty: function(difficulty) {
        return ['easy', 'medium', 'hard'].includes(difficulty);
    },
    
    // Validate answer (must be a number)
    isValidAnswer: function(answer) {
        const num = parseInt(answer);
        return !isNaN(num) && num > 0;
    }
};

// === FORMATTER UTILITIES ===
const Formatter = {
    // Format time in MM:SS
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Format number with thousand separators
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    
    // Format percentage
    formatPercentage: function(value) {
        return `${Math.round(value)}%`;
    }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    // Load sound preference
    const settings = StorageManager.loadSettings();
    if (settings && settings.soundEnabled !== undefined) {
        SoundManager.enabled = settings.soundEnabled;
    }
    
    console.log('Perang Kapal Angka - Game Initialized');
});

// === CLEANUP ON PAGE UNLOAD ===
window.addEventListener('beforeunload', function() {
    // Stop all timers
    TimerHelper.stopAll();
});

// === EXPORT TO GLOBAL SCOPE ===
window.GameState = GameState;
window.StorageManager = StorageManager;
window.URLHelper = URLHelper;
window.SessionManager = SessionManager;
window.MathHelper = MathHelper;
window.AnimationHelper = AnimationHelper;
window.SoundManager = SoundManager;
window.TimerHelper = TimerHelper;
window.Validator = Validator;
window.Formatter = Formatter;