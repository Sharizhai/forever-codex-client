export interface ArticleCreationPayload {
    category: ArticleCategory[];
    title: string;
    summary: string;
    content: string;
    readingMinutes: number | null;
    image: string | null;
    sourceName: string | null;
    sourceUrl: string | null;
}

export interface Article extends ArticleCreationPayload {
    id: string;
    publishedAt: string;
    updatedAt: string;
}

export interface ArticleFormValues {
    category: ArticleCategory[];
    title: string;
    summary: string;
    content: string;
    readingMinutes: string;
    image: string;
    sourceName: string;
    sourceUrl: string;
}

export type ArticleCategory =
    | "NEWS" | "BLIZZARD" | "UPDATES" | "CLASSES_TALENTS" | "QUESTS_STORY" | "EXPLORATION"
    | "DUNGEONS_RAIDS" | "PVP" | "LEGACY_SYSTEM" | "GUIDES" | "EVENTS" | "COMMUNITY" | "MEDIA";

export interface ArticleCategoryOption {
    key: ArticleCategory;
    label: () => string;
}

export type ArticleLoadError = "notFound" | "failed";