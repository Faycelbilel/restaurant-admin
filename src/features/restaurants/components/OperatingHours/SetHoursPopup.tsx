"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";

interface SetHoursPopupProps {
  visible: boolean;
  onClose: () => void;
  day: string;
  onSave?: (startTime: string, endTime: string) => void;
  initialStartTime?: string;
  initialEndTime?: string;
}

export const SetHoursPopup = ({
  visible,
  onClose,
  day,
  onSave,
  initialStartTime,
  initialEndTime,
}: SetHoursPopupProps) => {
  const [startHour, setStartHour] = useState("09");
  const [startMinute, setStartMinute] = useState("00");
  const [startPeriod, setStartPeriod] = useState<"AM" | "PM">("AM");
  const [endHour, setEndHour] = useState("09");
  const [endMinute, setEndMinute] = useState("00");
  const [endPeriod, setEndPeriod] = useState<"AM" | "PM">("PM");

  useEffect(() => {
    if (visible) {
      if (initialStartTime) {
        const [time, period] = initialStartTime.split(" ");
        const [hour, minute] = time.split(":");
        setStartHour(hour.padStart(2, "0"));
        setStartMinute(minute.padStart(2, "0"));
        setStartPeriod(period as "AM" | "PM");
      }
      if (initialEndTime) {
        const [time, period] = initialEndTime.split(" ");
        const [hour, minute] = time.split(":");
        setEndHour(hour.padStart(2, "0"));
        setEndMinute(minute.padStart(2, "0"));
        setEndPeriod(period as "AM" | "PM");
      }
    }
  }, [visible, initialStartTime, initialEndTime]);

  const incrementHour = (value: string) => {
    const num = parseInt(value, 10);
    return String((num % 12) + 1).padStart(2, "0");
  };

  const decrementHour = (value: string) => {
    const num = parseInt(value, 10);
    return String(num === 1 ? 12 : num - 1).padStart(2, "0");
  };

  const incrementMinute = (value: string) => {
    const num = parseInt(value, 10);
    return String((num + 15) % 60).padStart(2, "0");
  };

  const decrementMinute = (value: string) => {
    const num = parseInt(value, 10);
    return String(num === 0 ? 45 : num - 15).padStart(2, "0");
  };

  const handleSave = () => {
    const startTime = `${startHour}:${startMinute} ${startPeriod}`;
    const endTime = `${endHour}:${endMinute} ${endPeriod}`;
    onSave?.(startTime, endTime);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-[360px] p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onClose}
            className="w-7 h-7 border border-primary rounded-full flex items-center justify-center"
          >
            <X size={16} className="text-primary" />
          </button>

          <h2 className="text-lg font-semibold text-black">{day}</h2>

          <div className="w-7" />
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-center text-sm mb-4">
          Set the start and end times for your working hours
        </p>

        {/* TIME PICKERS */}
        <div className="flex flex-col items-center">
          <TimePicker
            hour={startHour}
            minute={startMinute}
            period={startPeriod}
            setHour={setStartHour}
            setMinute={setStartMinute}
            setPeriod={setStartPeriod}
            incrementHour={incrementHour}
            decrementHour={decrementHour}
            incrementMinute={incrementMinute}
            decrementMinute={decrementMinute}
          />

          <p className="text-gray-500 text-sm my-2">to</p>

          <TimePicker
            hour={endHour}
            minute={endMinute}
            period={endPeriod}
            setHour={setEndHour}
            setMinute={setEndMinute}
            setPeriod={setEndPeriod}
            incrementHour={incrementHour}
            decrementHour={decrementHour}
            incrementMinute={incrementMinute}
            decrementMinute={decrementMinute}
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-primary text-white text-base px-10 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const TimePicker = ({
  hour,
  minute,
  period,
  setHour,
  setMinute,
  setPeriod,
  incrementHour,
  decrementHour,
  incrementMinute,
  decrementMinute,
}: any) => (
  <div className="flex items-center">
    {/* HOUR */}
    <div className="flex flex-col items-center mx-2">
      <button onClick={() => setHour(incrementHour(hour))}>
        <ChevronUp size={20} />
      </button>
      <input
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        maxLength={2}
        className="w-12 text-center text-xl font-bold border-b border-gray-300"
      />
      <button onClick={() => setHour(decrementHour(hour))}>
        <ChevronDown size={20} />
      </button>
    </div>

    <span className="text-xl font-bold mx-2">:</span>

    {/* MINUTE */}
    <div className="flex flex-col items-center mx-2">
      <button onClick={() => setMinute(incrementMinute(minute))}>
        <ChevronUp size={20} />
      </button>
      <input
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        maxLength={2}
        className="w-12 text-center text-xl font-bold border-b border-gray-300"
      />
      <button onClick={() => setMinute(decrementMinute(minute))}>
        <ChevronDown size={20} />
      </button>
    </div>

    {/* PERIOD */}
    <div className="flex flex-col ml-3">
      <button
        onClick={() => setPeriod("AM")}
        className={`px-3 py-1 rounded-md text-xs font-bold ${
          period === "AM"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        AM
      </button>
      <button
        onClick={() => setPeriod("PM")}
        className={`px-3 py-1 rounded-md text-xs font-bold mt-1 ${
          period === "PM"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        PM
      </button>
    </div>
  </div>
);
