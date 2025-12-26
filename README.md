# 🚢 Perang Kapal Angka (Math Battle Ships)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Multi-subject educational game for elementary school students (grades 1-6)** where players battle by answering questions. Master math multiplication or food chain concepts while having fun!

![Game Banner](images/header.png)

🎮 **[Play Live Demo](https://ndollem.github.io/math-battle-ships/)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Subjects Available](#-subjects-available)
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
- ✅ **Two Educational Subjects** - Mathematics (Multiplication) & Science (Food Chains)
- ✅ **Single Player Mode** - Battle against AI with 3 difficulty levels (Easy, Medium, Hard)
- ✅ **Player vs Player Mode** - Local multiplayer on the same device with clear player identification
- ✅ **6 Grade Levels** - Scaled for elementary school grades 1-6 (SD 1-6)
- ✅ **Dynamic Question Generation** - Smart algorithm prevents repetitive questions
- ✅ **Time-Based Damage System** - Faster answers deal more damage
- ✅ **Real-time Battle Animations** - Missiles, explosions, and ship movements using Canvas API
- ✅ **Performance Tracking** - Accuracy, response time, and grade calculation
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🎯 Educational Features
- 📚 **Mathematics**: Multiplication practice (1-12 times tables)
- 🌿 **Science (IPAS)**: Food chain concepts, producers, consumers, decomposers
- ⚡ Speed and accuracy training
- 📊 Detailed performance feedback and statistics
- 💡 Motivational messages based on performance
- 🏆 Grade system (S, A, B, C, D, F)
- 📈 Progressive difficulty scaling per grade level

---

## 🎬 Demo

**🌐 Live Demo**: [https://ndollem.github.io/math-battle-ships/](https://ndollem.github.io/math-battle-ships/)

### Game Flow
```
Landing Page → Subject Selection → Mode Selection → Level Selection → Battle → Results
```

### Sample Gameplay
1. Choose your subject (Mathematics or IPAS)
2. Choose your game mode (Single Player or PvP)
3. Select your grade level (SD 1-6)
4. Answer questions as fast as you can
5. Watch your ship attack when you answer correctly
6. Defeat your opponent by reducing their HP to zero!

---

## 📚 Subjects Available

### 1️⃣ Mathematics (Matematika) - Perkalian
Multiplication practice scaled by grade level:
- **SD 1-2**: Multiplication tables 1-5
- **SD 3-4**: Multiplication tables 1-10
- **SD 5-6**: Multiplication tables 1-12

**Question Format**: "7 × 8 = ?"
**Total Questions**: Dynamic generation, no repetition

### 2️⃣ Science (IPAS) - Rantai Makanan (Food Chains)
Learn about ecosystems and food chains:
- **SD 1-2**: Basic concepts (Producers & Consumers)
- **SD 3-4**: Simple food chains (Herbivores, Carnivores)
- **SD 5-6**: Complex chains (Food webs, Decomposers, Energy pyramid)

**Question Format**: Multiple choice with explanations
**Total Questions**: 65+ curated questions across all levels

**Topics Covered**:
- Producers (plants, photosynthesis)
- Primary consumers (herbivores)
- Secondary consumers (carnivores)
- Tertiary consumers (top predators)
- Decomposers (bacteria, fungi)
- Omnivores
- Food webs and energy pyramids

---

## 🎮 Game Modes

### 1️⃣ Single Player (vs AI)
Battle against computer opponents with adjustable difficulty:
- **😊 Easy**: AI answers slowly (60% accuracy, ~4s response time)
- **😐 Medium**: AI has moderate speed (80% accuracy, ~2.5s response time)
- **😤 Hard**: AI is fast and accurate (95% accuracy, ~1.5s response time)

### 2️⃣ Player vs Player (Local Multiplayer)
Two players share the same keyboard:
- **Player 1**: Uses Q, W, E, R keys (Blue Ship)
- **Player 2**: Uses U, I, O, P keys (Red Ship)
- Same questions appear for both players
- Fastest correct answer wins the round!
- Results clearly show which player won (Player 1 or Player 2)

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
- **Canvas API** - Hardware-accelerated projectile animations

### Architecture
- **Modular JavaScript** - Separated concerns (animation, battle logic, AI, questions)
- **State Management** - Session and local storage for game state
- **JSON Data Module** - Structured question database for easy maintenance
- **Event-Driven** - Responsive keyboard and click interactions

---

## 📁 Project Structure

```
perang-kapal/
├── index.html              # Landing page with subject selection
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
│   ├── question-engine.js # Math question generation logic
│   ├── food-chain-engine.js # IPAS question engine
│   ├── food-chain-data.js # Food chain questions database (65+ questions)
│   ├── battle-logic.js    # Damage calculation and combat
│   ├── ai-player.js       # AI opponent behavior
│   ├── animation.js       # Canvas animations (missiles, explosions)
│   └── game-controller.js # Main game loop and state management
│
├── images/
│   ├── header.png         # Game banner (800x250)
│   ├── og-image.png       # Social media preview (1200x630)
│   ├── ship-red.png       # Player ship (400x220, facing right)
│   ├── ship-blue.png      # Player ship (400x220, facing right)
│   ├── ship-green.png     # AI ship (400x220, facing left)
│   ├── ship-purple.png    # AI ship (400x220, facing left)
│   ├── misile.png         # Projectile (200x100, facing left)
│   └── explode.png        # Explosion effect (200x200, centered)
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
git clone https://github.com/ndollem/math-battle-ships.git

# Navigate to project directory
cd math-battle-ships

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
cd math-battle-ships

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Option 4: View Live Demo
Visit: [https://ndollem.github.io/math-battle-ships/](https://ndollem.github.io/math-battle-ships/)

---

## 🎯 How to Play

### Single Player Mode
1. Click **"Main Sendiri"** (Play Solo) on the landing page
2. Choose your subject: **Matematika** or **IPAS**
3. Choose AI difficulty: **Easy**, **Medium**, or **Hard**
4. Select your grade level (**SD 1-6**)
5. Click **"Mulai Permainan!"** (Start Game)
6. Use keyboard numbers **1-4** or click the answer buttons
7. Answer as fast as you can to deal maximum damage!

### Player vs Player Mode
1. Click **"Lawan Teman"** (Challenge Friend) on the landing page
2. Choose your subject: **Matematika** or **IPAS**
3. Select grade level (**SD 1-6**)
4. Click **"Mulai Permainan!"** (Start Game)
5. **Player 1** uses **Q, W, E, R** keys (Blue Ship - Left side)
6. **Player 2** uses **U, I, O, P** keys (Red Ship - Right side)
7. First correct answer wins the round!
8. Winner is clearly displayed in results (Player 1 or Player 2)

### Keyboard Controls
| Mode | Player 1 | Player 2 |
|------|----------|----------|
| Single Player | 1, 2, 3, 4 | N/A |
| PvP | Q, W, E, R | U, I, O, P |
| Pause | ESC | ESC |
| Mouse | Click buttons | Click buttons |

---

## ⚔️ Game Mechanics

### Damage System
| Response Time | Damage Type | Damage Amount | Visual Effect |
|--------------|-------------|---------------|---------------|
| < 2 seconds | 🔥 Critical | 25 HP | Red glow + large explosion |
| 2-3 seconds | ⚡ Fast | 25 HP | Orange glow + normal explosion |
| 3-10 seconds | 💥 Normal | 15 HP | Standard missile |
| Wrong answer | ❌ Miss | 0 HP | No damage, next question |

### HP System
- Both players start with **100 HP**
- Each ship has a visual HP bar that changes color:
  - **🟢 Green**: 60-100 HP (healthy)
  - **🟡 Yellow**: 30-60 HP (warning)
  - **🔴 Red**: 0-30 HP (critical)
- First player to reach 0 HP loses!
- HP bar updates in real-time with smooth animations

### Question Generation

#### Mathematics Mode
- **No repetition**: Same question won't appear twice in a match
- **Smart wrong answers**: 
  - Off-by-one errors (e.g., 7×7 vs 7×8)
  - Addition instead of multiplication
  - Close values to correct answer
- **Difficulty scaling**: Question range matches grade level
  - SD 1-2: 1×1 to 5×5
  - SD 3-4: 1×1 to 10×10
  - SD 5-6: 1×1 to 12×12

#### IPAS Mode
- **65+ curated questions** across all grade levels
- **4 multiple choice answers** per question
- **Explanations provided** after each answer
- **Topic categories**:
  - Producers & Plants
  - Herbivores
  - Carnivores
  - Omnivores
  - Decomposers
  - Food Chains & Webs
  - Energy Pyramids
  - Ecosystems

### AI Behavior
The AI has realistic behavior patterns:
- **Variable response time**: Follows normal distribution
- **Mistake patterns**: Makes believable errors (not random)
- **Difficulty-based**: Easy AI makes more mistakes, Hard AI is nearly perfect
- **Subject-aware**: AI adapts to both math and science questions

---

## 📚 Educational Value

### Target Audience
- **Primary students** (ages 7-12)
- **Grades 1-6** in elementary school (SD 1-6)
- Suitable for both classroom and home use
- Supports Indonesian curriculum (Kurikulum Merdeka)

### Learning Objectives

#### Mathematics (Matematika)
1. **Speed**: Improve calculation speed through practice
2. **Accuracy**: Reduce errors in multiplication
3. **Number Sense**: Build intuition for numbers
4. **Mental Math**: Strengthen quick calculation skills

#### Science (IPAS - Rantai Makanan)
1. **Ecosystem Understanding**: Learn food chain relationships
2. **Classification**: Identify producers, consumers, decomposers
3. **Critical Thinking**: Understand energy flow in ecosystems
4. **Vocabulary**: Build science terminology

### Pedagogical Approach
- **Gamification**: Learning disguised as entertainment
- **Immediate Feedback**: Visual and textual reinforcement
- **Progressive Difficulty**: Scaffolded learning experience
- **Intrinsic Motivation**: Competition drives engagement
- **Multi-sensory**: Visual, auditory, and kinesthetic elements
- **Safe Practice**: Pressure-free environment with no negative consequences

---

## 🎨 Customization

### Add More IPAS Questions
Edit `js/food-chain-data.js`:
```javascript
// Add questions to appropriate level array
"level_3_4": [
    {
        "id": 999,
        "question": "Your new question here?",
        "correct_answer": "Correct answer",
        "wrong_answers": ["Wrong 1", "Wrong 2", "Wrong 3"],
        "explanation": "Why this is correct...",
        "category": "herbivore"
    }
]
```

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
    background-size: contain;
}
```
3. Update `game.html` to use new ship class

### Add New Subject
1. Create new question engine file: `js/your-subject-engine.js`
2. Create data file: `js/your-subject-data.js`
3. Update `index.html` to include new subject option
4. Modify `game-controller.js` to handle new subject type

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
- CSS3 Animations & Transitions
- ES6 JavaScript (arrow functions, classes, template literals)
- Local Storage API
- Session Storage API
- Flexbox & CSS Grid

### Performance Notes
- Game runs at 60 FPS on modern devices
- Canvas animations are hardware-accelerated
- Responsive design adapts to screen sizes 320px-4K
- Touch-optimized for mobile devices

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/ndollem/math-battle-ships/issues)
2. Open a new issue with detailed description
3. Include browser version and steps to reproduce
4. Add screenshots if applicable

### Suggesting Features
1. Open an issue with `[Feature Request]` prefix
2. Describe the feature and its educational benefits
3. Provide mockups or examples if possible

### Adding Content
- **IPAS Questions**: Submit new food chain questions via PR
- **Math Topics**: Suggest new math operations (division, addition, etc.)
- **Subjects**: Propose new subjects (History, Geography, etc.)

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request with clear description

### Development Guidelines
- Follow existing code style (ES6+, modular approach)
- Comment complex logic in Indonesian or English
- Test on multiple browsers and devices
- Update README if adding new features
- Keep file sizes reasonable (optimize images)

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
- **Design**: Child-friendly UI with bright colors and smooth animations
- **Fonts**: [Fredoka](https://fonts.google.com/specimen/Fredoka) by Google Fonts
- **Framework**: [Bootstrap 5](https://getbootstrap.com/) for responsive grid
- **Icons**: Unicode emojis for universal compatibility
- **IPAS Content**: Curated from elementary school science curriculum
- **Mathematics**: Based on Indonesian primary school curriculum (SD)

---

## 🎓 Educational Credits

### Content Alignment
- **Kurikulum Merdeka** (Indonesian Curriculum)
- **SD (Sekolah Dasar)** grade levels 1-6
- **IPAS** (Ilmu Pengetahuan Alam dan Sosial)
- **Matematika** (Mathematics)

### Subject Matter Experts
Questions and difficulty levels reviewed for age-appropriateness and curriculum alignment.

---

## 📧 Contact

**Developer**: ndollem  
**Project Link**: [https://github.com/ndollem/math-battle-ships](https://github.com/ndollem/math-battle-ships)  
**Live Demo**: [https://ndollem.github.io/math-battle-ships/](https://ndollem.github.io/math-battle-ships/)