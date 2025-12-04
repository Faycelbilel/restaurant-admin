export interface ImagePreviewItem {
  src: string;
  alt?: string;
  id?: string | number;
}

export interface ImageUploadProps {
  /** Handler for file input change */
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Allow selecting multiple files */
  multiple?: boolean;
  
  /** Preview images (can be URLs or data URIs) */
  previews?: ImagePreviewItem[];
  
  /** Handler when a preview image is removed */
  onRemove?: (index: number, id?: string | number) => void;
  
  /** Label for the upload field */
  label?: string;
  
  /** Upload prompt text */
  uploadText?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Accepted file types */
  accept?: string;
  
  /** Maximum number of files (for multiple mode) */
  maxFiles?: number;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Error message */
  error?: string;
  
  /** Help text */
  helpText?: string;
  
  /** Grid columns for preview display */
  previewColumns?: number;
  
  /** Preview image height */
  previewHeight?: string;
  
  /** ARIA label for accessibility */
  ariaLabel?: string;
}
