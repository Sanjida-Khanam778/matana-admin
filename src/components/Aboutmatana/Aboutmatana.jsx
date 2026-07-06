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
      className="w-full px-6 lg:px-0 bg-[#FAF5ED] py-8 md:py-12 xl:py-16 font-inter"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Label */}
        <p className="font-bold text-sm lg:text-base text-primary uppercase mb-2">
          About Matana
        </p>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-8">
          Connecting Jewish Communities
        </h2>

        {/* Description */}
        <p className="text-sm lg:text-lg text-gray-500 leading-relaxed mb-12 text-justify">
          It started with a simple question. A friend called us looking for a
          florist in another city. He wanted to send flowers to a kallah, but he
          didn’t know where to order from. Like most people, we started doing
          what everyone does—we searched Google, scrolled Instagram, asked
          around in WhatsApp groups, and texted friends for recommendations.
          Eventually, we found something. But we couldn’t stop thinking: Why is
          this still so difficult? That moment sparked an idea. Every day,
          people are looking for businesses they can trust. Someone needs a
          caterer for a corporate event. Someone else is searching for a
          photographer for a bar mitzvah, a bakery for a birthday, a gift for a
          client, or flowers for a family member. And every time, they start
          from scratch. We knew there had to be a better way. So we built
          Matana—a place where our community can easily discover trusted
          businesses for every occasion. Whether you’re celebrating a simcha,
          planning an event, sending a thoughtful gift, or organizing a
          corporate function, Matana brings everything together in one place.
          Our hope is that one day, when someone asks, “Where should I order
          from?” the answer will simply be: “Check Matana.”
        </p>
      </div>
    </section>
  );
}
