export function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i;
    return regex.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && "ontouchend" in document);
}

export function isIPad() {
    return /iPad/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && "ontouchend" in document);
}

export function isSmartphone() {
    return isMobile() && !isIPad();
}