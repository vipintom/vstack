/** Fastest the host asks a service for its section, in ms. */
export const GUEST_STATUS_SOURCE_INTERVAL_MIN = 1_000;
/** Slowest polling a source may ask for, in ms. */
export const GUEST_STATUS_SOURCE_INTERVAL_MAX = 60_000;
/** Polling interval when the manifest names none, in ms. */
export const GUEST_STATUS_SOURCE_INTERVAL_DEFAULT = 2_000;
export const GUEST_STATUS_VIEW_ROWS_MAX = 16;
export const GUEST_STATUS_VIEW_ACTIONS_MAX = 2;
export const GUEST_STATUS_VIEW_CHIPS_MAX = 6;
export const GUEST_STATUS_VIEW_CHART_POINTS_MAX = 120;
export const GUEST_STATUS_VIEW_SEGMENTS_MIN = 2;
export const GUEST_STATUS_VIEW_SEGMENTS_MAX = 4;
export const GUEST_STATUS_VIEW_TEXT_MAX = 200;
export const GUEST_STATUS_VIEW_NOTE_MAX = 300;
export const GUEST_STATUS_VIEW_ICON = /^[a-z0-9][a-z0-9-]{0,39}$/;
