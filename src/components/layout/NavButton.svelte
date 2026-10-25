<script lang="ts">
    import { link } from "svelte-spa-router";

    let { path, label, active = false } : { path?: string, label: string, active?: boolean;} = $props();
</script>

<a href={path} use:link class="nav-button" class:active aria-current={active ? "page" : undefined}>
    {label}
</a>

<style lang="scss">
    .nav-button {
        display: block;
        padding: 0.5rem 1rem;
        border-radius: 0.625rem;
        font-family: var(--second-font-family);
        white-space: nowrap;
        transition: background-color 0.15s ease;
        font-size: 1rem;

        &:hover {
            text-decoration: none;
            background-color: var(--dissolved-text-color);
        }

        &.active {
            background-color: var(--less-dissolved-text-color);
        }
    }
</style>