import { ButtonVariant } from "@/shared/types/enums";

export interface FormActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  cancelText?: string;
  submitText?: string;
  submitVariant?: ButtonVariant;
  cancelVariant?: ButtonVariant;
  isSubmitting?: boolean;
  className?: string;
}
