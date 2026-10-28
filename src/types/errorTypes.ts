export interface ErrorMessages {
    fallback: string;
    network: string;
    byStatus?: Record<number, string>;
}