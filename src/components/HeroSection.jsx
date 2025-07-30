export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-900 via-teal-800 to-blue-900
 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
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

               {/* Verge Logo only */}
<div className="flex flex-col items-center md:items-end md:w-1/2 space-y-4 px-6 md:px-0 md:pr-8">
  <p className="text-base md:text-lg font-semibold uppercase tracking-wider text-indigo-100">
    In Partnership With
  </p>
  <img
    src="/images/verge-logo.png"
    alt="Verge Advisory Logo"
    className="w-60 sm:w-72 md:w-80 object-contain drop-shadow-lg"
  />
</div>


      </div>
    </section>
  );
}
