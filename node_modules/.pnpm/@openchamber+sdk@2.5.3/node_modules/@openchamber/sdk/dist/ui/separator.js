import { el, ensureStyle, setText } from './dom.js';
import { UI_CSS } from './style.js';
export const mountSeparator = (root, initial = {}) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = el('div', 'oc-sdk oc-sdk-separator');
    node.setAttribute('role', 'separator');
    const label = el('span');
    node.append(label);
    root.append(node);
    const paint = () => {
        setText(label, props.label);
        label.hidden = !props.label;
        node.dataset.labeled = props.label ? 'true' : 'false';
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
