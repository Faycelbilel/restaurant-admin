import { Text } from "@/shared/atoms";
import { TextElement } from "@/shared/types/enums";
import type { StepIndicatorProps } from "./types";

export function StepIndicator({
  steps,
  currentStep,
  completedSteps = [],
}: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted =
            completedSteps.includes(stepNumber) || stepNumber < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300 border-2 bg-white
                  ${
                    isActive
                      ? "border-primary text-primary scale-110"
                      : isCompleted
                        ? "border-primary bg-primary"
                        : "border-gray-300 text-gray-400"
                  }
                `}
              >
                {stepNumber}
              </div>

              <div className="mt-2 text-center">
                <Text
                  as={TextElement.Paragraph}
                  className={`
                    text-sm font-medium transition-colors
                    ${isActive ? "text-primary" : isCompleted ? "text-gray-700" : "text-gray-400"}
                  `}
                >
                  {step.label}
                </Text>
                {step.description && (
                  <Text
                    as={TextElement.Paragraph}
                    className="text-xs text-gray-500 mt-0.5"
                  >
                    {step.description}
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
