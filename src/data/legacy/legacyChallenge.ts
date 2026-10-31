import type { LegacyChallenge, LegacyChallengeSection } from "$types/legacyTypes";
import { createChallenge, splitCriteria } from "$utils/legacyUtils";
import * as messages from "$paraglide/messages";

// *** CLASSES : 3 paliers (niveaux 25, 45, 60) par classe ***
const CLASSES = [
    { key: "druid", icon: "/classes/druid.jpg", name: () => messages.legacy_class_druid() },
    { key: "hunter", icon: "/classes/hunter.jpg", name: () => messages.legacy_class_hunter() },
    { key: "mage", icon: "/classes/mage.jpg", name: () => messages.legacy_class_mage() },
    { key: "paladin", icon: "/classes/paladin.jpg", name: () => messages.legacy_class_paladin() },
    { key: "priest", icon: "/classes/priest.jpg", name: () => messages.legacy_class_priest() },
    { key: "rogue", icon: "/classes/rogue.jpg", name: () => messages.legacy_class_rogue() },
    { key: "shaman", icon: "/classes/shaman.jpg", name: () => messages.legacy_class_shaman() },
    { key: "warlock", icon: "/classes/warlock.jpg", name: () => messages.legacy_class_warlock() },
    { key: "warrior", icon: "/classes/warrior.jpg", name: () => messages.legacy_class_warrior() },
];

const CLASS_TIERS = [
    { key: "novice", level: 25, title: (className: string) => messages.legacy_challenge_class_novice({ className }) },
    { key: "experienced", level: 45, title: (className: string) => messages.legacy_challenge_class_experienced({ className }) },
    { key: "master", level: 60, title: (className: string) => messages.legacy_challenge_class_master({ className }) },
];

const CLASS_CHALLENGES: LegacyChallenge[] = CLASSES.flatMap((wowClass) =>
    CLASS_TIERS.map((tier) => createChallenge({
        id: `class-${wowClass.key}-${tier.key}`,
        section: `classes-${wowClass.key}`,
        icon: wowClass.icon,
        title: () => tier.title(wowClass.name()),
        description: () => messages.legacy_challenge_class_description({ level: tier.level, className: wowClass.name() }),
    })),
);

// *** MÉTIERS : 3 paliers (compétence 150, 225, 300) par métier de fabrication ***
const TRADESKILLS = [
    {
        key: "alchemy",
        icon: "/professions/alchemy.jpg",
        name: () => messages.legacy_profession_alchemy(),
        practitioner: () => messages.legacy_practitioner_alchemy(),
    },
    {
        key: "blacksmithing",
        icon: "/professions/blacksmithing.jpg",
        name: () => messages.legacy_profession_blacksmithing(),
        practitioner: () => messages.legacy_practitioner_blacksmithing(),
    },
    {
        key: "enchanting",
        icon: "/professions/enchanting.jpg",
        name: () => messages.legacy_profession_enchanting(),
        practitioner: () => messages.legacy_practitioner_enchanting(),
    },
    {
        key: "engineering",
        icon: "/professions/engineering.jpg",
        name: () => messages.legacy_profession_engineering(),
        practitioner: () => messages.legacy_practitioner_engineering(),
    },
    {
        key: "leatherworking",
        icon: "/professions/leatherworking.jpg",
        name: () => messages.legacy_profession_leatherworking(),
        practitioner: () => messages.legacy_practitioner_leatherworking(),
    },
    {
        key: "tailoring",
        icon: "/professions/tailoring.jpg",
        name: () => messages.legacy_profession_tailoring(),
        practitioner: () => messages.legacy_practitioner_tailoring(),
    },
];

const TRADESKILL_TIERS = [
    { key: "journeyman", skill: 150, title: (practitioner: string) => messages.legacy_challenge_tradeskill_journeyman({ practitioner }) },
    { key: "expert", skill: 225, title: (practitioner: string) => messages.legacy_challenge_tradeskill_expert({ practitioner }) },
    { key: "artisan", skill: 300, title: (practitioner: string) => messages.legacy_challenge_tradeskill_artisan({ practitioner }) },
];

