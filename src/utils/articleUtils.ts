import type {ArticleCategory, ArticleCreationPayload, ArticleFormValues} from "$types/articleTypes";
import { emptyToNull, parseOptionalInteger } from "$utils/formUtils";
import {ARTICLE_CATEGORIES, NEWS_PATH} from "$config/config";

export function createEmptyArticleForm(): ArticleFormValues {
    return {
        category: [],
        title: "",
        summary: "",
        content: "",
        readingMinutes: "",
        image: "",
        sourceName: "",
        sourceUrl: "",
    };
}

export function buildArticlePayload(values: ArticleFormValues): ArticleCreationPayload {
    return {
        category: values.category,
        title: values.title.trim(),
        summary: values.summary.trim(),
        content: values.content.trim(),
        readingMinutes: parseOptionalInteger(values.readingMinutes),
        image: emptyToNull(values.image),
        sourceName: emptyToNull(values.sourceName),
        sourceUrl: emptyToNull(values.sourceUrl),
    };
}

export function getArticleCategoryLabel(category: ArticleCategory): string {
    return ARTICLE_CATEGORIES.find((option) => option.key === category)?.label() ?? category;
}

export function getArticlePath(id: string): string {
    return `${NEWS_PATH}/${id}`;
}