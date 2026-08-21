const KEY='aclTrackerRecordsV1';
function getRecords(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
function saveRecords(x){localStorage.setItem(KEY,JSON.stringify(x));render()}
function demo(){
 document.getElementById('date').value=new Date().toISOString().slice(0,10);
 document.getElementById('injured').value=162;
 document.getElementById('healthy').value=180;
}
function addRecord(){
 const date=document.getElementById('date').value;
 const test=document.getElementById('test').value;
 const injured=parseFloat(document.getElementById('injured').value);
 const healthy=parseFloat(document.getElementById('healthy').value);
 if(!date||!isFinite(injured)||!isFinite(healthy)||injured<0||healthy<=0){alert('請輸入日期與有效的左右側數值。');return}
 const lsi=injured/healthy*100;
 const arr=getRecords();
 arr.push({id:Date.now(),date,test,injured,healthy,lsi});
 arr.sort((a,b)=>a.date.localeCompare(b.date));
 saveRecords(arr);
}
function removeRecord(id){saveRecords(getRecords().filter(x=>x.id!==id))}
function clearRecords(){if(confirm('確定要清除這台裝置上的追蹤紀錄嗎？'))saveRecords([])}
function render(){
 const arr=getRecords(), table=document.getElementById('records'), empty=document.getElementById('empty'), body=table.querySelector('tbody'), summary=document.getElementById('summary');
 body.innerHTML='';
 if(!arr.length){table.hidden=true;empty.hidden=false;summary.textContent='';return}
 table.hidden=false;empty.hidden=true;
 arr.forEach(x=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${x.date}</td><td>${x.test}</td><td>${x.injured}</td><td>${x.healthy}</td><td><strong>${x.lsi.toFixed(1)}%</strong></td><td><button onclick="removeRecord(${x.id})">刪除</button></td>`;
  body.appendChild(tr);
 });
 if(arr.length>=2){
  const first=arr[0].lsi,last=arr[arr.length-1].lsi,d=last-first;
  summary.textContent=`從第一筆到最新一筆，LSI 變化 ${d>=0?'+':''}${d.toFixed(1)} 個百分點。這只描述紀錄趨勢，不代表康復程度或回場許可。`;
 }else summary.textContent=`目前 LSI 為 ${arr[0].lsi.toFixed(1)}%。新增不同日期的相同測試後，就能比較趨勢。`;
}
render();