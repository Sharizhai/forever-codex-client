<script lang="ts">
    import LanguageDropdown from "$components/generic/LanguageDropdown.svelte";
    import NavButton from "$components/layout/NavButton.svelte";
    import menuBackground from "$assets/images/background.png";
    import { getOfficialSiteUrl } from "$utils/localeUtils";
    import { isActivePath } from "$utils/navigationUtils";
    import { link, router } from "svelte-spa-router";
    import * as messages from "$paraglide/messages";
    import { NAV_ITEMS } from "$config/navigation";
    import { clickOutside } from "$utils/domUtils";
    import { app } from "$stores/stores.svelte";
    import logo from "$assets/images/logo.png";

    import urlIcon from "$assets/icons/url.svg?raw";

    const officialSiteLabel = messages.nav_official_site();
    const openMenuLabel = messages.nav_menu_open();
    const closeMenuLabel = messages.nav_menu_close();

    const menuBackgroundStyle = `url("${menuBackground}")`;

    let isMenuOpen = $state(false);

    const officialSiteUrl = $derived(getOfficialSiteUrl(app.activeLocale));
    const menuLabel = $derived(isMenuOpen ? closeMenuLabel : openMenuLabel);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    function onWindowKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") closeMenu();
    }

    $effect(() => {
        void router.location;
        closeMenu();
    });
</script>

<svelte:window onkeydown={onWindowKeydown} />

<nav class="navbar" aria-label={messages.nav_aria_label()} use:clickOutside={closeMenu}>
    <a href="/" use:link class="navbar-logo" aria-label={messages.nav_home()}>
        <img src={logo} alt="Wow Forever Codex" />
    </a>

    <button type="button" class="navbar-style-button navbar-burger" aria-expanded={isMenuOpen}
            aria-controls="navbar-menu" aria-label={menuLabel} title={menuLabel} onclick={toggleMenu}>
        <span class="material-icons" aria-hidden="true">
            {isMenuOpen ? "close" : "menu"}
        </span>
    </button>

    <div id="navbar-menu" class="navbar-menu" class:open={isMenuOpen}
         style:--menu-background={menuBackgroundStyle}>
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
    </div>
</nav>

<style lang="scss">
    :global(body.mobile) {
        .navbar {
            margin: 1rem 1rem 0;
            &-burger {
                display: flex;
            }

            &-menu {
                display: none;
                position: absolute;
                top: calc(100% + 1rem);
                left: 0;
                right: 0;
                flex: none;
                flex-direction: column;
                align-items: stretch;
                gap: 1rem;
                max-height: calc(100dvh - 10rem);
                padding: 1rem;
                overflow: hidden;
                isolation: isolate;
                border: 1px solid var(--main-border-color);
                border-radius: 0.625rem;
                box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.6);

                &::before {
                    content: "";
                    position: absolute;
                    inset: -1rem;
                    z-index: -1;
                    background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), var(--menu-background);
                    background-size: cover;
                    background-position: center;
                    filter: blur(8px);
                }

                &.open {
                    display: flex;
                }
            }

            &-links {
                flex-direction: column;
                overflow: visible;

                :global(.nav-button) {
                    text-align: center;
                }
            }

            &-actions {
                flex-direction: column;
                align-items: stretch;
                margin-left: 0;
                padding-top: 1rem;
                border-top: 1px solid var(--main-border-color);

                :global(.language-dropdown-button) {
                    width: 100%;
                }

                :global(.language-dropdown-list) {
                    position: static;
                }
            }
        }
    }

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

        &-burger {
            display: none;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            border: 1px solid var(--main-border-color);
        }

        &-menu {
            display: flex;
            flex: 1;
            align-items: center;
            gap: 1.5rem;
            min-width: 0;
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