const stats = [
  { value: "1,200+", label: "Businesses" },
  { value: "45+",    label: "Categories" },
  { value: "50+",    label: "Cities" },
];

export default function AboutMatana() {
  return (
    <section id="about" className="w-full bg-white py-20 font-inter">
      <div className="max-w-4xl mx-auto text-center">

        {/* Label */}
        <p className="font-bold text-primary uppercase mb-2">
          About Matana
        </p>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Connecting Jewish Communities
        </h2>

        {/* Description */}
        <p className="text-sm lg:text-lg text-gray-500 leading-relaxed mb-12">
          MATANA is your premier directory for discovering quality Jewish businesses across the United States. We
          connect communities with trusted services, from kosher restaurants to Judaica shops, and everything in
          between. Our mission is to strengthen Jewish communities by making it easy to find and support local
          businesses that understand and serve your unique needs.
        </p>

        {/* Stats */}
        <div className="flex items-start justify-center gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary mb-2">{stat.value}</span>
              <span className="text-sm lg:text-base text-gray-700 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}