export function normalizeSearchText(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

export function getSearchTerms(query: string): string[] {
    return normalizeSearchText(query).split(" ").filter((term) => term !== "");
}