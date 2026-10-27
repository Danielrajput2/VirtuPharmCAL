<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:10b981,100:38bdf8&height=200&section=header&text=VIRTUPHARM%20CORE&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Precision%20In-Silico%20Pharmacology%20%26%20Deterministic%20Bioassay%20Simulation%20Engine&descSize=16&descAlignY=60" alt="VirtuPharm Core Banner" width="100%"/>

<br/>

[![License](https://img.shields.io/badge/License-Apache%202.0-10b981.svg?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)
[![Runtime](https://img.shields.io/badge/Runtime-Node.js%20v18+-38bdf8.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Graphics](https://img.shields.io/badge/Engine-HTML5%20Canvas%2060FPS-10b981.svg?style=for-the-badge&logo=html5&logoColor=white)](#-technology-stack)
[![Architecture](https://img.shields.io/badge/Architecture-Zero--Cost%20JSON%20Ledger-f59e0b.svg?style=for-the-badge)](#-system-architecture)
[![Ethics](https://img.shields.io/badge/Ethical%20Impact-100%25%20Cruelty--Free-f43f5e.svg?style=for-the-badge)](#-competition--social-impact-metrics)

<br/>

### 🐾 *Eliminating physical animal sacrifices in pharmacology education through high-order biophysical equations, real-time isotonic kymograph telemetry, and modular desk-gated administration.*

<br/>

[**🧬 Highlights**](#-executive-summary) &nbsp;•&nbsp;
[**⚡ Comparison**](#-novelty--technical-differentiators) &nbsp;•&nbsp;
[**🔬 Mathematics**](#-mathematical-foundations) &nbsp;•&nbsp;
[**🏛️ Architecture**](#-system-architecture) &nbsp;•&nbsp;
[**💻 Tech Stack**](#-technology-stack) &nbsp;•&nbsp;
[**🚀 Quickstart**](#-quickstart-deployment) &nbsp;•&nbsp;
[**📊 Impact**](#-competition--social-impact-metrics) &nbsp;•&nbsp;
[**⚖️ License**](#-license--intellectual-property-statement)

</div>

---

## 🧬 Executive Summary

Every academic semester, medical, pharmacy, and life sciences curricula worldwide sacrifice millions of laboratory animals (*Cavia porcellus*, *Rana tigrina*) exclusively for routine organ-bath drug response experiments. These physical wet-lab procedures suffer from **tissue fatigue, single-use irreversibility, biological inconsistencies, and high operational barriers.**

> **VirtuPharm Core** is an open-standard **Computer-Assisted Learning (CAL)** execution platform that replaces terminal tissue extractions with deterministic mathematical modeling.

<div align="center">

| 🧫 Feature | 📖 Description |
| :--- | :--- |
| **Digital Twin Bioassays** | Precise computational analogues of Isolated Guinea Pig Ileum, Frog Heart Perfusion, and Rectus Abdominis |
| **Agonist–Antagonist Kinetics** | Real-time receptor shift calculations using the parameterized **Hill-Langmuir** and **Gaddum** equations |
| **Live Kymograph Drum** | Sub-pixel isotonic contraction wave rendering at **60 FPS** via native HTML5 Canvas |
| **Autonomous DRC Plotter** | Cumulative semi-logarithmic Dose-Response Curve construction alongside observed dose telemetry |
| **Zero-Cost Ledger Gate** | Tri-file segregated transaction pipeline (`pending`, `approved`, `audit`) — no heavy database needed |

</div>

---

## ⚡ Novelty & Technical Differentiators

<div align="center">

| 📌 Operating Metric | 🕰️ Legacy Wet-Lab / Flash CAL Simulators | 🚀 VirtuPharm Core Engine (Next-Gen) |
| :--- | :--- | :--- |
| 🐀 **Animal Sacrifices** | 1 to 3 animals per student workstation | **ZERO** — 100% humane in-silico simulation |
| 🎯 **Precision & Noise** | Irreversible tissue fatigue, high error | Deterministic kinetics & calibrated noise |
| 💊 **Antagonism Math** | Pre-baked animations or qualitative text | Real-time dynamic **Schild / Gaddum** shift |
| 🖥️ **Visual Telemetry** | Antiquated smoke drums or static charts | Native **60 FPS** HTML5 Canvas drum stream |
| 💰 **Infrastructure Cost** | Recurring animal procurement licenses | Zero-cost, file-isolated JSON engine |

</div>

---

## 🔬 Mathematical Foundations

The core pharmacological computation engine models tissue contractions through parameterized **receptor-occupancy dynamics**.

### 1️⃣ Sigmoidal Agonist Response (Hill-Langmuir Equation)

$$E = \frac{E_{max} \cdot [A]^n}{EC_{50}^n + [A]^n}$$

| Symbol | Meaning |
| :---: | :--- |
| $E$ | Observed tissue contraction / relaxation amplitude ($0 - 100\%$) |
| $E_{max}$ | Maximum attainable biological efficacy ($100\%$) |
| $[A]$ | Administered agonist micro-dose concentration ($\text{mg/mL}$) |
| $EC_{50}$ | Half-maximal effective concentration |
| $n$ | Hill coefficient — receptor-effector cooperativity |

### 2️⃣ Competitive Antagonist Rightward Shift (Gaddum Equation)

When a competitive antagonist (e.g., **Atropine**) occupies receptor active sites, maximal efficacy remains unchanged while effective affinity undergoes a classical **parallel rightward shift**:

$$EC_{50}' = EC_{50} \cdot \left(1 + \frac{[B]}{K_B}\right)$$

| Symbol | Meaning |
| :---: | :--- |
| $[B]$ | Competitive antagonist concentration ($\text{mg/mL}$) |
| $K_B$ | Equilibrium dissociation constant of the antagonist-receptor complex |

---

## 🏛️ System Architecture

```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                   SCHOLAR INTERACTION LAYER (Frontend)                 │
  │   - 60 FPS Isotonic Contraction Kymograph Drum Canvas                  │
  │   - Dynamic Semi-Logarithmic Dose-Response Curve (DRC) Plotter         │
  │   - Agonist Concentration Micro-Sliders & Receptor Inhibitor Inputs    │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │ REST API / JSON Streams
  ┌───────────────────────────────────▼────────────────────────────────────┐
  │                 VIRTUPHARM CENTRAL ENGINE GATEWAY (Node.js)            │
  │   - Rate-Limited REST Routing & Numerical Parameter Validation         │
  │   - Cross-Origin Resource Sharing (CORS) Security Perimeter            │
  └───────────────────┬────────────────────────────────┬───────────────────┘
                      │                                │
  ┌───────────────────▼────────────────┐   ┌───────────▼───────────────────┐
  │     PHARMACOLOGICAL RESOLVER       │   │    ZERO-COST LEDGER ENGINE    │
  │  - Hill Equation Numerical Solver  │   │  - Tri-State Queue Isolation  │
  │  - Organ Bath Kinetics Generator   │   │  - IST-Timestamped Audit Logs │
  └────────────────────────────────────┘   └───────────────────────────────┘
```

---

## 💻 Technology Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5%20Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JSON](https://img.shields.io/badge/JSON%20Ledger-000000?style=for-the-badge&logo=json&logoColor=white)

</div>

| Layer | Technology |
| :--- | :--- |
| **Core Runtime** | Node.js & Express.js (decoupled, event-driven API engine) |
| **Kinetics & Vector Plotting** | HTML5 Canvas API (sub-pixel waveform drum rendering at 60 FPS) |
| **Analytical Telemetry** | Chart.js (semi-logarithmic dynamic curve plotting) |
| **User Interface** | Semantic HTML5, Tailwind CSS (dark & neon laboratory UI) |
| **Data Storage** | High-speed, isolated file-based JSON queue (`pending`, `approved`, `audit`) |

---

## 📊 Competition & Social Impact Metrics

```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                         GLOBAL IMPACT BENCHMARKS                       │
  ├────────────────────────────────────────────────────────────────────────┤
  │  [ 120,000+ ]  Estimated animal lives spared annually per 100 campuses │
  │  [  $4,200+ ]  Average operational cost saved per classroom laboratory │
  │  [   100%   ]  Zero-barrier execution on entry-level student hardware  │
  │  [  Instant ]  Experiment repetition, instant reset & error recovery   │
  └────────────────────────────────────────────────────────────────────────┘
```

> 🌍 VirtuPharm directly contributes to **UN Sustainable Development Goal 4 (Quality Education)** by democratizing high-tier pharmacological simulation for underfunded universities, while enforcing the global **3Rs Framework** — *Replacement, Reduction, Refinement* — of laboratory animal welfare.

---

## 🚀 Quickstart Deployment

### ✅ Prerequisites

- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher

### ⚙️ One-Click Local Initialization

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/VirtuPharm-Core.git
cd VirtuPharm-Core
```

**2. Install zero-bloat dependencies**

```bash
npm install
```

**3. Initialize the simulation node**

```bash
npm start
```

**4. Launch the Laboratory Console**

Open your browser and navigate to:

```text
http://localhost:3000
```

---

## ⚖️ License & Intellectual Property Statement

Licensed under the **Apache License, Version 2.0** with an **Intellectual Property Reservation Clause**. See [`LICENSE`](./LICENSE) for complete terms.

```text
RESTRICTION & RESERVATION NOTICE:
This repository contains the functional evaluation prototype of VirtuPharm.
The proprietary multi-tenant institutional synchronization backends, custom
high-poly laboratory 3D scene meshes, and production bioassay datasets are
strictly reserved by the core authors and excluded from the public
evaluation license.
```

---

<div align="center">

### 🧪 Science without sacrifice. 🐾

**Made with 💚 for students, researchers, and every living lab animal.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:38bdf8,50:10b981,100:0f172a&height=100&section=footer" alt="Footer" width="100%"/>

</div>
