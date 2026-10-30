import type {
    ClassFilter, ClassId, FactionFilter, FactionId, Race, RaceId, Racial, RacialStatus,
} from "$types/raceTypes";
import { CLASS_LABELS, FACTION_LABELS, RACE_LABELS, RACIAL_STATUSES } from "$config/races";

export function getFactionLabel(id: FactionId): string {
    return FACTION_LABELS[id]();
}

export function getRaceLabel(id: RaceId): string {
    return RACE_LABELS[id]();
}

export function getClassLabel(id: ClassId): string {
    return CLASS_LABELS[id]();
}

export function raceAllowsClass(race: Race, classId: ClassFilter): boolean {
    return classId === "all" || race.classes.some((raceClass) => raceClass.id === classId);
}

export function filterRacesByClass(races: Race[], classId: ClassFilter): Race[] {
    return races.filter((race) => raceAllowsClass(race, classId));
}

export function filterRacesByFaction(races: Race[], faction: FactionFilter): Race[] {
    return faction === "all" ? races : races.filter((race) => race.faction === faction);
}

export function filterRacialsByStatus(racials: Racial[], statuses: RacialStatus[]): Racial[] {
    return racials.filter((racial) => statuses.includes(racial.status));
}

export function countRacialsByStatus(racials: Racial[]): Record<RacialStatus, number> {
    const counts = Object.fromEntries(RACIAL_STATUSES.map((status) => [status, 0])) as Record<RacialStatus, number>;

    for (const racial of racials) counts[racial.status]++;

    return counts;
}