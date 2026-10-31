<script lang="ts">
    import type { LegacyChallenge } from "$types/legacyTypes";
    import { getLegacyIconUrl } from "$utils/legacyUtils";
    import { hideBrokenImage } from "$utils/domUtils";
    import * as messages from "$paraglide/messages";

    let { challenge }: { challenge: LegacyChallenge } = $props();

    const outsideTotalLabel = messages.legacy_challenge_outside_total();

    const pointsLabel = $derived(messages.legacy_challenge_points({ points: challenge.points }));
    const criteria = $derived(challenge.criteria?.() ?? []);
    const countsTowardLabel = $derived(
        challenge.parent ? messages.legacy_challenge_counts_toward({ name: challenge.parent() }) : ""
    );
    const criteriaLabel = $derived(messages.legacy_challenge_criteria({ count: criteria.length }));
</script>

<article class="legacy-challenge-card">
    <img class="legacy-challenge-card-icon" src={getLegacyIconUrl(challenge.icon)} alt=""
         loading="lazy" onerror={hideBrokenImage} />

    <div class="legacy-challenge-card-body">
        <h3 class="legacy-challenge-card-title">{challenge.title()}</h3>
        <p class="legacy-challenge-card-description">{challenge.description()}</p>

        {#if criteria.length > 0}
            <details class="legacy-challenge-card-criteria">
                <summary>{criteriaLabel}</summary>
                <ul>
                    {#each criteria as criterion}
                        <li>{criterion}</li>
                    {/each}
                </ul>
            </details>
        {/if}

        {#if countsTowardLabel}
            <p class="legacy-challenge-card-note">{countsTowardLabel}</p>
        {/if}

        {#if !challenge.countsTowardTotal}
            <p class="legacy-challenge-card-note">{outsideTotalLabel}</p>
        {/if}
    </div>

    {#if challenge.points > 0}
        <span class="legacy-challenge-card-points">{pointsLabel}</span>
    {/if}
</article>

<style lang="scss">
    .legacy-challenge-card {
        flex: 1;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        min-width: 0;
        padding: 1rem;
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-icon {
            flex-shrink: 0;
            width: 3rem;
            height: 3rem;
            object-fit: cover;
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);
        }

        &-body {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 0.4rem;
            min-width: 0;
        }

        &-title {
            margin: 0;
            font-size: 1.1rem;
        }

        &-description {
            font-size: 0.9rem;
        }

        &-description,
        &-note {
            margin: 0;
        }

        &-note {
            font-size: 0.85rem;
            opacity: 0.8;
        }

        &-points {
            flex-shrink: 0;
            padding: 0.1rem 0.5rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);
            font-size: 0.85rem;
            white-space: nowrap;
        }

        &-criteria {
            summary {
                cursor: pointer;
                font-size: 0.9rem;
            }

            ul {
                margin: 0.5rem 0 0;
                padding-left: 1.25rem;
                font-size: 0.9rem;
            }
        }
    }
</style>