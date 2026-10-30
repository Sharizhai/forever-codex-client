<script lang="ts">
    import type { RacialStatus } from "$types/raceTypes";
    import { RACIAL_STATUS_LABELS } from "$config/races";

    let { status, count, compact = false }: {
        status: RacialStatus;
        count?: number;
        compact?: boolean;
    } = $props();

    const label = $derived(RACIAL_STATUS_LABELS[status]());
</script>

<span class="status-badge" class:compact data-status={status} title={compact ? label : undefined}>
    <span class="status-badge-dot" aria-hidden="true"></span>
    {#if count !== undefined}
        <span class="status-badge-count">{count}</span>
    {/if}
    <span class="status-badge-label">{label}</span>
</span>

<style lang="scss">
    .status-badge {
        --badge-color: var(--main-text-color);

        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.1rem 0.6rem 0.1rem 0.5rem;
        border: 1px solid var(--badge-color);
        border-radius: 999px;
        background-color: rgba(0, 0, 0, 0.4);
        color: var(--badge-color);
        font-size: 0.8rem;
        line-height: 1.4;
        white-space: nowrap;

        &[data-status="new"] { --badge-color: var(--status-new-color); }
        &[data-status="modified"] { --badge-color: var(--status-modified-color); }
        &[data-status="unchanged"] { --badge-color: var(--status-unchanged-color); }
        &[data-status="removed"] { --badge-color: var(--status-removed-color); }

        &-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: var(--badge-color);
        }

        &-count {
            font-weight: 700;
        }

        &.compact &-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }
    }
</style>