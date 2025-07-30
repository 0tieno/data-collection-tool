import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { fileValidation } from "../utils/ValidationRules"; 

export default function FileUploadSection() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [fileName, setFileName] = useState(null);
  const file = watch("cv");

  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
    }
  }, [file]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal-800 mb-6">Part D: Upload Your CV</h2>

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
            {...register("cv", fileValidation)} 
            onChange={(e) => {
              setValue("cv", e.target.files);
              setFileName(e.target.files?.[0]?.name || null);
            }}
          />
        </label>

        {fileName && (
          <p className="mt-3 text-sm text-gray-700">
            Selected File: <span className="font-medium">{fileName}</span>
          </p>
        )}

        {errors.cv && (
          <p className="text-red-600 text-sm mt-2">{errors.cv.message || "Please upload your CV"}</p>
        )}
      </div>
    </div>
  );
}
