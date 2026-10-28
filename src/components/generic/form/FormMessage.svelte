<script lang="ts">
    let { type, message }: { type: "error" | "success"; message: string } = $props();
</script>

{#if message}
    <p class="form-message" class:error={type === "error"} class:success={type === "success"}
       role={type === "error" ? "alert" : "status"}>
        {message}
    </p>
{/if}

<style lang="scss">
    .form-message {
        margin: 0;
        padding: 0.75rem 1rem;
        border: 1px solid currentColor;
        border-radius: 0.625rem;
        background-color: rgba(0, 0, 0, 0.4);

        &.error {
            color: var(--error-text-color);
        }

        &.success {
            color: var(--success-text-color);
        }
    }
</style>