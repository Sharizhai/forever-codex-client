<script lang="ts">
    import ArticleGrid from "$components/articles/ArticleGrid.svelte";
    import { articles } from "$stores/stores.svelte";
    import * as messages from "$paraglide/messages";

    const titleLabel = messages.news_title();

    articles.loadAll();
</script>

<section class="news">
    <h1>{titleLabel}</h1>

    <ArticleGrid articles={articles.all} isLoading={articles.isLoading} hasError={articles.hasError} />
</section>

<style lang="scss">
    .news {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        width: 100%;
        max-width: 72rem;
        margin: 0 auto;
        padding: 3rem 1rem;

        h1 {
            margin: 0;
            font-family: var(--second-font-family);
            font-size: 2.5rem;
        }
    }
</style>