const TRADESKILL_CHALLENGES: LegacyChallenge[] = TRADESKILLS.flatMap((tradeskill) =>
    TRADESKILL_TIERS.map((tier) => createChallenge({
        id: `tradeskill-${tradeskill.key}-${tier.key}`,
        section: `tradeskills-${tradeskill.key}`,
        icon: tradeskill.icon,
        title: () => tier.title(tradeskill.practitioner()),
        description: () => messages.legacy_challenge_tradeskill_description({
            skill: tier.skill,
            profession: tradeskill.name(),
        }),
    })),
);

// *** DONJONS ***
const DUNGEON_CHALLENGES: LegacyChallenge[] = [
    createChallenge({
        id: "dungeons-novice",
        section: "dungeons",
        icon: "/legacy/dungeons-challenges/novice-spelunker.jpg",
        title: () => messages.legacy_challenge_novice_spelunker_title(),
        description: () => messages.legacy_challenge_dungeon_description(),
        criteria: () => splitCriteria(messages.legacy_challenge_novice_spelunker_criteria()),
    }),
    createChallenge({
        id: "dungeons-experienced",
        section: "dungeons",
        icon: "/legacy/dungeons-challenges/experienced-spelunker.jpg",
        title: () => messages.legacy_challenge_experienced_spelunker_title(),
        description: () => messages.legacy_challenge_dungeon_description(),
        criteria: () => splitCriteria(messages.legacy_challenge_experienced_spelunker_criteria()),
    }),
    createChallenge({
        id: "dungeons-master",
        section: "dungeons",
        icon: "/legacy/dungeons-challenges/master-spelunker.jpg",
        title: () => messages.legacy_challenge_master_spelunker_title(),
        description: () => messages.legacy_challenge_dungeon_description(),
        criteria: () => splitCriteria(messages.legacy_challenge_master_spelunker_criteria()),
    }),
];

// *** RAIDS ***
const RAID_CHALLENGES: LegacyChallenge[] = [
    createChallenge({
        id: "raids-wilds",
        section: "raids",
        icon: "/legacy/raidChallenges/conqueror-of-the-wild.jpg",
        title: () => messages.legacy_challenge_conqueror_wilds_title(),
        description: () => messages.legacy_challenge_conqueror_wilds_description(),
        criteria: () => splitCriteria(messages.legacy_challenge_conqueror_wilds_criteria()),
    }),
    createChallenge({
        id: "raids-deeps",
        section: "raids",
        icon: "/legacy/raidChallenges/conqueror-of-the-deeps.jpg",
        title: () => messages.legacy_challenge_conqueror_deeps_title(),
        description: () => messages.legacy_challenge_conqueror_deeps_description(),
        criteria: () => splitCriteria(messages.legacy_challenge_conqueror_deeps_criteria()),
    }),
    createChallenge({
        id: "raids-lair",
        section: "raids",
        icon: "/legacy/raidChallenges/conqueror-of-the-lair.jpg",
        title: () => messages.legacy_challenge_conqueror_lair_title(),
        description: () => messages.legacy_challenge_conqueror_lair_description(),
    }),
];

// *** JCJ : rangs d'honneur, réputations de champs de bataille, parcours de saison ***
const PVP_RANKS = [
    {
        rank: 3,
        icon: "/legacy/pvpChallenges/pvp-rank-3.jpg",
        name: () => messages.legacy_pvp_rank_3()
    },
    {
        rank: 7,
        icon: "/legacy/pvpChallenges/pvp-rank-7.jpg",
        name: () => messages.legacy_pvp_rank_7()
    },
    {
        rank: 10,
        icon: "/legacy/pvpChallenges/pvp-rank-10.jpg",
        name: () => messages.legacy_pvp_rank_10()
    },
    {
        rank: 13,
        icon: "/legacy/pvpChallenges/pvp-rank-13.jpg",
        name: () => messages.legacy_pvp_rank_13()
    },
    {
        rank: 14,
        icon: "/legacy/pvpChallenges/pvp-rank-14.jpg",
        name: () => messages.legacy_pvp_rank_14()
    },
];

