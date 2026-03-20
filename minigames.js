// ============================================
// MINI-JEUX INTERMÉDIAIRES
// Squelette interactif (Corps Humain)
// Speed Calc (Maths)
// ============================================

// ===== SQUELETTE INTERACTIF =====
const SKELETON_PARTS = [
    // { name, x, y } — coordonnées en % du canvas (0-1)
    // Tête / Crâne
    { name: "Crâne", zone: { x: 0.5, y: 0.08, r: 0.055 }, hint: "Protège le cerveau" },
    { name: "Cerveau", zone: { x: 0.5, y: 0.07, r: 0.04 }, hint: "Organe de la pensée" },
    // Tronc
    { name: "Côtes", zone: { x: 0.5, y: 0.25, r: 0.07 }, hint: "Protègent le cœur et les poumons" },
    { name: "Cœur", zone: { x: 0.46, y: 0.24, r: 0.035 }, hint: "Pompe le sang" },
    { name: "Poumons", zone: { x: 0.54, y: 0.23, r: 0.05 }, hint: "Servent à respirer" },
    { name: "Estomac", zone: { x: 0.48, y: 0.34, r: 0.04 }, hint: "Digère les aliments" },
    { name: "Colonne vertébrale", zone: { x: 0.5, y: 0.32, r: 0.03 }, hint: "Soutient le corps" },
    // Bras
    { name: "Épaule", zone: { x: 0.35, y: 0.18, r: 0.03 }, hint: "Articulation du bras" },
    { name: "Coude", zone: { x: 0.28, y: 0.32, r: 0.025 }, hint: "Articulation charnière" },
    { name: "Main", zone: { x: 0.24, y: 0.48, r: 0.03 }, hint: "27 os dans chaque main !" },
    // Jambes
    { name: "Hanche", zone: { x: 0.43, y: 0.44, r: 0.035 }, hint: "Articulation sphérique" },
    { name: "Fémur", zone: { x: 0.42, y: 0.55, r: 0.04 }, hint: "L'os le plus long du corps" },
    { name: "Genou", zone: { x: 0.42, y: 0.64, r: 0.03 }, hint: "Articulation de la jambe" },
    { name: "Tibia", zone: { x: 0.42, y: 0.74, r: 0.035 }, hint: "Os du devant de la jambe" },
    { name: "Pied", zone: { x: 0.42, y: 0.88, r: 0.035 }, hint: "26 os dans chaque pied !" },
];

let skeletonState = {
    canvas: null, ctx: null,
    questions: [], currentIndex: 0,
    score: 0, callback: null,
    highlight: null, highlightTimer: null,
};

function startSkeletonGame(callback) {
    const ss = skeletonState;
    ss.callback = callback;
    ss.score = 0;
    ss.currentIndex = 0;
    ss.highlight = null;

    // Pick 8 parties jamais vues (utilise le tracker de app.js)
    ss.questions = pickFreshQuestions(SKELETON_PARTS, 'corps', 'skeleton', 8);

    showScreen('screen-skeleton');

    ss.canvas = document.getElementById('skeleton-canvas');
    ss.ctx = ss.canvas.getContext('2d');

    resizeSkeletonCanvas();
    window.addEventListener('resize', resizeSkeletonCanvas);
    ss.canvas.addEventListener('click', handleSkeletonTap);
    ss.canvas.addEventListener('touchend', handleSkeletonTouch);

    updateSkeletonUI();
    drawSkeleton();
}

function resizeSkeletonCanvas() {
    const ss = skeletonState;
    const container = ss.canvas.parentElement;
    const w = Math.min(container.clientWidth - 16, 320);
    const h = Math.min(container.clientHeight - 8, 520);
    ss.canvas.width = w;
    ss.canvas.height = h;
    drawSkeleton();
}

