# 🧠 Neuroscale — OneSystem MVP

> **The Operating System for Organizations** — A high-fidelity interactive prototype that unifies every department, process, and decision across your enterprise into a single intelligent command center.

![Dark Mode](https://img.shields.io/badge/Theme-Dark%20Mode-0F172A?style=for-the-badge&labelColor=1E293B)
![Vanilla JS](https://img.shields.io/badge/Built%20With-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Status](https://img.shields.io/badge/Status-Prototype-06B6D4?style=for-the-badge)

---

## ✨ Features

### 📊 Screen A — Global Command Center
The CEO/Leadership dashboard providing a unified real-time view of the entire organization.

- **KPI Ribbon** — Animated counters for Overall Efficiency (92%), Active Anomalies (2), and Workflow Automation Rate (78%)
- **System of Intelligence** — AI-powered feed with risk alerts, optimization recommendations, trend insights, and compliance warnings
- **Cross-Departmental Activity Stream** — Real-time grouped events showing automated workflows (e.g., employee onboarding chain across HR → IT → Security → Ops)
- **Budget & Efficiency Charts** — Interactive bar and line charts with tooltips (powered by Chart.js)

- <img width="1902" height="912" alt="image" src="https://github.com/user-attachments/assets/44d38d99-a970-4c5e-ac02-6247078191e5" />
<img width="1912" height="897" alt="image" src="https://github.com/user-attachments/assets/ddd2ed49-66b8-447e-b0aa-41fa68c4f378" />


### 🧠 Screen B — Organizational Graph (System of Memory)
Visualizes how disconnected silos are actually linked.

- **Interactive SVG Network Graph** — 12 color-coded nodes representing Projects, Departments, Finance, Infrastructure, and Governance
- **Click-to-Explore** — Click any node to open a detailed side panel showing:
  - 👥 **People** — Who is working on it (cross-departmental)
  - 💰 **Budget** — Real-time spend vs. allocation with forecast indicators
  - 📋 **Policies** — Compliance rules attached to the entity
  - 🖥️ **Assets** — Servers, tools, or licenses being used
- **Hover Tooltips** — Quick info on hover for every node and person
<img width="1902" height="906" alt="image" src="https://github.com/user-attachments/assets/00eedbb8-26be-47ba-9f26-d98cc75195cc" />
<img width="1916" height="895" alt="image" src="https://github.com/user-attachments/assets/ea0da8d6-b0c1-4741-861d-18db17e863fb" />

### ⚙️ Screen C — Unified Workflow Engine (System of Control)
Demonstrates how actions are executed across the organization.

- **Pipeline View** — Kanban-style view of active organizational "Playbooks"
- **Status-Coded Steps** — Completed (Green), In Progress (Yellow), Waiting (Gray), Pending (Gray)
- **Multiple Playbooks** — Switch between "Emergency Server Migration" and "Quarterly Compliance Review"
- **Trigger New Playbook** — Modal to initiate top-down actions from 8 pre-built templates
<img width="1917" height="901" alt="image" src="https://github.com/user-attachments/assets/f32d8207-b262-4b02-aace-8945cc901926" />

### 🔍 "Aha!" Interaction — Cross-System Impact Analysis
The killer feature that proves the value of OneSystem:

1. Type **"Show impact of raising minimum server specifications"** in the global search bar
2. Watch the animated multi-system query simulation
3. Receive a synthesized impact card with data from 4 departments:
   - **IT**: 450 instances need upgrading
   - **Finance**: $45,000/MRR cost increase
   - **HR/Ops**: 3 onboarding playbooks need updating
   - **Governance**: 2 policies need revision
4. One-click **"Draft Policy Update"** action button

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (only needed for local dev server — optional)

### Option 1: Quick Start (No Installation)

Simply open `index.html` directly in your browser:

```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### Option 2: Local Development Server (Recommended)

Using a local server enables proper asset loading and a better development experience:

```bash
# Clone the repository
git clone https://github.com/ankush262/Neuroscale.git
cd Neuroscale

# Serve with npx (no install needed)
npx -y serve . -l 3000

# Open in browser
# → http://localhost:3000
```

Alternatively, use any static file server:

```bash
# Python
python -m http.server 3000

# PHP
php -S localhost:3000
```

---

## 🗂️ Project Structure

```
Neuroscale/
├── index.html          # Single-page entry point with all 3 screens
├── css/
│   └── styles.css      # Full dark-mode design system (700+ lines)
├── js/
│   ├── data.js         # Rich mock data (JSON objects)
│   └── app.js          # Application logic (navigation, charts, graph, search)
└── README.md
```

---

## 🎨 Design System

| Token             | Value                    | Usage                          |
|--------------------|--------------------------|--------------------------------|
| `--bg-primary`     | `#0F172A`                | Main background                |
| `--bg-secondary`   | `#1E293B`                | Sidebar, cards                 |
| `--cyan`           | `#06B6D4`                | Memory/Data accents            |
| `--violet`         | `#8B5CF6`                | Intelligence/AI accents        |
| `--emerald`        | `#10B981`                | Control/Status accents         |
| `--amber`          | `#F59E0B`                | Warnings, anomalies            |
| `--rose`           | `#F43F5E`                | Critical, governance           |

**Typography**: Inter (Google Fonts) — weights 300–900

---

## 🧪 How to Use

1. **Navigate** — Use the left sidebar to switch between the 3 core screens:
   - 📊 Command Center (Dashboard)
   - 🧠 Org Graph (System of Memory)
   - ⚙️ Workflow Engine (System of Control)

2. **Explore the Org Graph** — Click on nodes like *Project Phoenix*, *Engineering Team*, or *AWS Cluster A* to see cross-departmental connections in the side panel.

3. **Hover for Details** — Hover over person names in the side panel to see their active projects, department, and budget ownership.

4. **Switch Playbooks** — On the Workflow Engine screen, click between *Emergency Server Migration* and *Quarterly Compliance Review* tabs.

5. **Trigger a Playbook** — Click the **"⚡ Trigger New Playbook"** button to open the template selector modal.

6. **Try the "Aha!" Search** — Click the search bar at the top and type:
   ```
   Show impact of raising minimum server specifications
   ```
   Press **Enter** and watch the cross-system impact analysis appear.

---


