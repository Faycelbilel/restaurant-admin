"use client";

import { cn } from "@/shared/utils";
import { useEffect, useState } from "react";
import { IconSize } from "@/shared/types/enums";
import type { IconProps } from "./types";
import { BASE_STYLES, SIZE_CLASSES } from "./constants";

export function Icon({ src, alt = "icon", className, size = IconSize.Medium, color }: IconProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((svg) => {
        let modifiedSvg = svg;
        if (color) {
          modifiedSvg = svg
            .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
            .replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
        } else {
          modifiedSvg = svg
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
            .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
        }
        setSvgContent(modifiedSvg);
      })
      .catch((err) => {});
  }, [src, color]);

  return (
    <div
      className={cn(BASE_STYLES, SIZE_CLASSES[size], className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
    />
  );
}
