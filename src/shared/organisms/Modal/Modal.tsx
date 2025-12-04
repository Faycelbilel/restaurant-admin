"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils";
import { IconButton, Text } from "@/shared/atoms";
import { ButtonVariant, ButtonSize, ModalSize, TextElement, TextSize, TextWeight } from "@/shared/types/enums";
import type { ModalProps } from "./types";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = ModalSize.Medium,
  showCloseButton = true,
  closeOnBackdropClick = true,
}: ModalProps) {
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    [ModalSize.Small]: "max-w-md",
    [ModalSize.Medium]: "max-w-2xl",
    [ModalSize.Large]: "max-w-4xl",
    [ModalSize.ExtraLarge]: "max-w-6xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-200"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative w-full rounded-3xl bg-white shadow-xl transition-all duration-200",
          "max-h-[90vh] overflow-hidden flex flex-col",
          sizeClasses[size]
        )}
      >
        
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            {title && (
              <Text
                as={TextElement.H2}
                id="modal-title"
                size={TextSize.ExtraLarge}
                weight={TextWeight.Semibold}
                className="text-gray-900"
              >
                {title}
              </Text>
            )}
            {showCloseButton && (
              <IconButton
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                onClick={onClose}
                className="ml-auto"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </IconButton>
            )}
          </div>
        )}

        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
