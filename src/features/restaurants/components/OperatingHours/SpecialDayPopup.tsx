"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { parseTimeString, TimeState, toTimeString } from "./timeUtils";
import { buildPayload } from "./specialDayUtils";

export interface SpecialDayData {
  name: string;
  date: string;
  opensAt: string;
  closesAt: string;
  open: boolean;
}

interface SpecialDayModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (data: SpecialDayData) => void;
  editData?: SpecialDayData & { id?: number };
}

export const SpecialDayModal: React.FC<SpecialDayModalProps> = ({
  visible,
  onClose,
  onSave,
  editData,
}) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isOpen_, setIsOpen_] = useState(true);
  const [opensAt, setOpensAt] = useState<TimeState>(
    parseTimeString("09:00:00")
  );
  const [closesAt, setClosesAt] = useState<TimeState>(
    parseTimeString("21:00:00")
  );
  const [lastTimes, setLastTimes] = useState<{
    opensAt: TimeState;
    closesAt: TimeState;
  }>();

  useEffect(() => {
    if (!visible) return;

    if (editData) {
      setName(editData.name || "");
      const [y, m, d] = editData.date.split("-");
      setYear(y);
      setMonth(m);
      setDay(d);
      setIsOpen_(editData.open ?? true);

      if (editData.opensAt && editData.closesAt) {
        const o = parseTimeString(editData.opensAt);
        const c = parseTimeString(editData.closesAt);
        setOpensAt(o);
        setClosesAt(c);
        setLastTimes({ opensAt: o, closesAt: c });
      }
    } else {
      resetForm();
    }
  }, [visible, editData]);

  const currentYear = new Date().getFullYear();

  const handleDayChange = (v: string) => {
    if (!/^\d*$/.test(v)) return;
    const num = parseInt(v, 10);
    setDay(isNaN(num) ? "" : Math.min(num, 31).toString().padStart(2, "0"));
  };

  const handleMonthChange = (v: string) => {
    if (!/^\d*$/.test(v)) return;
    const num = parseInt(v, 10);
    setMonth(isNaN(num) ? "" : Math.min(num, 12).toString().padStart(2, "0"));
  };

  const handleYearChange = (v: string) => {
    if (!/^\d*$/.test(v)) return;
    const num = parseInt(v, 10);
    setYear(isNaN(num) ? "" : Math.min(num, currentYear).toString());
  };

  const toggleOpen = () => {
    const newState = !isOpen_;
    if (!newState && isOpen_) {
      setLastTimes({ opensAt, closesAt });
    } else if (newState && lastTimes) {
      setOpensAt(lastTimes.opensAt);
      setClosesAt(lastTimes.closesAt);
    }
    setIsOpen_(newState);
  };

  const TimePicker = ({
    time,
    onChange,
    disabled,
  }: {
    time: TimeState;
    onChange: (t: TimeState) => void;
    disabled?: boolean;
  }) => {
    const incrementHour = () => {
      const h = parseInt(time.hour, 10);
      onChange({ ...time, hour: String((h % 12) + 1).padStart(2, "0") });
    };

    const decrementHour = () => {
      const h = parseInt(time.hour, 10);
      onChange({
        ...time,
        hour: String(h === 1 ? 12 : h - 1).padStart(2, "0"),
      });
    };

    const incrementMinute = () => {
      const m = parseInt(time.minute, 10);
      onChange({ ...time, minute: String((m + 15) % 60).padStart(2, "0") });
    };

    const decrementMinute = () => {
      const m = parseInt(time.minute, 10);
      onChange({
        ...time,
        minute: String(m === 0 ? 45 : m - 15).padStart(2, "0"),
      });
    };

    return (
      <div
        className={`flex items-center gap-3 ${disabled ? "opacity-50" : ""}`}
      >
        <div className="flex flex-col items-center">
          <button onClick={incrementHour} disabled={disabled} className="p-1">
            <ChevronUp size={20} />
          </button>
          <input
            type="text"
            value={time.hour}
            onChange={(e) =>
              onChange({ ...time, hour: e.target.value.slice(-2) || "09" })
            }
            className="w-12 text-center text-2xl font-bold border-b-2 border-gray-300 focus:border-red-600 outline-none"
            maxLength={2}
            disabled={disabled}
          />
          <button onClick={decrementHour} disabled={disabled} className="p-1">
            <ChevronDown size={20} />
          </button>
        </div>

        <span className="text-2xl font-bold">:</span>

        <div className="flex flex-col items-center">
          <button onClick={incrementMinute} disabled={disabled} className="p-1">
            <ChevronUp size={20} />
          </button>
          <input
            type="text"
            value={time.minute}
            onChange={(e) =>
              onChange({ ...time, minute: e.target.value.slice(-2) || "00" })
            }
            className="w-12 text-center text-2xl font-bold border-b-2 border-gray-300 focus:border-red-600 outline-none"
            maxLength={2}
            disabled={disabled}
          />
          <button onClick={decrementMinute} disabled={disabled} className="p-1">
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-1 ml-2">
          {["AM", "PM"].map((p) => (
            <button
              key={p}
              onClick={() => onChange({ ...time, period: p as "AM" | "PM" })}
              disabled={disabled}
              className={`px-3 py-1 rounded text-sm font-bold transition ${
                time.period === p
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } ${disabled ? "opacity-50" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSave = () => {
    if (!name.trim() || !day || !month || !year) {
      console.log(
        "Missing Fields",
        "Please fill out all fields before saving."
      );
      return;
    }

    const formattedDate = `${year}-${month}-${day}`;
    const payload = buildPayload(
      {
        name,
        date: formattedDate,
        open: isOpen_,
        opensAt: toTimeString(opensAt),
        closesAt: toTimeString(closesAt),
      },
      lastTimes
    );

    onSave?.(payload);
    closeAndReset();
  };

  const resetForm = () => {
    setName("");
    setDay("");
    setMonth("");
    setYear("");
    setOpensAt(parseTimeString("09:00:00"));
    setClosesAt(parseTimeString("21:00:00"));
    setIsOpen_(true);
    setLastTimes(undefined);
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b">
          <button
            onClick={closeAndReset}
            className="p-2 rounded-full border border-red-600 hover:bg-red-50 transition"
          >
            <X size={18} className="text-red-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">
            {editData ? "Edit Special Day" : "Add Special Day"}
          </h2>
          <div className="w-10" />
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Name
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="e.g. Eid al-Fitr"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                disabled={!isOpen_}
              />
              <button
                onClick={toggleOpen}
                className={`relative w-14 h-8 rounded-full transition ${
                  isOpen_ ? "bg-red-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition ${
                    isOpen_ ? "right-1" : "left-1"
                  }`}
                />
              </button>
              <span className="font-semibold text-red-600">
                {isOpen_ ? "Open" : "Closed"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Date
            </label>
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                placeholder="DD"
                value={day}
                onChange={(e) => handleDayChange(e.target.value)}
                className="w-20 px-4 py-3 text-center border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                maxLength={2}
                disabled={!isOpen_}
              />
              <span className="text-xl font-bold text-gray-600">/</span>
              <input
                type="text"
                placeholder="MM"
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
                className="w-20 px-4 py-3 text-center border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                maxLength={2}
                disabled={!isOpen_}
              />
              <span className="text-xl font-bold text-gray-600">/</span>
              <input
                type="text"
                placeholder="YYYY"
                value={year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-28 px-4 py-3 text-center border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                maxLength={4}
                disabled={!isOpen_}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Time
            </label>
            <div className="border border-gray-300 rounded-2xl p-5 bg-gray-50 flex flex-col items-center gap-4">
              <TimePicker
                time={opensAt}
                onChange={setOpensAt}
                disabled={!isOpen_}
              />

              <span className="text-lg font-semibold text-gray-600">to</span>

              <TimePicker
                time={closesAt}
                onChange={setClosesAt}
                disabled={!isOpen_}
              />
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg"
          >
            {editData ? "Update" : "Save"} Special Day
          </button>
        </div>
      </div>
    </div>
  );
};
