import { el, ensureStyle, setAttr, setText } from './dom.js';
import { UI_CSS } from './style.js';
/** Writes `data-tone` for toned colours; neutral removes it. */
export const applyTone = (node, tone) => {
    setAttr(node, 'data-tone', tone && tone !== 'neutral' ? tone : null);
};
export const mountBadge = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = el('span', 'oc-sdk oc-sdk-badge');
    root.append(node);
    const paint = () => {
        setText(node, props.label);
        applyTone(node, props.tone);
    };
    paint();
    return {
        update: (next) => {
            props = { ...props, ...next };
            paint();
        },
        dispose: () => {
            node.remove();
        },
    };
};
