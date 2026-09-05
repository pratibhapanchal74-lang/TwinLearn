// ============================================================
// DIGITAL TWIN LEARNING PLATFORM — SYNTHETIC DATA ENGINE
// ============================================================

const APP_DATA = {

  // ── Student Profile ──────────────────────────────────────
  student: {
    name: "Arjun Sharma",
    initials: "AS",
    grade: "Grade 11",
    school: "Delhi Public School",
    subjects: ["Mathematics", "Physics", "Computer Science"],
    overallMastery: 67,
    streak: 12,
    focusScore: 74,
    learningHoursToday: 2.5,
    totalLearningHours: 284,
    lastActive: "2 hours ago",
    joinDate: "September 2024",
    twinVersion: "v3.14",
    twinAccuracy: "91.2%"
  },

  // ── Knowledge Graph ───────────────────────────────────────
  knowledgeNodes: [
    { id: 1,  name: "Algebra",        mastery: 0.85, category: "Foundation", status: "mastered"   },
    { id: 2,  name: "Functions",      mastery: 0.72, category: "Foundation", status: "good"       },
    { id: 3,  name: "Trigonometry",   mastery: 0.55, category: "Applied",    status: "average"    },
    { id: 4,  name: "Limits",         mastery: 0.45, category: "Calculus",   status: "struggling" },
    { id: 5,  name: "Derivatives",    mastery: 0.30, category: "Calculus",   status: "weak"       },
    { id: 6,  name: "Integration",    mastery: 0.15, category: "Calculus",   status: "at-risk"    },
    { id: 7,  name: "Statistics",     mastery: 0.78, category: "Data",       status: "good"       },
    { id: 8,  name: "Probability",    mastery: 0.65, category: "Data",       status: "average"    },
    { id: 9,  name: "Matrices",       mastery: 0.60, category: "Linear",     status: "average"    },
    { id: 10, name: "Vectors",        mastery: 0.50, category: "Linear",     status: "average"    },
    { id: 11, name: "Complex Nos.",   mastery: 0.40, category: "Advanced",   status: "struggling" },
    { id: 12, name: "Diff. Eqs.",     mastery: 0.10, category: "Calculus",   status: "at-risk"    },
  ],

  knowledgeEdges: [
    { from: 1, to: 2 },  { from: 1, to: 7 },
    { from: 2, to: 3 },  { from: 2, to: 9 },
    { from: 3, to: 4 },  { from: 4, to: 5 },
    { from: 5, to: 6 },  { from: 6, to: 12 },
    { from: 7, to: 8 },  { from: 9, to: 10 },
    { from: 9, to: 11 }, { from: 5, to: 10 },
  ],

  // ── Cognitive Profile ─────────────────────────────────────
  cognitiveProfile: {
    labels: ["Attention", "Confidence", "Speed", "Retention", "Motivation", "Problem Solving"],
    current: [72, 58, 65, 70, 80, 63],
    previous: [68, 55, 62, 65, 75, 60],
    ideal:    [85, 85, 80, 85, 85, 85]
  },

  // ── Forgetting Curve ──────────────────────────────────────
  forgettingCurve: {
    labels: ["Day 0", "Day 1", "Day 2", "Day 3", "Day 5", "Day 7", "Day 14", "Day 21", "Day 30"],
    withoutReview: [100, 58, 44, 36, 28, 22, 16, 13, 10],
    withReview:    [100, 92, 88, 91, 88, 87, 85, 84, 86],
    arjun:         [100, 63, 52, 46, 40, 35, 30, 25, null]
  },

  // ── Performance Predictions ───────────────────────────────
  predictions: {
    labels: ["Week -2", "Week -1", "Now", "Week +1", "Week +2", "Week +3", "Week +4"],
    actual:              [74, 71, 68, null, null, null, null],
    withoutIntervention: [null, null, 68, 62, 55, 48, 42],
    withIntervention:    [null, null, 68, 71, 74, 77, 80],
  },

  // ── Risk Metrics ──────────────────────────────────────────
  risks: {
    failure:     { value: 34, trend: "+5%", up: true,  label: "Exam Failure Risk",    description: "Probability of failing next scheduled exam" },
    dropout:     { value: 18, trend: "-2%", up: false, label: "Dropout Risk",         description: "30-day disengagement probability" },
    burnout:     { value: 45, trend: "+8%", up: true,  label: "Cognitive Burnout",    description: "Mental overload & fatigue index" },
    frustration: { value: 38, trend: "+3%", up: true,  label: "Frustration Index",    description: "Conceptual confusion & struggle score" },
  },

  // ── Concept Warnings ──────────────────────────────────────
  conceptWarnings: [
    { concept: "Integration",          subject: "Math",    risk: "critical", score: 87, timeframe: "< 1 week",  issue: "Derivatives only 30% mastered",        action: "Review Derivatives urgently" },
    { concept: "Derivatives",          subject: "Math",    risk: "high",     score: 70, timeframe: "Current",   issue: "Limits foundation weak (45%)",         action: "Reinforce Limits concept" },
    { concept: "Diff. Equations",      subject: "Math",    risk: "high",     score: 65, timeframe: "3 weeks",   issue: "Integration at 15% — prerequisite gap", action: "Block: cannot proceed yet" },
    { concept: "Complex Numbers",      subject: "Math",    risk: "medium",   score: 48, timeframe: "2 weeks",   issue: "Practice needed despite good Algebra",  action: "Schedule 20 min/day" },
    { concept: "Vectors",              subject: "Physics", risk: "medium",   score: 42, timeframe: "2 weeks",   issue: "Matrices cross-topic dependency",       action: "Cross-topic reinforcement" },
  ],

  // ── Study Plan ────────────────────────────────────────────
  studyPlan: {
    streak: 12, dailyGoal: 90, todayDone: 55,
    schedule: {
      Mon: [
        { time: "4:00 PM", dur: 30, topic: "Limits",        type: "review",    priority: "high",     subject: "Math" },
        { time: "5:00 PM", dur: 20, topic: "Derivatives",   type: "practice",  priority: "high",     subject: "Math" },
        { time: "6:00 PM", dur: 25, topic: "Waves",         type: "new",       priority: "medium",   subject: "Physics" },
      ],
      Tue: [
        { time: "4:00 PM", dur: 40, topic: "Derivatives",   type: "deep-dive", priority: "critical", subject: "Math" },
        { time: "5:30 PM", dur: 20, topic: "Probability",   type: "review",    priority: "low",      subject: "Math" },
      ],
      Wed: [
        { time: "4:00 PM", dur: 30, topic: "Integration",   type: "new",       priority: "critical", subject: "Math" },
        { time: "5:00 PM", dur: 25, topic: "Matrices",      type: "practice",  priority: "medium",   subject: "Math" },
        { time: "6:00 PM", dur: 20, topic: "Python Arrays", type: "practice",  priority: "medium",   subject: "CS" },
      ],
      Thu: [
        { time: "4:00 PM", dur: 45, topic: "Integration",   type: "practice",  priority: "critical", subject: "Math" },
        { time: "5:30 PM", dur: 20, topic: "Trigonometry",  type: "review",    priority: "medium",   subject: "Math" },
      ],
      Fri: [
        { time: "4:00 PM", dur: 30, topic: "Complex Nos.",  type: "new",       priority: "medium",   subject: "Math" },
        { time: "5:00 PM", dur: 25, topic: "Vectors",       type: "new",       priority: "medium",   subject: "Physics" },
      ],
      Sat: [
        { time: "10:00 AM", dur: 60, topic: "Mock Test – Calculus", type: "assessment", priority: "critical", subject: "Math" },
        { time: "12:00 PM", dur: 30, topic: "Review Mistakes",       type: "review",     priority: "high",     subject: "Math" },
      ],
      Sun: [
        { time: "10:00 AM", dur: 30, topic: "Weak Concept Sprint", type: "review",   priority: "high", subject: "Math" },
        { time: "11:00 AM", dur: 20, topic: "CS Projects",         type: "practice", priority: "low",  subject: "CS" },
      ],
    }
  },

  // ── Quiz Questions ────────────────────────────────────────
  quizQuestions: [
    { id:1, topic:"Derivatives",  difficulty:"easy",   q:"What is the derivative of x²?",                                  opts:["x","2x","2x²","x²"],          ans:1, exp:"Power rule: d/dx(xⁿ)=n·xⁿ⁻¹, so d/dx(x²)=2x." },
    { id:2, topic:"Limits",       difficulty:"medium", q:"What is lim(x→0) [sin(x)/x]?",                                    opts:["0","∞","1","undefined"],       ans:2, exp:"A fundamental limit — lim(x→0)[sin x/x]=1, proven by squeeze theorem." },
    { id:3, topic:"Integration",  difficulty:"medium", q:"What is ∫2x dx?",                                                  opts:["x²+C","2x²+C","x+C","2+C"],   ans:0, exp:"Power rule for integrals: ∫xⁿdx=xⁿ⁺¹/(n+1)+C → ∫2x dx=x²+C." },
    { id:4, topic:"Trigonometry", difficulty:"easy",   q:"What is sin(90°)?",                                                opts:["0","0.5","√2/2","1"],          ans:3, exp:"sin(90°)=1; the sine function peaks at 90°." },
    { id:5, topic:"Derivatives",  difficulty:"hard",   q:"What is the derivative of ln(x²)?",                               opts:["1/x²","2/x","2x","1/(2x)"],   ans:1, exp:"ln(x²)=2ln(x), so derivative=2/x. Or use chain rule: (1/x²)·2x=2/x." },
    { id:6, topic:"Matrices",     difficulty:"medium", q:"If A is 2×3 and B is 3×4, what is the order of AB?",              opts:["3×3","2×4","4×2","Can't multiply"], ans:1, exp:"A(m×n)·B(n×p)=C(m×p), so 2×3 · 3×4 = 2×4." },
    { id:7, topic:"Probability",  difficulty:"easy",   q:"If P(A)=0.3, what is P(not A)?",                                  opts:["0.3","0.6","0.7","1.3"],       ans:2, exp:"Complement rule: P(not A)=1−P(A)=0.7." },
    { id:8, topic:"Limits",       difficulty:"hard",   q:"What is lim(x→∞) [1 + 1/x]^x?",                                  opts:["1","∞","e","0"],               ans:2, exp:"This defines Euler's number: lim(x→∞)[1+1/x]^x = e ≈ 2.718." },
    { id:9, topic:"Derivatives",  difficulty:"medium", q:"What is the derivative of sin(x)?",                               opts:["cos(x)","-cos(x)","-sin(x)","tan(x)"], ans:0, exp:"d/dx[sin(x)]=cos(x). A fundamental trigonometric derivative." },
    { id:10,topic:"Integration",  difficulty:"hard",   q:"What is ∫(1/x) dx?",                                              opts:["x²+C","ln|x|+C","1/x²+C","e^x+C"], ans:1, exp:"∫(1/x)dx=ln|x|+C. Special case of power rule (n=−1 is undefined, use ln instead)." },
  ],

  // ── AI Tutor ──────────────────────────────────────────────
  tutorSuggestions: [
    "Explain integration to me",
    "Why is my calculus score dropping?",
    "Help me with derivatives",
    "What should I study today?",
    "How do I improve my retention?",
    "Create a study plan for me"
  ],

  // ── Explainability ────────────────────────────────────────
  explainability: {
    features: [
      { name: "Derivatives Mastery (30%)",         impact: 35, negative: true  },
      { name: "Integration Mastery (15%)",          impact: 28, negative: true  },
      { name: "Limits Mastery (45%)",               impact: 18, negative: true  },
      { name: "Study Streak (12 days)",             impact: 12, negative: false },
      { name: "Avg. Session Duration (42 min)",     impact:  7, negative: false },
    ],
    narrative: "The primary driver of Arjun's 34% failure risk is a cascade of unresolved Calculus prerequisites. Derivatives and Integration are the most critical gaps. However, a strong 12-day streak and excellent Algebra foundation are protective factors that the model weighs positively.",
    modelInfo: { name: "Knowledge Tracing + GradBoost Ensemble", accuracy: "87.3%", data: "2,847 students × 18 months", updated: "2 minutes ago" }
  },

  // ── Teacher Dashboard Students ────────────────────────────
  students: [
    { name:"Arjun Sharma",  grade:"11A", mastery:67, fail:34, dropout:18, burnout:45, trend:"down",   alerts:3 },
    { name:"Priya Verma",   grade:"11A", mastery:82, fail:12, dropout: 5, burnout:20, trend:"up",     alerts:0 },
    { name:"Rahul Gupta",   grade:"11A", mastery:54, fail:56, dropout:42, burnout:67, trend:"down",   alerts:5 },
    { name:"Sneha Patel",   grade:"11A", mastery:75, fail:22, dropout:10, burnout:35, trend:"stable", alerts:1 },
    { name:"Amit Kumar",    grade:"11A", mastery:61, fail:41, dropout:25, burnout:52, trend:"down",   alerts:2 },
    { name:"Kavya Singh",   grade:"11A", mastery:88, fail: 8, dropout: 3, burnout:15, trend:"up",     alerts:0 },
    { name:"Dev Malhotra",  grade:"11A", mastery:45, fail:68, dropout:55, burnout:78, trend:"down",   alerts:7 },
    { name:"Nisha Reddy",   grade:"11A", mastery:79, fail:18, dropout: 8, burnout:28, trend:"stable", alerts:1 },
  ],

  // ── Tutor conversation responses ──────────────────────────
  tutorResponses: [
    {
      pattern: /integrat/i,
      reply: `📊 <strong>Integration</strong> is the reverse of differentiation!<br><br>
<strong>Key idea:</strong> If d/dx(x²) = 2x, then ∫2x dx = x² + C.<br><br>
<strong>Your twin shows:</strong> You're at 15% mastery — but Derivatives (30%) must come first.<br><br>
<strong>Recommended path:</strong><br>
1. ✅ Reinforce <strong>Limits</strong> → 60%+<br>
2. 📈 Build <strong>Derivatives</strong> → 60%+<br>
3. 🎯 Then tackle <strong>Integration</strong><br><br>
Want a quick Limits quiz right now?`
    },
    {
      pattern: /deriv/i,
      reply: `🔥 <strong>Derivatives</strong> — the backbone of Calculus!<br><br>
<strong>Power Rule:</strong> d/dx(xⁿ) = n·xⁿ⁻¹<br>
<em>Example:</em> d/dx(x³) = 3x²<br><br>
<strong>Chain Rule:</strong> d/dx[f(g(x))] = f'(g(x))·g'(x)<br>
<em>Example:</em> d/dx[sin(x²)] = cos(x²)·2x<br><br>
📈 <strong>Prediction:</strong> With 20 min/day practice, your mastery rises from 30% → 55% in 1 week.<br><br>
Shall I generate a practice set?`
    },
    {
      pattern: /drop|score|fall|declin/i,
      reply: `📉 Your twin flagged this too. Here's the root cause:<br><br>
<strong>Cascade Effect:</strong><br>
Limits (45%) → Derivatives (30%) → Integration (15%)<br>
Each weak link weakens the next topic.<br><br>
<strong>Prediction without intervention:</strong> 68% → 42% in 4 weeks.<br>
<strong>With AI-recommended path:</strong> Recovery to 77% in 3 weeks.<br><br>
🎯 <strong>Immediate action:</strong> Pause Integration. Spend 3 focused sessions on Limits. This will unlock Derivatives naturally.`
    },
    {
      pattern: /study|plan|today|schedule/i,
      reply: `📅 Today's optimal plan (based on your twin profile):<br><br>
1. 🔴 <strong>Limits</strong> — 30 min (critical gap)<br>
2. 🟠 <strong>Derivatives</strong> — 20 min (foundation)<br>
3. 🟡 <strong>Probability</strong> — 15 min (maintenance review)<br><br>
<strong>Why this order?</strong> Your focus peaks at start, so hard topics go first. Your retention curve shows you forget Limits fastest — daily review essential.<br><br>
🧠 Your twin shows you learn best with <strong>visual explanations + practice problems</strong>.`
    },
    {
      pattern: /retent|forget|remember/i,
      reply: `🧠 Your twin tracks your personal <strong>forgetting curve</strong>!<br><br>
<strong>Your retention pattern:</strong><br>
• After 1 day: ~63% (avg: 58%) — slightly above average!<br>
• After 7 days: ~35%<br>
• After 30 days: ~25% without review<br><br>
<strong>Spaced Repetition (personalized):</strong><br>
Review after: 1 day → 3 days → 7 days → 14 days → 30 days<br><br>
✅ 3-5 practice problems after each session boosts retention by 40%!`
    },
    {
      pattern: /plan/i,
      reply: `📋 Your AI-generated 7-day study plan is ready in the <strong>Study Planner</strong> tab!<br><br>
<strong>Key highlights:</strong><br>
• 🔴 Daily Limits reinforcement (30 min)<br>
• 🟠 Derivatives deep-dive Tuesday + Thursday<br>
• 🎯 Saturday mock test — Calculus focus<br>
• Total: ~90 min/day (optimized for your attention span)<br><br>
Based on this plan, predicted score at next exam: <strong>76%</strong> ⬆️`
    },
    {
      pattern: /.*/,
      reply: `👋 Hi Arjun! I have full access to your Digital Twin.<br><br>
<strong>Current focus areas:</strong><br>
• 🔴 Integration (15%) — urgent<br>
• 🟠 Derivatives (30%) — foundational gap<br>
• 🟡 Limits (45%) — building block<br><br>
<strong>Ask me about:</strong><br>
• Specific topics (integration, derivatives...)<br>
• Why your score is dropping<br>
• What to study today<br>
• How to improve retention<br><br>
I'm here to help you succeed! 💪`
    }
  ]
};
