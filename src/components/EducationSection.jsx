import { useFormContext } from "react-hook-form";

export default function EducationSection() {
  const { register, formState: { errors } } = useFormContext();

  const educationOptions = [
    "High School Only",
    "High School + College Diploma/Professional Qualification",
    "Bachelor’s Degree",
    "Bachelor’s + Additional Diploma/Professional Qualification",
    "Master’s Qualification",
    "Master’s + Diploma/Professional Qualification",
    "PhD",
    "PhD + Diploma/Professional Qualification",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal-800 mb-6">
        Part B: Education & Skills
      </h2>

      {/* Education Level */}
      <div className="mb-8">
        <label className="block font-medium text-gray-700 mb-2">
          Select your highest education level <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3 pl-1">
          {educationOptions.map((label, index) => (
            <label key={index} className="flex items-start gap-3 text-gray-800">
              <input
                type="radio"
                value={label}
                {...register("educationLevel", { required: true })}
                className="mt-1 accent-teal-600"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
        {errors.educationLevel && (
          <p className="text-red-600 text-sm mt-2">
            Please select your education level.
          </p>
        )}
      </div>

      {/* Professional Qualifications */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          Diploma/Professional qualifications you possess
        </label>
        <textarea
          {...register("qualifications")}
          rows={4}
          placeholder="E.g. CPA, ACCA, Cisco, PMP..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Other Education */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          Any other education? (Please specify)
        </label>
        <textarea
          {...register("otherEducation")}
          rows={3}
          placeholder="E.g. Short courses, workshops, certifications"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Other Skills */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Other skills and competencies you possess
        </label>
        <textarea
          {...register("otherSkills")}
          rows={4}
          placeholder="List any other skills you possess not covered in the section above"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}
