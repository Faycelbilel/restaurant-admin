export interface TimeState {
    hour: string;
    minute: string;
    period: "AM" | "PM";
}

export const parseTimeString = (timeStr: string | null | undefined): TimeState => {
    if (!timeStr) return { hour: "09", minute: "00", period: "AM" };
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || "00", 10);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return { hour: String(hour12).padStart(2, "0"), minute: String(minute).padStart(2, "0"), period };
};

export const toTimeString = (time: TimeState) => {
    let hour = parseInt(time.hour, 10);
    if (time.period === "PM" && hour !== 12) hour += 12;
    if (time.period === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${time.minute.padStart(2, "0")}:00`;
};
