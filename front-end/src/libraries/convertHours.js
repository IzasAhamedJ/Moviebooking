export function convertMinutesToHMS(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = 0;

    return `${hours}h ${minutes}m`
}
