import type { OptionGroup } from "../AddModifierModal/types";

export interface ModifiersStepProps {
  addonsEnabled: boolean;
  optionGroups: OptionGroup[];
  onAddonsEnabledToggle: () => void;
  onOptionGroupAdd: (optionGroup: OptionGroup) => void;
  onOptionGroupRemove: (index: number) => void;
  onOptionGroupUpdate: (index: number, optionGroup: OptionGroup) => void;
  onNext: () => void;
  onBack: () => void;
}
