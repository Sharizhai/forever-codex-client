<script lang="ts">
    import LegacyChallenges from "$components/legacy/LegacyChallenges.svelte";
    import Separator from "$components/generic/Separator.svelte";
    import LegacyInfo from "$components/legacy/LegacyInfo.svelte";
    import LegacyTree from "$components/legacy/LegacyTree.svelte";
    import * as messages from "$paraglide/messages";

    const titleLabel = messages.legacy_title();
    const introLabel = messages.legacy_intro();
</script>

<section class="legacy-page">
    <header class="legacy-page-hero">
        <h1>{titleLabel}</h1>
        <p>{introLabel}</p>
    </header>

    <LegacyInfo />

    <Separator />

    <LegacyTree />

    <Separator />

    <LegacyChallenges />
</section>

<style lang="scss">
    .legacy-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        padding: 3rem 1rem;

        &-hero {
            text-align: center;

            h1 {
                margin: 1rem 0 0.5rem;
                font-family: var(--second-font-family);
                font-size: 2.5rem;
            }

            p {
                margin-bottom: 2.5rem;
            }
        }
    }

    :global(.legacy-page .panel) {
        max-width: 60rem;
    }
</style>