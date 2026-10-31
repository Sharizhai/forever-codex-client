<script lang="ts">
    import {LEGACY_CATEGORIES} from "$data/legacy/legacyTree";
    import { LEGACY_POINT_BUDGET } from "$config/config";
    import Panel from "$components/generic/Panel.svelte";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    const availableLabel = messages.legacy_points_available();
    const resetLabel = messages.legacy_reset();
    const hintLabel = messages.legacy_controls_hint();
</script>

<Panel>
    <div class="legacy-summary">
        <p class="legacy-summary-available">
            <span class="legacy-summary-value">{legacy.available}</span>
            <span class="legacy-summary-total">/ {LEGACY_POINT_BUDGET}</span>
            <span class="legacy-summary-label">{availableLabel}</span>
        </p>

        <ul class="legacy-summary-categories">
            {#each LEGACY_CATEGORIES as category (category.id)}
                <li class="legacy-summary-category">
                    {category.name()}
                    <strong>{legacy.spentIn(category.id)}</strong>
                </li>
            {/each}
        </ul>

        <p class="legacy-summary-hint">{hintLabel}</p>

        <button type="button" class="primary-button" onclick={() => legacy.reset()}>
            {resetLabel}
        </button>
    </div>
</Panel>

<style lang="scss">
    .legacy-summary {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &-available {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 0.5rem;
            margin: 0;
        }

        &-value {
            font-family: var(--second-font-family);
            font-size: 2.5rem;
        }

        &-total {
            font-family: var(--second-font-family);
            font-size: 1.2rem;
        }

        &-label {
            opacity: 0.8;
        }

        &-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-category {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);
        }

        &-hint {
            margin: 0;
            font-size: 0.85rem;
            opacity: 0.8;
        }
    }
</style>