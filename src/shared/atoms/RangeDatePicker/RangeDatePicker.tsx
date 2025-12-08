"use client";

import { useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { cn } from "@/shared/utils";
import { COLORS } from "@/shared/configs";
import type { RangeDatePickerProps } from "./types";

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function RangeDatePicker({
  startDate,
  endDate,
  onSelectRange,
  label,
  className,
}: RangeDatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      onSelectRange({
        startDate: dates[0].toDate(),
        endDate: dates[1].toDate(),
      });
      setOpen(false);
    }
  };

  // Custom render function to display the range with optional label
  const customRender = () => {
    const prefix = label ? `${label}: ` : "";
    return `${prefix}${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
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
      <RangePicker
        value={[dayjs(startDate), dayjs(endDate)]}
        onChange={handleChange}
        open={open}
        onOpenChange={setOpen}
        format="DD MMM YYYY"
        renderExtraFooter={() => null}
        separator={null}
        suffixIcon={<CalendarOutlined style={{ color: COLORS.gray[400] }} />}
        placement="bottomRight"
        allowClear={false}
        className={cn(
          "font-medium text-gray-800 transition-all duration-150 ease-in-out",
          "[&_.ant-picker-input>input]:font-medium [&_.ant-picker-input>input]:text-sm",
          "[&_.ant-picker-input>input]:text-gray-800 [&_.ant-picker-input>input::placeholder]:text-gray-400",
          "[&.ant-picker-focused]:border-primary [&.ant-picker-focused]:shadow-[0_0_0_4px_rgba(255,107,53,0.2)]",
          "[&_.ant-picker-range-separator]:hidden",
          "[&_.ant-picker-active-bar]:hidden",
          className
        )}
        style={{ width: "auto" }}
        // Override the display to show custom format
        getPopupContainer={(trigger) => trigger.parentElement!}
        onCalendarChange={() => {}}
        // Use placeholder to display our custom format when closed
        placeholder={[customRender(), ""]}
      />
    </ConfigProvider>
  );
}
