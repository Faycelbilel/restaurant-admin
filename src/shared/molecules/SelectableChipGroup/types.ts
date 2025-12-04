export interface SelectableChipItem {
  value: string;
  label: string;
}

export interface SelectableChipGroupProps {
  items: string[] | SelectableChipItem[];
  selectedItems: string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
}
