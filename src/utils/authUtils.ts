import type {AuthUser} from "$types/authTypes";
import type {UserRole} from "$types/authTypes";

const PUBLISHER_ROLES: UserRole[] = ["ADMIN", "WRITER"];

export function canPublishArticles(user: AuthUser): boolean {
    return PUBLISHER_ROLES.includes(user.role);
}