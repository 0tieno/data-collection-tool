import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import FileUploadSection from "./FileUploadSection";
import StepNavigation from "./StepNavigation";

const steps = ["Personal", "Education", "Experience", "Upload CV"];

export default function FormWrapper() {
  const methods = useForm();
  const { handleSubmit, watch, setValue, trigger } = methods;

  const stepFields = [
    ["name", "jobTitle", "jobType", "supervisor", "department", "section", "school", "location", "country"],
    ["educationLevel"],
    ["experienceList", "experienceSummary"],
    ["cv"],
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const onSubmit = async (data) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (key === "experienceList") {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof FileList) {
      formData.append(key, value[0]); // Only one file
    } else {
      formData.append(key, value);
    }
  }

  try {
    const res = await fetch("http://localhost:7071/api/submit", {
      method: "POST",
      body: formData,
    });
// https://form-handler-function-d6cje2fghrc2hecy.southafricanorth-01.azurewebsites.net/api/submit
    const text = await res.text(); // ← use text first

    let json;
    try {
      json = JSON.parse(text);
    } catch (err) {
      console.error("❌ Response is not valid JSON:", text);
      return;
    }

  if (!res.ok) {
  console.error("❌ Server error:", json);

  // If it's validation errors (multiple fields), format them nicely
  if (json.errors) {
    const messages = Object.values(json.errors).join("\n");
    alert("Submission failed:\n" + messages);
  } else {
    alert("Submission failed: " + (json?.error || "Unknown error"));
  }

  return;
}


    console.log("✅ Success:", json);
    alert("Submitted successfully!");

  } catch (err) {
    console.error("❌ Network error:", err);
    alert("Network error occurred.");
  }
};



  const nextStep = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

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
        <StepNavigation
          currentStep={currentStep}
          steps={steps}
          stepFields={stepFields}
          isLastStep={isLastStep}
          onPrev={prevStep}
          onNext={nextStep}
        />
      </form>
    </FormProvider>
  );
}
