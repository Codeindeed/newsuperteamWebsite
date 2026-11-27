import { FaXTwitter } from "react-icons/fa6";
import Button from "@/components/button/Index";
import { contact } from "../data";

// Same three figures as the homepage stat cards.
const stats = [
  { id: "members", value: "7k+", label: "Members" },
  { id: "products", value: "200+", label: "Products built on Solana" },
  { id: "states", value: "30", label: "States in Nigeria" },
];

const ReachOut = () => {
  return (
    <section
      id="reach-out"
      className="bg-[#0F0F0F] min-h-screen pt-14 md:pt-24 pb-24 md:pb-40 px-4 md:px-[5vw] lg:px-[12vw] text-white w-full flex items-center justify-center"
    >
      <div className="max-w-[960px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-heading-5 text-[28px] md:text-heading-4 !font-medium leading-tight tracking-tight">
          Want to reach 7k+ builders?
          <span className="block text-[#5F5F5F]">Let's build together.</span>
        </h2>
        <p className="text-[#525252] text-body-4 md:text-body-3 leading-[1.5] mt-6 max-w-[560px]">
          Co-host an event, sponsor a bounty or give our members a perk. Tell
          us what you're building and we'll find the right room for it.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12 md:mt-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 text-left text-heading-7 md:text-heading-6 md:!text-[25px] !font-medium hover:border-white/10 transition-colors duration-500"
            >
              <div className="text-white">{stat.value}</div>
              <div className="text-[#5F5F5F]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA + X handle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12 md:mt-16">
          <Button type="primary" to={contact.partnerUrl}>
            Partner with us
          </Button>
          <a
            href={contact.xUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="SuperteamNG on X"
            className="flex items-center gap-3 text-white hover:text-primary duration-700 cursor-pointer transition-all"
          >
            <FaXTwitter className="text-[24px]" />
            <span className="text-body-4 font-medium">{contact.xHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReachOut;