const PVP_RANK_CHALLENGES: LegacyChallenge[] = PVP_RANKS.map((pvpRank) => createChallenge({
    id: `pvp-rank-${pvpRank.rank}`,
    section: "pvp-ranks",
    icon: pvpRank.icon,
    title: () => messages.legacy_challenge_pvp_rank_title({ rank: pvpRank.rank }),
    description: () => messages.legacy_challenge_pvp_rank_description({ rankName: pvpRank.name() }),
}));

const PVP_REPUTATION_CHALLENGES: LegacyChallenge[] = [
    createChallenge({
        id: "pvp-alterac-valley",
        section: "pvp-reputations",
        icon: "/legacy/pvpChallenges/achievement_zone_alteracmountains.jpg",
        title: () => messages.legacy_challenge_master_alterac_title(),
        description: () => messages.legacy_challenge_master_alterac_description(),
    }),
    createChallenge({
        id: "pvp-arathi-basin",
        section: "pvp-reputations",
        icon: "/legacy/pvpChallenges/achievement_zone_arathihighlands.jpg",
        title: () => messages.legacy_challenge_master_arathi_title(),
        description: () => messages.legacy_challenge_master_arathi_description(),
    }),
    createChallenge({
        id: "pvp-warsong-gulch",
        section: "pvp-reputations",
        icon: "/legacy/pvpChallenges/achievement_bg_winwsg.jpg",
        title: () => messages.legacy_challenge_master_warsong_title(),
        description: () => messages.legacy_challenge_master_warsong_description(),
    }),
    createChallenge({
        id: "pvp-darkspear-islands",
        section: "pvp-reputations",
        icon: "/legacy/pvpChallenges/trade_archaeology_troll_tablet.jpg",
        title: () => messages.legacy_challenge_master_darkspear_title(),
        description: () => messages.legacy_challenge_master_darkspear_description(),
    }),
];

const FIELD_OF_HONOR_WEEKS = [4, 7, 10];

const PVP_SEASON_CHALLENGES: LegacyChallenge[] = FIELD_OF_HONOR_WEEKS.map((week) => createChallenge({
    id: `pvp-field-of-honor-${week}`,
    section: "pvp-season",
    icon: "/legacy/pvpChallenges/achievement_rankedpvp_01.jpg",
    title: () => messages.legacy_challenge_field_of_honor_title({ week }),
    description: () => messages.legacy_challenge_field_of_honor_description({ week }),
}));

// *** AVENTURE ***
const ADVENTURE_CHALLENGES: LegacyChallenge[] = [
    createChallenge({
        id: "adventure-valthalak",
        section: "adventure",
        icon: "/legacy/adventureChallenges/achievement_dungeon_upperblackrockspire.jpg",
        title: () => messages.legacy_challenge_valthalak_title(),
        description: () => messages.legacy_challenge_valthalak_description(),
    }),
    createChallenge({
        id: "adventure-explorer",
        section: "adventure",
        icon: "/legacy/adventureChallenges/inv_misc_map08.jpg",
        title: () => messages.legacy_challenge_explorer_title(),
        description: () => messages.legacy_challenge_explorer_description(),
    }),
    createChallenge({
        id: "adventure-beta",
        section: "adventure",
        icon: "/legacy/adventureChallenges/inv_misc_gift_01.jpg",
        points: 16,
        countsTowardTotal: false,
        title: () => messages.legacy_challenge_beta_title(),
        description: () => messages.legacy_challenge_beta_description(),
    }),
];

