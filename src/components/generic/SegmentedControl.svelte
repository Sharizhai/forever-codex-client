<script lang="ts" generics="T extends string">
    import type { SelectOption } from "$types/formTypes";

    let { options, value = $bindable(), label }: {
        options: SelectOption<T>[];
        value: T;
        label?: string;
    } = $props();
</script>

<div class="segmented" role="group" aria-label={label}>
    {#each options as option (option.key)}
        <button type="button" class="segmented-option" class:active={option.key === value}
                aria-pressed={option.key === value} onclick={() => (value = option.key)}>
            {option.label}
        </button>
    {/each}
</div>

<style lang="scss">
    .segmented {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;

        &-option {
            padding: 0.4rem 0.8rem;
            border: 1px solid transparent;
            border-radius: 0.625rem;
            background-color: transparent;
            color: var(--main-text-color);
            font-family: var(--second-font-family);
            font-size: 0.95rem;
            white-space: nowrap;
            cursor: pointer;
            transition: background-color 0.15s ease;

            &:hover {
                background-color: var(--dissolved-text-color);
            }

            &.active {
                background-color: var(--less-dissolved-text-color);
            }

            &:focus-visible {
                outline: 2px solid var(--main-text-color);
                outline-offset: 2px;
            }
        }
    }
</style>