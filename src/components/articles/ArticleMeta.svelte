<script lang="ts">
    import { getArticleCategoryLabel } from "$utils/articleUtils";
    import type { Article } from "$types/articleTypes";
    import * as messages from "$paraglide/messages";
    import { formatDate } from "$utils/dateUtils";
    import { app } from "$stores/stores.svelte";

    let { article }: { article: Article } = $props();

    const categoryLabels = $derived(article.category.map((category) => getArticleCategoryLabel(category)));
    const publishedDate = $derived(formatDate(article.publishedAt, app.activeLocale));
    const readingTime = $derived(
        article.readingMinutes
            ? messages.article_card_reading_minutes({ minutes: article.readingMinutes })
            : ""
    );
</script>

<div class="article-meta">
    {#if categoryLabels.length > 0}
        <ul class="article-meta-categories">
            {#each categoryLabels as categoryLabel (categoryLabel)}
                <li class="article-meta-category">{categoryLabel}</li>
            {/each}
        </ul>
    {/if}

    <p class="article-meta-info">
        <time datetime={article.publishedAt}>{publishedDate}</time>
        {#if readingTime}
            <span>{readingTime}</span>
        {/if}
    </p>
</div>

<style lang="scss">
    .article-meta {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-category {
            padding: 0.1rem 0.5rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);
            font-size: 0.8rem;
        }

        &-info {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem 0.75rem;
            margin: 0;
            font-size: 0.85rem;
            opacity: 0.8;
        }
    }
</style>