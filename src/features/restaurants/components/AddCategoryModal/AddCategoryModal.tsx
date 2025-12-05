"use client";

import { useState } from "react";
import { Modal } from "@/shared/organisms/Modal";
import { FormField, FormActions } from "@/shared/molecules";
import { ModalSize } from "@/shared/types/enums";
import type { AddCategoryModalProps } from "./types";

export interface CategoryFormData {
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialValue = "",
}: AddCategoryModalProps) {
  const [nameEn, setNameEn] = useState(initialValue);
  const [nameFr, setNameFr] = useState(initialValue);
  const [nameAr, setNameAr] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameEn.trim() && nameFr.trim() && nameAr.trim()) {
      onSave({
        nameEn: nameEn.trim(),
        nameFr: nameFr.trim(),
        nameAr: nameAr.trim(),
      });
      setNameEn("");
      setNameFr("");
      setNameAr("");
      onClose();
    }
  };

  const handleClose = () => {
    setNameEn("");
    setNameFr("");
    setNameAr("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialValue ? "Edit Category" : "Add Category"}
      size={ModalSize.Medium}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Category Name (English)"
          name="nameEn"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="e.g., Desserts"
          required
          autoFocus
        />

        <FormField
          label="Category Name (French)"
          name="nameFr"
          value={nameFr}
          onChange={(e) => setNameFr(e.target.value)}
          placeholder="e.g., Desserts"
          required
        />

        <FormField
          label="Category Name (Arabic)"
          name="nameAr"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder="e.g., حلويات"
          required
          dir="rtl"
        />

        <FormActions
          onCancel={handleClose}
          submitText={initialValue ? "Update" : "Add"}
        />
      </form>
    </Modal>
  );
}
