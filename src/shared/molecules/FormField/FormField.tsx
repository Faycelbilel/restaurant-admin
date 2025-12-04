"use client";

import { Input } from "@/shared/atoms";
import { FormFieldType } from "@/shared/types/enums";
import type { FormFieldProps } from "./types";

export function FormField({
  label,
  name,
  type = FormFieldType.Text,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  autoFocus = false,
  autoComplete = "off",
  className = "",
  multiline = false,
  rows = 4,
  min,
  max,
  step,
  disabled = false,
}: FormFieldProps) {
  return (
    <div>
      <label className="block font-semibold text-gray-800 mb-2">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className={`w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400 transition-all duration-150 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20 ${className}`}
          disabled={disabled}
        />
      ) : (
        <Input
          type={type as React.HTMLInputTypeAttribute}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${className}`}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      )}
    </div>
  );
}
