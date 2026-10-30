<script lang="ts">
    import { RACES_DATA_BUILD, RACES_DATA_DATE } from "$data/racesData";
    import RaceFilters from "$components/races/RaceFilters.svelte";
    import RaceCompare from "$components/races/RaceCompare.svelte";
    import RaceGrid from "$components/races/RaceGrid.svelte";
    import { app, races } from "$stores/stores.svelte";
    import * as messages from "$paraglide/messages";
    import { formatDate } from "$utils/dateUtils";

    const titleLabel = messages.races_title();
    const subtitleLabel = messages.races_subtitle();

    const sourceLabel = $derived(
        messages.races_data_source({
            build: RACES_DATA_BUILD,
            date: formatDate(RACES_DATA_DATE, app.activeLocale),
        })
    );
</script>

<section class="races">
    <header class="races-header">
        <h1>{titleLabel}</h1>
        <p>{subtitleLabel}</p>
    </header>

    <RaceFilters />

    {#if races.view === "overview"}
        <RaceGrid />
    {:else}
        <RaceCompare />
    {/if}

    <p class="races-source">{sourceLabel}</p>
</section>

<style lang="scss">
    .races {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
        padding: 3rem 1rem;

        &-header {
            text-align: center;

            h1 {
                margin: 1rem 0 0.5rem;
                font-family: var(--second-font-family);
                font-size: 2.5rem;
            }

            p {
                margin-bottom: 2rem;
            }
        }

        &-source {
            margin: 0;
            font-size: 0.85rem;
            text-align: center;
            opacity: 0.7;
        }
    }
</style>