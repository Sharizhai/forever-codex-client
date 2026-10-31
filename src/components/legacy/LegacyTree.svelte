<script lang="ts">
    import LegacyCategoryPanel from "$components/legacy/LegacyCategoryPanel.svelte";
    import LegacyCategoryTabs from "$components/legacy/LegacyCategoryTabs.svelte";
    import LegacyNodeDetails from "$components/legacy/LegacyNodeDetails.svelte";
    import LegacyTreeFooter from "$components/legacy/LegacyTreeFooter.svelte";
    import LegacyPointsBar from "$components/legacy/LegacyPointsBar.svelte";
    import { LEGACY_CATEGORIES } from "$data/legacy/legacyTree";
    import type { LegacyCategoryId } from "$types/legacyTypes";

    let activeId = $state<LegacyCategoryId>("professions");

    const activeCategory = $derived(LEGACY_CATEGORIES.find((category) => category.id === activeId));
</script>

<div class="legacy-tree">
    <section class="legacy-tree-panel">
        <LegacyPointsBar />

        <div class="legacy-tree-body">
            <LegacyCategoryTabs bind:value={activeId} />

            {#if activeCategory}
                <LegacyCategoryPanel category={activeCategory} />
            {/if}
        </div>

        <LegacyTreeFooter />
    </section>

    <LegacyNodeDetails />
</div>

<style lang="scss">
    .legacy-tree {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 60rem;

        &-panel {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem 1.5rem;
            background-color: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(8px);
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
        }

        &-body {
            display: flex;
            align-items: flex-start;
            gap: 2rem;
            min-height: 27rem;

            @media only screen and (max-width: 700px) {
                flex-direction: column;
                align-items: stretch;
                min-height: 0;
            }
        }
    }
</style>