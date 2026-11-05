// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const HALLMARK_STAMP = `/* Hallmark · v2.0.0 · custom · idea: "A printed technical specification brought to screen: dense, scannable, reference-grade" · vibe: "technical, dense, precise, dark" · paper: dark / display: grotesk-heavy / accent: warm / hero: banner / posture: restrained */\n\n/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 · weakest: none — content density is the feature */\n`;

function hallmarkStampPlugin() {
  return {
    name: 'hallmark-stamp',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          chunk.source = HALLMARK_STAMP + chunk.source;
        }
      }
    },
  };
}

function hallmarkHtmlStamp() {
  return {
    name: 'hallmark-html-stamp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const htmlFiles = globSync('**/*.html', { cwd: dir, absolute: true });
        for (const file of htmlFiles) {
          let html = readFileSync(file, 'utf-8');
          if (!html.includes('Hallmark · v2.0.0')) {
            html = html.replace(/<style(\s[^>]*)?>/g, `<style$1>\n${HALLMARK_STAMP}`);
            writeFileSync(file, html);
          }
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://vipintom.github.io',
  base: '/vstack',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap(), hallmarkHtmlStamp()],
  vite: {
    plugins: [tailwind(), hallmarkStampPlugin()],
    resolve: {
      alias: {
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@data': path.resolve(__dirname, 'src/data'),
      },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});