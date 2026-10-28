export function emptyToNull(value: string): string | null {
    const trimmed = value.trim();

    return trimmed === "" ? null : trimmed;
}

export function parseOptionalInteger(value: string): number | null {
    const trimmed = value.trim();

    return trimmed === "" ? null : Number(trimmed);
}