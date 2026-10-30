<script lang="ts">
    import ArticleGrid from "$components/articles/ArticleGrid.svelte";
    import { articles } from "$stores/stores.svelte";
    import * as messages from "$paraglide/messages";
    import { NEWS_PATH } from "$config/config";
    import { link } from "svelte-spa-router";

    const titleLabel = messages.home_latest_news_title();
    const allNewsLabel = messages.home_all_news();

    articles.loadLatest();
</script>

<section class="latest-articles">
    <h2>{titleLabel}</h2>

    <ArticleGrid articles={articles.latest} isLoading={articles.isLoading} hasError={articles.hasError} />

    <a href={NEWS_PATH} use:link class="primary-button latest-articles-more">{allNewsLabel}</a>
</section>

<style lang="scss">
    .latest-articles {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        max-width: 72rem;

        h2 {
            margin: 0;
            font-family: var(--second-font-family);
            font-size: 1.6rem;
        }

        &-more {
            align-self: flex-end;
        }
    }
</style>