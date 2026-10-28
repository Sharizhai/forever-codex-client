<script lang="ts">
    import * as messages from "$paraglide/messages";

    type FieldType = "text" | "email" | "password" | "number" | "url" | "textarea";

    let {
        id,
        label,
        value = $bindable(""),
        type = "text",
        required = false,
        placeholder,
        autocomplete,
        rows = 6,
        min,
        disabled = false,
    }: {
        id: string;
        label: string;
        value?: string;
        type?: FieldType;
        required?: boolean;
        placeholder?: string;
        autocomplete?: AutoFill;
        rows?: number;
        min?: number;
        disabled?: boolean;
    } = $props();

    const optionalLabel = messages.form_optional();
</script>

<div class="form-field">
    <label for={id}>
        {label}
        {#if !required}
            <span class="form-field-optional">{optionalLabel}</span>
        {/if}
    </label>

    {#if type === "textarea"}
        <textarea {id} {rows} {required} {placeholder} {disabled} {value}
                  oninput={(event) => (value = event.currentTarget.value)}></textarea>
    {:else}
        <input {id} {type} {required} {placeholder} {autocomplete} {min} {disabled} {value}
               oninput={(event) => (value = event.currentTarget.value)} />
    {/if}
</div>

<style lang="scss">
    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        label {
            font-family: var(--second-font-family);
        }

        &-optional {
            margin-left: 0.5rem;
            font-family: inherit;
            font-size: 0.85rem;
            opacity: 0.6;
        }

        input,
        textarea {
            padding: 0.6rem 0.8rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: rgba(0, 0, 0, 0.4);
            color: var(--main-text-color);
            font: inherit;

            &:focus-visible {
                outline: 2px solid var(--main-text-color);
                outline-offset: 2px;
            }

            &:disabled {
                opacity: 0.6;
            }
        }

        textarea {
            resize: vertical;
        }
    }
</style>