// *** AVENTURE : exploration (ne rapporte pas de point, mais compte pour « Explorer ») ***
const EASTERN_KINGDOMS_ZONES = [
    { key: "alterac-mountains", icon: "/legacy/pvpChallenges/achievement_zone_alteracmountains.jpg", name: () => messages.legacy_zone_alterac_mountains() },
    { key: "arathi-highlands", icon: "/legacy/pvpChallenges/achievement_zone_arathihighlands.jpg", name: () => messages.legacy_zone_arathi_highlands() },
    { key: "badlands", icon: "/legacy/adventureChallenges/achievement_zone_badlands_01.jpg", name: () => messages.legacy_zone_badlands() },
    { key: "blasted-lands", icon: "/legacy/adventureChallenges/achievement_zone_blastedlands_01.jpg", name: () => messages.legacy_zone_blasted_lands() },
    { key: "burning-steppes", icon: "/legacy/adventureChallenges/achievement_zone_burningsteppes_01.jpg", name: () => messages.legacy_zone_burning_steppes() },
    { key: "deadwind-pass", icon: "/legacy/adventureChallenges/achievement_zone_deadwindpass.jpg", name: () => messages.legacy_zone_deadwind_pass() },
    { key: "dun-morogh", icon: "/legacy/adventureChallenges/achievement_zone_dunmorogh.jpg", name: () => messages.legacy_zone_dun_morogh() },
    { key: "duskwood", icon: "/legacy/adventureChallenges/achievement_zone_duskwood.jpg", name: () => messages.legacy_zone_duskwood() },
    { key: "eastern-plaguelands", icon: "/legacy/adventureChallenges/achievement_zone_easternplaguelands.jpg", name: () => messages.legacy_zone_eastern_plaguelands() },
    { key: "elwynn-forest", icon: "/legacy/adventureChallenges/achievement_zone_elwynnforest.jpg", name: () => messages.legacy_zone_elwynn_forest() },
    { key: "hillsbrad-foothills", icon: "/legacy/adventureChallenges/achievement_zone_hillsbradfoothills.jpg", name: () => messages.legacy_zone_hillsbrad_foothills() },
    { key: "the-hinterlands", icon: "/legacy/adventureChallenges/achievement_zone_hinterlands_01.jpg", name: () => messages.legacy_zone_the_hinterlands() },
    { key: "loch-modan", icon: "/legacy/adventureChallenges/achievement_zone_lochmodan.jpg", name: () => messages.legacy_zone_loch_modan() },
    { key: "redridge-mountains", icon: "/legacy/adventureChallenges/achievement_zone_redridgemountains.jpg", name: () => messages.legacy_zone_redridge_mountains() },
    { key: "riverglades", icon: "/legacy/adventureChallenges/achievement_zone_nagrand_02.jpg", name: () => messages.legacy_zone_riverglades() },
    { key: "searing-gorge", icon: "/legacy/adventureChallenges/achievement_zone_searinggorge_01.jpg", name: () => messages.legacy_zone_searing_gorge() },
    { key: "silverpine-forest", icon: "/legacy/adventureChallenges/achievement_zone_silverpine_01.jpg", name: () => messages.legacy_zone_silverpine_forest() },
    { key: "stranglethorn-vale", icon: "/legacy/adventureChallenges/achievement_zone_stranglethorn_01.jpg", name: () => messages.legacy_zone_stranglethorn_vale() },
    { key: "swamp-of-sorrows", icon: "/legacy/adventureChallenges/achievement_zone_swampsorrows_01.jpg", name: () => messages.legacy_zone_swamp_of_sorrows() },
    { key: "tirisfal-glades", icon: "/legacy/adventureChallenges/achievement_zone_tirisfalglades_01.jpg", name: () => messages.legacy_zone_tirisfal_glades() },
    { key: "western-plaguelands", icon: "/legacy/adventureChallenges/achievement_zone_westernplaguelands_01.jpg", name: () => messages.legacy_zone_western_plaguelands() },
    { key: "westfall", icon: "/legacy/adventureChallenges/achievement_zone_westfall_01.jpg", name: () => messages.legacy_zone_westfall() },
    { key: "wetlands", icon: "/legacy/adventureChallenges/achievement_zone_wetlands_01.jpg", name: () => messages.legacy_zone_wetlands() },
];

