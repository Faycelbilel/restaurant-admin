export interface DatePickerProps {
  readonly selectedDate: Date;
  readonly onSelectDate: (date: Date) => void;
  readonly label?: string;
  readonly className?: string;
}
