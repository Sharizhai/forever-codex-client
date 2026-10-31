<script lang="ts">
    import {LEGACY_CHALLENGES} from "$data/legacy/legacyChallenge";
    import { sumChallengePoints } from "$utils/legacyUtils";
    import { LEGACY_POINT_BUDGET } from "$config/config";
    import Panel from "$components/generic/Panel.svelte";
    import * as messages from "$paraglide/messages";

    const titleLabel = messages.legacy_info_title();

    const earnablePoints = sumChallengePoints(LEGACY_CHALLENGES);

    const stats = [
        {
            value: messages.legacy_points_short({ points: LEGACY_POINT_BUDGET }),
            label: messages.legacy_info_spendable(),
        },
        {
            value: messages.legacy_points_approx({ points: earnablePoints }),
            label: messages.legacy_info_earnable(),
        },
        {
            value: messages.legacy_info_track_value(),
            label: messages.legacy_info_track(),
        },
    ];

    const budgetText = messages.legacy_info_text_budget({ budget: LEGACY_POINT_BUDGET, earnable: earnablePoints });
    const depthText = messages.legacy_info_text_depth({ budget: LEGACY_POINT_BUDGET });
    const trackText = messages.legacy_info_text_track();
</script>

<Panel title={titleLabel}>
    <ul class="legacy-info-stats">
        {#each stats as stat (stat.label)}
            <li class="legacy-info-stat">
                <strong class="legacy-info-value">{stat.value}</strong>
                <span class="legacy-info-label">{stat.label}</span>
            </li>
        {/each}
    </ul>

    <div class="legacy-info-texts">
        <p>{budgetText}</p>
        <p>{depthText}</p>
        <p>{trackText}</p>
    </div>
</Panel>

<style lang="scss">
    .legacy-info {
        &-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.75rem;
            margin: 0 0 1.25rem;
            padding: 0;
            list-style: none;

            @media only screen and (max-width: 700px) {
                grid-template-columns: minmax(0, 1fr);
            }
        }

        &-stat {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.75rem 1rem;
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: rgba(0, 0, 0, 0.55);
        }

        &-value {
            font-family: var(--second-font-family);
            font-size: 1.3rem;
            font-weight: 500;
        }

        &-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        &-texts {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            line-height: 1.6;

            p {
                margin: 0;
            }
        }
    }
</style>