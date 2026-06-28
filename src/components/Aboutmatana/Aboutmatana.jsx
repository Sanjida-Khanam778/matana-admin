
const stats = [
  { value: "1,200+", label: "Businesses" },
  { value: "45+", label: "Categories" },
  { value: "50+", label: "Cities" },
];

const statDelays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export default function AboutMatana() {
  return (
    <section
      id="about"
      className="w-full px-6 lg:px-0 bg-white py-8 md:py-12 xl:py-16 font-inter reveal reveal-fade-in"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <p className="font-bold text-sm lg:text-base text-primary uppercase mb-2">About Matana</p>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-8">
          Connecting Jewish Communities
        </h2>

        {/* Description */}
        <p className="text-sm lg:text-lg text-gray-500 leading-relaxed mb-12">
          MATANA is your premier directory for discovering quality Jewish
          businesses across the United States. We connect communities with
          trusted services, from kosher restaurants to Judaica shops, and
          everything in between. Our mission is to strengthen Jewish communities
          by making it easy to find and support local businesses that understand
          and serve your unique needs.
        </p>

      
      </div>
    </section>
  );
}
