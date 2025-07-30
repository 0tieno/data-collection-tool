import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput";

export default function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal-800 mb-6">
        Part A: Job and Personal Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Name" name="name" register={register} errors={errors} required />
        <FormInput label="Job Title" name="jobTitle" register={register} errors={errors} required />

        {/* Job Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("jobType", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Job Type</option>
            <option value="Permanent">Permanent</option>
            <option value="Contractual">Contractual</option>
            <option value="Intern">Intern</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          {errors.jobType && (
            <p className="text-red-600 text-sm mt-1">Please select a job type.</p>
          )}
        </div>

        <FormInput label="Reports to / Supervisor" name="supervisor" register={register} errors={errors} required />
        <FormInput label="Department" name="department" register={register} errors={errors} required />
        <FormInput label="Section" name="section" register={register} errors={errors} />
        <FormInput label="School" name="school" register={register} errors={errors} required />
        <FormInput label="Location" name="location" register={register} errors={errors} required />

        {/* Country (full width) */}
        <div className="md:col-span-2">
          <FormInput label="Country" name="country" register={register} errors={errors} required />
        </div>
      </div>
    </div>
  );
}
