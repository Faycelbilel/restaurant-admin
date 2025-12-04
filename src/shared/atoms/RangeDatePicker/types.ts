export interface DateRange {
  readonly startDate: Date;
  readonly endDate: Date;
}

export interface RangeDatePickerProps {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly onSelectRange: (range: DateRange) => void;
  readonly label?: string;
  readonly className?: string;
}
