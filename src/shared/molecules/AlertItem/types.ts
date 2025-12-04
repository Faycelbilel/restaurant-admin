export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertItemProps {
  type: "warning" | "error";
  title: string;
  message: string;
  actions?: AlertAction[];
  className?: string;
}
