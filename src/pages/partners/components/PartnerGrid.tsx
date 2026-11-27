import { useEffect, useMemo, useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";
import {
  fetchPartners,
  PartnerData,
  PartnerFilter,
  partnerFilters,
} from "../data";

const PartnerGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { containerRef } = useScrollContainer();
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<PartnerFilter>("All");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPartners();
      setPartners(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredPartners = useMemo(
    () =>
      activeFilter === "All"
        ? partners
        : partners.filter((partner) => partner.category === activeFilter),
    [activeFilter, partners],
  );

  const handleFilterChange = (filter: PartnerFilter) => {
    setActiveFilter(filter);

    // The window never scrolls; the page container does. If the reader is
    // deep inside the grid, bring the section top back so the new results
    // are in view.
    const container = containerRef?.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const containerRect = container.getBoundingClientRect();
    const sectionTop =
      section.getBoundingClientRect().top -
      containerRect.top +
      container.scrollTop;

    if (container.scrollTop > sectionTop + 1) {
      container.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="partner-products"
      ref={sectionRef}
      className="bg-[#0F0F0F] min-h-screen pt-14 md:pt-24 pb-24 md:pb-40 px-4 md:px-[5vw] lg:px-[12vw] text-white w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="bg-[#131E19] text-primary text-body-5 px-4 py-1.5 rounded-full mb-8 font-medium tracking-wide flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            Our Partners
          </div>

          <h2 className="text-heading-6 text-[28px] md:text-heading-5 !font-medium leading-tight tracking-tight">
            Products built for builders,
            <span className="block text-[#5F5F5F]">
              perks made for members.
            </span>
          </h2>
          <p className="text-[#525252] text-body-4 mt-4 max-w-[480px]">
            Credits, discounts and tools from teams we work with. Pick a
            category to narrow it down.
          </p>

          {/* Category filter */}
          <div className="self-stretch overflow-x-auto scrollbar-hide mt-10 pb-1 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center gap-1 bg-[#1F1F1F] border border-[#2B2B2B] p-1 rounded-full w-max mx-auto">
              {partnerFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`relative overflow-hidden px-4 md:px-6 py-2.5 md:py-3 rounded-full text-body-5 md:text-body-4 whitespace-nowrap transition-colors duration-700 before:absolute before:inset-y-1 before:left-1 before:rounded-full before:bg-[#000000] before:content-[''] before:transition-all before:duration-700 ${
                    activeFilter === filter
                      ? "text-white before:w-[calc(100%-8px)]"
                      : "text-[#6F6F6F] before:w-0 hover:text-white hover:before:w-[calc(100%-8px)]"
                  }`}
                >
                  <span className="relative z-[1]">{filter}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-[#0A0A0A] rounded-[24px] min-h-[240px] animate-pulse"
                ></div>
              ))}
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="min-h-[320px] rounded-lg border border-white/10 bg-black flex flex-col items-center justify-center text-center px-6">
            <p className="text-heading-7 text-white !font-medium">
              No partners yet
            </p>
            <p className="text-body-5 text-[#525252] mt-2 max-w-[360px]">
              {activeFilter === "All"
                ? "Partner products will show here as soon as they are added."
                : `${activeFilter} partners will show here as soon as they are added.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerGrid;

interface PartnerCardProps {
  partner: PartnerData;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      className="bg-black rounded-[24px] border border-white/5 p-6 md:p-8 flex flex-col h-full group cursor-pointer transition-all duration-500 hover:border-white/10"
    >
      {/* Avatar + category */}
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden="true"
          className="w-12 h-12 shrink-0 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-body-3 font-medium text-white group-hover:text-primary transition-colors duration-500"
        >
          {partner.name.charAt(0)}
        </div>
        <span className="bg-[#131E19] text-[#00AD66] text-body-5 font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
          {partner.category}
        </span>
      </div>

      {/* Name + description */}
      <h3 className="text-white text-body-3 !font-medium mt-6 group-hover:text-primary transition-colors duration-500">
        {partner.name}
      </h3>
      <p className="text-[#525252] text-body-5 leading-[1.5] mt-2 group-hover:text-[#aaa] transition-colors duration-500">
        {partner.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-8 flex items-center justify-between text-body-5 font-medium tracking-wide">
        <span className="uppercase text-grey-40 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          Visit site
        </span>
        <span className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-colors duration-700">
          <HiArrowUpRight className="text-[12px]" />
        </span>
      </div>
    </a>
  );
};
