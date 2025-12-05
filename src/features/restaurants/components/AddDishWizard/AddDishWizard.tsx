"use client";

import { useState } from "react";
import { Button, Text } from "@/shared/atoms";
import { StepIndicator } from "@/shared/molecules";
import { ButtonVariant, TextColor } from "@/shared/types/enums";
import { WIZARD_STEPS, getInitialFormData } from "./constants";
import type { AddDishWizardProps, DishFormData } from "./types";
import type { OptionGroup } from "../AddModifierModal/types";
import { BasicInfoStep } from "../BasicInfoStep";
import { ModifiersStep } from "../ModifiersStep";
import { ImageStep } from "../ImageStep";
import { CategoryStep } from "../CategoryStep";

export function AddDishWizard({
  categories,
  addons = [],
  onSubmit,
  onCancel,
  initialData,
  restaurantId,
  onCategoryAdd,
  isEditMode = false,
}: AddDishWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [formData, setFormData] = useState<DishFormData>(
    getInitialFormData(initialData, categories[0])
  );

  const [categoryList, setCategoryList] = useState<string[]>(categories);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep((prev) => Math.min(prev + 1, WIZARD_STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  const handleCategoryAdd = async (data: { nameEn: string; nameFr: string; nameAr: string }): Promise<void> => {
    if (onCategoryAdd) {
      await onCategoryAdd(data);
    }
    setCategoryList((prev) => [...prev, data.nameEn]);
    setFormData((prev) => ({ ...prev, categories: [...prev.categories, data.nameEn] }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleAddonAdd = (optionGroup: OptionGroup) => {
    setFormData((prev) => ({
      ...prev,
      optionGroups: [...prev.optionGroups, optionGroup],
    }));
  };

  const handleOptionGroupRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      optionGroups: prev.optionGroups.filter((_, i) => i !== index),
    }));
  };

  const handleOptionGroupUpdate = (index: number, optionGroup: OptionGroup) => {
    setFormData((prev) => ({
      ...prev,
      optionGroups: prev.optionGroups.map((og, i) => (i === index ? optionGroup : og)),
    }));
  };

  const handleImageChange = (files: File[]) => {
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, images: [...(prev.images || []), ...files] }));
    }
  };

  const handleExistingImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      existingImageUrls: (prev.existingImageUrls || []).filter((_, i) => i !== index),
    }));
  };

  const handleNewImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      
      <StepIndicator
        steps={WIZARD_STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        {currentStep === 1 && (
          <CategoryStep
            categories={categoryList}
            selectedCategories={formData.categories}
            onCategoryToggle={handleCategoryToggle}
            onCategoryAdd={handleCategoryAdd}
            onNext={handleNext}
            restaurantId={restaurantId}
          />
        )}

        {currentStep === 2 && (
          <BasicInfoStep
            name={formData.name}
            nameEn={formData.nameEn}
            nameFr={formData.nameFr}
            nameAr={formData.nameAr}
            description={formData.description}
            descriptionEn={formData.descriptionEn}
            descriptionFr={formData.descriptionFr}
            descriptionAr={formData.descriptionAr}
            price={formData.price}
            promotionPrice={formData.promotionPrice}
            promotionActive={formData.promotionActive}
            promotionLabel={formData.promotionLabel}
            available={formData.available}
            popular={formData.popular}
            onNameChange={(name) => setFormData((prev) => ({ ...prev, name, nameEn: name }))}
            onNameEnChange={(nameEn) => setFormData((prev) => ({ ...prev, nameEn }))}
            onNameFrChange={(nameFr) => setFormData((prev) => ({ ...prev, nameFr }))}
            onNameArChange={(nameAr) => setFormData((prev) => ({ ...prev, nameAr }))}
            onDescriptionChange={(description) =>
              setFormData((prev) => ({ ...prev, description, descriptionEn: description }))
            }
            onDescriptionEnChange={(descriptionEn) =>
              setFormData((prev) => ({ ...prev, descriptionEn }))
            }
            onDescriptionFrChange={(descriptionFr) =>
              setFormData((prev) => ({ ...prev, descriptionFr }))
            }
            onDescriptionArChange={(descriptionAr) =>
              setFormData((prev) => ({ ...prev, descriptionAr }))
            }
            onPriceChange={(price) => setFormData((prev) => ({ ...prev, price }))}
            onPromotionPriceChange={(promotionPrice) =>
              setFormData((prev) => ({ ...prev, promotionPrice }))
            }
            onPromotionActiveChange={(promotionActive) =>
              setFormData((prev) => ({ ...prev, promotionActive }))
            }
            onPromotionLabelChange={(promotionLabel) =>
              setFormData((prev) => ({ ...prev, promotionLabel }))
            }
            onAvailableChange={(available) =>
              setFormData((prev) => ({ ...prev, available }))
            }
            onPopularChange={(popular) =>
              setFormData((prev) => ({ ...prev, popular }))
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <ModifiersStep
            addonsEnabled={formData.addonsEnabled}
            optionGroups={formData.optionGroups}
            onAddonsEnabledToggle={() =>
              setFormData((prev) => ({ ...prev, addonsEnabled: !prev.addonsEnabled }))
            }
            onOptionGroupAdd={handleAddonAdd}
            onOptionGroupRemove={handleOptionGroupRemove}
            onOptionGroupUpdate={handleOptionGroupUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <ImageStep
            existingImageUrls={formData.existingImageUrls}
            newImages={formData.images || []}
            onImageChange={handleImageChange}
            onExistingImageRemove={handleExistingImageRemove}
            onNewImageRemove={handleNewImageRemove}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isEditMode={isEditMode}
          />
        )}
      </div>

      {onCancel && (
        <div className="mt-6 text-center">
          <Button
            type="button"
            onClick={onCancel}
            variant={ButtonVariant.Ghost}
          >
            <Text color={TextColor.Muted}>Cancel and Exit</Text>
          </Button>
        </div>
      )}
    </div>
  );
}
