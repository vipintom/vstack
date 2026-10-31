import { button, el, ensureStyle, setText } from './dom.js';
import { icon } from './icons.js';
import { UI_CSS } from './style.js';
const mountToggle = (root, initial, role) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = button('oc-sdk oc-sdk-check');
    node.setAttribute('role', role);
    const control = el('span', role === 'switch' ? 'oc-sdk-check-thumb' : 'oc-sdk-check-box');
    if (role === 'checkbox') {
        control.append(icon('check', 12));
    }
    const text = el('span', 'oc-sdk-check-text');
    const label = el('span', 'oc-sdk-check-label');
    const description = el('span', 'oc-sdk-check-desc');
    text.append(label, description);
    node.append(control, text);
    root.append(node);
    const paint = () => {
        node.setAttribute('aria-checked', props.checked ? 'true' : 'false');
        node.disabled = Boolean(props.disabled);
        setText(label, props.label);
        setText(description, props.description);
        description.hidden = !props.description;
    };
    const onClick = () => {
        if (!props.disabled) {
            props.onChange(!props.checked);
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
export const mountCheckbox = (root, initial) => (mountToggle(root, initial, 'checkbox'));
export const mountSwitch = (root, initial) => (mountToggle(root, initial, 'switch'));
