// ============================================================
// DIGITAL TWIN LEARNING PLATFORM — APPLICATION ENGINE
// ============================================================

'use strict';

// ── Global chart instances ────────────────────────────────────
const CHARTS = {};

// ── Chart.js defaults (dark theme) ──────────────────────────
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

// ── Colour helpers ───────────────────────────────────────────
const COLOURS = {
  purple:  '#7c3aed',
  purpleL: '#a78bfa',
  cyan:    '#06b6d4',
  cyanL:   '#67e8f9',
  amber:   '#f59e0b',
  emerald: '#10b981',
  red:     '#ef4444',
  orange:  '#f97316',
};

function rgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Router ────────────────────────────────────────────────────
const VIEWS = ['dashboard','predictions','planner','quiz','tutor','simulation','explainability','teacher'];

const VIEW_TITLES = {
  dashboard:      '🧠 Digital Twin Dashboard',
  predictions:    '📈 Predictions & Early Warning',
  planner:        '📅 Personalized Study Planner',
  quiz:           '🎯 Adaptive Quiz Engine',
  tutor:          '🤖 AI Tutor — Ava',
  simulation:     '🔬 Learning Simulation',
  explainability: '🧩 Explainable AI',
  teacher:        '👨‍🏫 Teacher & Parent Dashboard',
};

const VIEW_SUBTITLES = {
  dashboard:      'Live Learning Model',
  predictions:    'AI Forecast',
  planner:        'Optimized Weekly Schedule',
  quiz:           'Adaptive Engine',
  tutor:          'Twin-Aware',
  simulation:     'What-If Analysis',
  explainability: 'Model Transparency',
  teacher:        'Grade 11A · 8 Students',
};

let currentView = 'dashboard';
const initializedViews = new Set();

function switchView(view) {
  if (!VIEWS.includes(view)) return;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });

  // Update views
  document.querySelectorAll('.view').forEach(el => {
    el.classList.toggle('active', el.id === `view-${view}`);
  });

  // Update topbar
  document.getElementById('topbar-title').innerHTML =
    `${VIEW_TITLES[view]} <span>${VIEW_SUBTITLES[view]}</span>`;

  currentView = view;

  // Initialize view on first open
  if (!initializedViews.has(view)) {
    initializedViews.add(view);
    initView(view);
  }
}

function initView(view) {
  switch (view) {
    case 'predictions':    initPredictions();    break;
    case 'planner':        initPlanner();        break;
    case 'quiz':           initQuiz();           break;
    case 'tutor':          initTutor();          break;
    case 'simulation':     initSimulation();     break;
    case 'explainability': initExplainability(); break;
    case 'teacher':        initTeacher();        break;
  }
}

// ── Init: Dashboard (always loads first) ─────────────────────
function initDashboard() {
  drawKnowledgeGraph();
  initCognitiveRadar();
  initForgettingCurve();
  initMasteryBar();
  initializedViews.add('dashboard');
}

