import FormWrapper from "../components/FormWrapper";

export default function FormPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Staff Data Collection Form</h1>
        <p className="text-gray-600 mb-8">
          Please fill in the form below. All fields marked with * are required.
        </p>
        <FormWrapper />
      </div>
    </div>
  );
}
