export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Aga Khan Education Services Kenya
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Help us capture accurate and up-to-date professional and academic data through this simple form.
          </p>
          <a
            href="/form"
            className="inline-block bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>

        {/* Logos */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex items-center justify-center gap-6">
          <img
            src="/images/akes_logo.png" // Replace with your actual image path
            alt="Aga Khan Logo"
            className="h-16 md:h-20 object-contain"
          />
          <img
            src="/images/verge-logo.png" // Replace with your actual image path
            alt="Verge Advisory Logo"
            className="h-16 md:h-20 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
