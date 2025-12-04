"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Text, Label, IconButton } from "@/shared/atoms";
import { TextElement, TextWeight, TextSize, ButtonVariant, ButtonSize } from "@/shared/types/enums";
import { cn } from "@/shared/utils";
import type { ImageUploadProps } from "./types";
import { DEFAULT_ACCEPT, DEFAULT_PREVIEW_COLUMNS, DEFAULT_PREVIEW_HEIGHT } from "./constants";

export function ImageUpload({
  onImageChange,
  multiple = false,
  previews = [],
  onRemove,
  label,
  uploadText = "Upload image",
  className,
  accept = DEFAULT_ACCEPT,
  maxFiles,
  disabled = false,
  error,
  helpText,
  previewColumns = DEFAULT_PREVIEW_COLUMNS,
  previewHeight = DEFAULT_PREVIEW_HEIGHT,
  ariaLabel,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasReachedMax = maxFiles && previews.length >= maxFiles;
  const isDisabled = disabled || hasReachedMax;

  const handleClick = () => {
    if (fileInputRef.current && !isDisabled) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemove = (index: number, id?: string | number) => {
    if (onRemove && !disabled) {
      onRemove(index, id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label htmlFor="file-upload" className="mb-2">
          {label}
        </Label>
      )}
      
      {helpText && !error && (
        <Text
          as={TextElement.Paragraph}
          size={TextSize.Small}
          className="text-gray-600 mb-2"
        >
          {helpText}
        </Text>
      )}

      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept={accept}
        onChange={onImageChange}
        className="sr-only"
        multiple={multiple}
        disabled={!!isDisabled}
        aria-label={ariaLabel || label || "Upload image"}
        aria-invalid={!!error}
        aria-describedby={error ? "upload-error" : helpText ? "upload-help" : undefined}
      />

      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={!!isDisabled}
        className={cn(
          "w-full border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 transition-all min-h-[120px]",
          isDisabled
            ? "border-gray-300 bg-gray-50 cursor-not-allowed opacity-60"
            : "border-primary text-primary hover:bg-primary/5 hover:border-primary/70 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          error && "border-red-500 text-red-500 hover:border-red-600 hover:bg-red-50"
        )}
      >
        {previews.length > 0 ? (
          <>
            <div
              className={cn(
                "grid gap-3 w-full max-h-[300px] overflow-y-auto scrollbar-hide",
                previewColumns === 1 && "grid-cols-1",
                previewColumns === 2 && "grid-cols-2",
                previewColumns === 3 && "grid-cols-3",
                previewColumns === 4 && "grid-cols-4",
                previewColumns === 5 && "grid-cols-5",
                previewColumns === 6 && "grid-cols-6",
                (!previewColumns || previewColumns > 6) && "grid-cols-3"
              )}
            >
              {previews.map((preview, idx) => (
                <div
                  key={preview.id || idx}
                  className="relative group w-full rounded-lg overflow-hidden border border-gray-200 flex-shrink-0"
                  style={{ height: previewHeight }}
                >
                  <Image
                    src={preview.src}
                    alt={preview.alt || `Preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {onRemove && !disabled && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2">
                      <IconButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(idx, preview.id);
                        }}
                        variant={ButtonVariant.Danger}
                        size={ButtonSize.Small}
                        aria-label={`Remove ${preview.alt || `image ${idx + 1}`}`}
                        className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
                      >
                        <X className="h-4 w-4" />
                      </IconButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {!hasReachedMax && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Upload className="h-5 w-5" />
                <Text as={TextElement.Span} weight={TextWeight.Semibold}>
                  {multiple
                    ? `Add more images (${previews.length}${maxFiles ? `/${maxFiles}` : ""})`
                    : "Change image"}
                </Text>
              </div>
            )}
          </>
        ) : (
          <>
            <Upload className="h-8 w-8" />
            <Text as={TextElement.Span} weight={TextWeight.Semibold}>
              {uploadText}
            </Text>
            {maxFiles && multiple && (
              <Text
                as={TextElement.Span}
                size={TextSize.Small}
                className="text-gray-600"
              >
                Max {maxFiles} {maxFiles === 1 ? "file" : "files"}
              </Text>
            )}
          </>
        )}
      </div>

      {error && (
        <Text
          id="upload-error"
          as={TextElement.Paragraph}
          size={TextSize.Small}
          className="text-red-500 mt-2"
          role="alert"
        >
          {error}
        </Text>
      )}
    </div>
  );
}
