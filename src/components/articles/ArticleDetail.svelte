<script lang="ts">
    import ArticleMeta from "$components/articles/ArticleMeta.svelte";
    import type { Article } from "$types/articleTypes";
    import * as messages from "$paraglide/messages";

    let { article }: { article: Article } = $props();

    const sourceLabel = messages.article_source();
</script>

<article class="article-detail">
    {#if article.image}
        <img class="article-detail-image" src={article.image} alt="" />
    {/if}

    <div class="article-detail-body">
        <ArticleMeta {article} />

        <h1 class="article-detail-title">{article.title}</h1>
        <p class="article-detail-summary">{article.summary}</p>
        <div class="article-detail-content">{article.content}</div>

        {#if article.sourceUrl}
            <p class="article-detail-source">
                {sourceLabel}
                <a href={article.sourceUrl} target="_blank" rel="noopener">{article.sourceName ?? article.sourceUrl}</a>
            </p>
        {/if}
    </div>
</article>

<style lang="scss">
    .article-detail {
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-image {
            display: block;
            width: 100%;
            max-height: 24rem;
            object-fit: cover;
        }

        &-body {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
        }

        &-title {
            margin: 0;
            font-family: var(--second-font-family);
            font-size: 2rem;
        }

        &-summary {
            margin: 0;
            font-size: 1.15rem;
            opacity: 0.9;
        }

        &-content {
            white-space: pre-line;
            line-height: 1.6;
        }

        &-source {
            margin: 0;
            font-size: 0.9rem;
        }
    }
</style>