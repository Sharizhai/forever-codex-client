<script lang="ts">
    import { getLegacyCategoryImageUrl } from "$utils/legacyUtils";
    import { LEGACY_CATEGORIES } from "$data/legacy/legacyTree";
    import type { LegacyCategoryId } from "$types/legacyTypes";
    import { hideBrokenImage } from "$utils/domUtils";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    let { value = $bindable() }: { value: LegacyCategoryId } = $props();

    const tabsLabel = messages.legacy_category_tabs_label();
</script>

<div class="legacy-tabs" role="group" aria-label={tabsLabel}>
    {#each LEGACY_CATEGORIES as category (category.id)}
        {@const isActive = category.id === value}
        {@const name = category.name()}
        <button type="button" class="legacy-tab" class:active={isActive} aria-pressed={isActive}
                aria-label={name} title={name} onclick={() => (value = category.id)}>
            <img class="legacy-tab-image" src={getLegacyCategoryImageUrl(category.image)} alt=""
                 onerror={hideBrokenImage} />
            <span class="legacy-tab-spent">{legacy.spentIn(category.id)}</span>
        </button>
    {/each}
</div>

<style lang="scss">
    .legacy-tabs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1.25rem;

        @media only screen and (max-width: 700px) {
            flex-direction: row;
            justify-content: center;
        }
    }

    .legacy-tab {
        position: relative;
        width: 5.5rem;
        height: 5.5rem;
        padding: 0;
        border: 2px solid var(--main-border-color);
        border-radius: 50%;
        background-color: var(--dissolved-text-color);
        color: var(--main-text-color);
        cursor: pointer;
        opacity: 0.75;
        transition: opacity 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

        &:hover,
        &:focus-visible {
            opacity: 1;
            border-color: var(--main-text-color);
        }

        &:focus-visible {
            outline: 2px solid var(--main-text-color);
            outline-offset: 2px;
        }

        &.active {
            opacity: 1;
            border-color: var(--main-text-color);
            box-shadow: 0 0 0.75rem var(--main-border-color);
        }

        &-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        &-spent {
            position: absolute;
            right: -0.3rem;
            bottom: -0.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 1.6rem;
            height: 1.6rem;
            padding: 0 0.3rem;
            border: 1px solid var(--main-border-color);
            border-radius: 999px;
            background-color: rgba(0, 0, 0, 0.9);
            font-size: 0.8rem;
        }
    }
</style>