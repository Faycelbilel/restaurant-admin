import type { ImagePreviewItem } from "./types";

/**
 * Helper to convert legacy array of URLs to ImagePreviewItem[]
 * @param urls - Array of image URLs
 * @returns Array of ImagePreviewItem objects
 */
export function urlsToPreviewItems(urls: string[]): ImagePreviewItem[] {
  return urls.map((url, index) => ({
    src: url,
    alt: `Image ${index + 1}`,
    id: `url-${index}`,
  }));
}

/**
 * Helper to merge existing and new image previews
 * @param existingUrls - Array of existing image URLs
 * @param newPreviews - Array of new preview URLs
 * @returns Combined array of ImagePreviewItem objects
 */
export function mergeImagePreviews(
  existingUrls: string[],
  newPreviews: string[]
): ImagePreviewItem[] {
  const existing = existingUrls.map((url, index) => ({
    src: url,
    alt: `Existing image ${index + 1}`,
    id: `existing-${index}`,
  }));

  const newItems = newPreviews.map((url, index) => ({
    src: url,
    alt: `New image ${index + 1}`,
    id: `new-${index}`,
  }));

  return [...existing, ...newItems];
}
