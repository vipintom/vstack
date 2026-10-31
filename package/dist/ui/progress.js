import { applyTone } from './badge.js';
import { el, ensureStyle, setText } from './dom.js';
import { UI_CSS } from './style.js';
export const clampProgress = (value) => (Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0);
export const mountProgress = (root, initial) => {
    ensureStyle(UI_CSS);
    let props = initial;
    const node = el('div', 'oc-sdk oc-sdk-progress');
    const caption = el('div', 'oc-sdk-progress-label');
    const label = el('span');
    const percent = el('span');
    caption.append(label, percent);
    const track = el('div', 'oc-sdk-progress-track');
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    const fill = el('div', 'oc-sdk-progress-fill');
    track.append(fill);
    node.append(caption, track);
    root.append(node);
    const paint = () => {
        const value = clampProgress(props.value);
        applyTone(fill, props.tone);
        fill.style.transform = `scaleX(${value / 100})`;
        track.setAttribute('aria-valuenow', String(value));
        if (props.label)
            track.setAttribute('aria-label', props.label);
        else
            track.removeAttribute('aria-label');
        setText(label, props.label);
        setText(percent, `${value}%`);
        caption.hidden = !props.label;
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
