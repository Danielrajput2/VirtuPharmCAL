# VirtuPharm: System Architecture & Design Specification

## 1. Problem Statement & Impact
In conventional medical and pharmacy training, millions of laboratory animals are sacrificed annually for routine dose-response exercises. **VirtuPharm** replaces destructive physical bioassays with high-fidelity, deterministic mathematical models, reducing animal usage to **zero** while providing instant telemetry, dose calculations, and repeatable experiment curves.

## 2. Core Architectural Pillars
- **Bio-Mathematical Engine:** Employs the **Hill-Langmuir Equation** to compute dynamic tissue responses:
  $$E = \frac{E_{max} \cdot [D]^n}{EC_{50}^n + [D]^n}$$
- **Zero-Cost Isolated Ledger Engine:** Replaces heavy database instances with an ACID-compliant, file-based JSON queue architecture.
- **Role-Based Admin Desks:** Clear segregation between Research Terminals, Payment Verification Desks, and Institutional Account Desks.

## 3. Layered Topology
```text
┌────────────────────────────────────────────────────────┐
│            Scholar Interactive CAL Terminal            │
│  (Real-Time Tissue Bath Canvas, DRC Plotter, Controls) │
└──────────────────────────┬─────────────────────────────┘
                           │ WebSocket / REST API
┌──────────────────────────▼─────────────────────────────┐
│             VirtuPharm Gateway & Controller            │
│  (Rate Limiting, Session Armor, Mathematical Pipeline) │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
┌─────────────▼──────────────┐ ┌───────────▼─────────────┐
│  Pharmacological Engine     │ │   Audit & Ledger Engine │
│  - Agonist/Antagonist Math │ │   - pending.json        │
│  - Organ Bath Kinetics     │ │   - approved.json       │
└────────────────────────────┘ └─────────────────────────┘