function drawSkeleton() {
    const ss = skeletonState;
    const ctx = ss.ctx;
    const W = ss.canvas.width;
    const H = ss.canvas.height;
    const isDark = currentTheme === 'blackmetal';

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = isDark ? '#12101f' : '#f5f5f5';
    ctx.fillRect(0, 0, W, H);

    const boneColor = isDark ? '#e8dcc8' : '#555';
    const jointColor = isDark ? '#d4c4a8' : '#777';

    ctx.strokeStyle = boneColor;
    ctx.fillStyle = jointColor;
    ctx.lineWidth = Math.max(3, W * 0.015);
    ctx.lineCap = 'round';

    const px = (x) => x * W;
    const py = (y) => y * H;

    // Head
    ctx.beginPath();
    ctx.arc(px(0.5), py(0.08), W * 0.055, 0, Math.PI * 2);
    ctx.stroke();
    // Eyes
    ctx.fillStyle = isDark ? '#e94560' : '#333';
    ctx.beginPath();
    ctx.arc(px(0.47), py(0.075), 3, 0, Math.PI * 2);
    ctx.arc(px(0.53), py(0.075), 3, 0, Math.PI * 2);
    ctx.fill();
    // Smile
    ctx.beginPath();
    ctx.arc(px(0.5), py(0.085), W * 0.02, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = jointColor;

    // Neck
    ctx.beginPath();
    ctx.moveTo(px(0.5), py(0.13));
    ctx.lineTo(px(0.5), py(0.17));
    ctx.stroke();

    // Spine
    ctx.beginPath();
    ctx.moveTo(px(0.5), py(0.17));
    ctx.lineTo(px(0.5), py(0.43));
    ctx.stroke();

    // Ribs (simplified)
    for (let i = 0; i < 4; i++) {
        const y = 0.20 + i * 0.045;
        ctx.beginPath();
        ctx.moveTo(px(0.5), py(y));
        ctx.quadraticCurveTo(px(0.38), py(y + 0.02), px(0.36), py(y));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px(0.5), py(y));
        ctx.quadraticCurveTo(px(0.62), py(y + 0.02), px(0.64), py(y));
        ctx.stroke();
    }

    // Pelvis
    ctx.beginPath();
    ctx.moveTo(px(0.38), py(0.43));
    ctx.quadraticCurveTo(px(0.5), py(0.48), px(0.62), py(0.43));
    ctx.stroke();

    // Arms - Left
    ctx.beginPath();
    ctx.moveTo(px(0.5), py(0.18)); // shoulder
    ctx.lineTo(px(0.35), py(0.18));
    ctx.lineTo(px(0.28), py(0.32)); // elbow
    ctx.lineTo(px(0.24), py(0.45)); // wrist
    ctx.stroke();
    // Hand
    ctx.beginPath();
    ctx.arc(px(0.24), py(0.48), W * 0.02, 0, Math.PI * 2);
    ctx.stroke();

    // Arms - Right
    ctx.beginPath();
    ctx.moveTo(px(0.5), py(0.18));
    ctx.lineTo(px(0.65), py(0.18));
    ctx.lineTo(px(0.72), py(0.32));
    ctx.lineTo(px(0.76), py(0.45));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px(0.76), py(0.48), W * 0.02, 0, Math.PI * 2);
    ctx.stroke();

    // Legs - Left
    ctx.beginPath();
    ctx.moveTo(px(0.43), py(0.44));
    ctx.lineTo(px(0.42), py(0.55)); // femur
    ctx.lineTo(px(0.42), py(0.64)); // knee
    ctx.lineTo(px(0.42), py(0.74)); // tibia
    ctx.lineTo(px(0.42), py(0.85)); // ankle
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px(0.42), py(0.85));
    ctx.lineTo(px(0.38), py(0.89));
    ctx.lineTo(px(0.46), py(0.89));
    ctx.stroke();

    // Legs - Right
    ctx.beginPath();
    ctx.moveTo(px(0.57), py(0.44));
    ctx.lineTo(px(0.58), py(0.55));
    ctx.lineTo(px(0.58), py(0.64));
    ctx.lineTo(px(0.58), py(0.74));
    ctx.lineTo(px(0.58), py(0.85));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px(0.58), py(0.85));
    ctx.lineTo(px(0.54), py(0.89));
    ctx.lineTo(px(0.62), py(0.89));
    ctx.stroke();

    // Joints
    const joints = [
        [0.35, 0.18], [0.65, 0.18], // shoulders
        [0.28, 0.32], [0.72, 0.32], // elbows
        [0.43, 0.44], [0.57, 0.44], // hips
        [0.42, 0.64], [0.58, 0.64], // knees
    ];
    joints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(px(x), py(y), 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw highlight if answer was given
    if (ss.highlight) {
        const h = ss.highlight;
        ctx.beginPath();
        ctx.arc(px(h.zone.x), py(h.zone.y), h.zone.r * W + 8, 0, Math.PI * 2);
        ctx.fillStyle = h.correct ? 'rgba(102,187,106,0.3)' : 'rgba(239,83,80,0.3)';
        ctx.fill();
        ctx.strokeStyle = h.correct ? '#66bb6a' : '#ef5350';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.fillStyle = isDark ? '#fff' : '#333';
        ctx.font = `bold ${Math.max(12, W * 0.04)}px 'Nunito', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(h.name, px(h.zone.x), py(h.zone.y) - h.zone.r * H - 10);
    }
}

function updateSkeletonUI() {
    const ss = skeletonState;
    if (ss.currentIndex >= ss.questions.length) return;
    const q = ss.questions[ss.currentIndex];
    document.getElementById('skeleton-question').textContent = `Où est : ${q.name} ?`;
    document.getElementById('skeleton-score').textContent = `${ss.score} pts`;
    document.getElementById('skeleton-progress').textContent = `${ss.currentIndex + 1} / ${ss.questions.length}`;
}

function handleSkeletonTouch(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const rect = skeletonState.canvas.getBoundingClientRect();
    processSkeletonTap(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleSkeletonTap(e) {
    const rect = skeletonState.canvas.getBoundingClientRect();
    processSkeletonTap(e.clientX - rect.left, e.clientY - rect.top);
}

function processSkeletonTap(tapX, tapY) {
    const ss = skeletonState;
    if (ss.currentIndex >= ss.questions.length) return;

    const W = ss.canvas.width;
    const H = ss.canvas.height;
    const q = ss.questions[ss.currentIndex];

    // Normalize tap to 0-1
    const nx = tapX / W;
    const ny = tapY / H;

    // Check distance to target zone
    const dx = nx - q.zone.x;
    const dy = ny - q.zone.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hitRadius = q.zone.r + 0.04; // generous touch zone

    const isCorrect = dist < hitRadius;

    // Show highlight
    ss.highlight = { ...q, correct: isCorrect };
    drawSkeleton();

    if (isCorrect) {
        ss.score += 2;
        playSound('correct');
        showMiniFeedback('skeleton-feedback', true, `${q.name} ! ${q.hint}`);
    } else {
        playSound('wrong');
        showMiniFeedback('skeleton-feedback', false, `C'était ici : ${q.name}`);
        // Report la question à la fin
        ss.questions.push(q);
    }

    ss.currentIndex++;

    setTimeout(() => {
        ss.highlight = null;
        if (ss.currentIndex >= ss.questions.length) {
            cleanupSkeleton();
            if (ss.callback) ss.callback(ss.score);
        } else {
            updateSkeletonUI();
            drawSkeleton();
        }
    }, 1400);
}

