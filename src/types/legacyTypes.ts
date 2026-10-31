export type LegacyCategoryId = "professions" | "adventure" | "resourcefulness";

export type LegacyNodeKind = "passive" | "active";

/** Rang actuel de chaque nœud, indexé par l'id du nœud */
export type LegacyRanks = Record<string, number>;

export interface LegacyCategory {
    id: LegacyCategoryId;
    /** Nom du fichier d'image ronde de l'arbre (sans extension) */
    image: string;
    name: () => string;
}

export interface LegacyTreeNode {
    id: string;
    category: LegacyCategoryId;
    /** Nom du fichier d'icône (sans extension), null pour un emplacement pas encore renseigné */
    icon: string | null;
    kind: LegacyNodeKind;
    /** 0 = emplacement « inconnu » (non dépensable) */
    maxRank: number;
    /** Position dans la grille de l'arbre (0 = première colonne / première ligne) */
    column: number;
    row: number;
    /** Id du nœud à avoir au rang maximum pour pouvoir dépenser des points ici */
    requires?: string;
    castSeconds?: number;
    cooldownHours?: number;
    name: () => string;
    description: (rank: number) => string;
}

/** Entrée de la navigation des défis : une catégorie, avec éventuellement des sous-catégories */
export interface LegacyChallengeSection {
    id: string;
    label: () => string;
    children?: LegacyChallengeSection[];
}

export interface LegacyChallenge {
    id: string;
    /** Id de la section la plus précise (sous-catégorie, ou catégorie sans enfants) */
    section: string;
    /** Nom du fichier d'icône (sans extension) */
    icon: string;
    points: number;
    /** false = récompense hors du total des défis (ex. : bêta) */
    countsTowardTotal: boolean;
    title: () => string;
    description: () => string;
    criteria?: () => string[];
    /** Titre du défi auquel celui-ci contribue (ex. : une zone explorée compte pour « Explorer les Royaumes de l'Est ») */
    parent?: () => string;
}

export interface LegacyChallengeSearchEntry {
    challenge: LegacyChallenge;
    /** Texte normalisé (sans accents, en minuscules) dans lequel on cherche */
    text: string;
}