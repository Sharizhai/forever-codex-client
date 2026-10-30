<script lang="ts">
    import { CLASS_FILTER_OPTIONS, FACTION_FILTER_OPTIONS, RACIAL_STATUSES, VIEW_OPTIONS } from "$config/races";
    import SegmentedControl from "$components/generic/SegmentedControl.svelte";
    import RacialStatusBadge from "$components/races/RacialStatusBadge.svelte";
    import { countRacialsByStatus } from "$utils/raceUtils";
    import * as messages from "$paraglide/messages";
    import { races } from "$stores/stores.svelte";

    const viewLabel = messages.races_filter_view();
    const factionLabel = messages.races_filter_faction();
    const classLabel = messages.races_filter_class();
    const statusLabel = messages.races_filter_status();

    const viewOptions = $derived(
        VIEW_OPTIONS.map((option) => ({
            key: option.key,
            label: option.key === "compare" && races.compareIds.length > 0
                ? messages.races_view_compare_count({ count: races.compareIds.length })
                : option.label(),
        }))
    );
    const factionOptions = FACTION_FILTER_OPTIONS.map((option) => ({ key: option.key, label: option.label() }));
    const classOptions = CLASS_FILTER_OPTIONS.map((option) => ({ key: option.key, label: option.label() }));

    const counts = $derived(countRacialsByStatus(races.displayedRaces.flatMap((race) => race.racials)));
</script>

<section class="race-filters">
    <div class="race-filters-group">
        <h2>{viewLabel}</h2>
        <SegmentedControl options={viewOptions} bind:value={races.view} label={viewLabel} />
    </div>

    {#if races.view === "overview"}
        <div class="race-filters-group">
            <h2>{factionLabel}</h2>
            <SegmentedControl options={factionOptions} bind:value={races.faction} label={factionLabel} />
        </div>
    {/if}

    <div class="race-filters-group">
        <h2>{classLabel}</h2>
        <SegmentedControl options={classOptions} bind:value={races.classId} label={classLabel} />
    </div>

    <div class="race-filters-group">
        <h2>{statusLabel}</h2>
        <ul class="race-filters-statuses">
            {#each RACIAL_STATUSES as status (status)}
                {@const isActive = races.statuses.includes(status)}
                <li>
                    <button type="button" class="race-filters-status" class:active={isActive}
                            aria-pressed={isActive} onclick={() => races.toggleStatus(status)}>
                        <RacialStatusBadge {status} count={counts[status]} />
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</section>

<style lang="scss">
    .race-filters {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        padding: 1rem 1.25rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-group {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem 1rem;

            h2 {
                min-width: 5rem;
                margin: 0;
                font-family: var(--second-font-family);
                font-size: 0.95rem;
                font-weight: 400;
            }
        }

        &-statuses {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-status {
            padding: 0.2rem;
            border: 1px solid transparent;
            border-radius: 999px;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
            opacity: 0.45;
            transition: opacity 0.15s ease;

            &.active {
                opacity: 1;
            }

            &:hover {
                opacity: 1;
            }

            &:focus-visible {
                outline: 2px solid var(--main-text-color);
                outline-offset: 2px;
            }
        }
    }
</style>