// ── KNOWLEDGE GRAPH (Canvas force-directed) ───────────────────
function drawKnowledgeGraph() {
  const canvas = document.getElementById('knowledge-graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Responsive size
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 360;
  }
  resize();

  const W = canvas.width, H = canvas.height;

  // Node colour by status
  const statusColor = {
    'mastered':   COLOURS.emerald,
    'good':       COLOURS.cyan,
    'average':    COLOURS.amber,
    'weak':       COLOURS.orange,
    'struggling': COLOURS.orange,
    'at-risk':    COLOURS.red,
  };

  // Assign initial positions in a nice layout
  const positions = [
    {x:0.15, y:0.35}, // Algebra
    {x:0.30, y:0.15}, // Functions
    {x:0.48, y:0.22}, // Trigonometry
    {x:0.60, y:0.35}, // Limits
    {x:0.68, y:0.55}, // Derivatives
    {x:0.62, y:0.75}, // Integration
    {x:0.18, y:0.60}, // Statistics
    {x:0.30, y:0.78}, // Probability
    {x:0.45, y:0.50}, // Matrices
    {x:0.58, y:0.68}, // Vectors (was 0.82,0.50)
    {x:0.42, y:0.70}, // Complex Nos (was 0.48,0.78)
    {x:0.75, y:0.82}, // Diff Eqs
  ];

  // Build node objects
  const nodes = APP_DATA.knowledgeNodes.map((n, i) => ({
    ...n,
    x: positions[i].x * W,
    y: positions[i].y * H,
    vx: 0, vy: 0,
    r: 14 + n.mastery * 16,
    color: statusColor[n.status],
  }));

  const edges = APP_DATA.knowledgeEdges.map(e => ({
    from: nodes.find(n=>n.id===e.from),
    to:   nodes.find(n=>n.id===e.to),
  }));

  let tooltip = { visible: false, x: 0, y: 0, node: null };
  let animFrame;
  let tick = 0;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    tooltip.node = null;
    tooltip.visible = false;
    for (const n of nodes) {
      const dist = Math.hypot(mx - n.x, my - n.y);
      if (dist < n.r + 4) {
        tooltip.visible = true;
        tooltip.node = n;
        tooltip.x = e.clientX;
        tooltip.y = e.clientY;
        break;
      }
    }
    const el = document.getElementById('tooltip');
    if (tooltip.visible && tooltip.node) {
      const nd = tooltip.node;
      el.innerHTML = `<strong>${nd.name}</strong><br/>Mastery: ${Math.round(nd.mastery*100)}%<br/>Status: ${nd.status}<br/>Category: ${nd.category}`;
      el.style.left = (tooltip.x + 12) + 'px';
      el.style.top  = (tooltip.y - 10) + 'px';
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  canvas.addEventListener('mouseleave', () => {
    document.getElementById('tooltip').classList.remove('visible');
  });

  function draw() {
    tick++;
    ctx.clearRect(0, 0, W, H);

    // Draw edges
    for (const e of edges) {
      const pulse = 0.4 + 0.15 * Math.sin(tick * 0.04);
      ctx.beginPath();
      ctx.moveTo(e.from.x, e.from.y);
      ctx.lineTo(e.to.x, e.to.y);
      ctx.strokeStyle = `rgba(124,58,237,${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw nodes
    for (const n of nodes) {
      const glow = (tooltip.node === n) ? 2.0 : 1.0;

      // Outer glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.2);
      grad.addColorStop(0, n.color + '55');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 2.2 * glow, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(n.color.replace('#',''), 0.18);
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = tooltip.node === n ? 2.5 : 1.5;
      ctx.stroke();

      // Mastery arc
      const angle = (n.mastery) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, -Math.PI/2, -Math.PI/2 + angle);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Label
      ctx.fillStyle = '#e2e8f0';
      ctx.font = `bold ${Math.max(10, n.r * 0.58)}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = n.name.length > 9 ? n.name.slice(0,9)+'.' : n.name;
      ctx.fillText(label, n.x, n.y - 2);

      // Mastery %
      ctx.fillStyle = n.color;
      ctx.font = `${Math.max(8, n.r * 0.45)}px Inter`;
      ctx.fillText(Math.round(n.mastery * 100) + '%', n.x, n.y + n.r * 0.55);
    }

    animFrame = requestAnimationFrame(draw);
  }

  draw();
}

// ── Cognitive Radar ───────────────────────────────────────────
function initCognitiveRadar() {
  const ctx = document.getElementById('cognitive-radar-chart');
  if (!ctx) return;
  const d = APP_DATA.cognitiveProfile;
  if (CHARTS.radar) CHARTS.radar.destroy();
  CHARTS.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Current',
          data: d.current,
          borderColor: COLOURS.purple,
          backgroundColor: rgba(COLOURS.purple.replace('#',''), 0.15),
          pointBackgroundColor: COLOURS.purpleL,
          pointBorderColor: COLOURS.purple,
          pointRadius: 4,
          borderWidth: 2,
        },
        {
          label: 'Ideal',
          data: d.ideal,
          borderColor: rgba(COLOURS.cyan.replace('#',''), 0.4),
          backgroundColor: 'transparent',
          borderDash: [4,4],
          pointRadius: 2,
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 100,
          grid:     { color: 'rgba(255,255,255,0.06)' },
          ticks:    { display: false },
          pointLabels: { font: { size: 11, family: 'Inter' }, color: '#94a3b8' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
        },
      },
      plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 }, padding: 16, usePointStyle: true } } },
      animation: { duration: 1200, easing: 'easeOutQuart' },
    }
  });
}

