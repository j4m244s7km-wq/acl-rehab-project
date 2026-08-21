function startTracker(){
  const a = parseFloat(document.getElementById('injured').value);
  const b = parseFloat(document.getElementById('healthy').value);
  const r = document.getElementById('result');

  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b <= 0) {
    r.textContent = '請輸入有效數值，未受傷側必須大於 0。';
    return;
  }

  const params = new URLSearchParams({
    injured: String(a),
    healthy: String(b),
    date: new Date().toISOString().slice(0,10),
    test: '單腳跳距離'
  });

  window.location.assign('./tracker.html?' + params.toString());
}

function calcLSI(){
  startTracker();
}
