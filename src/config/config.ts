import type { ArticleCategoryOption } from "$types/articleTypes";
import type {LanguageOption} from "$types/languageTypes";
import * as messages from "$paraglide/messages";

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

export const NEWS_PATH = "/news";
export const RACES_PATH = "/races";
export const LATEST_ARTICLES_COUNT = 3;

export const ARTICLE_CATEGORIES: ArticleCategoryOption[] = [
    { key: "NEWS", label: () => messages.article_category_news() },
    { key: "BLIZZARD", label: () => messages.article_category_blizzard() },
    { key: "UPDATES", label: () => messages.article_category_updates() },
    { key: "CLASSES_TALENTS", label: () => messages.article_category_classes_talents() },
    { key: "QUESTS_STORY", label: () => messages.article_category_quests_story() },
    { key: "EXPLORATION", label: () => messages.article_category_exploration() },
    { key: "DUNGEONS_RAIDS", label: () => messages.article_category_dungeons_raids() },
    { key: "PVP", label: () => messages.article_category_pvp() },
    { key: "LEGACY_SYSTEM", label: () => messages.article_category_legacy_system() },
    { key: "GUIDES", label: () => messages.article_category_guides() },
    { key: "EVENTS", label: () => messages.article_category_events() },
    { key: "COMMUNITY", label: () => messages.article_category_community() },
    { key: "MEDIA", label: () => messages.article_category_media() },
];