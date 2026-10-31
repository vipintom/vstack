import { button, clearNode, el, ensureStyle, setText } from './dom.js';
import { icon } from './icons.js';
import { moveListSelection, navigationKey } from './navigation.js';
import { createOption, highlightOption } from './option.js';
import { openPopup } from './popup.js';
import { UI_CSS } from './style.js';
/** Case-insensitive substring match on label and id. Empty query keeps every option. */
export const filterSelectOptions = (options, query) => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
        return [...options];
    }
    return options.filter((option) => (option.label.toLowerCase().includes(needle) || option.id.toLowerCase().includes(needle)));
};
let selectCount = 0;
export const mountSelect = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const uid = `oc-sdk-select-${selectCount += 1}`;
    const wrap = el('div', 'oc-sdk oc-sdk-select');
    const caption = el('span', 'oc-sdk-field-label');
    caption.id = `${uid}-label`;
    const trigger = button('oc-sdk-trigger');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-labelledby', caption.id);
    const value = el('span', 'oc-sdk-trigger-value');
    trigger.append(value, icon('chevron', 14, 'oc-sdk-trigger-chevron'));
    wrap.append(caption, trigger);
    root.append(wrap);
    let query = '';
    let activeId = null;
    let closePopup = null;
    const popup = el('div', 'oc-sdk oc-sdk-popup');
    const searchSlot = el('div', 'oc-sdk-popup-search');
    const search = el('input', 'oc-sdk-input');
    search.type = 'text';
    search.autocomplete = 'off';
    searchSlot.append(search);
    const listbox = el('div');
    listbox.setAttribute('role', 'listbox');
    listbox.tabIndex = -1;
    popup.append(listbox);
    const visible = () => filterSelectOptions(props.options, props.searchable ? query : '');
    const focusOwner = () => (props.searchable ? search : listbox);
    const setActive = (id) => {
        activeId = id;
        highlightOption(listbox, focusOwner(), uid, id);
    };
    const paintOptions = () => {
        clearNode(listbox);
        const options = visible();
        if (options.length === 0) {
            const empty = el('div', 'oc-sdk-popup-empty');
            empty.textContent = 'No matches';
            listbox.append(empty);
        }
        for (const option of options) {
            listbox.append(createOption(uid, 'option', { ...option, selected: option.id === props.value }, {
                hover: () => setActive(option.id),
                pick: () => pick(option.id),
            }));
        }
        setActive(options.some((option) => option.id === activeId) ? activeId : options[0]?.id ?? null);
    };
    const close = () => {
        // Removing a focused row fires `focusout` synchronously from inside the disposer, and
        // that handler calls `close` again. Clearing the slot first makes the re-entry a no-op
        // instead of a second `popup.remove()` that throws before the pick reaches `onChange`.
        const dispose = closePopup;
        closePopup = null;
        dispose?.();
        query = '';
        search.value = '';
        trigger.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
        if (closePopup || props.disabled) {
            return;
        }
        activeId = props.value;
        search.placeholder = props.searchPlaceholder ?? 'Search';
        if (props.searchable)
            popup.prepend(searchSlot);
        else
            searchSlot.remove();
        paintOptions();
        closePopup = openPopup(wrap, trigger, popup, close);
        trigger.setAttribute('aria-expanded', 'true');
        focusOwner().focus();
    };
    const pick = (id) => {
        close();
        trigger.focus();
        if (id !== props.value)
            props.onChange(id);
    };
    const onTriggerClick = () => {
        if (closePopup)
            close();
        else
            open();
    };
    const onTriggerKey = (event) => {
        if (!closePopup && navigationKey(event)) {
            event.preventDefault();
            open();
        }
    };
    const onPopupKey = (event) => {
        const step = navigationKey(event);
        if (step) {
            event.preventDefault();
            setActive(moveListSelection(visible(), activeId, step));
        }
        else if (event.key === 'Enter') {
            event.preventDefault();
            if (activeId)
                pick(activeId);
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            close();
            trigger.focus();
        }
        else if (props.searchable && event.target !== search && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
            search.focus();
        }
    };
    const onSearchInput = () => {
        query = search.value;
        paintOptions();
    };
    const onFocusOut = (event) => {
        if (closePopup && !(event.relatedTarget instanceof Node && wrap.contains(event.relatedTarget)))
            close();
    };
    const paint = () => {
        setText(caption, props.label);
        caption.hidden = !props.label;
        const current = props.options.find((option) => option.id === props.value);
        setText(value, current?.label ?? props.placeholder ?? 'Select');
        value.dataset.empty = current ? 'false' : 'true';
        trigger.disabled = Boolean(props.disabled);
        if (closePopup)
            paintOptions();
    };
    trigger.addEventListener('click', onTriggerClick);
    trigger.addEventListener('keydown', onTriggerKey);
    popup.addEventListener('keydown', onPopupKey);
    search.addEventListener('input', onSearchInput);
    wrap.addEventListener('focusout', onFocusOut);
    paint();
    return {
        update: (next) => {
            props = { ...props, ...next };
            paint();
        },
        dispose: () => {
            close();
            trigger.removeEventListener('click', onTriggerClick);
            trigger.removeEventListener('keydown', onTriggerKey);
            popup.removeEventListener('keydown', onPopupKey);
            search.removeEventListener('input', onSearchInput);
            wrap.removeEventListener('focusout', onFocusOut);
            wrap.remove();
        },
    };
};
