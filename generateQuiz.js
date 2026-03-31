/**
 * NPTEL Companion - Combined Mock Quiz & Exam Mode
 * Consolidates Single-Sheet and Exam-Style views into one interactive interface.
 */

let currentQuestions = [];
let userAnswers = {};
let currentQuestionIndex = 0;
let isGraded = false;
let viewMode = 'exam'; // 'exam' or 'sheet'

const generateQuiz = () => {
    const assessmentBody = document.querySelector(".gcb-assessment-contents");
    if (!assessmentBody) return;

    // Check if the deadline has passed. 
    const deadlineElem = document.querySelector(".gcb-submission-due-date");
    if (deadlineElem) {
        const deadlineStr = deadlineElem.textContent;
        const dateMatch = deadlineStr.match(/(\d{4}-\d{2}-\d{2}),?\s+(\d{2}:\d{2})/);
        if (dateMatch) {
            const [_, datePart, timePart] = dateMatch;
            const deadlineDate = new Date(`${datePart}T${timePart}`);
            if (!isNaN(deadlineDate.getTime()) && Date.now() < deadlineDate.getTime()) {
                console.log("NPTEL Companion: Mock Quiz will be available for revision after the submission deadline.");
                return;
            }
        }
    }

    const hasAnswers = document.querySelector('.faculty-answer');
    if (!hasAnswers) {
        console.log("NPTEL Companion: Correct answers not found. Mock Quiz available only after results published.");
        return;
    }

    if (document.getElementById('nptel-combined-quiz-btn')) return;

    const button = document.createElement('button');
    button.id = 'nptel-combined-quiz-btn';
    button.textContent = "Take Mock Quiz";
    button.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 10px 16px;
        margin: 15px 0;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: block;
        font-weight: 600;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.2s ease;
    `;

    button.onmouseover = () => button.style.backgroundColor = "#45a049";
    button.onmouseout = () => button.style.backgroundColor = "#4CAF50";
    button.onclick = startQuiz;

    const title = assessmentBody.querySelector('h1');
    if (title) title.insertAdjacentElement('afterend', button);
    else assessmentBody.prepend(button);
}

const parseQuestions = () => {
    const questionElements = document.querySelectorAll('.qt-mc-question');
    const questions = [];

    questionElements.forEach((qElem, index) => {
        const questionTextElem = qElem.querySelector('.qt-question');
        const questionText = questionTextElem ? questionTextElem.innerText.trim() : "";
        
        const choices = [];
        qElem.querySelectorAll('.gcb-mcq-choice').forEach(choiceElem => {
            const label = choiceElem.querySelector('label');
            if (label) choices.push(label.innerText.trim());
        });

        const facultyAnswerElem = qElem.querySelector('.faculty-answer label');
        const correctAnswer = facultyAnswerElem ? facultyAnswerElem.innerText.trim() : null;

        if (questionText && choices.length > 0) {
            questions.push({
                id: index,
                text: questionText,
                choices: choices,
                correctAnswer: correctAnswer
            });
        }
    });

    return questions;
};

const startQuiz = () => {
    currentQuestions = parseQuestions();
    if (currentQuestions.length === 0) {
        alert("No questions found on this page.");
        return;
    }

    userAnswers = {};
    currentQuestionIndex = 0;
    isGraded = false;
    viewMode = 'exam';

    const answersMap = {};
    currentQuestions.forEach(q => answersMap[q.id] = q.correctAnswer);
    sessionStorage.setItem('nptel_quiz_answers', JSON.stringify(answersMap));

    renderOverlay();
};

const renderOverlay = () => {
    const existing = document.getElementById('nptel-quiz-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'nptel-quiz-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: #0f0f0f;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        color: #e0e0e0;
        font-family: 'Segoe UI', Roboto, sans-serif;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        height: 65px;
        background: #1e1e1e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        border-bottom: 1px solid #333;
    `;

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<h2 style="margin:0; color:#4CAF50; font-size:1.2rem;">NPTEL Companion Quiz</h2>`;
    header.appendChild(titleDiv);

    const controls = document.createElement('div');
    controls.style.cssText = "display:flex; align-items:center; gap:20px;";

    // Mode Toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = "display:flex; background:#333; padding:4px; border-radius:6px;";
    
    const examBtn = createModeBtn("Exam Mode", 'exam');
    const sheetBtn = createModeBtn("Sheet Mode", 'sheet');
    
    toggleContainer.appendChild(examBtn);
    toggleContainer.appendChild(sheetBtn);
    controls.appendChild(toggleContainer);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = "Exit";
    closeBtn.style.cssText = "background:#444; color:#fff; border:none; padding:8px 16px; border-radius:4px; cursor:pointer;";
    closeBtn.onclick = closeQuiz;
    controls.appendChild(closeBtn);

    header.appendChild(controls);
    overlay.appendChild(header);

    // Main Content
    const mainArea = document.createElement('div');
    mainArea.id = 'quiz-main-content';
    mainArea.style.cssText = "flex:1; display:flex; overflow:hidden;";
    overlay.appendChild(mainArea);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    renderContent();
};

const createModeBtn = (text, mode) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    const isActive = viewMode === mode;
    btn.style.cssText = `
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        background: ${isActive ? '#4CAF50' : 'transparent'};
        color: ${isActive ? '#fff' : '#aaa'};
        transition: all 0.2s;
    `;
    btn.onclick = () => {
        if (viewMode === mode) return;
        viewMode = mode;
        renderOverlay(); // Re-render to update toggle state
    };
    return btn;
}

const renderContent = () => {
    const mainArea = document.getElementById('quiz-main-content');
    if (!mainArea) return;
    mainArea.innerHTML = '';

    if (viewMode === 'exam') {
        renderExamMode(mainArea);
    } else {
        renderSheetMode(mainArea);
    }
};

const renderExamMode = (container) => {
    const sidebar = document.createElement('div');
    sidebar.style.cssText = "width:260px; background:#181818; border-right:1px solid #333; padding:20px; overflow-y:auto;";
    
    const grid = document.createElement('div');
    grid.style.cssText = "display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px;";
    
    const storedAnswers = JSON.parse(sessionStorage.getItem('nptel_quiz_answers'));

    currentQuestions.forEach((_, index) => {
        const item = document.createElement('div');
        item.textContent = index + 1;
        const isAttempted = userAnswers[index] !== undefined;
        const isCurrent = index === currentQuestionIndex;

        let bgColor = "#2d2d2e";
        let borderColor = isCurrent ? "#4CAF50" : "#3d3d3e";
        if (isAttempted) bgColor = "#2196F3";
        if (isGraded) {
            bgColor = userAnswers[index] === storedAnswers[index] ? "#4CAF50" : "#f44336";
        }

        item.style.cssText = `
            height:40px; display:flex; align-items:center; justify-content:center;
            background:${bgColor}; border:2px solid ${borderColor}; border-radius:4px; cursor:pointer; font-weight:bold;
        `;
        item.onclick = () => { currentQuestionIndex = index; renderContent(); };
        grid.appendChild(item);
    });
    sidebar.appendChild(grid);
    container.appendChild(sidebar);

    const display = document.createElement('div');
    display.style.cssText = "flex:1; padding:40px; overflow-y:auto; display:flex; flex-direction:column; align-items:center;";
    
    const card = renderQuestionCard(currentQuestionIndex, true);
    display.appendChild(card);
    container.appendChild(display);
};

const renderSheetMode = (container) => {
    const sheet = document.createElement('div');
    sheet.style.cssText = "flex:1; padding:40px; overflow-y:auto; display:flex; flex-direction:column; align-items:center;";
    
    currentQuestions.forEach((_, index) => {
        sheet.appendChild(renderQuestionCard(index, false));
    });

    if (!isGraded) {
        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Final Submit";
        submitBtn.style.cssText = "background:#2196F3; color:#fff; border:none; padding:16px 40px; border-radius:8px; cursor:pointer; font-size:16px; font-weight:bold; margin: 20px 0 60px 0;";
        submitBtn.onclick = validateAnswers;
        sheet.appendChild(submitBtn);
    } else {
        const retakeBtn = document.createElement('button');
        retakeBtn.textContent = "Close Quiz and Reset";
        retakeBtn.style.cssText = "background:#444; color:#fff; border:none; padding:16px 40px; border-radius:8px; cursor:pointer; margin-bottom:60px;";
        retakeBtn.onclick = closeQuiz;
        sheet.appendChild(retakeBtn);
    }

    container.appendChild(sheet);
};

const renderQuestionCard = (index, isExam) => {
    const q = currentQuestions[index];
    const card = document.createElement('div');
    card.style.cssText = `width:100%; max-width:700px; background:#1e1e1e; padding:30px; border-radius:12px; border: 1px solid #333; margin-bottom:25px;`;

    const qTitle = document.createElement('h3');
    qTitle.style.cssText = "margin-top:0; color:#4CAF50; font-size:1.1rem;";
    qTitle.textContent = `Question ${index + 1}`;
    card.appendChild(qTitle);

    const qText = document.createElement('p');
    qText.style.cssText = "font-size:18px; line-height:1.6; color:#fff;";
    qText.textContent = q.text;
    card.appendChild(qText);

    const choicesDiv = document.createElement('div');
    q.choices.forEach(choice => {
        const label = document.createElement('label');
        const isSelected = userAnswers[index] === choice;
        
        let bgColor = "#252526";
        let border = "1px solid #333";
        let opacity = "1";

        if (isSelected) {
            bgColor = "rgba(33, 150, 243, 0.1)";
            border = "1px solid #2196F3";
        }

        if (isGraded) {
            opacity = "0.7";
            if (choice === q.correctAnswer) {
                bgColor = "rgba(76, 175, 80, 0.2)";
                border = "2px solid #4CAF50";
                opacity = "1";
            } else if (isSelected) {
                bgColor = "rgba(244, 67, 54, 0.2)";
                border = "2px solid #f44336";
                opacity = "1";
            }
        }

        label.style.cssText = `display:flex; align-items:center; padding:15px; margin-bottom:10px; background:${bgColor}; border:${border}; border-radius:8px; cursor:pointer; opacity:${opacity}; transition:0.2s;`;

        const input = document.createElement('input');
        input.type = "radio";
        input.name = `choice_${index}`;
        input.value = choice;
        input.checked = isSelected;
        input.disabled = isGraded;
        input.style.marginRight = "15px";
        input.onchange = () => {
            userAnswers[index] = choice;
            if (isExam) renderContent();
        };

        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        choicesDiv.appendChild(label);
    });
    card.appendChild(choicesDiv);

    if (isExam) {
        const nav = document.createElement('div');
        nav.style.cssText = "display:flex; justify-content:space-between; margin-top:30px;";
        
        const prev = document.createElement('button');
        prev.textContent = "← Previous";
        prev.disabled = index === 0;
        prev.style.cssText = `padding:10px 20px; background:#333; color:#fff; border:none; border-radius:4px; opacity:${prev.disabled ? 0.5 : 1}; cursor:pointer;`;
        prev.onclick = () => { currentQuestionIndex--; renderContent(); };

        const next = document.createElement('button');
        const isLast = index === currentQuestions.length - 1;
        next.textContent = isLast ? (isGraded ? "Results Summary" : "Review & Submit") : "Next →";
        next.style.cssText = `padding:10px 20px; background:${isLast ? '#2196F3' : '#4CAF50'}; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;`;
        nextBtnAction(next, isLast);

        nav.appendChild(prev);
        nav.appendChild(next);
        card.appendChild(nav);
    }

    return card;
};

const nextBtnAction = (btn, isLast) => {
    btn.onclick = () => {
        if (isLast) {
            if (isGraded) {
                viewMode = 'sheet';
                renderOverlay();
            } else {
                validateAnswers();
            }
        } else {
            currentQuestionIndex++;
            renderContent();
        }
    };
}

const validateAnswers = () => {
    const unattempted = currentQuestions.length - Object.keys(userAnswers).length;
    if (unattempted > 0 && !confirm(`Submit with ${unattempted} unanswered questions?`)) return;

    isGraded = true;
    const storedAnswers = JSON.parse(sessionStorage.getItem('nptel_quiz_answers'));
    let score = 0;
    currentQuestions.forEach((q, i) => { if (userAnswers[i] === storedAnswers[i]) score++; });

    alert(`Quiz Finished!\nYour Score: ${score} / ${currentQuestions.length}`);
    renderOverlay();
};

const closeQuiz = () => {
    const overlay = document.getElementById('nptel-quiz-overlay');
    if (overlay) overlay.remove();
    sessionStorage.removeItem('nptel_quiz_answers');
    document.body.style.overflow = '';
};

generateQuiz();
