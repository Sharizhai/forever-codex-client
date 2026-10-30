import type { Article, ArticleCreationPayload } from "$types/articleTypes";
import {apiRequest} from "$services/apiClientServices";

export function createArticle(payload: ArticleCreationPayload): Promise<Article> {
    return apiRequest<Article>("POST", "/articles", payload);
}

export function fetchArticles(limit?: number): Promise<Article[]> {
    const query = limit === undefined ? "" : `?limit=${limit}`;

    return apiRequest<Article[]>("GET", `/articles${query}`);
}

export function fetchArticle(id: string): Promise<Article> {
    return apiRequest<Article>("GET", `/articles/${encodeURIComponent(id)}`);
}