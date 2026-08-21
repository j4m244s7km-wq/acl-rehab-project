function startTracker(){
 const a=parseFloat(document.getElementById('injured').value);
 const b=parseFloat(document.getElementById('healthy').value);
 const r=document.getElementById('result');
 if(!isFinite(a)||!isFinite(b)||a<0||b<=0){
   r.textContent='請輸入有效數值，未受傷側必須大於 0。';
   return;
 }
 const payload={injured:a,healthy:b,date:new Date().toISOString().slice(0,10),test:'單腳跳距離'};
 sessionStorage.setItem('aclStartData',JSON.stringify(payload));
 window.location.href='tracker.html?from=home';
}
function calcLSI(){startTracker()}