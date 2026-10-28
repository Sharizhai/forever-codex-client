<script lang="ts">
    import FormMessage from "$components/generic/form/FormMessage.svelte";
    import FormField from "$components/generic/form/FormField.svelte";
    import { resolveErrorMessage } from "$utils/errorUtils";
    import Panel from "$components/generic/Panel.svelte";
    import * as messages from "$paraglide/messages";
    import { auth } from "$stores/stores.svelte";

    const titleLabel = messages.auth_login_title();
    const emailLabel = messages.auth_login_email();
    const passwordLabel = messages.auth_login_password();
    const submitLabel = messages.auth_login_submit();
    const submittingLabel = messages.auth_login_submitting();
    const invalidLabel = messages.auth_login_invalid();

    const errorTexts = {
        fallback: invalidLabel,
        network: messages.common_network_error(),
        byStatus: { 401: invalidLabel },
    };

    let email = $state("");
    let password = $state("");
    let isSubmitting = $state(false);
    let errorMessage = $state("");

    async function onSubmit(event: SubmitEvent) {
        event.preventDefault();
        isSubmitting = true;
        errorMessage = "";

        try {
            await auth.signIn({ email, password });
        } catch (error) {
            errorMessage = resolveErrorMessage(error, errorTexts);
            password = "";
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Panel title={titleLabel}>
    <form class="login-form" onsubmit={onSubmit}>
        <FormField id="login-email" label={emailLabel} type="email" bind:value={email}
                   autocomplete="email" required disabled={isSubmitting} />
        <FormField id="login-password" label={passwordLabel} type="password" bind:value={password}
                   autocomplete="current-password" required disabled={isSubmitting} />

        <FormMessage type="error" message={errorMessage} />

        <button type="submit" class="login-form-button primary-button" disabled={isSubmitting}>
            {isSubmitting ? submittingLabel : submitLabel}
        </button>
    </form>
</Panel>

<style lang="scss">
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &-button {
            align-self: center;
            margin-top: 2rem;
        }
    }
</style>