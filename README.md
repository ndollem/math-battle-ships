# 🚢 Perang Kapal Angka (Math Battle Ships)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Educational math game for elementary school students (grades 1-6)** where players battle by answering multiplication questions. The faster and more accurate you are, the more damage you deal!

![Game Banner](images/header.png)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Game Modes](#-game-modes)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [How to Play](#-how-to-play)
- [Game Mechanics](#-game-mechanics)
- [Educational Value](#-educational-value)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🎮 Core Features
- ✅ **Single Player Mode** - Battle against AI with 3 difficulty levels (Easy, Medium, Hard)
- ✅ **Player vs Player Mode** - Local multiplayer on the same device
- ✅ **6 Difficulty Levels** - Scaled for elementary school grades 1-6
- ✅ **Dynamic Question Generation** - Smart algorithm prevents repetitive questions
- ✅ **Time-Based Damage System** - Faster answers deal more damage
- ✅ **Real-time Battle Animations** - Missiles, explosions, and ship movements
- ✅ **Performance Tracking** - Accuracy, response time, and grade calculation
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

### 🎯 Educational Features
- 📚 Multiplication practice (1-12 times tables)
- ⚡ Speed and accuracy training
- 📊 Performance feedback and statistics
- 💡 Motivational messages based on performance
- 🏆 Grade system (S, A, B, C, D, F)

---

## 🎬 Demo

### Game Screens
```
Landing Page → Mode Selection → Level Selection → Battle → Results
```

### Sample Gameplay
1. Choose your game mode (Single Player or PvP)
2. Select your grade level (SD 1-6)
3. Answer multiplication questions as fast as you can
4. Watch your ship attack when you answer correctly
5. Defeat your opponent by reducing their HP to zero!

---

## 🎮 Game Modes

### 1️⃣ Single Player (vs AI)
Battle against computer opponents with adjustable difficulty:
- **Easy**: AI answers slowly (60% accuracy, ~4s response time)
- **Medium**: AI has moderate speed (80% accuracy, ~2.5s response time)
- **Hard**: AI is fast and accurate (95% accuracy, ~1.5s response time)

### 2️⃣ Player vs Player (Local Multiplayer)
Two players share the same keyboard:
- **Player 1**: Uses Q, W, E, R keys
- **Player 2**: Uses U, I, O, P keys
- Same questions appear for both players
- Fastest correct answer wins the round!

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure and canvas for animations
- **CSS3** - Styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Bootstrap 5** - Grid system and utilities

### Assets
- **Custom PNG Images** - Ships, missiles, explosions
- **Google Fonts** - Fredoka (child-friendly font)
- **CSS Animations** - Smooth transitions and effects

### Architecture
- **Modular JavaScript** - Separated concerns (animation, battle logic, AI, questions)
- **State Management** - Session and local storage for game state
- **Canvas API** - Hardware-accelerated projectile animations

---

## 📁 Project Structure

```
perang-kapal/
├── index.html              # Landing page
├── mode-select.html        # Mode and level selection
├── game.html              # Main game screen
├── result.html            # Post-game statistics
├── README.md              # This file
│
├── css/
│   ├── style.css          # Global styles and variables
│   ├── landing.css        # Landing page specific styles
│   ├── mode-select.css    # Mode selection styles
│   ├── game.css           # Game page styles
│   └── result.css         # Result page styles
│
├── js/
│   ├── main.js            # Global utilities and helpers
│   ├── question-engine.js # Question generation logic
│   ├── battle-logic.js    # Damage calculation and combat
│   ├── ai-player.js       # AI opponent behavior
│   ├── animation.js       # Canvas animations
│   └── game-controller.js # Main game loop and state
│
├── images/
│   ├── header.png         # Game banner (800x250)
│   ├── ship-red.png       # Player ship (400x220)
│   ├── ship-blue.png      # Player ship (400x220)
│   ├── ship-green.png     # AI ship (400x220)
│   ├── ship-purple.png    # AI ship (400x220)
│   ├── misile.png         # Projectile (200x100)
│   └── explode.png        # Explosion effect (200x200)
│
└── reff/
    ├── concept.md         # Game concept document
    ├── mvp.md            # MVP specifications
    └── asset-sprite-map.txt # Asset mapping reference
```

---

## 🚀 Installation

### Option 1: Direct Download
```bash
# Clone the repository
git clone https://github.com/yourusername/perang-kapal-angka.git

# Navigate to project directory
cd perang-kapal-angka

# Open index.html in your browser
# No build process needed!
```

### Option 2: Live Server (Recommended for Development)
```bash
# Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on index.html
3. Select "Open with Live Server"
```

### Option 3: Python Simple Server
```bash
# Navigate to project directory
cd perang-kapal-angka

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

---

## 🎯 How to Play

### Single Player Mode
1. Click **"Main Sendiri"** (Play Solo) on the landing page
2. Choose AI difficulty: Easy, Medium, or Hard
3. Select your grade level (SD 1-6)
4. Click **"Mulai Permainan!"** (Start Game)
5. Use keyboard numbers **1-4** or click the answer buttons
6. Answer as fast as you can to deal maximum damage!

### Player vs Player Mode
1. Click **"Lawan Teman"** (Challenge Friend) on the landing page
2. Select grade level (SD 1-6)
3. Click **"Mulai Permainan!"** (Start Game)
4. **Player 1** uses **Q, W, E, R** keys
5. **Player 2** uses **U, I, O, P** keys
6. First correct answer wins the round!

### Keyboard Controls
| Mode | Player 1 | Player 2 |
|------|----------|----------|
| Single Player | 1, 2, 3, 4 | N/A |
| PvP | Q, W, E, R | U, I, O, P |
| Pause | ESC | ESC |

---

## ⚔️ Game Mechanics

### Damage System
| Response Time | Damage Type | Damage Amount | Effect |
|--------------|-------------|---------------|---------|
| < 2 seconds | 🔥 Critical | 25 HP | Red glow effect |
| 2-3 seconds | ⚡ Fast | 25 HP | Orange glow |
| 3-10 seconds | 💥 Normal | 15 HP | Standard |
| Wrong answer | ❌ Miss | 0 HP | No damage |

### HP System
- Both players start with **100 HP**
- Each ship has a visual HP bar that changes color:
  - **Green**: 60-100 HP (healthy)
  - **Yellow**: 30-60 HP (warning)
  - **Red**: 0-30 HP (critical)
- First player to reach 0 HP loses!

### Question Generation
- **No repetition**: Same question won't appear twice in a match
- **Smart wrong answers**: 
  - Off-by-one errors (e.g., 7×7 vs 7×8)
  - Addition instead of multiplication
  - Close values to correct answer
- **Difficulty scaling**: Question range matches grade level
  - SD 1-2: 1×1 to 5×5
  - SD 3-4: 1×1 to 10×10
  - SD 5-6: 1×1 to 12×12

### AI Behavior
The AI has realistic behavior patterns:
- **Variable response time**: Follows normal distribution
- **Mistake patterns**: Makes believable errors
- **Adaptive difficulty**: Can be adjusted mid-game (future feature)

---

## 📚 Educational Value

### Target Audience
- **Primary students** (ages 7-12)
- **Grades 1-6** in elementary school
- Suitable for both classroom and home use

### Learning Objectives
1. **Speed**: Improve calculation speed through practice
2. **Accuracy**: Reduce errors in multiplication
3. **Number Sense**: Build intuition for numbers
4. **Pressure Management**: Perform under time constraints

### Pedagogical Approach
- **Gamification**: Learning disguised as entertainment
- **Immediate Feedback**: Visual and textual reinforcement
- **Progressive Difficulty**: Scaffolded learning experience
- **Intrinsic Motivation**: Competition drives engagement

---

## 🎨 Customization

### Change Difficulty Settings
Edit `js/battle-logic.js`:
```javascript
// Modify damage values
baseDamage: 15,
fastBonusDamage: 10,
criticalDamage: 25,

// Modify time thresholds
fastThreshold: 3,      // Under 3 seconds = fast
criticalThreshold: 2,  // Under 2 seconds = critical
```

### Adjust Question Count
Edit `js/game-controller.js`:
```javascript
maxQuestions: 10,  // Default is 10 questions per match
```

### Modify AI Difficulty
Edit `js/ai-player.js`:
```javascript
getBaseResponseTime: function() {
    const times = {
        easy: 4000,    // Change AI speed here
        medium: 2500,
        hard: 1500
    };
}
```

### Add Custom Ships
1. Place ship image in `images/` folder (recommended: 400x220px)
2. Add CSS class in `css/style.css`:
```css
.sprite-player-custom {
    background-image: url('../images/ship-custom.png');
    width: 200px;
    height: 110px;
}
```
3. Update `game.html` to use new ship class

---

## 🌐 Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|---------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Android 90+ | ✅ Fully Supported |

### Required Features
- HTML5 Canvas
- CSS3 Animations
- ES6 JavaScript (arrow functions, classes, template literals)
- Local Storage API
- Session Storage API

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the bug has already been reported
2. Open a new issue with detailed description
3. Include browser version and steps to reproduce

### Suggesting Features
1. Open an issue with `[Feature Request]` prefix
2. Describe the feature and its benefits
3. Provide mockups or examples if possible

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Comment complex logic
- Test on multiple browsers
- Update README if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Perang Kapal Angka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Concept**: Inspired by educational games and naval battle themes
- **Design**: Child-friendly UI with bright colors and animations
- **Fonts**: [Fredoka](https://fonts.google.com/specimen/Fredoka) by Google Fonts
- **Framework**: [Bootstrap 5](https://getbootstrap.com/) for responsive grid
- **Icons**: Unicode emojis for universal compatibility