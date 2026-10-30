import type {
    ClassFilter, ClassId, FactionFilter, FactionId, LabelledOption,
    RaceId, RaceView, RacialStatus,
} from "$types/raceTypes";
import * as messages from "$paraglide/messages";

export const FACTION_IDS: FactionId[] = ["alliance", "horde"];
export const RACIAL_STATUSES: RacialStatus[] = ["new", "modified", "unchanged", "removed"];

export const FACTION_LABELS: Record<FactionId, () => string> = {
    alliance: () => messages.faction_alliance(),
    horde: () => messages.faction_horde(),
};

export const RACE_LABELS: Record<RaceId, () => string> = {
    human: () => messages.race_human(),
    dwarf: () => messages.race_dwarf(),
    nightElf: () => messages.race_night_elf(),
    gnome: () => messages.race_gnome(),
    highOrderSkyborne: () => messages.race_high_order_skyborne(),
    orc: () => messages.race_orc(),
    undead: () => messages.race_undead(),
    tauren: () => messages.race_tauren(),
    troll: () => messages.race_troll(),
    windshaperSkyborne: () => messages.race_windshaper_skyborne(),
};

export const CLASS_LABELS: Record<ClassId, () => string> = {
    warrior: () => messages.class_warrior(),
    paladin: () => messages.class_paladin(),
    hunter: () => messages.class_hunter(),
    rogue: () => messages.class_rogue(),
    priest: () => messages.class_priest(),
    shaman: () => messages.class_shaman(),
    mage: () => messages.class_mage(),
    warlock: () => messages.class_warlock(),
    druid: () => messages.class_druid(),
};

export const RACIAL_STATUS_LABELS: Record<RacialStatus, () => string> = {
    new: () => messages.racial_status_new(),
    modified: () => messages.racial_status_modified(),
    unchanged: () => messages.racial_status_unchanged(),
    removed: () => messages.racial_status_removed(),
};

export const FACTION_FILTER_OPTIONS: LabelledOption<FactionFilter>[] = [
    { key: "all", label: () => messages.races_filter_all() },
    { key: "alliance", label: FACTION_LABELS.alliance },
    { key: "horde", label: FACTION_LABELS.horde },
];

export const CLASS_FILTER_OPTIONS: LabelledOption<ClassFilter>[] = [
    { key: "all", label: () => messages.races_filter_all() },
    ...(Object.keys(CLASS_LABELS) as ClassId[]).map((key) => ({ key, label: CLASS_LABELS[key] })),
];

export const VIEW_OPTIONS: LabelledOption<RaceView>[] = [
    { key: "overview", label: () => messages.races_view_overview() },
    { key: "compare", label: () => messages.races_view_compare() },
];