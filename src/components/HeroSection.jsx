export default function HeroSection() {
  return (
    <section className="text-gray-800 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Aga Khan Education Services Kenya
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Help us capture accurate and up-to-date professional and academic data through this simple form.
          </p>
          <a
            href="/form"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>

        {/* Verge Logo */}
        <div className="flex flex-col items-center md:items-end md:w-1/2 space-y-4 px-6 md:px-0 md:pr-8">
          <p className="text-base md:text-lg font-semibold uppercase tracking-wider text-gray-600">
            In Partnership With
          </p>
          <img
            src="/images/verge-logo.png"
            alt="Verge Advisory Logo"
            className="w-60 sm:w-72 md:w-80 object-contain drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
