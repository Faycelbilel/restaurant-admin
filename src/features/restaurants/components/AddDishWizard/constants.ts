import type { Step } from "@/shared/molecules";
import type { DishFormData } from "./types";

export const WIZARD_STEPS: Step[] = [
  { id: 1, label: "Category", description: "Choose dish type" },
  { id: 2, label: "Details", description: "Basic information" },
  { id: 3, label: "Modifiers", description: "Add-ons & extras" },
  { id: 4, label: "Image", description: "Upload photo" },
];

export const STEP_TITLES = {
  CATEGORY: {
    title: "Choose a",
    highlight: "Category",
    description: "Select the category that best describes your dish",
  },
  DETAILS: {
    title: "Basic",
    highlight: "Information",
    description: "Tell us about your dish",
  },
  MODIFIERS: {
    title: "Add",
    highlight: "Modifiers",
    description: "Optional add-ons and extras for your dish",
  },
  IMAGE: {
    title: "Add",
    highlight: "Images",
    description: "Make your dish look appetizing with a great photo",
  },
} as const;


export const FORM_PLACEHOLDERS = {
  DISH_NAME: "e.g., Margherita Pizza",
  DESCRIPTION: "Describe what makes this dish special...",
  PRICE: "13.00 DT",
} as const;

export const VALIDATION_MESSAGES = {
  CATEGORY_REQUIRED: "Please select a category before proceeding",
  NAME_REQUIRED: "Please fill in all required fields",
  MODIFIER_SELECT_REQUIRED: "Please select at least one modifier to edit",
} as const;

export const DEFAULT_FORM_DATA: Omit<DishFormData, "categories"> = {
  name: "",
  nameEn: "",
  nameFr: "",
  nameAr: "",
  description: "",
  descriptionEn: "",
  descriptionFr: "",
  descriptionAr: "",
  price: "",
  promotionPrice: "",
  promotionActive: false,
  promotionLabel: "",
  available: true,
  popular: false,
  optionGroups: [],
  addonsEnabled: true,
};

export const getInitialFormData = (
  initialData?: Partial<DishFormData>,
  defaultCategory?: string
): DishFormData => ({
  name: initialData?.name ?? "",
  nameEn: initialData?.nameEn ?? "",
  nameFr: initialData?.nameFr ?? "",
  nameAr: initialData?.nameAr ?? "",
  description: initialData?.description ?? "",
  descriptionEn: initialData?.descriptionEn ?? "",
  descriptionFr: initialData?.descriptionFr ?? "",
  descriptionAr: initialData?.descriptionAr ?? "",
  price: initialData?.price ?? "",
  promotionPrice: initialData?.promotionPrice ?? "",
  promotionActive: initialData?.promotionActive ?? false,
  promotionLabel: initialData?.promotionLabel ?? "",
  available: initialData?.available ?? true,
  popular: initialData?.popular ?? false,
  categories: initialData?.categories ?? (defaultCategory ? [defaultCategory] : []),
  optionGroups: initialData?.optionGroups ?? [],
  addonsEnabled: initialData?.addonsEnabled ?? true,
  images: initialData?.images ?? [],
  existingImageUrls: initialData?.existingImageUrls ?? [],
});