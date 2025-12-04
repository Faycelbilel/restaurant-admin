"use client";

import { useState } from "react";
import { DatePicker as AntDatePicker, ConfigProvider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { cn } from "@/shared/utils";
import { COLORS } from "@/shared/configs";
import type { DatePickerProps as CustomDatePickerProps } from "./types";

dayjs.extend(customParseFormat);

interface DatePickerProps
  extends Omit<CustomDatePickerProps, "selectedDate" | "onSelectDate"> {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  label?: string;
  className?: string;
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function DatePicker({
  selectedDate,
  onSelectDate,
  label,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (date: Dayjs | null) => {
    if (date) {
      onSelectDate(date.toDate());
      setOpen(false);
    }
  };

  const customFormat = (value: Dayjs) => {
    const prefix = label ? `${label}: ` : "";
    return `${prefix}${formatDisplayDate(value.toDate())}`;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLORS.primary.dark,
          borderRadius: 16,
          controlHeight: 48,
          fontSize: 14,
          fontWeightStrong: 500,
          colorBorder: COLORS.gray[200],
          colorBgContainer: "#FFFFFF",
          colorText: COLORS.gray[800],
          colorTextPlaceholder: COLORS.gray[400],
          controlOutlineWidth: 4,
        },
        components: {
          DatePicker: {
            cellHoverBg: `${COLORS.primary.dark}10`,
            cellActiveWithRangeBg: `${COLORS.primary.dark}20`,
            cellRangeBorderColor: COLORS.primary.dark,
          },
        },
      }}
    >
      <AntDatePicker
        value={dayjs(selectedDate)}
        onChange={handleChange}
        open={open}
        onOpenChange={setOpen}
        format={customFormat}
        suffixIcon={<CalendarOutlined style={{ color: COLORS.gray[400] }} />}
        placement="bottomRight"
        allowClear={false}
        className={cn(
          "font-medium text-gray-800 transition-all duration-150 ease-in-out",
          "[&_.ant-picker-input>input]:font-medium [&_.ant-picker-input>input]:text-sm",
          "[&_.ant-picker-input>input]:text-gray-800 [&_.ant-picker-input>input::placeholder]:text-gray-400",
          "[&.ant-picker-focused]:border-primary [&.ant-picker-focused]:shadow-[0_0_0_4px_rgba(255,107,53,0.2)]",
          className
        )}
        style={{ width: "auto" }}
      />
    </ConfigProvider>
  );
}
