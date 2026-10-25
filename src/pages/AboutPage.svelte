<script lang="ts">
    import InfoSection from "$components/generic/InfoSection.svelte";
    import * as messages from "$paraglide/messages";
    import { CONTACT_EMAIL } from "$config/config";

    const pageTitle = messages.about_title();

    const projectTitle = messages.about_project_title();
    const projectText = messages.about_project_text();

    const dataTitle = messages.about_data_title();
    const dataText = messages.about_data_text();

    const creditsTitle = messages.about_credits_title();
    const creditsText = messages.about_credits_text();

    const contactTitle = messages.about_contact_title();
    const contactText = messages.about_contact_text();

    const disclaimerTitle = messages.about_disclaimer_title();
    const disclaimerText = messages.about_disclaimer_text();

    const mailtoHref = `mailto:${CONTACT_EMAIL}`;
</script>

<section class="about">
    <header class="about-hero">
        <h1>{pageTitle}</h1>
    </header>

    <div class="about-content">
        <InfoSection title={projectTitle}>
            <p>{projectText}</p>
        </InfoSection>

        <InfoSection title={dataTitle}>
            <p>{dataText}</p>
        </InfoSection>

        <InfoSection title={creditsTitle}>
            <p>{creditsText}</p>
        </InfoSection>

        <InfoSection title={contactTitle}>
            <p>{contactText}</p>
            <p><a href={mailtoHref}>{CONTACT_EMAIL}</a></p>
        </InfoSection>

        <InfoSection title={disclaimerTitle}>
            <p>{disclaimerText}</p>
        </InfoSection>
    </div>
</section>

<style lang="scss">
    .about {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 3rem 1rem 0;

        &-hero {
            text-align: center;

            h1 {
                margin: 0 0 1.5rem;
                font-family: var(--second-font-family);
                font-size: 2.5rem;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
            max-width: 70rem;
            background-color: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(4px);
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            padding: 1.5rem;
        }
    }
</style>