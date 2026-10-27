const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Evaluation Sandbox Ledger
const sandboxDB = {
  active_scholars: 142,
  animals_saved: 1240,
  pending_approvals: [
    { order_id: "ORD-VP-801", username: "scholar_kavya", utr: "908123456789", amount: 499, status: "pending", time: "11:20:15 IST" },
    { order_id: "ORD-VP-802", username: "aiims_lab_lead", utr: "419082341256", amount: 1999, status: "pending", time: "11:22:40 IST" }
  ],
  approved_today: []
};

// ==========================================
// 1. PHARMACOLOGICAL SIMULATION API (HILL EQUATION)
// ==========================================
app.post('/api/simulate/dose', (req, res) => {
  const { drug, dose, tissue, antagonistDose = 0 } = req.body;
  const numDose = parseFloat(dose);

  if (isNaN(numDose) || numDose <= 0) {
    return res.status(400).json({ success: false, message: "Valid positive dose required." });
  }

  // Tissue Constants
  let EC50 = 2.0; 
  let Emax = 100.0;
  let hillSlope = 1.35;

  if (tissue === 'frog_heart') {
    EC50 = 1.5;
    hillSlope = 1.1;
  } else if (tissue === 'rectus_abdominis') {
    EC50 = 3.2;
    hillSlope = 1.6;
  }

  // Competitive Antagonism Shift: EC50' = EC50 * (1 + [B]/Kb)
  if (antagonistDose > 0) {
    const shift = 1 + (parseFloat(antagonistDose) / 0.8);
    EC50 = EC50 * shift;
  }

  // Compute Hill-Langmuir Response Percentage
  const powDose = Math.pow(numDose, hillSlope);
  const powEC50 = Math.pow(EC50, hillSlope);
  const responsePercent = (Emax * powDose) / (powEC50 + powDose);

  // Organ Bath Kinetics Waveform Points
  const timeSeries = [];
  const sampleCount = 60;
  for (let i = 0; i <= sampleCount; i++) {
    const t = i / 10; // seconds
    let height = 0;
    if (t >= 1.0) {
      // Contraction rise and baseline relaxation
      const peak = responsePercent;
      height = peak * Math.exp(-0.25 * (t - 1.0)) * (1 - Math.exp(-2.0 * (t - 1.0)));
    }
    timeSeries.push({ time_sec: t.toFixed(1), contraction_mm: Math.max(0, height).toFixed(2) });
  }

  res.json({
    success: true,
    drug: drug || "Acetylcholine",
    tissue: tissue || "Guinea Pig Ileum",
    dose_mg: numDose,
    response_percent: parseFloat(responsePercent.toFixed(2)),
    antagonist_dose: parseFloat(antagonistDose),
    kinetics: timeSeries
  });
});

// ==========================================
// 2. DESK & LEDGER APIS
// ==========================================
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    success: true,
    active_scholars: sandboxDB.active_scholars,
    animals_saved: sandboxDB.animals_saved,
    pending_count: sandboxDB.pending_approvals.length,
    approved_count: sandboxDB.approved_today.length,
    pending: sandboxDB.pending_approvals,
    approved: sandboxDB.approved_today
  });
});

app.post('/api/admin/approve', (req, res) => {
  const { order_id, selected_tier } = req.body;
  const idx = sandboxDB.pending_approvals.findIndex(p => p.order_id === order_id);

  if (idx === -1) return res.status(404).json({ success: false, message: "Order not found." });

  const item = sandboxDB.pending_approvals.splice(idx, 1)[0];
  item.assigned_tier = selected_tier || "Gold-90Days";
  item.status = "approved";
  item.approved_at = new Date().toLocaleTimeString() + " IST";
  sandboxDB.approved_today.unshift(item);
  sandboxDB.active_scholars += 1;
  sandboxDB.animals_saved += 5;

  res.json({ success: true, message: `Order ${order_id} approved. Upgraded to ${item.assigned_tier}.` });
});

// Default Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 VirtuPharm Prototype Engine Online: http://localhost:${PORT}`);
  console.log(`🧪 Interactive CAL Tissue Lab & Admin Gateway Active`);
  console.log(`======================================================\n`);
});
