import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
const sources=await Promise.all(['src/data/projects.ts','src/data/services.ts'].map(p=>readFile(p,'utf8')));
const ids=[...new Set(sources.join('\n').matchAll(/px\((\d+)/g).map(m=>m[1]))];
await mkdir('public/images/reference',{recursive:true});
const tasks=ids.flatMap(id=>[640,960,1600].map(w=>({id,w})));
let i=0;
await Promise.all(Array.from({length:4},async()=>{while(i<tasks.length){const {id,w}=tasks[i++];try { await stat(`public/images/reference/${id}-${w}.jpg`); continue; } catch {} const url=`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;try{const r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error(String(r.status));const data=Buffer.from(await r.arrayBuffer());await writeFile(`public/images/reference/${id}-${w}.jpg`,data);console.log(id,w,data.length)}catch(e){console.log('FAILED',id,w,e.message);process.exitCode=1}}}));
