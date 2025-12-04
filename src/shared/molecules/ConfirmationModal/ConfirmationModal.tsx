"use client";

import { Modal } from "@/shared/organisms/Modal";
import { Button } from "@/shared/atoms";
import { ButtonVariant, ButtonSize, ModalSize } from "@/shared/types/enums";
import type { ConfirmationModalProps } from "./types";

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  const getConfirmVariant = () => {
    switch (variant) {
      case "danger":
        return ButtonVariant.Danger;
      case "warning":
        return ButtonVariant.Primary;
      case "info":
        return ButtonVariant.Primary;
      default:
        return ButtonVariant.Primary;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={ModalSize.Small}
      showCloseButton={true}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600">{message}</p>
        
        <div className="flex justify-end gap-3">
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Medium}
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={getConfirmVariant()}
            size={ButtonSize.Medium}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
