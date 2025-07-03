# 🕹️ Ultimate Tic-Tac-Toe Web Game

Welcome to **Ultimate Tic-Tac-Toe**, a modern, feature-rich web-based game developed using **HTML**, **CSS**, and **JavaScript**. This project supports multiple gameplay modes, engaging sound effects, AI opponents, and dynamic board sizes. Real-time multiplayer using **Firebase** will be added in a future release.

---

## 🎯 Features

- ✅ **Grid Size Options**: 3×3, 5×5, 7×7, 9×9 boards  
- 🤖 **Play with Computer (AI)**:
  - Smart AI logic based on strategic scoring
  - Adaptive strategies for each grid size  
- 👥 **Two Player Mode (Same Device)**  
- 🌐 **Multiplayer Mode (Coming Soon)**:
  - Real-time play with friends via Firebase
  - Shareable links or matchmaking  
- 🎵 **Sound Effects**:
  - Click, win, and game-over sounds
  - Background music with mute/unmute & volume control  
- 🎨 **Clean UI/UX**:
  - Responsive and intuitive layout
  - Animated win/draw popups  
- 🚀 **Modular Architecture**:
  - Shared game logic via `gameCore.js`
  - Well-separated code for maintainability  

---

## 🧠 Game Modes

| Mode               | Description                                   |
|--------------------|-----------------------------------------------|
| Single Player       | Play against a smart computer AI              |
| Two Player (Local)  | Two players on the same device                |
| Online Multiplayer  | **Coming Soon: Firebase-powered gameplay**    |

---

## 🧩 Folder Structure

📁 tic-tac-toe-ultimate
├── index.html
├── popBox.js
├── gameCore.js
├── grid_3x3.html / .js / .css
├── grid_5x5.html / .js / .css
├── grid_7x7.html / .js / .css
├── grid_9x9.html / .js / .css
├── assets/
│ ├── sounds/
│ ├── images/
│ └── gifs/
└── CSS/
├── home.css
└── musicStyle.css

yaml
Copy
Edit

---

## ⚙️ Technologies Used

- HTML5, CSS3, Vanilla JavaScript  
- Web Audio API for music and sound control  
- Modular JS structure  
- **Firebase (Coming Soon)** for multiplayer support  

---

## 🚀 Getting Started

### 🔧 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tic-tac-toe-ultimate.git
   cd tic-tac-toe-ultimate
Open index.html in your browser — no server required.

🔌 Firebase Setup (Multiplayer - Coming Soon)
This feature is under development. You can still prepare your Firebase project now.

Go to Firebase Console

Create a new Firebase project

Enable Realtime Database (in test mode for development)

In popBox.js (or a future multiplayer.js file), insert your Firebase config:

js
Copy
Edit
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
Stay tuned for updates when multiplayer is officially launched 🚀

📸 Screenshots![winner](https://github.com/user-attachments/assets/91df54e6-6db5-4f2e-a6f6-553b10f25332)
![gameMode](https://github.com/user-attachments/assets/6047c01f-366d-4eb2-aa75-611ea24af991)
![home](https://github.com/user-attachments/assets/5f2d016b-20e6-43f4-8880-41b5c4be865a)

Home Page	Gameplay	Win Popup
(Add screenshots here)		

🧪 Coming Soon
🌐 Firebase Multiplayer

🏆 Player rankings and scores

💬 In-game chat

⏱️ Timed challenges

📱 Mobile optimization enhancements

🙌 Credits
Designed and Developed by Parkash Kumar
Assets sourced from FreeSound.org and Pexels

📄 License
Licensed under the MIT License — free to use, share, and modify.

yaml
Copy
Edit

---

### ✅ Summary

This version makes it **crystal clear**:
- Firebase multiplayer is **not available yet**
- But the game is still fully playable with **AI and same-device modes**
- Future multiplayer updates will fit naturally without changing your folder structure

Would you also like:
- GitHub Pages deployment guide?
- Auto-detect multiplayer mode from `?join=` links?

Let me know, I’ll help you finish it off professionally.







