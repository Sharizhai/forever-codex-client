<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, children } : { title: string, children: Snippet } = $props();
</script>

<section class="info-section">
    <h2 class="info-section-title">{title}</h2>
    <div class="info-section-content">
        {@render children()}
    </div>
</section>

<style lang="scss">
    .info-section {
        border-radius: 0.625rem;

        &-title {
            margin: 0 0 0.75rem;
            font-size: 1.25rem;
        }

        &-content {
            line-height: 1.6;

            :global(p) {
                margin: 0 0 0.75rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>