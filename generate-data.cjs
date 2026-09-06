// Build-time only; the QML runtime consumes a compact, offline month table.
const fs = require('node:fs');
const fmt = new Intl.DateTimeFormat('en-u-ca-chinese', {year:'numeric',month:'numeric',day:'numeric',timeZone:'UTC'});
const rows=[];
for(let t=Date.UTC(1899,0,1);t<=Date.UTC(2101,2,1);t+=86400000){
 const p=Object.fromEntries(fmt.formatToParts(new Date(t)).map(x=>[x.type,x.value]));
 if(+p.day===1) rows.push([t/86400000,+p.relatedYear,parseInt(p.month),p.month.includes('bis')?1:0]);
}
fs.writeFileSync(__dirname+'/LunarData.js','// Generated with Node '+process.version+', ICU '+process.versions.icu+'. UTC Gregorian civil dates.\nvar months = '+JSON.stringify(rows)+'\n');