function showMiniFeedback(elementId, correct, text) {
    const el = document.getElementById(elementId);
    el.className = `mini-feedback ${correct ? 'correct' : 'wrong'}`;
    el.textContent = correct ? `✓ ${text}` : `✗ ${text}`;
    setTimeout(() => el.classList.add('hidden'), 1200);
}

function exitSkeleton() {
    cleanupSkeleton();
    const ss = skeletonState;
    if (ss.callback) ss.callback(ss.score);
}

function cleanupSkeleton() {
    const ss = skeletonState;
    ss.canvas?.removeEventListener('click', handleSkeletonTap);
    ss.canvas?.removeEventListener('touchend', handleSkeletonTouch);
    window.removeEventListener('resize', resizeSkeletonCanvas);
}


// ===== SPEED CALC — Tables de multiplication avec niveaux =====
// Niveaux progressifs : tables de plus en plus difficiles
const SPEED_LEVELS = [
    { name: "Niveau 1 — Tables de 2, 3, 4",      tables: [2, 3, 4],          maxB: 10, time: 35 },
    { name: "Niveau 2 — Tables de 5, 6",          tables: [5, 6],             maxB: 10, time: 30 },
    { name: "Niveau 3 — Tables de 7, 8",          tables: [7, 8],             maxB: 10, time: 30 },
    { name: "Niveau 4 — Tables de 9, 10, 11",     tables: [9, 10, 11],        maxB: 11, time: 30 },
    { name: "Niveau 5 — Toutes les tables !",      tables: [2,3,4,5,6,7,8,9,10,11], maxB: 11, time: 25 },
    { name: "Niveau 6 — Mode BEAST",              tables: [6,7,8,9,11],       maxB: 11, time: 20 },
];

