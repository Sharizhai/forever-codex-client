<script lang="ts">
    import { LANGUAGE_OPTIONS } from "$config/config";
    import * as messages from "$paraglide/messages";
    import { clickOutside } from "$utils/domUtils";
    import { app } from "$stores/stores.svelte";

    const switchLabel = messages.nav_locale_switch();

    let isExpanded = $state(false);

    const activeOption = $derived(LANGUAGE_OPTIONS.find((option) => option.key === app.activeLocale));

    function toggle() {
        isExpanded = !isExpanded;
    }

    function close() {
        isExpanded = false;
    }

    function selectLanguage(key: string) {
        app.activeLocale = key;
        close();
    }

    function onWindowKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") close();
    }
</script>

<svelte:window onkeydown={onWindowKeydown} />

<div class="language-dropdown" use:clickOutside={close}>
    <button type="button" class="navbar-style-button language-dropdown-button" aria-expanded={isExpanded} class:expanded={isExpanded}
            aria-label={switchLabel} title={switchLabel} onclick={toggle} >
        {activeOption?.value}
        <span class="language-dropdown-icon material-icons">keyboard_arrow_down</span>
    </button>

    {#if isExpanded}
        <ul class="language-dropdown-list">
            {#each LANGUAGE_OPTIONS as option (option.key)}
                <li>
                    <button type="button" class="language-dropdown-option" class:active={option.key === app.activeLocale}
                            aria-current={option.key === app.activeLocale ? "true" : undefined} onclick={() => selectLanguage(option.key)} >
                        {option.value}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .language-dropdown {
        position: relative;

        &-button {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            gap: 0.6rem;
            white-space: nowrap;
            border: 1px solid var(--main-border-color);

            &.expanded {
                .language-dropdown-icon {
                    transform: rotate(180deg);
                }
            }
        }

        &-icon {
            transition: transform 0.15s ease;
        }

        &-list {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1;
            min-width: 100%;
            margin: 0.4rem 0 0;
            padding: 0.25rem;
            list-style: none;
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
        }

        &-option {
            width: 100%;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.625rem;
            background: transparent;
            color: var(--main-text-color);
            font: inherit;
            text-align: left;
            white-space: nowrap;
            cursor: pointer;
            font-size: 1rem;

            &:hover {
                background-color: var(--dissolved-text-color);
            }

            &.active {
                background-color: var(--less-dissolved-text-color);
            }
        }
    }
</style>