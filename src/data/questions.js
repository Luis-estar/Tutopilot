export const SUBJECTS = {
    MATH: 'math',
    LANGUAGE: 'language',
    HISTORY: 'history',
};

export const GRADES = [1, 2, 3, 4, 5, 6];

const generateMathQuestion = (grade) => {
    let num1, num2, operator, answer;

    switch (grade) {
        case 1:
            // Simple addition and subtraction up to 20
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operator = Math.random() > 0.5 ? '+' : '-';
            if (operator === '-') {
                if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
            }
            answer = operator === '+' ? num1 + num2 : num1 - num2;
            break;
        case 2:
            // Addition/Subtraction up to 100
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 40) + 1;
            operator = Math.random() > 0.5 ? '+' : '-';
            if (operator === '-') {
                if (num1 < num2) [num1, num2] = [num2, num1];
            }
            answer = operator === '+' ? num1 + num2 : num1 - num2;
            break;
        case 3:
            // Multiplication basics
            num1 = Math.floor(Math.random() * 9) + 2;
            num2 = Math.floor(Math.random() * 9) + 2;
            operator = '*';
            answer = num1 * num2;
            break;
        case 4:
            // Division basics and larger multiplication
            if (Math.random() > 0.5) {
                num2 = Math.floor(Math.random() * 9) + 2;
                answer = Math.floor(Math.random() * 10) + 2;
                num1 = num2 * answer;
                operator = '/';
            } else {
                num1 = Math.floor(Math.random() * 12) + 2;
                num2 = Math.floor(Math.random() * 12) + 2;
                operator = '*';
                answer = num1 * num2;
            }
            break;
        case 5:
        case 6:
            // Mixed operations, slightly larger numbers
            const ops = ['+', '-', '*', '/'];
            operator = ops[Math.floor(Math.random() * ops.length)];
            if (operator === '/') {
                num2 = Math.floor(Math.random() * 15) + 3;
                answer = Math.floor(Math.random() * 20) + 2;
                num1 = num2 * answer;
            } else if (operator === '*') {
                num1 = Math.floor(Math.random() * 20) + 5;
                num2 = Math.floor(Math.random() * 20) + 5;
                answer = num1 * num2;
            } else {
                num1 = Math.floor(Math.random() * 500) + 50;
                num2 = Math.floor(Math.random() * 500) + 50;
                if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
                answer = operator === '+' ? num1 + num2 : num1 - num2;
            }
            break;
        default:
            num1 = 1; num2 = 1; operator = '+'; answer = 2;
    }

    // Generate options
    const options = new Set([answer]);
    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const val = answer + offset;
        if (val !== answer && val >= 0) options.add(val);
    }

    return {
        type: 'math',
        question: `What is ${num1} ${operator} ${num2}?`,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        correctAnswer: answer,
    };
};

const HISTORY_QUESTIONS = {
    1: [
        { q: "Who was the first President of the USA?", a: "George Washington", opts: ["Lincoln", "Washington", "Jefferson", "Adams"] },
        { q: "Which holiday honors workers?", a: "Labor Day", opts: ["Labor Day", "Halloween", "Christmas", "Easter"] }
    ],
    // ... Expand for other grades ...
    6: [
        { q: "In which year did World War II end?", a: "1945", opts: ["1939", "1945", "1918", "1960"] },
        { q: "Who painted the Mona Lisa?", a: "Da Vinci", opts: ["Picasso", "Van Gogh", "Da Vinci", "Michelangelo"] }
    ]
};

const LANGUAGE_QUESTIONS = {
    1: [
        { q: "Which word rhymes with 'Cat'?", a: "Hat", opts: ["Dog", "Hat", "Car", "Ball"] },
    ],
    6: [
        { q: "Identify the verb: 'He runs fast.'", a: "runs", opts: ["He", "runs", "fast", "."] },
    ]
};

// Helper to pick random from array
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateQuestion = (grade, subject) => {
    if (subject === SUBJECTS.MATH) {
        return generateMathQuestion(grade);
    }

    // Fallback for History/Language with limited static data for now
    // In a real app, this would be a larger DB or API
    let pool;
    if (subject === SUBJECTS.HISTORY) pool = HISTORY_QUESTIONS[grade] || HISTORY_QUESTIONS[6]; // Fallback to 6 if missing
    if (subject === SUBJECTS.LANGUAGE) pool = LANGUAGE_QUESTIONS[grade] || LANGUAGE_QUESTIONS[6];

    if (!pool) {
        // Generic fallback if empty (should fill these out)
        return {
            question: `Sample ${subject} question for Grade ${grade}`,
            options: ["A", "B", "C", "D"],
            correctAnswer: "A"
        };
    }

    const qData = pick(pool);
    return {
        type: 'text', // Multiple choice text
        question: qData.q,
        options: qData.opts,
        correctAnswer: qData.a
    };
};
