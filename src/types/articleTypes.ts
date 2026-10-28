export interface ArticleCreationPayload {
    category: string;
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
    category: string;
    title: string;
    summary: string;
    content: string;
    readingMinutes: string;
    image: string;
    sourceName: string;
    sourceUrl: string;
}