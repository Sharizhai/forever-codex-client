export interface NavItem {
    path: string;
    label: () => string;
}

export interface NavButtonProps {
    path: string;
    label: string;
    active?: boolean;
}