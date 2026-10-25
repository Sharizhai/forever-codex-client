<script lang="ts">
    import * as messages from "$paraglide/messages";
    import { ABOUT_PATH } from "$config/config";
    import { link } from "svelte-spa-router";

    const year = new Date().getFullYear();

    const disclaimerText = messages.footer_disclaimer();
    const copyrightText = messages.footer_copyright({ year });
    const aboutText = messages.footer_about();
</script>

<footer class="footer">
    <p class="footer-disclaimer">{disclaimerText}</p>
    <a class="footer-about" href={ABOUT_PATH} use:link>{aboutText}</a>
    <p class="footer-copyright">{copyrightText}</p>
</footer>

<style lang="scss">
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin: 2rem 1.3rem 1.3rem;
        padding: 1.2rem 1rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.55);
        border: 1px solid var(--main-border-color);
        border-radius: 0.625rem;

        p {
            margin: 0;
        }

        &-disclaimer {
            max-width: 50rem;
            font-size: 0.85rem;
            opacity: 0.8;
        }

        &-about {
            font-size: 0.85rem;
            text-decoration: underline;
        }

        &-copyright {
            font-size: 0.8rem;
            opacity: 0.6;
        }
    }
</style>