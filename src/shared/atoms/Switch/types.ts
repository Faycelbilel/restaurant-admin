export interface SwitchProps {
  enabled: boolean;
  onToggle?: () => void;
  className?: string;
  size?: "sm" | "md";
}
