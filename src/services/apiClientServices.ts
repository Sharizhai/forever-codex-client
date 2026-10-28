import type { ApiResponse } from "$types/apiTypes";
import type { HttpMethod } from "$types/apiTypes";
import { API_BASE_URL } from "$config/config";
import { ApiError } from "$utils/errorUtils";

const PATHS_WITHOUT_REFRESH = ["/auth/login", "/auth/refresh", "/auth/logout"];

let refreshPromise: Promise<boolean> | null = null;

async function rawRequest(method: HttpMethod, path: string, body?: unknown): Promise<Response> {
    try {
        return await fetch(`${API_BASE_URL}${path}`, {
            method,
            credentials: "include",
            headers: body === undefined ? undefined : { "Content-Type": "application/json" },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch {
        throw new ApiError("", 0);
    }
}

function refreshSession(): Promise<boolean> {
    refreshPromise ??= rawRequest("POST", "/auth/refresh", {})
        .then((response) => response.ok)
        .catch(() => false)
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
}

async function parseResponse<T>(response: Response): Promise<T> {
    let payload: ApiResponse<T> | null = null;

    try {
        payload = await response.json();
    } catch {
        // Réponse non JSON (erreur du proxy, par exemple)
    }

    if (!response.ok || !payload?.success) {
        throw new ApiError(payload?.message ?? "", response.status);
    }

    return payload.data as T;
}

export async function apiRequest<T = null>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
    let response = await rawRequest(method, path, body);

    if (response.status === 401 && !PATHS_WITHOUT_REFRESH.includes(path) && (await refreshSession())) {
        response = await rawRequest(method, path, body);
    }

    return parseResponse<T>(response);
}