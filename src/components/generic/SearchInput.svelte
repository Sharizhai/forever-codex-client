<script lang="ts">
    let { value = $bindable(""), label, placeholder = "" }: {
        value?: string;
        label: string;
        placeholder?: string;
    } = $props();

    function onKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") value = "";
    }
</script>

<div class="search-input">
    <span class="search-input-icon material-icons" aria-hidden="true">search</span>
    <input type="search" bind:value aria-label={label} {placeholder} autocomplete="off"
           onkeydown={onKeydown} />
</div>

<style lang="scss">
    .search-input {
        position: relative;
        display: flex;
        align-items: center;

        &-icon {
            position: absolute;
            left: 0.6rem;
            font-size: 1.1rem;
            opacity: 0.7;
            pointer-events: none;
        }

        input {
            width: 100%;
            padding: 0.55rem 0.8rem 0.55rem 2.2rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: rgba(0, 0, 0, 0.4);
            color: var(--main-text-color);
            font: inherit;

            &::placeholder {
                color: var(--main-text-color);
                opacity: 0.6;
            }

            &:focus-visible {
                outline: 2px solid var(--main-text-color);
                outline-offset: 2px;
            }
        }
    }
</style>