import { IconType } from "react-icons";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export interface SiteLink {
  title: string;
  url: string;
}

export interface SocialLink {
  label: string;
  url: string;
  Icon: IconType;
}

// Site map shared by the footer and the mobile menu. "/gallery"-style
// entries are routes; "/#section" entries land on a homepage section.
export const siteLinks: SiteLink[] = [
  { title: "Home", url: "/#home" },
  { title: "About Us", url: "/#about" },
  { title: "Gallery", url: "/gallery" },
  { title: "Events", url: "/#events" },
  { title: "Products", url: "/#products" },
  { title: "Partners", url: "/partners" },
  { title: "Blog", url: "/#blog" },
];

export const communityUrl = "https://x.com/SuperteamNG";

export const socialLinks: SocialLink[] = [
  {
    label: "X",
    url: "https://x.com/SuperteamNG",
    Icon: FaXTwitter,
  },
  {
    label: "Discord",
    url: "https://discord.com/invite/C6EgkeEAed",
    Icon: FaDiscord,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/superteamng/",
    Icon: FaInstagram,
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@superteamng",
    Icon: FaTiktok,
  },
];
