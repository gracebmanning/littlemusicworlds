export function formatDateMonthDayYear(date: string) {
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC",
    });
    return formattedDate;
}
