<script lang="ts">
    import { buildArticlePayload, createEmptyArticleForm } from "$utils/articleUtils";
    import FormMessage from "$components/generic/form/FormMessage.svelte";
    import FormField from "$components/generic/form/FormField.svelte";
    import type { ArticleFormValues } from "$types/articleTypes";
    import {createArticle} from "$services/articleServices";
    import { resolveErrorMessage } from "$utils/errorUtils";
    import Panel from "$components/generic/Panel.svelte";
    import {ARTICLE_CATEGORIES} from "$config/config";
    import * as messages from "$paraglide/messages";
    import MultiSelect from "$components/generic/form/MultiSelect.svelte";

    const titleLabel = messages.article_form_title();
    const categoryLabel = messages.article_form_category();
    const articleTitleLabel = messages.article_form_field_title();
    const summaryLabel = messages.article_form_summary();
    const contentLabel = messages.article_form_content();
    const readingMinutesLabel = messages.article_form_reading_minutes();
    const imageLabel = messages.article_form_image();
    const sourceNameLabel = messages.article_form_source_name();
    const sourceUrlLabel = messages.article_form_source_url();
    const submitLabel = messages.article_form_submit();
    const submittingLabel = messages.article_form_submitting();
    const successLabel = messages.article_form_success();
    const genericErrorLabel = messages.article_form_error();
    const categoriesRequiredLabel = messages.article_form_categories_required();

    const categoryOptions = ARTICLE_CATEGORIES.map((option) => ({ key: option.key, label: option.label() }));

    const errorTexts = {
        fallback: genericErrorLabel,
        network: messages.common_network_error(),
        byStatus: {
            401: messages.auth_session_expired(),
            403: messages.auth_forbidden(),
            500: genericErrorLabel,
        },
    };

    let values = $state<ArticleFormValues>(createEmptyArticleForm());
    let isSubmitting = $state(false);
    let errorMessage = $state("");
    let successMessage = $state("");

    async function onSubmit(event: SubmitEvent) {
        event.preventDefault();
        errorMessage = "";
        successMessage = "";

        if (values.category.length === 0) {
            errorMessage = categoriesRequiredLabel;
            return;
        }

        isSubmitting = true;

        try {
            await createArticle(buildArticlePayload(values));
            values = createEmptyArticleForm();
            successMessage = successLabel;
        } catch (error) {
            errorMessage = resolveErrorMessage(error, errorTexts);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Panel title={titleLabel}>
    <form class="article-form" onsubmit={onSubmit}>
        <MultiSelect label={categoryLabel} options={categoryOptions} bind:value={values.category}
                     required disabled={isSubmitting} />
        <FormField id="article-title" label={articleTitleLabel} bind:value={values.title}
                   required disabled={isSubmitting} />
        <FormField id="article-summary" label={summaryLabel} type="textarea" rows={3}
                   bind:value={values.summary} required disabled={isSubmitting} />
        <FormField id="article-content" label={contentLabel} type="textarea" rows={12}
                   bind:value={values.content} required disabled={isSubmitting} />
        <FormField id="article-reading-minutes" label={readingMinutesLabel} type="number" min={1}
                   bind:value={values.readingMinutes} disabled={isSubmitting} />
        <FormField id="article-image" label={imageLabel} bind:value={values.image}
                   disabled={isSubmitting} />
        <FormField id="article-source-name" label={sourceNameLabel} bind:value={values.sourceName}
                   disabled={isSubmitting} />
        <FormField id="article-source-url" label={sourceUrlLabel} type="url" bind:value={values.sourceUrl}
                   disabled={isSubmitting} />

        <FormMessage type="error" message={errorMessage} />
        <FormMessage type="success" message={successMessage} />

        <button type="submit" class="primary-button" disabled={isSubmitting}>
            {isSubmitting ? submittingLabel : submitLabel}
        </button>
    </form>
</Panel>

<style lang="scss">
    .article-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>