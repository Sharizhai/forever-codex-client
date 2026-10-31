<script lang="ts">
    import { getLegacyIconUrl, getRankNumbers } from "$utils/legacyUtils";
    import { hideBrokenImage } from "$utils/domUtils";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    const detailsLabel = messages.legacy_details_label();
    const placeholderLabel = messages.legacy_details_placeholder();
    const passiveLabel = messages.legacy_node_passive();
    const activeLabel = messages.legacy_node_active();

    const rankTitle = (rank: number) => messages.legacy_node_rank_title({ rank });

    const node = $derived(legacy.highlighted);
    const currentRank = $derived(node ? legacy.rankOf(node) : 0);
    const rankNumbers = $derived(node ? getRankNumbers(node.maxRank) : []);

    const meta = $derived.by(() => {
        if (!node || node.maxRank === 0) return [];

        const parts = [node.kind === "active" ? activeLabel : passiveLabel];

        if (node.castSeconds) parts.push(messages.legacy_node_cast_time({ seconds: node.castSeconds }));
        if (node.cooldownHours) parts.push(messages.legacy_node_cooldown({ hours: node.cooldownHours }));

        const requirement = legacy.requirementOf(node);
        if (requirement) parts.push(messages.legacy_node_requires({ name: requirement.name() }));

        return parts;
    });
</script>

<aside class="legacy-details" aria-label={detailsLabel}>
    {#if node}
        <header class="legacy-details-header">
            {#if node.icon}
                <img class="legacy-details-icon" src={getLegacyIconUrl(node.icon)} alt=""
                     onerror={hideBrokenImage} />
            {/if}

            <div>
                <h3 class="legacy-details-name">{node.name()}</h3>
                {#if meta.length > 0}
                    <p class="legacy-details-meta">{meta.join(" · ")}</p>
                {/if}
            </div>
        </header>

        {#if rankNumbers.length > 1}
            <ol class="legacy-details-ranks">
                {#each rankNumbers as rank (rank)}
                    <li class="legacy-details-rank" class:current={rank === currentRank}>
                        <strong>{rankTitle(rank)}</strong>
                        {node.description(rank)}
                    </li>
                {/each}
            </ol>
        {:else}
            <p class="legacy-details-description">{node.description(1)}</p>
        {/if}
    {:else}
        <p class="legacy-details-placeholder">{placeholderLabel}</p>
    {/if}
</aside>

<style lang="scss">
    .legacy-details {
        z-index: 50;
        width: 100%;
        max-height: 40vh;
        padding: 1rem 1.25rem;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }

        &-icon {
            flex-shrink: 0;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);
        }

        &-name {
            margin: 0;
            font-size: 1.2rem;
        }

        &-meta {
            margin: 0.15rem 0 0;
            font-size: 0.85rem;
            opacity: 0.8;
        }

        &-ranks {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-rank {
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            opacity: 0.7;

            &.current {
                background-color: var(--less-dissolved-text-color);
                opacity: 1;
            }

            strong {
                margin-right: 0.4rem;
                font-family: var(--second-font-family);
                font-weight: 500;
            }
        }

        &-description,
        &-placeholder {
            margin: 0;
        }

        &-placeholder {
            opacity: 0.8;
        }
    }
</style>