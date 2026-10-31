<script lang="ts">
    import SearchInput from "$components/generic/SearchInput.svelte";
    import type { LegacyChallengeSection } from "$types/legacyTypes";
    import { findSectionPath } from "$utils/legacyUtils";
    import * as messages from "$paraglide/messages";

    let { sections, selectedId = $bindable(), query = $bindable("") }: {
        sections: LegacyChallengeSection[];
        selectedId: string;
        query?: string;
    } = $props();

    const navLabel = messages.legacy_challenges_filter_label();
    const searchLabel = messages.legacy_challenges_search_label();
    const searchPlaceholder = messages.legacy_challenges_search_placeholder();
    const toggleLabel = (name: string) => messages.legacy_challenges_toggle_section({ name });

    let expanded = $state<Record<string, boolean>>({});

    const isSearching = $derived(query.trim() !== "");
    const activeRootId = $derived(findSectionPath(sections, selectedId)[0]?.id);

    /** Tant que l'utilisateur n'a rien replié/déplié, seul le groupe actif est ouvert */
    function isExpanded(id: string): boolean {
        return expanded[id] ?? id === activeRootId;
    }

    function toggle(id: string): void {
        expanded[id] = !isExpanded(id);
    }

    function select(id: string): void {
        const root = findSectionPath(sections, id)[0];

        if (root?.children) expanded[root.id] = true;

        selectedId = id;
        query = "";
    }
</script>

<nav class="legacy-nav" aria-label={navLabel}>
    <SearchInput bind:value={query} label={searchLabel} placeholder={searchPlaceholder} />

    <ul class="legacy-nav-list">
        {#each sections as section (section.id)}
            {@const name = section.label()}
            <li>
                <div class="legacy-nav-group" class:active={!isSearching && selectedId === section.id}>
                    <button type="button" class="legacy-nav-label" aria-pressed={!isSearching && selectedId === section.id}
                            onclick={() => select(section.id)}>
                        {name}
                    </button>

                    {#if section.children}
                        <button type="button" class="legacy-nav-toggle" aria-expanded={isExpanded(section.id)}
                                aria-label={toggleLabel(name)} onclick={() => toggle(section.id)}>
                            <span class="material-icons" aria-hidden="true">
                                {isExpanded(section.id) ? "remove" : "add"}
                            </span>
                        </button>
                    {/if}
                </div>

                {#if section.children && isExpanded(section.id)}
                    <ul class="legacy-nav-children">
                        {#each section.children as child (child.id)}
                            <li>
                                <button type="button" class="legacy-nav-child"
                                        class:active={!isSearching && selectedId === child.id}
                                        aria-pressed={!isSearching && selectedId === child.id}
                                        onclick={() => select(child.id)}>
                                    {child.label()}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .legacy-nav {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: 0.75rem;
        width: 16rem;

        @media only screen and (max-width: 700px) {
            width: 100%;
        }

        &-list,
        &-children {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &-list {
            border: 1px solid var(--main-border-color);
            border-radius: 0.625rem;
            background-color: rgba(0, 0, 0, 0.4);
            overflow: hidden;
        }

        &-group {
            display: flex;
            align-items: stretch;
            border-bottom: 1px solid var(--dissolved-text-color);

            &.active {
                background-color: var(--less-dissolved-text-color);
            }
        }

        &-label,
        &-child,
        &-toggle {
            border: none;
            background: transparent;
            color: var(--main-text-color);
            font: inherit;
            cursor: pointer;
            transition: background-color 0.15s ease;

            &:hover {
                background-color: var(--dissolved-text-color);
            }

            &:focus-visible {
                outline: 2px solid var(--main-text-color);
                outline-offset: -2px;
            }
        }

        &-label {
            flex: 1;
            padding: 0.6rem 0.75rem;
            font-family: var(--second-font-family);
            text-align: left;
        }

        &-toggle {
            display: flex;
            align-items: center;
            padding: 0 0.6rem;

            .material-icons {
                font-size: 1.1rem;
            }
        }

        &-child {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem 0.5rem 1.5rem;
            border-bottom: 1px solid var(--dissolved-text-color);
            text-align: left;

            &.active {
                background-color: var(--less-dissolved-text-color);
            }
        }
    }
</style>