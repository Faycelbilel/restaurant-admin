"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/shared/atoms";
import { ButtonVariant, ButtonSize, ButtonType } from "@/shared/types/enums";
import { useReactToPrint } from "react-to-print";

interface PreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export function PreviewDrawer({ isOpen, onClose, imageUrl, title }: PreviewDrawerProps) {
  const printableRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ 
    contentRef: printableRef,


  });


  

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex"
        role="dialog"
        aria-modal="true"
        aria-label={title ? `${title} preview` : "Document preview"}
      >
        <button
          type="button"
          aria-label="Close preview"
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
        />
        <div className="relative ml-auto flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {title ?? "Document preview"}
              </p>
              <p className="text-xs text-gray-500">Click outside or press ESC to close.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type={ButtonType.Button}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                className="rounded-full border border-gray-200"
                onClick={() => handlePrint?.()}
                aria-label="Print document"
              >
                Print
              </Button>
              <Button
                type={ButtonType.Button}
                variant={ButtonVariant.Ghost}
                size={ButtonSize.Small}
                className="rounded-full border border-gray-200"
                onClick={onClose}
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <div className="relative flex-1 overflow-hidden bg-gray-50">
            <Image
              src={imageUrl}
              alt={title ?? "Driver document"}
              fill
              unoptimized
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </div>

      <div
        ref={printableRef}
        className="pointer-events-none absolute -left-[9999px] top-0"
        aria-hidden="true"
      >
        <img
          src={imageUrl}
          alt={title ?? "Document"}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </>
  );
}
