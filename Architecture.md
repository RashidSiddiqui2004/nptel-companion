# NPTEL Companion Architecture

This document describes the high-level architecture and component interactions of the NPTEL Companion extension.

## Overview

The extension is built using the **Chrome Extension Manifest V3 API**. It enhances the NPTEL user experience through two main pillars: a customizable Dark Theme and a dynamic Mock Quiz generator.

## Core Components

### 1. Manifest (`manifest.json`)
The central registry defining permissions (`storage`, `scripting`) and injection rules. It ensures `toggleTheme.js` and `generateQuiz.js` are injected into all relevant NPTEL course and assessment URLs.

### 2. Dark Theme Engine (`toggleTheme.js` & `styles.css`)
- **Style Injection**: Programmatically overrides hardcoded NPTEL styles to provide a consistent dark experience.
- **Observer Pattern**: Monitors storage changes to toggle themes instantly without page refreshes.
- **Asset Filtering**: Applies CSS filters to images and videos to reduce brightness and contrast for a better dark-mode experience.

### 3. Mock Quiz Generator (`generateQuiz.js`)
- **DOM Scraping**: Parses the active NPTEL assessment page to extract question text, choices, and faculty-accepted answers.
- **UI Overlay**: Renders a dedicated revision environment as a full-screen overlay, preventing background distractions.
- **Validation Logic**: Compares user selections against a temporary `sessionStorage` map of correct answers, providing immediate score feedback.

### 4. Extension UI (`popup.html` & `popup.js`)
- Provides a centralized dashboard for users to control the dark theme and learn about available features.
- Uses the `chrome.tabs.sendMessage` API to communicate state changes to active NPTEL tabs.

## Data Flow

### Theme Persistence
1. User toggles theme in popup.
2. `popup.js` sends message to `toggleTheme.js` and saves to `chrome.storage.sync`.
3. `toggleTheme.js` applies CSS transforms to the DOM.

### Quiz Lifecycle
1. `generateQuiz.js` identifies an assessment page and injects the "Take Mock Quiz" button.
2. Upon click, questions are parsed into a local JSON structure.
3. Correct answers are stored in `sessionStorage` (cleared on quiz close).
4. The Mock Quiz UI is generated and rendered as a modal overlay.

## Tech Stack
- **JavaScript (ES6+)**: Core logic and DOM manipulation.
- **HTML5/CSS3**: Modern, responsive popup and quiz interfaces.
- **Chrome API**: `tabs`, `storage`, `scripting`, and `runtime`.
