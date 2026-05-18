const simCountInput = document.getElementById('sim-count');
const simCountLabel = document.getElementById('sim-count-label');
const simSpeedInput = document.getElementById('sim-speed');
const simTypeSelect = document.getElementById('sim-type');
const simStartButton = document.getElementById('sim-start');
const simStopButton = document.getElementById('sim-stop');
const simCanvas = document.getElementById('sim-chart');
const simCtx = simCanvas.getContext('2d');
let simAnimation = null;

const bayesPrior = document.getElementById('bayes-prior');
const bayesSens = document.getElementById('bayes-sens');
const bayesSpec = document.getElementById('bayes-spec');
const bayesCount = document.getElementById('bayes-count');
const bayesUpdate = document.getElementById('bayes-update');
const bayesResult = document.getElementById('bayes-result');

const cltDist = document.getElementById('clt-dist');
const cltSampleSize = document.getElementById('clt-sample-size');
const cltSampleLabel = document.getElementById('clt-sample-label');
const cltTrials = document.getElementById('clt-trials');
const cltTrialsLabel = document.getElementById('clt-trials-label');
const cltRun = document.getElementById('clt-run');
const cltCanvas = document.getElementById('clt-chart');
const cltCtx = cltCanvas.getContext('2d');

const hypMu0 = document.getElementById('hyp-mu0');
const hypXbar = document.getElementById('hyp-xbar');
const hypS = document.getElementById('hyp-s');
const hypN = document.getElementById('hyp-n');
const hypAlpha = document.getElementById('hyp-alpha');
const hypTest = document.getElementById('hyp-test');
const hypResult = document.getElementById('hyp-result');

const montyCount = document.getElementById('monty-count');
const montyRun = document.getElementById('monty-run');
const montyResult = document.getElementById('monty-result');
const birthdayN = document.getElementById('birthday-n');
const birthdayLabel = document.getElementById('birthday-label');
const birthdayResult = document.getElementById('birthday-result');
const stpMax = document.getElementById('stp-max');
const stpLabel = document.getElementById('stp-label');
const stpResult = document.getElementById('stp-result');

function drawHistogram(ctx, labels, values, title) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...values, 1);
  const margin = 32;
  const barWidth = (width - margin * 2) / values.length;
  ctx.fillStyle = '#1d4ed8';
  values.forEach((val, i) => {
    const barHeight = (height - margin * 2) * (val / max);
    ctx.fillRect(margin + i * barWidth + 6, height - margin - barHeight, barWidth - 12, barHeight);
  });
  ctx.fillStyle = '#0f172a';
  ctx.font = '16px sans-serif';
  ctx.fillText(title, margin, 22);
  ctx.font = '12px sans-serif';
  labels.forEach((label, i) => {
    if (values.length <= 10 || i % Math.ceil(values.length / 10) === 0) {
      ctx.fillText(label, margin + i * barWidth + 6, height - 10);
    }
  });
}

function updateSimCountLabel() {
  simCountLabel.textContent = simCountInput.value;
}

function runSimulation() {
  const count = Number(simCountInput.value);
  const speed = Number(simSpeedInput.value);
  const type = simTypeSelect.value;
  const values = type === 'dice' ? [0,0,0,0,0,0] : [0,0];
  let current = 0;
  if (simAnimation) cancelAnimationFrame(simAnimation);

  function step() {
    const batch = Math.min(Math.max(1, Math.floor(count / 100 / speed)), count - current);
    for (let i = 0; i < batch; i += 1) {
      if (type === 'dice') {
        values[Math.floor(Math.random() * 6)] += 1;
      } else {
        values[Math.random() < 0.5 ? 0 : 1] += 1;
      }
      current += 1;
      if (current >= count) break;
    }
    const labels = type === 'dice' ? ['1','2','3','4','5','6'] : ['正面','反面'];
    drawHistogram(simCtx, labels, values, `模擬進度：${current}/${count}`);
    if (current < count) {
      simAnimation = requestAnimationFrame(step);
    }
  }
  simAnimation = requestAnimationFrame(step);
}

function stopSimulation() {
  if (simAnimation) {
    cancelAnimationFrame(simAnimation);
    simAnimation = null;
  }
}

function updateBayes() {
  const prior = Number(bayesPrior.value);
  const sens = Number(bayesSens.value);
  const spec = Number(bayesSpec.value);
  const pos = Number(bayesCount.value);
  const neg = 1 - spec;
  const evidence = sens * prior + neg * (1 - prior);
  const posterior = evidence > 0 ? (sens * prior) / evidence : 0;
  const description = `當疾病盛行率為 ${prior.toFixed(2)}、敏感度為 ${sens.toFixed(2)}、特異度為 ${spec.toFixed(2)} 時，陽性檢測的陽性預測值為 ${posterior.toFixed(3)}。`;
  const message = `後驗機率 P(疾病|陽性) = ${posterior.toFixed(3)}。
  若疫情少見，陽性結果仍可能有大量假陽性。`;
  bayesResult.innerHTML = `<strong>結果</strong><p>${description}</p><p>${message}</p>`;
}

function sampleDistribution(dist) {
  if (dist === 'uniform') return Math.random();
  if (dist === 'exponential') return -Math.log(1 - Math.random());
  const x = Math.random() * 2 - 1;
  return x * x * x + 1.5;
}

