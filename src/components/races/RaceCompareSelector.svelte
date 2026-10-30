<script lang="ts">
    import { filterRacesByFaction, getFactionLabel, getRaceLabel } from "$utils/raceUtils";
    import * as messages from "$paraglide/messages";
    import { races } from "$stores/stores.svelte";
    import { FACTION_IDS } from "$config/races";
    import { RACES } from "$data/racesData";

    const titleLabel = messages.races_compare_pick_title();
    const allAllianceLabel = messages.races_compare_all_alliance();
    const allHordeLabel = messages.races_compare_all_horde();
    const clearLabel = messages.races_compare_clear();

    const availableIds = $derived(races.availableRaces.map((race) => race.id));
    const groups = FACTION_IDS.map((id) => ({
        id,
        label: getFactionLabel(id),
        races: filterRacesByFaction(RACES, id),
    }));
</script>

<fieldset class="compare-selector">
    <legend>{titleLabel}</legend>

    <div class="compare-selector-shortcuts">
        <button type="button" class="navbar-style-button" onclick={() => races.compareFaction("alliance")}>
            {allAllianceLabel}
        </button>
        <button type="button" class="navbar-style-button" onclick={() => races.compareFaction("horde")}>
            {allHordeLabel}
        </button>
        <button type="button" class="navbar-style-button" onclick={() => races.clearCompare()}>
            {clearLabel}
        </button>
    </div>

    {#each groups as group (group.id)}
        <div class="compare-selector-group" data-faction={group.id}>
            <h3>{group.label}</h3>
            <ul>
                {#each group.races as race (race.id)}
                    {@const isAvailable = availableIds.includes(race.id)}
                    <li>
                        <label class="compare-selector-option" class:disabled={!isAvailable}>
                            <input type="checkbox" checked={races.compareIds.includes(race.id)}
                                   disabled={!isAvailable} onchange={() => races.toggleCompare(race.id)} />
                            {getRaceLabel(race.id)}
                        </label>
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</fieldset>

<style lang="scss">
    .compare-selector {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 0;
        margin: 0;
        padding: 1rem 1.25rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        legend {
            padding: 0 0.5rem;
            font-family: var(--second-font-family);
        }

        &-shortcuts {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            button {
                border: 1px solid var(--main-border-color);
                font-size: 0.9rem;
            }
        }

        &-group {
            --faction-color: var(--main-border-color);

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem 1rem;

            &[data-faction="alliance"] { --faction-color: var(--alliance-color); }
            &[data-faction="horde"] { --faction-color: var(--horde-color); }

            h3 {
                min-width: 5rem;
                margin: 0;
                font-family: var(--second-font-family);
                font-size: 1rem;
                font-weight: 400;
                color: var(--faction-color);
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem 1.25rem;
                margin: 0;
                padding: 0;
                list-style: none;
            }
        }

        &-option {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;

            input {
                width: 1.1rem;
                height: 1.1rem;
                margin: 0;
                accent-color: var(--main-text-color);
            }

            &.disabled {
                cursor: not-allowed;
                opacity: 0.4;
            }
        }
    }
</style>