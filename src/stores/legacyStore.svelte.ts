import type { LegacyCategoryId, LegacyRanks, LegacyTreeNode } from "$types/legacyTypes";
import { hasSpentDependents, indexNodes, isPrerequisiteMet, sumRanks } from "$utils/legacyUtils";
import { LEGACY_POINT_BUDGET } from "$config/config";
import { LEGACY_NODES } from "$data/legacy/legacyTree";

export function createLegacySlice() {
    const nodesById = indexNodes(LEGACY_NODES);

    let ranks = $state<LegacyRanks>({});
    let highlightedId = $state<string | null>(null);

    const spent = $derived(sumRanks(LEGACY_NODES, ranks));
    const available = $derived(LEGACY_POINT_BUDGET - spent);
    const highlighted = $derived(highlightedId ? (nodesById.get(highlightedId) ?? null) : null);

    function rankOf(node: LegacyTreeNode): number {
        return ranks[node.id] ?? 0;
    }

    function spentIn(category: LegacyCategoryId): number {
        return sumRanks(LEGACY_NODES.filter((node) => node.category === category), ranks);
    }

    function requirementOf(node: LegacyTreeNode): LegacyTreeNode | null {
        return node.requires ? (nodesById.get(node.requires) ?? null) : null;
    }

    function isUnlocked(node: LegacyTreeNode): boolean {
        return isPrerequisiteMet(node, ranks, nodesById);
    }

    function canSpend(node: LegacyTreeNode): boolean {
        return node.maxRank > 0 && available > 0 && rankOf(node) < node.maxRank && isUnlocked(node);
    }

    function canRefund(node: LegacyTreeNode): boolean {
        return rankOf(node) > 0 && !hasSpentDependents(node, ranks, LEGACY_NODES);
    }

    function spend(node: LegacyTreeNode): void {
        if (canSpend(node)) ranks[node.id] = rankOf(node) + 1;
    }

    function refund(node: LegacyTreeNode): void {
        if (canRefund(node)) ranks[node.id] = rankOf(node) - 1;
    }

    function reset(): void {
        ranks = {};
    }

    function highlight(node: LegacyTreeNode): void {
        highlightedId = node.id;
    }

    return {
        get spent() { return spent; },
        get available() { return available; },
        get highlighted() { return highlighted; },
        rankOf,
        spentIn,
        requirementOf,
        isUnlocked,
        canSpend,
        canRefund,
        spend,
        refund,
        reset,
        highlight,
    };
}