# NPTEL Companion: Dark Mode & Mock Quiz

## Problem Statement
The default NPTEL (SWAYAM) interface can be bright and straining during long study hours. Additionally, students often need a way to re-attempt assessment questions for better retention without submitting them. **NPTEL Companion** solves both problems by providing a seamless dark theme and an interactive mock quiz generator.

## Key Features
- **🌙 Smart Dark Mode**: Automatically transforms course pages into a sleek, eye-friendly dark theme.
- **📝 Interactive Mock Quizzes**: Generates a revision quiz from any assessment page, allowing for unlimited practice.
- **⚡ Zero Setup**: Works out of the box on all NPTEL course units and assessment pages.
- **🔒 Private**: All quiz data is handled locally in your browser's session storage and cleared once you're done.

## Installation

### Load the Extension in Chrome
1. Clone the repository:
   ```bash
   git clone https://github.com/RashidSiddiqui2004/nptel-dark-theme-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.

## Usage

### 1. Enabling Dark Mode
- Click the **NPTEL Companion** icon in your extension bar.
- Toggle the "Dark Theme" switch. Your preference is saved automatically!

### 2. Taking a Mock Quiz
- Navigate to any NPTEL **Assessment** page.
- Look for the green **"Take Mock Quiz"** button at the top of the assignment.
- Click it to enter full-screen revision mode.
- Submit to see your score and correct answers.
- Close the quiz to return to the original page.

## Technical Overview
Built with Chrome Manifest V3, utilizing:
- **Content Scripts**: For real-time DOM manipulation and style injection.
- **Session Storage**: For secure, temporary answer validation.
- **Vanilla JS/CSS**: For lightweight performance and high compatibility.
