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

// Memo state
let memoCards = [];
let memoFlipped = [];
let memoMatched = 0;
let memoMoves = 0;
let memoLocked = false;

// ===== SUBJECT MODES CONFIG =====
const SUBJECT_MODES = {
    math: [
        { id: 'formulas', icon: '📐', label: 'Fiches Formules', desc: 'Révise les formules et conversions' },
        { id: 'speedcalc', icon: '⚡', label: 'Speed Calc', desc: 'Calcul mental chronométré — 30 secondes !' },
        { id: 'bubble', icon: '🫧', label: 'Bubble Shooter', desc: 'Éclate les bulles avec la bonne réponse' },
        { id: 'quiz', icon: '🎯', label: 'Quiz', desc: 'Teste-toi sur toutes les questions !' },
    ],
    corps: [
        { id: 'skeleton', icon: '💀', label: 'Squelette', desc: 'Touche le bon organe ou os' },
        { id: 'bubble', icon: '🫧', label: 'Bubble Shooter', desc: 'Éclate les bulles avec la bonne réponse' },
        { id: 'quiz', icon: '🫀', label: 'Quiz', desc: 'Teste-toi sur le corps humain !' },
    ],
    histoire: [
        { id: 'bubble', icon: '🫧', label: 'Bubble Shooter', desc: 'Éclate les bulles avec la bonne réponse' },
        { id: 'quiz', icon: '🏰', label: 'Quiz', desc: 'Teste-toi sur l\'histoire de Belgique !' },
    ],
    francais: [
        { id: 'bubble', icon: '🫧', label: 'Bubble Shooter', desc: 'Éclate les bulles avec la bonne réponse' },
        { id: 'quiz', icon: '📖', label: 'Quiz', desc: 'Teste-toi en français !' },
    ],
};

const SUBJECT_NAMES = {
    histoire: 'Histoire de Belgique',
    corps: 'Corps Humain',
    francais: 'Français',
    math: 'Maths',
};

const SUBMENU_DIALOGUES = {
    histoire: [
        "🐦‍⬛ Corbatin a trouvé un vieux grimoire d'histoire ! Par quoi on commence ?",
        "🥁 Lulu : « L'histoire de la Belgique, c'est rock ! Choisis ton mode ! »",
    ],
    corps: [
        "💀 Lulu : « Voyons ce qu'il y a sous la peau... Choisis ! »",
        "🐦‍⬛ Corbatin se demande combien d'os il a... aide-le !",
    ],
    francais: [
        "📜 Lulu écrit une chanson mais il lui faut des bons mots ! Choisis !",
        "🐦‍⬛ Corbatin veut apprendre à bien parler... croâ-rrectement !",
    ],
    math: [
        "🔮 Les maths, c'est magique ! Choisis ta potion !",
        "🥁 Lulu : « Les maths, c'est comme le rythme — faut compter ! »",
    ],
};

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
    const menuIcons = { paradis: ['🏰', '🫀', '📖', '🔢', '🧠'], blackmetal: ['🏚️', '💀', '📜', '🔮', '🃏'] };
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

// ===== QUIZ (standalone) =====
function startGame(type) {
    // Only for memo from home screen
    if (type === 'memo') { currentMode = 'memo'; startMemo(); return; }
    startQuiz(type);
}

function startQuiz(type) {
    currentGame = type;
    currentMode = 'quiz';

    let allQuestions;
    switch (type) {
        case 'histoire': allQuestions = QUESTIONS_HISTOIRE; break;
        case 'corps': allQuestions = QUESTIONS_CORPS; break;
        case 'francais': allQuestions = QUESTIONS_FRANCAIS; break;
        case 'math': allQuestions = QUESTIONS_MATH; break;
    }

    allQuestionsPool = shuffleArray([...allQuestions]);
    totalLevels = Math.ceil(allQuestionsPool.length / totalQuestions);
    currentLevel = 0;
    startLevel();
}

