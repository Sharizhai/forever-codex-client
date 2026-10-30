<script lang="ts">
    import FormMessage from "$components/generic/form/FormMessage.svelte";
    import ArticleDetail from "$components/articles/ArticleDetail.svelte";
    import { articles } from "$stores/stores.svelte";
    import * as messages from "$paraglide/messages";
    import { scrollToTop } from "$utils/domUtils";
    import { NEWS_PATH } from "$config/config";
    import { link } from "svelte-spa-router";

    let { params }: { params: { id: string } } = $props();

    const backLabel = messages.article_back_to_news();
    const loadingLabel = messages.article_loading();
    const notFoundLabel = messages.article_not_found();
    const errorLabel = messages.article_load_error();

    $effect(() => {
        scrollToTop();
        articles.loadOne(params.id);
    });
</script>

<section class="article-page">
    <a href={NEWS_PATH} use:link class="primary-button icon-button">
        <span class="material-icons">arrow_back</span>
        {backLabel}
    </a>

    {#if articles.isLoadingCurrent}
        <p>{loadingLabel}</p>
    {:else if articles.currentError === "notFound"}
        <FormMessage type="error" message={notFoundLabel} />
    {:else if articles.currentError}
        <FormMessage type="error" message={errorLabel} />
    {:else if articles.current}
        <ArticleDetail article={articles.current} />
    {/if}
</section>

<style lang="scss">
    .article-page {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        max-width: 52rem;
        margin: 0 auto;
        padding: 3rem 1rem;
    }
</style>