let speedState = {
    score: 0, streak: 0, gauge: 50, // jauge 0-100
    level: 0, timer: null, tickInterval: null,
    currentQ: null, callback: null, active: false,
    questionsAnswered: 0,
};

function startSpeedCalc(callback) {
    const sp = speedState;
    sp.callback = callback;
    sp.score = 0;
    sp.streak = 0;
    sp.gauge = 50; // commence au milieu
    sp.level = 0;
    sp.active = true;
    sp.questionsAnswered = 0;

    showScreen('screen-speedcalc');
    document.getElementById('speed-streak').textContent = '';
    updateSpeedUI();
    nextSpeedQuestion();

    // La jauge descend lentement toute seule (pression !)
    sp.tickInterval = setInterval(() => {
        if (!sp.active) return;
        sp.gauge = Math.max(0, sp.gauge - 0.4);
        updateSpeedUI();
        if (sp.gauge <= 0) endSpeedCalc();
    }, 200);
}

function getSpeedLevel() {
    return SPEED_LEVELS[Math.min(speedState.level, SPEED_LEVELS.length - 1)];
}

function generateSpeedQuestion() {
    const lvl = getSpeedLevel();
    const a = lvl.tables[Math.floor(Math.random() * lvl.tables.length)];
    const b = 2 + Math.floor(Math.random() * (lvl.maxB - 1));
    return { q: `${a} × ${b}`, answer: a * b };
}

function nextSpeedQuestion() {
    const sp = speedState;
    if (!sp.active) return;

    // Check level up every 8 bonnes réponses
    const newLevel = Math.min(Math.floor(sp.score / 16), SPEED_LEVELS.length - 1); // 8 bonnes × 2pts = 16
    if (newLevel > sp.level) {
        sp.level = newLevel;
        showMiniFeedback('speed-feedback', true, `⬆️ ${getSpeedLevel().name}`);
    }

    const op = generateSpeedQuestion();
    sp.currentQ = op;

    document.getElementById('speed-question').textContent = `${op.q} = ?`;
    document.getElementById('speed-timer').textContent = getSpeedLevel().name;

    const choices = generateSpeedChoices(op.answer);
    const choicesEl = document.getElementById('speed-choices');
    choicesEl.innerHTML = '';

    choices.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'speed-btn';
        btn.textContent = val;
        btn.addEventListener('click', () => handleSpeedAnswer(val, btn));
        choicesEl.appendChild(btn);
    });
}

function generateSpeedChoices(correct) {
    const choices = new Set([correct]);
    // Réponses plausibles : tables proches
    const nearby = [correct - 1, correct + 1, correct - correct % 10 + 10, correct + 7, correct - 7, correct + 3, correct - 3, correct + 9, correct - 9];
    shuffleArray(nearby);
    for (const n of nearby) {
        if (n > 0 && n !== correct) choices.add(n);
        if (choices.size >= 4) break;
    }
    while (choices.size < 4) {
        const offset = Math.floor(Math.random() * 20) - 10;
        const wrong = correct + (offset === 0 ? 1 : offset);
        if (wrong > 0) choices.add(wrong);
    }
    return shuffleArray([...choices]);
}

