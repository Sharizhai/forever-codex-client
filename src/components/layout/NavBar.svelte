<script lang="ts">
    import LanguageDropdown from "$components/generic/LanguageDropdown.svelte";
    import NavButton from "$components/layout/NavButton.svelte";
    import { isActivePath } from "$utils/navigationUtils";
    import {getOfficialSiteUrl} from "$utils/localeUtils";
    import { link, router } from "svelte-spa-router";
    import * as messages from "$paraglide/messages";
    import { NAV_ITEMS } from "$config/navigation";
    import { app } from "$stores/stores.svelte";
    import logo from "$assets/images/logo.png";

    import urlIcon from "$assets/icons/url.svg?raw";

    const officialSiteLabel = messages.nav_official_site();

    const officialSiteUrl = $derived(getOfficialSiteUrl(app.activeLocale));
</script>

<nav class="navbar" aria-label={messages.nav_aria_label()}>
    <a href="/" use:link class="navbar-logo" aria-label={messages.nav_home()}>
        <img src={logo} alt="Wow Forever Codex" />
    </a>

    <ul class="navbar-links">
        {#each NAV_ITEMS as item (item.path)}
            <li>
                <NavButton path={item.path} label={item.label()}
                           active={isActivePath(router.location, item.path)} />
            </li>
        {/each}
    </ul>

    <div class="navbar-actions">
        <a href={officialSiteUrl} class="navbar-style-button icon-button" target="_blank" rel="noopener">
            {officialSiteLabel}
            <span class="navbar-url-icon">{@html urlIcon}</span>
        </a>
        <LanguageDropdown />
    </div>
</nav>

<style lang="scss">
    .navbar {
        position: sticky;
        top: 1.3rem;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin: 1.3rem 1.3rem 0;
        padding: 1rem 1rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-logo {
            display: flex;
            flex-shrink: 0;
            margin-block: -2rem;

            img {
                display: block;
                height: 6.5rem;
                width: auto;
                filter: drop-shadow(0 0.25rem 0.5rem rgba(0, 0, 0, 0.5));
            }
        }

        &-links {
            display: flex;
            gap: 0.25rem;
            margin: 0;
            padding: 0;
            list-style: none;
            overflow-x: auto;
        }

        &-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            flex-shrink: 0;
        }

        &-url-icon :global(svg){
            width: 1rem;
            height: 1rem;
            color: var(--main-text-color);
            margin-top: 0.2rem;
        }
    }
</style>