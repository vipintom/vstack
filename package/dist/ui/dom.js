import { installGuestScrollbarActivity } from '../scrollbar-style.js';
const STYLE_ID = 'oc-sdk-ui-style';
export const clearNode = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};
export const ensureStyle = (css) => {
    const existing = document.getElementById(STYLE_ID);
    if (existing instanceof HTMLStyleElement) {
        if (existing.textContent !== css) {
            existing.textContent = css;
        }
        return;
    }
    // Kit pages previewed outside the host still get scroll-time scrollbars.
    installGuestScrollbarActivity(document);
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
};
export const el = (tag, className) => {
    const node = document.createElement(tag);
    if (className) {
        node.className = className;
    }
    return node;
};
export const button = (className) => {
    const node = el('button', className);
    node.type = 'button';
    return node;
};
/** Writes text only when it changed so a repaint does not disturb selection or layout. */
export const setText = (node, text) => {
    const next = text ?? '';
    if (node.textContent !== next) {
        node.textContent = next;
    }
};
/** Sets or removes an attribute depending on whether a value is present. */
export const setAttr = (node, name, value) => {
    if (value === undefined || value === null || value === '') {
        node.removeAttribute(name);
    }
    else if (node.getAttribute(name) !== value) {
        node.setAttribute(name, value);
    }
};
/** Runs `handler` on a pointer press outside `node`. Returns the disposer. */
export const onOutsideClick = (node, handler) => {
    const listener = (event) => {
        if (event.target instanceof Node && node.contains(event.target)) {
            return;
        }
        handler();
    };
    document.addEventListener('pointerdown', listener, true);
    return () => {
        document.removeEventListener('pointerdown', listener, true);
    };
};
