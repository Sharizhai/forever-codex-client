import type { AuthUser, LoginCredentials } from "$types/authTypes";
import * as authService from "$services/authServices";

export function createAuthSlice() {
    let user = $state<AuthUser | null>(null);
    let isRestoring = $state(true);

    async function restoreSession(): Promise<void> {
        try {
            user = await authService.fetchCurrentUser();
        } catch {
            user = null;
        } finally {
            isRestoring = false;
        }
    }

    async function signIn(credentials: LoginCredentials): Promise<void> {
        await authService.login(credentials);
        user = await authService.fetchCurrentUser();
    }

    async function signOut(): Promise<void> {
        try {
            await authService.logout();
        } finally {
            user = null;
        }
    }

    return {
        get user() { return user; },
        get isRestoring() { return isRestoring; },
        restoreSession,
        signIn,
        signOut,
    };
}