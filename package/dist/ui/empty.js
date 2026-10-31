import { mountButton } from './button.js';
import { el, ensureStyle, setText } from './dom.js';
import { UI_CSS } from './style.js';
export const mountEmpty = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const shell = el('div', 'oc-sdk oc-sdk-empty');
    const title = el('h2', 'oc-sdk-empty-title');
    const body = el('p', 'oc-sdk-empty-body');
    const slot = el('div', 'oc-sdk-empty-action');
    shell.append(title, body, slot);
    root.append(shell);
    let action = null;
    const paint = () => {
        setText(title, props.title);
        setText(body, props.body);
        body.hidden = !props.body;
        slot.hidden = !props.action;
        if (!props.action) {
            action?.dispose();
            action = null;
            return;
        }
        const next = { label: props.action.label, onClick: props.action.onClick };
        if (action) {
            action.update(next);
        }
        else {
            action = mountButton(slot, { ...next, variant: 'outline', size: 'sm' });
        }
    };
    paint();
    return {
        update: (next) => {
            props = { ...props, ...next };
            paint();
        },
        dispose: () => {
            action?.dispose();
            action = null;
            shell.remove();
        },
    };
};
