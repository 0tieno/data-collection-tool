import { useFormContext } from "react-hook-form";

export default function FormInput({ label, name, required = false, type = "text" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, { required })}
        className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{label} is required.</p>
      )}
    </div>
  );
}
