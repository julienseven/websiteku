import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try {
  await mkdir('public/images/projects',{recursive:true});
  const p=await browser.newPage({viewport:{width:1600,height:900}});
  await p.goto('https://unix-property.vercel.app/',{waitUntil:'networkidle',timeout:45000});
  await p.waitForTimeout(1800);
  await p.screenshot({path:'public/images/projects/unix-property-desktop.jpg',quality:85});
  await p.getByText('Listing pilihan',{exact:true}).evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-160,behavior:'instant'}));
  await p.waitForTimeout(2000);
  await p.evaluate(()=>Promise.all([...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}).map(i=>i.decode().catch(()=>{}))));
  await p.screenshot({path:'public/images/projects/unix-property-listings.jpg',quality:85});
  await p.setViewportSize({width:390,height:844});
  await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await p.waitForTimeout(1800);
  await p.screenshot({path:'public/images/projects/unix-property-mobile.jpg',quality:85});
  console.log('Captured public concept after images and entrance animations settled.');
} finally {await browser.close()}