function handleSpeedAnswer(value, btn) {
    const sp = speedState;
    if (!sp.active || !sp.currentQ) return;

    const isCorrect = value === sp.currentQ.answer;
    const allBtns = document.querySelectorAll('.speed-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
        sp.score += 2;
        sp.streak++;
        sp.questionsAnswered++;
        btn.classList.add('correct');
        playSound('correct');

        // Jauge monte : +8 de base, +2 bonus par streak
        const bonus = Math.min(sp.streak, 5) * 2;
        sp.gauge = Math.min(100, sp.gauge + 8 + bonus);

        // Streak display
        if (sp.streak >= 7) {
            document.getElementById('speed-streak').textContent = `🔥🔥🔥 INARRÊTABLE x${sp.streak} !!!`;
        } else if (sp.streak >= 5) {
            document.getElementById('speed-streak').textContent = `🔥🔥 COMBO x${sp.streak} !!`;
        } else if (sp.streak >= 3) {
            document.getElementById('speed-streak').textContent = `🔥 Série de ${sp.streak} !`;
        } else {
            document.getElementById('speed-streak').textContent = '';
        }
    } else {
        sp.streak = 0;
        btn.classList.add('wrong');
        playSound('wrong');
        document.getElementById('speed-streak').textContent = '';

        // Jauge descend de 15
        sp.gauge = Math.max(0, sp.gauge - 15);

        // Show correct answer
        allBtns.forEach(b => {
            if (parseInt(b.textContent) === sp.currentQ.answer) b.classList.add('correct');
        });
    }

    updateSpeedUI();

    setTimeout(() => {
        if (sp.active) {
            if (sp.gauge <= 0) endSpeedCalc();
            else nextSpeedQuestion();
        }
    }, isCorrect ? 350 : 800);
}

function updateSpeedUI() {
    const sp = speedState;
    document.getElementById('speed-score').textContent = `${sp.score} pts`;

    const fill = document.getElementById('speed-timer-fill');
    const pct = sp.gauge;
    fill.style.width = pct + '%';

    if (pct <= 20) fill.className = 'speed-timer-fill danger';
    else if (pct <= 40) fill.className = 'speed-timer-fill warning';
    else fill.className = 'speed-timer-fill';
}

function endSpeedCalc() {
    const sp = speedState;
    sp.active = false;
    clearInterval(sp.tickInterval);

    const lvlName = getSpeedLevel().name;
    showMiniFeedback('speed-feedback', true,
        `${sp.score} pts — ${sp.questionsAnswered} bonnes réponses !`);

    setTimeout(() => {
        if (sp.callback) sp.callback(sp.score);
    }, 1800);
}

function exitSpeedCalc() {
    const sp = speedState;
    sp.active = false;
    clearInterval(sp.tickInterval);
    if (sp.callback) sp.callback(sp.score);
}


// ===== BESCHERELLE (trier passé / présent / futur) =====
let beschState = { phrases: [], index: 0, score: 0, callback: null, locked: false };

function startBescherelle(callback) {
    const bs = beschState;
    bs.callback = callback;
    bs.score = 0;
    bs.index = 0;
    bs.locked = false;
    bs.phrases = pickFreshQuestions(BESCHERELLE_PHRASES, 'francais', 'bescherelle', 10);

    showScreen('screen-bescherelle');
    showBeschPhrase();
}