function runClt() {
  const dist = cltDist.value;
  const n = Number(cltSampleSize.value);
  const trials = Number(cltTrials.value);
  const means = [];
  for (let i = 0; i < trials; i += 1) {
    let total = 0;
    for (let j = 0; j < n; j += 1) {
      total += sampleDistribution(dist);
    }
    means.push(total / n);
  }
  const min = Math.min(...means);
  const max = Math.max(...means);
  const bins = 20;
  const counts = Array(bins).fill(0);
  const step = (max - min) / bins || 1;
  means.forEach((value) => {
    const index = Math.min(bins - 1, Math.floor((value - min) / step));
    counts[index] += 1;
  });
  const labels = counts.map((_, i) => (min + step * i).toFixed(2));
  drawHistogram(cltCtx, labels, counts, `樣本平均值分佈 (n=${n}, ${trials} 次)`);
}

function computeHypothesis() {
  const mu0 = Number(hypMu0.value);
  const xbar = Number(hypXbar.value);
  const s = Number(hypS.value);
  const n = Number(hypN.value);
  const alpha = Number(hypAlpha.value);
  const se = s / Math.sqrt(n);
  const z = (xbar - mu0) / se;
  const p = 2 * (1 - normalCdf(Math.abs(z)));
  const zCritical = inverseNormal(1 - alpha / 2);
  const reject = Math.abs(z) > zCritical;
  const result = `<p>z 值 = ${z.toFixed(3)}，雙尾 p-value = ${p.toFixed(4)}。</p><p>顯著水準 α=${alpha}，臨界值 |z|>${zCritical.toFixed(3)}。</p><p>結論：${reject ? '<strong>拒絕虛無假設</strong>' : '<strong>無法拒絕虛無假設</strong>'}。</p>`;
  const explanation = `<p>注意：p-value 不是虛無假設為真的機率，而是在虛無假設成立時觀測到資料的機率。</p>`;
  hypResult.innerHTML = result + explanation;
}

function normalCdf(x) {
  return (1 + erf(x / Math.sqrt(2))) / 2;
}

function erf(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p =  0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t) + a3) * t + a2) * t * a1 * Math.exp(-x * x);
  return sign * y;
}

function inverseNormal(p) {
  const a1 = -39.6968302866538;
  const a2 = 220.946098424521;
  const a3 = -275.928510446969;
  const a4 = 138.357751867269;
  const a5 = -30.6647980661472;
  const a6 = 2.50662827745924;
  const b1 = -54.4760987982241;
  const b2 = 161.585836858041;
  const b3 = -155.698979859887;
  const b4 = 66.8013118877197;
  const b5 = -13.2806815528857;
  const c1 = -0.00778489400243029;
  const c2 = -0.322396458041136;
  const c3 = -2.40075827716184;
  const c4 = -2.54973253934373;
  const c5 = 4.37466414146497;
  const c6 = 2.93816398269878;
  const d1 = 0.00778469570904146;
  const d2 = 0.32246712907004;
  const d3 = 2.445134137143;
  const d4 = 3.75440866190742;
  let q, r;
  if (p < 0 || p > 1) return NaN;
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (p < 0.02425) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
           ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  if (p > 1 - 0.02425) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  q = p - 0.5;
  r = q * q;
  return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
         (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
}

function runMontyHall() {
  const n = Number(montyCount.value);
  let stayWins = 0;
  let switchWins = 0;
  for (let i = 0; i < n; i += 1) {
    const prize = Math.floor(Math.random() * 3);
    const choice = Math.floor(Math.random() * 3);
    const reveal = [0,1,2].find((door) => door !== choice && door !== prize);
    const switchChoice = [0,1,2].find((door) => door !== choice && door !== reveal);
    if (choice === prize) stayWins += 1;
    if (switchChoice === prize) switchWins += 1;
  }
  montyResult.innerHTML = `模擬 ${n} 次：不換門勝率 ${(stayWins/n).toFixed(3)}，換門勝率 ${(switchWins/n).toFixed(3)}。`;
}

function updateBirthday() {
  const n = Number(birthdayN.value);
  let prob = 1;
  for (let i = 0; i < n; i += 1) {
    prob *= (365 - i) / 365;
  }
  const result = 1 - prob;
  birthdayLabel.textContent = n;
  birthdayResult.textContent = `至少兩人同日生日的機率約為 ${(result * 100).toFixed(2)}%。`;
}

function updateStPetersburg() {
  const max = Number(stpMax.value);
  let expected = 0;
  for (let k = 1; k <= max; k += 1) {
    expected += Math.pow(2, k - 1) / Math.pow(2, k);
  }
  const truncated = expected.toFixed(3);
  stpResult.innerHTML = `當銅板最多擲 ${max} 次時，理論期望值約為 ${truncated} 元。<br>實際上若沒上限，期望值趨近無限大，但大多數人願意支付的金額仍是低數字，原因在於高回報機率極低。`;
  stpLabel.textContent = max;
}

simCountInput.addEventListener('input', updateSimCountLabel);
simStartButton.addEventListener('click', runSimulation);
simStopButton.addEventListener('click', stopSimulation);
bayesUpdate.addEventListener('click', updateBayes);
cltSampleSize.addEventListener('input', () => { cltSampleLabel.textContent = cltSampleSize.value; });
cltTrials.addEventListener('input', () => { cltTrialsLabel.textContent = cltTrials.value; });
cltRun.addEventListener('click', runClt);
hypTest.addEventListener('click', computeHypothesis);
montyRun.addEventListener('click', runMontyHall);
birthdayN.addEventListener('input', updateBirthday);
stpMax.addEventListener('input', updateStPetersburg);

updateSimCountLabel();
updateBayes();
updateBirthday();
updateStPetersburg();
runClt();
