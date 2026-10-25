<script lang="ts">
    import NavButton from "$components/layout/NavButton.svelte";
    import { isActivePath } from "$utils/navigationUtils";
    import { link, router } from "svelte-spa-router";
    import * as messages from "$paraglide/messages";
    import { NAV_ITEMS } from "$config/navigation";
    import logo from "$assets/images/logo.png";
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
    }
</style>