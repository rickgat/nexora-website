/* ============================================
   NEXORA APP — Router & Module Renderers
   Enterprise Project & Product Management
   ============================================ */
;(function () {
  "use strict";
  const D = APP_DATA;
  const SESSION_KEY = "nexora_session";

  // ---- Auth ----
  const isLoggedIn = () => !!localStorage.getItem(SESSION_KEY);
  const login = (e) => localStorage.setItem(SESSION_KEY, JSON.stringify({ email: e, ts: Date.now() }));
  const logout = () => { localStorage.removeItem(SESSION_KEY); showLogin(); };
  function showLogin() { document.getElementById("loginScreen").style.display = ""; document.getElementById("appShell").style.display = "none"; location.hash = "login"; }
  function showApp() { document.getElementById("loginScreen").style.display = "none"; document.getElementById("appShell").style.display = ""; document.getElementById("headerAvatar").textContent = D.user.initials; updateNotifDot(); }

  // ---- Helpers ----
  const avatar = (i, s = "") => `<div class="avatar${s ? ` avatar--${s}` : ""}">${i}</div>`;
  const pDot = (p) => `<span class="priority-dot priority-dot--${p}"></span>`;
  const statusBadge = (s) => `<span class="status-badge status-badge--${s}">${s}</span>`;

  // ---- Router ----
  const ROUTES = {
    dashboard:  { title: "Dashboard",         render: renderDashboard },
    projects:   { title: "Projects",           render: renderProjects },
    kanban:     { title: "Kanban Board",        render: renderKanban },
    risks:      { title: "Risks",              render: renderRisks },
    delivery:   { title: "Delivery Metrics",    render: renderDelivery },
    warnings:   { title: "Early Warnings",      render: renderWarnings },
    priority:   { title: "Priority Matrix",     render: renderPriority },
    okr:        { title: "OKR",                render: renderOKR },
    roadmap:    { title: "Roadmap",            render: renderRoadmap },
    team:       { title: "Team Members",        render: renderTeam },
    ai:         { title: "AI Assistant",        render: renderAI },
    settings:   { title: "Settings",           render: renderSettings },
  };

  function navigate() {
    const hash = location.hash.replace("#", "") || "dashboard";
    if (hash === "login" || !isLoggedIn()) { showLogin(); return; }
    showApp();
    const route = ROUTES[hash];
    if (!route) { location.hash = "dashboard"; return; }
    document.querySelectorAll(".sidebar__link").forEach(l => l.classList.toggle("active", l.dataset.page === hash));
    const c = document.getElementById("appContent");
    c.style.animation = "none"; c.offsetHeight; c.style.animation = "";
    c.innerHTML = route.render();
    if (hash === "kanban") initKanbanDrag();
    if (hash === "dashboard") animateKPIs();
    if (hash === "settings") initToggles();
    if (hash === "ai") initAIChat();
  }

  // ============================================
  // DASHBOARD
  // ============================================
  function renderDashboard() {
    const maxTask = Math.max(...D.tasksByProject.map(t => t.done + t.active));
    const total = D.projectStatus.reduce((s, d) => s + d.value, 0);
    return `
      <div class="page-header"><div><h1 class="page-title">Dashboard</h1><p class="page-subtitle">Project overview and key metrics</p></div></div>

      <div class="kpi-grid">${D.kpis.map(k => `
        <div class="card kpi-card">
          <div class="kpi-card__header">
            <div class="kpi-card__label">${k.label}</div>
            <span class="kpi-card__change kpi-card__change--${k.trend >= 0 ? 'up' : 'down'}">${k.trend >= 0 ? '+' : ''}${k.trend}%</span>
          </div>
          <div class="kpi-card__value" data-target="${k.value}">0${k.unit || ''}</div>
        </div>`).join('')}
      </div>

      <div class="summary-strip">${D.summaryStrip.map(s => `<div class="summary-strip__item"><div class="summary-strip__value">${s.value}</div><div class="summary-strip__label">${s.label}</div></div>`).join('')}</div>

      <div class="grid-3">
        <div class="card">
          <div class="card__title">Task Completion by Project</div>
          <div class="stacked-bar-chart">${D.tasksByProject.map(t => `
            <div class="stacked-bar-row">
              <div class="stacked-bar-row__label">${t.name}</div>
              <div class="stacked-bar-row__track">
                <div class="stacked-bar-row__fill stacked-bar-row__fill--done" style="width:${(t.done / maxTask) * 100}%">${t.done}</div>
                <div class="stacked-bar-row__fill stacked-bar-row__fill--active" style="width:${(t.active / maxTask) * 100}%">${t.active}</div>
              </div>
            </div>`).join('')}
            <div class="stacked-bar-legend"><span><span class="dot" style="background:#10b981"></span> Done</span><span><span class="dot" style="background:#6366f1"></span> Active</span></div>
          </div>
        </div>
        <div class="card">
          <div class="card__title">Project Status</div>
          ${renderDonut(D.projectStatus, total)}
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card__title">Team Workload</div>
          <div class="workload-bars">${D.teamWorkload.map(t => {
            const cls = t.load > 90 ? 'danger' : t.load > 75 ? 'warn' : '';
            return `<div class="resource-bar"><div class="resource-bar__label">${t.name}</div><div class="resource-bar__track"><div class="resource-bar__fill${cls ? ` resource-bar__fill--${cls}` : ''}" style="width:${t.load}%"></div></div><div class="resource-bar__value">${t.load}%</div></div>`;
          }).join('')}</div>
        </div>
        <div class="card">
          <div class="card__title">Upcoming Deadlines</div>
          <div class="deadline-list">${D.upcomingDeadlines.map(d => `
            <div class="deadline-item">
              <div class="deadline-item__dot" style="background:${d.color}"></div>
              <div class="deadline-item__content">
                <div class="deadline-item__task">${d.task}</div>
                <div class="deadline-item__project">${d.project}</div>
              </div>
              <div class="deadline-item__days" style="color:${d.color}">${d.days}d</div>
            </div>`).join('')}
          </div>
          ${D.overdueItems.length ? `<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
            <div style="font-size:0.75rem;font-weight:700;color:var(--red);margin-bottom:8px">OVERDUE</div>
            ${D.overdueItems.map(o => `<div class="deadline-item"><div class="deadline-item__dot" style="background:var(--red)"></div><div class="deadline-item__content"><div class="deadline-item__task">${o.task}</div><div class="deadline-item__project">${o.project} — ${o.assignee}</div></div><div class="deadline-item__days" style="color:var(--red)">-${o.days}d</div></div>`).join('')}
          </div>` : ''}
        </div>
      </div>

      <div class="card">
        <div class="card__title">Recent Activity</div>
        <div class="activity-list">${D.activity.map(a => `
          <div class="activity-item">${avatar(a.user, 'xs')}<div><div class="activity-item__text"><strong>${a.user}</strong> ${a.action} <strong>${a.target}</strong></div><div class="activity-item__time">${a.time}</div></div></div>`).join('')}
        </div>
      </div>`;
  }

  function renderDonut(data, total) {
    const r = 60, c = 2 * Math.PI * r; let off = 0;
    const segs = data.map(d => { const pct = d.value / total, dash = pct * c; const s = `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${d.color}" stroke-width="14" stroke-dasharray="${dash} ${c - dash}" stroke-dashoffset="${-off}"/>`; off += dash; return s; });
    return `<div class="donut-chart"><svg viewBox="0 0 160 160">${segs.join('')}</svg><div class="donut-chart__center"><div class="donut-chart__center-value">${total}</div><div class="donut-chart__center-label">Total</div></div></div>
      <div class="donut-legend">${data.map(d => `<div class="donut-legend__item"><span class="donut-legend__dot" style="background:${d.color}"></span>${d.label} (${d.value})</div>`).join('')}</div>`;
  }

  function animateKPIs() {
    document.querySelectorAll(".kpi-card__value").forEach(el => {
      const target = parseFloat(el.dataset.target), suffix = el.textContent.match(/[^0-9.]*$/)[0];
      const isFloat = String(el.dataset.target).includes('.'), dur = 1200, start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - p, 3), v = target * ease;
        el.textContent = (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  // ============================================
  // PROJECTS
  // ============================================
  function renderProjects() {
    return `
      <div class="page-header"><div><h1 class="page-title">Projects</h1><p class="page-subtitle">${D.projects.length} projects across all departments</p></div><button class="btn-app btn-app--primary">+ New Project</button></div>
      <div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto">
        <table class="portfolio-table">
          <thead><tr><th>Project</th><th>PM</th><th>Status</th><th>Priority</th><th>Progress</th><th>Budget</th><th>Team</th></tr></thead>
          <tbody>${D.projects.map(p => {
            const budgetPct = Math.round((p.budget.spent / p.budget.total) * 100);
            return `<tr>
              <td style="font-weight:600">${p.name}<div style="font-size:0.65rem;color:var(--text-muted)">${p.id}</div></td>
              <td>${p.pm}</td>
              <td>${statusBadge(p.status)}</td>
              <td>${statusBadge(p.priority)}</td>
              <td style="min-width:130px"><div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--accent" style="width:${p.progress}%"></div></div><div style="font-size:0.65rem;color:var(--text-muted);margin-top:3px">${p.progress}%</div></td>
              <td><span style="font-size:0.8rem">$${p.budget.spent}K</span><span style="color:var(--text-muted);font-size:0.75rem"> / $${p.budget.total}K</span></td>
              <td style="text-align:center">${p.team}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div></div>`;
  }

  // ============================================
  // KANBAN
  // ============================================
  function renderKanban() {
    const cols = [
      { key: "backlog", label: "Backlog", color: "#64748b" },
      { key: "active", label: "Active", color: "#6366f1" },
      { key: "review", label: "Review", color: "#f59e0b" },
      { key: "done", label: "Done", color: "#10b981" },
    ];
    return `
      <div class="page-header"><div><h1 class="page-title">Kanban Board</h1><p class="page-subtitle">Drag tasks between columns to update status</p></div><button class="btn-app btn-app--primary">+ New Task</button></div>
      <div class="kanban">${cols.map(col => {
        const tasks = D.kanban[col.key] || [];
        return `<div class="kanban__col">
          <div class="kanban__col-header"><div class="kanban__col-title"><span class="kanban__col-dot" style="background:${col.color}"></span>${col.label}</div><span class="kanban__col-count">${tasks.length}</span></div>
          <div class="kanban__cards" data-col="${col.key}">${tasks.map(t => `
            <div class="kanban-card${t.overdue ? ' kanban-card--overdue' : ''}" draggable="true" data-id="${t.id}">
              <div class="kanban-card__id">${t.id}${t.overdue ? ' <span class="overdue-badge">OVERDUE</span>' : ''}</div>
              <div class="kanban-card__title">${t.title}</div>
              <div class="kanban-card__meta">${t.project}</div>
              <div class="kanban-card__footer"><span class="kanban-card__due">${t.dueDate}</span><div style="display:flex;align-items:center;gap:6px">${pDot(t.priority)}${avatar(t.assignee, 'xs')}</div></div>
            </div>`).join('')}
          </div>
        </div>`;
      }).join('')}</div>`;
  }

  function initKanbanDrag() {
    document.querySelectorAll(".kanban-card").forEach(card => {
      card.addEventListener("dragstart", e => { card.classList.add("dragging"); e.dataTransfer.setData("text/plain", card.dataset.id); });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
    });
    document.querySelectorAll(".kanban__cards").forEach(col => {
      col.addEventListener("dragover", e => { e.preventDefault(); col.classList.add("drag-over"); });
      col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
      col.addEventListener("drop", e => {
        e.preventDefault(); col.classList.remove("drag-over");
        const d = document.querySelector(".kanban-card.dragging"); if (d) col.appendChild(d);
        document.querySelectorAll(".kanban__col").forEach(c => { c.querySelector(".kanban__col-count").textContent = c.querySelectorAll(".kanban-card").length; });
      });
    });
  }

  // ============================================
  // RISKS
  // ============================================
  function renderRisks() {
    return `
      <div class="page-header"><div><h1 class="page-title">Risk Register</h1><p class="page-subtitle">${D.risks.length} identified risks across projects</p></div><button class="btn-app btn-app--primary">+ Log Risk</button></div>
      <div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto">
        <table class="portfolio-table">
          <thead><tr><th>ID</th><th>Risk</th><th>Project</th><th>Prob.</th><th>Impact</th><th>RPN</th><th>Status</th><th>Mitigation</th></tr></thead>
          <tbody>${D.risks.map(r => `<tr>
            <td style="font-weight:600;color:var(--text-muted)">${r.id}</td>
            <td style="font-weight:600">${r.title}</td>
            <td>${r.project}</td>
            <td><span class="risk-badge risk-badge--${r.probability}">${r.probability}</span></td>
            <td><span class="risk-badge risk-badge--${r.impact}">${r.impact}</span></td>
            <td style="font-weight:700;font-family:var(--font-display)">${r.rpn}</td>
            <td>${statusBadge(r.status)}</td>
            <td style="font-size:0.8rem;color:var(--text-secondary);max-width:200px">${r.mitigation}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div></div>`;
  }

  // ============================================
  // DELIVERY METRICS (PMO)
  // ============================================
  function renderDelivery() {
    const m = D.deliveryMetrics;
    return `
      <div class="page-header"><div><h1 class="page-title">Delivery Metrics</h1><p class="page-subtitle">Project delivery performance and velocity tracking</p></div></div>
      <div class="kpi-grid">
        <div class="card kpi-card"><div class="kpi-card__label">On-Time Delivery</div><div class="kpi-card__value" style="color:${m.onTimeRate >= 80 ? 'var(--green)' : 'var(--yellow)'}">${m.onTimeRate}%</div></div>
        <div class="card kpi-card"><div class="kpi-card__label">Cost Performance (CPI)</div><div class="kpi-card__value" style="color:${m.cpi >= 1 ? 'var(--green)' : 'var(--red)'}">${m.cpi}</div></div>
        <div class="card kpi-card"><div class="kpi-card__label">Schedule Performance (SPI)</div><div class="kpi-card__value" style="color:${m.spi >= 1 ? 'var(--green)' : 'var(--yellow)'}">${m.spi}</div></div>
        <div class="card kpi-card"><div class="kpi-card__label">Avg Velocity (pts/sprint)</div><div class="kpi-card__value">${m.velocity}</div></div>
      </div>
      <div class="card"><div class="card__title">Per-Project Delivery</div>
        <table class="portfolio-table">
          <thead><tr><th>Project</th><th>On-Time Rate</th><th>Velocity</th><th>Trend</th><th>Performance</th></tr></thead>
          <tbody>${m.perProject.map(p => `<tr>
            <td style="font-weight:600">${p.name}</td>
            <td style="font-weight:600">${p.onTime}%</td>
            <td>${p.velocity} pts</td>
            <td><span style="color:${p.trend === 'up' ? 'var(--green)' : p.trend === 'down' ? 'var(--red)' : 'var(--text-muted)'}">${p.trend === 'up' ? '↑' : p.trend === 'down' ? '↓' : '→'} ${p.trend}</span></td>
            <td style="min-width:120px"><div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--${p.onTime >= 85 ? 'green' : p.onTime >= 70 ? 'accent' : 'yellow'}" style="width:${p.onTime}%"></div></div></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  // ============================================
  // EARLY WARNINGS (PMO)
  // ============================================
  function renderWarnings() {
    return `
      <div class="page-header"><div><h1 class="page-title">Early Warnings</h1><p class="page-subtitle">AI-powered 5-detector early warning engine</p></div></div>
      <div class="insight-cards">${D.earlyWarnings.map(w => `
        <div class="card insight-card insight-card--${w.severity === 'high' ? 'danger' : w.severity === 'medium' ? 'warning' : 'info'}">
          <div class="insight-card__type">${w.detector}</div>
          <div class="insight-card__title">${w.project}</div>
          <div class="insight-card__desc">${w.message}</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <a href="#" class="insight-card__action">Investigate</a>
            <span style="font-size:0.65rem;color:var(--text-muted)">Detected ${w.detected}</span>
          </div>
        </div>`).join('')}
      </div>`;
  }

  // ============================================
  // PRIORITY MATRIX (PMO)
  // ============================================
  function renderPriority() {
    const quads = { 'quick-win': { label: 'Quick Wins', desc: 'High Impact, Low Effort', color: '#10b981' }, strategic: { label: 'Strategic', desc: 'High Impact, High Effort', color: '#6366f1' }, review: { label: 'Review', desc: 'Low Impact, High Effort', color: '#f59e0b' }, deprioritize: { label: 'Deprioritize', desc: 'Low Impact, Low Effort', color: '#ef4444' } };
    return `
      <div class="page-header"><div><h1 class="page-title">Priority Matrix</h1><p class="page-subtitle">Impact vs Effort analysis — prioritize what matters</p></div></div>
      <div class="grid-2">${Object.entries(quads).map(([key, q]) => {
        const items = D.priorityMatrix.filter(p => p.quadrant === key);
        return `<div class="card" style="border-left:3px solid ${q.color}">
          <div class="card__title">${q.label} <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400">${q.desc}</span></div>
          ${items.length ? items.map(p => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
            <div><div style="font-weight:600;font-size:0.85rem">${p.name}</div><div style="font-size:0.7rem;color:var(--text-muted)">Impact: ${p.impact}/10 · Effort: ${p.effort}/10</div></div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;color:${q.color}">${p.value}</div>
          </div>`).join('') : '<div style="color:var(--text-muted);font-size:0.8rem;padding:16px 0">No projects in this quadrant</div>'}
        </div>`;
      }).join('')}</div>`;
  }

  // ============================================
  // OKR
  // ============================================
  function renderOKR() {
    return `
      <div class="page-header"><div><h1 class="page-title">OKR</h1><p class="page-subtitle">Objectives & Key Results — Q2 2026</p></div><button class="btn-app btn-app--primary">+ New Objective</button></div>
      ${D.okrs.map(o => `<div class="card" style="margin-bottom:18px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
          <div>
            <div style="font-family:var(--font-display);font-size:1.05rem;font-weight:700">${o.objective}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px">Owner: ${o.owner} · ${o.quarter}</div>
          </div>
          <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;color:var(--accent)">${o.progress}%</div>
        </div>
        <div class="progress-bar" style="margin-bottom:18px"><div class="progress-bar__fill progress-bar__fill--accent" style="width:${o.progress}%"></div></div>
        ${o.keyResults.map((kr, i) => `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--border)">
          <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;width:24px">KR${i + 1}</div>
          <div style="flex:1"><div style="font-size:0.85rem">${kr.title}</div></div>
          <div style="min-width:80px"><div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--${kr.status === 'on-track' ? 'green' : kr.status === 'at-risk' ? 'yellow' : 'red'}" style="width:${kr.progress}%"></div></div></div>
          <div style="font-size:0.75rem;font-weight:600;width:35px;text-align:right">${kr.progress}%</div>
          <span class="status-badge status-badge--${kr.status}">${kr.status}</span>
        </div>`).join('')}
      </div>`).join('')}`;
  }

  // ============================================
  // ROADMAP
  // ============================================
  function renderRoadmap() {
    return `
      <div class="page-header"><div><h1 class="page-title">Product Roadmap</h1><p class="page-subtitle">Quarterly feature planning — 2026</p></div></div>
      <div class="card"><div class="roadmap">${D.roadmap.map(q => {
        const cls = q.items.every(i => i.status === 'done') ? 'completed' : q.current ? 'current' : 'future';
        return `<div class="roadmap__quarter">
          <div class="roadmap__quarter-label roadmap__quarter-label--${cls}">${q.quarter}</div>
          <div class="roadmap__quarter-name">${q.label}</div>
          <div class="roadmap__items">${q.items.map(i => `<div class="roadmap__item roadmap__item--${i.status === 'done' ? 'completed' : i.status === 'active' ? 'current' : 'future'}">${i.status === 'done' ? '✓ ' : i.status === 'active' ? '● ' : '○ '}${i.name}</div>`).join('')}</div>
        </div>`;
      }).join('')}</div></div>`;
  }

  // ============================================
  // TEAM
  // ============================================
  function renderTeam() {
    return `
      <div class="page-header"><div><h1 class="page-title">Team Members</h1><p class="page-subtitle">${D.team.length} members across all departments</p></div><button class="btn-app btn-app--primary">+ Invite</button></div>
      <div class="team-grid">${D.team.map(m => {
        const wCls = m.capacity > 90 ? 'red' : m.capacity > 75 ? 'yellow' : 'accent';
        return `<div class="card team-card">
          <div class="team-card__avatar">${avatar(m.initials, 'lg')}</div>
          <div class="team-card__name"><span class="status-dot status-dot--${m.status}"></span>${m.name}</div>
          <div class="team-card__role">${m.role}</div>
          <div class="team-card__dept">${m.department}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-top:12px">${m.skills.map(s => `<span class="tag tag--skill">${s}</span>`).join('')}</div>
          <div class="team-card__stats"><div><div class="team-card__stat-value">${m.tasks}</div><div class="team-card__stat-label">Tasks</div></div><div><div class="team-card__stat-value">${m.capacity}%</div><div class="team-card__stat-label">Capacity</div></div></div>
          <div class="team-card__workload"><div class="team-card__workload-label"><span>Workload</span><span>${m.capacity}%</span></div><div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--${wCls}" style="width:${m.capacity}%"></div></div></div>
        </div>`;
      }).join('')}</div>`;
  }

  // ============================================
  // AI ASSISTANT
  // ============================================
  function renderAI() {
    return `
      <div class="page-header"><div><h1 class="page-title">AI Assistant</h1><p class="page-subtitle">Powered by Claude — ask about your projects, risks, and team</p></div></div>
      <div class="card ai-chat">
        <div class="ai-chat__messages" id="aiMessages">
          ${D.aiConversation.map(m => `<div class="ai-msg ai-msg--${m.role}">
            <div class="ai-msg__avatar">${m.role === 'user' ? D.user.initials : 'AI'}</div>
            <div class="ai-msg__bubble"><pre class="ai-msg__text">${m.content}</pre></div>
          </div>`).join('')}
        </div>
        <div class="ai-chat__input">
          <textarea id="aiInput" placeholder="Ask about your projects, risks, team workload..." rows="1"></textarea>
          <button class="btn-app btn-app--primary" id="aiSendBtn">Send</button>
        </div>
      </div>`;
  }

  function initAIChat() {
    const input = document.getElementById('aiInput');
    const btn = document.getElementById('aiSendBtn');
    const msgs = document.getElementById('aiMessages');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      msgs.innerHTML += `<div class="ai-msg ai-msg--user"><div class="ai-msg__avatar">${D.user.initials}</div><div class="ai-msg__bubble"><pre class="ai-msg__text">${text}</pre></div></div>`;
      input.value = '';
      msgs.innerHTML += `<div class="ai-msg ai-msg--assistant"><div class="ai-msg__avatar">AI</div><div class="ai-msg__bubble"><pre class="ai-msg__text">Analyzing your query...\n\nBased on current project data, I'll provide insights shortly. This is a demo — in the live environment, responses are powered by Claude AI with full access to your project context.</pre></div></div>`;
      msgs.scrollTop = msgs.scrollHeight;
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); btn.click(); } });
  }

  // ============================================
  // SETTINGS
  // ============================================
  function renderSettings() {
    return `
      <div class="page-header"><div><h1 class="page-title">Settings</h1><p class="page-subtitle">Account and preferences</p></div></div>
      <div class="card" style="margin-bottom:18px"><div class="settings-section"><div class="settings-section__title">Profile</div>
        <div class="settings-row"><div><div class="settings-row__label">Name</div><div class="settings-row__desc">${D.user.name}</div></div><button class="btn-app btn-app--ghost">Edit</button></div>
        <div class="settings-row"><div><div class="settings-row__label">Email</div><div class="settings-row__desc">${D.user.email}</div></div><button class="btn-app btn-app--ghost">Change</button></div>
        <div class="settings-row"><div><div class="settings-row__label">Role</div><div class="settings-row__desc">${D.user.role}</div></div></div>
      </div></div>
      <div class="card" style="margin-bottom:18px"><div class="settings-section"><div class="settings-section__title">Preferences</div>
        <div class="settings-row"><div><div class="settings-row__label">Dark Mode</div><div class="settings-row__desc">Use dark theme</div></div><div class="toggle active" data-setting="dark"></div></div>
        <div class="settings-row"><div><div class="settings-row__label">Email Notifications</div><div class="settings-row__desc">Receive email for task updates</div></div><div class="toggle active" data-setting="email"></div></div>
        <div class="settings-row"><div><div class="settings-row__label">Compact View</div><div class="settings-row__desc">Denser layout with less spacing</div></div><div class="toggle" data-setting="compact"></div></div>
      </div></div>
      <div class="card"><div class="settings-section"><div class="settings-section__title">Account</div>
        <div class="settings-row"><div><div class="settings-row__label">Sign Out</div><div class="settings-row__desc">Log out from Nexora</div></div><button class="btn-app btn-app--ghost" id="logoutBtn" style="color:var(--red);border-color:rgba(239,68,68,0.3)">Sign Out</button></div>
      </div></div>`;
  }

  function initToggles() {
    document.querySelectorAll(".toggle").forEach(t => t.addEventListener("click", () => t.classList.toggle("active")));
    const lb = document.getElementById("logoutBtn"); if (lb) lb.addEventListener("click", logout);
  }

  // ---- Notifications ----
  function updateNotifDot() { const u = D.notifications.filter(n => !n.read).length; const d = document.getElementById("notifDot"); if (d) d.classList.toggle("active", u > 0); }
  function renderNotifications() { const l = document.getElementById("notifList"); if (!l) return; l.innerHTML = D.notifications.map(n => `<div class="notif-item${n.read ? '' : ' unread'}"><div class="notif-item__dot"></div><div><div class="notif-item__title">${n.title}</div><div class="notif-item__desc">${n.desc}</div><div class="notif-item__time">${n.time}</div></div></div>`).join(''); }

  // ---- Sidebar & Notifications init ----
  function initSidebar() {
    const sb = document.getElementById("sidebar"), tb = document.getElementById("sidebarToggle");
    if (tb && sb) tb.addEventListener("click", () => { window.innerWidth <= 768 ? sb.classList.toggle("mobile-open") : sb.classList.toggle("collapsed"); });
    document.querySelectorAll(".sidebar__link").forEach(l => l.addEventListener("click", () => { if (window.innerWidth <= 768) sb.classList.remove("mobile-open"); }));
  }

  function initNotifications() {
    const btn = document.getElementById("notifBtn"), dd = document.getElementById("notifDropdown"), ma = document.getElementById("markAllRead");
    if (btn && dd) { btn.addEventListener("click", e => { e.stopPropagation(); dd.classList.toggle("open"); renderNotifications(); }); document.addEventListener("click", e => { if (!dd.contains(e.target) && e.target !== btn) dd.classList.remove("open"); }); }
    if (ma) ma.addEventListener("click", () => { D.notifications.forEach(n => n.read = true); renderNotifications(); updateNotifDot(); });
  }

  // ---- Init ----
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) form.addEventListener("submit", e => { e.preventDefault(); login(document.getElementById("loginEmail").value); location.hash = "dashboard"; });
    initSidebar(); initNotifications();
    window.addEventListener("hashchange", navigate);
    navigate();
  });
})();
