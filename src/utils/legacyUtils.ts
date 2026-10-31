import type {
    LegacyCategoryId,
    LegacyChallenge,
    LegacyChallengeSearchEntry,
    LegacyChallengeSection,
    LegacyRanks,
    LegacyTreeNode,
} from "$types/legacyTypes";
import { getSearchTerms, normalizeSearchText } from "$utils/searchUtils";
import { LEGACY_CATEGORY_IMAGES_PATH, LEGACY_CRITERIA_SEPARATOR, LEGACY_ICONS_PATH } from "$config/config";

type ChallengeInput = Omit<LegacyChallenge, "points" | "countsTowardTotal">
    & Partial<Pick<LegacyChallenge, "points" | "countsTowardTotal">>;

export function createChallenge(data: ChallengeInput): LegacyChallenge {
    return { points: 1, countsTowardTotal: true, ...data };
}

export function getLegacyIconUrl(icon: string): string {
    return `${LEGACY_ICONS_PATH}/${icon}`;
}

export function getLegacyCategoryImageUrl(image: string): string {
    return `${LEGACY_CATEGORY_IMAGES_PATH}/${image}`;
}

export function splitCriteria(criteria: string): string[] {
    return criteria
        .split(LEGACY_CRITERIA_SEPARATOR)
        .map((criterion) => criterion.trim())
        .filter((criterion) => criterion !== "");
}

/** getRankNumbers(3) => [1, 2, 3] */
export function getRankNumbers(maxRank: number): number[] {
    return Array.from({ length: maxRank }, (_, index) => index + 1);
}

export function indexNodes(nodes: LegacyTreeNode[]): Map<string, LegacyTreeNode> {
    return new Map(nodes.map((node) => [node.id, node]));
}

export function getNodesByCategory(nodes: LegacyTreeNode[], category: LegacyCategoryId): LegacyTreeNode[] {
    return nodes.filter((node) => node.category === category);
}

/** Nombre de colonnes de la grille d'un arbre */
export function getTreeColumns(nodes: LegacyTreeNode[]): number {
    return Math.max(...nodes.map((node) => node.column)) + 1;
}

/** Nombre de colonnes que la flèche doit parcourir jusqu'au prérequis (même ligne), null sinon */
export function getConnectorDistance(node: LegacyTreeNode, nodesById: Map<string, LegacyTreeNode>): number | null {
    if (!node.requires) return null;

    const required = nodesById.get(node.requires);
    if (!required || required.row !== node.row || required.column >= node.column) return null;

    return node.column - required.column;
}

export function sumMaxRanks(nodes: LegacyTreeNode[]): number {
    return nodes.reduce((total, node) => total + node.maxRank, 0);
}

export function sumRanks(nodes: LegacyTreeNode[], ranks: LegacyRanks): number {
    return nodes.reduce((total, node) => total + (ranks[node.id] ?? 0), 0);
}

/** Le prérequis doit être au rang maximum */
export function isPrerequisiteMet(
    node: LegacyTreeNode,
    ranks: LegacyRanks,
    nodesById: Map<string, LegacyTreeNode>,
): boolean {
    if (!node.requires) return true;

    const required = nodesById.get(node.requires);
    if (!required) return true;

    return (ranks[required.id] ?? 0) >= required.maxRank;
}

export function hasSpentDependents(node: LegacyTreeNode, ranks: LegacyRanks, nodes: LegacyTreeNode[]): boolean {
    return nodes.some((other) => other.requires === node.id && (ranks[other.id] ?? 0) > 0);
}

/** Chemin de la racine jusqu'à la section demandée ([] si elle n'existe pas) */
export function findSectionPath(sections: LegacyChallengeSection[], id: string): LegacyChallengeSection[] {
    for (const section of sections) {
        if (section.id === id) return [section];

        const childPath = section.children ? findSectionPath(section.children, id) : [];
        if (childPath.length > 0) return [section, ...childPath];
    }

    return [];
}

function collectSectionIds(section: LegacyChallengeSection): string[] {
    return [section.id, ...(section.children ?? []).flatMap(collectSectionIds)];
}

/** Défis d'une section et de toutes ses sous-sections, dans l'ordre des données */
export function getChallengesBySection(
    challenges: LegacyChallenge[],
    sections: LegacyChallengeSection[],
    id: string,
): LegacyChallenge[] {
    const section = findSectionPath(sections, id).at(-1);
    if (!section) return [];

    const ids = new Set(collectSectionIds(section));

    return challenges.filter((challenge) => ids.has(challenge.section));
}

/** « Classes · Druide » */
export function getSectionTitle(sections: LegacyChallengeSection[], id: string): string {
    return findSectionPath(sections, id).map((section) => section.label()).join(" · ");
}

export function buildChallengeSearchIndex(challenges: LegacyChallenge[]): LegacyChallengeSearchEntry[] {
    return challenges.map((challenge) => ({
        challenge,
        text: normalizeSearchText(
            [challenge.title(), challenge.description(), ...(challenge.criteria?.() ?? [])].join(" ")
        ),
    }));
}

export function searchChallenges(index: LegacyChallengeSearchEntry[], query: string): LegacyChallenge[] {
    const terms = getSearchTerms(query);
    if (terms.length === 0) return [];

    return index
        .filter((entry) => terms.every((term) => entry.text.includes(term)))
        .map((entry) => entry.challenge);
}

export function sumChallengePoints(challenges: LegacyChallenge[]): number {
    return challenges
        .filter((challenge) => challenge.countsTowardTotal)
        .reduce((total, challenge) => total + challenge.points, 0);
}