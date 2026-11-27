import {
  adevarLabsLogo,
  alchemyLogo,
  birdeyeLogo,
  cantinaLogo,
  carbiumLogo,
  cypherEsimLogo,
  fluxrpcLogo,
  fyeoLogo,
  getblockLogo,
  heliusLogo,
  roamLogo,
  ryderLogo,
  streamflowLogo,
  webacyLogo,
} from "@/data/images/Index";

export type PartnerCategory =
  | "Payments"
  | "Infrastructure"
  | "Security"
  | "Tools";

export type PartnerFilter = "All" | PartnerCategory;

// "Local" is a Superteam Nigeria partnership; "Global" is a Superteam-wide
// perk that members here can also claim.
export type PartnerScope = "Local" | "Global";

export type ScopeFilter = "All" | PartnerScope;

// How a logo sits in the card's logo slot:
// - "lockup": a wide wordmark or lockup shown inside a pill (default)
// - "avatar": a square image with its own background, cropped to a circle
// - "mark": a symbol on a transparent background, padded inside the circle
export type PartnerLogoStyle = "lockup" | "avatar" | "mark";

export interface PartnerData {
  id: string;
  name: string;
  category: PartnerCategory;
  scope: PartnerScope;
  description: string;
  url: string;
  // Registry const from "@/data/images/Index". Cards fall back to an
  // initial-letter avatar when it is missing.
  logo?: string;
  logoStyle?: PartnerLogoStyle;
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

export const scopeFilters: ScopeFilter[] = ["All", "Local", "Global"];

// Newest partnership first. Logo files live in src/assets/partners and are
// registered in src/data/images/Index.tsx; never point `logo` at a
// third-party URL.
export const partners: PartnerData[] = [
  {
    id: "roam",
    name: "Roam",
    category: "Payments",
    scope: "Local",
    description:
      "Receive USDC, USDT and PYUSD on Solana, convert 1:1 with zero conversion fees, withdraw to Naira.",
    url: "https://withroam.app/",
    logo: roamLogo, // source: https://withroam.app/ (header logo, dark-theme variant)
  },
  {
    id: "helius",
    name: "Helius",
    category: "Infrastructure",
    scope: "Global",
    // Announced by Superteam on 14 Oct 2026:
    // https://x.com/superteam/status/2110396793305649389
    description:
      "1 year of the Developer plan free for builders, 3 months of the Business plan free for startups.",
    url: "https://www.helius.dev/",
    logo: heliusLogo, // source: https://www.helius.dev/brand (Helius-Horizontal-Logo-White.svg)
  },
  {
    id: "alchemy",
    name: "Alchemy",
    category: "Infrastructure",
    scope: "Global",
    description: "Priority access to up to $25k credits plus 15% extra.",
    url: "https://www.alchemy.com/solana-20m-fund",
    logo: alchemyLogo, // source: https://www.alchemy.com/brand (brand kit, Logo/White)
  },
  {
    id: "getblock",
    name: "GetBlock",
    category: "Infrastructure",
    scope: "Global",
    description: "Up to $10,000 in credits for 90 days.",
    url: "https://getblock.io/grant-program-solana/",
    logo: getblockLogo, // source: https://getblock.io/media-kit/ (brand kit, Logotype/White)
  },
  {
    id: "birdeye-data",
    name: "Birdeye Data",
    category: "Infrastructure",
    scope: "Global",
    description: "24M CUs, about 3 months of Starter; until May 31, 2027.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeBQANnvT4wFc20RcrhG0J5xwjFpsQvACfO_lpc9Xus7GqRQA/viewform",
    logo: birdeyeLogo, // source: https://docs.birdeye.so/docs/brand-assets (Drive folder, horizontal white)
  },
  {
    id: "carbium",
    name: "Carbium",
    category: "Infrastructure",
    scope: "Global",
    description: "6 months free and 10% off for life.",
    url: "https://www.carbium.io/partnership",
    logo: carbiumLogo, // source: https://www.carbium.io/mainLogo.png, inverted to white as carbium.io does
  },
  {
    id: "fluxrpc",
    name: "FluxRPC",
    category: "Infrastructure",
    scope: "Global",
    description: "20% off any plan, permanently.",
    url: "https://superteam.fun/earn/pro",
    logo: fluxrpcLogo, // source: https://fluxrpc.com/logo.png
    logoStyle: "avatar",
  },
  {
    id: "fyeo",
    name: "FYEO",
    category: "Security",
    scope: "Global",
    description: "40% off audits, threat monitoring and wallet testing.",
    url: "https://www.fyeo.io/superteam-partnership",
    logo: fyeoLogo, // source: https://github.com/fyeo-io (official org avatar; fyeo.io has no logo file)
    logoStyle: "avatar",
  },
  {
    id: "cantina",
    name: "Cantina",
    category: "Security",
    scope: "Global",
    description: "15% off audits plus 1 year free bug bounty hosting.",
    url: "https://cantina.xyz/introduction/cantina-superteam",
    logo: cantinaLogo, // source: https://www.cantina.security/ (header wordmark)
  },
  {
    id: "adevar-labs",
    name: "Adevar Labs",
    category: "Security",
    scope: "Global",
    description: "25% off audits, formal verification and fuzzing.",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2L9GdTZOwwVLrZ_hXxPjlW-ryfKJc3YAz2qFH7CDlcDOkNXioHide4yKo_K72-jbqMdGfaPT_3",
    logo: adevarLabsLogo, // source: https://github.com/AdevarLabs (official org avatar)
    logoStyle: "avatar",
  },
  {
    id: "webacy",
    name: "Webacy",
    category: "Security",
    scope: "Global",
    description: "50% off Pro Plan for life.",
    url: "https://dapp.webacy.com/",
    logo: webacyLogo, // source: https://www.webacy.com/ (header white logo)
  },
  {
    id: "streamflow",
    name: "Streamflow",
    category: "Tools",
    scope: "Global",
    description: "Free or discounted token vesting, airdrops and minting.",
    url: "https://drive.google.com/file/d/1H5r7g55UlWSB5TeBdZrdzITs5xkdKv1i/view?usp=sharing",
    logo: streamflowLogo, // source: https://streamflow.finance/ (site icon)
    logoStyle: "avatar",
  },
  {
    id: "cypher-esim",
    name: "Cypher eSIM",
    category: "Tools",
    scope: "Global",
    description: "30% off eSIM, 50% off VPN, pay in SOL or USDC.",
    url: "https://superteam.cypheresim.com/",
    logo: cypherEsimLogo, // source: https://cypheresim.com/logo.png
    logoStyle: "avatar",
  },
  {
    id: "ryder",
    name: "Ryder",
    category: "Tools",
    scope: "Global",
    description: "30% off hardware wallets.",
    url: "https://ryder.id",
    logo: ryderLogo, // source: https://ryder.id/ (ryder_logo_light.svg)
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
