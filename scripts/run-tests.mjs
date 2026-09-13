import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const owned=[];
async function ready(url){try{return (await fetch(url,{signal:AbortSignal.timeout(1000)})).ok}catch{return false}}
async function ensure(url,args,env={}){if(await ready(url))return;const child=spawn(process.execPath,args,{env:{...process.env,...env},stdio:'inherit',windowsHide:true});owned.push(child);for(let i=0;i<120;i++){if(await ready(url))return;if(child.exitCode!==null)throw Error(`Server exited with ${child.exitCode}`);await delay(500)}throw Error(`Server did not start: ${url}`)}
try{await ensure('http://127.0.0.1:4173',['scripts/serve.mjs']);await ensure('http://127.0.0.1:5174',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5174'],{VITE_CONTACT_ENDPOINT:'/__audit/enquiry'});const child=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{stdio:'inherit',windowsHide:true});process.exitCode=await new Promise(resolve=>{child.on('exit',code=>resolve(code??1));child.on('error',()=>resolve(1))});}finally{for(const child of owned)child.kill();}
