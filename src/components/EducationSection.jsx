export default function EducationSection({ register, errors }) {
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
      <h2 className="text-xl font-semibold mb-4">Part B: Education & Skills</h2>

      {/* Education Level */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Select your highest education level *
        </label>
        <div className="space-y-2">
          {educationOptions.map((label, index) => (
            <label key={index} className="flex items-start gap-2">
              <input
                type="radio"
                value={label}
                {...register("educationLevel", { required: true })}
                className="mt-1"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.educationLevel && (
          <p className="text-red-600 text-sm mt-1">Please select your education level</p>
        )}
      </div>

      {/* Professional Qualifications */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Please provide details of the diploma/professional qualifications you possess
        </label>
        <textarea
          {...register("qualifications")}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* Other Education */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Any other education? (Please specify)
        </label>
        <textarea
          {...register("otherEducation")}
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* Other Skills */}
      <div>
        <label className="block font-medium mb-2">
          Other skills and competencies you possess
        </label>
        <textarea
          {...register("otherSkills")}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
    </div>
  );
}
