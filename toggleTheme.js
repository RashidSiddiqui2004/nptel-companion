let darkModeEnabled = false;

function applyDarkTheme() {
    document.body.style.backgroundColor = "black";

    const mainbody = document.getElementById("gcb-main-body");

    if (mainbody) {
        mainbody.style.backgroundColor = "#211d1d";
        mainbody.style.color = "white";
    }

    const assignmentDiv = document.getElementById("gcb-main-article");

    if (assignmentDiv) {
        assignmentDiv.style.backgroundColor = "#313131";
        assignmentDiv.style.border = "2px solid";
        assignmentDiv.style.padding = "6px";
    }

    document.querySelectorAll('.gcb-aside').forEach(elem => {
        elem.style.background = "#313131";
        elem.style.border = "0px"
    });

    const introCourseLecture = document.querySelectorAll('.gcb-lesson-content');

    if (introCourseLecture.length > 1) {
        const intro = introCourseLecture[1].querySelector('span');

        if (intro) {
            intro.style.color = 'white';
        }
    }

    const videoTranscriptDiv = document.getElementById('video-transcript-container');
    if (videoTranscriptDiv) {
        videoTranscriptDiv.style.backgroundColor = '#464242';
        videoTranscriptDiv.style.borderColor = '#332f2f';
    }

    const qtFeedbackElements = document.querySelectorAll('.qt-feedback');

    qtFeedbackElements.forEach(feedbackElement => {
        const feedbackHeader = feedbackElement.querySelector('.feedback-header');

        if (feedbackHeader) {
            const correctElements = feedbackHeader.querySelectorAll('.correct');
            const incorrectElements = feedbackHeader.querySelectorAll('.incorrect');

            if (correctElements.length > 0) {
                const firstCorrectElement = correctElements[0];
                firstCorrectElement.style.color = '#04f8a2'; // Set the color to green

                const tickMark = document.createElement('span');
                tickMark.textContent = ' ✔️';
                firstCorrectElement.appendChild(tickMark);

                if (correctElements.length > 1) {
                    const secondCorrectElement = correctElements[1];
                    secondCorrectElement.style.color = '#04f8a2';
                }
            }

            if (incorrectElements.length > 0) {
                const firstIncorrectElement = incorrectElements[0];
                firstIncorrectElement.style.color = '#fd1600'; // Set the color to red

                const crossMark = document.createElement('span');
                crossMark.textContent = ' ❌';
                firstIncorrectElement.appendChild(crossMark);

                if (incorrectElements.length > 1) {
                    const secondIncorrectElement = incorrectElements[1];
                    secondIncorrectElement.style.color = '#fd1600';
                }
            }
        }
    });

    document.querySelectorAll('.faculty-answer').forEach(element => {
        element.style.color = '#0de2cc';
    });
 
    const assignmentTitleDiv = document.querySelector(".assessment-top-info");
    if (assignmentTitleDiv) {
        const assignmentMsg = assignmentTitleDiv.querySelector('strong');
        if (assignmentMsg) {
            assignmentMsg.style.backgroundColor = "#242424"; // Dark background color
            assignmentMsg.style.color = "wheat"; // Light text color
            assignmentMsg.style.padding = "5px"; // Add padding
            assignmentMsg.style.borderRadius = "10px"; // Round corners
        }
    }

    const emailDiv = document.querySelector(".dropdown");
    if (emailDiv) {
        const emailidElement = emailDiv.querySelector('a');
        if (emailDiv) {
            emailidElement.style.color = "white";
        }
    }

    const assignmentSubmittedMsgPopup = document.querySelector('.modal-body');
    if (assignmentSubmittedMsgPopup) {
        assignmentSubmittedMsgPopup.style.backgroundColor = "#812222";
        assignmentSubmittedMsgPopup.style.fontStyle = "italic";
    } else {
        console.warn('.modal-content element not found.');
    }

    const assignmentMsgPopup = document.querySelector('.assessment-pop-up');
    if (assignmentMsgPopup) {
        assignmentMsgPopup.style.backgroundColor = "#555";
    } else {
        console.warn('.assessment-pop-up element not found.');
    }

    const assignmentNotAllAttempt = document.querySelector('#assessment-not-all-attempt-submit');
    if (assignmentNotAllAttempt) {
        assignmentNotAllAttempt.style.backgroundColor = '#40da9d';
        assignmentNotAllAttempt.style.color = '#060606';
    } else {
        console.warn('#assessment-not-all-attempt-submit element not found.');
    }

    // handle sidebar
    const sidebarButtons = document.querySelectorAll(".unit_heading");

    if (sidebarButtons) {
        sidebarButtons.forEach(elem => {
            const btnTitle = elem.querySelector('a');
            if (btnTitle) {
                btnTitle.style.color = '#ffffff';

                elem.addEventListener('mouseover', () => {
                    elem.style.backgroundColor = '#2b2c2b';
                    btnTitle.style.color = '#ffffff';
                });

                elem.addEventListener('mouseout', () => {
                    btnTitle.style.color = '#ffffff';
                    elem.style.backgroundColor = '';
                });
            }
        });
    }

    const sideBarMenu = document.querySelector('.gcb-col-12 ');

    if (sideBarMenu) {
        sideBarMenu.style.backgroundColor = '#1e1d1d';
    }

    const subunitsElement = document.querySelector(".subunit_navbar_current");

    if (subunitsElement) {
        const currentLiElements = subunitsElement.querySelectorAll(".subunit_other");

        currentLiElements.forEach(elem => {
            elem.style.backgroundColor = '#2d2c2cff';

            const proxy = elem.querySelector('div');
            if (proxy) {
                const textelem = proxy.querySelector('a');
                if (textelem) {
                    textelem.style.color = '#fff';
                }
            }
        });

        const currentSubunit = subunitsElement.querySelector(".subunit_current");

        if (currentSubunit) {
            currentSubunit.style.backgroundColor = '#07467eff';

            const proxy = currentSubunit.querySelector('div');
            if (proxy) {
                const textelem = proxy.querySelector('a');
                if (textelem) {
                    textelem.style.color = '#fff';
                }
            }
        }

    }

    const deadlineForAssgment = document.querySelector('.gcb-submission-due-date');

    if (deadlineForAssgment) { deadlineForAssgment.style.color = '#f09f09'; }

    document.querySelectorAll('.qt-question').forEach(elem => {
        elem.style.color = '#ffffff';
    });
}

