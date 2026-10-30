<script lang="ts">
    import RaceCard from "$components/races/RaceCard.svelte";
    import { getFactionLabel } from "$utils/raceUtils";
    import * as messages from "$paraglide/messages";
    import { races } from "$stores/stores.svelte";
    import { FACTION_IDS } from "$config/races";

    const emptyLabel = messages.races_empty();

    const sections = $derived(
        FACTION_IDS
            .map((id) => ({ id, label: getFactionLabel(id), races: races.overviewRaces.filter((race) => race.faction === id) }))
            .filter((section) => section.races.length > 0)
    );
</script>

{#if sections.length === 0}
    <p class="race-grid-empty">{emptyLabel}</p>
{:else}
    {#each sections as section (section.id)}
        <section class="race-grid" data-faction={section.id}>
            <h2 class="race-grid-title">{section.label}</h2>

            <ul class="race-grid-list">
                {#each section.races as race (race.id)}
                    <li><RaceCard {race} /></li>
                {/each}
            </ul>
        </section>
    {/each}
{/if}

<style lang="scss">
    .race-grid {
        --faction-color: var(--main-border-color);

        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        &[data-faction="alliance"] { --faction-color: var(--alliance-color); }
        &[data-faction="horde"] { --faction-color: var(--horde-color); }

        &-title {
            margin: 0;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid var(--faction-color);
            font-family: var(--second-font-family);
            font-size: 1.6rem;
            color: var(--faction-color);
        }

        &-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
            gap: 1.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
            align-items: start;

            li {
                min-width: 0;
            }
        }

        &-empty {
            margin: 0;
            text-align: center;
        }
    }
</style>