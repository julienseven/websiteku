import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});const page=await context.newPage();const results=[];
try{for(const route of ['/','/work','/services','/pricing','/about','/contact','/work/unix-property','/visual']){await page.goto('http://127.0.0.1:4173'+route);await page.evaluate(()=>document.fonts.ready);const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({route,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});console.log(JSON.stringify(results.at(-1)));}await writeFile('artifacts/audit/accessibility.json',JSON.stringify(results,null,2));}finally{await browser.close()}
