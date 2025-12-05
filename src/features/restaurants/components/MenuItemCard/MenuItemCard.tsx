"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/utils";
import { Switch, IconButton, Text } from "@/shared/atoms";
import { ConfirmationModal } from "@/shared/molecules";
import { ButtonVariant, ButtonSize, TextElement, TextWeight } from "@/shared/types/enums";
import type { MenuItemCardProps } from "./types";

export function MenuItemCard({
  item,
  onClick,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuItemCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const imageUrl = item.imageUrl || "https://via.placeholder.com/150x100";

  const handleCardClick = (e: React.MouseEvent) => {
    
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("[role='switch']")
    ) {
      return;
    }
    onClick?.(item);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(item);
      setShowDeleteModal(false);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(item);
        }
      }}
    >
      
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <Text 
              as={TextElement.H3}
              weight={TextWeight.Semibold}
              className="text-sm text-gray-900 truncate"
            >
              {item.name}
            </Text>
            <Text 
              as={TextElement.Paragraph}
              className="text-xs text-gray-500 mt-0.5"
            >
              {item.category}
            </Text>
          </div>
          {item.price && (
            <Text 
              as={TextElement.Paragraph}
              weight={TextWeight.Bold}
              className="text-sm text-gray-900 shrink-0"
            >
              {item.price}
            </Text>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                item.isAvailable ? "bg-success" : "bg-gray-300"
              )}
            />
            <span className="text-xs text-gray-600">
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <IconButton
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                className="rounded-xl"
                aria-label="Edit"
              >
                <Edit className="h-3.5 w-3.5" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                onClick={handleDeleteClick}
                className="rounded-xl"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </IconButton>
            )}
            {onToggleAvailability && (
              <div onClick={(e) => e.stopPropagation()}>
                <Switch
                  enabled={item.isAvailable}
                  onToggle={() => onToggleAvailability(item)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
