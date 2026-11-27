export type PartnerCategory =
  | "Payments"
  | "Infrastructure"
  | "Security"
  | "Tools";

export type PartnerFilter = "All" | PartnerCategory;

export interface PartnerData {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  url: string;
}

export interface PerkData {
  id: string;
  title: string;
  detail: string;
  partner?: string;
  claimUrl?: string;
}

export interface MembershipStep {
  id: string;
  title: string;
  detail: string;
}

// Swap partnerUrl for a form link when one exists; every "Partner with us"
// CTA on the page reads from here.
export const contact = {
  partnerUrl: "https://x.com/SuperteamNG",
  xHandle: "@SuperteamNG",
  xUrl: "https://x.com/SuperteamNG",
};

export const memberPerksUrl = "https://superteam.fun/member-perks";
export const startEarningUrl = "https://superteam.fun/earn/";

const membershipBenefitsUrl =
  "https://superteamng.gitbook.io/superteamwelcomeguide/superteam-membership/benefits-of-superteam-membership";

export const partnerFilters: PartnerFilter[] = [
  "All",
  "Payments",
  "Infrastructure",
  "Security",
  "Tools",
];

// Logos are intentionally absent: cards render a name-only initial avatar.
export const partners: PartnerData[] = [
  {
    id: "roam",
    name: "Roam",
    category: "Payments",
    description:
      "Receive USDC, USDT and PYUSD on Solana, convert 1:1 with zero conversion fees, withdraw to Naira.",
    url: "https://withroam.app/",
  },
  {
    id: "copperx",
    name: "CopperX",
    category: "Payments",
    description: "Free physical card worth $100 and 0% off-ramp fees.",
    url: "https://copperx.notion.site/Superteam-Earn-x-Copperx-Perks-2b984195480f80958f8dc64b101f7bcf",
  },
  {
    id: "alchemy",
    name: "Alchemy",
    category: "Infrastructure",
    description: "Priority access to up to $25k credits plus 15% extra.",
    url: "https://www.alchemy.com/solana-20m-fund",
  },
  {
    id: "getblock",
    name: "GetBlock",
    category: "Infrastructure",
    description: "Up to $10,000 in credits for 90 days.",
    url: "https://getblock.io/grant-program-solana/",
  },
  {
    id: "birdeye-data",
    name: "Birdeye Data",
    category: "Infrastructure",
    description: "24M CUs, about 3 months of Starter; until May 31, 2027.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeBQANnvT4wFc20RcrhG0J5xwjFpsQvACfO_lpc9Xus7GqRQA/viewform",
  },
  {
    id: "carbium",
    name: "Carbium",
    category: "Infrastructure",
    description: "6 months free and 10% off for life.",
    url: "https://www.carbium.io/partnership",
  },
  {
    id: "fluxrpc",
    name: "FluxRPC",
    category: "Infrastructure",
    description: "20% off any plan, permanently.",
    url: "https://superteam.fun/earn/pro",
  },
  {
    id: "fyeo",
    name: "FYEO",
    category: "Security",
    description: "40% off audits, threat monitoring and wallet testing.",
    url: "https://www.fyeo.io/superteam-partnership",
  },
  {
    id: "cantina",
    name: "Cantina",
    category: "Security",
    description: "15% off audits plus 1 year free bug bounty hosting.",
    url: "https://cantina.xyz/introduction/cantina-superteam",
  },
  {
    id: "adevar-labs",
    name: "Adevar Labs",
    category: "Security",
    description: "25% off audits, formal verification and fuzzing.",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2L9GdTZOwwVLrZ_hXxPjlW-ryfKJc3YAz2qFH7CDlcDOkNXioHide4yKo_K72-jbqMdGfaPT_3",
  },
  {
    id: "webacy",
    name: "Webacy",
    category: "Security",
    description: "50% off Pro Plan for life.",
    url: "https://dapp.webacy.com/",
  },
  {
    id: "streamflow",
    name: "Streamflow",
    category: "Tools",
    description: "Free or discounted token vesting, airdrops and minting.",
    url: "https://drive.google.com/file/d/1H5r7g55UlWSB5TeBdZrdzITs5xkdKv1i/view?usp=sharing",
  },
  {
    id: "civic",
    name: "Civic",
    category: "Tools",
    description: "No SaaS fee for 12 months, first 1,000 verifications free.",
    url: "https://civic.com/pass",
  },
  {
    id: "cypher-esim",
    name: "Cypher eSIM",
    category: "Tools",
    description: "30% off eSIM, 50% off VPN, pay in SOL or USDC.",
    url: "https://superteam.cypheresim.com/",
  },
  {
    id: "ryder",
    name: "Ryder",
    category: "Tools",
    description: "30% off hardware wallets.",
    url: "https://ryder.id",
  },
];

// Wording follows the SuperteamNG welcome guide.
export const perks: PerkData[] = [
  {
    id: "discounts",
    title: "Discounts on essential services",
    detail:
      "Up to 100% off legal services, 40% off security solutions, 33% off tokenomics design and auditing.",
    claimUrl: membershipBenefitsUrl,
  },
  {
    id: "fundraising",
    title: "Fundraising support",
    detail:
      "Tailored feedback from accelerator and incubator partners through Superteam Fast Track, and introductions to investors.",
    partner: "Superteam Fast Track",
    claimUrl: membershipBenefitsUrl,
  },
  {
    id: "invest",
    title: "Invest in early-stage Solana startups",
    detail:
      "Deal-by-deal investing alongside members, leads and protocol founders in the Superteam Collective.",
    partner: "Superteam Collective",
    claimUrl: membershipBenefitsUrl,
  },
  {
    id: "member-nft",
    title: "Exclusive Member NFT",
    detail:
      "Proof of membership that unlocks token airdrops, whitelist spots and beta invites.",
    claimUrl: membershipBenefitsUrl,
  },
  {
    id: "jobs-and-grants",
    title: "Jobs and grants",
    // Roles: https://talent.superteam.fun/ ; grants: https://earn.superteam.fun/grants/
    detail:
      "Priority access to full-time Solana roles through Superteam Talent and preferential access to Instagrants.",
    partner: "Superteam Talent",
    claimUrl: memberPerksUrl,
  },
];

export const membershipSteps: MembershipStep[] = [
  {
    id: "add-value",
    title: "Add continuous value to the community",
    detail: "Discussions, articles, tutorials, feedback.",
  },
  {
    id: "win-bounties",
    title: "Win eligible bounties, projects or Instagrants",
    detail: "Ship work on Superteam Earn and get noticed.",
  },
  {
    id: "build-projects",
    title: "Build and showcase impactful projects",
    detail: "dApps, hackathons, open source.",
  },
  {
    id: "align",
    title: "Align with Superteam's vision and values",
    detail: "Show up for the community, not just the perks.",
  },
];

export const fetchPartners = async (): Promise<PartnerData[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(partners), 500);
  });
};

export const fetchPerks = async (): Promise<PerkData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(perks), 500);
  });
};
