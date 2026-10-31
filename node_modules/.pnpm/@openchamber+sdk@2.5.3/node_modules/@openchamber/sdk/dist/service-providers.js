/**
 * Contracts a service fulfils when it stands in for a host role
 * (`contributes.service.provides`).
 *
 * Browser: the host's `openchamber_web` tool sends its `browser.*` actions to
 * the service instead of the in-app browser view. The service answers with the
 * same shapes the in-app view answers with, so the agent sees one tool whoever
 * drives the page. The host starts the service on the first action, needs no
 * panel, and stops it after `BROWSER_PROVIDER_IDLE_MS` without actions.
 */
/** Route on the service loopback the host posts every action to. */
export const BROWSER_PROVIDER_PATH = '/browser-control';
export const BROWSER_CONTROL_ACTIONS = [
    'browser.open',
    'browser.snapshot',
    'browser.click',
    'browser.type',
    'browser.select',
    'browser.scroll',
    'browser.back',
    'browser.forward',
    'browser.inspect',
    'browser.capture',
    'browser.resize',
    'browser.close',
];
export const BROWSER_VIEWPORT_MODES = ['mobile', 'tablet', 'desktop', 'fill'];
export const BROWSER_SCROLL_DIRECTIONS = ['up', 'down', 'top', 'bottom'];
/** `browser.open` may wait for a slow page; every other action is quick. */
export const BROWSER_PROVIDER_OPEN_TIMEOUT_MS = 45_000;
export const BROWSER_PROVIDER_ACTION_TIMEOUT_MS = 20_000;
/** A screenshot is the largest answer; snapshots are capped by the provider itself. */
export const BROWSER_PROVIDER_RESPONSE_MAX = 12_000_000;
/** No action for this long stops the service; the next action starts it again. */
export const BROWSER_PROVIDER_IDLE_MS = 10 * 60_000;
const CONTROL_ACTIONS = new Set(BROWSER_CONTROL_ACTIONS);
export const isBrowserControlAction = (value) => CONTROL_ACTIONS.has(value);
/** Hosts before the context field posted none; that reads as an unknown scope. */
const readContext = (wire) => {
    const directory = wire?.directory;
    const sessionId = wire?.sessionId;
    return {
        directory: String(directory) === directory && directory.length > 0 ? directory : null,
        sessionId: String(sessionId) === sessionId && sessionId.length > 0 ? sessionId : null,
    };
};
/**
 * A provider's read of the body the host posted to `BROWSER_PROVIDER_PATH`.
 * The host is trusted and validated the parameters against the action before
 * sending, so this checks the envelope and the action, not every field, and
 * the service bundle needs no schema library for it. `null` is a body that is
 * not a browser action; answer it with HTTP 400.
 */
export const readBrowserProviderRequest = (body) => {
    let wire;
    try {
        const parsed = JSON.parse(body);
        if (Object(parsed) !== parsed || parsed === null)
            return null;
        wire = parsed;
    }
    catch {
        return null;
    }
    const { requestId, action, parameters, context } = wire;
    if (String(requestId) !== requestId || requestId.length === 0)
        return null;
    if (String(action) !== action || !isBrowserControlAction(action))
        return null;
    if (Object(parameters) !== parameters)
        return null;
    // SAFETY: requestId, action, and the parameters object were checked above,
    // and the host validated the parameters for this action before posting.
    return { requestId, action, parameters, context: readContext(context) };
};
/*
 * Source control: a service with `provides: ["source-control"]` is the Git
 * host `contributes.sourceControl` describes. OpenChamber keeps the user's
 * accounts and tokens, the bindings, the idempotent mutation records and the
 * caches; it forwards the resource reads and the three mutation steps to the
 * service at `SOURCE_CONTROL_PROVIDER_PATH`. The service never sees a token: it
 * reaches the forge through OpenChamber's outbound proxy
 * (`createSourceControlForge`), which pins the instance origin and adds the
 * stored token itself.
 */
/** Route on the service loopback OpenChamber posts every source-control call to. */
export const SOURCE_CONTROL_PROVIDER_PATH = '/source-control';
/** The `v` of every request; a service answers a version it does not know with HTTP 400. */
export const SOURCE_CONTROL_PROVIDER_WIRE_VERSION = 1;
/**
 * Every call OpenChamber forwards. `auth.verify` reads who a candidate token
 * belongs to and `auth.probe` whether the instance is this forge; the fifteen
 * reads take the shell's own input without the session; the three
 * `mutation.*` steps are the part of a write the service owns, while
 * OpenChamber owns the kind, the normalized input, its digest, the
 * idempotency record and when each step runs.
 */
