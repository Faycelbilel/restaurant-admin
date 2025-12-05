"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, CategoryFilterButton, Text } from "@/shared/atoms";
import {
  ButtonVariant,
  ButtonSize,
  TextElement,
  TextSize,
  TextWeight,
  TextColor,
} from "@/shared/types/enums";
import { AddCategoryModal } from "../AddCategoryModal/AddCategoryModal";
import { STEP_TITLES } from "../AddDishWizard/constants";
import type { CategoryStepProps } from "./types";

export function CategoryStep({
  categories,
  selectedCategories,
  onCategoryToggle,
  onCategoryAdd,
  onNext,
}: CategoryStepProps) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleSaveCategory = async (data: { nameEn: string; nameFr: string; nameAr: string }) => {
    try {
      await onCategoryAdd(data);
      setShowCategoryModal(false);
    } catch (error) {
    }
  };

  const handleNext = () => {
    if (selectedCategories.length === 0) {
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="text-center space-y-2">
        <Text
          as={TextElement.H2}
          color={TextColor.Primary}
          size={TextSize.TwoExtraLarge}
          weight={TextWeight.Semibold}
        >
          <Text
            as={TextElement.Span}
            size={TextSize.TwoExtraLarge}
            weight={TextWeight.Semibold}
          >
            {STEP_TITLES.CATEGORY.title}
          </Text>{" "}
          {STEP_TITLES.CATEGORY.highlight}
        </Text>
        <Text color={TextColor.Muted} size={TextSize.Small}>
          Select one or more categories for your menu item
        </Text>
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
        {categories.map((category) => (
          <CategoryFilterButton
            key={category}
            type="button"
            isActive={selectedCategories.includes(category)}
            onClick={() => onCategoryToggle(category)}
          >
            {category}
          </CategoryFilterButton>
        ))}
      </div>

      <Button
        type="button"
        onClick={() => setShowCategoryModal(true)}
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Medium}
        className="gap-2"
      >
        <Plus className="h-5 w-5" />
        <Text as={TextElement.Span}>Add New Category</Text>
      </Button>

      <Button
        type="button"
        onClick={handleNext}
        disabled={selectedCategories.length === 0}
        variant={ButtonVariant.Primary}
        size={ButtonSize.Medium}
        className="mt-8"
      >
        Continue
      </Button>

      <AddCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
}
