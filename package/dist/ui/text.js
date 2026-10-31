import { clearNode, el, ensureStyle } from './dom.js';
import { UI_CSS } from './style.js';
const MARKDOWN_TOKEN = /(!?)\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
export const isHttpUrl = (value) => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    }
    catch {
        return false;
    }
};
/** Splits text into plain runs, `![alt](https://…)` images, and `[label](https://…)` links. Anything else stays text. */
export const splitTextMedia = (text) => {
    const parts = [];
    let last = 0;
    for (const match of text.matchAll(MARKDOWN_TOKEN)) {
        const index = match.index ?? 0;
        if (index > last) {
            parts.push({ kind: 'text', text: text.slice(last, index) });
        }
        const marker = match[1] ?? '';
        const label = (match[2] ?? '').trim();
        const href = match[3] ?? '';
        if (!isHttpUrl(href)) {
            parts.push({ kind: 'text', text: match[0] });
        }
        else if (marker === '!') {
            parts.push({ kind: 'image', src: href, alt: label });
        }
        else {
            parts.push({ kind: 'link', href, label: label || href });
        }
        last = index + match[0].length;
    }
    if (last < text.length) {
        parts.push({ kind: 'text', text: text.slice(last) });
    }
    return parts;
};
export const mountText = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = el('div', 'oc-sdk oc-sdk-text');
    root.append(node);
    const onClick = (event) => {
        if (!(event.target instanceof HTMLAnchorElement) || !props.onOpenUrl) {
            return;
        }
        event.preventDefault();
        props.onOpenUrl(event.target.href);
    };
    const paint = () => {
        clearNode(node);
        for (const part of splitTextMedia(props.text)) {
            if (part.kind === 'text') {
                node.append(document.createTextNode(part.text));
            }
            else if (part.kind === 'link') {
                const link = el('a');
                link.href = part.href;
                link.rel = 'noopener noreferrer';
                link.target = '_blank';
                link.textContent = part.label;
                node.append(link);
            }
            else {
                const img = el('img');
                img.src = part.src;
                img.alt = part.alt;
                img.loading = 'lazy';
                img.referrerPolicy = 'no-referrer';
                node.append(img);
            }
        }
    };
    node.addEventListener('click', onClick);
    paint();
    return {
        update: (next) => {
            props = { ...props, ...next };
            paint();
        },
        dispose: () => {
            node.removeEventListener('click', onClick);
            node.remove();
        },
    };
};
