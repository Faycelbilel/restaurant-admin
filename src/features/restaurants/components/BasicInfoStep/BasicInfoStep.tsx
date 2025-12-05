"use client";

import { Button, Text, Switch } from "@/shared/atoms";
import { FormField } from "@/shared/molecules";
import {
  ButtonVariant,
  ButtonSize,
  TextElement,
  TextSize,
  TextWeight,
  TextColor,
} from "@/shared/types/enums";
import { VALIDATION_MESSAGES, STEP_TITLES } from "../AddDishWizard/constants";
import type { BasicInfoStepProps } from "./types";

export function BasicInfoStep({
  name,
  nameEn,
  nameFr,
  nameAr,
  description,
  descriptionEn,
  descriptionFr,
  descriptionAr,
  price,
  promotionPrice,
  promotionActive,
  promotionLabel,
  available,
  popular,
  onNameChange,
  onNameEnChange,
  onNameFrChange,
  onNameArChange,
  onDescriptionChange,
  onDescriptionEnChange,
  onDescriptionFrChange,
  onDescriptionArChange,
  onPriceChange,
  onPromotionPriceChange,
  onPromotionActiveChange,
  onPromotionLabelChange,
  onAvailableChange,
  onPopularChange,
  onNext,
  onBack,
}: BasicInfoStepProps) {
  const handleNext = () => {
    if (!name?.trim() || !nameFr?.trim() || !nameAr?.trim() || !price?.trim()) {
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <Text
          as={TextElement.H2}
          size={TextSize.TwoExtraLarge}
          weight={TextWeight.Semibold}
        >
          <Text
            as={TextElement.Span}
            color={TextColor.Primary}
            size={TextSize.TwoExtraLarge}
            weight={TextWeight.Semibold}
          >
            {STEP_TITLES.DETAILS.title}
          </Text>{" "}
          {STEP_TITLES.DETAILS.highlight}
        </Text>
        <Text color={TextColor.Muted} size={TextSize.Small}>
          {STEP_TITLES.DETAILS.description}
        </Text>
      </div>

      <div className="w-full space-y-6">
        {/* Name Section */}
        <div className="space-y-4">
          <Text
            as={TextElement.H3}
            size={TextSize.Large}
            weight={TextWeight.Semibold}
            className="text-gray-900"
          >
            Menu Item Name
          </Text>
          
          <FormField
            label="Name (English)"
            name="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Margherita Pizza"
            required
          />
          
          <FormField
            label="Name (French)"
            name="nameFr"
            value={nameFr}
            onChange={(e) => onNameFrChange(e.target.value)}
            placeholder="e.g., Pizza Margherita"
            required
          />
          
          <FormField
            label="Name (Arabic)"
            name="nameAr"
            value={nameAr}
            onChange={(e) => onNameArChange(e.target.value)}
            placeholder="e.g., بيتزا مارغريتا"
            required
            dir="rtl"
          />
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <Text
            as={TextElement.H3}
            size={TextSize.Large}
            weight={TextWeight.Semibold}
            className="text-gray-900"
          >
            Description
          </Text>
          
          <FormField
            label="Description (English)"
            name="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe what makes this dish special..."
            multiline
            rows={3}
          />
          
          <FormField
            label="Description (French)"
            name="descriptionFr"
            value={descriptionFr}
            onChange={(e) => onDescriptionFrChange(e.target.value)}
            placeholder="Description française"
            multiline
            rows={3}
          />
          
          <FormField
            label="Description (Arabic)"
            name="descriptionAr"
            value={descriptionAr}
            onChange={(e) => onDescriptionArChange(e.target.value)}
            placeholder="الوصف بالعربية"
            multiline
            rows={3}
            dir="rtl"
          />
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <Text
            as={TextElement.H3}
            size={TextSize.Large}
            weight={TextWeight.Semibold}
            className="text-gray-900"
          >
            Pricing
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Regular Price (TND)"
              name="price"
              type="number"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="13.00"
              required
            />
            
            <FormField
              label="Promotion Price (TND)"
              name="promotionPrice"
              type="number"
              value={promotionPrice}
              onChange={(e) => onPromotionPriceChange(e.target.value)}
              placeholder="10.00"
            />
          </div>

          <FormField
            label="Promotion Label"
            name="promotionLabel"
            value={promotionLabel}
            onChange={(e) => onPromotionLabelChange(e.target.value)}
            placeholder="e.g., 20% OFF, Limited Time"
          />
        </div>

        {/* Settings Section */}
        <div className="space-y-4">
          <Text
            as={TextElement.H3}
            size={TextSize.Large}
            weight={TextWeight.Semibold}
            className="text-gray-900"
          >
            Settings
          </Text>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <Text weight={TextWeight.Semibold} className="text-gray-900">
                  Promotion Active
                </Text>
                <Text size={TextSize.Small} color={TextColor.Muted}>
                  Enable promotional pricing
                </Text>
              </div>
              <Switch
                enabled={promotionActive}
                onToggle={() => onPromotionActiveChange(!promotionActive)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <Text weight={TextWeight.Semibold} className="text-gray-900">
                  Available
                </Text>
                <Text size={TextSize.Small} color={TextColor.Muted}>
                  Item is available for ordering
                </Text>
              </div>
              <Switch
                enabled={available}
                onToggle={() => onAvailableChange(!available)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <Text weight={TextWeight.Semibold} className="text-gray-900">
                  Popular Item
                </Text>
                <Text size={TextSize.Small} color={TextColor.Muted}>
                  Mark as a popular menu item
                </Text>
              </div>
              <Switch
                enabled={popular}
                onToggle={() => onPopularChange(!popular)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          type="button"
          onClick={onBack}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Medium}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!name.trim() || !nameEn.trim() || !nameFr.trim() || !nameAr.trim() || !price.trim()}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