// ── Forgetting Curve ──────────────────────────────────────────
function initForgettingCurve() {
  const ctx = document.getElementById('forgetting-curve-chart');
  if (!ctx) return;
  const d = APP_DATA.forgettingCurve;
  if (CHARTS.forgetting) CHARTS.forgetting.destroy();
  CHARTS.forgetting = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Without Review',
          data: d.withoutReview,
          borderColor: COLOURS.red,
          backgroundColor: rgba(COLOURS.red.replace('#',''), 0.05),
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'With Spaced Repetition',
          data: d.withReview,
          borderColor: COLOURS.emerald,
          backgroundColor: rgba(COLOURS.emerald.replace('#',''), 0.08),
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          fill: '-1',
        },
        {
          label: "Arjun's Curve",
          data: d.arjun,
          borderColor: COLOURS.purpleL,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          pointRadius: 4,
          borderDash: [],
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 10 } } },
        y: {
          min: 0, max: 110,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%', font: { size: 10 } },
        },
      },
      plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 }, padding: 14, usePointStyle: true } } },
      animation: { duration: 1000 },
    },
  });
}

// ── Mastery Bar ───────────────────────────────────────────────
function initMasteryBar() {
  const ctx = document.getElementById('mastery-bar-chart');
  if (!ctx) return;
  const nodes = APP_DATA.knowledgeNodes;
  const statusColor = {
    mastered: COLOURS.emerald, good: COLOURS.cyan,
    average: COLOURS.amber, struggling: COLOURS.orange,
    weak: COLOURS.orange, 'at-risk': COLOURS.red,
  };
  if (CHARTS.mastery) CHARTS.mastery.destroy();
  CHARTS.mastery = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nodes.map(n => n.name),
      datasets: [{
        label: 'Mastery %',
        data: nodes.map(n => Math.round(n.mastery * 100)),
        backgroundColor: nodes.map(n => rgba(statusColor[n.status].replace('#',''), 0.7)),
        borderColor: nodes.map(n => statusColor[n.status]),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      scales: {
        x: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => v + '%', font: { size: 10 } } },
        y: { grid: { display: false }, ticks: { font: { size: 10 } } },
      },
      plugins: { legend: { display: false } },
      animation: { duration: 1200, easing: 'easeOutQuart' },
    },
  });
}

// ── PREDICTIONS VIEW ──────────────────────────────────────────
function initPredictions() {
  initPredictionChart();
  animateGauges();
  buildWarningTable();
}

function initPredictionChart() {
  const ctx = document.getElementById('prediction-chart');
  if (!ctx) return;
  const d = APP_DATA.predictions;
  if (CHARTS.prediction) CHARTS.prediction.destroy();
  CHARTS.prediction = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Actual Score',
          data: d.actual,
          borderColor: COLOURS.cyan,
          backgroundColor: rgba(COLOURS.cyan.replace('#',''), 0.08),
          borderWidth: 2.5,
          pointRadius: 5,
          pointBackgroundColor: COLOURS.cyan,
          tension: 0.3,
          fill: false,
          spanGaps: false,
        },
        {
          label: 'Without Intervention',
          data: d.withoutIntervention,
          borderColor: COLOURS.red,
          backgroundColor: rgba(COLOURS.red.replace('#',''), 0.05),
          borderWidth: 2,
          pointRadius: 4,
          borderDash: [5, 4],
          tension: 0.3,
          fill: false,
          spanGaps: false,
        },
        {
          label: 'With AI Intervention',
          data: d.withIntervention,
          borderColor: COLOURS.emerald,
          backgroundColor: rgba(COLOURS.emerald.replace('#',''), 0.08),
          borderWidth: 2.5,
          pointRadius: 4,
          borderDash: [],
          tension: 0.3,
          fill: 'origin',
          spanGaps: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          min: 30, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' },
        },
      },
      plugins: {
        legend: { display: true, position: 'top', labels: { font: { size: 12 }, padding: 20, usePointStyle: true } },
        annotation: {},
      },
      animation: { duration: 1000 },
    },
  });
}

