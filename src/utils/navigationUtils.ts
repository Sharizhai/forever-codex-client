export function isActivePath(currentPath: string, itemPath: string): boolean {
    if (itemPath === "/") return currentPath === "/";
    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}