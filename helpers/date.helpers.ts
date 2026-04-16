export function formatTime(date?: string | null) {
    if (!date) return "No date";

    const normalized = date.replace(" ", "T");
    const parsed = new Date(normalized);

    if (Number.isNaN(parsed.getTime())) {
        return "Invalid date";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
    }).format(parsed);
}