function animateGauges() {
  const gauges = [
    { id: 'gauge-failure',     value: 34 },
    { id: 'gauge-dropout',     value: 18 },
    { id: 'gauge-burnout',     value: 45 },
    { id: 'gauge-frustration', value: 38 },
  ];
  const circumference = 2 * Math.PI * 40; // r=40

  gauges.forEach(g => {
    const el = document.getElementById(g.id);
    if (!el) return;
    const offset = circumference - (g.value / 100) * circumference;
    setTimeout(() => {
      el.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
      el.style.strokeDashoffset = offset;
    }, 100);
  });
}

function buildWarningTable() {
  const tbody = document.getElementById('warning-table-body');
  if (!tbody) return;
  tbody.innerHTML = APP_DATA.conceptWarnings.map(w => `
    <tr>
      <td class="concept-name">${w.concept}</td>
      <td>${w.subject}</td>
      <td><span class="risk-pill risk-${w.risk}">${w.risk.toUpperCase()}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar-wrap" style="width:60px;height:5px">
            <div class="progress-bar-fill ${w.risk==='critical'?'fill-red':w.risk==='high'?'fill-amber':'fill-purple'}" style="width:${w.score}%"></div>
          </div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px">${w.score}</span>
        </div>
      </td>
      <td style="color:var(--amber)">${w.timeframe}</td>
      <td style="color:var(--text-muted);font-size:12px">${w.issue}</td>
      <td>
        <span style="font-size:12px;color:var(--cyan)">${w.action}</span>
      </td>
    </tr>
  `).join('');
}

// ── STUDY PLANNER VIEW ────────────────────────────────────────
function initPlanner() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  const sp = APP_DATA.studyPlan;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  grid.innerHTML = days.map(day => {
    const sessions = sp.schedule[day] || [];
    const isToday = day === today;
    return `
      <div class="calendar-day">
        <div class="cal-day-header ${isToday ? 'today' : ''}">
          ${day}${isToday ? ' ★' : ''}
        </div>
        <div class="cal-sessions">
          ${sessions.map(s => {
            const cls = s.type === 'assessment' ? 'block-assessment'
              : s.priority === 'critical' ? 'block-critical'
              : s.priority === 'high'     ? 'block-high'
              : s.priority === 'medium'   ? 'block-medium'
              : 'block-low';
            return `
              <div class="session-block ${cls}">
                <div class="session-time">${s.time} · ${s.subject}</div>
                <div class="session-topic">${s.topic}</div>
                <div class="session-dur">${s.dur} min · ${s.type}</div>
              </div>`;
          }).join('')}
          ${sessions.length === 0 ? '<div style="padding:8px;font-size:11px;color:var(--text-muted)">Rest day 😴</div>' : ''}
        </div>
      </div>`;
  }).join('');
}

// ── QUIZ ENGINE ────────────────────────────────────────────────
const quizState = {
  questions: [],
  current: 0,
  selected: null,
  answered: false,
  score: 0,
  total: 5,
};

function initQuiz() {
  // Pick 5 questions — prioritize weak topics
  const weakTopics = ['Derivatives', 'Limits', 'Integration'];
  const weak = APP_DATA.quizQuestions.filter(q => weakTopics.includes(q.topic));
  const other = APP_DATA.quizQuestions.filter(q => !weakTopics.includes(q.topic));
  quizState.questions = [...shuffleArr(weak).slice(0,3), ...shuffleArr(other).slice(0,2)];
  quizState.current = 0;
  quizState.selected = null;
  quizState.answered = false;
  quizState.score = 0;

  bindQuizButtons();
  renderQuestion();
}

