<script lang="ts">
    import ArticleMeta from "$components/articles/ArticleMeta.svelte";
    import { getArticlePath } from "$utils/articleUtils";
    import type { Article } from "$types/articleTypes";
    import { link } from "svelte-spa-router";

    let { article }: { article: Article } = $props();
</script>

<a href={getArticlePath(article.id)} use:link class="article-card">
    {#if article.image}
        <img class="article-card-image" src={article.image} alt="" loading="lazy" />
    {:else}
        <div class="article-card-image" aria-hidden="true"></div>
    {/if}

    <div class="article-card-body">
        <ArticleMeta {article} />
        <h3 class="article-card-title">{article.title}</h3>
        <p class="article-card-summary">{article.summary}</p>
    </div>
</a>

<style lang="scss">
    .article-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;
        transition: border-color 0.15s ease;

        &:hover {
            text-decoration: none;
            border-color: var(--main-text-color);
        }

        &-image {
            display: block;
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            background-color: var(--dissolved-text-color);
        }

        &-body {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
        }

        &-title {
            margin: 0;
            font-family: var(--second-font-family);
            font-size: 1.2rem;
        }

        &-summary {
            display: -webkit-box;
            margin: 0;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
        }
    }
</style>