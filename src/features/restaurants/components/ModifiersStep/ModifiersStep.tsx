"use client";

import { Button, CategoryFilterButton, Switch, Text } from "@/shared/atoms";
import {
  ButtonSize,
  ButtonVariant,
  ModifierModalMode,
  TextColor,
  TextElement,
  TextSize,
  TextWeight,
} from "@/shared/types/enums";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { STEP_TITLES } from "../AddDishWizard/constants";
import { AddModifierModal } from "../AddModifierModal";
import type { OptionGroup } from "../AddModifierModal/types";
import type { ModifiersStepProps } from "./types";

export function ModifiersStep({
  addonsEnabled,
  optionGroups,
  onAddonsEnabledToggle,
  onOptionGroupAdd,
  onOptionGroupRemove,
  onOptionGroupUpdate,
  onNext,
  onBack,
}: ModifiersStepProps) {
  const [showModifierModal, setShowModifierModal] = useState(false);
  const [modifierModalMode, setModifierModalMode] = useState<ModifierModalMode>(
    ModifierModalMode.Add
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentOptionGroup, setCurrentOptionGroup] = useState<
    OptionGroup | undefined
  >();
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const handleAddModifier = () => {
    setModifierModalMode(ModifierModalMode.Add);
    setCurrentOptionGroup(undefined);
    setEditingIndex(null);
    setShowModifierModal(true);
  };

  const handleModifierClick = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const handleEditModifier = (index: number) => {
    setModifierModalMode(ModifierModalMode.Edit);
    setCurrentOptionGroup(optionGroups[index]);
    setEditingIndex(index);
    setActiveMenuIndex(null);
    setShowModifierModal(true);
  };

  const handleDeleteModifier = (index: number) => {
    onOptionGroupRemove(index);
    setActiveMenuIndex(null);
  };

  const handleSaveModifier = (optionGroup: OptionGroup) => {
    if (modifierModalMode === ModifierModalMode.Add) {
      onOptionGroupAdd(optionGroup);
    } else if (
      modifierModalMode === ModifierModalMode.Edit &&
      editingIndex !== null
    ) {
      onOptionGroupUpdate(editingIndex, optionGroup);
    }
    setShowModifierModal(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8 max-w-2xl mx-auto">
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
            {STEP_TITLES.MODIFIERS.title}
          </Text>{" "}
          {STEP_TITLES.MODIFIERS.highlight}
        </Text>
        <Text color={TextColor.Muted} size={TextSize.Small}>
          {STEP_TITLES.MODIFIERS.description}
        </Text>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
          <Text weight={TextWeight.Medium}>Enable Modifiers</Text>
          <Switch enabled={addonsEnabled} onToggle={onAddonsEnabledToggle} />
        </div>

        {addonsEnabled && (
          <>
            <div className="flex flex-wrap gap-3 justify-center min-h-[80px] items-start">
              {optionGroups && optionGroups.length > 0 ? (
                optionGroups.map((optionGroup, index) => (
                  <div key={index} className="relative">
                    <CategoryFilterButton
                      type="button"
                      isActive={activeMenuIndex === index}
                      onClick={() => handleModifierClick(index)}
                    >
                      {optionGroup.name}
                      {optionGroup.required && (
                        <span className="ml-1 text-orange-600 font-bold">
                          *
                        </span>
                      )}
                    </CategoryFilterButton>

                    {activeMenuIndex === index && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setActiveMenuIndex(null)}
                        />
                        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20 min-w-[140px] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleEditModifier(index)}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">Edit</span>
                          </button>
                          <div className="h-px bg-gray-100 my-1" />
                          <button
                            type="button"
                            onClick={() => handleDeleteModifier(index)}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 w-full">
                  <Text color={TextColor.Muted} size={TextSize.Small}>
                    No modifiers added yet
                  </Text>
                </div>
              )}
            </div>

            <div className="flex justify-center w-full">
              <Button
                type="button"
                onClick={handleAddModifier}
                variant={ButtonVariant.Ghost}
                size={ButtonSize.Medium}
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                <Text as={TextElement.Span}>Add New Modifier</Text>
              </Button>
            </div>
          </>
        )}
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
          onClick={onNext}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
        >
          Continue
        </Button>
      </div>

      <AddModifierModal
        isOpen={showModifierModal}
        onClose={() => setShowModifierModal(false)}
        onSave={handleSaveModifier}
        initialValue={currentOptionGroup}
        mode={modifierModalMode}
      />
    </div>
  );
}
