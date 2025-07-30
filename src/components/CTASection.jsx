// src/components/CTASection.jsx
export default function CTASection() {
  return (
    <section className="bg-indigo-700 text-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to begin?</h2>
      <p className="text-lg mb-6">Filling the form takes less than 10 minutes.</p>
      <a
        href="/form"
        className="inline-block bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Fill the Form Now
      </a>
    </section>
  );
}
