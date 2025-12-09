// 六年級數學測驗題目資料
const questions = [
    {
        unit: "分數除法",
        question: "1. 一條緞帶長 $\\frac{4}{5}$ 公尺，每 $\\frac{1}{10}$ 公尺剪成一段，請問可以剪成幾段？",
        image: null,
        answers: [
            { text: "8 段", correct: true },
            { text: "4 段", correct: false },
            { text: "2 段", correct: false },
            { text: "10 段", correct: false }
        ]
    },
    {
        unit: "分數除法",
        question: "2. 小明跑 1 公里用了 $\\frac{1}{6}$ 小時。他每小時跑幾公里？",
        image: null, // 這裡可以加入跑步動畫圖片
        answers: [
            { text: "6 公里", correct: true },
            { text: "3 公里", correct: false },
            { text: "12 公里", correct: false },
            { text: "18 公里", correct: false }
        ]
    },
    {
        unit: "速率",
        question: "3. 聲音傳播的速率大約是每秒 340 公尺。請問 5 秒鐘聲音可以傳播多遠？",
        image: null,
        answers: [
            { text: "1700 公尺", correct: true },
            { text: "68 公尺", correct: false },
            { text: "345 公尺", correct: false },
            { text: "335 公尺", correct: false }
        ]
    },
    {
        unit: "速率",
        question: "4. 一輛火車行駛 180 公里，花了 2 小時。這輛火車的時速是多少？",
        image: null, // 這裡可以加入火車圖片
        answers: [
            { text: "時速 90 公里", correct: true },
            { text: "時速 60 公里", correct: false },
            { text: "時速 360 公里", correct: false },
            { text: "時速 180 公里", correct: false }
        ]
    },
    {
        unit: "圓面積",
        question: "5. 請問這個半徑 5 公分的圓形，它的面積大約是多少平方公分？（圓周率用 3.14 計算）",
        // 圖形：顯示一個圓形，中間標註半徑 R=5
        image: { type: 'circle', radius: 5 }, 
        answers: [
            { text: "78.5 平方公分", correct: true }, // 3.14 * 5 * 5 = 78.5
            { text: "31.4 平方公分", correct: false }, // 圓周長
            { text: "25 平方公分", correct: false },
            { text: "15.7 平方公分", correct: false }
        ]
    },
    {
        unit: "圓面積",
        question: "6. 一個直徑是 10 公尺的圓形花圃，它的面積大約是多少平方公尺？（圓周率用 3.14 計算）",
        // 圖形：顯示一個圓形，中間標註直徑 D=10
        image: { type: 'circle', diameter: 10 }, 
        answers: [
            { text: "78.5 平方公尺", correct: true }, // 半徑 R=5, 3.14 * 5 * 5 = 78.5
            { text: "31.4 平方公尺", correct: false }, 
            { text: "100 平方公尺", correct: false },
            { text: "314 平方公尺", correct: false }
        ]
    }
];

// 取得 HTML 頁面上的元素
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const feedbackMessage = document.getElementById('feedback-message');
const imageArea = document.getElementById('image-area');

// 遊戲狀態變數
let currentQuestionIndex = 0;
let score = 0;
let isAnswerLocked = false; // 避免重複點擊

// --- 主要遊戲邏輯 ---

/**
 * 遊戲開始：重設分數和題目索引，顯示第一題
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    showQuestion();
}

/**
 * 顯示當前的題目和選項
 */
function showQuestion() {
    isAnswerLocked = false;
    // 清除舊的答案按鈕和圖形
    answerButtons.innerHTML = '';
    imageArea.innerHTML = ''; 

    // 取得當前的題目物件
    const currentQuestion = questions[currentQuestionIndex];
    
    // 顯示題目文字
    // 這裡用了簡單的替換來處理分數和簡單的數學符號，避免複雜的 LaTeX
    let formattedQuestion = currentQuestion.question
        .replace(/\\frac{(\d+)}{(\d+)}/g, (match, num, den) => `${num}/${den}`) // 替換 \frac{4}{5} 為 4/5
        .replace(/\\times/g, '乘')
        .replace(/\$/g, ''); // 移除 \$ 符號

    questionText.textContent = formattedQuestion;

    // 處理圖形顯示 (簡單的動畫/圖示模擬)
    if (currentQuestion.image && currentQuestion.image.type === 'circle') {
        const imgInfo = currentQuestion.image;
        let label = '';
        let radius = 0;

        if (imgInfo.radius) {
            radius = imgInfo.radius;
            label = `半徑 ${imgInfo.radius} 公分`;
        } else if (imgInfo.diameter) {
            radius = imgInfo.diameter / 2;
            label = `直徑 ${imgInfo.diameter} 公尺`;
        }

        // 創建一個簡單的圓形 HTML 元素 (動畫效果用 CSS 模擬)
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle-drawing');
        circleDiv.style.width = `${radius * 15}px`; // 根據半徑調整大小
        circleDiv.style.height = `${radius * 15}px`;
        circleDiv.innerHTML = `<p style="font-size:14px; margin:0;">${label}</p>`;
        imageArea.appendChild(circleDiv);
    }
    // 備註：更複雜的動畫如跑步、火車等，需要使用圖片檔或 CSS/SVG 動畫，這裡以簡單的圓形圖示替代。

    // 顯示答案按鈕
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

/**
 * 處理玩家點擊答案的事件
 * @param {Event} e - 點擊事件
 */
function selectAnswer(e) {
    if (isAnswerLocked) return; // 鎖定點擊，防止重複操作
    isAnswerLocked = true;

    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    // 顯示對錯提示
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score += 10; // 答對加 10 分
        feedbackMessage.textContent = '🎉 答對了！太棒了！';
        feedbackMessage.style.backgroundColor = '#d4edda';
        feedbackMessage.style.color = '#155724';
    } else {
        selectedButton.classList.add('wrong');
        feedbackMessage.textContent = '😅 答錯了！沒關係，下一題加油！';
        feedbackMessage.style.backgroundColor = '#f8d7da';
        feedbackMessage.style.color = '#721c24';

        // 顯示正確答案
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
    }

    scoreDisplay.textContent = score;
    feedbackMessage.classList.remove('hidden');

    // 延遲 1.5 秒後進入下一題或結束測驗
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            feedbackMessage.classList.add('hidden');
        } else {
            endQuiz();
        }
    }, 1500); 
}

/**
 * 測驗結束時的處理
 */
function endQuiz() {
    quizBox.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    resultBox.classList.remove('hidden');
    
    let resultMessage = '';
    if (score === questions.length * 10) {
        resultMessage = `💯 你得了 ${score} 分！真是個數學小天才！`;
    } else if (score >= questions.length * 5) {
        resultMessage = `👍 你得了 ${score} 分！表現不錯，繼續努力！`;
    } else {
        resultMessage = `💪 你得了 ${score} 分！別灰心，多練習幾次會更好的！`;
    }

    finalScore.textContent = resultMessage;
}

// 重新開始按鈕的事件
restartButton.addEventListener('click', startQuiz);

// 遊戲啟動
startQuiz();
