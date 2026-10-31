<script lang="ts">
    import { LEGACY_CATEGORIES } from "$data/legacy/legacyTree";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    const resetLabel = messages.legacy_reset();

    const summary = $derived(
        LEGACY_CATEGORIES
            .map((category) => `${category.name()} ${legacy.spentIn(category.id)}`)
            .join(" · ")
    );
</script>

<footer class="legacy-footer">
    <p class="legacy-footer-summary">{summary}</p>

    <button type="button" class="primary-button" onclick={() => legacy.reset()}>
        {resetLabel}
    </button>
</footer>

<style lang="scss">
    .legacy-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--main-border-color);

        &-summary {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }
    }
</style>