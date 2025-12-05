export interface ImageStepProps {
  existingImageUrls?: string[];
  newImages?: File[];
  onImageChange: (files: File[]) => void;
  onExistingImageRemove?: (index: number) => void;
  onNewImageRemove?: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isEditMode?: boolean;
}
