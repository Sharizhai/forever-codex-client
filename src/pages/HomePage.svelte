<script lang="ts">
    import VideoEmbed from "$components/generic/VideoEmbed.svelte";
    import { TRAILER_VIDEO_ID } from "$config/config";
    import * as messages from "$paraglide/messages";

    const taglineText = messages.home_tagline();
    const trailerTitle = messages.home_trailer_title();
</script>

<section class="home">
    <header class="home-hero">
        <h1>Wow Forever Codex</h1>
        <p>{taglineText}</p>
    </header>

    <VideoEmbed videoId={TRAILER_VIDEO_ID} title={trailerTitle} />
</section>

<style lang="scss">
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 3rem 1rem 0;

        &-hero {
            text-align: center;

            h1 {
                margin: 0 0 0.5rem;
                font-family: var(--second-font-family);
                font-size: 2.5rem;
            }

            p {
                margin: 0;
            }
        }
    }
</style>