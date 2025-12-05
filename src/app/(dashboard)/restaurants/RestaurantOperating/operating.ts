export type DayOfWeek =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

export interface WeeklyScheduleEntryDTO {
    day: DayOfWeek;
    open: boolean;
    opensAt: string | null;
    closesAt: string | null;
}

export interface SpecialDayEntryDTO {
    id?: number;
    name: string;
    date: string;
    open: boolean;
    opensAt?: string
    closesAt?: string
}


export interface OperatingHoursResponseDTO {
    weeklySchedule: WeeklyScheduleEntryDTO[];
    specialDays: SpecialDayEntryDTO[];
}
