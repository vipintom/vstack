import { button, ensureStyle, setText } from './dom.js';
import { UI_CSS } from './style.js';
const ring = () => {
    const spinner = document.createElement('span');
    spinner.className = 'oc-sdk-spinner-ring';
    spinner.setAttribute('aria-hidden', 'true');
    return spinner;
};
export const mountButton = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = button('oc-sdk oc-sdk-btn');
    const spinner = ring();
    const label = document.createElement('span');
    node.append(label);
    root.append(node);
    const paint = () => {
        node.dataset.variant = props.variant ?? 'default';
        node.dataset.size = props.size ?? 'default';
        node.disabled = Boolean(props.disabled) || Boolean(props.loading);
        node.dataset.loading = props.loading ? 'true' : 'false';
        node.setAttribute('aria-busy', props.loading ? 'true' : 'false');
        if (props.loading && spinner.parentNode !== node) {
            node.prepend(spinner);
        }
        else if (!props.loading && spinner.parentNode === node) {
            spinner.remove();
        }
        setText(label, props.label);
    };
    const onClick = () => {
        if (props.disabled || props.loading) {
            return;
        }
        props.onClick();
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
