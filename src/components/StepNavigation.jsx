// src/components/StepNavigation.jsx

import { useFormContext, useFormState, useWatch } from "react-hook-form";

export default function StepNavigation({
  currentStep,
  steps,
  stepFields,
  onPrev,
  onNext,
  isLastStep,
}) {
  const { control, getValues, trigger } = useFormContext();
  const watchedValues = useWatch({ control });
  const { errors } = useFormState({ control });

  const isStepValid = () => {
    const fieldsToCheck = stepFields[currentStep];

    return fieldsToCheck.every((field) => {
      const value = getValues(field);

      // ✅ Check for file upload (cv)
      if (field === "cv") {
        return value?.[0] instanceof File;
      }

      // ✅ Check for experience summary text
      if (field === "experienceSummary") {
        return typeof value === "string" && value.trim().length > 0;
      }

      // ✅ Check for dynamic array like experienceList
      if (Array.isArray(value)) {
        return (
          value.length > 0 &&
          value.every((item) => item?.organization && item?.years)
        );
      }

      // ✅ General check for other fields
      return value !== undefined && value !== null && value !== "";
    });
  };

  const handleNextClick = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (valid) onNext();
  };

  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 0}
        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50"
      >
        Previous
      </button>

      {!isLastStep ? (
        <button
          type="button"
          onClick={handleNextClick}
          disabled={!isStepValid()}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            isStepValid()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit
        </button>
      )}
    </div>
  );
}
