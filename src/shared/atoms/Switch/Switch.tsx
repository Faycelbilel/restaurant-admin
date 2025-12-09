import { cn } from "@/shared/utils";
import { ButtonType } from "@/shared/types/enums";
import type { SwitchProps } from "./types";
import {
  BASE_WRAPPER_STYLES,
  TOGGLE_BASE_STYLES,
  ENABLED_BACKGROUND,
  DISABLED_BACKGROUND,
  THUMB_BASE_STYLES,
  SIZE_STYLES,
} from "./constants";

export function Switch({
  enabled,
  onToggle,
  className,
  size = "md",
}: SwitchProps) {
  const backgroundClass = enabled ? ENABLED_BACKGROUND : DISABLED_BACKGROUND;
  const sizeClasses = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const thumbClass = enabled
    ? sizeClasses.enabledPosition
    : sizeClasses.disabledPosition;

  return (
    <div className={cn(BASE_WRAPPER_STYLES, className)}>
      <button
        type={ButtonType.Button}
        onClick={onToggle}
        className={cn(
          TOGGLE_BASE_STYLES,
          sizeClasses.toggle,
          backgroundClass
        )}
        role="switch"
        aria-checked={enabled}
      >
        <span className={cn(THUMB_BASE_STYLES, sizeClasses.thumb, thumbClass)} />
      </button>
    </div>
  );
}
