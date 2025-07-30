import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react"; // Optional icon, if using Lucide

export default function FileUploadSection({ register, setValue, watch, errors }) {
  const [fileName, setFileName] = useState(null);
  const file = watch("cv");

  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
    }
  }, [file]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Part D: Upload Your CV</h2>

      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-800 mb-4">
          Upload your most recent CV <span className="text-red-500">*</span>
        </label>

        <label
          htmlFor="cv-upload"
          className="flex flex-col items-center justify-center w-full border-2 border-dashed border-teal-400 rounded-xl px-6 py-12 text-center cursor-pointer hover:border-teal-500 transition"
        >
          <UploadCloud className="w-10 h-10 text-teal-500 mb-3" />
          <p className="text-gray-700 font-semibold">Click to upload or drag & drop</p>
          <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            {...register("cv", { required: true })}
            onChange={(e) => {
              setValue("cv", e.target.files);
              setFileName(e.target.files?.[0]?.name || null);
            }}
          />
        </label>

        {/* Show file name */}
        {fileName && (
          <p className="mt-3 text-sm text-gray-700">
            Selected File: <span className="font-medium">{fileName}</span>
          </p>
        )}

        {/* Validation Error */}
        {errors.cv && (
          <p className="text-red-600 text-sm mt-2">Please upload your CV</p>
        )}
      </div>
    </div>
  );
}
