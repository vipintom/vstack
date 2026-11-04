import fs from 'fs';
import path from 'path';

// Ensure dist/vstack exists
const distVstack = path.join('dist', 'vstack');
if (!fs.existsSync(distVstack)) {
  fs.mkdirSync(distVstack, { recursive: true });
}

// Files to copy from public/ to dist/vstack/
const staticFiles = [
  { src: 'public/llms.txt', dest: 'dist/vstack/llms.txt' },
  { src: 'public/robots.txt', dest: 'dist/vstack/robots.txt' },
];

for (const { src, dest } of staticFiles) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    // Create empty files if they don't exist
    fs.writeFileSync(dest, '');
    console.log(`Created empty ${dest} (source ${src} not found)`);
  }
}

// Create .well-known/security.txt
const wellKnownDir = path.join('dist', 'vstack', '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}
const securityTxt = `# Security contact for vstack
Contact: https://github.com/vipintom/vstack/security
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: en
Canonical: https://vipintom.github.io/vstack/.well-known/security.txt
`;
fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxt);
console.log(`Created dist/vstack/.well-known/security.txt`);

// Ensure Pagefind output is also accessible at /vstack/_pagefind/
const pagefindSrc = path.join('dist', '_pagefind');
const pagefindDest = path.join('dist', 'vstack', '_pagefind');
if (fs.existsSync(pagefindSrc)) {
  // Copy or symlink
  if (fs.existsSync(pagefindDest)) {
    fs.rmSync(pagefindDest, { recursive: true, force: true });
  }
  fs.cpSync(pagefindSrc, pagefindDest, { recursive: true });
  console.log(`Copied ${pagefindSrc} -> ${pagefindDest}`);
}