function shuffleArr(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function bindQuizButtons() {
  document.getElementById('quiz-next-btn').onclick = nextQuestion;
  document.getElementById('quiz-submit-btn').onclick = submitAnswer;
  document.getElementById('quiz-skip-btn').onclick = skipQuestion;
  document.getElementById('quiz-restart-btn').onclick = () => {
    document.getElementById('quiz-active-panel').style.display = '';
    document.getElementById('quiz-result-panel').style.display = 'none';
    initQuiz();
  };
  document.getElementById('quiz-review-btn').onclick = () => switchView('dashboard');
}

function renderQuestion() {
  const q = quizState.questions[quizState.current];
  if (!q) { showQuizResult(); return; }

  const total = quizState.total;
  const curr  = quizState.current;

  document.getElementById('quiz-progress-label').textContent = `Question ${curr+1} of ${total}`;
  document.getElementById('quiz-score-label').textContent = `Score: ${quizState.score}/${curr}`;
  document.getElementById('quiz-progress-fill').style.width = `${(curr/total)*100}%`;
  document.getElementById('quiz-topic-tag').innerHTML = `📐 ${q.topic}`;
  document.getElementById('quiz-difficulty').textContent = q.difficulty;
  document.getElementById('quiz-difficulty').className = `quiz-difficulty diff-${q.difficulty}`;
  document.getElementById('quiz-question-text').textContent = q.q;
  document.getElementById('quiz-explanation').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';
  document.getElementById('quiz-submit-btn').style.display = '';
  document.getElementById('quiz-skip-btn').style.display = '';

  // Confidence bar reset
  document.getElementById('confidence-bar').style.width = '30%';
  document.getElementById('confidence-val').textContent = 'Awaiting answer...';

  quizState.selected = null;
  quizState.answered = false;

  // Render options
  const letters = ['A','B','C','D'];
  const grid = document.getElementById('quiz-options-grid');
  grid.innerHTML = q.opts.map((opt, i) => `
    <button class="quiz-option" id="opt-${i}" onclick="selectOption(${i})">
      <span class="option-letter">${letters[i]}</span>
      ${opt}
    </button>
  `).join('');
}

function selectOption(i) {
  if (quizState.answered) return;
  quizState.selected = i;
  document.querySelectorAll('.quiz-option').forEach((el, idx) => {
    el.classList.toggle('selected', idx === i);
  });
  const confidence = 45 + Math.floor(Math.random() * 40);
  document.getElementById('confidence-bar').style.width = confidence + '%';
  document.getElementById('confidence-val').textContent = confidence + '% confident';
}

function submitAnswer() {
  if (quizState.selected === null) {
    alert('Please select an answer!');
    return;
  }
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const correct = q.ans;
  const selected = quizState.selected;

  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.style.cursor = 'default';
    if (i === correct)  el.classList.add('correct');
    if (i === selected && selected !== correct) el.classList.add('wrong');
  });

  if (selected === correct) {
    quizState.score++;
    document.getElementById('confidence-val').textContent = '✓ Correct! Twin mastery updated +2%';
    document.getElementById('confidence-bar').style.width = '90%';
    document.getElementById('confidence-bar').className = 'progress-bar-fill fill-green';
  } else {
    document.getElementById('confidence-val').textContent = '✗ Incorrect — Twin flagged for review';
    document.getElementById('confidence-bar').style.width = '15%';
    document.getElementById('confidence-bar').className = 'progress-bar-fill fill-red';
  }

  // Show explanation
  const expEl = document.getElementById('quiz-explanation');
  expEl.textContent = q.exp;
  expEl.style.display = '';

  document.getElementById('quiz-submit-btn').style.display = 'none';
  document.getElementById('quiz-skip-btn').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = '';
}

function nextQuestion() {
  quizState.current++;
  document.getElementById('confidence-bar').className = 'progress-bar-fill fill-cyan';
  if (quizState.current >= quizState.total) {
    showQuizResult();
  } else {
    renderQuestion();
  }
}

function skipQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.total) {
    showQuizResult();
  } else {
    renderQuestion();
  }
}

function showQuizResult() {
  document.getElementById('quiz-active-panel').style.display = 'none';
  document.getElementById('quiz-result-panel').style.display = '';

  const score = quizState.score;
  const total = quizState.total;
  const pct   = Math.round(score / total * 100);

  document.getElementById('result-score').textContent = `${score}/${total}`;
  document.getElementById('result-emoji').textContent =
    pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : pct >= 40 ? '💪' : '📚';
  document.getElementById('result-label').textContent =
    pct >= 80 ? 'Excellent! Twin mastery updated.' :
    pct >= 60 ? 'Good job! Keep practicing.' :
    pct >= 40 ? 'Keep going! Review flagged concepts.' :
    'Study time! Twin has flagged key gaps.';
}

// ── AI TUTOR CHAT ─────────────────────────────────────────────
const chatHistory = [];

function initTutor() {
  buildSuggestions();
  addAIMessage(`👋 Hi Arjun! I'm <strong>Ava</strong>, your AI Tutor — I have full access to your Digital Twin profile.<br><br>
Your twin shows <strong>3 critical gaps</strong>: Integration (15%), Derivatives (30%), and Limits (45%). These form a prerequisite chain, so fixing Limits will cascade up!<br><br>
What would you like help with today?`);

  document.getElementById('chat-send-btn').onclick = handleChatSend;
  document.getElementById('chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleChatSend();
  });
}

function buildSuggestions() {
  const el = document.getElementById('chat-suggestions');
  if (!el) return;
  el.innerHTML = APP_DATA.tutorSuggestions.map(s =>
    `<div class="suggestion-chip" onclick="sendSuggestion('${s}')">${s}</div>`
  ).join('');
}

function sendSuggestion(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  handleChatSend();
}

function handleChatSend() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  addUserMessage(text);
  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const response = getTutorResponse(text);
    addAIMessage(response);
  }, 1000 + Math.random() * 600);
}

function getTutorResponse(text) {
  for (const r of APP_DATA.tutorResponses) {
    if (r.pattern && r.pattern.test(text)) return r.reply;
  }
  return APP_DATA.tutorResponses[APP_DATA.tutorResponses.length - 1].reply;
}

function addUserMessage(text) {
  const el = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message user';
  div.innerHTML = `
    <div class="message-avatar">AS</div>
    <div class="message-bubble">${escapeHtml(text)}</div>`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function addAIMessage(html) {
  const el = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message ai';
  div.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-bubble">${html}</div>`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function showTypingIndicator() {
  const el = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message ai';
  div.id = 'typing-indicator-msg';
  div.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator-msg');
  if (el) el.remove();
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── LEARNING SIMULATION ────────────────────────────────────────
let simChart = null;
const simScenarios = {
  minimal:   { time: 15,  focus: 30, spacing: 10, priority: 20 },
  current:   { time: 30,  focus: 70, spacing: 50, priority: 60 },
  optimal:   { time: 60,  focus: 85, spacing: 80, priority: 80 },
  intensive: { time: 90,  focus: 95, spacing: 95, priority: 90 },
};

function initSimulation() {
  const ids = ['sim-time','sim-focus','sim-spacing','sim-priority'];
  const labels = ['sim-time-val','sim-focus-val','sim-spacing-val','sim-priority-val'];
  const suffixes = [' min','%','%','%'];

  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      document.getElementById(labels[i]).textContent = el.value + suffixes[i];
      updateSimulation();
    });
  });

  buildSimChart();
  updateSimulation();
}

function buildSimChart() {
  const ctx = document.getElementById('simulation-chart');
  if (!ctx) return;
  if (simChart) simChart.destroy();
  simChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Now','Week 1','Week 2','Week 3','Week 4'],
      datasets: [
        {
          label: 'Without Change',
          data: [68, 62, 55, 48, 42],
          borderColor: COLOURS.red,
          borderWidth: 2,
          borderDash: [5,4],
          pointRadius: 4,
          tension: 0.3,
          fill: false,
        },
        {
          label: 'Your Simulation',
          data: [68, 71, 74, 77, 80],
          borderColor: COLOURS.emerald,
          backgroundColor: rgba(COLOURS.emerald.replace('#',''), 0.08),
          borderWidth: 2.5,
          pointRadius: 4,
          tension: 0.3,
          fill: 'origin',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          min: 30, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' },
        },
      },
      plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } } },
      animation: { duration: 600 },
    },
  });
  CHARTS.simulation = simChart;
}

