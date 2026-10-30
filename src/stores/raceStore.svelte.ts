import type { ClassFilter, FactionFilter, FactionId, RaceId, RaceView, RacialStatus } from "$types/raceTypes";
import { filterRacesByClass, filterRacesByFaction } from "$utils/raceUtils";
import { RACIAL_STATUSES } from "$config/races";
import { toggleItem } from "$utils/arrayUtils";
import { RACES } from "$data/racesData";

export function createRaceSlice() {
    let view = $state<RaceView>("overview");
    let faction = $state<FactionFilter>("all");
    let classId = $state<ClassFilter>("all");
    let statuses = $state<RacialStatus[]>([...RACIAL_STATUSES]);
    let compareIds = $state<RaceId[]>([]);

    const availableRaces = $derived(filterRacesByClass(RACES, classId));
    const overviewRaces = $derived(filterRacesByFaction(availableRaces, faction));
    const comparedRaces = $derived(availableRaces.filter((race) => compareIds.includes(race.id)));
    const displayedRaces = $derived(view === "overview" ? overviewRaces : comparedRaces);

    function toggleStatus(status: RacialStatus): void {
        const next = toggleItem(statuses, status);

        if (next.length > 0) statuses = next;
    }

    function toggleCompare(id: RaceId): void {
        compareIds = toggleItem(compareIds, id);
    }

    function compareFaction(id: FactionId): void {
        compareIds = availableRaces.filter((race) => race.faction === id).map((race) => race.id);
    }

    function clearCompare(): void {
        compareIds = [];
    }

    return {
        get view() { return view; },
        set view(value: RaceView) { view = value; },
        get faction() { return faction; },
        set faction(value: FactionFilter) { faction = value; },
        get classId() { return classId; },
        set classId(value: ClassFilter) { classId = value; },
        get statuses() { return statuses; },
        get compareIds() { return compareIds; },
        get availableRaces() { return availableRaces; },
        get overviewRaces() { return overviewRaces; },
        get comparedRaces() { return comparedRaces; },
        get displayedRaces() { return displayedRaces; },
        toggleStatus,
        toggleCompare,
        compareFaction,
        clearCompare,
    };
}