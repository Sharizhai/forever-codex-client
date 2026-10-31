<script lang="ts">
    import { getConnectorDistance, getLegacyCategoryImageUrl, getNodesByCategory,
        getTreeColumns, indexNodes, sumMaxRanks } from "$utils/legacyUtils";
    import LegacyNode from "$components/legacy/LegacyNode.svelte";
    import type { LegacyCategory } from "$types/legacyTypes";
    import { LEGACY_NODES } from "$data/legacy/legacyTree";
    import { hideBrokenImage } from "$utils/domUtils";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    let { category }: { category: LegacyCategory } = $props();

    const nodesById = indexNodes(LEGACY_NODES);

    const title = $derived(category.name());
    const nodes = $derived(getNodesByCategory(LEGACY_NODES, category.id));
    const columns = $derived(getTreeColumns(nodes));
    const fullCostLabel = $derived(messages.legacy_category_full_cost({ points: sumMaxRanks(nodes) }));
    const spent = $derived(legacy.spentIn(category.id));
</script>

<section class="legacy-category">
    <h2 class="legacy-category-title">{title}</h2>

    <div class="legacy-category-content">
        <div class="legacy-category-presentation">
            <div class="legacy-category-image-frame">
                <img class="legacy-category-image" src={getLegacyCategoryImageUrl(category.image)} alt=""
                     onerror={hideBrokenImage} />
                <span class="legacy-category-spent">{spent}</span>
            </div>

            <p class="legacy-category-hint">{fullCostLabel}</p>
        </div>

        <ul class="legacy-category-tree" style:--columns={columns}>
            {#each nodes as node (node.id)}
                {@const distance = getConnectorDistance(node, nodesById)}
                <li class="legacy-category-cell" style:grid-column={node.column + 1} style:grid-row={node.row + 1}>
                    {#if distance}
                        <span class="legacy-connector" class:linked={legacy.isUnlocked(node)}
                              style:--distance={distance} aria-hidden="true"></span>
                    {/if}

                    <LegacyNode {node} />
                </li>
            {/each}
        </ul>
    </div>
</section>

<style lang="scss">
    .legacy-category {
        --node-size: 4rem;
        --node-gap: 1.75rem;

        flex: 1;
        min-width: 0;

        &-title {
            margin: 0 0 1.5rem;
            font-size: 1.6rem;
        }

        &-content {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
            gap: 2rem 3rem;
        }

        &-presentation {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 11rem;
            text-align: center;
        }

        &-image-frame {
            position: relative;
            width: 9rem;
            height: 9rem;
        }

        &-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 3px solid var(--main-border-color);
            border-radius: 50%;
            background-color: var(--dissolved-text-color);
        }

        &-spent {
            position: absolute;
            left: 50%;
            bottom: -0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 2.2rem;
            height: 2.2rem;
            padding: 0 0.4rem;
            border: 2px solid var(--main-border-color);
            border-radius: 999px;
            background-color: rgba(0, 0, 0, 0.9);
            font-family: var(--second-font-family);
            transform: translateX(-50%);
        }

        &-hint {
            margin: 0.5rem 0 0;
            font-size: 0.85rem;
            opacity: 0.8;
        }

        &-tree {
            display: grid;
            grid-template-columns: repeat(var(--columns), var(--node-size));
            gap: 2rem var(--node-gap);
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-cell {
            position: relative;
        }
    }

    /* Flèche horizontale vers le prérequis, quelle que soit la distance en colonnes */
    .legacy-connector {
        position: absolute;
        top: 50%;
        right: calc(100% + 0.3rem);
        width: calc(var(--distance) * (var(--node-size) + var(--node-gap)) - var(--node-size) - 0.6rem);
        height: 2px;
        background-color: currentColor;
        color: var(--main-border-color);
        opacity: 0.6;
        transform: translateY(-50%);

        &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -2px;
            border: 0.3rem solid transparent;
            border-right: none;
            border-left: 0.5rem solid currentColor;
            transform: translateY(-50%);
        }

        &.linked {
            color: var(--main-text-color);
            opacity: 1;
        }
    }
</style>