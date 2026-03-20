// ============================================
// LES AVENTURES DE LULU & SENIOR CORBATIN
// Lulu: 12 ans, batteuse black metal, cœur tendre, origines espagnoles/belges
// Corbatin: petit corbeau, son frère farceur
// ============================================

// ===== STATE =====
let currentGame = null;   // 'histoire', 'corps', 'francais', 'math'
let currentMode = null;   // 'quiz', 'speedcalc', 'skeleton', 'bubble', 'formulas', 'memo'
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let totalQuestions = 10;
let currentLevel = 0;
let totalLevels = 1;
let allQuestionsPool = [];

// ===== QUESTION TRACKER (jamais les mêmes entre sessions) =====
// Stocke les index des questions déjà vues par matière+mode dans localStorage
function getSeenKey(type, mode) { return `lulu-seen-${type}-${mode}`; }

function getSeenQuestions(type, mode) {
    try {
        return JSON.parse(localStorage.getItem(getSeenKey(type, mode)) || '[]');
    } catch { return []; }
}

function markQuestionsSeen(type, mode, indices) {
    const seen = getSeenQuestions(type, mode);
    const updated = [...new Set([...seen, ...indices])];
    localStorage.setItem(getSeenKey(type, mode), JSON.stringify(updated));
}

function resetSeenQuestions(type, mode) {
    localStorage.removeItem(getSeenKey(type, mode));
}

// Pioche des questions jamais vues. Si tout vu → reset et repart.
function pickFreshQuestions(allQuestions, type, mode, count) {
    let seen = getSeenQuestions(type, mode);

    // Si toutes vues (ou presque), reset
    if (seen.length >= allQuestions.length - 2) {
        resetSeenQuestions(type, mode);
        seen = [];
    }

    // Filtre les non-vues
    const unseen = allQuestions
        .map((q, i) => ({ q, i }))
        .filter(item => !seen.includes(item.i));

    // Shuffle et prend le nombre voulu
    const picked = shuffleArray([...unseen]).slice(0, count);

    // Marque comme vues
    markQuestionsSeen(type, mode, picked.map(p => p.i));

    return picked.map(p => p.q);
}

// Memo state
let memoCards = [];
let memoFlipped = [];
let memoMatched = 0;
let memoMoves = 0;
let memoLocked = false;

