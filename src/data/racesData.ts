import type { ClassId, Race, RaceClass } from "$types/raceTypes";
import * as messages from "$paraglide/messages";

/**
 * Données des raciaux de WoW Forever, saisies à la main (aucun back nécessaire).
 * Les textes vivent dans les fichiers Paraglide (clés racial_<id>_name / _description / _classic).
 * Mettre à jour ces deux constantes à chaque révision des données.
 */
export const RACES_DATA_BUILD = "1.60.1.70450";
export const RACES_DATA_DATE = "2026-10-27";

const cls = (id: ClassId, isNewCombination = false): RaceClass => ({ id, isNewCombination });

export const RACES: Race[] = [
    {
        id: "human",
        faction: "alliance",
        portrait: "./src/assets/images/races/human.jpg",
        classes: [cls("warrior"), cls("paladin"), cls("hunter", true), cls("rogue"), cls("priest"), cls("mage"), cls("warlock")],
        racials: [
            {
                id: "human-perception", status: "unchanged", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_human_perception_name(),
                icon: "./src/assets/images/racials/human/perception.jpg",
                description: () => messages.racial_human_perception_description(),
            },
            {
                id: "human-will-to-survive", status: "new", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_human_will_to_survive_name(),
                icon: "./src/assets/images/racials/human/will-to-survive.jpg",
                description: () => messages.racial_human_will_to_survive_description(),
            },
            {
                id: "human-ruthlessness", status: "new", kind: "passive",
                name: () => messages.racial_human_ruthlessness_name(),
                icon: "./src/assets/images/racials/human/ruthless.jpg",
                description: () => messages.racial_human_ruthlessness_description(),
            },
            {
                id: "human-spirit", status: "modified", kind: "passive",
                name: () => messages.racial_human_spirit_name(),
                icon: "./src/assets/images/racials/human/human-spirit.jpg",
                description: () => messages.racial_human_spirit_description(),
                classic: () => messages.racial_human_spirit_classic(),
            },
            {
                id: "human-diplomacy", status: "removed", kind: "passive",
                name: () => messages.racial_human_diplomacy_name(),
                icon: "./src/assets/images/racials/human/diplomacy.jpg",
                description: () => messages.racial_human_diplomacy_description(),
            },
            {
                id: "human-mace-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_human_mace_specialization_name(),
                icon: "./src/assets/images/racials/human/mace-specialization.jpg",
                description: () => messages.racial_human_mace_specialization_description(),
            },
            {
                id: "human-sword-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_human_sword_specialization_name(),
                icon: "./src/assets/images/racials/human/sword-specialization.jpg",
                description: () => messages.racial_human_sword_specialization_description(),
            },
        ],
    },
    {
        id: "dwarf",
        faction: "alliance",
        portrait: "./src/assets/images/races/dwarf.jpg",
        classes: [cls("warrior"), cls("paladin"), cls("hunter"), cls("rogue"), cls("priest"), cls("shaman", true)],
        racials: [
            {
                id: "dwarf-find-treasure", status: "unchanged", kind: "passive",
                icon: "./src/assets/images/racials/dwarf/find-treasure.png",
                name: () => messages.racial_dwarf_find_treasure_name(),
                description: () => messages.racial_dwarf_find_treasure_description(),
            },
            {
                id: "dwarf-stoneform", status: "modified", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_dwarf_stoneform_name(),
                icon: "./src/assets/images/racials/dwarf/stoneform.jpg",
                description: () => messages.racial_dwarf_stoneform_description(),
                classic: () => messages.racial_dwarf_stoneform_classic(),
            },
            {
                id: "dwarf-big-game-hunter", status: "new", kind: "passive",
                name: () => messages.racial_dwarf_big_game_hunter_name(),
                icon: "./src/assets/images/racials/dwarf/big-game-hunter.jpg",
                description: () => messages.racial_dwarf_big_game_hunter_description(),
            },
            {
                id: "dwarf-artisans-precision", status: "new", kind: "passive",
                name: () => messages.racial_dwarf_artisans_precision_name(),
                icon: "./src/assets/images/racials/dwarf/earth-fury.jpg",
                description: () => messages.racial_dwarf_artisans_precision_description(),
            },
            {
                id: "dwarf-frost-resistance", status: "removed", kind: "passive",
                name: () => messages.racial_dwarf_frost_resistance_name(),
                icon: "./src/assets/images/racials/dwarf/frost-resistance.jpg",
                description: () => messages.racial_dwarf_frost_resistance_description(),
            },
            {
                id: "dwarf-gun-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_dwarf_gun_specialization_name(),
                icon: "./src/assets/images/racials/dwarf/gun-specialization.jpg",
                description: () => messages.racial_dwarf_gun_specialization_description(),
            },
        ],
    },
    {
        id: "nightElf",
        faction: "alliance",
        portrait: "./src/assets/images/races/night-elf.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("rogue"), cls("priest"), cls("druid")],
        racials: [
            {
                id: "night-elf-elunes-light", status: "new", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_night_elf_elunes_light_name(),
                icon: "./src/assets/images/racials/nightElf/elunes-light.jpg",
                description: () => messages.racial_night_elf_elunes_light_description(),
            },
            {
                id: "night-elf-shadowmeld", status: "modified", kind: "active", cooldownSeconds: 10,
                name: () => messages.racial_night_elf_shadowmeld_name(),
                icon: "./src/assets/images/racials/nightElf/shadowmeld.jpg",
                description: () => messages.racial_night_elf_shadowmeld_description(),
                classic: () => messages.racial_night_elf_shadowmeld_classic(),
            },
            {
                id: "night-elf-quickness", status: "modified", kind: "passive",
                name: () => messages.racial_night_elf_quickness_name(),
                icon: "./src/assets/images/racials/nightElf/quickness.png",
                description: () => messages.racial_night_elf_quickness_description(),
                classic: () => messages.racial_night_elf_quickness_classic(),
            },
            {
                id: "night-elf-wisp-spirit", status: "modified", kind: "passive",
                name: () => messages.racial_night_elf_wisp_spirit_name(),
                icon: "./src/assets/images/racials/nightElf/wisp-spirit.jpg",
                description: () => messages.racial_night_elf_wisp_spirit_description(),
                classic: () => messages.racial_night_elf_wisp_spirit_classic(),
            },
            {
                id: "night-elf-nature-resistance", status: "removed", kind: "passive",
                name: () => messages.racial_night_elf_nature_resistance_name(),
                icon: "./src/assets/images/racials/nightElf/nature-resistance.png",
                description: () => messages.racial_night_elf_nature_resistance_description(),
            },
        ],
    },
    {
        id: "gnome",
        faction: "alliance",
        portrait: "./src/assets/images/races/gnome.jpg",
        classes: [cls("warrior"), cls("rogue"), cls("priest", true), cls("mage"), cls("warlock")],
        racials: [
            {
                id: "gnome-escape-artist", status: "modified", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_gnome_escape_artist_name(),
                icon: "./src/assets/images/racials/gnome/escape-artist.jpg",
                description: () => messages.racial_gnome_escape_artist_description(),
                classic: () => messages.racial_gnome_escape_artist_classic(),
            },
            {
                id: "gnome-eureka", status: "new", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_gnome_eureka_name(),
                icon: "./src/assets/images/racials/gnome/eureka.jpg",
                description: () => messages.racial_gnome_eureka_description(),
            },
            {
                id: "gnome-engineering-specialization", status: "modified", kind: "passive",
                name: () => messages.racial_gnome_engineering_specialization_name(),
                icon: "./src/assets/images/racials/gnome/engineering.jpg",
                description: () => messages.racial_gnome_engineering_specialization_description(),
                classic: () => messages.racial_gnome_engineering_specialization_classic(),
            },
            {
                id: "gnome-expansive-mind", status: "modified", kind: "passive",
                name: () => messages.racial_gnome_expansive_mind_name(),
                icon: "./src/assets/images/racials/gnome/expansive-mind.jpg",
                description: () => messages.racial_gnome_expansive_mind_description(),
                classic: () => messages.racial_gnome_expansive_mind_classic(),
            },
            {
                id: "gnome-arcane-resistance", status: "removed", kind: "passive",
                name: () => messages.racial_gnome_arcane_resistance_name(),
                icon: "./src/assets/images/racials/gnome/arcane-resistance.jpg",
                description: () => messages.racial_gnome_arcane_resistance_description(),
            },
        ],
    },
    {
        id: "highOrderSkyborne",
        faction: "alliance",
        portrait: "./src/assets/images/races/skyborne.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("rogue"), cls("mage"), cls("druid")],
        racials: [
            {
                id: "high-order-skyborne-read-leyline", status: "new", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_high_order_skyborne_read_leyline_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/read-leyline.jpg",
                description: () => messages.racial_high_order_skyborne_read_leyline_description(),
            },
            {
                id: "high-order-skyborne-walk-on-air", status: "new", kind: "active", cooldownSeconds: 90,
                name: () => messages.racial_high_order_skyborne_walk_on_air_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/walk-on-air.jpg",
                description: () => messages.racial_high_order_skyborne_walk_on_air_description(),
            },
            {
                id: "high-order-skyborne-elemental-knowledge", status: "new", kind: "passive",
                name: () => messages.racial_high_order_skyborne_elemental_knowledge_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/elemental-insight.jpg",
                description: () => messages.racial_high_order_skyborne_elemental_knowledge_description(),
            },
            {
                id: "high-order-skyborne-blessing-of-the-wind", status: "new", kind: "passive",
                name: () => messages.racial_high_order_skyborne_blessing_of_the_wind_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/wind-blessed.jpg",
                description: () => messages.racial_high_order_skyborne_blessing_of_the_wind_description(),
            },
        ],
    },
    {
        id: "orc",
        faction: "horde",
        portrait: "./src/assets/images/races/orc.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("rogue"), cls("shaman"), cls("mage", true), cls("warlock")],
        racials: [
            {
                id: "orc-blood-fury", status: "modified", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_orc_blood_fury_name(),
                icon: "./src/assets/images/racials/orc/blood-fury.png",
                description: () => messages.racial_orc_blood_fury_description(),
                classic: () => messages.racial_orc_blood_fury_classic(),
            },
            {
                id: "orc-curse-breaker", status: "new", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_orc_curse_breaker_name(),
                icon: "./src/assets/images/racials/orc/shatter-curse.jpg",
                description: () => messages.racial_orc_curse_breaker_description(),
            },
            {
                id: "orc-hardiness", status: "modified", kind: "passive",
                name: () => messages.racial_orc_hardiness_name(),
                icon: "./src/assets/images/racials/orc/hardiness.jpg",
                description: () => messages.racial_orc_hardiness_description(),
                classic: () => messages.racial_orc_hardiness_classic(),
            },
            {
                id: "orc-savage", status: "new", kind: "passive",
                name: () => messages.racial_orc_savage_name(),
                icon: "./src/assets/images/racials/orc/savage.jpg",
                description: () => messages.racial_orc_savage_description(),
            },
            {
                id: "orc-command", status: "removed", kind: "passive",
                name: () => messages.racial_orc_command_name(),
                icon: "./src/assets/images/racials/orc/command.jpg",
                description: () => messages.racial_orc_command_description(),
            },
            {
                id: "orc-axe-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_orc_axe_specialization_name(),
                icon: "./src/assets/images/racials/orc/savage.jpg",
                description: () => messages.racial_orc_axe_specialization_description(),
            },
        ],
    },
    {
        id: "undead",
        faction: "horde",
        portrait: "./src/assets/images/races/undead.jpg",
        classes: [cls("warrior"), cls("paladin", true), cls("rogue"), cls("priest"), cls("mage"), cls("warlock")],
        racials: [
            {
                id: "undead-cannibalize", status: "modified", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_undead_cannibalize_name(),
                icon: "./src/assets/images/racials/undead/cannibalize.png",
                description: () => messages.racial_undead_cannibalize_description(),
                classic: () => messages.racial_undead_cannibalize_classic(),
            },
            {
                id: "undead-will-of-the-forsaken", status: "modified", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_undead_will_of_the_forsaken_name(),
                icon: "./src/assets/images/racials/undead/will-of-the-forsaken.jpg",
                description: () => messages.racial_undead_will_of_the_forsaken_description(),
                classic: () => messages.racial_undead_will_of_the_forsaken_classic(),
            },
            {
                id: "undead-touch-of-the-grave", status: "new", kind: "passive",
                name: () => messages.racial_undead_touch_of_the_grave_name(),
                icon: "./src/assets/images/racials/undead/touch-of-the-grave.jpg",
                description: () => messages.racial_undead_touch_of_the_grave_description(),
            },
            {
                id: "undead-underwater-breathing", status: "unchanged", kind: "passive",
                name: () => messages.racial_undead_underwater_breathing_name(),
                icon: "./src/assets/images/racials/undead/underwater-breathing.jpg",
                description: () => messages.racial_undead_underwater_breathing_description(),
            },
            {
                id: "undead-shadow-resistance", status: "removed", kind: "passive",
                name: () => messages.racial_undead_shadow_resistance_name(),
                icon: "./src/assets/images/racials/undead/shadow-resistance.jpg",
                description: () => messages.racial_undead_shadow_resistance_description(),
            },
        ],
    },
    {
        id: "tauren",
        faction: "horde",
        portrait: "./src/assets/images/races/tauren.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("shaman"), cls("druid")],
        racials: [
            {
                id: "tauren-cultivation", status: "modified", kind: "active", cooldownSeconds: 900,
                name: () => messages.racial_tauren_cultivation_name(),
                icon: "./src/assets/images/racials/tauren/cultivation.jpg",
                description: () => messages.racial_tauren_cultivation_description(),
                classic: () => messages.racial_tauren_cultivation_classic(),
            },
            {
                id: "tauren-war-stomp", status: "modified", kind: "active", cooldownSeconds: 90,
                name: () => messages.racial_tauren_war_stomp_name(),
                icon: "./src/assets/images/racials/tauren/cultivation.jpg",
                description: () => messages.racial_tauren_war_stomp_description(),
                classic: () => messages.racial_tauren_war_stomp_classic(),
            },
            {
                id: "tauren-endurance", status: "unchanged", kind: "passive",
                name: () => messages.racial_tauren_endurance_name(),
                icon: "./src/assets/images/racials/tauren/endurance.jpg",
                description: () => messages.racial_tauren_endurance_description(),
            },
            {
                id: "tauren-plainsrunning", status: "new", kind: "passive",
                name: () => messages.racial_tauren_plainsrunning_name(),
                icon: "./src/assets/images/racials/tauren/plainsrunning.jpg",
                description: () => messages.racial_tauren_plainsrunning_description(),
            },
            {
                id: "tauren-nature-resistance", status: "removed", kind: "passive",
                name: () => messages.racial_tauren_nature_resistance_name(),
                icon: "./src/assets/images/racials/nightElf/nature-resistance.png",
                description: () => messages.racial_tauren_nature_resistance_description(),
            },
        ],
    },
    {
        id: "troll",
        faction: "horde",
        portrait: "./src/assets/images/races/troll.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("rogue"), cls("priest"), cls("shaman"), cls("mage"), cls("warlock", true)],
        racials: [
            {
                id: "troll-berserking", status: "modified", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_troll_berserking_name(),
                icon: "./src/assets/images/racials/troll/berserking.png",
                description: () => messages.racial_troll_berserking_description(),
                classic: () => messages.racial_troll_berserking_classic(),
            },
            {
                id: "troll-rapid-regeneration", status: "new", kind: "active", cooldownSeconds: 180,
                name: () => messages.racial_troll_rapid_regeneration_name(),
                icon: "./src/assets/images/racials/troll/rapid-regeneration.png",
                description: () => messages.racial_troll_rapid_regeneration_description(),
            },
            {
                id: "troll-beast-slaying", status: "unchanged", kind: "passive",
                name: () => messages.racial_troll_beast_slaying_name(),
                icon: "./src/assets/images/racials/troll/beast-slaying.jpg",
                description: () => messages.racial_troll_beast_slaying_description(),
            },
            {
                id: "troll-regeneration", status: "modified", kind: "passive",
                name: () => messages.racial_troll_regeneration_name(),
                icon: "./src/assets/images/racials/troll/regeneration.jpg",
                description: () => messages.racial_troll_regeneration_description(),
                classic: () => messages.racial_troll_regeneration_classic(),
            },
            {
                id: "troll-bow-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_troll_bow_specialization_name(),
                icon: "./src/assets/images/racials/troll/bow-specialization.jpg",
                description: () => messages.racial_troll_bow_specialization_description(),
            },
            {
                id: "troll-throwing-specialization", status: "removed", kind: "passive",
                name: () => messages.racial_troll_throwing_specialization_name(),
                icon: "./src/assets/images/racials/troll/throwing-specialization.jpg",
                description: () => messages.racial_troll_throwing_specialization_description(),
            },
        ],
    },
    {
        id: "windshaperSkyborne",
        faction: "horde",
        portrait: "./src/assets/images/races/skyborne.jpg",
        classes: [cls("warrior"), cls("hunter"), cls("rogue"), cls("shaman"), cls("druid")],
        racials: [
            {
                id: "windshaper-skyborne-skysight", status: "new", kind: "active", cooldownSeconds: 120,
                name: () => messages.racial_windshaper_skyborne_skysight_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/skysight.jpg",
                description: () => messages.racial_windshaper_skyborne_skysight_description(),
            },
            {
                id: "windshaper-skyborne-walk-on-air", status: "new", kind: "active", cooldownSeconds: 90,
                name: () => messages.racial_windshaper_skyborne_walk_on_air_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/walk-on-air.jpg",
                description: () => messages.racial_windshaper_skyborne_walk_on_air_description(),
            },
            {
                id: "windshaper-skyborne-elemental-knowledge", status: "new", kind: "passive",
                name: () => messages.racial_windshaper_skyborne_elemental_knowledge_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/element-insight.jpg",
                description: () => messages.racial_windshaper_skyborne_elemental_knowledge_description(),
            },
            {
                id: "windshaper-skyborne-blessing-of-the-wind", status: "new", kind: "passive",
                name: () => messages.racial_windshaper_skyborne_blessing_of_the_wind_name(),
                icon: "./src/assets/images/racials/highOrderSkyborne/wind-blessed.jpg",
                description: () => messages.racial_windshaper_skyborne_blessing_of_the_wind_description(),
            },
        ],
    },
];