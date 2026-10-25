import type { NavItem } from "$types/navigationTypes";
import * as messages from "$paraglide/messages";

export const NAV_ITEMS: NavItem[] = [
    { path: "/news", label: () => messages.nav_news() },
    { path: "/races", label: () => messages.nav_races() },
    { path: "/talents", label: () => messages.nav_talents() },
    { path: "/professions", label: () => messages.nav_professions() },
    { path: "/legacy", label: () => messages.nav_legacy() },
];