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
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
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
      
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        {item.price && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur">
            {item.price}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Text 
              as={TextElement.H3}
              weight={TextWeight.Semibold}
              className="text-base text-gray-900 leading-tight"
            >
              {item.name}
            </Text>
            <Text 
              as={TextElement.Paragraph}
              className="text-xs text-gray-500 mt-1 truncate"
            >
              {item.category}
            </Text>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full bg-gray-50 px-2.5 py-1">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item.isAvailable ? "bg-success" : "bg-gray-300"
              )}
            />
            <span className="text-xs font-medium text-gray-700">
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
                  size="sm"
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
