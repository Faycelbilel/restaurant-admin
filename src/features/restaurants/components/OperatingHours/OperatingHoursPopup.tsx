"use client";

import { useEffect, useState } from "react";
import { X, CalendarDays } from "lucide-react";
import { WeeklyScheduleEntryDTO } from "./operating";
import { operatingHoursService } from "./services/operatingHoursService";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

interface DayState {
  isOpen: boolean;
  opensAt?: string | null;
  closesAt?: string | null;
}

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const SetHoursPopup = ({
  visible,
  day,
  initialStartTime = "09:00",
  initialEndTime = "17:00",
  onClose,
  onSave,
}: {
  visible: boolean;
  day: string;
  initialStartTime?: string;
  initialEndTime?: string;
  onClose: () => void;
  onSave: (start: string, end: string) => void;
}) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  useEffect(() => {
    if (visible) {
      setStartTime(initialStartTime);
      setEndTime(initialEndTime);
    }
  }, [visible, initialStartTime, initialEndTime]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Set Hours for {day}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 border border-red-600 rounded-full flex items-center justify-center"
          >
            <X size={14} className="text-red-600" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Opens at</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Closes at</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(startTime, endTime)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

interface OperatingHoursPopupProps {
  visible: boolean;
  onClose: () => void;
}

export function OperatingHoursPopup({
  visible,
  onClose,
}: OperatingHoursPopupProps) {
  const [days, setDays] = useState<Record<DayKey, DayState>>({
    mon: { isOpen: false },
    tue: { isOpen: false },
    wed: { isOpen: false },
    thu: { isOpen: false },
    fri: { isOpen: false },
    sat: { isOpen: false },
    sun: { isOpen: false },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [setHoursVisible, setSetHoursVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");

  const toggleDay = (day: DayKey) => {
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }));
  };

  const mapApiToDays = (
    weekly: WeeklyScheduleEntryDTO[]
  ): Record<DayKey, DayState> => {
    const map: Record<string, DayKey> = {
      MONDAY: "mon",
      TUESDAY: "tue",
      WEDNESDAY: "wed",
      THURSDAY: "thu",
      FRIDAY: "fri",
      SATURDAY: "sat",
      SUNDAY: "sun",
    };
    const result: Record<DayKey, DayState> = {
      mon: { isOpen: false },
      tue: { isOpen: false },
      wed: { isOpen: false },
      thu: { isOpen: false },
      fri: { isOpen: false },
      sat: { isOpen: false },
      sun: { isOpen: false },
    };
    weekly.forEach((d) => {
      const key = map[d.day];
      if (key) {
        result[key] = {
          isOpen: d.open,
          opensAt: d.opensAt,
          closesAt: d.closesAt,
        };
      }
    });
    return result;
  };

  useEffect(() => {
    if (!visible) return;
    setLoading(true);

    operatingHoursService
      .getOperatingHours()
      .then((data) => {
        setDays(mapApiToDays(data.weeklySchedule));
      })
      .finally(() => setLoading(false));
  }, [visible]);

  const handleSaveHours = (start: string, end: string) => {
    setDays((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], opensAt: start, closesAt: end },
    }));
    setSetHoursVisible(false);
  };

  const handleSave = async () => {
    const invalidDay = DAYS.find(
      ({ key }) =>
        days[key].isOpen && (!days[key].opensAt || !days[key].closesAt)
    );

    if (invalidDay) {
      alert(`Please set hours for ${invalidDay.label}`);
      return;
    }

    setSaving(true);

    const dayMap: Record<DayKey, WeeklyScheduleEntryDTO["day"]> = {
      mon: "MONDAY",
      tue: "TUESDAY",
      wed: "WEDNESDAY",
      thu: "THURSDAY",
      fri: "FRIDAY",
      sat: "SATURDAY",
      sun: "SUNDAY",
    };

    const payload: WeeklyScheduleEntryDTO[] = DAYS.map(({ key }) => ({
      day: dayMap[key],
      open: days[key].isOpen,
      opensAt: days[key].opensAt ?? null,
      closesAt: days[key].closesAt ?? null,
    }));

    await operatingHoursService.updateWeeklySchedule(payload);

    setSaving(false);
    onClose();
  };

  const formatTime = (time?: string | null) => {
    if (!time) return null;
    const [h, m] = time.split(":");
    let hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return m === "00" ? `${hour} ${ampm}` : `${hour}:${m} ${ampm}`;
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/45 flex items-center justify-center p-2 z-40">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <button
              onClick={onClose}
              className="w-7 h-7 border border-red-600 rounded-full flex items-center justify-center"
            >
              <X size={14} className="text-red-600" />
            </button>
            <h2 className="font-bold text-lg">Operating Hours</h2>
            <div className="w-7" />
          </div>

          {loading ? (
            <div className="py-10 flex justify-center">
              <div className="animate-spin h-6 w-6 rounded-full border-b-2 border-red-600" />
            </div>
          ) : (
            <div className="px-6 py-4 space-y-5">
              {DAYS.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={20} className="text-red-600" />
                    <span className="font-semibold text-red-600">{label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {days[key].isOpen && (
                      <button
                        onClick={() => {
                          setSelectedDay(key);
                          setSetHoursVisible(true);
                        }}
                        className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs"
                      >
                        {days[key].opensAt && days[key].closesAt
                          ? `${formatTime(days[key].opensAt)} - ${formatTime(
                              days[key].closesAt
                            )}`
                          : "Set hours"}
                      </button>
                    )}

                    <label className="relative inline-flex cursor-pointer">
                      <input
                        type="checkbox"
                        checked={days[key].isOpen}
                        onChange={() => toggleDay(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-red-600 after:absolute after:content-[''] after:w-5 after:h-5 after:rounded-full after:bg-white after:top-[2px] after:left-[2px] peer-checked:after:translate-x-full after:transition-all" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="px-6 py-4 border-t flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-red-600 text-white px-8 py-2 font-bold rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <SetHoursPopup
        visible={setHoursVisible}
        day={selectedDay.toUpperCase()}
        initialStartTime={days[selectedDay].opensAt || "09:00"}
        initialEndTime={days[selectedDay].closesAt || "17:00"}
        onClose={() => setSetHoursVisible(false)}
        onSave={handleSaveHours}
      />
    </>
  );
}
