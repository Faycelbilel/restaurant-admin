import { cn } from "@/shared/utils";
import { CategoryFilterButton } from "@/shared/atoms";
import type { CategoryFilterGroupProps } from "./types";

export function CategoryFilterGroup({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterGroupProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {categories.map((category) => (
        <CategoryFilterButton
          key={category}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </CategoryFilterButton>
      ))}
    </div>
  );
}
