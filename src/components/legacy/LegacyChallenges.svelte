<script lang="ts">
    import { buildChallengeSearchIndex, getChallengesBySection, getSectionTitle,
        searchChallenges, sumChallengePoints } from "$utils/legacyUtils";
    import { LEGACY_CHALLENGE_SECTIONS, LEGACY_CHALLENGES } from "$data/legacy/legacyChallenge";
    import LegacyChallengeCard from "$components/legacy/LegacyChallengeCard.svelte";
    import LegacyChallengeNav from "$components/legacy/LegacyChallengeNav.svelte";
    import { getSearchTerms } from "$utils/searchUtils";
    import * as messages from "$paraglide/messages";

    const titleLabel = messages.legacy_challenges_title();
    const introLabel = messages.legacy_challenges_intro();
    const totalLabel = messages.legacy_challenges_total({ points: sumChallengePoints(LEGACY_CHALLENGES) });
    const emptyLabel = messages.legacy_challenges_empty();

    const searchIndex = buildChallengeSearchIndex(LEGACY_CHALLENGES);

    let selectedId = $state("classes");
    let query = $state("");

    const isSearching = $derived(getSearchTerms(query).length > 0);
    const visibleChallenges = $derived(
        isSearching
            ? searchChallenges(searchIndex, query)
            : getChallengesBySection(LEGACY_CHALLENGES, LEGACY_CHALLENGE_SECTIONS, selectedId)
    );
    const heading = $derived(
        isSearching
            ? messages.legacy_challenges_results({ count: visibleChallenges.length })
            : getSectionTitle(LEGACY_CHALLENGE_SECTIONS, selectedId)
    );
</script>

<section class="legacy-challenges">
    <header class="legacy-challenges-header">
        <h2>{titleLabel}</h2>
        <p>{introLabel}</p>
        <p class="legacy-challenges-total">{totalLabel}</p>
    </header>

    <div class="legacy-challenges-body">
        <LegacyChallengeNav sections={LEGACY_CHALLENGE_SECTIONS} bind:selectedId bind:query />

        <div class="legacy-challenges-content">
            <h3 class="legacy-challenges-heading">{heading}</h3>

            {#if visibleChallenges.length === 0}
                <p class="legacy-challenges-empty">{emptyLabel}</p>
            {:else}
                <ul class="legacy-challenges-list">
                    {#each visibleChallenges as challenge (challenge.id)}
                        <li><LegacyChallengeCard {challenge} /></li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    .legacy-challenges {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        width: 100%;
        max-width: 60rem;
        padding: 1.5rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        &-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;

            h2 {
                margin: 0 0 1rem 0;
                font-family: var(--second-font-family);
                font-size: 1.6rem;
            }

            p {
                margin: 0;
            }
        }

        &-total {
            padding: 0.3rem 1.25rem;
            border: 1px solid var(--main-border-color);
            border-radius: 999px;
            background-color: var(--dissolved-text-color);
        }

        &-body {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;

            @media only screen and (max-width: 700px) {
                flex-direction: column;
                align-items: stretch;
            }
        }

        &-content {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 1rem;
            min-width: 0;
        }

        &-heading {
            margin: 0;
            font-family: var(--second-font-family);
            font-size: 1.2rem;
        }

        &-empty {
            margin: 0;
            opacity: 0.8;
        }

        &-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                display: flex;
            }
        }
    }
</style>