<script lang="ts">
    import RacialStatusBadge from "$components/races/RacialStatusBadge.svelte";
    import { formatDuration } from "$utils/durationUtils";
    import * as messages from "$paraglide/messages";
    import type { Racial } from "$types/raceTypes";

    let { racial }: { racial: Racial } = $props();

    const activeLabel = messages.racial_kind_active();
    const passiveLabel = messages.racial_kind_passive();
    const classicToggleLabel = messages.racial_classic_toggle();

    const name = $derived(racial.name());
    const description = $derived(racial.description());
    const classicText = $derived(racial.classic?.() ?? "");
    const kindLabel = $derived(racial.kind === "active" ? activeLabel : passiveLabel);
    const cooldownLabel = $derived(
        racial.cooldownSeconds
            ? messages.racial_cooldown({ duration: formatDuration(racial.cooldownSeconds) })
            : ""
    );
</script>

<li class="racial" data-status={racial.status}>
    <div class="racial-icon" aria-hidden="true">
        {#if racial.icon}
            <img src={racial.icon} alt="" loading="lazy" />
        {/if}
    </div>

    <div class="racial-body">
        <div class="racial-heading">
            <h4 class="racial-name">{name}</h4>
            <RacialStatusBadge status={racial.status} />
        </div>

        <p class="racial-meta">
            <span>{kindLabel}</span>
            {#if cooldownLabel}
                <span>{cooldownLabel}</span>
            {/if}
        </p>

        <p class="racial-description">{description}</p>

        {#if classicText}
            <details class="racial-classic">
                <summary>{classicToggleLabel}</summary>
                <p>{classicText}</p>
            </details>
        {/if}
    </div>
</li>

<style lang="scss">
    .racial {
        --racial-color: var(--status-unchanged-color);

        display: flex;
        gap: 0.75rem;
        padding: 0.75rem 0.75rem 0.75rem 0.9rem;
        border-left: 2px solid var(--racial-color);
        border-radius: 0.4rem;
        background-color: rgba(0, 0, 0, 0.25);

        &[data-status="new"] { --racial-color: var(--status-new-color); }
        &[data-status="modified"] { --racial-color: var(--status-modified-color); }
        &[data-status="removed"] {
            --racial-color: var(--status-removed-color);
            opacity: 0.85;
        }

        &-icon {
            flex-shrink: 0;
            width: 2.75rem;
            height: 2.75rem;
            overflow: hidden;
            border: 1px solid var(--main-border-color);
            border-radius: 0.4rem;
            background-color: var(--dissolved-text-color);

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &-body {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            min-width: 0;
        }

        &-heading {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.25rem 0.6rem;
        }

        &-name {
            margin: 0;
            font-size: 1rem;
        }

        &-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem 0.75rem;
            margin: 0;
            font-size: 0.8rem;
            opacity: 0.7;
        }

        &-description {
            margin: 0;
            line-height: 1.45;
            font-size: 0.95rem;
        }

        &-classic {
            font-size: 0.9rem;

            summary {
                width: fit-content;
                color: var(--status-modified-color);
                cursor: pointer;
            }

            p {
                margin: 0.4rem 0 0;
                padding-left: 0.75rem;
                border-left: 2px solid var(--main-border-color);
                line-height: 1.45;
                opacity: 0.85;
            }
        }
    }
</style>