function updateSimulation() {
  const time     = parseInt(document.getElementById('sim-time')?.value     || 30);
  const focus    = parseInt(document.getElementById('sim-focus')?.value    || 70);
  const spacing  = parseInt(document.getElementById('sim-spacing')?.value  || 50);
  const priority = parseInt(document.getElementById('sim-priority')?.value || 60);

  // Simple scoring formula
  const effScore = (time/120 * 0.35) + (focus/100 * 0.25) + (spacing/100 * 0.25) + (priority/100 * 0.15);
  const baseScore = 68;
  const withoutScore = 42;
  const maxGain = 45;
  const predictedFinal = Math.min(95, Math.round(baseScore + effScore * maxGain));
  const delta = predictedFinal - baseScore;

  // Interpolate week-by-week trajectory
  const weeks = [baseScore, baseScore + delta*0.25, baseScore + delta*0.55, baseScore + delta*0.8, predictedFinal];

  if (simChart) {
    simChart.data.datasets[1].data = weeks.map(v => Math.round(v));
    simChart.update('active');
  }

  document.getElementById('sim-score').textContent = predictedFinal + '%';
  document.getElementById('sim-delta').textContent =
    delta >= 0 ? `+${delta}% vs. current trajectory` : `${delta}% vs. current trajectory`;
  document.getElementById('sim-with').textContent = predictedFinal + '%';
}

function loadScenario(name) {
  const s = simScenarios[name];
  if (!s) return;

  document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`scen-${name}`)?.classList.add('active');

  const ids = { time: s.time, focus: s.focus, spacing: s.spacing, priority: s.priority };
  const suffixes = { time:' min', focus:'%', spacing:'%', priority:'%' };
  Object.entries(ids).forEach(([key, val]) => {
    const el = document.getElementById(`sim-${key}`);
    const lbl = document.getElementById(`sim-${key}-val`);
    if (el)  el.value = val;
    if (lbl) lbl.textContent = val + suffixes[key];
  });
  updateSimulation();
}

// ── EXPLAINABILITY ─────────────────────────────────────────────
function initExplainability() {
  buildFeatureImportance();
  initKTChart();
}

function buildFeatureImportance() {
  const container = document.getElementById('feature-importance-chart');
  if (!container) return;
  const features = APP_DATA.explainability.features;
  container.innerHTML = features.map(f => {
    const color = f.negative ? COLOURS.red : COLOURS.emerald;
    const barClass = f.negative ? 'fill-red' : 'fill-green';
    return `
      <div class="feature-bar-row">
        <div class="feature-name">${f.name}</div>
        <div class="feature-bar-wrap">
          <div class="progress-bar-fill ${barClass} feature-bar-fill" style="width:0%" data-width="${f.impact}"></div>
        </div>
        <div class="feature-impact" style="color:${color}">${f.impact}%</div>
      </div>`;
  }).join('');

  // Animate bars after render
  setTimeout(() => {
    container.querySelectorAll('.feature-bar-fill').forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 150);
}

function initKTChart() {
  const ctx = document.getElementById('kt-chart');
  if (!ctx) return;
  const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];
  if (CHARTS.kt) CHARTS.kt.destroy();
  CHARTS.kt = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        { label: 'Algebra',     data:[70,72,74,78,80,82,83,85], borderColor: COLOURS.emerald,  borderWidth:2, pointRadius:3, tension:0.4, fill:false },
        { label: 'Derivatives', data:[18,20,22,24,26,28,30,30], borderColor: COLOURS.orange,   borderWidth:2, pointRadius:3, tension:0.4, fill:false },
        { label: 'Integration', data:[8, 10,11,12,13,14,15,15], borderColor: COLOURS.red,      borderWidth:2, pointRadius:3, tension:0.4, fill:false },
        { label: 'Statistics',  data:[60,62,65,68,70,73,76,78], borderColor: COLOURS.cyan,     borderWidth:2, pointRadius:3, tension:0.4, fill:false },
        { label: 'Limits',      data:[30,32,34,36,38,40,43,45], borderColor: COLOURS.purpleL,  borderWidth:2, pointRadius:3, tension:0.4, fill:false },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          min: 0, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' },
        },
      },
      plugins: { legend: { display: true, position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } } },
      animation: { duration: 1000 },
    },
  });
}

