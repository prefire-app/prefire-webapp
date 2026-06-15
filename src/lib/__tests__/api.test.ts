import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiFetch, ApiError, ApiTimeoutError } from "../api";

describe("apiFetch", () => {
    const realFetch = globalThis.fetch;

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        globalThis.fetch = realFetch;
    });

    it("returns parsed JSON on 200", async () => {
        globalThis.fetch = vi.fn(async () =>
            new Response(JSON.stringify({ hello: "world" }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }),
        ) as unknown as typeof fetch;

        const data = await apiFetch<{ hello: string }>("/test");
        expect(data.hello).toBe("world");
    });

    it("throws ApiError on non-2xx with parsed body", async () => {
        globalThis.fetch = vi.fn(async () =>
            new Response(JSON.stringify({ detail: "nope" }), {
                status: 502,
                headers: { "Content-Type": "application/json" },
            }),
        ) as unknown as typeof fetch;

        await expect(apiFetch("/test")).rejects.toMatchObject({
            name: "ApiError",
            status: 502,
            body: { detail: "nope" },
        });
    });

    it("throws ApiTimeoutError when fetch is aborted by the timeout", async () => {
        globalThis.fetch = vi.fn(
            (_url: RequestInfo | URL, init?: RequestInit) =>
                new Promise((_resolve, reject) => {
                    init?.signal?.addEventListener("abort", () => {
                        reject(
                            new DOMException(
                                "aborted",
                                "AbortError",
                            ),
                        );
                    });
                }),
        ) as unknown as typeof fetch;

        const promise = apiFetch("/test", { timeoutMs: 100 });
        vi.advanceTimersByTime(150);
        await expect(promise).rejects.toBeInstanceOf(ApiTimeoutError);
    });

    it("propagates caller abort verbatim (not as timeout)", async () => {
        globalThis.fetch = vi.fn(
            (_url: RequestInfo | URL, init?: RequestInit) =>
                new Promise((_resolve, reject) => {
                    init?.signal?.addEventListener("abort", () => {
                        reject(
                            new DOMException(
                                "aborted",
                                "AbortError",
                            ),
                        );
                    });
                }),
        ) as unknown as typeof fetch;

        const ctrl = new AbortController();
        const promise = apiFetch("/test", {
            signal: ctrl.signal,
            timeoutMs: 60_000,
        });
        ctrl.abort();
        await expect(promise).rejects.toMatchObject({ name: "AbortError" });
    });

    it("returns undefined on 204 No Content", async () => {
        globalThis.fetch = vi.fn(
            async () => new Response(null, { status: 204 }),
        ) as unknown as typeof fetch;
        const result = await apiFetch("/test");
        expect(result).toBeUndefined();
    });

    it("verifies ApiError carries class identity", () => {
        const err = new ApiError("x", 500, { a: 1 });
        expect(err).toBeInstanceOf(ApiError);
        expect(err.status).toBe(500);
        expect(err.body).toEqual({ a: 1 });
    });
});
