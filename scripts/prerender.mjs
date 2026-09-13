import { createServer } from 'vite';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
try {
  const { render, pages } = await server.ssrLoadModule('/scripts/render.tsx');
  const assets = await readdir('dist/assets');
  const preloads = assets.filter(name => /^(inter|plus-jakarta).*woff2$/.test(name)).map(name => `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin />`).join('');
  const template = (await readFile('dist/index.html', 'utf8')).replace('</head>', preloads+'</head>');
  for (const page of pages) {
    const url = `https://websiteku.id${page.path === '/' ? '/' : page.path}`;
    let html = template.replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/?>)/g, `$1${escape(page.description)}$2`)
      .replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/g, `$1${escape(page.title)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
    if (page.path === '/404') html = html.replace('</head>', '<meta name="robots" content="noindex, follow" /></head>');
    const file = page.path === '/' ? 'dist/index.html' : page.path === '/404' ? 'dist/404.html' : path.join('dist', page.path.slice(1), 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`Pre-rendered ${page.path}`);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p.path !== '/404' && p.path !== '/visual').map(p=>`  <url><loc>https://websiteku.id${p.path}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile('dist/sitemap.xml', sitemap);
  await writeFile('public/sitemap.xml', sitemap);
} finally { await server.close(); }
