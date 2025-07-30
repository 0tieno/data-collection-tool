export default function PersonalInfoSection({ register, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Part A: Job and Person Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name *</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">Name is required.</p>}
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-medium mb-1">Job Title *</label>
          <input
            type="text"
            {...register("jobTitle", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.jobTitle && <p className="text-red-600 text-sm mt-1">Job title is required.</p>}
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium mb-1">Job Type *</label>
          <select
            {...register("jobType", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Job Type</option>
            <option value="Permanent">Permanent</option>
            <option value="Contractual">Contractual</option>
            <option value="Intern">Intern</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          {errors.jobType && <p className="text-red-600 text-sm mt-1">Please select a job type.</p>}
        </div>

        {/* Supervisor */}
        <div>
          <label className="block font-medium mb-1">Reports to / Supervisor *</label>
          <input
            type="text"
            {...register("supervisor", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.supervisor && <p className="text-red-600 text-sm mt-1">Supervisor name is required.</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium mb-1">Department *</label>
          <input
            type="text"
            {...register("department", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.department && <p className="text-red-600 text-sm mt-1">Department is required.</p>}
        </div>

        {/* Section */}
        <div>
          <label className="block font-medium mb-1">Section</label>
          <input
            type="text"
            {...register("section")}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* School */}
        <div>
          <label className="block font-medium mb-1">School *</label>
          <input
            type="text"
            {...register("school", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.school && <p className="text-red-600 text-sm mt-1">School is required.</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.location && <p className="text-red-600 text-sm mt-1">Location is required.</p>}
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Country *</label>
          <input
            type="text"
            {...register("country", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.country && <p className="text-red-600 text-sm mt-1">Country is required.</p>}
        </div>
      </div>
    </div>
  );
}
