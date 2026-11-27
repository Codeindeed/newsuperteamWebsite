import { useEffect, useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import Button from "@/components/button/Index";
import {
  fetchPerks,
  memberPerksUrl,
  membershipSteps,
  PerkData,
  startEarningUrl,
} from "../data";

const PerksSection = () => {
  const [perks, setPerks] = useState<PerkData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPerks();
      setPerks(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section
      id="member-perks"
      className="bg-black min-h-screen pt-14 md:pt-24 pb-24 md:pb-40 px-4 md:px-[5vw] lg:px-[12vw] text-white w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <h2 className="text-heading-6 text-[28px] md:text-heading-5 !font-medium leading-tight tracking-tight">
            Perks of being
            <span className="block text-[#5F5F5F]">a Superteam member</span>
          </h2>
          <p className="text-[#525252] text-body-4 md:text-body-3 md:leading-7 leading-[26px] md:max-w-[380px]">
            Members get first dibs on discounts, deals and capital. Here's a
            taste of what's on the table.
          </p>
        </div>

        {/* Perk cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-[#111111] border border-white/5 rounded-xl min-h-[220px] animate-pulse"
                ></div>
              ))
          ) : perks.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 min-h-[320px] rounded-lg border border-white/10 bg-[#0F0F0F] flex flex-col items-center justify-center text-center px-6">
              <p className="text-heading-7 text-white !font-medium">
                No perks listed yet
              </p>
              <p className="text-body-5 text-[#525252] mt-2 max-w-[360px]">
                Member perks will show here as soon as they are added.
              </p>
            </div>
          ) : (
            <>
              {perks.map((perk, index) => (
                <PerkCard key={perk.id} index={index} perk={perk} />
              ))}
              <div className="rounded-xl border border-white/10 bg-[#0F0F0F] p-4 md:p-5 flex flex-col justify-between gap-8 min-h-[220px]">
                <div className="flex flex-col gap-4">
                  <p className="text-[#5F5F5F] text-body-5">And more</p>
                  <h3 className="font-medium text-white text-body-3 pr-4">
                    The full list lives on superteam.fun, newest deals first.
                  </h3>
                </div>
                <Button type="primary" to={memberPerksUrl} className="w-fit">
                  See all perks
                </Button>
              </div>
            </>
          )}
        </div>

        {/* How to become a member */}
        <div className="mt-20 md:mt-28">
          <h3 className="text-heading-7 md:text-heading-6 !font-medium leading-tight mb-10 md:mb-12">
            How to become a member
            <span className="block text-[#5F5F5F]">Here's the path.</span>
          </h3>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipSteps.map((step, index) => (
              <li
                key={step.id}
                className="border-t border-white/10 pt-6 flex flex-col gap-3"
              >
                <span className="text-heading-6 !font-medium text-[#5F5F5F]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-white text-body-3 font-medium">
                  {step.title}
                </p>
                <p className="text-[#525252] text-body-5 leading-[1.5]">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-12">
            <Button type="primary" to={startEarningUrl}>
              Start Earning
            </Button>
            <p className="text-[#525252] text-body-5">
              Bounties, projects and grants live on Superteam Earn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerksSection;

interface PerkCardProps {
  index: number;
  perk: PerkData;
}

const PerkCard = ({ index, perk }: PerkCardProps) => {
  return (
    <div className="bg-[#1A1A1A] border border-white/5 p-4 md:p-5 rounded-xl flex flex-col gap-4 text-[#5F5F5F] hover:border-white/10 transition-colors duration-500">
      {/* Meta */}
      <div className="text-[#5F5F5F] text-body-5 flex items-center justify-between gap-2">
        <span>Perk {String(index + 1).padStart(2, "0")}</span>
        {perk.partner && (
          <span className="flex items-center gap-2 font-medium">
            <TbUserSquareRounded className="text-[18px] text-primary" />
            {perk.partner}
          </span>
        )}
      </div>

      {/* Title + detail */}
      <h3 className="font-medium text-white text-body-3 pr-4">{perk.title}</h3>
      <p className="text-body-5 leading-[1.5]">{perk.detail}</p>

      {/* Action */}
      {perk.claimUrl && (
        <a
          href={perk.claimUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-grey-100 hover:bg-grey-80 transition-colors duration-700 hover:text-white text-body-5 font-medium text-[#5F5F5F] py-3.5 rounded-md mt-auto flex items-center justify-center"
        >
          Claim
        </a>
      )}
    </div>
  );
};
