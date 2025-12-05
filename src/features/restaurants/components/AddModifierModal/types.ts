import { ModifierModalMode } from "@/shared/types/enums";

export interface ExtraItem {
  id?: number;
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  price: number;
  default: boolean;
}

export interface OptionGroup {
  id?: number;
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  minSelect: number;
  maxSelect: number;
  required: boolean;
  extras: ExtraItem[];
}

export interface ModifierData {
  optionGroups: OptionGroup[];
}

export interface AddModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (optionGroup: OptionGroup) => void;
  initialValue?: OptionGroup;
  mode?: ModifierModalMode;
}
