const UI = {
    toggle: document.getElementById('darkModeToggle'),
    status: document.getElementById('statusText'),

    /**
     * Updates the popup UI elements based on the theme state.
     * @param {boolean} isEnabled 
     */
    refresh(isEnabled) {
        this.toggle.checked = !!isEnabled;
        this.status.textContent = isEnabled ? 'On' : 'Off';
    }
};

/**
 * Initializes the popup by fetching the saved theme preference.
 */
async function initializePopup() {
    try {
        const { darkThemeEnabled } = await chrome.storage.sync.get('darkThemeEnabled');
        UI.refresh(darkThemeEnabled);
    } catch (error) {
        console.error('NPTEL Companion: Failed to load settings.', error);
    }
}

/**
 * Communicates the toggle action to the active tab or updates storage directly.
 */
async function handleThemeToggle() {
    const isEnabled = UI.toggle.checked;
    UI.refresh(isEnabled);

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (tab?.id) {
            await chrome.tabs.sendMessage(tab.id, { action: 'toggleDarkMode' });
        } else {
            await chrome.storage.sync.set({ darkThemeEnabled: isEnabled });
        }
    } catch (error) {
        await chrome.storage.sync.set({ darkThemeEnabled: isEnabled });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializePopup);
UI.toggle.addEventListener('change', handleThemeToggle);