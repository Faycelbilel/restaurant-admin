import { InfoItem } from "../InfoItem";
import type { InfoListProps, InfoListItem } from "./types";

export function InfoList({ items, className }: InfoListProps) {
  return (
    <div className={className}>
      {items.map((item: InfoListItem, index: number) => (
        <InfoItem key={`${item.label}-${index}`} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
