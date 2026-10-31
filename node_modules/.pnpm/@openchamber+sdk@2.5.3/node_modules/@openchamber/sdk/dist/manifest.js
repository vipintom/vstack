import { GUEST_STATUS_SOURCE_INTERVAL_DEFAULT } from './status-view.js';
export const PANEL_ID = /^[a-z][a-z0-9-]*$/;
export const GUEST_SURFACE_DOCKS = ['top', 'bottom', 'left', 'right'];
export const GUEST_SURFACE_DOCK_DEFAULT = 'top';
/** Thickness in CSS px of a docked `panel.entry` when the manifest names none. */
export const GUEST_SURFACE_DOCK_SIZE_DEFAULT = 40;
export const GUEST_SURFACE_DOCK_SIZE_MIN = 24;
export const GUEST_SURFACE_DOCK_SIZE_MAX = 480;
/** Characters in a status section title. */
export const GUEST_STATUS_SECTION_TITLE_MAX = 60;
/** Smallest frame height the host gives a status section, in CSS px. */
export const GUEST_STATUS_SECTION_HEIGHT_MIN = 24;
/** Tallest frame height the host gives a status section; taller content scrolls inside the frame. */
export const GUEST_STATUS_SECTION_HEIGHT_MAX = 320;
/** Frame height before the manifest or the guest says otherwise. */
export const GUEST_STATUS_SECTION_HEIGHT_DEFAULT = 120;
/** How many `contributes.actions` entries a package may declare. */
export const GUEST_ACTIONS_MAX = 8;
/** Characters in an action label. */
export const GUEST_ACTION_LABEL_MAX = 40;
/** How many `contributes.commands` entries a package may declare. */
export const GUEST_COMMANDS_MAX = 8;
/** Characters in a command description. */
export const GUEST_COMMAND_DESCRIPTION_MAX = 80;
/** A slash command name: lower-case, digits and dashes, up to 24 characters. */
export const GUEST_COMMAND_NAME = /^[a-z][a-z0-9-]{0,23}$/;
/** How many `contributes.tools` entries a package may declare. */
export const GUEST_TOOLS_MAX = 16;
/** Characters in a `contributes.tools` `match`. */
export const GUEST_TOOL_MATCH_MAX = 128;
/**
 * A tool name as OpenCode reports it (`mcp.jira.search`, `jira_search`),
 * with `*` allowed once, at the end, as a suffix wildcard (`mcp.jira.*`).
 */
export const GUEST_TOOL_MATCH = /^[A-Za-z0-9_.:-]+\*?$/;
/** Characters in a tool `name`. */
export const GUEST_TOOL_NAME_MAX = 40;
/** Characters in a `title` or `subtitle` template. */
export const GUEST_TOOL_TEMPLATE_MAX = 200;
/** Characters a substituted `{input.path}` value may take in a rendered template. */
export const GUEST_TOOL_TEMPLATE_VALUE_MAX = 200;
/** Characters in a `code` language id. */
export const GUEST_TOOL_LANGUAGE_MAX = 32;
/** How many `columns` a `table` presentation may name. */
export const GUEST_TOOL_COLUMNS_MAX = 16;
/** Characters in one column path. */
export const GUEST_TOOL_COLUMN_MAX = 64;
export const GUEST_TOOL_OUTPUTS = ['auto', 'text', 'json', 'markdown', 'code', 'table'];
export const HOST_LINEAR_API_ORIGIN = 'https://api.linear.app';
export const resolveIntegrationAuth = (integration) => {
    const kinds = [Boolean(integration.oauth), Boolean(integration.token), Boolean(integration.host)]
        .filter(Boolean).length;
    if (kinds !== 1) {
        return null;
    }
    if (integration.host)
        return 'host';
    return integration.oauth ? 'oauth' : 'token';
};
const resolveTokenAuthorization = (scheme) => {
    if (scheme === 'bearer' || scheme === 'basic') {
        return scheme;
    }
    return 'header';
};
export const resolveIntegrationApi = (integration) => {
    if (integration.oauth) {
        return {
            apiOrigin: integration.oauth.apiOrigin,
            account: integration.oauth.account,
            authorization: 'bearer',
        };
    }
    if (integration.token) {
        return {
            apiOrigin: integration.token.apiOrigin,
            account: integration.token.account,
            authorization: resolveTokenAuthorization(integration.token.scheme),
        };
    }
    if (integration.host?.provider === 'linear') {
        return {
            apiOrigin: HOST_LINEAR_API_ORIGIN,
            authorization: 'bearer',
        };
    }
    return null;
};
/**
 * Host roles a service can stand in for. `browser` answers the agent's
 * `browser.*` actions in place of the in-app browser view. `source-control`
 * makes the extension a Git host next to GitHub, GitLab and Gitea, described
 * by `contributes.sourceControl`. Both contracts are in `service-providers.ts`.
 * A service that provides a role needs no panel or background entry: the host
 * starts it on the first call.
 */
