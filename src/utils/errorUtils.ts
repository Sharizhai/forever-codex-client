import type {ErrorMessages} from "$types/errorTypes";

export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

/** Status 0 = server didn't respond' */
export function resolveErrorMessage(error: unknown, texts: ErrorMessages): string {
    if (!(error instanceof ApiError)) return texts.fallback;

    if (error.status === 0) return texts.network;

    return texts.byStatus?.[error.status] ?? (error.message || texts.fallback);
}