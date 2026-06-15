/**
 * Thin fetch() wrapper that adds a timeout via AbortController and surfaces a
 * structured error type. Centralising this here keeps every API caller honest
 * about cancellation/timeout and gives us a single place to evolve auth headers,
 * retry logic, etc. in the future.
 */

export class ApiError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

export class ApiTimeoutError extends Error {
    constructor(timeoutMs: number) {
        super(`request timed out after ${timeoutMs}ms`);
        this.name = "ApiTimeoutError";
    }
}

export interface ApiFetchOptions {
    /** Hard ceiling on the request — independent of any caller-supplied signal. */
    timeoutMs?: number;
    /** Caller's own AbortController signal; merged with the timeout signal. */
    signal?: AbortSignal;
    init?: RequestInit;
}

const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Perform a JSON GET/POST and return the parsed body as T.
 *
 * Behaviour:
 *  - Aborts the request after `timeoutMs` (default 8000 ms) → throws ApiTimeoutError.
 *  - Re-throws the caller's abort verbatim (signal.aborted → DOMException 'AbortError').
 *  - On non-2xx, throws ApiError with the parsed body if available.
 *  - On 204/empty body, returns undefined cast as T.
 */
export async function apiFetch<T>(
    url: string,
    opts: ApiFetchOptions = {},
): Promise<T> {
    const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, timeoutMs);

    // Chain in the caller's signal so external cancellation also aborts us.
    if (opts.signal) {
        if (opts.signal.aborted) {
            controller.abort();
        } else {
            opts.signal.addEventListener("abort", () => controller.abort(), {
                once: true,
            });
        }
    }

    try {
        const response = await fetch(url, {
            ...(opts.init ?? {}),
            signal: controller.signal,
        });
        if (!response.ok) {
            let body: unknown = null;
            try {
                body = await response.json();
            } catch {
                /* response has no JSON body */
            }
            throw new ApiError(
                `HTTP ${response.status}`,
                response.status,
                body,
            );
        }
        if (response.status === 204) {
            return undefined as T;
        }
        return (await response.json()) as T;
    } catch (err) {
        if (
            err instanceof DOMException &&
            err.name === "AbortError" &&
            timedOut
        ) {
            throw new ApiTimeoutError(timeoutMs);
        }
        throw err;
    } finally {
        window.clearTimeout(timeoutId);
    }
}
