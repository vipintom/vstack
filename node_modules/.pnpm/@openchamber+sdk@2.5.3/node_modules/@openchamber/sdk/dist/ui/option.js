import { button, el, setAttr } from './dom.js';
import { icon } from './icons.js';
const optionId = (uid, id) => `${uid}-${id ?? ''}`;
export const createOption = (uid, role, spec, on) => {
    const node = button('oc-sdk-option');
    node.id = optionId(uid, spec.id);
    node.setAttribute('role', role);
    node.tabIndex = -1;
    node.disabled = Boolean(spec.disabled);
    if (role === 'option') {
        node.setAttribute('aria-selected', spec.selected ? 'true' : 'false');
    }
    node.dataset.destructive = spec.destructive ? 'true' : 'false';
    const label = el('span', 'oc-sdk-option-label');
    label.textContent = spec.label;
    node.append(label);
    if (spec.hint) {
        const hint = el('span', 'oc-sdk-option-hint');
        hint.textContent = spec.hint;
        node.append(hint);
    }
    if (role === 'option') {
        // The host's styles drop the selection fill only for options that carry the mark.
        node.dataset.mark = 'check';
        const check = el('span', 'oc-sdk-option-check');
        check.append(icon('check', 14));
        node.append(check);
    }
    node.addEventListener('pointerenter', on.hover);
    node.addEventListener('click', on.pick);
    return node;
};
/** Moves the `data-active` highlight and `aria-activedescendant`; scrolls the row into view. */
export const highlightOption = (container, focusOwner, uid, id) => {
    const target = optionId(uid, id);
    for (const child of Array.from(container.children)) {
        if (child instanceof HTMLElement && child.classList.contains('oc-sdk-option')) {
            child.dataset.active = child.id === target ? 'true' : 'false';
        }
    }
    setAttr(focusOwner, 'aria-activedescendant', id ? target : null);
    container.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
};
