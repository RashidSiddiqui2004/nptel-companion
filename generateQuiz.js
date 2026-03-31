const generateQuiz = () => {
    const assessmentBody = document.querySelector(".gcb-assessment-contents");
    if (!assessmentBody) return;

    // Check if button already exists
    if (document.getElementById('nptel-generate-test-btn')) return;

    const button = document.createElement('button');
    button.id = 'nptel-generate-test-btn';
    button.textContent = "Take Mock Quiz";
    button.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 5px 10px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;

    button.addEventListener('click', startQuiz);

    const title = assessmentBody.querySelector('h1');
    if (title) {
        title.insertAdjacentElement('afterend', button);
    } else {
        assessmentBody.prepend(button);
    }
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

        // Extract correct answer from faculty-answer section
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
    const questions = parseQuestions();
    if (questions.length === 0) {
        alert("No questions found on this page.");
        return;
    }

    // Save correct answers to sessionStorage for validation
    const answersMap = {};
    questions.forEach(q => answersMap[q.id] = q.correctAnswer);
    sessionStorage.setItem('nptel_quiz_answers', JSON.stringify(answersMap));

    renderQuizUI(questions);
};

const renderQuizUI = (questions) => {
    const overlay = document.createElement('div');
    overlay.id = 'nptel-quiz-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        z-index: 10000;
        overflow-y: auto;
        padding: 40px 20px;
        color: white;
        font-family: Arial, sans-serif;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
        max-width: 800px;
        margin: 0 auto;
        background: #222;
        padding: 30px;
        border-radius: 10px;
        border: 1px solid #444;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #444;
        padding-bottom: 10px;
    `;
    
    const h2 = document.createElement('h2');
    h2.textContent = "Mock Revision Quiz";
    header.appendChild(h2);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = "✕ Close";
    closeBtn.style.cssText = "background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;";
    closeBtn.onclick = closeQuiz;
    header.appendChild(closeBtn);
    container.appendChild(header);

    questions.forEach((q, qIndex) => {
        const qDiv = document.createElement('div');
        qDiv.style.marginBottom = "25px";
        
        const qP = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = `Q${qIndex + 1}: `;
        qP.appendChild(strong);
        qP.appendChild(document.createTextNode(q.text));
        qDiv.appendChild(qP);

        const choicesDiv = document.createElement('div');
        q.choices.forEach((choice) => {
            const label = document.createElement('label');
            label.style.cssText = "display: block; margin: 8px 0; cursor: pointer; padding: 5px; border-radius: 4px;";
            label.onmouseover = () => label.style.backgroundColor = "#333";
            label.onmouseout = () => label.style.backgroundColor = "transparent";

            const input = document.createElement('input');
            input.type = "radio";
            input.name = `question_${q.id}`;
            input.value = choice;
            input.style.marginRight = "10px";

            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            choicesDiv.appendChild(label);
        });

        qDiv.appendChild(choicesDiv);
        container.appendChild(qDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.textContent = "Submit Answers";
    submitBtn.style.cssText = `
        background: #2196F3;
        color: white;
        border: none;
        padding: 10px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
    `;
    submitBtn.onclick = () => validateAnswers(questions);
    container.appendChild(submitBtn);

    overlay.appendChild(container);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; 
};

const validateAnswers = (questions) => {
    const storedAnswersString = sessionStorage.getItem('nptel_quiz_answers');
    if (!storedAnswersString) return;
    
    const storedAnswers = JSON.parse(storedAnswersString);
    let score = 0;

    questions.forEach(q => {
        const selected = document.querySelector(`input[name="question_${q.id}"]:checked`);
        
        const allInputs = document.querySelectorAll(`input[name="question_${q.id}"]`);
        allInputs.forEach(input => {
            input.parentElement.style.border = "none";
            input.parentElement.style.backgroundColor = "transparent";
        });

        if (selected) {
            if (selected.value === storedAnswers[q.id]) {
                score++;
                selected.parentElement.style.backgroundColor = "rgba(76, 175, 80, 0.3)";
                selected.parentElement.style.border = "1px solid #4CAF50";
            } else {
                selected.parentElement.style.backgroundColor = "rgba(244, 67, 54, 0.3)";
                selected.parentElement.style.border = "1px solid #f44336";
                
                allInputs.forEach(input => {
                    if (input.value === storedAnswers[q.id]) {
                        input.parentElement.style.border = "1px solid #4CAF50";
                        input.parentElement.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
                    }
                });
            }
        } else {
            allInputs.forEach(input => {
                if (input.value === storedAnswers[q.id]) {
                    input.parentElement.style.border = "1px solid #4CAF50";
                }
            });
        }
    });

    alert(`Quiz Submitted!\nYour Score: ${score} / ${questions.length}`);
};

const closeQuiz = () => {
    const overlay = document.getElementById('nptel-quiz-overlay');
    if (overlay) overlay.remove();
    sessionStorage.removeItem('nptel_quiz_answers');
    document.body.style.overflow = '';
};

generateQuiz();