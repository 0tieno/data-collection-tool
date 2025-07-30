export default function AboutSection() {
  const steps = [
    "Fill your personal and job details",
    "Add education and experience",
    "Upload your current CV",
    "Submit the form",
  ];

  return (
    <section className="bg-gray-100 py-20 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">How It Works</h2>

        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-start relative mb-16 max-w-4xl mx-auto">
          {/* Horizontal Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-indigo-300 z-0"></div>

          {steps.map((text, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center w-1/4">
              {/* Circle */}
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                {index + 1}
              </div>
              {/* Text */}
              <p className="text-base font-medium text-gray-700">{text}</p>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="relative flex flex-col md:hidden items-start gap-10 mb-16 pl-4">
          {/* Vertical Line */}
          <div className="absolute top-0 left-6 h-full w-1 bg-indigo-300 z-0"></div>

          {steps.map((text, index) => (
            <div key={index} className="relative z-10 flex items-center gap-4">
              {/* Number */}
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                {index + 1}
              </div>
              {/* Text */}
              <p className="text-base font-medium text-gray-700 max-w-xs">{text}</p>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6">
          Filling the form takes less than 10 minutes.
        </p>

        {/* CTA Button */}
        <a
          href="/form"
          className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
