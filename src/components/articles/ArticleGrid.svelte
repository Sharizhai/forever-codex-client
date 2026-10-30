<script lang="ts">
    import FormMessage from "$components/generic/form/FormMessage.svelte";
    import ArticleCard from "$components/articles/ArticleCard.svelte";
    import type { Article } from "$types/articleTypes";
    import * as messages from "$paraglide/messages";

    let { articles, isLoading, hasError }: {
        articles: Article[];
        isLoading: boolean;
        hasError: boolean;
    } = $props();

    const loadingLabel = messages.news_loading();
    const errorLabel = messages.news_error();
    const emptyLabel = messages.news_empty();
</script>

{#if isLoading}
    <p class="article-grid-message">{loadingLabel}</p>
{:else if hasError}
    <FormMessage type="error" message={errorLabel} />
{:else if articles.length === 0}
    <p class="article-grid-message">{emptyLabel}</p>
{:else}
    <ul class="article-grid">
        {#each articles as article (article.id)}
            <li><ArticleCard {article} /></li>
        {/each}
    </ul>
{/if}

<style lang="scss">
    .article-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;

        @media only screen and (max-width: 1100px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media only screen and (max-width: 700px) {
            grid-template-columns: minmax(0, 1fr);
        }

        li {
            display: flex;
        }

        &-message {
            margin: 0;
            text-align: center;
        }
    }
</style>