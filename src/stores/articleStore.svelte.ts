import { LATEST_ARTICLES_COUNT } from "$config/config";
import type {Article, ArticleLoadError} from "$types/articleTypes";
import * as articleService from "$services/articleServices";
import {ApiError} from "$utils/errorUtils";

export function createArticleSlice() {
    let all = $state<Article[]>([]);
    let latest = $state<Article[]>([]);
    let isLoading = $state(false);
    let hasError = $state(false);

    let current = $state<Article | null>(null);
    let isLoadingCurrent = $state(false);
    let currentError = $state<ArticleLoadError | null>(null);
    let requestedId = "";

    async function fetchInto(limit: number | undefined, assign: (articles: Article[]) => void): Promise<void> {
        isLoading = true;
        hasError = false;

        try {
            assign(await articleService.fetchArticles(limit));
        } catch {
            hasError = true;
        } finally {
            isLoading = false;
        }
    }

    async function loadOne(id: string): Promise<void> {
        requestedId = id;
        current = null;
        currentError = null;
        isLoadingCurrent = true;

        try {
            const article = await articleService.fetchArticle(id);
            if (requestedId === id) current = article;
        } catch (error) {
            if (requestedId === id) {
                currentError = error instanceof ApiError && error.status === 404 ? "notFound" : "failed";
            }
        } finally {
            if (requestedId === id) isLoadingCurrent = false;
        }
    }

    return {
        get all() { return all; },
        get latest() { return latest; },
        get isLoading() { return isLoading; },
        get hasError() { return hasError; },
        get current() { return current; },
        get isLoadingCurrent() { return isLoadingCurrent; },
        get currentError() { return currentError; },
        loadAll: () => fetchInto(undefined, (articles) => (all = articles)),
        loadLatest: () => fetchInto(LATEST_ARTICLES_COUNT, (articles) => (latest = articles)),
        loadOne,
    };
}