import type { CategoryData } from "../AddCategoryModal/types";

export interface CategoryStepProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onCategoryAdd: (data: CategoryData) => Promise<void>;
  onNext: () => void;
  restaurantId: number;
}
