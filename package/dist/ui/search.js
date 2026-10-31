import { button, el, ensureStyle, setAttr } from './dom.js';
import { icon } from './icons.js';
import { UI_CSS } from './style.js';
export const mountSearchField = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const wrap = el('div', 'oc-sdk oc-sdk-search');
    const input = el('input', 'oc-sdk-input');
    input.type = 'text';
    input.spellcheck = false;
    input.autocomplete = 'off';
    input.setAttribute('role', 'searchbox');
    const clear = button('oc-sdk-search-clear');
    clear.append(icon('close', 14));
    clear.tabIndex = -1;
    wrap.append(icon('search', 16, 'oc-sdk-search-icon'), input, clear);
    root.append(wrap);
    const paint = () => {
        const placeholder = props.placeholder ?? 'Search';
        setAttr(input, 'placeholder', placeholder);
        input.setAttribute('aria-label', props.label ?? placeholder);
        clear.setAttribute('aria-label', 'Clear search');
        if (input.value !== props.value) {
            input.value = props.value;
        }
        wrap.dataset.active = props.value.trim() === '' ? 'false' : 'true';
    };
    const clearValue = () => {
        if (props.value !== '') {
            props.onChange('');
        }
        input.focus();
    };
    const onInput = () => {
        props.onChange(input.value);
    };
    const onKeyDown = (event) => {
        if (event.key === 'Escape' && input.value !== '') {
            event.preventDefault();
            clearValue();
        }
    };
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeyDown);
    clear.addEventListener('click', clearValue);
    paint();
    if (props.autofocus) {
        input.focus();
    }
    return {
        update: (next) => {
            props = { ...props, ...next };
            paint();
        },
        dispose: () => {
            input.removeEventListener('input', onInput);
            input.removeEventListener('keydown', onKeyDown);
            clear.removeEventListener('click', clearValue);
            wrap.remove();
        },
    };
};