const KALIMDOR_ZONES = [
    { key: "ashenvale", icon: "/legacy/adventureChallenges/achievement_zone_ashenvale_01.jpg", name: () => messages.legacy_zone_ashenvale() },
    { key: "azshara", icon: "/legacy/adventureChallenges/achievement_zone_azshara_01.jpg", name: () => messages.legacy_zone_azshara() },
    { key: "the-barrens", icon: "/legacy/adventureChallenges/achievement_zone_barrens_01.jpg", name: () => messages.legacy_zone_the_barrens() },
    { key: "darkshore", icon: "/legacy/adventureChallenges/achievement_zone_darkshore_01.jpg", name: () => messages.legacy_zone_darkshore() },
    { key: "desolace", icon: "/legacy/adventureChallenges/achievement_zone_desolace.jpg", name: () => messages.legacy_zone_desolace() },
    { key: "durotar", icon: "/legacy/adventureChallenges/achievement_zone_durotar.jpg", name: () => messages.legacy_zone_durotar() },
    { key: "dustwallow-marsh", icon: "/legacy/adventureChallenges/achievement_zone_dustwallowmarsh.jpg", name: () => messages.legacy_zone_dustwallow_marsh() },
    { key: "felwood", icon: "/legacy/adventureChallenges/achievement_zone_felwood.jpg", name: () => messages.legacy_zone_felwood() },
    { key: "feralas", icon: "/legacy/adventureChallenges/achievement_zone_feralas.jpg", name: () => messages.legacy_zone_feralas() },
    { key: "moonglade", icon: "/legacy/adventureChallenges/spell_arcane_teleportmoonglade.jpg", name: () => messages.legacy_zone_moonglade() },
    { key: "mount-hyjal", icon: "/legacy/adventureChallenges/achievement_zone_mount-hyjal.jpg", name: () => messages.legacy_zone_mount_hyjal() },
    { key: "mulgore", icon: "/legacy/adventureChallenges/achievement_zone_mulgore_01.jpg", name: () => messages.legacy_zone_mulgore() },
    { key: "shendralas", icon: "/legacy/adventureChallenges/ability_warstomp.jpg", name: () => messages.legacy_zone_shendralas() },
    { key: "silithus", icon: "/legacy/adventureChallenges/achievement_zone_silithus_01.jpg", name: () => messages.legacy_zone_silithus() },
    { key: "stonetalon-mountains", icon: "/legacy/adventureChallenges/achievement_zone_stonetalon_01.jpg", name: () => messages.legacy_zone_stonetalon_mountains() },
    { key: "tanaris", icon: "/legacy/adventureChallenges/achievement_zone_tanaris_01.jpg", name: () => messages.legacy_zone_tanaris() },
    { key: "teldrassil", icon: "/legacy/adventureChallenges/achievement_zone_darnassus.jpg", name: () => messages.legacy_zone_teldrassil() },
    { key: "thousand-needles", icon: "/legacy/adventureChallenges/achievement_zone_thousandneedles_01.jpg", name: () => messages.legacy_zone_thousand_needles() },
    { key: "ungoro-crater", icon: "/legacy/adventureChallenges/achievement_zone_ungorocrater_01.jpg", name: () => messages.legacy_zone_ungoro_crater() },
    { key: "winterspring", icon: "/legacy/adventureChallenges/achievement_zone_winterspring.jpg", name: () => messages.legacy_zone_winterspring() },
];

type Zone = (typeof EASTERN_KINGDOMS_ZONES)[number];

function createZoneChallenges(zones: Zone[], section: string, parent: () => string): LegacyChallenge[] {
    return zones.map((zone) => createChallenge({
        id: `explore-${zone.key}`,
        section,
        icon: zone.icon,
        points: 0,
        title: () => messages.legacy_challenge_explore_zone_title({ zone: zone.name() }),
        description: () => messages.legacy_challenge_explore_zone_description({ zone: zone.name() }),
        parent,
    }));
}