export const GUEST_SERVICE_PROVIDES = ['browser', 'source-control'];
/**
 * The host names an extension's Git host `ext-<panel.id>`, and provider ids
 * are at most 32 characters, so a guest taking the role has an id of at most
 * this many.
 */
export const SOURCE_CONTROL_GUEST_ID_MAX = 28;
/** The provider id OpenChamber gives the Git host an extension provides. */
export const sourceControlProviderIdOf = (guestId) => `ext-${guestId}`;
/** Default instances a Git host extension may name. */
export const SOURCE_CONTROL_DEFAULT_INSTANCES_MAX = 4;
/** URL templates per kind (`presentation.urls.changeRequest` / `.issue`). */
export const SOURCE_CONTROL_URL_TEMPLATES_MAX = 8;
/** Characters in one URL template. */
export const SOURCE_CONTROL_URL_TEMPLATE_MAX = 256;
/**
 * The placeholders a URL template may use, each a whole path segment.
 * `{namespace+}` is one or more segments (GitLab groups); `{owner}` exactly one.
 */
export const SOURCE_CONTROL_URL_TOKENS = ['{owner}', '{namespace+}', '{repo}', '{number}'];
export const toPublicSourceControl = (contribution) => ({
    label: contribution.label,
    defaultInstances: [...contribution.instances.defaultInstances],
    custom: contribution.instances.custom,
});
export const serviceProvides = (service, role) => Boolean(service?.provides?.includes(role));
/**
 * What a guest may do beyond drawing its own panel. The user approves the
 * full list once, when the package is installed; a later package that asks
 * for more is re-approved. `prompt`, `sessions`, `files`, `model`, and
 * `shells` are declared under `contributes.capabilities`; `service`, `network`,
 * `filesystem` and `origins` follow from `contributes.service`,
 * `contributes.integration`, `contributes.filesystem` and `contributes.origins`. `model` is one-off text generation with the
 * user's Small Model (`host.generate`), outside any session.
 */
export const GUEST_CAPABILITIES = ['prompt', 'sessions', 'files', 'model', 'shells', 'conversation', 'service', 'network', 'filesystem', 'origins'];
export const DECLARED_GUEST_CAPABILITIES = ['prompt', 'sessions', 'files', 'model', 'shells'];
/** How many `contributes.origins` a package may declare. */
export const GUEST_ORIGINS_MAX = 8;
/** How many `contributes.filesystem` patterns a package may declare. */
export const GUEST_FILESYSTEM_PATTERNS_MAX = 16;
/** Characters in one `contributes.filesystem` pattern. */
export const GUEST_FILESYSTEM_PATTERN_MAX = 256;
/**
 * A `contributes.filesystem` entry: an absolute glob (`/…`) or one under the
 * user's home (`~/…`). `**` spans directories, `*` and `?` stay inside one
 * segment. No `..`, no empty segment, no NUL, no backslash.
 */
export const isGuestFilesystemPattern = (value) => {
    if (value.length === 0 || value.length > GUEST_FILESYSTEM_PATTERN_MAX) {
        return false;
    }
    if (value.includes('\0') || value.includes('\\')) {
        return false;
    }
    if (!value.startsWith('/') && !value.startsWith('~/')) {
        return false;
    }
    const segments = value.split('/').slice(1);
    return !segments.some((segment) => segment === '' || segment === '..');
};
/** Whether any declared action asks for a session's messages, which needs `conversation`. */
export const guestActionsNeedConversation = (actions) => Boolean(actions?.some((action) => action.payload?.includes('messages')));
export const requestedGuestCapabilities = (contributes) => {
    const declared = new Set(contributes.capabilities ?? []);
    if (guestActionsNeedConversation(contributes.actions))
        declared.add('conversation');
    if (contributes.service)
        declared.add('service');
    if (contributes.integration)
        declared.add('network');
    if (contributes.filesystem && contributes.filesystem.length > 0)
        declared.add('filesystem');
    if (contributes.origins && contributes.origins.length > 0)
        declared.add('origins');
    return GUEST_CAPABILITIES.filter((capability) => declared.has(capability));
};
/**
 * Whether the package ships a visible panel. Background-only extensions can
 * execute code but have no rail surface, attach picker, or full-screen page.
 */