// ── TEACHER DASHBOARD ──────────────────────────────────────────
function initTeacher() {
  const grid = document.getElementById('student-cards-grid');
  if (!grid) return;

  const colors = [
    '#7c3aed','#06b6d4','#ef4444','#10b981',
    '#f59e0b','#a78bfa','#f97316','#06b6d4',
  ];

  grid.innerHTML = APP_DATA.students.map((s, i) => {
    const initials = s.name.split(' ').map(n=>n[0]).join('');
    const masteryColor = s.mastery >= 75 ? COLOURS.emerald : s.mastery >= 55 ? COLOURS.amber : COLOURS.red;
    const failColor = s.fail >= 50 ? COLOURS.red : s.fail >= 30 ? COLOURS.amber : COLOURS.emerald;
    const trendIcon = s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '→';
    const trendClass = `trend-${s.trend}`;

    return `
      <div class="student-card">
        <div class="card-top">
          <div class="s-avatar" style="background:${colors[i % colors.length]}44;border:2px solid ${colors[i%colors.length]}66;color:${colors[i%colors.length]}">${initials}</div>
          <div>
            <div class="s-name">${s.name}</div>
            <div class="s-grade">Grade ${s.grade}</div>
          </div>
          ${s.alerts > 0 ? `<div class="s-alerts">${s.alerts}</div>` : ''}
        </div>

        <div class="s-mastery-row">
          <span class="s-mastery-label">Overall Mastery</span>
          <span class="s-mastery-val" style="color:${masteryColor}">${s.mastery}%</span>
        </div>
        <div class="progress-bar-wrap mb-4" style="margin-bottom:14px">
          <div class="progress-bar-fill" style="width:${s.mastery}%;background:${masteryColor}44;border-right:2px solid ${masteryColor}"></div>
        </div>

        <div class="s-metrics">
          <div class="s-metric">
            <div class="m-label">Fail Risk</div>
            <div class="m-val" style="color:${failColor}">${s.fail}%</div>
          </div>
          <div class="s-metric">
            <div class="m-label">Burnout</div>
            <div class="m-val" style="color:${s.burnout>=50?COLOURS.red:COLOURS.amber}">${s.burnout}%</div>
          </div>
          <div class="s-metric">
            <div class="m-label">Trend</div>
            <div class="m-val ${trendClass}">${trendIcon}</div>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── NAV BINDING ────────────────────────────────────────────────
function bindNav() {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => switchView(el.dataset.view));
  });
}

// ── LIVE TWIN PULSE ────────────────────────────────────────────
// Simulate the twin updating live every ~5 seconds
function startTwinPulse() {
  let twinTick = 0;
  setInterval(() => {
    twinTick++;
    // Tiny random walk on mastery values for realism
    APP_DATA.knowledgeNodes.forEach(n => {
      n.mastery = Math.max(0.05, Math.min(0.99, n.mastery + (Math.random()-0.5) * 0.005));
    });
  }, 5000);
}

// ── BOOTSTRAP ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  bindNav();
  initDashboard();
  startTwinPulse();

  // Kick off gauge animation once predictions view is rendered
  // (will animate when user visits that view)
});

// Expose loadScenario and sendSuggestion globally for inline onclick
window.loadScenario = loadScenario;
window.sendSuggestion = sendSuggestion;
window.selectOption = selectOption;
