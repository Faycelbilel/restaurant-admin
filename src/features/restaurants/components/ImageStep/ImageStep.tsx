"use client";

import { useState, useEffect } from "react";
import { Button, Text } from "@/shared/atoms";
import { ImageUpload, mergeImagePreviews, type ImagePreviewItem } from "@/shared/molecules";
import {
  ButtonVariant,
  ButtonSize,
  TextElement,
  TextSize,
  TextWeight,
  TextColor,
} from "@/shared/types/enums";
import { STEP_TITLES } from "../AddDishWizard/constants";
import type { ImageStepProps } from "./types";

export function ImageStep({
  existingImageUrls = [],
  newImages = [],
  onImageChange,
  onExistingImageRemove,
  onNewImageRemove,
  onSubmit,
  onBack,
  isEditMode = false,
}: ImageStepProps) {
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [allPreviews, setAllPreviews] = useState<ImagePreviewItem[]>([]);

  // Generate previews for new images
  useEffect(() => {
    if (newImages.length > 0) {
      const previews: string[] = [];
      let loadedCount = 0;
      
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          loadedCount++;
          if (loadedCount === newImages.length) {
            setNewImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setNewImagePreviews([]);
    }
  }, [newImages]);

  // Merge existing and new previews
  useEffect(() => {
    const merged = mergeImagePreviews(existingImageUrls, newImagePreviews);
    setAllPreviews(merged);
  }, [existingImageUrls, newImagePreviews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onImageChange(fileArray);
    }
  };

  const handleRemove = (index: number, id?: string | number) => {
    // Determine if it's an existing or new image based on ID
    if (typeof id === "string" && id.startsWith("existing-")) {
      const existingIndex = parseInt(id.replace("existing-", ""));
      if (onExistingImageRemove) {
        onExistingImageRemove(existingIndex);
      }
    } else if (typeof id === "string" && id.startsWith("new-")) {
      const newIndex = parseInt(id.replace("new-", ""));
      if (onNewImageRemove) {
        onNewImageRemove(newIndex);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <Text
          as={TextElement.H2}
          size={TextSize.TwoExtraLarge}
          weight={TextWeight.Semibold}
          color={TextColor.Primary}
        >
          <Text
            as={TextElement.Span}
            size={TextSize.TwoExtraLarge}
            weight={TextWeight.Semibold}
          >
            {STEP_TITLES.IMAGE.title}{" "}
          </Text>
          {STEP_TITLES.IMAGE.highlight}
        </Text>
        <Text color={TextColor.Muted} size={TextSize.Small}>
          {STEP_TITLES.IMAGE.description}
        </Text>
      </div>

      <div className="w-full">
        <ImageUpload
          previews={allPreviews}
          onRemove={handleRemove}
          onImageChange={handleImageChange}
          label="Dish Images"
          uploadText={isEditMode ? "Add more images" : "Upload images"}
          multiple={true}
        />
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
          onClick={onSubmit}
          disabled={!isEditMode && newImages.length === 0 && existingImageUrls.length === 0}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
        >
          {isEditMode ? "Update Menu" : "Save Menu"}
        </Button>
      </div>
    </div>
  );
}
