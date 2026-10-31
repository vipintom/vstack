import { el, ensureStyle, setText } from './dom.js';
import { UI_CSS } from './style.js';
export const mountSpinner = (root, initial = {}) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = el('span', 'oc-sdk oc-sdk-spinner');
    node.setAttribute('role', 'status');
    const ring = el('span', 'oc-sdk-spinner-ring');
    ring.setAttribute('aria-hidden', 'true');
    const label = el('span');
    node.append(ring, label);
    root.append(node);
    const paint = () => {
        node.dataset.size = props.size ?? 'default';
        setText(label, props.label);
        label.hidden = !props.label;
        node.setAttribute('aria-label', props.label ?? 'Loading');
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
