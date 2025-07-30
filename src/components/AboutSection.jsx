export default function AboutSection() {
  const steps = [
    "Fill your personal and job details",
    "Add education and experience",
    "Upload your current CV",
    "Submit the form",
  ];

  return (
    <section className="text-gray-800 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">How It Works</h2>

        {/* Desktop */}
        <div className="hidden md:flex justify-between items-start relative mb-16 max-w-4xl mx-auto">
          <div className="absolute top-6 left-0 w-full h-1 bg-blue-200 z-0"></div>
          {steps.map((text, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center w-1/4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                {index + 1}
              </div>
              <p className="text-base font-medium text-gray-800">{text}</p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="relative flex flex-col md:hidden items-start gap-10 mb-16 pl-4">
          <div className="absolute top-0 left-6 h-full w-1 bg-blue-200 z-0"></div>
          {steps.map((text, index) => (
            <div key={index} className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                {index + 1}
              </div>
              <p className="text-base font-medium text-gray-800 max-w-xs">{text}</p>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg mb-6">
          Filling the form takes less than 10 minutes.
        </p>

        {/* CTA Button */}
        <a
          href="/form"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