// ===== SUBJECT MODES CONFIG =====
const SUBJECT_MODES = {
    math: [
        { id: 'formulas', icon: '📐', label: 'Fiches Formules', desc: 'Toutes les formules et conversions' },
        { id: 'speedcalc', icon: '⚡', label: 'Speed Calc', desc: 'Calcul mental chrono — 30 secondes !' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Lulu et Corbatin te posent des questions !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Éclate le bon ballon !' },
        { id: 'quiz', icon: '🎯', label: 'Quiz', desc: 'Teste-toi !' },
    ],
    corps: [
        { id: 'fiches', icon: '📚', label: 'Fiches Révision', desc: 'Apprends avant de jouer !' },
        { id: 'skeleton', icon: '💀', label: 'Squelette', desc: 'Touche le bon organe ou os' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Lulu et Corbatin te posent des questions !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Éclate le bon ballon !' },
        { id: 'quiz', icon: '🫀', label: 'Quiz', desc: 'Teste-toi !' },
    ],
    sciences: [
        { id: 'fiches', icon: '📚', label: 'Fiches Révision', desc: 'Apprends avant de jouer !' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Lulu et Corbatin te posent des questions !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Éclate le bon ballon !' },
        { id: 'quiz', icon: '🔬', label: 'Quiz', desc: 'Teste-toi !' },
    ],
    histoire: [
        { id: 'fiches', icon: '📚', label: 'Fiches Révision', desc: 'Apprends avant de jouer !' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Lulu et Corbatin te posent des questions !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Éclate le bon ballon !' },
        { id: 'quiz', icon: '🏰', label: 'Quiz', desc: 'Teste-toi !' },
    ],
    francais: [
        { id: 'fiches', icon: '📚', label: 'Fiches Révision', desc: 'Apprends avant de jouer !' },
        { id: 'conjugaison', icon: '🎭', label: 'Conjugaison Aventure', desc: 'Complète avec le bon temps !' },
        { id: 'bescherelle', icon: '📕', label: 'Bescherelle', desc: 'Trie : passé, présent ou futur ?' },
        { id: 'dictee', icon: '✍️', label: 'Mini Dictée', desc: 'Les histoires de Mamande !' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Questions de français !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Éclate le bon ballon !' },
        { id: 'quiz', icon: '📖', label: 'Quiz', desc: 'Teste-toi !' },
    ],
    mix: [
        { id: 'conjugaison', icon: '🎭', label: 'Conjugaison Aventure', desc: 'Complète avec le bon temps !' },
        { id: 'bescherelle', icon: '📕', label: 'Bescherelle', desc: 'Trie : passé, présent ou futur ?' },
        { id: 'dictee', icon: '✍️', label: 'Mini Dictée', desc: 'Les histoires de Mamande !' },
        { id: 'speedcalc', icon: '⚡', label: 'Speed Calc', desc: 'Calcul mental chrono !' },
        { id: 'skeleton', icon: '💀', label: 'Squelette', desc: 'Touche le bon organe ou os' },
        { id: 'complete', icon: '💬', label: 'Complète la phrase', desc: 'Toutes les matières mélangées !' },
        { id: 'bubble', icon: '🎈', label: 'Ballons', desc: 'Toutes les matières mélangées !' },
        { id: 'quiz', icon: '🎯', label: 'Quiz Mix', desc: 'Le grand test final !' },
    ],
};

const SUBJECT_NAMES = {
    histoire: 'Histoire de Belgique',
    corps: 'Corps Humain',
    sciences: 'Sciences',
    francais: 'Français',
    math: 'Maths',
    mix: 'Mix Total',
};

const SUBMENU_DIALOGUES = {
    histoire: [
        "🐦‍⬛ Corbatin a trouvé un vieux grimoire ! Par quoi on commence ?",
        "🥁 Lulu : « Lis les fiches d'abord, puis teste-toi ! »",
    ],
    corps: [
        "💀 Lulu : « Lis les fiches pour apprendre, puis joue ! »",
        "🐦‍⬛ Corbatin se demande combien d'os il a... aide-le !",
    ],
    sciences: [
        "🔬 Corbatin a trouvé un microscope dans le jardin !",
        "🥁 Lulu : « Les sciences, c'est comprendre le monde ! Commence par les fiches ! »",
    ],
    francais: [
        "📜 Lulu : « Révise les fiches puis teste-toi ! »",
        "🐦‍⬛ Corbatin veut parler croâ-rrectement !",
    ],
    math: [
        "🔮 Lulu : « Lis les formules d'abord, puis entraîne-toi ! »",
        "🥁 « Les maths, c'est comme le rythme — faut compter ! »",
    ],
    mix: [
        "🎯 Toutes les matières mélangées ! Le grand défi !",
        "🐦‍⬛ Corbatin : « Croâ ! On mélange tout ! »",
    ],
};

// ===== RANDOM MODE =====
function startRandom() {
    const subjects = ['histoire', 'corps', 'sciences', 'francais', 'math'];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const modes = SUBJECT_MODES[subject].filter(m => m.id !== 'fiches' && m.id !== 'formulas');
    const mode = modes[Math.floor(Math.random() * modes.length)];
    currentGame = subject;
    currentMode = mode.id;
    launchMode(subject, mode.id);
}

// ===== THEME =====
let currentTheme = localStorage.getItem('lulu-theme') || 'blackmetal';

function toggleTheme() {
    currentTheme = currentTheme === 'blackmetal' ? 'paradis' : 'blackmetal';
    document.body.classList.toggle('theme-paradis', currentTheme === 'paradis');
    localStorage.setItem('lulu-theme', currentTheme);
    updateThemeButton();
    updateParadisEmojis();
}

function updateThemeButton() {
    document.getElementById('theme-icon').textContent = currentTheme === 'blackmetal' ? '☀️' : '🌙';
    document.getElementById('theme-label').textContent = currentTheme === 'blackmetal' ? 'Mode Paradis' : 'Mode Black Metal';
}

function updateParadisEmojis() {
    const flowers = document.querySelectorAll('.flower');
    const sets = { paradis: ['🌻', '🌷', '🌼', '🌺'], blackmetal: ['🥀', '🦇', '🕸️', '🖤'] };
    flowers.forEach((f, i) => f.textContent = (sets[currentTheme] || sets.blackmetal)[i]);
    const menuIcons = { paradis: ['🏰', '🫀', '📖', '🔬', '🔢', '🎯', '🧠'], blackmetal: ['🏚️', '💀', '📜', '🔬', '🔮', '🎯', '🃏'] };
    document.querySelectorAll('.btn-icon').forEach((el, i) => { if (menuIcons[currentTheme]?.[i]) el.textContent = menuIcons[currentTheme][i]; });
}

// ===== NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    screen.classList.add('active');
    screen.style.animation = 'none';
    screen.offsetHeight;
    screen.style.animation = '';
}

function goHome() {
    showScreen('screen-home');
    randomizeHomeDialogue();
}

function goBackToSubmenu() {
    if (currentGame) showSubmenu(currentGame);
    else goHome();
}

function randomizeHomeDialogue() {
    const d = [
        "Lulu fait tourner ses baguettes... Corbatin croasse depuis le toit... On y va ?",
        "🥁 Lulu : « ¡Vamos! » 🐦‍⬛ Corbatin : « Croâ ! » Et toi ?",
        "Les frites refroidissent... vite, une aventure ! 🍟",
        "Lulu joue un blast beat sur ses casseroles... Corbatin danse !",
        "Le jardin est sombre et mystérieux... parfait pour apprendre !",
    ];
    document.getElementById('home-dialogue-text').textContent = d[Math.floor(Math.random() * d.length)];
}

// ===== SUBMENU =====
function showSubmenu(type) {
    currentGame = type;
    showScreen('screen-submenu');

    document.getElementById('submenu-title').textContent = SUBJECT_NAMES[type] || type;

    const dialogues = SUBMENU_DIALOGUES[type] || ["Choisis ton mode !"];
    document.getElementById('submenu-dialogue').textContent = dialogues[Math.floor(Math.random() * dialogues.length)];

    const modes = SUBJECT_MODES[type] || [];
    const container = document.getElementById('submenu-modes');
    container.innerHTML = '';

    modes.forEach(mode => {
        const btn = document.createElement('button');
        btn.className = 'submenu-mode-btn';
        btn.innerHTML = `<span class="mode-icon">${mode.icon}</span><span class="mode-info"><span class="mode-label">${mode.label}</span><span class="mode-desc">${mode.desc}</span></span>`;
        btn.addEventListener('click', () => launchMode(type, mode.id));
        container.appendChild(btn);
    });
}

function launchMode(type, modeId) {
    currentGame = type;
    currentMode = modeId;

    switch (modeId) {
        case 'quiz':
            startQuiz(type);
            break;
        case 'fiches':
            startFiches(type);
            break;
        case 'formulas':
            startFormulas();
            break;
        case 'speedcalc':
            startSpeedCalc((pts) => {
                score = pts;
                showResults('speedcalc');
            });
            break;
        case 'skeleton':
            startSkeletonGame((pts) => {
                score = pts;
                showResults('skeleton');
            });
            break;
        case 'conjugaison':
            startConjugaison((pts) => {
                score = pts;
                showResults('conjugaison');
            });
            break;
        case 'bescherelle':
            startBescherelle((pts) => {
                score = pts;
                showResults('bescherelle');
            });
            break;
        case 'dictee':
            startDictee((pts) => {
                score = pts;
                showResults('dictee');
            });
            break;
        case 'complete':
            startComplete(type, (pts) => {
                score = pts;
                showResults('complete');
            });
            break;
        case 'bubble':
            startBubbleShooter(type, () => showResults('bubble'));
            break;
    }
}

// ===== FORMULAS =====
function startFormulas() {
    currentMode = 'formulas';
    showScreen('screen-formulas');

    const container = document.getElementById('formulas-container');
    container.innerHTML = '';

    let lastCat = '';
    MATH_FORMULAS.forEach(f => {
        const card = document.createElement('div');
        card.className = 'formula-card';
        card.innerHTML = `
            ${f.category !== lastCat ? `<div class="formula-category">${f.category}</div>` : ''}
            <div class="formula-title">${f.title}</div>
            <div class="formula-content">${f.formula}</div>
            <div class="formula-example">${f.example}</div>
        `;
        container.appendChild(card);
        lastCat = f.category;
    });
}

// ===== FICHES RÉVISION (toutes matières) =====
function startFiches(type) {
    currentMode = 'fiches';
    showScreen('screen-formulas'); // réutilise l'écran formulas

    const fiches = REVISION_FICHES[type];
    const container = document.getElementById('formulas-container');
    container.innerHTML = '';

    if (!fiches || fiches.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:20px;opacity:0.6">Pas encore de fiches pour cette matière.</p>';
        return;
    }

    fiches.forEach(f => {
        const card = document.createElement('div');
        card.className = 'formula-card';
        card.innerHTML = `
            <div class="formula-title">${f.title}</div>
            <div class="formula-content">${f.content}</div>
            <div class="formula-example">${f.detail}</div>
        `;
        container.appendChild(card);
    });
}

// ===== QUIZ (standalone) =====
function startGame(type) {
    // Only for memo from home screen
    if (type === 'memo') { currentMode = 'memo'; startMemo(); return; }
    startQuiz(type);
}

function getQuestionPool(type) {
    switch (type) {
        case 'histoire': return QUESTIONS_HISTOIRE;
        case 'corps': return QUESTIONS_CORPS;
        case 'sciences': return QUESTIONS_SCIENCES;
        case 'francais': return QUESTIONS_FRANCAIS;
        case 'math': return QUESTIONS_MATH;
        case 'mix': return [...QUESTIONS_HISTOIRE, ...QUESTIONS_CORPS, ...QUESTIONS_SCIENCES, ...QUESTIONS_FRANCAIS, ...QUESTIONS_MATH];
        default: return [];
    }
}

function startQuiz(type) {
    currentGame = type;
    currentMode = 'quiz';

    const pool = getQuestionPool(type);
    const seen = getSeenQuestions(type, 'quiz');
    const remaining = pool.length - seen.length;
    totalLevels = Math.ceil(pool.length / totalQuestions);
    // Calcul du niveau actuel basé sur combien on a déjà vu
    currentLevel = Math.floor(seen.length / totalQuestions);
    if (currentLevel >= totalLevels) {
        // Tout vu → reset et repart du niveau 1
        resetSeenQuestions(type, 'quiz');
        currentLevel = 0;
    }
    startLevel();
}

function startLevel() {
    const pool = getQuestionPool(currentGame);
    currentQuestions = pickFreshQuestions(pool, currentGame, 'quiz', totalQuestions);

    if (currentQuestions.length === 0) {
        // Sécurité : si vide, reset
        resetSeenQuestions(currentGame, 'quiz');
        currentQuestions = pickFreshQuestions(pool, currentGame, 'quiz', totalQuestions);
    }

    currentQuestionIndex = 0;
    score = 0;
    streak = 0;

    showScreen('screen-quiz');
    updateScoreDisplay();
    updateLevelDisplay();
    showStoryIntro();
    showQuestion();
}

function updateLevelDisplay() {
    document.getElementById('level-info').textContent = `Niveau ${currentLevel + 1} / ${totalLevels}`;
    document.getElementById('level-bar-fill').style.width = (currentLevel / totalLevels) * 100 + '%';
}

// ===== QUIZ LOGIC =====
function showStoryIntro() {
    const intros = STORY_INTROS[currentGame];
    document.getElementById('story-text').textContent = intros[Math.floor(Math.random() * intros.length)];
}

function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('question-hint').textContent = q.hint || '';
    document.getElementById('feedback-panel').classList.add('hidden');

    const choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span class="choice-letter">${letters[i]}</span><span>${choice}</span>`;
        btn.addEventListener('click', () => handleAnswer(i));
        choicesEl.appendChild(btn);
    });
    updateScoreDisplay();
}

function getStreakMessage(s) {
    if (s >= 7) return ['🔥🔥🔥 INARRÊTABLE !!!', '💀🔥 MODE BEAST !!!', '🥁🔥🔥 LULU EST EN TRANSE !!!'];
    if (s >= 5) return ['🔥🔥 EN FEU !!', '💥 COMBO x' + s + ' !!', '🥁 BLAST BEAT !!'];
    if (s >= 3) return ['🔥 Série de ' + s + ' !', '💪 Ça monte !', '🐦‍⬛ Corbatin est impressionné !'];
    return null;
}

function handleAnswer(choiceIndex) {
    const q = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.choice-btn');
    const isCorrect = choiceIndex === q.correct;

    buttons.forEach(btn => btn.classList.add('disabled'));
    buttons[choiceIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) buttons[q.correct].classList.add('correct');

    let reaction;
    if (isCorrect) {
        score += 2;
        streak++;
        playSound('correct');
        const streakMsgs = getStreakMessage(streak);
        reaction = streakMsgs ? streakMsgs[Math.floor(Math.random() * streakMsgs.length)]
            : STORY_CORRECT[Math.floor(Math.random() * STORY_CORRECT.length)];
    } else {
        streak = 0;
        playSound('wrong');
        reaction = STORY_WRONG[Math.floor(Math.random() * STORY_WRONG.length)];
    }

    document.getElementById('feedback-icon').textContent = isCorrect ? (streak >= 5 ? '🔥' : '🖤') : '💪';
    document.getElementById('feedback-text').innerHTML = `${reaction}<br><br>${q.explanation}`;
    document.getElementById('story-text').textContent = reaction;

    const btnNext = document.getElementById('btn-next');
    btnNext.textContent = currentQuestionIndex >= currentQuestions.length - 1
        ? 'Voir mes résultats →' : 'Question suivante →';

    document.getElementById('feedback-panel').classList.remove('hidden');
    document.getElementById('feedback-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    updateScoreDisplay();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults('quiz');
    } else {
        showQuestion();
        const stories = [
            "L'aventure continue dans le jardin sombre...",
            "Corbatin croasse d'encouragement ! 🐦‍⬛",
            "Lulu fait un roulement de batterie... 🥁",
            "Attention aux ombres ! Prochaine question...",
            "Lulu murmure un flamenco dans la nuit... ¡Vamos!",
        ];
        document.getElementById('story-text').textContent = stories[Math.floor(Math.random() * stories.length)];
    }
}

function updateScoreDisplay() {
    document.getElementById('score-stars').textContent = `${Math.min(score, 20)}/20`;
    document.getElementById('score-progress').textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
}

// ===== MÉMO =====
function startMemo() {
    memoMatched = 0; memoMoves = 0; memoLocked = false; memoFlipped = [];
    const theme = MEMO_THEMES[Math.floor(Math.random() * MEMO_THEMES.length)];
    const cards = [];
    theme.pairs.forEach(p => {
        cards.push({ ...p, uid: p.id + '_a' });
        cards.push({ ...p, uid: p.id + '_b' });
    });
    memoCards = shuffleArray(cards);
    showScreen('screen-memo');
    updateMemoDisplay();
    document.getElementById('memo-story').textContent = `${theme.name} — Retrouve les paires !`;
    renderMemoGrid();
}

function renderMemoGrid() {
    const grid = document.getElementById('memo-grid');
    grid.innerHTML = '';
    memoCards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'memo-card';
        el.innerHTML = `
            <div class="memo-card-inner">
                <div class="memo-card-face memo-card-back"></div>
                <div class="memo-card-face memo-card-front">
                    <span class="memo-emoji">${card.emoji}</span>
                    <span class="memo-label">${card.label}</span>
                </div>
            </div>`;
        el.addEventListener('click', () => handleMemoClick(i, el));
        grid.appendChild(el);
    });
}

function handleMemoClick(index, el) {
    if (memoLocked || el.classList.contains('flipped') || el.classList.contains('matched')) return;
    el.classList.add('flipped');
    memoFlipped.push({ index, el });
    playSound('flip');
    if (memoFlipped.length === 2) {
        memoMoves++; memoLocked = true;
        const [a, b] = memoFlipped;
        if (memoCards[a.index].id === memoCards[b.index].id && a.index !== b.index) {
            setTimeout(() => {
                a.el.classList.add('matched'); b.el.classList.add('matched');
                memoMatched++; memoFlipped = []; memoLocked = false;
                playSound('correct'); updateMemoDisplay();
                if (memoMatched === memoCards.length / 2) setTimeout(() => showResults('memo'), 800);
            }, 400);
        } else {
            setTimeout(() => {
                a.el.classList.remove('flipped'); b.el.classList.remove('flipped');
                memoFlipped = []; memoLocked = false; playSound('wrong');
            }, 800);
        }
    }
}

function updateMemoDisplay() {
    document.getElementById('memo-moves').textContent = `Coups : ${memoMoves}`;
    document.getElementById('memo-pairs').textContent = `Paires : ${memoMatched} / ${memoCards.length / 2}`;
}

// ===== BUBBLE SHOOTER =====
let bubbleState = {
    canvas: null, ctx: null, bubbles: [], projectile: null,
    question: null, score: 0, level: 0, questions: [],
    animFrame: null, shooting: false, aimAngle: -Math.PI / 2,
    particles: [], afterBubbleCallback: null,
};

// Une question est "ballon-compatible" si :
// - Réponses courtes (max 18 chars)
// - Question courte (max 50 chars)
// - Pas une complétion de phrase (pas de ... ou ___)
function isBalloonFriendly(q) {
    if (!q.choices.every(c => c.length <= 18)) return false;
    if (q.q.length > 50) return false;
    if (q.q.includes('...') || q.q.includes('___') || q.q.includes(' : ')) return false;
    if (q.q.includes('Complète') || q.q.includes('Conjugue') || q.q.includes('Trouve le')) return false;
    return true;
}

// Génère les questions du bubble : uniquement questions claires et réponses courtes
function getBubbleQuestions(gameType) {
    const pool = getQuestionPool(gameType).filter(isBalloonFriendly);
    const fresh = pickFreshQuestions(pool, gameType, 'bubble', 8);
    return fresh.map(q => ({
        q: q.q,
        answers: [q.choices[q.correct], ...q.choices.filter((_, i) => i !== q.correct).slice(0, 3)],
        correct: 0,
    }));
}

// Génère les questions pour "Complète la phrase" : réponses longues
function getCompleteQuestions(gameType) {
    const pool = getQuestionPool(gameType).filter(q => !isShortAnswer(q));
    return pickFreshQuestions(pool, gameType, 'complete', 8);
}

// ===== COMPLÈTE LA PHRASE (Visual Novel) =====
let completeState = { questions: [], index: 0, score: 0, callback: null };

const SPEAKERS = [
    { name: 'Lulu', emoji: '🥁' },
    { name: 'Corbatin', emoji: '🐦‍⬛' },
];

function startComplete(gameType, callback) {
    const cs = completeState;
    cs.callback = callback;
    cs.score = 0;
    cs.index = 0;
    cs.questions = getCompleteQuestions(gameType);

    // Si pas assez de questions longues, prend des courtes en complément
    if (cs.questions.length < 4) {
        const pool = getQuestionPool(gameType);
        const extra = pickFreshQuestions(pool, gameType, 'complete', 8 - cs.questions.length);
        cs.questions = [...cs.questions, ...extra];
    }

    showScreen('screen-complete');
    showComplete();
}

function showComplete() {
    const cs = completeState;
    if (cs.index >= cs.questions.length) {
        if (cs.callback) cs.callback(cs.score);
        else showResults('complete');
        return;
    }

    const q = cs.questions[cs.index];
    const speaker = SPEAKERS[cs.index % SPEAKERS.length];

    document.getElementById('complete-speaker').textContent = speaker.emoji;
    document.getElementById('complete-name').textContent = speaker.name;
    document.getElementById('complete-question').textContent = q.q;
    document.getElementById('complete-hint').textContent = q.hint || '';
    document.getElementById('complete-score').textContent = `${cs.score} pts`;
    document.getElementById('complete-progress').textContent = `${cs.index + 1} / ${cs.questions.length}`;
    document.getElementById('complete-feedback').classList.add('hidden');

    const choicesEl = document.getElementById('complete-choices');
    choicesEl.innerHTML = '';

    // Shuffle choices but track correct
    const indexed = q.choices.map((c, i) => ({ text: c, isCorrect: i === q.correct }));
    shuffleArray(indexed);

    indexed.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'complete-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleComplete(choice.isCorrect, btn, q));
        choicesEl.appendChild(btn);
    });
}

function handleComplete(isCorrect, btn, q) {
    const cs = completeState;
    const btns = document.querySelectorAll('.complete-btn');
    btns.forEach(b => b.classList.add('disabled'));

    if (isCorrect) {
        cs.score += 2;
        btn.classList.add('correct');
        playSound('correct');
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => {
            if (b.textContent === q.choices[q.correct]) b.classList.add('correct');
        });
        playSound('wrong');
        // Report la question
        cs.questions.push(q);
    }

    const fb = document.getElementById('complete-feedback');
    document.getElementById('complete-feedback-text').textContent = q.explanation;
    fb.classList.remove('hidden');
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextComplete() {
    completeState.index++;
    showComplete();
}

function exitComplete() {
    const cs = completeState;
    if (cs.callback) cs.callback(cs.score);
    else goBackToSubmenu();
}

// ===== CONJUGAISON AVENTURE (réutilise le mode complete avec données conjugaison) =====
function startConjugaison(callback) {
    const cs = completeState;
    cs.callback = callback;
    cs.score = 0;
    cs.index = 0;
    // Convertit les données conjugaison en format complete
    const fresh = pickFreshQuestions(CONJUGAISON_AVENTURE, 'francais', 'conjugaison', 10);
    cs.questions = fresh.map(c => ({
        q: c.story,
        choices: c.choices,
        correct: c.correct,
        hint: `Temps attendu : ${c.temps}`,
        explanation: c.explanation,
    }));

    showScreen('screen-complete');
    showComplete();
}

// ===== BALLONS =====
function startBubbleShooter(gameType, callback) {
    const bs = bubbleState;
    bs.afterBubbleCallback = callback;
    bs.score = 0; bs.level = 0; bs.locked = false;
    bs.questions = getBubbleQuestions(gameType);
    showScreen('screen-bubble');
    bs.canvas = document.getElementById('bubble-canvas');
    bs.ctx = bs.canvas.getContext('2d');
    resizeBubbleCanvas();
    window.addEventListener('resize', resizeBubbleCanvas);
    document.getElementById('bubble-story').textContent = "🎈 Touche le bon ballon pour l'éclater !";
    loadBubbleLevel();
    bs.canvas.addEventListener('click', handleBalloonTap);
    bs.canvas.addEventListener('touchend', handleBalloonTouch);
}

function resizeBubbleCanvas() {
    const c = bubbleState.canvas;
    if (!c) return;
    const parent = c.parentElement;
    c.width = parent.getBoundingClientRect().width;
    const header = parent.closest('.screen')?.querySelector('.game-header');
    const story = parent.querySelector('.story-panel');
    const question = parent.querySelector('.bubble-question');
    const used = (header?.offsetHeight || 50) + (story?.offsetHeight || 0) + (question?.offsetHeight || 40) + 10;
    c.height = Math.max(250, window.innerHeight - used);
}

function loadBubbleLevel() {
    const bs = bubbleState;
    if (bs.level >= bs.questions.length) { endBubbleShooter(); return; }
    const q = bs.questions[bs.level];
    bs.question = q; bs.bubbles = []; bs.particles = []; bs.locked = false;
    document.getElementById('bubble-question-text').textContent = q.q;
    document.getElementById('bubble-score').textContent = `${bs.score} pts`;
    document.getElementById('bubble-level').textContent = `${bs.level + 1} / ${bs.questions.length}`;

    const W = bs.canvas.width;
    const H = bs.canvas.height;
    // Responsive: ballons qui remplissent bien l'espace en grille 2×2
    const R = Math.min(42, Math.max(28, Math.min(W / 7, H / 8)));
    const allColors = ['#e94560', '#533483', '#7b2d8e', '#1565C0', '#00838F', '#F57C00', '#6A1B9A', '#c62828'];
    const colors = shuffleArray([...allColors]).slice(0, 4);
    const sa = q.answers.map((a, i) => ({ text: a, isCorrect: i === q.correct }));
    shuffleArray(sa);

    // 2×2 grid, centered, well spaced
    const gapX = Math.min(W * 0.35, R * 3.5);
    const gapY = Math.min(H * 0.25, R * 3);
    const cx = W / 2, cy = H * 0.4;

    const positions = [
        { x: cx - gapX / 2, y: cy - gapY / 2 },
        { x: cx + gapX / 2, y: cy - gapY / 2 },
        { x: cx - gapX / 2, y: cy + gapY / 2 },
        { x: cx + gapX / 2, y: cy + gapY / 2 },
    ];

    sa.forEach((ans, i) => {
        const pos = positions[i];
        bs.bubbles.push({
            x: pos.x, y: pos.y, baseX: pos.x, baseY: pos.y,
            r: R, text: ans.text, isCorrect: ans.isCorrect,
            color: colors[i],
            wobble: Math.random() * Math.PI * 2,
            alive: true, popping: false, popFrame: 0,
        });
    });
    if (bs.animFrame) cancelAnimationFrame(bs.animFrame);
    bubbleLoop();
}

function bubbleLoop() {
    const bs = bubbleState, ctx = bs.ctx, W = bs.canvas.width, H = bs.canvas.height;
    ctx.clearRect(0, 0, W, H);
    const isDark = currentTheme === 'blackmetal';
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, isDark ? '#0f0c29' : '#E8F5E9');
    grad.addColorStop(1, isDark ? '#1a1a2e' : '#C8E6C9');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

    // Draw balloons
    bs.bubbles.forEach(b => {
        if (!b.alive && !b.popping) return;

        // Popping animation
        if (b.popping) {
            b.popFrame++;
            const scale = 1 + b.popFrame * 0.08;
            const alpha = Math.max(0, 1 - b.popFrame * 0.1);
            if (alpha <= 0) { b.popping = false; return; }
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath(); ctx.arc(b.baseX, b.baseY, b.r * scale, 0, Math.PI * 2);
            ctx.fillStyle = b.popColor || b.color;
            ctx.fill();
            ctx.restore();
            return;
        }

        // Gentle float wobble
        b.wobble += 0.025;
        b.x = b.baseX + Math.sin(b.wobble) * 4;
        b.y = b.baseY + Math.cos(b.wobble * 0.8) * 3;

        ctx.save();

        // Balloon string
        ctx.beginPath();
        ctx.moveTo(b.x, b.y + b.r);
        ctx.quadraticCurveTo(b.x + 3, b.y + b.r + 15, b.x - 2, b.y + b.r + 25);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Balloon knot
        ctx.beginPath();
        ctx.arc(b.x, b.y + b.r + 2, 3, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Balloon body (slightly oval)
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, b.r * 0.9, b.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Shine/highlight
        ctx.beginPath();
        ctx.ellipse(b.x - b.r * 0.25, b.y - b.r * 0.3, b.r * 0.18, b.r * 0.12, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();

        // Text
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        let fontSize = Math.max(12, b.r * 0.45);
        ctx.font = `800 ${fontSize}px 'Nunito', sans-serif`;
        while (ctx.measureText(b.text).width > b.r * 1.5 && fontSize > 10) {
            fontSize--;
            ctx.font = `800 ${fontSize}px 'Nunito', sans-serif`;
        }
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 3;
        ctx.fillText(b.text, b.x, b.y);
        ctx.shadowBlur = 0;

        ctx.restore();
    });

    // Particles
    bs.particles = bs.particles.filter(p => p.life > 0);
    bs.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.025;
        ctx.globalAlpha = p.life;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill(); ctx.globalAlpha = 1;
    });

    bs.animFrame = requestAnimationFrame(bubbleLoop);
}

// Touch/click: directly tap a balloon
function handleBalloonTouch(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const rect = bubbleState.canvas.getBoundingClientRect();
    processBalloonTap(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleBalloonTap(e) {
    const rect = bubbleState.canvas.getBoundingClientRect();
    processBalloonTap(e.clientX - rect.left, e.clientY - rect.top);
}

function processBalloonTap(tapX, tapY) {
    const bs = bubbleState;
    if (bs.locked) return;

    // Find tapped balloon
    for (const b of bs.bubbles) {
        if (!b.alive) continue;
        const dx = tapX - b.x, dy = tapY - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r + 10) { // generous touch zone
            bs.locked = true;
            b.alive = false;

            if (b.isCorrect) {
                bs.score += 2;
                b.popping = true; b.popFrame = 0; b.popColor = '#66bb6a';
                createBubbleParticles(b.x, b.y, b.color);
                playSound('correct');
                showBubbleFeedback(true);
                setTimeout(() => { bs.level++; loadBubbleLevel(); }, 1100);
            } else {
                b.popping = true; b.popFrame = 0; b.popColor = '#ef5350';
                createBubbleParticles(b.x, b.y, '#ef5350');
                playSound('wrong');
                showBubbleFeedback(false);
                bs.questions.push(bs.questions[bs.level]);
                setTimeout(() => { bs.level++; loadBubbleLevel(); }, 1100);
            }
            return;
        }
    }
}

function createBubbleParticles(x, y, color) {
    for (let i = 0; i < 12; i++) bubbleState.particles.push({
        x, y, vx: (Math.random() - 0.5) * 7, vy: (Math.random() - 0.5) * 7 - 2,
        size: Math.random() * 4 + 2, color, life: 1 });
}
function showBubbleFeedback(correct) {
    const el = document.getElementById('bubble-feedback');
    document.getElementById('bubble-feedback-icon').textContent = correct ? '🎉' : '💥';
    document.getElementById('bubble-feedback-text').textContent = correct ? 'BRAVO !' : 'Raté !';
    el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 900);
}
function exitBubble() { cleanupBubble(); goBackToSubmenu(); }
function endBubbleShooter() {
    cleanupBubble();
    score = bubbleState.score;
    if (bubbleState.afterBubbleCallback) bubbleState.afterBubbleCallback();
    else showResults('bubble');
}
function cleanupBubble() {
    const bs = bubbleState;
    if (bs.animFrame) cancelAnimationFrame(bs.animFrame);
    bs.canvas?.removeEventListener('click', handleBalloonTap);
    bs.canvas?.removeEventListener('touchend', handleBalloonTouch);
    window.removeEventListener('resize', resizeBubbleCanvas);
}

// ===== RESULTS =====
function showResults(mode) {
    const gameMode = mode || currentMode;
    let title, text, stars, dialogueKey;

    if (gameMode === 'memo') {
        const eff = memoMoves / (memoCards.length / 2);
        if (eff <= 1.5) { stars = 3; dialogueKey = 'excellent'; title = 'INCROYABLE !'; }
        else if (eff <= 2.5) { stars = 2; dialogueKey = 'good'; title = 'SUPER !'; }
        else { stars = 1; dialogueKey = 'ok'; title = 'BIEN JOUÉ !'; }
        text = `${memoMatched} paires en ${memoMoves} coups !`;
    } else if (gameMode === 'quiz') {
        const finalScore = Math.min(score, 20);
        if (finalScore >= 16) { stars = 3; dialogueKey = 'excellent'; title = 'EXTRAORDINAIRE !'; }
        else if (finalScore >= 12) { stars = 2; dialogueKey = 'good'; title = 'TRÈS BIEN !'; }
        else if (finalScore >= 8) { stars = 1; dialogueKey = 'ok'; title = 'PAS MAL !'; }
        else { stars = 0; dialogueKey = 'needsWork'; title = 'CONTINUE !'; }
        text = `${finalScore} / 20`;
        if (totalLevels > 1) text += ` — Niveau ${currentLevel + 1}/${totalLevels}`;
    } else {
        // speedcalc, skeleton, bubble
        if (score >= 10) { stars = 3; dialogueKey = 'excellent'; title = 'EXTRAORDINAIRE !'; }
        else if (score >= 6) { stars = 2; dialogueKey = 'good'; title = 'TRÈS BIEN !'; }
        else if (score >= 2) { stars = 1; dialogueKey = 'ok'; title = 'PAS MAL !'; }
        else { stars = 0; dialogueKey = 'needsWork'; title = 'CONTINUE !'; }
        text = `${score} points !`;
    }

    document.getElementById('results-title').textContent = title;
    document.getElementById('results-text').textContent = text;
    document.getElementById('results-stars').textContent = '🖤'.repeat(stars) + '🤍'.repeat(Math.max(0, 3 - stars));

    const dialogues = RESULTS_DIALOGUES[dialogueKey];
    document.getElementById('results-dialogue-text').textContent = dialogues[Math.floor(Math.random() * dialogues.length)];

    // Replay button
    const replayBtn = document.querySelector('.btn-replay');
    if (gameMode === 'quiz' && currentLevel + 1 < totalLevels) {
        replayBtn.textContent = '→ Niveau suivant';
    } else {
        replayBtn.textContent = '🔄 Rejouer';
    }

    showScreen('screen-results');
    launchConfetti();
    if (stars >= 2) playSound('victory');
}

function replayGame() {
    if (currentMode === 'quiz') {
        // Recalcule le niveau depuis les questions vues
        const pool = getQuestionPool(currentGame);
        const seen = getSeenQuestions(currentGame, 'quiz');
        if (seen.length < pool.length) {
            // Il reste des questions non vues → niveau suivant
            currentLevel = Math.floor(seen.length / totalQuestions);
            startLevel();
        } else {
            // Tout vu → relance depuis le début
            startQuiz(currentGame);
        }
    } else if (currentMode === 'memo') {
        startMemo();
    } else {
        launchMode(currentGame, currentMode);
    }
}

// ===== CONFETTI =====
function launchConfetti() {
    const colors = currentTheme === 'blackmetal'
        ? ['#e94560', '#533483', '#7b2d8e', '#ff6b9d', '#c62828']
        : ['#E91E63', '#FF9800', '#4CAF50', '#2196F3', '#FFD700'];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.width = (Math.random() * 8 + 6) + 'px';
            c.style.height = (Math.random() * 8 + 6) + 'px';
            c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            c.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 4000);
        }, i * 50);
    }
}

// ===== SOUNDS =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    switch (type) {
        case 'correct': playTone(523, 0.1, 'sine', now); playTone(659, 0.1, 'sine', now + 0.1); playTone(784, 0.15, 'sine', now + 0.2); break;
        case 'wrong': playTone(200, 0.2, 'sawtooth', now); playTone(180, 0.3, 'sawtooth', now + 0.15); break;
        case 'flip': playTone(800, 0.05, 'sine', now); break;
        case 'victory': [523, 587, 659, 698, 783, 880, 988, 1047].forEach((f, i) => playTone(f, 0.12, 'sine', now + i * 0.1)); break;
    }
}
function playTone(freq, dur, type, t) {
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(audioCtx.destination); o.start(t); o.stop(t + dur);
}

// ===== UTILS =====
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    if (currentTheme === 'paradis') document.body.classList.add('theme-paradis');
    updateThemeButton();
    updateParadisEmojis();
    randomizeHomeDialogue();
});