function showBeschPhrase() {
    const bs = beschState;
    if (bs.index >= bs.phrases.length) {
        setTimeout(() => {
            if (bs.callback) bs.callback(bs.score);
            else showResults('bescherelle');
        }, 600);
        return;
    }

    bs.locked = false;
    const p = bs.phrases[bs.index];
    document.getElementById('besch-phrase').textContent = p.phrase;
    document.getElementById('besch-score').textContent = `${bs.score} pts`;
    document.getElementById('besch-progress').textContent = `${bs.index + 1} / ${bs.phrases.length}`;
    document.getElementById('besch-feedback').classList.add('hidden');

    // Reset box highlights
    document.querySelectorAll('.besch-box').forEach(b => {
        b.classList.remove('correct', 'wrong');
    });
}

function handleBeschTap(chosenTemps) {
    const bs = beschState;
    if (bs.locked) return;
    bs.locked = true;

    const p = bs.phrases[bs.index];
    const isCorrect = chosenTemps === p.temps;

    // Highlight boxes
    document.querySelectorAll('.besch-box').forEach(b => {
        if (b.dataset.temps === p.temps) b.classList.add('correct');
        else if (b.dataset.temps === chosenTemps && !isCorrect) b.classList.add('wrong');
    });

    if (isCorrect) {
        bs.score += 2;
        playSound('correct');
    } else {
        playSound('wrong');
        bs.phrases.push(p); // report
    }

    // Show indice
    const fb = document.getElementById('besch-feedback');
    fb.textContent = (isCorrect ? '✓ ' : '✗ ') + p.indice;
    fb.className = 'besch-feedback-text ' + (isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
        bs.index++;
        showBeschPhrase();
    }, 1400);
}

function exitBescherelle() {
    if (beschState.callback) beschState.callback(beschState.score);
    else goBackToSubmenu();
}


// ===== MINI DICTÉE =====
let dicteeState = { questions: [], index: 0, score: 0, callback: null };

function startDictee(callback) {
    const ds = dicteeState;
    ds.callback = callback;
    ds.score = 0;
    ds.index = 0;
    ds.questions = pickFreshQuestions(MINI_DICTEE, 'francais', 'dictee', 8);

    showScreen('screen-dictee');
    showDicteeQuestion();
}

function showDicteeQuestion() {
    const ds = dicteeState;
    if (ds.index >= ds.questions.length) {
        setTimeout(() => {
            if (ds.callback) ds.callback(ds.score);
            else showResults('dictee');
        }, 600);
        return;
    }

    const q = ds.questions[ds.index];
    document.getElementById('dictee-text').innerHTML = q.texte.replace('___', '<span class="dictee-blank">___</span>');
    document.getElementById('dictee-score').textContent = `${ds.score} pts`;
    document.getElementById('dictee-progress').textContent = `${ds.index + 1} / ${ds.questions.length}`;
    document.getElementById('dictee-feedback').classList.add('hidden');

    const choicesEl = document.getElementById('dictee-choices');
    choicesEl.innerHTML = '';

    const indexed = q.choices.map((c, i) => ({ text: c, isCorrect: i === q.correct }));
    shuffleArray(indexed);

    indexed.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'dictee-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleDicteeAnswer(choice.isCorrect, btn, q));
        choicesEl.appendChild(btn);
    });
}

function handleDicteeAnswer(isCorrect, btn, q) {
    const ds = dicteeState;
    const btns = document.querySelectorAll('.dictee-btn');
    btns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
        ds.score += 2;
        btn.classList.add('correct');
        playSound('correct');
        // Fill in the blank with correct answer
        const blank = document.querySelector('.dictee-blank');
        if (blank) { blank.textContent = q.choices[q.correct]; blank.classList.add('filled'); }
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => { if (b.textContent === q.choices[q.correct]) b.classList.add('correct'); });
        playSound('wrong');
        ds.questions.push(q); // report
    }

    const fb = document.getElementById('dictee-feedback');
    document.getElementById('dictee-feedback-text').textContent = q.explanation;
    fb.classList.remove('hidden');
}

function nextDictee() {
    dicteeState.index++;
    showDicteeQuestion();
}

function exitDictee() {
    if (dicteeState.callback) dicteeState.callback(dicteeState.score);
    else goBackToSubmenu();
}
