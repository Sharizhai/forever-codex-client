<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<div class="panel">
    {#if title}
        <h2>{title}</h2>
    {/if}

    {@render children()}
</div>

<style lang="scss">
    .panel {
        width: 100%;
        max-width: 44rem;
        padding: 1.5rem;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(8px);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        h2 {
            margin: 0 0 1.25rem;
            font-family: var(--second-font-family);
            font-size: 1.6rem;
            text-align: center;
            margin-bottom: 2rem;
        }
    }
</style>