const EXPLORER_CHALLENGES: LegacyChallenge[] = [
    createChallenge({
        id: "explore-azeroth",
        section: "adventure-explorer",
        icon: "/legacy/adventureChallenges/inv_misc_map09.jpg",
        points: 0,
        title: () => messages.legacy_challenge_explore_azeroth_title(),
        description: () => messages.legacy_challenge_explore_azeroth_description(),
        criteria: () => [
            messages.legacy_challenge_section_adventure_eastern_kingdoms(),
            messages.legacy_challenge_section_adventure_kalimdor(),
        ],
        parent: () => messages.legacy_challenge_explorer_title(),
    }),
    createChallenge({
        id: "explore-eastern-kingdoms",
        section: "adventure-explorer",
        icon: "/legacy/adventureChallenges/achievement_zone_easternkingdoms_01.jpg",
        points: 0,
        title: () => messages.legacy_challenge_explore_eastern_kingdoms_title(),
        description: () => messages.legacy_challenge_explore_eastern_kingdoms_description(),
        criteria: () => EASTERN_KINGDOMS_ZONES.map((zone) => zone.name()),
        parent: () => messages.legacy_challenge_explore_azeroth_title(),
    }),
    createChallenge({
        id: "explore-kalimdor",
        section: "adventure-explorer",
        icon: "/legacy/adventureChallenges/achievement_zone_kalimdor_01.jpg",
        points: 0,
        title: () => messages.legacy_challenge_explore_kalimdor_title(),
        description: () => messages.legacy_challenge_explore_kalimdor_description(),
        criteria: () => KALIMDOR_ZONES.map((zone) => zone.name()),
        parent: () => messages.legacy_challenge_explore_azeroth_title(),
    }),
];

const ZONE_CHALLENGES: LegacyChallenge[] = [
    ...createZoneChallenges(
        EASTERN_KINGDOMS_ZONES, "adventure-eastern-kingdoms", () => messages.legacy_challenge_explore_eastern_kingdoms_title(),
    ),
    ...createZoneChallenges(
        KALIMDOR_ZONES, "adventure-kalimdor", () => messages.legacy_challenge_explore_kalimdor_title(),
    ),
];

// *** NAVIGATION : catégories dépliables ***
export const LEGACY_CHALLENGE_SECTIONS: LegacyChallengeSection[] = [
    {
        id: "classes",
        label: () => messages.legacy_challenge_group_classes(),
        children: CLASSES.map((wowClass) => ({ id: `classes-${wowClass.key}`, label: wowClass.name })),
    },
    {
        id: "tradeskills",
        label: () => messages.legacy_challenge_group_tradeskills(),
        children: TRADESKILLS.map((tradeskill) => ({ id: `tradeskills-${tradeskill.key}`, label: tradeskill.name })),
    },
    { id: "dungeons", label: () => messages.legacy_challenge_group_dungeons() },
    { id: "raids", label: () => messages.legacy_challenge_group_raids() },
    {
        id: "pvp",
        label: () => messages.legacy_challenge_group_pvp(),
        children: [
            { id: "pvp-ranks", label: () => messages.legacy_challenge_section_pvp_ranks() },
            { id: "pvp-reputations", label: () => messages.legacy_challenge_section_pvp_reputations() },
            { id: "pvp-season", label: () => messages.legacy_challenge_section_pvp_season() },
        ],
    },
    {
        id: "adventure",
        label: () => messages.legacy_challenge_group_adventure(),
        children: [
            { id: "adventure-explorer", label: () => messages.legacy_challenge_section_adventure_explorer() },
            { id: "adventure-eastern-kingdoms", label: () => messages.legacy_challenge_section_adventure_eastern_kingdoms() },
            { id: "adventure-kalimdor", label: () => messages.legacy_challenge_section_adventure_kalimdor() },
        ],
    },
];


export const LEGACY_CHALLENGES: LegacyChallenge[] = [
    ...CLASS_CHALLENGES,
    ...TRADESKILL_CHALLENGES,
    ...DUNGEON_CHALLENGES,
    ...RAID_CHALLENGES,
    ...PVP_RANK_CHALLENGES,
    ...PVP_REPUTATION_CHALLENGES,
    ...PVP_SEASON_CHALLENGES,
    ...ADVENTURE_CHALLENGES,
    ...EXPLORER_CHALLENGES,
    ...ZONE_CHALLENGES,
];