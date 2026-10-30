<script lang="ts">
    import { countRacialsByStatus, filterRacialsByStatus, getClassLabel, getFactionLabel, getRaceLabel } from "$utils/raceUtils";
    import RacialStatusBadge from "$components/races/RacialStatusBadge.svelte";
    import RacialItem from "$components/races/RacialItem.svelte";
    import { RACIAL_STATUSES } from "$config/races";
    import type { Race } from "$types/raceTypes";
    import * as messages from "$paraglide/messages";
    import { races } from "$stores/stores.svelte";

    let { race }: { race: Race } = $props();

    const compareLabel = messages.races_compare_toggle();
    const classesLabel = messages.race_classes_title();
    const newCombinationLabel = messages.race_new_combination();
    const removedTitle = messages.races_removed_title();
    const noRacialLabel = messages.races_no_racial_for_filters();

    const raceName = $derived(getRaceLabel(race.id));
    const factionName = $derived(getFactionLabel(race.faction));
    const counts = $derived(countRacialsByStatus(race.racials));
    const visibleRacials = $derived(filterRacialsByStatus(race.racials, races.statuses));
    const activeRacials = $derived(visibleRacials.filter((racial) => racial.status !== "removed"));
    const removedRacials = $derived(visibleRacials.filter((racial) => racial.status === "removed"));
    const isCompared = $derived(races.compareIds.includes(race.id));
</script>

<article class="race-card" data-faction={race.faction}>
    <header class="race-card-header">
        <div class="race-card-portrait" aria-hidden="true">
            {#if race.portrait}
                <img src={race.portrait} alt="" loading="lazy" />
            {/if}
        </div>

        <div class="race-card-title">
            <h3>{raceName}</h3>
            <p>{factionName}</p>
        </div>

        <button type="button" class="navbar-style-button race-card-compare" class:active={isCompared}
                aria-pressed={isCompared} onclick={() => races.toggleCompare(race.id)}>
            {compareLabel}
        </button>
    </header>

    <ul class="race-card-summary">
        {#each RACIAL_STATUSES as status (status)}
            {#if counts[status] > 0}
                <li><RacialStatusBadge {status} count={counts[status]} compact /></li>
            {/if}
        {/each}
    </ul>

    <div class="race-card-classes">
        <h4>{classesLabel}</h4>
        <ul>
            {#each race.classes as raceClass (raceClass.id)}
                <li class:highlight={races.classId === raceClass.id}>
                    {getClassLabel(raceClass.id)}
                    {#if raceClass.isNewCombination}
                        <span class="race-card-star" title={newCombinationLabel} aria-label={newCombinationLabel}>★</span>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>

    {#if activeRacials.length > 0}
        <ul class="race-card-racials">
            {#each activeRacials as racial (racial.id)}
                <RacialItem {racial} />
            {/each}
        </ul>
    {:else if removedRacials.length === 0}
        <p class="race-card-empty">{noRacialLabel}</p>
    {/if}

    {#if removedRacials.length > 0}
        <h4 class="race-card-removed-title">{removedTitle}</h4>
        <ul class="race-card-racials">
            {#each removedRacials as racial (racial.id)}
                <RacialItem {racial} />
            {/each}
        </ul>
    {/if}
</article>

<style lang="scss">
    .race-card {
        --faction-color: var(--main-border-color);

        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        min-width: 0;
        padding: 1.25rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-top: 3px solid var(--faction-color);
        border-radius: 0.625rem;

        &[data-faction="alliance"] { --faction-color: var(--alliance-color); }
        &[data-faction="horde"] { --faction-color: var(--horde-color); }

        &-header {
            display: flex;
            align-items: center;
            gap: 0.9rem;
        }

        &-portrait {
            flex-shrink: 0;
            width: 3.5rem;
            height: 3.5rem;
            overflow: hidden;
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: var(--dissolved-text-color);

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &-title {
            min-width: 0;
            margin-right: auto;

            h3 {
                margin: 0;
                font-family: var(--second-font-family);
                font-size: 1.2rem;
            }

            p {
                margin: 0;
                font-size: 0.85rem;
                color: var(--faction-color);
            }
        }

        &-compare {
            flex-shrink: 0;
            padding: 0.35rem 0.75rem;
            border: 1px solid var(--main-border-color);
            font-size: 0.85rem;
        }

        &-summary {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-classes {
            h4 {
                margin: 0 0 0.4rem;
                font-family: var(--second-font-family);
                font-size: 0.9rem;
                font-weight: 400;
                opacity: 0.7;
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                gap: 0.35rem;
                margin: 0;
                padding: 0;
                list-style: none;
            }

            li {
                padding: 0.1rem 0.55rem;
                border: 1px solid var(--main-border-color);
                border-radius: 0.4rem;
                background-color: var(--dissolved-text-color);
                font-size: 0.85rem;

                &.highlight {
                    border-color: var(--main-text-color);
                    background-color: var(--less-dissolved-text-color);
                }
            }
        }

        &-star {
            color: var(--status-new-color);
        }

        &-racials {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-removed-title {
            margin: 0.5rem 0 0;
            font-family: var(--second-font-family);
            font-size: 0.95rem;
            font-weight: 400;
            color: var(--status-removed-color);
        }

        &-empty {
            margin: 0;
            opacity: 0.7;
        }
    }
</style>