import type { Article, ArticleCreationPayload } from "$types/articleTypes";
import {apiRequest} from "$services/apiClientServices";

export function createArticle(payload: ArticleCreationPayload): Promise<Article> {
    return apiRequest<Article>("POST", "/articles", payload);
}