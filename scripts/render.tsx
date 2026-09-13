import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from '../src/App';
import { dictionaries } from '../src/lib/i18n';
import { projects } from '../src/data/projects';

const t = (key: string) => dictionaries.id[key];
export const pages = [
  { path: '/', title: t('seo.home.title'), description: t('seo.home.description') },
  ...['work', 'services', 'pricing', 'about', 'contact', 'visual'].map(page => ({
    path: `/${page}`, title: `${t(`nav.${page}`)} | Websiteku`, description: t(`seo.${page}.description`),
  })),
  ...projects.map(project => ({ path: `/work/${project.slug}`, title: `${project.title} | Websiteku`, description: project.description })),
  { path: '/404', title: '404 | Websiteku', description: t('notFound.heading') },
];
export function render(path: string) {
  return renderToString(<StaticRouter location={path}><AppContent /></StaticRouter>);
}
