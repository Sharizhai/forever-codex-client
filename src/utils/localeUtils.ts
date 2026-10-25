import { DEFAULT_LOCALE, OFFICIAL_SITE_URLS } from "$config/config";

export function getOfficialSiteUrl(locale: string): string {
    return OFFICIAL_SITE_URLS[locale] ?? OFFICIAL_SITE_URLS[DEFAULT_LOCALE];
}