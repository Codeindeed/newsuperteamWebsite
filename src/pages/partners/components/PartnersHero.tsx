import Button from "@/components/button/Index";
import { contact } from "../data";

const PartnersHero = () => {
  return (
    <section
      id="partners-hero"
      className="relative w-full min-h-screen bg-black px-4 md:px-[5vw] lg:px-[12vw] pt-20 pb-44 text-white overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#333] text-[#aaa] text-body-5 font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#aaa]" />
          Partnerships
        </span>

        <h1 className="text-[52px] leading-[0.95] md:text-[88px] lg:text-[112px] md:leading-[0.95] !font-medium text-white">
          Build with the community
          <span className="block text-[#5F5F5F]">
            building Solana <br className="hidden xl:block" />
            in Nigeria
          </span>
        </h1>

        <p className="text-[#525252] text-body-3 md:text-[28px] leading-[1.2] mt-6 max-w-[760px]">
          Put your product in front of 7k+ builders, founders and creators.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button type="primary" to={contact.partnerUrl}>
            Partner with us
          </Button>
          <Button type="secondary" to={contact.xUrl}>
            Follow {contact.xHandle}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
