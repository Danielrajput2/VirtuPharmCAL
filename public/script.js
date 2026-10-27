let drcChartInstance = null;
let kymoCanvas, kymoCtx;
let currentWaveformData = [];
let waveAnimationId = null;

function updateDoseLabel() {
  const val = document.getElementById('inputDose').value;
  document.getElementById('doseValDisplay').innerText = `${parseFloat(val).toFixed(1)} mg`;
}

// 1. Initialize Kymograph Drum Canvas
function initKymoCanvas() {
  kymoCanvas = document.getElementById('kymoCanvas');
  kymoCtx = kymoCanvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  drawEmptyBaseline();
}

function resizeCanvas() {
  kymoCanvas.width = kymoCanvas.offsetWidth;
  kymoCanvas.height = kymoCanvas.offsetHeight;
  drawEmptyBaseline();
}

function drawEmptyBaseline() {
  if (!kymoCtx) return;
  const w = kymoCanvas.width;
  const h = kymoCanvas.height;
  kymoCtx.fillStyle = '#070b12';
  kymoCtx.fillRect(0, 0, w, h);

  // Grid
  kymoCtx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
  kymoCtx.lineWidth = 1;
  for (let x = 0; x < w; x += 30) {
    kymoCtx.beginPath(); kymoCtx.moveTo(x, 0); kymoCtx.lineTo(x, h); kymoCtx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    kymoCtx.beginPath(); kymoCtx.moveTo(0, y); kymoCtx.lineTo(w, y); kymoCtx.stroke();
  }

  // Baseline
  kymoCtx.strokeStyle = '#10b981';
  kymoCtx.lineWidth = 2;
  kymoCtx.beginPath();
  kymoCtx.moveTo(0, h * 0.85);
  kymoCtx.lineTo(w, h * 0.85);
  kymoCtx.stroke();
}

// 2. Initialize DRC Chart
function initDRCChart() {
  const ctx = document.getElementById('drcChart').getContext('2d');
  drcChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Observed Contraction %',
        data: [],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        tension: 0.35,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#38bdf8'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: 'Log Dose (mg)', color: '#94a3b8', font: { size: 10 } },
          grid: { color: 'rgba(30, 41, 59, 0.5)' },
          ticks: { color: '#64748b' }
        },
        y: {
          min: 0,
          max: 105,
          title: { display: true, text: 'Tissue Response (%)', color: '#94a3b8', font: { size: 10 } },
          grid: { color: 'rgba(30, 41, 59, 0.5)' },
          ticks: { color: '#64748b' }
        }
      },
      plugins: {
        legend: { labels: { color: '#e2e8f0', font: { size: 11 } } }
      }
    }
  });
}

function clearDRCData() {
  if (drcChartInstance) {
    drcChartInstance.data.labels = [];
    drcChartInstance.data.datasets[0].data = [];
    drcChartInstance.update();
  }
}

// 3. Run Simulation Logic
async function runSimulation() {
  const drug = document.getElementById('inputDrug').value;
  const tissue = document.getElementById('inputTissue').value;
  const dose = document.getElementById('inputDose').value;
  const antagonistDose = document.getElementById('inputAntagonist').value;
  const btn = document.getElementById('btnSimulate');

  btn.disabled = true;
  btn.innerText = 'Calculating Pharmacokinetics...';

  try {
    const res = await fetch('/api/simulate/dose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drug, dose, tissue, antagonistDose })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('readoutResponse').innerText = `${data.response_percent}%`;

      // Plot DRC Point
      if (drcChartInstance) {
        drcChartInstance.data.labels.push(`Dose: ${data.dose_mg}`);
        drcChartInstance.data.datasets[0].data.push(data.response_percent);
        drcChartInstance.update();
      }

      // Animate Kymograph Contraction Waveform
      animateKymographWave(data.kinetics);
    }
  } catch (e) {
    alert('Simulation error.');
  } finally {
    btn.disabled = false;
    btn.innerText = '⚡ Administer Dose & Record';
  }
}

function animateKymographWave(kinetics) {
  if (waveAnimationId) cancelAnimationFrame(waveAnimationId);
  const w = kymoCanvas.width;
  const h = kymoCanvas.height;
  const baselineY = h * 0.85;
  let step = 0;

  function renderFrame() {
    drawEmptyBaseline();

    kymoCtx.strokeStyle = '#38bdf8';
    kymoCtx.lineWidth = 2.5;
    kymoCtx.beginPath();
    kymoCtx.moveTo(0, baselineY);

    const pointsToDraw = kinetics.slice(0, step);
    const spacing = w / (kinetics.length || 60);

    pointsToDraw.forEach((pt, i) => {
      const x = i * spacing;
      // mm contraction to pixel height
      const y = baselineY - (parseFloat(pt.contraction_mm) * (h * 0.0075));
      kymoCtx.lineTo(x, y);
    });

    kymoCtx.stroke();

    if (step < kinetics.length) {
      step++;
      waveAnimationId = requestAnimationFrame(renderFrame);
    }
  }

  renderFrame();
}

// 4. Admin Desk Ledger Sync
async function fetchAdminLedger() {
  try {
    const res = await fetch('/api/admin/metrics');
    const data = await res.json();

    if (data.success) {
      document.getElementById('badgeAnimalsSaved').innerText = data.animals_saved.toLocaleString();
      document.getElementById('badgeActiveScholars').innerText = data.active_scholars;
      document.getElementById('pendingQueueBadge').innerText = `${data.pending_count} Pending Review`;

      const container = document.getElementById('adminTableBox');
      if (!data.pending.length) {
        container.innerHTML = `<div class="p-4 text-center text-slate-500">All student license orders verified and approved.</div>`;
        return;
      }

      const rows = data.pending.map((item, idx) => `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/20">
          <td class="py-2.5 font-mono text-slate-400">${item.order_id}</td>
          <td class="py-2.5 font-bold text-white">${item.username}</td>
          <td class="py-2.5 font-mono text-emerald-400">₹${item.amount}</td>
          <td class="py-2.5 font-mono text-slate-300">${item.utr}</td>
          <td class="py-2.5 text-right">
            <button onclick="approveDeskOrder('${item.order_id}')" class="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] cursor-pointer">
              ✓ Verify & Stack
            </button>
          </td>
        </tr>
      `).join('');

      container.innerHTML = `
        <table class="w-full text-left">
          <thead class="text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
            <tr><th>Order ID</th><th>Scholar</th><th>Amount</th><th>12-Digit UTR</th><th class="text-right">Action</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }
  } catch (e) {}
}

async function approveDeskOrder(orderId) {
  try {
    const res = await fetch('/api/admin/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, selected_tier: 'Gold-90Days' })
    });
    const data = await res.json();
    if (data.success) {
      fetchAdminLedger();
    }
  } catch (e) {}
}

window.addEventListener('DOMContentLoaded', () => {
  initKymoCanvas();
  initDRCChart();
  fetchAdminLedger();
});
