<script lang="ts" generics="T extends string">
    import type { SelectOption } from "$types/formTypes";
    import * as messages from "$paraglide/messages";
    import { toggleItem } from "$utils/arrayUtils";

    let {
        label,
        options,
        value = $bindable([]),
        required = false,
        disabled = false,
    }: {
        label: string;
        options: SelectOption<T>[];
        value?: T[];
        required?: boolean;
        disabled?: boolean;
    } = $props();

    const optionalLabel = messages.form_optional();
    const removeLabel = (name: string) => messages.form_remove_option({ label: name });

    const selectedOptions = $derived(
        value
            .map((key) => options.find((option) => option.key === key))
            .filter((option): option is SelectOption<T> => option !== undefined)
    );
</script>

<fieldset class="multi-select" {disabled}>
    <legend>
        {label}
        {#if !required}
            <span class="multi-select-optional">{optionalLabel}</span>
        {/if}
    </legend>

    {#if selectedOptions.length > 0}
        <ul class="multi-select-chips">
            {#each selectedOptions as option (option.key)}
                <li>
                    <button type="button" class="multi-select-chip" aria-label={removeLabel(option.label)}
                            onclick={() => (value = toggleItem(value, option.key))}>
                        {option.label}
                        <span class="multi-select-chip-icon material-icons">close</span>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}

    <ul class="multi-select-options">
        {#each options as option (option.key)}
            <li>
                <label class="multi-select-option">
                    <input type="checkbox" checked={value.includes(option.key)}
                           onchange={() => (value = toggleItem(value, option.key))} />
                    {option.label}
                </label>
            </li>
        {/each}
    </ul>
</fieldset>

<style lang="scss">
    .multi-select {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-width: 0;
        margin: 0;
        padding: 0;
        border: none;

        &:disabled {
            opacity: 0.6;
        }

        legend {
            margin-bottom: 0.75rem;
            padding: 0;
            font-family: var(--second-font-family);
        }

        &-optional {
            margin-left: 0.5rem;
            font-family: inherit;
            font-size: 0.85rem;
            opacity: 0.6;
        }

        &-chips,
        &-options {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        &-chip {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.3rem 0.5rem 0.3rem 0.75rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: var(--less-dissolved-text-color);
            color: var(--main-text-color);
            font: inherit;
            cursor: pointer;

            &:hover {
                border-color: var(--main-text-color);
            }

            &-icon {
                font-size: 1.1rem;
            }
        }

        &-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
            gap: 0.5rem 1rem;
        }

        &-option {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            cursor: pointer;

            input {
                width: 1.1rem;
                height: 1.1rem;
                margin: 0;
                accent-color: var(--main-text-color);
            }
        }
    }
</style>