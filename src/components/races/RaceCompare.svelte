<script lang="ts">
    import RaceCompareSelector from "$components/races/RaceCompareSelector.svelte";
    import RaceCard from "$components/races/RaceCard.svelte";
    import * as messages from "$paraglide/messages";
    import { races } from "$stores/stores.svelte";

    const hintLabel = messages.races_compare_hint();
</script>

<section class="race-compare">
    <RaceCompareSelector />

    {#if races.comparedRaces.length < 2}
        <p class="race-compare-hint">{hintLabel}</p>
    {/if}

    {#if races.comparedRaces.length > 0}
        <div class="race-compare-scroller">
            <ul class="race-compare-columns">
                {#each races.comparedRaces as race (race.id)}
                    <li><RaceCard {race} /></li>
                {/each}
            </ul>
        </div>
    {/if}
</section>

<style lang="scss">
    .race-compare {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        min-width: 0;

        &-hint {
            margin: 0;
            text-align: center;
        }

        &-scroller {
            width: 100%;
            padding-bottom: 0.75rem;
            overflow-x: auto;
        }

        &-columns {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: minmax(22rem, 1fr);
            gap: 1.5rem;
            align-items: start;
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                min-width: 0;
            }
        }
    }
</style>