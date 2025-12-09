"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { SpecialDayData, SpecialDayModal } from "./SpecialDayPopup";
import { SpecialDayCard } from "./SpecialDayCard";
import { parseTimeString } from "./timeUtils";
import { buildPayload } from "./specialDayUtils";
import { OperatingHoursPopup } from "./OperatingHoursPopup";
import { WeeklyScheduleEntryDTO } from "./operating";
import { operatingHoursService } from "./services/operatingHoursService";

export default function OperatingHours() {
  const [weeklySchedule, setWeeklySchedule] = useState<
    WeeklyScheduleEntryDTO[]
  >([]);
  const [specialDays, setSpecialDays] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSpecialDayModalOpen, setIsSpecialDayModalOpen] = useState(false);
  const [selectedSpecialDay, setSelectedSpecialDay] = useState<any | null>(
    null
  );

  const fetchSchedule = async () => {
    try {
      const data = await operatingHoursService.getOperatingHours();
      setWeeklySchedule(data.weeklySchedule);
      setSpecialDays(data.specialDays);
    } catch (err) {
      console.log("Error fetching hours:", err);
    }
  };

  const handleDeleteSpecialDay = async (id: number) => {
    setSpecialDays((prev) => prev.filter((d) => d.id !== id));

    try {
      await operatingHoursService.deleteSpecialDay(id);
    } catch (error) {
      console.log("Error deleting special day:", error);
      fetchSchedule();
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const getWeeklyText = () => {
    if (!weeklySchedule.length) return "Loading...";
    const openDays = weeklySchedule.filter((d) => d.open);
    const closedDays = weeklySchedule.filter((d) => !d.open);
    const formatDay = (d: string) =>
      d.slice(0, 3).charAt(0) + d.slice(1, 3).toLowerCase();
    if (openDays.length === 0) return "Closed all week";
    const openRange =
      openDays.length === 1
        ? formatDay(openDays[0].day)
        : `${formatDay(openDays[0].day)} – ${formatDay(openDays[openDays.length - 1].day)}`;
    const closedRange =
      closedDays.length === 1
        ? formatDay(closedDays[0].day)
        : closedDays.length > 1
          ? `${formatDay(closedDays[0].day)} – ${formatDay(closedDays[openDays.length - 1].day)}`
          : "";
    return closedRange
      ? `${openRange} | ${closedRange} • Closed`
      : `${openRange}`;
  };

  const handleSaveSpecialDay = async (data: SpecialDayData) => {
    try {
      const exists = specialDays.some(
        (day) => day.date === data.date && day.id !== selectedSpecialDay?.id
      );
      if (exists) {
        console.log("A special day for this date already exists!");
        return;
      }

      const lastTimes = selectedSpecialDay
        ? {
            opensAt: parseTimeString(selectedSpecialDay.opensAt),
            closesAt: parseTimeString(selectedSpecialDay.closesAt),
          }
        : undefined;

      const payload = buildPayload(data, lastTimes);

      if (selectedSpecialDay) {
        const updated = await operatingHoursService.updateSpecialDay(
          selectedSpecialDay.id,
          payload
        );
        setSpecialDays((prev) =>
          prev.map((d) =>
            d.id === selectedSpecialDay.id ? { ...d, ...updated } : d
          )
        );
      } else {
        const created = await operatingHoursService.addSpecialDay(payload);
        setSpecialDays((prev) => [...prev, created]);
      }

      setSelectedSpecialDay(null);
      setIsSpecialDayModalOpen(false);
    } catch (error) {
      console.error("Error saving special day:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="p-10 pt-12 bg-white rounded-full">
          <Image
            src="/calendaricon.svg"
            alt="Calendar"
            width={150}
            height={150}
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Operating Hours
        </h1>
        <p className="text-lg text-black leading-relaxed">
          Tell customers when you're open—and when you're ready to receive
          orders.
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Weekly Schedule
        </h2>
        <p className="text-sm text-gray-600 mb-4">{getWeeklyText()}</p>

        <button
          onClick={() => setShowPopup(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-5 rounded-xl flex items-center justify-center gap-3 transition"
        >
          <CalendarDays size={30} />
          <span className="text-base">Edit weekly schedule</span>
        </button>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Special Days</h2>
          <button
            onClick={() => {
              setSelectedSpecialDay(null);
              setIsSpecialDayModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2 bg-red-50 hover:bg-red-100 rounded-full border border-red-600 text-red-600 font-medium transition"
          >
            <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center">
              <Plus size={20} strokeWidth={3} />
            </div>
            <span className="text-lg">Add</span>
          </button>
        </div>

        <p className="font-semibold text-gray-700 mb-4">
          Add specific days with special working hours
        </p>

        {specialDays.map((day, index) => (
          <div
            key={day.id ?? `${day.date}-${index}`}
            className="flex items-center mb-4"
          >
            <button
              onClick={() => handleDeleteSpecialDay(day.id)}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center mr-3 transition"
            >
              <Trash2 size={24} className="text-white" />
            </button>

            <div className="flex-1">
              <SpecialDayCard
                id={day.id}
                date={day.date}
                name={day.name ?? ""}
                isOpen={day.open}
                startTime={day.opensAt?.slice(0, 5) ?? ""}
                endTime={day.closesAt?.slice(0, 5) ?? ""}
                onEdit={() => {
                  setSelectedSpecialDay({
                    id: day.id,
                    name: day.name,
                    date: day.date,
                    open: day.open,
                    opensAt: day.opensAt,
                    closesAt: day.closesAt,
                  });
                  setIsSpecialDayModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <OperatingHoursPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <SpecialDayModal
        key={selectedSpecialDay?.id ?? "new"}
        visible={isSpecialDayModalOpen}
        onClose={() => setIsSpecialDayModalOpen(false)}
        onSave={handleSaveSpecialDay}
        editData={selectedSpecialDay}
      />
    </div>
  );
}
