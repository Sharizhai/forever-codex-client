export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}