export default function ExperienceSection({ register, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Part C: Professional Experience</h2>

      {/* Work Experience */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Please outline your work experience (role, employer, dates, etc.) *
        </label>
        <textarea
          {...register("experience", { required: true })}
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-3"
          placeholder="E.g. ICT Officer at AKESK (2020–Present). Previously worked at XYZ Org (2016–2020)..."
        />
        {errors.experience && (
          <p className="text-red-600 text-sm mt-1">
            Please describe your work experience.
          </p>
        )}
      </div>
    </div>
  );
}