export const SOURCE_CONTROL_PROVIDER_METHODS = [
    'auth.verify',
    'auth.probe',
    'changeRequestStatus',
    'listChangeRequests',
    'changeRequestContext',
    'listIssues',
    'getIssue',
    'issueComments',
    'projectUpstream',
    'projectBranches',
    'listLabels',
    'listReviewerCandidates',
    'readChangeRequestPatch',
    'readChangeRequestFile',
    'liveSummaries',
    'readChangeRequestHead',
    'resolveChangeRequestSource',
    'mutation.resolveTarget',
    'mutation.perform',
    'mutation.reconcile',
];
/** `changeRequestStatus` answers within the badge's own deadline; past it the last known status shows. */
export const SOURCE_CONTROL_PROVIDER_STATUS_TIMEOUT_MS = 12_000;
export const SOURCE_CONTROL_PROVIDER_READ_TIMEOUT_MS = 20_000;
export const SOURCE_CONTROL_PROVIDER_MUTATION_TIMEOUT_MS = 30_000;
export const SOURCE_CONTROL_PROVIDER_AUTH_TIMEOUT_MS = 15_000;
/** Answers are read up to this many bytes, enough for a change request's patch or one file. */
export const SOURCE_CONTROL_PROVIDER_RESPONSE_MAX = 8_000_000;
/** Characters of `error.message` OpenChamber reads. */
export const SOURCE_CONTROL_PROVIDER_ERROR_MESSAGE_MAX = 2_000;
/** No call for this long stops the service; the next call starts it again. */
export const SOURCE_CONTROL_PROVIDER_IDLE_MS = 10 * 60_000;
/** Characters of a mutation's `providerTarget` JSON, which OpenChamber stores with the record. */
export const SOURCE_CONTROL_PROVIDER_TARGET_MAX = 4_096;
/** How long OpenChamber waits for the service to answer `method`. */
export const sourceControlProviderTimeoutMs = (method) => {
    if (method === 'changeRequestStatus')
        return SOURCE_CONTROL_PROVIDER_STATUS_TIMEOUT_MS;
    if (method === 'auth.verify' || method === 'auth.probe')
        return SOURCE_CONTROL_PROVIDER_AUTH_TIMEOUT_MS;
    if (method.startsWith('mutation.'))
        return SOURCE_CONTROL_PROVIDER_MUTATION_TIMEOUT_MS;
    return SOURCE_CONTROL_PROVIDER_READ_TIMEOUT_MS;
};
/**
 * Environment variable with the base URL of OpenChamber's callback listener
 * (`http://127.0.0.1:<port>`). Set only for a service that provides
 * `source-control`; `createSourceControlForge` reads it.
 */
export const OPENCHAMBER_HOST_CALLBACK_URL = 'OPENCHAMBER_HOST_CALLBACK_URL';
/** Route on the callback listener a service sends a forge request to. */
export const SOURCE_CONTROL_OUTBOUND_PATH = '/source-control/outbound';
export const SOURCE_CONTROL_OUTBOUND_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
/** Request headers OpenChamber passes to the forge; it sets every other header itself. */
export const SOURCE_CONTROL_OUTBOUND_REQUEST_HEADERS = ['accept', 'content-type', 'if-none-match', 'range'];
/** Response headers OpenChamber hands back, plus any starting with `SOURCE_CONTROL_OUTBOUND_RESPONSE_HEADER_PREFIX`. */
export const SOURCE_CONTROL_OUTBOUND_RESPONSE_HEADERS = ['content-type', 'link', 'etag', 'x-total-count', 'x-total', 'retry-after'];
export const SOURCE_CONTROL_OUTBOUND_RESPONSE_HEADER_PREFIX = 'x-ratelimit-';
/** Characters of an outbound request body. */
export const SOURCE_CONTROL_OUTBOUND_BODY_MAX = 1_000_000;
/** Bytes of a forge answer OpenChamber reads; a longer one is refused whole. */
export const SOURCE_CONTROL_OUTBOUND_RESPONSE_MAX = 8_000_000;
/** One forge request may take this long; the call's own deadline may end it sooner. */
export const SOURCE_CONTROL_OUTBOUND_TIMEOUT_MS = 20_000;
export const isSourceControlProviderMethod = (value) => (SOURCE_CONTROL_PROVIDER_METHODS.some((method) => method === value));
/** `undefined` is a user that is neither `null` nor `{ id, login }`. */
const readSessionUser = (user) => {
    if (user === null)
        return null;
    if (Object(user) !== user || user === undefined)
        return undefined;
    const { id, login } = user;
    if (!Number.isSafeInteger(id) || String(login) !== login || login.length === 0)
        return undefined;
    return { id: Number(id), login };
};
/** `undefined` is a session that is neither `null` nor `{ instance, handle, user }`. */
const readSession = (session) => {
    if (session === null)
        return null;
    if (Object(session) !== session || session === undefined)
        return undefined;
    const { instance, handle } = session;
    if (String(instance) !== instance || instance.length === 0 || String(handle) !== handle || handle.length === 0)
        return undefined;
    const user = readSessionUser(session.user);
    if (user === undefined)
        return undefined;
    return { instance, handle, user };
};
/**
 * A service's read of the body OpenChamber posted to
 * `SOURCE_CONTROL_PROVIDER_PATH`. OpenChamber built and validated `input`, so
 * this checks the envelope, not every field, and the service bundle needs no
 * schema library. `null` is a body that is not a source-control call of this
 * wire version; answer it with HTTP 400.
 */
