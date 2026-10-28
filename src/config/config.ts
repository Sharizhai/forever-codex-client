import type {LanguageOption} from "$types/languageTypes";

export const API_BASE_URL = "/api";

export const CONTACT_EMAIL = "contact.wowcodex@gmail.com";
export const TRAILER_VIDEO_ID = "bmHO1BNqlmg";
export const ABOUT_PATH = "/about";
export const DEFAULT_LOCALE = "fr";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { key: "fr", value: "🇫🇷 Français" },
    { key: "en", value: "🇬🇧 English" },
];

export const OFFICIAL_SITE_URLS: Record<string, string> = {
    en: "https://worldofwarcraft.blizzard.com/en-us/forever",
    fr: "https://worldofwarcraft.blizzard.com/fr-fr/forever",
};