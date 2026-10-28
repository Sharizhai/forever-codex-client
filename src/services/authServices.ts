import type { AuthUser, LoginCredentials } from "$types/authTypes";
import {apiRequest} from "$services/apiClientServices";

export async function login(credentials: LoginCredentials): Promise<void> {
    await apiRequest("POST", "/auth/login", credentials);
}

export function fetchCurrentUser(): Promise<AuthUser> {
    return apiRequest<AuthUser>("GET", "/auth/me");
}

export async function logout(): Promise<void> {
    await apiRequest("POST", "/auth/logout", {});
}