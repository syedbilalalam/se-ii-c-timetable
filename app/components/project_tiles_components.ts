export function fromUnix(unix: number) {
    const date = new Date(unix * 1000);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function toInitials(str: string) {
    return str
        .split(' ')
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join('');
}