function startLevel() {
    const start = currentLevel * totalQuestions;
    const end = Math.min(start + totalQuestions, allQuestionsPool.length);
    currentQuestions = allQuestionsPool.slice(start, end);
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
    theme.pairs.forEach(p => { cards.push({ ...p, uid: p.id + '_a' }); cards.push({ ...p, uid: p.id + '_b' }); });
    memoCards = shuffleArray(cards);
    showScreen('screen-memo');
    updateMemoDisplay();
    document.getElementById('memo-story').textContent = STORY_INTROS.memo[Math.floor(Math.random() * STORY_INTROS.memo.length)];
    renderMemoGrid();
}

function renderMemoGrid() {
    const grid = document.getElementById('memo-grid');
    grid.innerHTML = '';
    memoCards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'memo-card';
        el.innerHTML = `<div class="memo-card-inner"><div class="memo-card-face memo-card-back"></div><div class="memo-card-face memo-card-front"><span>${card.emoji}</span></div></div>`;
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
        if (memoCards[a.index].id === memoCards[b.index].id) {
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

const BUBBLE_QUESTIONS = {
    histoire: [
        { q: "Capitale de la Belgique ?", answers: ["Bruxelles", "Paris", "Anvers", "Namur"], correct: 0 },
        { q: "Indépendance belge ?", answers: ["1830", "1789", "1914", "1950"], correct: 0 },
        { q: "Symbole national ?", answers: ["Lion", "Coq", "Aigle", "Ours"], correct: 0 },
        { q: "Créateur des Schtroumpfs ?", answers: ["Peyo", "Hergé", "Franquin", "Morris"], correct: 0 },
        { q: "Fleuve de Liège ?", answers: ["Meuse", "Escaut", "Seine", "Rhin"], correct: 0 },
    ],
    corps: [
        { q: "Organe qui pompe le sang ?", answers: ["Cœur", "Poumons", "Cerveau", "Foie"], correct: 0 },
        { q: "Plus grand organe ?", answers: ["Peau", "Foie", "Cerveau", "Intestin"], correct: 0 },
        { q: "Combien d'os adulte ?", answers: ["206", "106", "306", "150"], correct: 0 },
        { q: "Mesure l'humidité ?", answers: ["Hygromètre", "Thermomètre", "Baromètre", "Girouette"], correct: 0 },
    ],
    francais: [
        { q: "Pluriel de cheval ?", answers: ["Chevaux", "Chevals", "Chevales", "Cheveaux"], correct: 0 },
        { q: "Contraire de grand ?", answers: ["Petit", "Gros", "Large", "Haut"], correct: 0 },
        { q: "Féminin d'acteur ?", answers: ["Actrice", "Acteuse", "Acteure", "Actresse"], correct: 0 },
        { q: "Synonyme de joyeux ?", answers: ["Content", "Triste", "Fatigué", "Calme"], correct: 0 },
    ],
    math: [
        { q: "25 + 17 = ?", answers: ["42", "32", "52", "43"], correct: 0 },
        { q: "6 × 7 = ?", answers: ["42", "36", "48", "56"], correct: 0 },
        { q: "Double de 35 ?", answers: ["70", "60", "65", "75"], correct: 0 },
        { q: "Quart de 100 ?", answers: ["25", "50", "40", "20"], correct: 0 },
        { q: "Faces d'un cube ?", answers: ["6", "4", "8", "12"], correct: 0 },
    ],
};

function startBubbleShooter(gameType, callback) {
    const bs = bubbleState;
    bs.afterBubbleCallback = callback;
    bs.score = 0; bs.level = 0;
    bs.questions = shuffleArray([...(BUBBLE_QUESTIONS[gameType] || BUBBLE_QUESTIONS.math)]);
    showScreen('screen-bubble');
    bs.canvas = document.getElementById('bubble-canvas');
    bs.ctx = bs.canvas.getContext('2d');
    resizeBubbleCanvas();
    window.addEventListener('resize', resizeBubbleCanvas);
    document.getElementById('bubble-story').textContent = "🥁 Éclate la bulle avec la bonne réponse !";
    loadBubbleLevel();
    bs.canvas.addEventListener('mousemove', bubbleAim);
    bs.canvas.addEventListener('touchmove', bubbleTouchAim, { passive: false });
    bs.canvas.addEventListener('click', bubbleShoot);
    bs.canvas.addEventListener('touchend', bubbleShoot);
}

function resizeBubbleCanvas() {
    const c = bubbleState.canvas;
    if (!c) return;
    const parent = c.parentElement;
    c.width = parent.getBoundingClientRect().width;
    // Calculate available height: viewport minus header, story, question
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
    bs.question = q; bs.bubbles = []; bs.particles = []; bs.shooting = false; bs.projectile = null;
    document.getElementById('bubble-question-text').textContent = q.q;
    document.getElementById('bubble-score').textContent = `${bs.score} pts`;
    document.getElementById('bubble-level').textContent = `Bulle ${bs.level + 1}`;

    const W = bs.canvas.width;
    const H = bs.canvas.height;
    // Responsive bubble size: smaller on mobile
    const R = Math.min(38, Math.max(24, W / 11));
    const allColors = ['#e94560', '#533483', '#7b2d8e', '#c62828', '#1565C0', '#00838F', '#F57C00', '#6A1B9A'];
    const colors = shuffleArray([...allColors]).slice(0, 4);
    const sa = q.answers.map((a, i) => ({ text: a, isCorrect: i === q.correct }));
    shuffleArray(sa);

    // 2×2 grid layout, well spaced, in the top half of canvas
    const cols = 2;
    const rows = 2;
    const padX = R + 15;
    const cellW = (W - padX * 2) / (cols - 1 || 1);
    const cellH = Math.min(R * 3, (H * 0.45) / (rows - 1 || 1));
    const startY = R + 20;

    sa.forEach((ans, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        bs.bubbles.push({
            x: padX + col * cellW + (Math.random() - 0.5) * 10,
            y: startY + row * cellH + (Math.random() - 0.5) * 8,
            r: R, text: ans.text, isCorrect: ans.isCorrect,
            color: colors[i % colors.length],  // toutes les couleurs aléatoires, pas de vert = correct
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.3,
            alive: true, wobble: Math.random() * Math.PI * 2,
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

    bs.bubbles.forEach(b => {
        if (!b.alive) return;
        b.wobble += 0.02;
        b.x += b.vx + Math.sin(b.wobble) * 0.3;
        b.y += b.vy + Math.cos(b.wobble * 0.7) * 0.2;
        // Keep bubbles in top 60% of canvas (leave room for launcher)
        const maxY = H * 0.55;
        if (b.x - b.r < 0 || b.x + b.r > W) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > maxY) b.vy *= -1;
        b.x = Math.max(b.r, Math.min(W - b.r, b.x));
        b.y = Math.max(b.r, Math.min(maxY - b.r, b.y));

        ctx.save();
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color; ctx.globalAlpha = 0.9; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
        ctx.globalAlpha = 1; ctx.fillStyle = 'white';
        // Adaptive font: measure and shrink if needed
        let fontSize = Math.max(11, b.r * 0.42);
        ctx.font = `800 ${fontSize}px 'Nunito', sans-serif`;
        // Shrink font if text overflows bubble
        while (ctx.measureText(b.text).width > b.r * 1.7 && fontSize > 9) {
            fontSize--;
            ctx.font = `800 ${fontSize}px 'Nunito', sans-serif`;
        }
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.text, b.x, b.y);
        ctx.restore();
    });

    // Launcher at bottom - responsive size
    const lx = W / 2, ly = H - 25;
    const launcherR = Math.min(16, W / 22);
    if (!bs.shooting) {
        ctx.save(); ctx.setLineDash([6, 6]);
        ctx.strokeStyle = isDark ? 'rgba(233,69,96,0.3)' : 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly);
        const aimLen = Math.min(100, H * 0.2);
        ctx.lineTo(lx + Math.cos(bs.aimAngle) * aimLen, ly + Math.sin(bs.aimAngle) * aimLen);
        ctx.stroke(); ctx.restore();
    }
    ctx.beginPath(); ctx.arc(lx, ly, launcherR, 0, Math.PI * 2);
    ctx.fillStyle = '#e94560'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'white'; ctx.font = `bold ${Math.max(12, launcherR)}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('▲', lx, ly - 1);

    if (bs.projectile) {
        const p = bs.projectile;
        p.x += p.vx; p.y += p.vy;
        if (p.x - p.r < 0 || p.x + p.r > W) p.vx *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#e94560'; ctx.fill();
        for (const b of bs.bubbles) {
            if (!b.alive) continue;
            const dx = p.x - b.x, dy = p.y - b.y;
            if (Math.sqrt(dx * dx + dy * dy) < p.r + b.r) {
                b.alive = false; bs.projectile = null; bs.shooting = false;
                if (b.isCorrect) {
                    bs.score += 2;
                    createBubbleParticles(b.x, b.y, b.color); playSound('correct');
                    showBubbleFeedback(true);
                    setTimeout(() => { bs.level++; loadBubbleLevel(); }, 1200);
                } else {
                    createBubbleParticles(b.x, b.y, '#ef5350'); playSound('wrong');
                    showBubbleFeedback(false);
                    bs.questions.push(bs.questions[bs.level]); // report la question
                    setTimeout(() => { bs.level++; loadBubbleLevel(); }, 1200);
                }
                break;
            }
        }
        if (bs.projectile && p.y + p.r < 0) { bs.projectile = null; bs.shooting = false; }
    }

    bs.particles = bs.particles.filter(p => p.life > 0);
    bs.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= 0.02;
        ctx.globalAlpha = p.life; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill(); ctx.globalAlpha = 1;
    });
    bs.animFrame = requestAnimationFrame(bubbleLoop);
}

function bubbleAim(e) {
    const bs = bubbleState, rect = bs.canvas.getBoundingClientRect();
    bs.aimAngle = Math.min(-0.15, Math.max(-Math.PI + 0.15,
        Math.atan2(e.clientY - rect.top - (bs.canvas.height - 30), e.clientX - rect.left - bs.canvas.width / 2)));
}
function bubbleTouchAim(e) { e.preventDefault(); bubbleAim({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }); }
function bubbleShoot(e) {
    const bs = bubbleState;
    if (bs.shooting || bs.projectile) return;
    if (e.clientX !== undefined) {
        const rect = bs.canvas.getBoundingClientRect();
        bs.aimAngle = Math.min(-0.15, Math.max(-Math.PI + 0.15,
            Math.atan2(e.clientY - rect.top - (bs.canvas.height - 30), e.clientX - rect.left - bs.canvas.width / 2)));
    }
    bs.shooting = true;
    const projR = Math.min(10, bs.canvas.width / 35);
    bs.projectile = { x: bs.canvas.width / 2, y: bs.canvas.height - 25, r: projR,
        vx: Math.cos(bs.aimAngle) * 10, vy: Math.sin(bs.aimAngle) * 10 };
    playSound('flip');
}
function createBubbleParticles(x, y, color) {
    for (let i = 0; i < 15; i++) bubbleState.particles.push({
        x, y, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8 - 3,
        size: Math.random() * 5 + 2, color, life: 1 });
}
function showBubbleFeedback(correct) {
    const el = document.getElementById('bubble-feedback');
    document.getElementById('bubble-feedback-icon').textContent = correct ? '🖤' : '💥';
    document.getElementById('bubble-feedback-text').textContent = correct ? 'BRAVO !' : 'Raté !';
    el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 1000);
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
    bs.canvas?.removeEventListener('mousemove', bubbleAim);
    bs.canvas?.removeEventListener('touchmove', bubbleTouchAim);
    bs.canvas?.removeEventListener('click', bubbleShoot);
    bs.canvas?.removeEventListener('touchend', bubbleShoot);
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
    if (currentMode === 'quiz' && currentLevel + 1 < totalLevels) {
        currentLevel++;
        startLevel();
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
