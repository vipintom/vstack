let nextPopoverAnchorId = 0;
const isKeyboardEvent = (event) => 'key' in event;
/** Adds a bounded host popover preview to an extension-owned element. */
export const mountPopoverAnchor = (element, options) => {
    const document = element.ownerDocument;
    const window = document.defaultView;
    let timer = null;
    let activeId = null;
    let disposed = false;
    let ignoreNextFocus = false;
    let pointerActive = false;
    let focusActive = false;
    let observer = null;
    const previousExpanded = element.getAttribute('aria-expanded');
    const previousPopup = element.getAttribute('aria-haspopup');
    const previousLabel = element.getAttribute('aria-label');
    const ownsExpanded = previousExpanded === null;
    const clearTimer = () => {
        if (timer !== null)
            clearTimeout(timer);
        timer = null;
    };
    const removeActiveListeners = () => {
        document.removeEventListener('scroll', closeForAnchor, true);
        document.removeEventListener('pointerdown', closeForOutside, true);
        window?.removeEventListener('resize', closeForAnchor);
        observer?.disconnect();
        observer = null;
    };
    const close = (reason = 'closed', restoreFocus = false) => {
        const id = activeId;
        clearTimer();
        activeId = null;
        removeActiveListeners();
        element.removeAttribute('data-oc-popover-open');
        if (ownsExpanded)
            element.setAttribute('aria-expanded', 'false');
        if (id)
            void options.host.closePopover(id, reason).catch(() => undefined);
        if (restoreFocus) {
            ignoreNextFocus = true;
            element.focus();
            queueMicrotask(() => { ignoreNextFocus = false; });
        }
    };
    const closeForAnchor = () => close();
    const closeForOutside = (event) => {
        const target = event.target;
        // SAFETY: DOM pointer events target a Node; this avoids cross-realm constructors.
        if (target !== element && !element.contains(target))
            close();
    };
    const watchActive = () => {
        document.addEventListener('scroll', closeForAnchor, true);
        document.addEventListener('pointerdown', closeForOutside, true);
        window?.addEventListener('resize', closeForAnchor);
        observer = new MutationObserver(() => { if (!document.contains(element))
            close(); });
        observer.observe(document, { childList: true, subtree: true });
    };
    const reportAnchorActivity = () => {
        if (activeId)
            void options.host.setPopoverAnchorActive(activeId, pointerActive || focusActive).catch(() => undefined);
    };
    const open = (focus) => {
        clearTimer();
        if (disposed || activeId || !element.isConnected)
            return;
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0)
            return;
        const id = `oc-popover-${++nextPopoverAnchorId}`;
        let data;
        try {
            data = options.getData();
        }
        catch {
            return;
        }
        activeId = id;
        element.setAttribute('data-oc-popover-open', 'true');
        if (ownsExpanded)
            element.setAttribute('aria-expanded', 'true');
        watchActive();
        void options.host.openPopover({
            id,
            anchor: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            width: options.width,
            height: options.height,
            side: options.side,
            focus,
            data,
        }).catch(() => {
            if (activeId === id)
                close();
        });
    };
    const scheduleOpen = () => {
        if (!activeId && !disposed && timer === null)
            timer = setTimeout(() => open(false), 250);
    };
    const onPointerEnter = (event) => {
        if ('pointerType' in event && event.pointerType && event.pointerType !== 'mouse')
            return;
        pointerActive = true;
        if (activeId)
            reportAnchorActivity();
        else if (!ignoreNextFocus)
            scheduleOpen();
    };
    const onPointerLeave = (event) => {
        if ('pointerType' in event && event.pointerType && event.pointerType !== 'mouse')
            return;
        pointerActive = false;
        clearTimer();
        reportAnchorActivity();
    };
    const onFocus = () => {
        focusActive = true;
        if (activeId)
            reportAnchorActivity();
        else if (!ignoreNextFocus && element.matches(':focus-visible'))
            open(false);
    };
    const onFocusOut = () => {
        focusActive = false;
        reportAnchorActivity();
    };
    const onKeyDown = (event) => {
        if (!isKeyboardEvent(event))
            return;
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (activeId)
                close();
            open(true);
        }
        else if (event.key === 'Escape' && activeId) {
            event.preventDefault();
            close('escape', true);
        }
    };
    const unsubscribe = options.host.onPopoverClosed((event) => {
        if (event.id !== activeId)
            return;
        activeId = null;
        clearTimer();
        removeActiveListeners();
        element.removeAttribute('data-oc-popover-open');
        if (ownsExpanded)
            element.setAttribute('aria-expanded', 'false');
        if (event.reason === 'escape') {
            ignoreNextFocus = true;
            element.focus();
            queueMicrotask(() => { ignoreNextFocus = false; });
        }
    });
    element.setAttribute('aria-haspopup', 'dialog');
    if (ownsExpanded)
        element.setAttribute('aria-expanded', 'false');
    if (options.label)
        element.setAttribute('aria-label', options.label);
    element.addEventListener('pointerenter', onPointerEnter);
    // Crossing opaque iframe documents can omit an enter transition. A real
    // pointer move over this element still establishes a new hover intent.
    element.addEventListener('pointermove', onPointerEnter);
    element.addEventListener('pointerleave', onPointerLeave);
    element.addEventListener('focus', onFocus);
    element.addEventListener('focusout', onFocusOut);
    element.addEventListener('keydown', onKeyDown);
    return { dispose: () => {
            if (disposed)
                return;
            disposed = true;
            clearTimer();
            close();
            unsubscribe();
            element.removeAttribute('data-oc-popover-open');
            if (previousExpanded === null)
                element.removeAttribute('aria-expanded');
            if (previousPopup === null)
                element.removeAttribute('aria-haspopup');
            else
                element.setAttribute('aria-haspopup', previousPopup);
            if (options.label) {
                if (previousLabel === null)
                    element.removeAttribute('aria-label');
                else
                    element.setAttribute('aria-label', previousLabel);
            }
            element.removeEventListener('pointerenter', onPointerEnter);
            element.removeEventListener('pointermove', onPointerEnter);
            element.removeEventListener('pointerleave', onPointerLeave);
            element.removeEventListener('focus', onFocus);
            element.removeEventListener('focusout', onFocusOut);
            element.removeEventListener('keydown', onKeyDown);
        } };
};
