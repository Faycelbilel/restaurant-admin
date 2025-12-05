export interface CategoryData {
  nameEn: string;
  nameFr: string;
  nameAr: string;
}

export interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryData) => void | Promise<void>;
  initialValue?: string;
}
