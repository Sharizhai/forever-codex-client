<script lang="ts">
    import type { LegacyTreeNode } from "$types/legacyTypes";
    import { getLegacyIconUrl } from "$utils/legacyUtils";
    import { hideBrokenImage } from "$utils/domUtils";
    import * as messages from "$paraglide/messages";
    import { legacy } from "$stores/stores.svelte";

    let { node }: { node: LegacyTreeNode } = $props();

    const name = $derived(node.name());
    const rank = $derived(legacy.rankOf(node));
    const isPlaceholder = $derived(node.maxRank === 0);
    const isMaxed = $derived(!isPlaceholder && rank === node.maxRank);
    const isLocked = $derived(!legacy.isUnlocked(node));
    const isAvailable = $derived(legacy.canSpend(node));
    const ariaLabel = $derived(
        isPlaceholder ? name : messages.legacy_node_aria_label({ name, current: rank, max: node.maxRank })
    );

    function onContextMenu(event: MouseEvent) {
        event.preventDefault();
        legacy.refund(node);
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.key !== "Backspace" && event.key !== "Delete") return;

        event.preventDefault();
        legacy.refund(node);
    }
</script>

<button type="button" class="legacy-node" class:maxed={isMaxed} class:locked={isLocked}
        class:available={isAvailable} class:placeholder={isPlaceholder}
        aria-label={ariaLabel} onclick={() => legacy.spend(node)} oncontextmenu={onContextMenu}
        onkeydown={onKeydown} onmouseenter={() => legacy.highlight(node)} onfocus={() => legacy.highlight(node)}>
    {#if node.icon}
        <img class="legacy-node-icon" src={getLegacyIconUrl(node.icon)} alt="" draggable="false"
             onerror={hideBrokenImage} />
    {:else}
        <span class="legacy-node-unknown" aria-hidden="true">?</span>
    {/if}

    {#if !isPlaceholder}
        <span class="legacy-node-rank">{rank}/{node.maxRank}</span>
    {/if}
</button>

<style lang="scss">
    .legacy-node {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--node-size, 4rem);
        height: var(--node-size, 4rem);
        padding: 0;
        border: 2px solid var(--main-border-color);
        border-radius: 0.625rem;
        background-color: var(--dissolved-text-color);
        color: var(--main-text-color);
        cursor: pointer;
        transition: border-color 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;

        &:hover,
        &:focus-visible {
            border-color: var(--main-text-color);
        }

        &:focus-visible {
            outline: 2px solid var(--main-text-color);
            outline-offset: 2px;
        }

        &.available {
            border-color: var(--success-text-color);
        }

        &.maxed {
            border-color: var(--main-text-color);
            box-shadow: 0 0 0.75rem var(--main-border-color);
        }

        &.locked {
            opacity: 0.45;
            cursor: not-allowed;

            .legacy-node-icon {
                filter: grayscale(1);
            }
        }

        &.placeholder {
            border-style: dashed;
            opacity: 0.6;
            cursor: default;
        }

        &-icon {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.4rem;
            user-select: none;
        }

        &-unknown {
            font-family: var(--second-font-family);
            font-size: 1.6rem;
        }

        &-rank {
            position: absolute;
            right: -0.3rem;
            bottom: -0.5rem;
            padding: 0 0.35rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.4rem;
            background-color: rgba(0, 0, 0, 0.85);
            font-size: 0.8rem;
            line-height: 1.5;
        }
    }
</style>