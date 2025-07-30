import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import FileUploadSection from "./FileUploadSection";

const steps = ["Personal", "Education", "Experience", "Upload CV"];

export default function FormWrapper() {
  const methods = useForm();
  const { handleSubmit, watch, setValue } = methods;

  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const onSubmit = (data) => {
    console.log("✅ Final Form Data:", data);
    // TODO: Send to Azure Function or CosmosDB
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`mt-2 text-sm ${
                  currentStep === index ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Step Components */}
        {currentStep === 0 && <PersonalInfoSection />}
        {currentStep === 1 && <EducationSection />}
        {currentStep === 2 && <ExperienceSection />}
        {currentStep === 3 && (
          <FileUploadSection
            watch={watch}
            setValue={setValue}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50"
          >
            Previous
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
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
      </form>
    </FormProvider>
  );
}
