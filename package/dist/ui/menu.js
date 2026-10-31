import { mountButton } from './button.js';
import { clearNode, el, ensureStyle } from './dom.js';
import { moveListSelection, navigationKey } from './navigation.js';
import { createOption, highlightOption } from './option.js';
import { openPopup } from './popup.js';
import { UI_CSS } from './style.js';
const actions = (items) => (items.filter((item) => !('separator' in item)));
let menuCount = 0;
export const mountMenu = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const uid = `oc-sdk-menu-${menuCount += 1}`;
    const wrap = el('div', 'oc-sdk oc-sdk-menu');
    root.append(wrap);
    const popup = el('div', 'oc-sdk oc-sdk-popup');
    popup.setAttribute('role', 'menu');
    popup.tabIndex = -1;
    let closePopup = null;
    let activeId = null;
    const trigger = mountButton(wrap, {
        label: props.label,
        variant: props.variant,
        size: props.size,
        onClick: () => {
            if (closePopup)
                close();
            else
                open();
        },
    });
    const triggerNode = wrap.querySelector('button');
    triggerNode?.setAttribute('aria-haspopup', 'menu');
    const setActive = (id) => {
        activeId = id;
        highlightOption(popup, popup, uid, id);
    };
    const paintItems = () => {
        clearNode(popup);
        for (const item of props.items) {
            if ('separator' in item) {
                const line = el('div', 'oc-sdk-separator');
                line.dataset.labeled = 'false';
                popup.append(line);
                continue;
            }
            popup.append(createOption(uid, 'menuitem', item, {
                hover: () => setActive(item.id),
                pick: () => pick(item.id),
            }));
        }
        setActive(actions(props.items).some((item) => item.id === activeId) ? activeId : null);
    };
    const close = () => {
        // Removing a focused row fires `focusout` synchronously from inside the disposer, and
        // that handler calls `close` again. Clearing the slot first makes the re-entry a no-op
        // instead of a second `popup.remove()` that throws before the pick reaches `onChange`.
        const dispose = closePopup;
        closePopup = null;
        dispose?.();
        activeId = null;
        triggerNode?.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
        if (closePopup || !triggerNode) {
            return;
        }
        paintItems();
        closePopup = openPopup(wrap, triggerNode, popup, close);
        triggerNode.setAttribute('aria-expanded', 'true');
        popup.focus();
    };
    const pick = (id) => {
        close();
        triggerNode?.focus();
        props.onSelect(id);
    };
    const onPopupKey = (event) => {
        const step = navigationKey(event);
        if (step) {
            event.preventDefault();
            setActive(moveListSelection(actions(props.items), activeId, step));
        }
        else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (activeId)
                pick(activeId);
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            close();
            triggerNode?.focus();
        }
    };
    const onFocusOut = (event) => {
        if (closePopup && !(event.relatedTarget instanceof Node && wrap.contains(event.relatedTarget)))
            close();
    };
    popup.addEventListener('keydown', onPopupKey);
    wrap.addEventListener('focusout', onFocusOut);
    return {
        update: (next) => {
            props = { ...props, ...next };
            trigger.update({ label: props.label, variant: props.variant, size: props.size });
            if (closePopup)
                paintItems();
        },
        dispose: () => {
            close();
            popup.removeEventListener('keydown', onPopupKey);
            wrap.removeEventListener('focusout', onFocusOut);
            trigger.dispose();
            wrap.remove();
        },
    };
};
