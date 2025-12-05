import { SpecialDayData } from "./SpecialDayPopup";
import { parseTimeString, TimeState,toTimeString } from "./timeUtils";

export const buildPayload = (
    data: SpecialDayData,
    lastTimes?: { opensAt: TimeState; closesAt: TimeState }
) => {
    let opensAtTime = data.open ? parseTimeString(data.opensAt) : lastTimes?.opensAt ?? parseTimeString("09:00:00");
    let closesAtTime = data.open ? parseTimeString(data.closesAt) : lastTimes?.closesAt ?? parseTimeString("21:00:00");

    return {
        name: data.name,
        date: data.date,
        open: data.open,
        opensAt: toTimeString(opensAtTime),
        closesAt: toTimeString(closesAtTime),
    };
};
