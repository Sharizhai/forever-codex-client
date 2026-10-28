export function formatDate(isoDate: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(isoDate));
}