export const readSourceControlProviderRequest = (body) => {
    let wire;
    try {
        const parsed = JSON.parse(body);
        if (Object(parsed) !== parsed || parsed === null)
            return null;
        wire = parsed;
    }
    catch {
        return null;
    }
    const { v, requestId, method, provider, input } = wire;
    if (v !== SOURCE_CONTROL_PROVIDER_WIRE_VERSION)
        return null;
    if (String(requestId) !== requestId || requestId.length === 0)
        return null;
    if (String(provider) !== provider || provider.length === 0)
        return null;
    if (String(method) !== method || !isSourceControlProviderMethod(method))
        return null;
    if (Object(input) !== input || Array.isArray(input))
        return null;
    const session = readSession(wire.session);
    if (session === undefined)
        return null;
    // SAFETY: `input` is a plain object parsed from JSON, so every value in it is JSON.
    return { v: SOURCE_CONTROL_PROVIDER_WIRE_VERSION, requestId, method, provider, session, input: input };
};
/**
 * OpenChamber refused the request (an expired handle, a path off the
 * instance, a body too large), could not reach the forge, or did not answer.
 * `status` is the callback listener's HTTP status, `0` when it gave none;
 * `code` is its error code (`HOST_UNAVAILABLE` when there was no usable answer).
 */
export class SourceControlForgeError extends Error {
    code;
    status;
    constructor(message, code, status) {
        super(message);
        this.name = 'SourceControlForgeError';
        this.code = code;
        this.status = status;
    }
}
/**
 * The service's way to the forge: OpenChamber's callback listener
 * (`OPENCHAMBER_HOST_CALLBACK_URL`), which checks the handle, keeps the request
 * on the instance origin and adds the token. Plain `fetch`, no dependencies.
 * Throws `SourceControlForgeError` when OpenChamber refuses the request; a
 * forge answer of any status, 401 included, resolves.
 */
export const createSourceControlForge = ({ env }) => {
    const base = env[OPENCHAMBER_HOST_CALLBACK_URL];
    if (!base)
        throw new Error(`${OPENCHAMBER_HOST_CALLBACK_URL} is not set: only a service that provides "source-control" can reach a forge.`);
    const url = `${base.replace(/\/+$/, '')}${SOURCE_CONTROL_OUTBOUND_PATH}`;
    return {
        async request(handle, request) {
            let response;
            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { authorization: `Bearer ${handle}`, 'content-type': 'application/json' },
                    body: JSON.stringify(request),
                    // A little past OpenChamber's own deadline, so its answer wins.
                    signal: AbortSignal.timeout(SOURCE_CONTROL_OUTBOUND_TIMEOUT_MS + 5_000),
                });
            }
            catch (error) {
                throw new SourceControlForgeError(`OpenChamber did not answer: ${error instanceof Error ? error.message : String(error)}`, 'HOST_UNAVAILABLE', 0);
            }
            let answer;
            try {
                answer = Object(await response.json());
            }
            catch {
                throw new SourceControlForgeError('OpenChamber answered with something other than JSON', 'HOST_UNAVAILABLE', response.status);
            }
            if (!response.ok) {
                const message = answer.error?.message;
                const code = answer.error?.code;
                throw new SourceControlForgeError(String(message) === message && message.length > 0 ? message : `OpenChamber refused the request (${response.status})`, String(code) === code && code.length > 0 ? code : 'OUTBOUND_REFUSED', response.status);
            }
            if (!Number.isSafeInteger(answer.status) || String(answer.body) !== answer.body) {
                throw new SourceControlForgeError('OpenChamber relayed a malformed forge answer', 'HOST_UNAVAILABLE', response.status);
            }
            const headers = {};
            for (const [name, text] of Object.entries(Object(answer.headers ?? {}))) {
                if (String(text) === text)
                    headers[name] = text;
            }
            return { status: Number(answer.status), headers, body: answer.body };
        },
    };
};
