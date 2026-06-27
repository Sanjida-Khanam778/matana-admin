import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";
import { GoLocation } from "react-icons/go";

const stats = [
  {
    icon: <MdOutlineStorefront size={38} />,
    value: "500+",
    label: "STORES",
  },
  {
    icon: <GoLocation size={36} />,
    value: "20+",
    label: "LOCATIONS",
  },
  {
    icon: <IoGiftOutline size={36} />,
    value: "Thousands",
    label: "OF GIFT IDEAS",
  },
];

export default function StatsBar() {
  return (
    <section className="w-full bg-[#F2ECDF] py-8 sm:py-10">
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="flex items-center justify-center divide-x divide-[#085027]/20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 px-4 sm:px-8"
            >
              <span className="text-[#085027]">{stat.icon}</span>
              <p className="text-3xl sm:text-4xl font-bold text-[#085027] leading-none mt-1">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#085027]/60 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
