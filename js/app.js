// ============================================================
// OneSystem MVP — Application Logic
// ============================================================

(function () {
    "use strict";

    // ── State ────────────────────────────────────────────────
    let currentScreen = "dashboard";
    let currentPlaybook = 0;
    let charts = {};

    // ── DOM Ready ────────────────────────────────────────────
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        setupNavigation();
        setupSearch();
        renderDashboard();
        renderOrgGraph();
        renderWorkflowEngine();
        animateKPIs();
    }

    // ════════════════════════════════════════════════════════
    //  NAVIGATION
    // ════════════════════════════════════════════════════════
    function setupNavigation() {
        document.querySelectorAll(".nav-item[data-screen]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const screen = btn.dataset.screen;
                switchScreen(screen);
            });
        });
    }

    function switchScreen(screen) {
        currentScreen = screen;
        // Update nav
        document.querySelectorAll(".nav-item[data-screen]").forEach((n) => n.classList.remove("active"));
        document.querySelector(`.nav-item[data-screen="${screen}"]`)?.classList.add("active");
        // Update screens
        document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
        document.getElementById(`screen-${screen}`)?.classList.add("active");
        // Rebuild charts when switching to dashboard
        if (screen === "dashboard") {
            setTimeout(() => {
                renderCharts();
                animateKPIs();
            }, 100);
        }
        if (screen === "graph") {
            setTimeout(() => renderOrgGraph(), 100);
        }
    }

    // ════════════════════════════════════════════════════════
    //  SEARCH / "AHA!" INTERACTION
    // ════════════════════════════════════════════════════════
    function setupSearch() {
        const input = document.getElementById("global-search");
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const q = input.value.toLowerCase().trim();
                if (q.includes("impact") && q.includes("server")) {
                    triggerImpactQuery();
                    input.value = "";
                }
            }
        });

        // Close impact
        document.getElementById("impact-close")?.addEventListener("click", closeImpact);
        document.getElementById("impact-overlay")?.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) closeImpact();
        });
        document.getElementById("impact-dismiss")?.addEventListener("click", closeImpact);
    }

    function triggerImpactQuery() {
        const loader = document.getElementById("search-loading");
        loader.classList.add("active");
        setTimeout(() => {
            loader.classList.remove("active");
            showImpactCard();
        }, 1800);
    }

    function showImpactCard() {
        const overlay = document.getElementById("impact-overlay");
        const container = document.getElementById("impact-sections");
        const data = MOCK.impactResult;

        document.getElementById("impact-title").textContent = data.title;
        document.getElementById("impact-subtitle").textContent = data.subtitle;

        container.innerHTML = data.sections
            .map(
                (s) => `
      <div class="impact-section">
        <div class="impact-section-icon">${s.icon}</div>
        <div class="impact-section-content">
          <div class="impact-section-dept" style="color:${s.color}">${s.dept}</div>
          <div class="impact-section-metric" style="color:${s.color}">${s.metric}</div>
          <div class="impact-section-detail">${s.detail}</div>
        </div>
      </div>`
            )
            .join("");

        document.getElementById("impact-action-btn").textContent = data.action;
        overlay.classList.add("active");
    }

    function closeImpact() {
        document.getElementById("impact-overlay").classList.remove("active");
    }

    // ════════════════════════════════════════════════════════
    //  SCREEN A: DASHBOARD
    // ════════════════════════════════════════════════════════
    function renderDashboard() {
        renderAIFeed();
        renderActivityStream();
        renderCharts();
    }

    function animateKPIs() {
        document.querySelectorAll(".kpi-bar-fill").forEach((bar) => {
            const target = bar.dataset.target;
            setTimeout(() => {
                bar.style.width = target + "%";
            }, 300);
        });
        // Animate numbers
        document.querySelectorAll(".kpi-value[data-count]").forEach((el) => {
            animateCounter(el, 0, parseInt(el.dataset.count), 1200);
        });
    }

    function animateCounter(el, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();
        const suffix = el.dataset.suffix || "";
        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + range * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function renderAIFeed() {
        const list = document.getElementById("ai-feed-list");
        list.innerHTML = MOCK.aiFeed
            .map(
                (item) => `
      <div class="ai-feed-item ${item.type}" id="${item.id}">
        <div class="feed-top">
          <div class="feed-title">${item.icon} ${item.title}</div>
          <div class="feed-time">${item.time}</div>
        </div>
        <div class="feed-body">${item.body}</div>
        <div class="feed-action">${item.action} →</div>
      </div>`
            )
            .join("");
    }

    function renderActivityStream() {
        const container = document.getElementById("activity-stream");
        container.innerHTML = MOCK.activityStream
            .map(
                (group) => `
      <div class="activity-group">
        <div class="activity-group-header">
          <h4>${group.group}</h4>
          ${group.automated ? '<span class="auto-badge">⚡ Automated</span>' : ""}
        </div>
        <div class="activity-events">
          ${group.events
                        .map(
                            (ev) => `
            <div class="activity-event">
              <span class="event-dept">${ev.dept}</span>
              <span class="event-text">${ev.icon} ${ev.text}</span>
              <span class="event-time">${ev.time}</span>
            </div>`
                        )
                        .join("")}
        </div>
      </div>`
            )
            .join("");
    }

    function renderCharts() {
        // Destroy existing charts
        Object.values(charts).forEach((c) => c.destroy && c.destroy());
        charts = {};

        const budgetCtx = document.getElementById("chart-budget");
        const efficiencyCtx = document.getElementById("chart-efficiency");

        if (!budgetCtx || !efficiencyCtx) return;

        const chartDefaults = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: "#94A3B8", font: { family: "Inter", size: 11 } },
                },
                tooltip: {
                    backgroundColor: "#1E293B",
                    titleColor: "#F1F5F9",
                    bodyColor: "#94A3B8",
                    borderColor: "rgba(148,163,184,0.15)",
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    titleFont: { family: "Inter", weight: "600" },
                    bodyFont: { family: "Inter" },
                },
            },
        };

        const bd = MOCK.departmentBudget;
        charts.budget = new Chart(budgetCtx, {
            type: "bar",
            data: {
                labels: bd.labels,
                datasets: [
                    {
                        label: "Allocated",
                        data: bd.allocated,
                        backgroundColor: "rgba(6, 182, 212, 0.6)",
                        borderColor: "#06B6D4",
                        borderWidth: 1,
                        borderRadius: 4,
                    },
                    {
                        label: "Spent",
                        data: bd.spent,
                        backgroundColor: "rgba(139, 92, 246, 0.6)",
                        borderColor: "#8B5CF6",
                        borderWidth: 1,
                        borderRadius: 4,
                    },
                ],
            },
            options: {
                ...chartDefaults,
                scales: {
                    x: {
                        grid: { color: "rgba(148,163,184,0.05)" },
                        ticks: { color: "#64748B", font: { family: "Inter", size: 10 } },
                    },
                    y: {
                        grid: { color: "rgba(148,163,184,0.05)" },
                        ticks: {
                            color: "#64748B",
                            font: { family: "Inter", size: 10 },
                            callback: (v) => "$" + (v / 1e6).toFixed(1) + "M",
                        },
                    },
                },
                plugins: {
                    ...chartDefaults.plugins,
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: (ctx) => ctx.dataset.label + ": $" + (ctx.raw / 1e6).toFixed(2) + "M",
                        },
                    },
                },
            },
        });

        const wd = MOCK.weeklyEfficiency;
        charts.efficiency = new Chart(efficiencyCtx, {
            type: "line",
            data: {
                labels: wd.labels,
                datasets: [
                    {
                        label: "Efficiency %",
                        data: wd.values,
                        borderColor: "#10B981",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#10B981",
                        pointBorderColor: "#10B981",
                        pointRadius: 4,
                        pointHoverRadius: 7,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                ...chartDefaults,
                scales: {
                    x: {
                        grid: { color: "rgba(148,163,184,0.05)" },
                        ticks: { color: "#64748B", font: { family: "Inter", size: 10 } },
                    },
                    y: {
                        min: 50,
                        max: 100,
                        grid: { color: "rgba(148,163,184,0.05)" },
                        ticks: {
                            color: "#64748B",
                            font: { family: "Inter", size: 10 },
                            callback: (v) => v + "%",
                        },
                    },
                },
                plugins: {
                    ...chartDefaults.plugins,
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: (ctx) => "Efficiency: " + ctx.raw + "%",
                        },
                    },
                },
            },
        });
    }

    // ════════════════════════════════════════════════════════
    //  SCREEN B: ORG GRAPH
    // ════════════════════════════════════════════════════════
    function renderOrgGraph() {
        const container = document.getElementById("graph-canvas");
        if (!container) return;

        const svg = container;
        const rect = svg.parentElement.getBoundingClientRect();
        const w = rect.width || 900;
        const h = rect.height || 600;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

        const cx = w / 2;
        const cy = h / 2;

        const typeColors = {
            project: "#06B6D4",
            department: "#8B5CF6",
            finance: "#F59E0B",
            infrastructure: "#10B981",
            governance: "#F43F5E",
        };

        const nodes = MOCK.orgGraph.nodes.map((n) => ({
            ...n,
            px: cx + n.x * 1.1,
            py: cy + n.y * 1.1,
            color: typeColors[n.type] || "#94A3B8",
        }));

        const nodeMap = {};
        nodes.forEach((n) => (nodeMap[n.id] = n));

        // Clear
        svg.innerHTML = "";

        // Defs for glow
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.id = "glow";
        const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        blur.setAttribute("stdDeviation", "3");
        blur.setAttribute("result", "coloredBlur");
        const merge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
        const mn1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        mn1.setAttribute("in", "coloredBlur");
        const mn2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        mn2.setAttribute("in", "SourceGraphic");
        merge.append(mn1, mn2);
        filter.append(blur, merge);
        defs.append(filter);
        svg.append(defs);

        // Edges
        MOCK.orgGraph.edges.forEach((e) => {
            const s = nodeMap[e.source];
            const t = nodeMap[e.target];
            if (!s || !t) return;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", s.px);
            line.setAttribute("y1", s.py);
            line.setAttribute("x2", t.px);
            line.setAttribute("y2", t.py);
            line.classList.add("graph-edge");
            svg.append(line);
        });

        // Nodes
        nodes.forEach((n) => {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.classList.add("graph-node");
            g.setAttribute("transform", `translate(${n.px}, ${n.py})`);
            g.dataset.nodeId = n.id;

            // Outer glow circle
            const glowCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            glowCircle.setAttribute("r", "32");
            glowCircle.setAttribute("fill", n.color);
            glowCircle.setAttribute("opacity", "0.1");
            g.append(glowCircle);

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", "24");
            circle.setAttribute("fill", "rgba(15,23,42,0.9)");
            circle.setAttribute("stroke", n.color);
            circle.setAttribute("filter", "url(#glow)");
            g.append(circle);

            // Icon
            const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
            icon.setAttribute("dy", "5");
            icon.setAttribute("font-size", "14");
            icon.setAttribute("fill", n.color);
            const icons = { project: "◆", department: "●", finance: "$", infrastructure: "⬡", governance: "⛨" };
            icon.textContent = icons[n.type] || "●";
            g.append(icon);

            // Label
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("dy", "44");
            label.setAttribute("font-size", "11");
            label.setAttribute("font-weight", "500");
            label.textContent = n.label;
            g.append(label);

            // Click
            g.addEventListener("click", () => openSidePanel(n.id));

            // Hover tooltip
            g.addEventListener("mouseenter", (e) => showGraphTooltip(e, n));
            g.addEventListener("mouseleave", hideGraphTooltip);

            svg.append(g);
        });

        // Setup side panel close
        document.getElementById("panel-close")?.addEventListener("click", closeSidePanel);
        document.getElementById("panel-overlay")?.addEventListener("click", closeSidePanel);
    }

    function showGraphTooltip(e, node) {
        const tooltip = document.getElementById("graph-tooltip");
        tooltip.textContent = node.label + " (" + node.type + ")";
        tooltip.style.left = e.clientX + 14 + "px";
        tooltip.style.top = e.clientY - 10 + "px";
        tooltip.classList.add("visible");
    }

    function hideGraphTooltip() {
        document.getElementById("graph-tooltip").classList.remove("visible");
    }

    function openSidePanel(nodeId) {
        const data = MOCK.orgGraph.details[nodeId];
        if (!data) return;

        document.getElementById("panel-title").textContent = data.title;
        document.getElementById("panel-description").textContent = data.description;

        // People
        const peopleEl = document.getElementById("panel-people");
        peopleEl.innerHTML = data.people
            .map(
                (p) => `
      <div class="detail-person" data-person="${p.name}">
        <div class="person-avatar">${p.name.split(" ").map((n) => n[0]).join("")}</div>
        <div>
          <div class="person-name">${p.name}</div>
          <div class="person-role">${p.role} · ${p.dept}</div>
        </div>
      </div>`
            )
            .join("");

        // Attach hover to people
        peopleEl.querySelectorAll(".detail-person").forEach((el) => {
            el.addEventListener("mouseenter", (e) => showPersonTooltip(e, el.dataset.person));
            el.addEventListener("mouseleave", hidePersonTooltip);
        });

        // Budget
        const budgetEl = document.getElementById("panel-budget");
        const b = data.budget;
        const pct = ((b.spent / b.allocated) * 100).toFixed(0);
        const forecastPct = ((b.forecast / b.allocated) * 100).toFixed(0);
        budgetEl.innerHTML = `
      <div class="budget-bar-wrapper">
        <div class="budget-bar-labels">
          <span class="label">Spent</span>
          <span class="value">$${(b.spent / 1e6).toFixed(2)}M / $${(b.allocated / 1e6).toFixed(2)}M</span>
        </div>
        <div class="budget-bar">
          <div class="budget-bar-fill" style="width:${pct}%"></div>
          <div class="budget-bar-forecast" style="left:${forecastPct}%" title="Forecast: $${(b.forecast / 1e6).toFixed(2)}M"></div>
        </div>
        <div class="budget-bar-labels" style="margin-top:4px">
          <span class="label">Forecast</span>
          <span class="value" style="color:var(--amber)">$${(b.forecast / 1e6).toFixed(2)}M</span>
        </div>
      </div>`;

        // Policies
        const policiesEl = document.getElementById("panel-policies");
        policiesEl.innerHTML = `<div class="detail-tags">${data.policies.map((p) => `<span class="detail-tag">📋 ${p}</span>`).join("")}</div>`;

        // Assets
        const assetsEl = document.getElementById("panel-assets");
        assetsEl.innerHTML = `<div class="detail-tags">${data.assets.map((a) => `<span class="detail-tag">🖥️ ${a}</span>`).join("")}</div>`;

        document.getElementById("panel-overlay").classList.add("active");
        document.getElementById("side-panel").classList.add("open");
    }

    function closeSidePanel() {
        document.getElementById("panel-overlay").classList.remove("active");
        document.getElementById("side-panel").classList.remove("open");
    }

    // ═══ Person tooltip ═══
    function showPersonTooltip(e, name) {
        const person = MOCK.people[name];
        if (!person) return;
        const tt = document.getElementById("person-tooltip");
        tt.querySelector(".tooltip-name").textContent = name;
        tt.querySelector(".tooltip-role").textContent = person.role;
        tt.querySelector(".tooltip-dept").textContent = person.dept;
        tt.querySelector(".tooltip-projects").textContent = person.projects.length ? "Projects: " + person.projects.join(", ") : "No active projects";
        tt.style.left = e.clientX + 14 + "px";
        tt.style.top = e.clientY - 10 + "px";
        tt.classList.add("visible");
    }

    function hidePersonTooltip() {
        document.getElementById("person-tooltip").classList.remove("visible");
    }

    // ════════════════════════════════════════════════════════
    //  SCREEN C: WORKFLOW ENGINE
    // ════════════════════════════════════════════════════════
    function renderWorkflowEngine() {
        renderPlaybookTabs();
        renderPlaybook(0);
        setupPlaybookModal();
    }

    function renderPlaybookTabs() {
        const selector = document.getElementById("playbook-tabs");
        selector.innerHTML = MOCK.playbooks
            .map(
                (pb, i) =>
                    `<button class="playbook-tab ${i === 0 ? "active" : ""}" data-index="${i}">${pb.name}</button>`
            )
            .join("");

        selector.querySelectorAll(".playbook-tab").forEach((btn) => {
            btn.addEventListener("click", () => {
                selector.querySelectorAll(".playbook-tab").forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                renderPlaybook(parseInt(btn.dataset.index));
            });
        });
    }

    function renderPlaybook(index) {
        currentPlaybook = index;
        const pb = MOCK.playbooks[index];

        document.getElementById("pb-info").innerHTML = `
      <div class="playbook-info-item">
        <span class="info-label">Priority:</span>
        <span class="info-value" style="color:${pb.priority === "Critical" ? "var(--rose)" : "var(--amber)"}">${pb.priority}</span>
      </div>
      <div class="playbook-info-item">
        <span class="info-label">Triggered:</span>
        <span class="info-value">${pb.triggered}</span>
      </div>
      <div class="playbook-info-item">
        <span class="info-label">By:</span>
        <span class="info-value">${pb.triggeredBy}</span>
      </div>`;

        const pipeline = document.getElementById("pipeline");
        pipeline.innerHTML = pb.steps
            .map(
                (step, i) => `
      <div class="pipeline-step ${step.status}">
        <div class="step-header">
          <span class="step-number">Step ${i + 1}</span>
          <span class="step-status ${step.status}">${formatStatus(step.status)}</span>
        </div>
        <div class="step-icon">${step.icon}</div>
        <div class="step-dept">${step.dept}</div>
        <div class="step-label">${step.label}</div>
        <div class="step-assignee">
          <span class="assignee-avatar">${step.assignee.split(" ").map((n) => n[0]).join("")}</span>
          <span>${step.assignee}</span>
          ${step.completedAt ? `<span style="margin-left:auto;font-size:0.7rem;color:var(--text-muted)">${step.completedAt}</span>` : ""}
        </div>
      </div>`
            )
            .join("");
    }

    function formatStatus(s) {
        return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }

    function setupPlaybookModal() {
        const btn = document.getElementById("trigger-playbook-btn");
        const modal = document.getElementById("playbook-modal");
        const closeBtn = document.getElementById("modal-close");
        const cancelBtn = document.getElementById("modal-cancel");

        btn?.addEventListener("click", () => {
            // Populate dropdown
            const select = document.getElementById("playbook-select");
            select.innerHTML = MOCK.playbookTemplates.map((t) => `<option>${t}</option>`).join("");
            modal.classList.add("active");
        });

        closeBtn?.addEventListener("click", () => modal.classList.remove("active"));
        cancelBtn?.addEventListener("click", () => modal.classList.remove("active"));
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });

        document.getElementById("modal-trigger")?.addEventListener("click", () => {
            modal.classList.remove("active");
            // Show a brief confirmation
            showToast("Playbook triggered successfully!");
        });
    }

    function showToast(msg) {
        let toast = document.getElementById("toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:400;
        background:var(--bg-secondary); border:1px solid var(--emerald);
        color:var(--emerald); padding:12px 24px; border-radius:10px;
        font-family:Inter,sans-serif; font-size:0.85rem; font-weight:600;
        box-shadow:0 4px 20px rgba(16,185,129,0.2);
        transform:translateY(80px); opacity:0; transition:all 0.3s ease;
      `;
            document.body.append(toast);
        }
        toast.textContent = "✅ " + msg;
        requestAnimationFrame(() => {
            toast.style.transform = "translateY(0)";
            toast.style.opacity = "1";
        });
        setTimeout(() => {
            toast.style.transform = "translateY(80px)";
            toast.style.opacity = "0";
        }, 3000);
    }
})();
