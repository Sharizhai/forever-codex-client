export type FactionId = "alliance" | "horde";

export type ClassId =
    | "warrior" | "paladin" | "hunter" | "rogue" | "priest"
    | "shaman" | "mage" | "warlock" | "druid";

export type RaceId =
    | "human" | "dwarf" | "nightElf" | "gnome" | "highOrderSkyborne"
    | "orc" | "undead" | "tauren" | "troll" | "windshaperSkyborne";

export type RacialStatus = "new" | "modified" | "unchanged" | "removed";
export type RacialKind = "active" | "passive";

export type RaceView = "overview" | "compare";
export type FactionFilter = FactionId | "all";
export type ClassFilter = ClassId | "all";

export interface Racial {
    id: string;
    status: RacialStatus;
    kind: RacialKind;
    /** Les textes sont des fonctions de messages Paraglide */
    name: () => string;
    /** Pour un racial retiré : l'effet qu'il avait dans Classic */
    description: () => string;
    /** Version Classic, uniquement pour les raciaux modifiés */
    classic?: () => string;
    cooldownSeconds?: number;
    /** Chemin de l'icône (optionnel, l'emplacement reste vide sans valeur) */
    icon?: string;
}

export interface RaceClass {
    id: ClassId;
    isNewCombination: boolean;
}

export interface Race {
    id: RaceId;
    faction: FactionId;
    classes: RaceClass[];
    racials: Racial[];
    /** Chemin du portrait (optionnel, l'emplacement reste vide sans valeur) */
    portrait?: string;
}

export interface LabelledOption<T extends string> {
    key: T;
    label: () => string;
}