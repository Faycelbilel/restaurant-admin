import React from "react";
import { Calendar, Edit2 } from "lucide-react";
import { SpecialDayEntryDTO } from "./operating";

interface Props {
  id: number;
  date: string;
  name: string;
  isOpen: boolean;
  startTime?: string;
  endTime?: string;
  onEdit?: (payload: SpecialDayEntryDTO) => void;
}

// Helper to mimic moderateScale (responsive scaling)
const ms = (size: number, factor = 0.5): string => {
  const base = size;
  const extra = size * factor;
  const scale =
    typeof window !== "undefined" && window.innerWidth < 640 ? 0.9 : 1.1;
  const scaled = (base + extra) * scale;
  return `${Math.round(scaled)}px`;
};

export const SpecialDayCard: React.FC<Props> = ({
  id,
  date,
  name,
  isOpen,
  startTime,
  endTime,
  onEdit,
}) => {
  const handleEdit = () => {
    const payload: SpecialDayEntryDTO = {
      id,
      name,
      date,
      open: isOpen,
      opensAt: isOpen ? startTime : undefined,
      closesAt: isOpen ? endTime : undefined,
    };

    onEdit?.(payload);
  };

  return (
    <div className="flex items-center justify-between bg-[#17213A] rounded-2xl px-4 py-3 mb-3">
      {/* Left Side */}
      <div className="flex items-center flex-1">
        <Calendar size={22} className="text-gray-400 mr-3 flex-shrink-0" />
        <div className="max-w-[110px]">
          <p className="text-white font-semibold text-sm leading-tight">
            {date}
          </p>
          {name ? (
            <p className="text-gray-400 text-xs truncate">{name}</p>
          ) : null}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold text-xs tracking-wider pr-1">
          {isOpen && startTime && endTime
            ? `${startTime} - ${endTime}`
            : "Closed"}
        </span>

        <button
          onClick={handleEdit}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Edit special day"
        >
          <Edit2 size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};
