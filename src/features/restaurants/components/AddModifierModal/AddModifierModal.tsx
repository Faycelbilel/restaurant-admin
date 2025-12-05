"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Modal } from "@/shared/organisms/Modal";
import { FormField, FormActions } from "@/shared/molecules";
import { Button, Text, Switch } from "@/shared/atoms";
import { 
  ModalSize, 
  ModifierModalMode, 
  ButtonVariant, 
  ButtonSize,
  TextElement,
  TextSize,
  TextWeight,
  TextColor
} from "@/shared/types/enums";
import type { AddModifierModalProps, OptionGroup, ExtraItem } from "./types";

const DEFAULT_EXTRA: ExtraItem = {
  name: "",
  nameEn: "",
  nameFr: "",
  nameAr: "",
  price: 0,
  default: false,
};

const DEFAULT_OPTION_GROUP: OptionGroup = {
  name: "",
  nameEn: "",
  nameFr: "",
  nameAr: "",
  minSelect: 0,
  maxSelect: 1,
  required: false,
  extras: [{ ...DEFAULT_EXTRA }],
};

export function AddModifierModal({
  isOpen,
  onClose,
  onSave,
  initialValue,
  mode = ModifierModalMode.Add,
}: AddModifierModalProps) {
  const [optionGroup, setOptionGroup] = useState<OptionGroup>({ ...DEFAULT_OPTION_GROUP });

  useEffect(() => {
    if (initialValue) {
      setOptionGroup(initialValue);
    } else {
      setOptionGroup({ ...DEFAULT_OPTION_GROUP });
    }
  }, [initialValue, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that option group has name and at least one extra
    if (!optionGroup.name.trim()) {
      return;
    }
    
    if (optionGroup.extras.length === 0) {
      return;
    }

    const hasValidExtra = optionGroup.extras.some((extra) => extra.name.trim());
    if (!hasValidExtra) {
      return;
    }
    
    onSave(optionGroup);
    setOptionGroup({ ...DEFAULT_OPTION_GROUP });
    onClose();
  };

  const handleClose = () => {
    setOptionGroup({ ...DEFAULT_OPTION_GROUP });
    onClose();
  };

  const updateField = (field: keyof OptionGroup, value: any) => {
    setOptionGroup((prev) => ({ ...prev, [field]: value }));
  };

  const addExtra = () => {
    setOptionGroup((prev) => ({
      ...prev,
      extras: [...prev.extras, { ...DEFAULT_EXTRA }],
    }));
  };

  const updateExtra = (
    extraIndex: number,
    field: keyof ExtraItem,
    value: any
  ) => {
    setOptionGroup((prev) => ({
      ...prev,
      extras: prev.extras.map((extra, j) =>
        j === extraIndex ? { ...extra, [field]: value } : extra
      ),
    }));
  };

  const removeExtra = (extraIndex: number) => {
    if (optionGroup.extras.length > 1) {
      setOptionGroup((prev) => ({
        ...prev,
        extras: prev.extras.filter((_, j) => j !== extraIndex),
      }));
    }
  };

  const getTitle = () => {
    if (mode === ModifierModalMode.Edit && initialValue) {
      return "Edit Modifier";
    }
    return "Add Modifier";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      size={ModalSize.ExtraLarge}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Option Group Names */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Name (English)"
            name="group-name"
            value={optionGroup.name}
            onChange={(e) => {
              const value = e.target.value;
              updateField("name", value);
              updateField("nameEn", value);
            }}
            placeholder="e.g., Size, Toppings, Sauce"
            required
          />

          <FormField
            label="Name (French)"
            name="group-nameFr"
            value={optionGroup.nameFr}
            onChange={(e) => updateField("nameFr", e.target.value)}
            placeholder="e.g., Taille"
            required
          />

          <FormField
            label="Name (Arabic)"
            name="group-nameAr"
            value={optionGroup.nameAr}
            onChange={(e) => updateField("nameAr", e.target.value)}
            placeholder="الحجم"
            required
            dir="rtl"
          />
        </div>

        {/* Selection Settings */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Min Select"
            name="group-minSelect"
            type="number"
            value={optionGroup.minSelect.toString()}
            onChange={(e) =>
              updateField("minSelect", parseInt(e.target.value) || 0)
            }
            placeholder="0"
          />

          <FormField
            label="Max Select"
            name="group-maxSelect"
            type="number"
            value={optionGroup.maxSelect.toString()}
            onChange={(e) =>
              updateField("maxSelect", parseInt(e.target.value) || 0)
            }
            placeholder="1"
          />

          <div className="flex flex-col justify-end">
            <div className="flex items-center justify-between h-[47px] px-4 bg-gray-50 rounded-2xl border border-gray-200">
              <Text size={TextSize.Small} weight={TextWeight.Medium}>Required</Text>
              <Switch
                enabled={optionGroup.required}
                onToggle={() => updateField("required", !optionGroup.required)}
              />
            </div>
          </div>
        </div>

        {/* Extras */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Text weight={TextWeight.Semibold}>Extras</Text>
            <Button
              type="button"
              onClick={addExtra}
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Medium}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Extra
            </Button>
          </div>
          
          <div className="space-y-3">
            {optionGroup.extras.map((extra, extraIndex) => (
              <div key={extraIndex} className="p-4 rounded-3xl border border-gray-200 bg-white space-y-3">
                <div className="flex items-center justify-end mb-2">
                  {optionGroup.extras.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeExtra(extraIndex)}
                      variant={ButtonVariant.Ghost}
                      size={ButtonSize.Medium}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <FormField
                    label="Name (English)"
                    name={`extra-name-${extraIndex}`}
                    value={extra.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateExtra(extraIndex, "name", value);
                      updateExtra(extraIndex, "nameEn", value);
                    }}
                    placeholder="e.g., Large, Extra Cheese"
                    required
                  />

                  <FormField
                    label="Name (French)"
                    name={`extra-nameFr-${extraIndex}`}
                    value={extra.nameFr}
                    onChange={(e) =>
                      updateExtra(extraIndex, "nameFr", e.target.value)
                    }
                    placeholder="e.g., Grand"
                    required
                  />

                  <FormField
                    label="Name (Arabic)"
                    name={`extra-nameAr-${extraIndex}`}
                    value={extra.nameAr}
                    onChange={(e) =>
                      updateExtra(extraIndex, "nameAr", e.target.value)
                    }
                    placeholder="كبير"
                    required
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="Price (TND)"
                    name={`extra-price-${extraIndex}`}
                    type="number"
                    value={extra.price.toString()}
                    onChange={(e) =>
                      updateExtra(extraIndex, "price", parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                  />

                  <div className="flex flex-col justify-end">
                    <div className="flex items-center justify-between h-[47px] px-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <Text size={TextSize.Small} weight={TextWeight.Medium}>Default</Text>
                      <Switch
                        enabled={extra.default}
                        onToggle={() =>
                          updateExtra(extraIndex, "default", !extra.default)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FormActions
          onCancel={handleClose}
          submitText={mode === ModifierModalMode.Edit ? "Update" : "Add"}
        />
      </form>
    </Modal>
  );
}