function applyLightTheme() {
    document.body.style.backgroundColor = "";

    const mainbody = document.getElementById("gcb-main-body");

    if (mainbody) {
        mainbody.style.backgroundColor = ""; // Reset background color to default
        mainbody.style.color = ""; // Reset text color to default
    }

    const assignmentDiv = document.getElementById("gcb-main-article");

    if (assignmentDiv) {
        assignmentDiv.style.backgroundColor = "";
        assignmentDiv.style.border = "";
        assignmentDiv.style.padding = "";
    }

    document.querySelectorAll('.gcb-aside').forEach(elem => {
        elem.style.background = "";
        elem.style.border = ""
    });

    const assignmentTitleDiv = document.querySelector(".assessment-top-info");
    if (assignmentTitleDiv) {
        const assignmentMsg = assignmentTitleDiv.querySelector('strong');
        if (assignmentMsg) {
            assignmentMsg.style.backgroundColor = "";
            assignmentMsg.style.color = "";
            assignmentMsg.style.padding = "";
            assignmentMsg.style.borderRadius = "";
        }
    }

    // Dropdown
    const emailDiv = document.querySelector(".dropdown");
    if (emailDiv) {
        const emailidElement = emailDiv.querySelector('a');
        if (emailidElement) {
            emailidElement.style.color = "black";
        }
    }

    // Handle sidebar
    const sidebarButtons = document.querySelectorAll(".unit_heading");
    sidebarButtons.forEach(elem => {
        const btnTitle = elem.querySelector('a');
        if (btnTitle) {
            btnTitle.style.color = "";

            elem.removeEventListener('mouseover', () => {
                elem.style.backgroundColor = '#2b2c2b';
                btnTitle.style.color = '#ffffff';
            });

            elem.removeEventListener('mouseout', () => {
                btnTitle.style.color = '#ffffff';
                elem.style.backgroundColor = '';
            });
        }
    });

    // Handle subunits
    const subunitsElement = document.querySelector(".subunit_navbar_current");
    if (subunitsElement) {
        const currentLiElements = subunitsElement.querySelectorAll(".subunit_other");
        currentLiElements.forEach(elem => {
            elem.style.backgroundColor = '';
            const proxy = elem.querySelector('div');
            if (proxy) {
                const textelem = proxy.querySelector('a');
                if (textelem) {
                    textelem.style.color = '';
                }
            }
        });
    }

    // Handle deadlines
    const deadlineForAssignment = document.querySelector('.gcb-submission-due-date');
    if (deadlineForAssignment) {
        deadlineForAssignment.style.color = ''; // Reset color to default
    }

    // Handle question text color
    document.querySelectorAll('.qt-question').forEach(elem => {
        elem.style.color = ''; // Reset text color to default
    });

    document.querySelectorAll('.gcb-aside').forEach(elem => {
        elem.style.backgroundColor = '';
    });

    const qtFeedbackElements = document.querySelectorAll('.qt-feedback');
    qtFeedbackElements.forEach(feedbackElement => {
        const feedbackHeader = feedbackElement.querySelector('.feedback-header');
        if (feedbackHeader) {
            // Handle correct elements
            const correctElements = feedbackHeader.querySelectorAll('.correct');
            correctElements.forEach(correctElement => {
                correctElement.style.color = '';
                const tickMarks = correctElement.querySelectorAll('span');
                tickMarks.forEach(tickMark => tickMark.remove());
            });

            // Handle incorrect elements
            const incorrectElements = feedbackHeader.querySelectorAll('.incorrect');
            incorrectElements.forEach(incorrectElement => {
                incorrectElement.style.color = '';
                const crossMarks = incorrectElement.querySelectorAll('span');
                crossMarks.forEach(crossMark => crossMark.remove());
            });
        }
    });

    document.querySelectorAll('.faculty-answer').forEach(element => {
        element.style.color = '';
    });

    const introCourseLecture = document.querySelectorAll('.gcb-lesson-content');

    if (introCourseLecture.length > 1) {
        const intro = introCourseLecture[1].querySelector('span');

        if (intro) {
            intro.style.color = '';
        }
    }

    const videoTranscriptDiv = document.getElementById('video-transcript-container');
    if (videoTranscriptDiv) {
        videoTranscriptDiv.style.backgroundColor = '';
        videoTranscriptDiv.style.borderColor = '';
    }

    const assignmentSubmittedMsgPopup = document.querySelector('.modal-content');
    if (assignmentSubmittedMsgPopup) {
        assignmentSubmittedMsgPopup.style.backgroundColor = "";  
    }

    const assignmentMsgPopup = document.querySelector('.assessment-pop-up');
    if (assignmentMsgPopup) {
        assignmentMsgPopup.style.backgroundColor = ""; 
    }

    const assignmentNotAllAttempt = document.querySelector('#assessment-not-all-attempt-submit');
    if (assignmentNotAllAttempt) {
        assignmentNotAllAttempt.style.backgroundColor = "";  
        assignmentNotAllAttempt.style.color = "";  
    }

}

function applyDarkModeToImages() {
    const images = document.querySelectorAll('.yui-img');

    images.forEach(img => {
        img.style.filter = 'brightness(0.6) contrast(1.5)';
    });
}

function removeDarkModeFromImages() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.style.filter = '';  
    });
}

// Function to toggle dark theme
function toggleDarkTheme() {
    chrome.storage.sync.get('darkThemeEnabled', data => {
        const darkThemeEnabled = !data.darkThemeEnabled;

        chrome.storage.sync.set({ darkThemeEnabled }, () => {
            if (darkThemeEnabled) {
                applyDarkModeToImages();
                applyDarkTheme();
            } else {
                removeDarkModeFromImages();
                applyLightTheme();
            }
        });
    });
}

// Listen for the message from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDarkMode') {
        toggleDarkTheme();
    }
});

chrome.storage.sync.get('darkThemeEnabled', data => {
    if (data.darkThemeEnabled) {
        applyDarkTheme();
    }
});