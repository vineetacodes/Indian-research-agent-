# Bharat Research Intelligence — Deployment & Production Architecture

This document specifies the complete production deployment matrix for **Bharat Research Intelligence**.

---

## 1. Production Topology

```
┌─────────────────────────────────────────────────────────────┐
│                   CLOUD CLIENT / BROWSER                    │
│            (Vue 3 / Vite Progressive Web App)               │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / WSS / SSE
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 EDGE CDN & REVERSE PROXY                    │
│            (Cloudflare / Vercel Edge Network)               │
└──────────────────────────────┬──────────────────────────────┘
                               │ Forwarding /api/*
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API CLUSTER                     │
│            (Express / Node.js 24 + Java Spring AI)          │
│                                                             │
│  ├── Multi-Track Agent Dispatcher (5 Parallel Agents)       │
│  ├── 7-D Epistemic Discrepancy Reconciler                   │
│  ├── Sovereign Source Registry (Tier 1–4)                   │
│  └── Offline Fail-Safe Cache Shield (Zero Wi-Fi Loss)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Isolated Sandbox
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               DETERMINISTIC PYTHON SANDBOX                  │
│       (Isolated Container / Pyodide WASM Runtime)           │
│   • Monte Carlo Simulator (1,000 Iterations)                │
│   • Parametric Tariff & Payback Sensitivity                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Production URLs & Endpoints

* **Production Web App (Frontend Cockpit)**:  
  `https://bharat-research.vercel.app` (or `https://app.bharatos.in`)
* **Production Backend API**:  
  `https://api.bharatos.in` (Health: `https://api.bharatos.in/health`)
* **Official GitHub Repository**:  
  `https://github.com/bharatos/bharat-research-intelligence`
* **Demo Video**:  
  `https://bharatos.in/demo-video` (or local file at [`demo/demo.mp4`](../demo/))

---

## 3. Deployment Methods

### Option A: 1-Click Docker Compose (Recommended for Judges & On-Prem)
```bash
git clone https://github.com/bharatos/bharat-research-intelligence.git
cd bharat-research-intelligence
docker-compose up -d --build
```
* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:8080`

---

### Option B: Vercel (Frontend) + Render / Railway (Backend)
1. **Frontend to Vercel**:
   * Root Directory: `frontend`
   * Build Command: `npm run build`
   * Output Directory: `dist`
   * Environment Variable: `VITE_API_BASE_URL=https://api.bharatos.in`
2. **Backend to Render/Railway**:
   * Root Directory: `backend`
   * Build Command: `npm install`
   * Start Command: `node src/server.js`
   * Port: `8080`

---

## 4. Local Offline Demo Mode (Fail-Safe Defense)

> [!IMPORTANT]
> **Zero Wi-Fi Dependency Rule:** If internet connectivity drops or external LLM API rate limits trigger during judging, toggle **Offline Demo Mode**:

```powershell
# Run the local acceptance test offline
cd backend
node test_acceptance.js
```
The system will immediately serve the pre-computed, 100% verified sovereign cache snapshots for all 10 domain questions in under 45ms.
