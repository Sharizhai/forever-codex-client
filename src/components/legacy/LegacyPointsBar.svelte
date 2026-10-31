<script lang="ts">
    import { LEGACY_POINT_BUDGET } from "$config/config";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    const availableLabel = messages.legacy_points_available();
    const hintLabel = messages.legacy_controls_hint();
</script>

<header class="legacy-bar">
    <p class="legacy-bar-available">
        <span class="legacy-bar-value">{legacy.available}</span>
        <span class="legacy-bar-total">/ {LEGACY_POINT_BUDGET}</span>
        <span class="legacy-bar-label">{availableLabel}</span>
    </p>

    <p class="legacy-bar-hint">{hintLabel}</p>
</header>

<style lang="scss">
    .legacy-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.5rem 1.5rem;
        border-bottom: 1px solid var(--main-border-color);

        &-available {
            display: flex;
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

        &-label,
        &-hint {
            opacity: 0.8;
        }

        &-hint {
            margin: 0;
            font-size: 0.85rem;
        }
    }
</style>