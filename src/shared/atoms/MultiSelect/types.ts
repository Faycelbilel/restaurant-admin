export interface MultiSelectOption<T = string> {
  value: T;
  label: string;
}

export interface MultiSelectProps<T = string> {
  options: MultiSelectOption<T>[];
  selectedValues: T[];
  onChange: (values: T[]) => void;
  placeholder?: string;
  className?: string;
  getDisplayText?: (selectedCount: number, options: MultiSelectOption<T>[]) => string;
}
