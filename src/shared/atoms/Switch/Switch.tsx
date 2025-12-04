import { cn } from "@/shared/utils";
import { ButtonType } from "@/shared/types/enums";
import type { SwitchProps } from "./types";
import {
  BASE_WRAPPER_STYLES,
  TOGGLE_BASE_STYLES,
  ENABLED_BACKGROUND,
  DISABLED_BACKGROUND,
  THUMB_BASE_STYLES,
  THUMB_ENABLED_POSITION,
  THUMB_DISABLED_POSITION,
} from "./constants";

export function Switch({
  enabled,
  onToggle,
  className,
}: SwitchProps) {
  const backgroundClass = enabled ? ENABLED_BACKGROUND : DISABLED_BACKGROUND;
  const thumbClass = enabled ? THUMB_ENABLED_POSITION : THUMB_DISABLED_POSITION;

  return (
    <div className={cn(BASE_WRAPPER_STYLES, className)}>
      <button
        type={ButtonType.Button}
        onClick={onToggle}
        className={cn(TOGGLE_BASE_STYLES, backgroundClass)}
        role="switch"
        aria-checked={enabled}
      >
        <span className={cn(THUMB_BASE_STYLES, thumbClass)} />
      </button>
    </div>
  );
}
