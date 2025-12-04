"use client";

import { Button } from "@/shared/atoms";
import { ButtonType, ButtonVariant } from "@/shared/types/enums";
import type { FormActionsProps } from "./types";

export function FormActions({
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Save",
  submitVariant = ButtonVariant.Primary,
  cancelVariant = ButtonVariant.Secondary,
  isSubmitting = false,
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex justify-end gap-3 pt-4 ${className}`}>
      <Button
        type={ButtonType.Button}
        variant={cancelVariant}
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelText}
      </Button>
      <Button
        type={ButtonType.Submit}
        variant={submitVariant}
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitText}
      </Button>
    </div>
  );
}