export const hasGuestPage = (contributes) => Boolean(contributes.panel.entry);
export const isGuestApproved = (capabilities) => (capabilities.requested.every((capability) => capabilities.granted.includes(capability)));
export const hasGuestCapability = (capabilities, capability) => capabilities.granted.includes(capability);
// Everything that is not one of the scalar spellings is the object form;
// the parser has already refused anything else.
const isAttachObject = (attach) => (attach !== undefined && attach !== true && attach !== false && attach !== 'panel' && attach !== 'dialog');
export const resolveAttachMode = (attach) => {
    if (attach === true || attach === 'panel')
        return 'panel';
    if (attach === 'dialog')
        return 'dialog';
    if (isAttachObject(attach))
        return attach.mode;
    return null;
};
/**
 * The page the attach dialog loads, or `null` when the dialog reuses
 * `panel.entry`. Only the object form with `mode: "dialog"` can name one.
 */
export const resolveAttachEntry = (contributes) => {
    const attach = contributes.attach;
    if (!isAttachObject(attach) || attach.mode !== 'dialog')
        return null;
    return attach.entry ?? null;
};
export const resolvePageEntry = (contributes) => {
    if (!contributes.page || !contributes.panel.entry)
        return null;
    return contributes.page === true ? contributes.panel.entry : contributes.page.entry;
};
/**
 * The HTML the Work Status section loads: `panel.entry` for `true`, the
 * object's own `entry` otherwise, `null` when nothing is declared or `true`
 * has no panel page to reuse.
 */
export const resolveStatusSectionEntry = (contributes) => {
    const section = contributes.statusSection;
    if (!section)
        return null;
    return section === true ? contributes.panel.entry ?? null : section.entry ?? null;
};
/** Where the host reads a source-backed section, with the interval resolved; `null` for a frame-only section. */
export const resolveStatusSectionSource = (contributes) => {
    const section = contributes.statusSection;
    if (!section || section === true || !section.source)
        return null;
    return { path: section.source.path, interval: section.source.interval ?? GUEST_STATUS_SOURCE_INTERVAL_DEFAULT };
};
/** Clamp a requested status section height to what the host allows. */
export const clampStatusSectionHeight = (height) => {
    if (!Number.isFinite(height))
        return GUEST_STATUS_SECTION_HEIGHT_DEFAULT;
    return Math.min(GUEST_STATUS_SECTION_HEIGHT_MAX, Math.max(GUEST_STATUS_SECTION_HEIGHT_MIN, Math.round(height)));
};
export const isSafeAssetPath = (value) => {
    if (value.includes('\0') || value.includes('\\') || value.startsWith('/') || value.includes('://')) {
        return false;
    }
    const segments = value.split('/');
    if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
        return false;
    }
    return /^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(value);
};
/** Package SVG path for the rail, e.g. `icon.svg`. Remixicon names use `PANEL_ID`. */
export const isGuestPackageSvgIcon = (value) => (isSafeAssetPath(value) && value.toLowerCase().endsWith('.svg'));
export const toPublicIntegration = (integration) => {
    const auth = resolveIntegrationAuth(integration) ?? 'oauth';
    const next = {
        name: integration.name,
        description: integration.description,
        auth,
    };
    const api = resolveIntegrationApi(integration);
    if (api?.apiOrigin) {
        next.apiOrigin = api.apiOrigin;
    }
    if (auth === 'token' && integration.token) {
        next.token = { scheme: integration.token.scheme ?? 'raw' };
        if (integration.token.usernameLabel) {
            next.token.usernameLabel = integration.token.usernameLabel;
        }
    }
    if (integration.settings && integration.settings.length > 0) {
        next.settings = integration.settings.map((field) => ({
            id: field.id,
            label: field.label,
        }));
    }
    return next;
};
export const toPublicService = (service, granted, socketBindings) => {
    if (!service) {
        return undefined;
    }
    const next = {
        runtime: service.runtime,
        granted,
    };
    if (service.permissions) {
        const permissions = {};
        if (service.permissions.sockets && service.permissions.sockets.length > 0) {
            permissions.sockets = service.permissions.sockets.map((binding) => binding.id);
        }
        if (service.permissions.exec && service.permissions.exec.length > 0) {
            permissions.exec = [...service.permissions.exec];
        }
        if (permissions.sockets || permissions.exec) {
            next.permissions = permissions;
        }
    }
    if (socketBindings && socketBindings.length > 0) {
        next.socketBindings = socketBindings.map((binding) => ({
            id: binding.id,
            candidates: [...binding.candidates],
            resolved: binding.resolved,
            override: binding.override,
        }));
    }
    if (service.provides && service.provides.length > 0) {
        next.provides = [...service.provides];
    }
    if (service.surface) {
        next.surface = true;
    }
    return next;
};
/** Guest package version: `1.2.3`, optional prerelease / build. */
