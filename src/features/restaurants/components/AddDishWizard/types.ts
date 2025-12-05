import type { CategoryData } from "../AddCategoryModal/types";
import type { OptionGroup } from "../AddModifierModal/types";

export interface DishFormData {
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionAr: string;
  price: string;
  promotionPrice: string;
  promotionActive: boolean;
  promotionLabel: string;
  available: boolean;
  popular: boolean;
  categories: string[];
  optionGroups: OptionGroup[];
  addonsEnabled: boolean;
  images?: File[];
  existingImageUrls?: string[];
}

export interface AddDishWizardProps {
  categories: string[];
  addons?: string[];
  onSubmit?: (data: DishFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<DishFormData>;
  restaurantId: number;
  onCategoryAdd?: (data: CategoryData) => Promise<void>;
  isEditMode?: boolean;
}
