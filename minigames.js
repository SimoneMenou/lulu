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

    // Pick 8 random parts
    ss.questions = shuffleArray([...SKELETON_PARTS]).slice(0, 8);

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


// ===== SPEED CALC =====
const SPEED_OPS = [
    // Tables de multiplication
    ...(() => {
        const ops = [];
        for (let a = 2; a <= 12; a++) {
            for (let b = 2; b <= 12; b++) {
                ops.push({ q: `${a} × ${b}`, answer: a * b, type: 'mult' });
            }
        }
        return ops;
    })(),
    // Additions
    { q: '45 + 28', answer: 73 }, { q: '67 + 35', answer: 102 },
    { q: '128 + 54', answer: 182 }, { q: '89 + 76', answer: 165 },
    { q: '250 + 175', answer: 425 }, { q: '99 + 99', answer: 198 },
    // Soustractions
    { q: '100 - 37', answer: 63 }, { q: '85 - 29', answer: 56 },
    { q: '200 - 78', answer: 122 }, { q: '150 - 63', answer: 87 },
    // Doubles / Moitiés
    { q: 'Double de 35', answer: 70 }, { q: 'Double de 48', answer: 96 },
    { q: 'Moitié de 84', answer: 42 }, { q: 'Moitié de 66', answer: 33 },
    { q: 'Moitié de 120', answer: 60 },
];

let speedState = {
    score: 0, streak: 0, timeLeft: 30, timer: null,
    currentQ: null, callback: null, active: false,
};

function startSpeedCalc(callback) {
    const sp = speedState;
    sp.callback = callback;
    sp.score = 0;
    sp.streak = 0;
    sp.timeLeft = 30;
    sp.active = true;

    showScreen('screen-speedcalc');

    document.getElementById('speed-streak').textContent = '';
    updateSpeedUI();
    nextSpeedQuestion();

    // Countdown timer
    sp.timer = setInterval(() => {
        sp.timeLeft--;
        updateSpeedUI();
        if (sp.timeLeft <= 0) {
            endSpeedCalc();
        }
    }, 1000);
}

function nextSpeedQuestion() {
    const sp = speedState;
    if (!sp.active) return;

    // Pick random operation
    const op = SPEED_OPS[Math.floor(Math.random() * SPEED_OPS.length)];
    sp.currentQ = op;

    document.getElementById('speed-question').textContent = `${op.q} = ?`;

    // Generate 4 choices with the correct answer
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
    while (choices.size < 4) {
        // Generate plausible wrong answers
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

    // Disable all buttons briefly
    const allBtns = document.querySelectorAll('.speed-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
        sp.score += 2;
        sp.streak++;
        btn.classList.add('correct');
        playSound('correct');

        // Streak display
        if (sp.streak >= 5) {
            document.getElementById('speed-streak').textContent = `🔥🔥 COMBO x${sp.streak} !!`;
        } else if (sp.streak >= 3) {
            document.getElementById('speed-streak').textContent = `🔥 Série de ${sp.streak} !`;
        } else {
            document.getElementById('speed-streak').textContent = '';
        }

        // Bonus time for streaks
        if (sp.streak >= 5 && sp.streak % 5 === 0) {
            sp.timeLeft = Math.min(sp.timeLeft + 3, 30);
        }
    } else {
        sp.streak = 0;
        btn.classList.add('wrong');
        playSound('wrong');
        document.getElementById('speed-streak').textContent = '';

        // Show correct answer
        allBtns.forEach(b => {
            if (parseInt(b.textContent) === sp.currentQ.answer) b.classList.add('correct');
        });
    }

    updateSpeedUI();

    setTimeout(() => {
        if (sp.active) nextSpeedQuestion();
    }, isCorrect ? 400 : 900);
}

function updateSpeedUI() {
    const sp = speedState;
    document.getElementById('speed-score').textContent = `${sp.score} pts`;
    document.getElementById('speed-timer').textContent = `⏱ ${sp.timeLeft}s`;

    const fill = document.getElementById('speed-timer-fill');
    const pct = (sp.timeLeft / 30) * 100;
    fill.style.width = pct + '%';
    fill.className = 'speed-timer-fill' +
        (sp.timeLeft <= 5 ? ' danger' : sp.timeLeft <= 10 ? ' warning' : '');
}

function endSpeedCalc() {
    const sp = speedState;
    sp.active = false;
    clearInterval(sp.timer);

    showMiniFeedback('speed-feedback', true,
        `Terminé ! ${sp.score} points en 30 secondes !`);

    setTimeout(() => {
        if (sp.callback) sp.callback(sp.score);
    }, 1800);
}

function exitSpeedCalc() {
    const sp = speedState;
    sp.active = false;
    clearInterval(sp.timer);
    if (sp.callback) sp.callback(sp.score);
}
