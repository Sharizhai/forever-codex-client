<script lang="ts">
    import FormMessage from "$components/generic/form/FormMessage.svelte";
    import ArticleForm from "$components/articles/ArticleForm.svelte";
    import LoginForm from "$components/auth/LoginForm.svelte";
    import { canPublishArticles } from "$utils/authUtils";
    import * as messages from "$paraglide/messages";
    import { auth } from "$stores/stores.svelte";
    import { onMount } from "svelte";

    const checkingLabel = messages.auth_checking_session();
    const loggedInLabel = messages.auth_logged_in_as();
    const logoutLabel = messages.auth_logout();
    const forbiddenLabel = messages.auth_forbidden();

    onMount(() => {
        auth.restoreSession();
    });
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="article-create">
    {#if auth.isRestoring}
        <p>{checkingLabel}</p>
    {:else if !auth.user}
        <LoginForm />
    {:else}
        <header class="article-create-header">
            <p>{loggedInLabel} <strong>{auth.user.pseudo}</strong></p>
            <button type="button" class="navbar-style-button red-button" onclick={() => auth.signOut()}>
                {logoutLabel}
            </button>
        </header>

        {#if canPublishArticles(auth.user)}
            <ArticleForm />
        {:else}
            <FormMessage type="error" message={forbiddenLabel} />
        {/if}
    {/if}
</section>

<style lang="scss">
    .article-create {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 1rem;

        &-header {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 1rem;
            width: 100%;
        }
    }
</style>