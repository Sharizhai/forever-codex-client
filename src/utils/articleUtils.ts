import type { ArticleCreationPayload, ArticleFormValues } from "$types/articleTypes";
import { emptyToNull, parseOptionalInteger } from "$utils/formUtils";

export function createEmptyArticleForm(): ArticleFormValues {
    return {
        category: "",
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
        category: values.category.trim(),
        title: values.title.trim(),
        summary: values.summary.trim(),
        content: values.content.trim(),
        readingMinutes: parseOptionalInteger(values.readingMinutes),
        image: emptyToNull(values.image),
        sourceName: emptyToNull(values.sourceName),
        sourceUrl: emptyToNull(values.sourceUrl),
    };
}