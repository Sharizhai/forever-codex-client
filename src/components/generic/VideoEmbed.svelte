<script lang="ts">
    import { getYoutubeEmbedUrl } from "$utils/videoUtils";

    let { videoId, title }: { videoId: string; title: string } = $props();
</script>

<div class="video-embed">
    <iframe src={getYoutubeEmbedUrl(videoId)} {title}
            loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
    </iframe>
</div>

<style lang="scss">
    .video-embed {
        width: 100%;
        max-width: 60rem;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        iframe {
            width: 100%;
            height: 100%;
            border: 0;
        }
    }
</style>